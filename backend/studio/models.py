import random
import string
from django.db import models


class PiercingService(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_mins = models.IntegerField(default=30)
    healing_time = models.CharField(max_length=100)
    jewelry_material = models.CharField(max_length=200, default='Implant Grade Titanium')
    description = models.TextField(blank=True)
    image_url = models.CharField(max_length=500, blank=True, default='')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} (₱{self.price})"


class TimeSlot(models.Model):
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_booked = models.BooleanField(default=False)

    class Meta:
        ordering = ['date', 'start_time']
        unique_together = ('date', 'start_time', 'end_time')

    def __str__(self):
        status = "Booked" if self.is_booked else "Available"
        return f"{self.date} {self.start_time.strftime('%I:%M %p')} - {self.end_time.strftime('%I:%M %p')} [{status}]"


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

    tracking_code = models.CharField(max_length=50, unique=True, editable=False, db_index=True)
    client_name = models.CharField(max_length=200)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=50)
    service = models.ForeignKey(PiercingService, on_delete=models.PROTECT, related_name='appointments')
    slot = models.ForeignKey(TimeSlot, on_delete=models.SET_NULL, null=True, blank=True, related_name='appointments')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    notes = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.tracking_code:
            for _ in range(20):
                digits = random.randint(1000, 9999)
                candidate = f"PLB-{digits}"
                if not Appointment.objects.filter(tracking_code=candidate).exists():
                    self.tracking_code = candidate
                    break
            if not self.tracking_code:
                suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
                self.tracking_code = f"PLB-{suffix}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.tracking_code} - {self.client_name} ({self.service.name})"


class FAQ(models.Model):
    question = models.CharField(max_length=300)
    answer = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'

    def __str__(self):
        return self.question


class ContactMessage(models.Model):
    sender_name = models.CharField(max_length=200)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.sender_name} ({self.email}) - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
