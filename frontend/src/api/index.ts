const API_BASE = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');

export const ADMIN_TOKEN_KEY = 'palabutasan_admin_token';
export const ADMIN_USER_KEY = 'palabutasan_admin_user';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
}

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
  slot?: number | null;
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

export interface ApiContactMessage {
  id: number;
  sender_name: string;
  email: string;
  message: string;
  created_at: string;
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

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function getAdminUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(ADMIN_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAdminSession(token: string, user?: AdminUser): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  if (user) {
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
  }
}

export function clearAdminSession(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}

function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };
}

async function handleAdminResponse<T>(res: Response): Promise<T> {
  if (res.status === 401 || res.status === 403) {
    clearAdminSession();
    throw new Error('UNAUTHORIZED');
  }
  if (res.status === 204) {
    return {} as T;
  }
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    const msg =
      errData.error ||
      errData.detail ||
      (typeof errData === 'object' ? Object.values(errData).flat().join(' ') : '') ||
      `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return await res.json();
}

export const api = {
  baseUrl: API_BASE,

  // Public API
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

  // ==========================================
  // Studio Admin Portal API (Authorization: Token <token>)
  // ==========================================

  async adminLogin(username: string, password: string): Promise<{ token: string; user: AdminUser }> {
    const res = await fetch(`${API_BASE}/api/admin/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || errData.detail || 'Invalid username or password.');
    }
    const data = await res.json();
    setAdminSession(data.token, data.user);
    return data;
  },

  async adminGetMe(): Promise<AdminUser> {
    const res = await fetch(`${API_BASE}/api/admin/me/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleAdminResponse<AdminUser>(res);
  },

  async adminLogout(): Promise<void> {
    try {
      await fetch(`${API_BASE}/api/admin/logout/`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
    } finally {
      clearAdminSession();
    }
  },

  // Admin Appointments CRUD
  async adminGetAppointments(): Promise<ApiAppointment[]> {
    const res = await fetch(`${API_BASE}/api/admin/appointments/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleAdminResponse<ApiAppointment[]>(res);
  },

  async adminUpdateAppointment(
    idOrCode: number | string,
    payload: Partial<{ status: ApiAppointment['status']; notes: string; client_name: string; client_email: string; client_phone: string }>
  ): Promise<ApiAppointment> {
    const res = await fetch(`${API_BASE}/api/admin/appointments/${encodeURIComponent(String(idOrCode))}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleAdminResponse<ApiAppointment>(res);
  },

  async adminDeleteAppointment(idOrCode: number | string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/admin/appointments/${encodeURIComponent(String(idOrCode))}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleAdminResponse<void>(res);
  },

  // Admin Piercing Services CRUD
  async adminGetServices(): Promise<ApiPiercingService[]> {
    const res = await fetch(`${API_BASE}/api/admin/services/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleAdminResponse<ApiPiercingService[]>(res);
  },

  async adminCreateService(payload: Omit<ApiPiercingService, 'id'>): Promise<ApiPiercingService> {
    const res = await fetch(`${API_BASE}/api/admin/services/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleAdminResponse<ApiPiercingService>(res);
  },

  async adminUpdateService(id: number, payload: Partial<Omit<ApiPiercingService, 'id'>>): Promise<ApiPiercingService> {
    const res = await fetch(`${API_BASE}/api/admin/services/${id}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleAdminResponse<ApiPiercingService>(res);
  },

  async adminDeleteService(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/api/admin/services/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleAdminResponse<void>(res);
  },

  // Admin Time Slots CRUD
  async adminGetSlots(dateStr?: string): Promise<ApiTimeSlot[]> {
    const query = dateStr ? `?date=${encodeURIComponent(dateStr)}` : '';
    const res = await fetch(`${API_BASE}/api/admin/slots/${query}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleAdminResponse<ApiTimeSlot[]>(res);
  },

  async adminCreateSlot(payload: {
    date: string;
    start_time: string;
    end_time?: string;
    is_booked?: boolean;
  }): Promise<ApiTimeSlot> {
    const res = await fetch(`${API_BASE}/api/admin/slots/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleAdminResponse<ApiTimeSlot>(res);
  },

  async adminUpdateSlot(id: number, payload: Partial<ApiTimeSlot>): Promise<ApiTimeSlot> {
    const res = await fetch(`${API_BASE}/api/admin/slots/${id}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleAdminResponse<ApiTimeSlot>(res);
  },

  async adminDeleteSlot(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/api/admin/slots/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleAdminResponse<void>(res);
  },

  // Admin FAQs CRUD
  async adminGetFAQs(): Promise<ApiFAQ[]> {
    const res = await fetch(`${API_BASE}/api/admin/faqs/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleAdminResponse<ApiFAQ[]>(res);
  },

  async adminCreateFAQ(payload: Omit<ApiFAQ, 'id'>): Promise<ApiFAQ> {
    const res = await fetch(`${API_BASE}/api/admin/faqs/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleAdminResponse<ApiFAQ>(res);
  },

  async adminUpdateFAQ(id: number, payload: Partial<Omit<ApiFAQ, 'id'>>): Promise<ApiFAQ> {
    const res = await fetch(`${API_BASE}/api/admin/faqs/${id}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    return handleAdminResponse<ApiFAQ>(res);
  },

  async adminDeleteFAQ(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/api/admin/faqs/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleAdminResponse<void>(res);
  },

  // Admin Contact Messages
  async adminGetMessages(): Promise<ApiContactMessage[]> {
    const res = await fetch(`${API_BASE}/api/admin/messages/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleAdminResponse<ApiContactMessage[]>(res);
  },

  async adminDeleteMessage(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/api/admin/messages/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleAdminResponse<void>(res);
  },
};
