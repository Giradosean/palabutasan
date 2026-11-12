const API_BASE = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');

export interface ApiPiercingService {
  id: number;
  name: string;
  category: string;
  price: string | number;
  duration_mins: number;
  healing_time: string;
  jewelry_material: string;
  description: string;
  image_url: string;
}

export interface ApiTimeSlot {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  time: string;
  is_booked: boolean;
}

export interface ApiAppointment {
  id: number;
  tracking_code: string;
  referenceNumber: string;
  client_name: string;
  fullName: string;
  client_email: string;
  email: string;
  client_phone: string;
  phone: string;
  service?: number;
  service_name?: string;
  piercingName?: string;
  slot?: number;
  slot_date?: string;
  slot_time?: string;
  date?: string;
  time?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
  created_at: string;
}

export interface ApiFAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export interface BookAppointmentPayload {
  client_name?: string;
  fullName?: string;
  client_email?: string;
  email?: string;
  client_phone?: string;
  phone?: string;
  service_id?: string | number;
  piercingId?: string;
  piercingName?: string;
  slot_id?: number;
  date: string;
  time: string;
  notes?: string;
  peopleCount?: number;
}

export const api = {
  baseUrl: API_BASE,

  async getServices(): Promise<ApiPiercingService[]> {
    try {
      const res = await fetch(`${API_BASE}/api/services/`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API getServices failed, fallback to local data', err);
      return [];
    }
  },

  async getSlots(dateStr: string): Promise<ApiTimeSlot[]> {
    try {
      const res = await fetch(`${API_BASE}/api/slots/?date=${encodeURIComponent(dateStr)}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API getSlots failed, fallback to local slot generator', err);
      return [];
    }
  },

  async bookAppointment(payload: BookAppointmentPayload): Promise<ApiAppointment> {
    const res = await fetch(`${API_BASE}/api/appointments/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_name: payload.fullName || payload.client_name,
        client_email: payload.email || payload.client_email,
        client_phone: payload.phone || payload.client_phone,
        service_id: payload.service_id || payload.piercingId,
        date: payload.date,
        time: payload.time,
        notes: payload.notes || '',
        slot_id: payload.slot_id,
      }),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Booking failed with status ${res.status}`);
    }
    return await res.json();
  },

  async trackAppointment(trackingCode: string): Promise<ApiAppointment> {
    const cleaned = trackingCode.trim();
    const res = await fetch(`${API_BASE}/api/appointments/track/${encodeURIComponent(cleaned)}/`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Appointment not found`);
    }
    return await res.json();
  },

  async getFAQs(): Promise<ApiFAQ[]> {
    try {
      const res = await fetch(`${API_BASE}/api/faqs/`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API getFAQs failed, fallback to local data', err);
      return [];
    }
  },

  async submitContact(data: { sender_name: string; email: string; message: string }): Promise<boolean> {
    const res = await fetch(`${API_BASE}/api/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to submit contact message');
    }
    return true;
  },
};

