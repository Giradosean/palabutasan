import { Appointment, TimeSlot } from '../types';

export const STANDARD_TIME_SLOTS: string[] = [
  '10:00 AM',
  '11:00 AM',
  '11:30 AM',
  '1:00 PM',
  '2:00 PM',
  '2:30 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:30 PM'
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    referenceNumber: 'PAL-2026-001',
    fullName: 'Sample Customer',
    email: 'customer@example.com',
    phone: '0917 123 4567',
    piercingId: 'helix',
    piercingName: 'Helix Piercing',
    date: '2026-10-15',
    time: '2:00 PM',
    peopleCount: 1,
    notes: 'First cartilage piercing. Looking for a minimalist titanium stud.',
    status: 'Confirmed',
    createdAt: '2026-10-01T10:00:00Z'
  },
  {
    referenceNumber: 'PAL-2026-042',
    fullName: 'Maria Santos',
    email: 'maria.s@example.com',
    phone: '0928 987 6543',
    piercingId: 'conch',
    piercingName: 'Conch Piercing',
    date: '2026-10-18',
    time: '11:30 AM',
    peopleCount: 1,
    notes: 'Inner ear placement, interested in 14k gold cluster end.',
    status: 'Confirmed',
    createdAt: '2026-10-01T14:30:00Z'
  },
  {
    referenceNumber: 'PAL-2026-088',
    fullName: 'David Chen',
    email: 'david.chen@example.com',
    phone: '0919 555 1212',
    piercingId: 'lobe',
    piercingName: 'Lobe Piercing',
    date: '2026-10-20',
    time: '4:00 PM',
    peopleCount: 2,
    notes: 'Booking for me and a friend.',
    status: 'Pending',
    createdAt: '2026-10-01T16:15:00Z'
  }
];

const STORAGE_KEY = 'palabutasan_appointments_v1';

export function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_APPOINTMENTS;
  }
}

export function saveAppointment(appointment: Appointment): void {
  try {
    const list = getStoredAppointments();
    const updated = [appointment, ...list.filter(a => a.referenceNumber !== appointment.referenceNumber)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save appointment to localStorage', err);
  }
}

export function findAppointmentByReference(ref: string): Appointment | undefined {
  const list = getStoredAppointments();
  const cleaned = ref.trim().toUpperCase();
  return list.find(a => a.referenceNumber.toUpperCase() === cleaned);
}

export function updateAppointmentStatus(ref: string, newStatus: Appointment['status']): boolean {
  try {
    const list = getStoredAppointments();
    const idx = list.findIndex(a => a.referenceNumber.toUpperCase() === ref.trim().toUpperCase());
    if (idx !== -1) {
      list[idx].status = newStatus;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function generateDailySlots(dateStr: string): TimeSlot[] {
  // Hash seed from date string to determine mock booked/limited slots deterministically
  const dayNum = parseInt(dateStr.replace(/-/g, ''), 10) || 42;
  
  return STANDARD_TIME_SLOTS.map((time, index) => {
    const pseudoRand = ((dayNum * 13 + index * 7) % 10);
    let status: 'available' | 'limited' | 'booked' = 'available';
    if (pseudoRand === 2 || pseudoRand === 6) {
      status = 'booked';
    } else if (pseudoRand === 4) {
      status = 'limited';
    }
    return {
      id: `${dateStr}-${time.replace(/\s+/g, '')}`,
      time,
      status
    };
  });
}

export function getDateStatus(date: Date): 'available' | 'limited' | 'booked' | 'closed' {
  const dayOfWeek = date.getDay(); // 0 is Sunday
  if (dayOfWeek === 1) { // Studio closed Mondays for deep sterilization & maintenance
    return 'closed';
  }
  const dayOfMonth = date.getDate();
  if (dayOfMonth % 7 === 0) {
    return 'booked';
  }
  if (dayOfMonth % 4 === 0) {
    return 'limited';
  }
  return 'available';
}
