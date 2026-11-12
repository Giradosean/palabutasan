from datetime import datetime, time, timedelta
from rest_framework import serializers
from .models import PiercingService, TimeSlot, Appointment, FAQ, ContactMessage


class PiercingServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PiercingService
        fields = [
            'id',
            'name',
            'category',
            'price',
            'duration_mins',
            'healing_time',
            'jewelry_material',
            'description',
            'image_url',
        ]


class TimeSlotSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()
    end_time = serializers.TimeField(required=False)

    class Meta:
        model = TimeSlot
        fields = [
            'id',
            'date',
            'start_time',
            'end_time',
            'time',
            'is_booked',
        ]

    def get_time(self, obj):
        try:
            return obj.start_time.strftime('%I:%M %p').lstrip('0')
        except Exception:
            return str(obj.start_time)

    def validate(self, attrs):
        start_time = attrs.get('start_time') or (self.instance.start_time if self.instance else None)
        end_time = attrs.get('end_time') or (self.instance.end_time if self.instance else None)
        if start_time and not end_time:
            dt = datetime.combine(datetime.today(), start_time) + timedelta(minutes=30)
            attrs['end_time'] = dt.time()
        return attrs


class AppointmentSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)
    slot_date = serializers.DateField(source='slot.date', read_only=True)
    slot_time = serializers.SerializerMethodField()
    referenceNumber = serializers.CharField(source='tracking_code', read_only=True)
    fullName = serializers.CharField(source='client_name', read_only=True)
    email = serializers.CharField(source='client_email', read_only=True)
    phone = serializers.CharField(source='client_phone', read_only=True)
    piercingName = serializers.CharField(source='service.name', read_only=True)
    date = serializers.DateField(source='slot.date', read_only=True)
    time = serializers.SerializerMethodField()

    class Meta:
        model = Appointment
        fields = [
            'id',
            'tracking_code',
            'referenceNumber',
            'client_name',
            'fullName',
            'client_email',
            'email',
            'client_phone',
            'phone',
            'service',
            'service_name',
            'piercingName',
            'slot',
            'slot_date',
            'slot_time',
            'date',
            'time',
            'status',
            'notes',
            'created_at',
        ]
        read_only_fields = ['tracking_code', 'created_at']

    def get_slot_time(self, obj):
        if obj.slot:
            return obj.slot.start_time.strftime('%I:%M %p').lstrip('0')
        return ''

    def get_time(self, obj):
        return self.get_slot_time(obj)


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'order']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'sender_name', 'email', 'message', 'created_at']
        read_only_fields = ['created_at']
