from django.urls import path
from .views import (
    list_services,
    list_slots,
    book_appointment,
    track_appointment,
    list_faqs,
    submit_contact,
)

urlpatterns = [
    path('services/', list_services, name='api-services'),
    path('slots/', list_slots, name='api-slots'),
    path('appointments/', book_appointment, name='api-book-appointment'),
    path('appointments/book/', book_appointment, name='api-book-appointment-alt'),
    path('appointments/track/', track_appointment, name='api-track-appointment-query'),
    path('appointments/track/<str:tracking_code>/', track_appointment, name='api-track-appointment-param'),
    path('faqs/', list_faqs, name='api-faqs'),
    path('contact/', submit_contact, name='api-contact'),
]

