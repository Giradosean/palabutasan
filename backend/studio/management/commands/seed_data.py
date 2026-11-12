from django.core.management.base import BaseCommand
from studio.models import PiercingService, FAQ, TimeSlot
from datetime import date, timedelta, time

SERVICES_DATA = [
    {
        "name": "Standard Lobe Piercing",
        "category": "Ear",
        "price": 850.00,
        "duration_mins": 30,
        "healing_time": "6-8 weeks",
        "jewelry_material": "Implant Grade Titanium (ASTM F-136) Labret",
        "description": "The quintessential starting point. Single or pair lobe perforation performed with surgical needles.",
        "image_url": ""
    },
    {
        "name": "Helix Piercing",
        "category": "Ear",
        "price": 1200.00,
        "duration_mins": 30,
        "healing_time": "6-9 months",
        "jewelry_material": "Implant Grade Titanium Flatback",
        "description": "Upper rim cartilage piercing with sterile mirror-polish titanium flatback post.",
        "image_url": ""
    },
    {
        "name": "Conch Piercing",
        "category": "Ear",
        "price": 1400.00,
        "duration_mins": 45,
        "healing_time": "6-12 months",
        "jewelry_material": "Threadless Titanium Post with Bezel Gem",
        "description": "Perforates the central cup of the ear cartilage. Highly striking and anatomical.",
        "image_url": ""
    },
    {
        "name": "Tragus Piercing",
        "category": "Ear",
        "price": 1300.00,
        "duration_mins": 30,
        "healing_time": "4-8 months",
        "jewelry_material": "Implant Grade Titanium Mini Labret",
        "description": "Small cartilage flap directly in front of the ear canal.",
        "image_url": ""
    },
    {
        "name": "Nostril Piercing",
        "category": "Facial",
        "price": 1350.00,
        "duration_mins": 30,
        "healing_time": "4-6 months",
        "jewelry_material": "F-136 Titanium Threadless Flatback",
        "description": "Classic side nostril placement with secure, low-profile internal flatback disk.",
        "image_url": ""
    },
    {
        "name": "Septum Piercing",
        "category": "Facial",
        "price": 1500.00,
        "duration_mins": 45,
        "healing_time": "2-3 months",
        "jewelry_material": "Circular Barbell or Seamless Clicker Ring",
        "description": "Precise piercing through the membranous sweet spot between nasal cartilages.",
        "image_url": ""
    },
    {
        "name": "Navel Piercing",
        "category": "Body",
        "price": 1600.00,
        "duration_mins": 45,
        "healing_time": "6-12 months",
        "jewelry_material": "Internally Threaded Curved Titanium Barbell",
        "description": "Upper navel rim perforation using curved implant-grade titanium.",
        "image_url": ""
    }
]

FAQS_DATA = [
    {
        "question": "Does getting pierced hurt?",
        "answer": "Discomfort varies depending on the location and individual tolerance. Soft tissue like the lobe or septum usually feels like a quick pinch (2-3/10). Cartilage areas feel like a firm pressure and brief warm throb (4-6/10).",
        "order": 1
    },
    {
        "question": "How long does a piercing appointment take?",
        "answer": "The piercing itself takes just a second, but each appointment is booked for 30 to 45 minutes for thorough consultation, sterile jewelry selection, precise anatomical marking, and aftercare review.",
        "order": 2
    },
    {
        "question": "How long does the healing process take?",
        "answer": "Earlobes typically heal in 6-8 weeks, while cartilage piercings (helix, conch) require 6-12 months to fully mature. Surface and facial piercings take 2-4 months.",
        "order": 3
    },
    {
        "question": "Can I bring my own jewelry to be pierced with?",
        "answer": "For sterility and anatomical safety, initial piercings are performed exclusively with our certified implant-grade titanium or solid 14k gold autoclave-sterilized jewelry.",
        "order": 4
    },
    {
        "question": "Can I cancel or reschedule my appointment?",
        "answer": "Yes. You can reschedule or cancel through our online portal or by contacting the studio at least 24 hours prior to your scheduled slot.",
        "order": 5
    }
]


class Command(BaseCommand):
    help = "Seed studio database with initial services, FAQs, and slots"

    def handle(self, *args, **options):
        # Services
        for item in SERVICES_DATA:
            PiercingService.objects.get_or_create(
                name=item["name"],
                defaults=item
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(SERVICES_DATA)} PiercingServices."))

        # FAQs
        for item in FAQS_DATA:
            FAQ.objects.get_or_create(
                question=item["question"],
                defaults=item
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(FAQS_DATA)} FAQs."))

        # Create slots for the next 14 days
        today = date.today()
        slot_times = [
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
        created_slots = 0
        for i in range(14):
            day = today + timedelta(days=i)
            if day.weekday() == 0:  # Closed Monday
                continue
            for st, et in slot_times:
                _, created = TimeSlot.objects.get_or_create(
                    date=day,
                    start_time=st,
                    end_time=et,
                    defaults={"is_booked": False}
                )
                if created:
                    created_slots += 1
        self.stdout.write(self.style.SUCCESS(f"Seeded {created_slots} TimeSlots across the next 14 days."))

