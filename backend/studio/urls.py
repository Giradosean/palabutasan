from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    list_services,
    list_slots,
    book_appointment,
    track_appointment,
    list_faqs,
    submit_contact,
    admin_login,
    admin_me,
    admin_logout,
    AdminPiercingServiceViewSet,
    AdminTimeSlotViewSet,
    AdminFAQViewSet,
    AdminAppointmentViewSet,
    AdminContactMessageViewSet,
)

admin_router = DefaultRouter()
admin_router.register(r'services', AdminPiercingServiceViewSet, basename='admin-services')
admin_router.register(r'slots', AdminTimeSlotViewSet, basename='admin-slots')
admin_router.register(r'faqs', AdminFAQViewSet, basename='admin-faqs')
admin_router.register(r'appointments', AdminAppointmentViewSet, basename='admin-appointments')
admin_router.register(r'messages', AdminContactMessageViewSet, basename='admin-messages')
admin_router.register(r'contact-messages', AdminContactMessageViewSet, basename='admin-contact-messages')

urlpatterns = [
    # Public endpoints
    path('services/', list_services, name='api-services'),
    path('slots/', list_slots, name='api-slots'),
    path('appointments/', book_appointment, name='api-book-appointment'),
    path('appointments/book/', book_appointment, name='api-book-appointment-alt'),
    path('appointments/track/', track_appointment, name='api-track-appointment-query'),
    path('appointments/track/<str:tracking_code>/', track_appointment, name='api-track-appointment-param'),
    path('faqs/', list_faqs, name='api-faqs'),
    path('contact/', submit_contact, name='api-contact'),

    # Studio Admin Portal endpoints
    path('admin/login/', admin_login, name='api-admin-login'),
    path('admin/me/', admin_me, name='api-admin-me'),
    path('admin/logout/', admin_logout, name='api-admin-logout'),
    path('admin/', include(admin_router.urls)),
]
