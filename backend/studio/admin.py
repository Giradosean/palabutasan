from django.contrib import admin
from .models import PiercingService, TimeSlot, Appointment, FAQ, ContactMessage


@admin.register(PiercingService)
class PiercingServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'duration_mins', 'healing_time', 'jewelry_material')
    list_filter = ('category',)
    search_fields = ('name', 'category', 'description')


@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ('date', 'start_time', 'end_time', 'is_booked')
    list_filter = ('date', 'is_booked')
    ordering = ('date', 'start_time')


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('tracking_code', 'client_name', 'service', 'slot', 'status', 'created_at')
    list_filter = ('status', 'service', 'created_at')
    search_fields = ('tracking_code', 'client_name', 'client_email', 'client_phone')
    readonly_fields = ('tracking_code', 'created_at')


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'order')
    list_editable = ('order',)
    search_fields = ('question', 'answer')
    ordering = ('order', 'id')


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('sender_name', 'email', 'created_at')
    search_fields = ('sender_name', 'email', 'message')
    readonly_fields = ('created_at',)
