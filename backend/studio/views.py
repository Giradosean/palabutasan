from datetime import datetime, time
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
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


@api_view(['GET'])
def list_services(request):
    services = PiercingService.objects.all().order_by('name')
    category = request.GET.get('category')
    if category:
        services = services.filter(category__iexact=category)
    serializer = PiercingServiceSerializer(services, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def list_slots(request):
    date_str = request.GET.get('date')
    if date_str:
        try:
            target_date = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=status.HTTP_400_BAD_REQUEST)

        # studio closed on Mondays (weekday == 0)
        if target_date.weekday() == 0:
            return Response([])

        # Ensure slots exist for this date
        existing_count = TimeSlot.objects.filter(date=target_date).count()
        if existing_count == 0:
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
        if str(service_id).isdigit():
            service = PiercingService.objects.filter(id=int(service_id)).first()
        if not service:
            service = PiercingService.objects.filter(name__iexact=str(service_id)).first()
        if not service:
            service = PiercingService.objects.filter(description__icontains=str(service_id)).first()

    if not service:
        # Fallback to the first available service or create a general one
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
                cleaned_time = time_str.strip().upper()
                for fmt in ('%I:%M %p', '%I:%M%p', '%H:%M'):
                    try:
                        parsed_time = datetime.strptime(cleaned_time, fmt).time()
                        break
                    except ValueError:
                        continue
                else:
                    parsed_time = time(14, 0)

                slot = TimeSlot.objects.select_for_update().filter(
                    date=target_date, start_time__hour=parsed_time.hour, start_time__minute=parsed_time.minute
                ).first()

                if not slot:
                    slot = TimeSlot.objects.create(
                        date=target_date,
                        start_time=parsed_time,
                        end_time=time((parsed_time.hour + (parsed_time.minute + 30) // 60) % 24, (parsed_time.minute + 30) % 60),
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
            status='Confirmed',
            notes=notes,
        )

    serializer = AppointmentSerializer(appointment)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
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
def list_faqs(request):
    faqs = FAQ.objects.all().order_by('order', 'id')
    serializer = FAQSerializer(faqs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def submit_contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {'status': 'ok', 'message': 'Thank you! Your message has been received.', 'data': serializer.data},
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
