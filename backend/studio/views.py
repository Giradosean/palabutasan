from datetime import datetime, time, timedelta
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import transaction
from django.http import Http404
from rest_framework import status, viewsets
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .models import PiercingService, TimeSlot, Appointment, FAQ, ContactMessage
from .serializers import (
    PiercingServiceSerializer,
    TimeSlotSerializer,
    AppointmentSerializer,
    FAQSerializer,
    ContactMessageSerializer,
)

DEFAULT_SLOT_TIMES = [
    (time(10, 0), time(10, 30)),
    (time(11, 0), time(11, 30)),
    (time(11, 30), time(12, 0)),
    (time(13, 0), time(13, 30)),
    (time(14, 0), time(14, 30)),
    (time(14, 30), time(15, 0)),
    (time(15, 30), time(16, 0)),
    (time(16, 0), time(16, 30)),
    (time(16, 30), time(17, 0)),
    (time(17, 30), time(18, 0)),
]


def _parse_flexible_time(val):
    if isinstance(val, time):
        return val
    if not val:
        return None
    cleaned = str(val).strip().upper()
    for fmt in ('%H:%M:%S', '%H:%M', '%I:%M %p', '%I:%M%p'):
        try:
            return datetime.strptime(cleaned, fmt).time()
        except ValueError:
            continue
    return None


# ==========================================
# PUBLIC ENDPOINTS
# ==========================================

@api_view(['GET'])
@permission_classes([AllowAny])
def list_services(request):
    services = PiercingService.objects.all().order_by('name')
    category = request.GET.get('category')
    if category:
        services = services.filter(category__iexact=category)
    serializer = PiercingServiceSerializer(services, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def list_slots(request):
    date_str = request.GET.get('date')
    if date_str:
        try:
            target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)

        # studio closed on Mondays (weekday == 0) unless admin explicitly created slots
        existing_count = TimeSlot.objects.filter(date=target_date).count()
        if existing_count == 0:
            if target_date.weekday() == 0:
                return Response([])
            slots_to_create = [
                TimeSlot(date=target_date, start_time=st, end_time=et, is_booked=False)
                for st, et in DEFAULT_SLOT_TIMES
            ]
            TimeSlot.objects.bulk_create(slots_to_create, ignore_conflicts=True)

        slots = TimeSlot.objects.filter(date=target_date)
        available_only = request.GET.get('available_only', 'false').lower() in ('true', '1')
        if available_only:
            slots = slots.filter(is_booked=False)
    else:
        slots = TimeSlot.objects.filter(is_booked=False).order_by('date', 'start_time')[:50]

    serializer = TimeSlotSerializer(slots.order_by('start_time'), many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def book_appointment(request):
    data = request.data

    client_name = data.get('client_name') or data.get('fullName')
    client_email = data.get('client_email') or data.get('email')
    client_phone = data.get('client_phone') or data.get('phone')
    service_id = data.get('service') or data.get('service_id') or data.get('piercingId')
    slot_id = data.get('slot') or data.get('slot_id')
    date_str = data.get('date')
    time_str = data.get('time')
    notes = data.get('notes', '')

    if not client_name or not client_email or not client_phone:
        return Response(
            {'error': 'client_name, client_email, and client_phone are required.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Resolve service
    service = None
    if service_id:
        raw_sid = str(service_id).replace('service-', '')
        if raw_sid.isdigit():
            service = PiercingService.objects.filter(id=int(raw_sid)).first()
        if not service:
            service = PiercingService.objects.filter(name__iexact=str(service_id)).first()
        if not service:
            service = PiercingService.objects.filter(name__icontains=str(service_id)).first()
        if not service:
            service = PiercingService.objects.filter(description__icontains=str(service_id)).first()

    if not service:
        service = PiercingService.objects.first()
        if not service:
            service = PiercingService.objects.create(
                name='Standard Ear Piercing',
                category='Lobe',
                price=1200.00,
                duration_mins=30,
                healing_time='6-8 weeks',
                jewelry_material='Implant Grade Titanium',
                description='Consultation and precision piercing with sterile autoclave jewelry.',
            )

    # Resolve slot with transaction lock
    with transaction.atomic():
        slot = None
        if slot_id and str(slot_id).isdigit():
            slot = TimeSlot.objects.select_for_update().filter(id=int(slot_id)).first()

        if not slot and date_str and time_str:
            try:
                target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
                parsed_time = _parse_flexible_time(time_str) or time(14, 0)

                slot = TimeSlot.objects.select_for_update().filter(
                    date=target_date, start_time__hour=parsed_time.hour, start_time__minute=parsed_time.minute
                ).first()

                if not slot:
                    end_dt = datetime.combine(target_date, parsed_time) + timedelta(minutes=30)
                    slot = TimeSlot.objects.create(
                        date=target_date,
                        start_time=parsed_time,
                        end_time=end_dt.time(),
                        is_booked=False,
                    )
            except Exception:
                pass

        if slot:
            if slot.is_booked:
                return Response(
                    {'error': 'The selected time slot is already booked. Please choose another.'},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            slot.is_booked = True
            slot.save()

        appointment = Appointment.objects.create(
            client_name=client_name,
            client_email=client_email,
            client_phone=client_phone,
            service=service,
            slot=slot,
            status='Pending',
            notes=notes,
        )

    serializer = AppointmentSerializer(appointment)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([AllowAny])
def track_appointment(request, tracking_code=None):
    code = tracking_code or request.GET.get('code')
    if not code:
        return Response({'error': 'Tracking code is required.'}, status=status.HTTP_400_BAD_REQUEST)

    cleaned_code = code.strip().upper()
    appointment = Appointment.objects.filter(tracking_code__iexact=cleaned_code).first()
    if not appointment:
        return Response({'error': f'No appointment found with code {cleaned_code}'}, status=status.HTTP_404_NOT_FOUND)

    serializer = AppointmentSerializer(appointment)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def list_faqs(request):
    faqs = FAQ.objects.all().order_by('order', 'id')
    serializer = FAQSerializer(faqs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'status': 'ok', 'message': 'Thank you! Your message has been received.', 'data': serializer.data},
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ==========================================
# STUDIO ADMIN PORTAL ENDPOINTS
# ==========================================

@api_view(['POST'])
@permission_classes([AllowAny])
def admin_login(request):
    username = (request.data.get('username') or request.data.get('email') or '').strip()
    password = request.data.get('password') or ''

    if not username or not password:
        return Response(
            {'error': 'Please provide both username and password.'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(request, username=username, password=password)
    if user is None and '@' in username:
        matched_user = User.objects.filter(email__iexact=username).first()
        if matched_user:
            user = authenticate(request, username=matched_user.username, password=password)

    if user is None or not user.is_active:
        return Response(
            {'error': 'Invalid credentials. Please verify your username and password.'},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not (user.is_staff or user.is_superuser):
        return Response(
            {'error': 'Access denied. Studio staff or administrator privileges required.'},
            status=status.HTTP_403_FORBIDDEN,
        )

    token, _ = Token.objects.get_or_create(user=user)
    return Response({
        'token': token.key,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
        },
    })


@api_view(['GET'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAdminUser])
def admin_me(request):
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff,
        'is_superuser': user.is_superuser,
    })


@api_view(['POST'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAdminUser])
def admin_logout(request):
    Token.objects.filter(user=request.user).delete()
    return Response({'status': 'ok', 'message': 'Logged out successfully.'})


class BaseAdminViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAdminUser]


class AdminPiercingServiceViewSet(BaseAdminViewSet):
    queryset = PiercingService.objects.all().order_by('name')
    serializer_class = PiercingServiceSerializer


class AdminTimeSlotViewSet(BaseAdminViewSet):
    queryset = TimeSlot.objects.all().order_by('date', 'start_time')
    serializer_class = TimeSlotSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        date_str = self.request.query_params.get('date')
        if date_str:
            qs = qs.filter(date=date_str)
        return qs

    def create(self, request, *args, **kwargs):
        data = request.data.copy() if hasattr(request.data, 'copy') else dict(request.data)
        if 'start_time' in data:
            parsed_start = _parse_flexible_time(data['start_time'])
            if parsed_start:
                data['start_time'] = parsed_start.strftime('%H:%M:%S')
                if not data.get('end_time'):
                    end_dt = datetime.combine(datetime.today(), parsed_start) + timedelta(minutes=30)
                    data['end_time'] = end_dt.time().strftime('%H:%M:%S')
        if data.get('end_time'):
            parsed_end = _parse_flexible_time(data['end_time'])
            if parsed_end:
                data['end_time'] = parsed_end.strftime('%H:%M:%S')

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class AdminFAQViewSet(BaseAdminViewSet):
    queryset = FAQ.objects.all().order_by('order', 'id')
    serializer_class = FAQSerializer


class AdminAppointmentViewSet(BaseAdminViewSet):
    queryset = Appointment.objects.select_related('service', 'slot').all().order_by('-created_at')
    serializer_class = AppointmentSerializer

    def get_object(self):
        lookup_val = self.kwargs.get(self.lookup_field)
        qs = self.filter_queryset(self.get_queryset())
        if str(lookup_val).isdigit():
            obj = qs.filter(pk=int(lookup_val)).first()
            if obj:
                self.check_object_permissions(self.request, obj)
                return obj
        obj = qs.filter(tracking_code__iexact=str(lookup_val)).first()
        if obj:
            self.check_object_permissions(self.request, obj)
            return obj
        raise Http404('Appointment not found.')

    def perform_update(self, serializer):
        with transaction.atomic():
            instance = serializer.save()
            if instance.slot:
                if instance.status == 'Cancelled':
                    instance.slot.is_booked = False
                    instance.slot.save()
                elif instance.status in ('Pending', 'Confirmed', 'Completed'):
                    instance.slot.is_booked = True
                    instance.slot.save()

    def perform_destroy(self, instance):
        with transaction.atomic():
            if instance.slot and instance.slot.is_booked:
                instance.slot.is_booked = False
                instance.slot.save()
            instance.delete()


class AdminContactMessageViewSet(BaseAdminViewSet):
    queryset = ContactMessage.objects.all().order_by('-created_at')
    serializer_class = ContactMessageSerializer
