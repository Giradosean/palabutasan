import React, { useState, useEffect, useCallback } from 'react';
import {
  api,
  ApiAppointment,
  ApiPiercingService,
  ApiTimeSlot,
  ApiFAQ,
  ApiContactMessage,
  AdminUser,
  getAdminToken,
  getAdminUser,
} from '../api';
import {
  ShieldCheck,
  Calendar,
  Search,
  CheckCircle2,
  Clock,
  Edit2,
  AlertCircle,
  Plus,
  Trash2,
  RefreshCw,
  LogOut,
  HelpCircle,
  Mail,
  Sparkles,
  X,
  Check,
} from 'lucide-react';

interface AdminPageProps {
  onRequireLogin: () => void;
}

type DashboardTab = 'appointments' | 'services' | 'slots' | 'faqs-messages';

const EMPTY_SERVICE_FORM = {
  name: '',
  category: 'Ear',
  price: '1200',
  duration_mins: 30,
  healing_time: '6-8 weeks',
  jewelry_material: 'Implant Grade Titanium (ASTM F-136)',
  description: '',
  image_url: '',
};

const EMPTY_FAQ_FORM = {
  question: '',
  answer: '',
  order: 1,
};

export const AdminPage: React.FC<AdminPageProps> = ({ onRequireLogin }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => getAdminUser());
  const [activeTab, setActiveTab] = useState<DashboardTab>('appointments');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [actionNotice, setActionNotice] = useState<string>('');
  const [errorNotice, setErrorNotice] = useState<string>('');

  // Data stores
  const [appointments, setAppointments] = useState<ApiAppointment[]>([]);
  const [services, setServices] = useState<ApiPiercingService[]>([]);
  const [slots, setSlots] = useState<ApiTimeSlot[]>([]);
  const [faqs, setFaqs] = useState<ApiFAQ[]>([]);
  const [messages, setMessages] = useState<ApiContactMessage[]>([]);

  // Tab A: Appointments state
  const [apptSearch, setApptSearch] = useState('');
  const [apptStatusFilter, setApptStatusFilter] = useState<
    'All' | 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  >('All');

  // Tab B: Services state
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [serviceForm, setServiceForm] = useState(EMPTY_SERVICE_FORM);
  const [isSavingService, setIsSavingService] = useState(false);

  // Tab C: Time Slots state
  const tomorrowDefault = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [slotFilterDate, setSlotFilterDate] = useState<string>(tomorrowDefault);
  const [newSlotDate, setNewSlotDate] = useState<string>(tomorrowDefault);
  const [newSlotStart, setNewSlotStart] = useState<string>('10:00');
  const [newSlotEnd, setNewSlotEnd] = useState<string>('10:30');
  const [isSavingSlot, setIsSavingSlot] = useState(false);

  // Tab D: FAQs & Contact Messages state
  const [subTabD, setSubTabD] = useState<'faqs' | 'messages'>('faqs');
  const [showFaqForm, setShowFaqForm] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<number | null>(null);
  const [faqForm, setFaqForm] = useState(EMPTY_FAQ_FORM);
  const [isSavingFaq, setIsSavingFaq] = useState(false);

  const showSuccess = (msg: string) => {
    setActionNotice(msg);
    setErrorNotice('');
    setTimeout(() => setActionNotice(''), 3500);
  };

  const showError = (msg: string) => {
    setErrorNotice(msg);
    setTimeout(() => setErrorNotice(''), 5000);
  };

  const handleAuthError = useCallback(
    (err: any) => {
      if (err?.message === 'UNAUTHORIZED') {
        onRequireLogin();
        return true;
      }
      return false;
    },
    [onRequireLogin]
  );

  const loadAllData = useCallback(async () => {
    const token = getAdminToken();
    if (!token) {
      onRequireLogin();
      return;
    }

    setIsLoading(true);
    try {
      const [meData, apptsData, servicesData, slotsData, faqsData, msgsData] = await Promise.all([
        api.adminGetMe(),
        api.adminGetAppointments(),
        api.adminGetServices(),
        api.adminGetSlots(slotFilterDate || undefined),
        api.adminGetFAQs(),
        api.adminGetMessages(),
      ]);
      setAdminUser(meData);
      setAppointments(apptsData);
      setServices(servicesData);
      setSlots(slotsData);
      setFaqs(faqsData);
      setMessages(msgsData);
    } catch (err: any) {
      if (!handleAuthError(err)) {
        showError(err.message || 'Failed to load studio dashboard data.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [slotFilterDate, handleAuthError, onRequireLogin]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const handleLogout = async () => {
    await api.adminLogout();
    onRequireLogin();
  };

  // ==========================================
  // TAB A: APPOINTMENT HANDLERS
  // ==========================================
  const handleAppointmentStatusChange = async (
    appt: ApiAppointment,
    newStatus: ApiAppointment['status']
  ) => {
    try {
      const updated = await api.adminUpdateAppointment(appt.id, { status: newStatus });
      setAppointments((prev) => prev.map((a) => (a.id === appt.id ? updated : a)));
      showSuccess(`Appointment ${appt.tracking_code} updated to ${newStatus}.`);
      // Refresh slots in case slot booking state changed
      const updatedSlots = await api.adminGetSlots(slotFilterDate || undefined);
      setSlots(updatedSlots);
    } catch (err: any) {
      if (!handleAuthError(err)) {
        showError(err.message || 'Could not update appointment status.');
      }
    }
  };

  const handleDeleteAppointment = async (appt: ApiAppointment) => {
    if (!window.confirm(`Delete appointment ${appt.tracking_code} for ${appt.client_name}?`)) return;
    try {
      await api.adminDeleteAppointment(appt.id);
      setAppointments((prev) => prev.filter((a) => a.id !== appt.id));
      showSuccess(`Appointment ${appt.tracking_code} deleted.`);
    } catch (err: any) {
      if (!handleAuthError(err)) {
        showError(err.message || 'Could not delete appointment.');
      }
    }
  };

  const filteredAppointments = appointments.filter((a) => {
    const matchesStatus = apptStatusFilter === 'All' || a.status === apptStatusFilter;
    const q = apptSearch.toLowerCase().trim();
    const code = (a.tracking_code || a.referenceNumber || '').toLowerCase();
    const name = (a.client_name || a.fullName || '').toLowerCase();
    const email = (a.client_email || a.email || '').toLowerCase();
    const phone = (a.client_phone || a.phone || '').toLowerCase();
    const service = (a.service_name || a.piercingName || '').toLowerCase();
    const matchesSearch =
      !q ||
      code.includes(q) ||
      name.includes(q) ||
      email.includes(q) ||
      phone.includes(q) ||
      service.includes(q);
    return matchesStatus && matchesSearch;
  });

  // ==========================================
  // TAB B: PIERCING SERVICES HANDLERS
  // ==========================================
  const openAddService = () => {
    setEditingServiceId(null);
    setServiceForm(EMPTY_SERVICE_FORM);
    setShowServiceForm(true);
  };

  const openEditService = (svc: ApiPiercingService) => {
    setEditingServiceId(svc.id);
    setServiceForm({
      name: svc.name,
      category: svc.category,
      price: String(svc.price),
      duration_mins: svc.duration_mins,
      healing_time: svc.healing_time,
      jewelry_material: svc.jewelry_material,
      description: svc.description || '',
      image_url: svc.image_url || '',
    });
    setShowServiceForm(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.name.trim() || !serviceForm.price) {
      showError('Service name and price are required.');
      return;
    }

    setIsSavingService(true);
    try {
      const payload = {
        name: serviceForm.name.trim(),
        category: serviceForm.category.trim() || 'Ear',
        price: Number(serviceForm.price),
        duration_mins: Number(serviceForm.duration_mins) || 30,
        healing_time: serviceForm.healing_time.trim() || '6-8 weeks',
        jewelry_material: serviceForm.jewelry_material.trim() || 'Implant Grade Titanium',
        description: serviceForm.description.trim(),
        image_url: serviceForm.image_url.trim(),
      };

      if (editingServiceId) {
        const updated = await api.adminUpdateService(editingServiceId, payload);
        setServices((prev) => prev.map((s) => (s.id === editingServiceId ? updated : s)));
        showSuccess(`Updated service "${updated.name}".`);
      } else {
        const created = await api.adminCreateService(payload);
        setServices((prev) => [...prev, created]);
        showSuccess(`Created new service "${created.name}".`);
      }
      setShowServiceForm(false);
      setEditingServiceId(null);
    } catch (err: any) {
      if (!handleAuthError(err)) {
        showError(err.message || 'Could not save piercing service.');
      }
    } finally {
      setIsSavingService(false);
    }
  };

  const handleDeleteService = async (svc: ApiPiercingService) => {
    if (!window.confirm(`Delete piercing service "${svc.name}"?`)) return;
    try {
      await api.adminDeleteService(svc.id);
      setServices((prev) => prev.filter((s) => s.id !== svc.id));
      showSuccess(`Deleted service "${svc.name}".`);
    } catch (err: any) {
      if (!handleAuthError(err)) {
        showError(
          err.message || 'Cannot delete service while appointments are linked to it.'
        );
      }
    }
  };

  // ==========================================
  // TAB C: TIME SLOTS HANDLERS
  // ==========================================
  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotDate || !newSlotStart) {
      showError('Please select a date and start time.');
      return;
    }

    setIsSavingSlot(true);
    try {
      const created = await api.adminCreateSlot({
        date: newSlotDate,
        start_time: newSlotStart,
        end_time: newSlotEnd || undefined,
        is_booked: false,
      });
      if (!slotFilterDate || slotFilterDate === newSlotDate) {
        setSlots((prev) =>
          [...prev, created].sort((a, b) =>
            `${a.date} ${a.start_time}`.localeCompare(`${b.date} ${b.start_time}`)
          )
        );
      }
      showSuccess(`Created time slot ${created.time} on ${created.date}.`);
    } catch (err: any) {
      if (!handleAuthError(err)) {
        showError(err.message || 'Could not create time slot (it may already exist).');
      }
    } finally {
      setIsSavingSlot(false);
    }
  };

  const handleDeleteSlot = async (slot: ApiTimeSlot) => {
    try {
      await api.adminDeleteSlot(slot.id);
      setSlots((prev) => prev.filter((s) => s.id !== slot.id));
      showSuccess(`Removed slot ${slot.time} (${slot.date}).`);
    } catch (err: any) {
      if (!handleAuthError(err)) {
        showError(err.message || 'Could not delete time slot.');
      }
    }
  };

  const handleToggleSlotBooked = async (slot: ApiTimeSlot) => {
    try {
      const updated = await api.adminUpdateSlot(slot.id, { is_booked: !slot.is_booked });
      setSlots((prev) => prev.map((s) => (s.id === slot.id ? updated : s)));
      showSuccess(
        `Slot ${slot.time} marked as ${updated.is_booked ? 'Booked' : 'Available'}.`
      );
    } catch (err: any) {
      if (!handleAuthError(err)) {
        showError(err.message || 'Could not update slot status.');
      }
    }
  };

  // ==========================================
  // TAB D: FAQS & MESSAGES HANDLERS
  // ==========================================
  const openAddFaq = () => {
    setEditingFaqId(null);
    setFaqForm({
      question: '',
      answer: '',
      order: faqs.length + 1,
    });
    setShowFaqForm(true);
  };

  const openEditFaq = (faq: ApiFAQ) => {
    setEditingFaqId(faq.id);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
    });
    setShowFaqForm(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) {
      showError('Question and answer are required.');
      return;
    }

    setIsSavingFaq(true);
    try {
      const payload = {
        question: faqForm.question.trim(),
        answer: faqForm.answer.trim(),
        order: Number(faqForm.order) || 0,
      };
      if (editingFaqId) {
        const updated = await api.adminUpdateFAQ(editingFaqId, payload);
        setFaqs((prev) =>
          prev
            .map((f) => (f.id === editingFaqId ? updated : f))
            .sort((a, b) => a.order - b.order)
        );
        showSuccess('Updated FAQ entry.');
      } else {
        const created = await api.adminCreateFAQ(payload);
        setFaqs((prev) => [...prev, created].sort((a, b) => a.order - b.order));
        showSuccess('Added new FAQ entry.');
      }
      setShowFaqForm(false);
      setEditingFaqId(null);
    } catch (err: any) {
      if (!handleAuthError(err)) {
        showError(err.message || 'Could not save FAQ.');
      }
    } finally {
      setIsSavingFaq(false);
    }
  };

  const handleDeleteFaq = async (faq: ApiFAQ) => {
    if (!window.confirm(`Delete FAQ "${faq.question}"?`)) return;
    try {
      await api.adminDeleteFAQ(faq.id);
      setFaqs((prev) => prev.filter((f) => f.id !== faq.id));
      showSuccess('Deleted FAQ entry.');
    } catch (err: any) {
      if (!handleAuthError(err)) {
        showError(err.message || 'Could not delete FAQ.');
      }
    }
  };

  const handleDeleteMessage = async (msg: ApiContactMessage) => {
    if (!window.confirm(`Delete message from ${msg.sender_name}?`)) return;
    try {
      await api.adminDeleteMessage(msg.id);
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      showSuccess(`Deleted message from ${msg.sender_name}.`);
    } catch (err: any) {
      if (!handleAuthError(err)) {
        showError(err.message || 'Could not delete contact message.');
      }
    }
  };

  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const availableSlotsCount = slots.filter((s) => !s.is_booked).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Studio Operations Top Header */}
      <div className="bg-[#111111] text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#A63D40] mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#A63D40]" />
              <span>Studio Portal · Protected Admin Workspace</span>
            </div>
            <h1 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold tracking-tight">
              Palabutasan Studio Operations
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Signed in as{' '}
              <span className="text-white font-semibold">
                {adminUser?.username || 'Studio Admin'}
              </span>
              {adminUser?.email ? ` (${adminUser.email})` : ''} · Full CRUD control over appointments, services, schedule slots, FAQs, and client inquiries.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start lg:self-auto">
            <button
              onClick={loadAllData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-[#A63D40] hover:bg-[#8E3235] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* KPI Bar & Navigation Tabs */}
        <div className="pt-4 border-t border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 bg-neutral-900 p-1.5 rounded-xl border border-neutral-800">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'appointments'
                  ? 'bg-white text-[#111111]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Appointments ({appointments.length})
              {pendingCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full bg-[#A63D40] text-white">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-white text-[#111111]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Piercing Services ({services.length})
            </button>

            <button
              onClick={() => setActiveTab('slots')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'slots'
                  ? 'bg-white text-[#111111]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Time Slots ({availableSlotsCount} open)
            </button>

            <button
              onClick={() => setActiveTab('faqs-messages')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'faqs-messages'
                  ? 'bg-white text-[#111111]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              FAQs ({faqs.length}) & Inquiries ({messages.length})
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Connected to Live DRF Backend
            </span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {actionNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice('')} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {errorNotice && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{errorNotice}</span>
          </div>
          <button onClick={() => setErrorNotice('')} className="text-rose-700 hover:text-rose-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =========================================================
          TAB (A): VIEW & CONFIRM / CANCEL CUSTOMER APPOINTMENTS
         ========================================================= */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E9E9E7] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#777777] font-semibold mr-1">Filter Status:</span>
              {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setApptStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors cursor-pointer ${
                    apptStatusFilter === st
                      ? 'bg-[#111111] text-white'
                      : 'bg-[#FAFAF7] text-[#777777] hover:text-[#111111] border border-[#E9E9E7]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={apptSearch}
                onChange={(e) => setApptSearch(e.target.value)}
                placeholder="Search tracking code, client, service..."
                className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 pl-9 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
              />
              <Search className="w-3.5 h-3.5 text-[#777777] absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="bg-white border border-[#E9E9E7] rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAF7] border-b border-[#E9E9E7] text-[#777777] uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Tracking Code</th>
                    <th className="py-3.5 px-4">Client Details</th>
                    <th className="py-3.5 px-4">Service & Notes</th>
                    <th className="py-3.5 px-4">Scheduled Slot</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E9E7]">
                  {filteredAppointments.map((appt) => {
                    const code = appt.tracking_code || appt.referenceNumber;
                    const name = appt.client_name || appt.fullName;
                    const email = appt.client_email || appt.email;
                    const phone = appt.client_phone || appt.phone;
                    const serviceName = appt.service_name || appt.piercingName || 'Piercing Service';
                    const slotDate = appt.slot_date || appt.date || '—';
                    const slotTime = appt.slot_time || appt.time || '—';

                    return (
                      <tr key={appt.id || code} className="hover:bg-[#FAFAF7]/60 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-[#111111] whitespace-nowrap">
                          {code}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-[#111111] block">{name}</span>
                          <span className="text-[11px] text-[#777777] block">{phone}</span>
                          <span className="text-[11px] text-[#777777] block">{email}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-[#111111] block">{serviceName}</span>
                          {appt.notes && (
                            <span className="block text-[11px] text-[#777777] italic max-w-xs mt-0.5">
                              "{appt.notes}"
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-semibold text-[#111111] block">{slotDate}</span>
                          <span className="text-[11px] text-[#777777]">{slotTime}</span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold text-[10px] ${
                              appt.status === 'Confirmed'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : appt.status === 'Pending'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : appt.status === 'Completed'
                                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                appt.status === 'Confirmed'
                                  ? 'bg-emerald-500'
                                  : appt.status === 'Pending'
                                  ? 'bg-amber-500'
                                  : appt.status === 'Completed'
                                  ? 'bg-sky-500'
                                  : 'bg-rose-500'
                              }`}
                            />
                            {appt.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            {appt.status !== 'Confirmed' && (
                              <button
                                onClick={() => handleAppointmentStatusChange(appt, 'Confirmed')}
                                className="px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-[11px] transition-colors cursor-pointer"
                              >
                                Confirm
                              </button>
                            )}
                            {appt.status !== 'Completed' && appt.status !== 'Cancelled' && (
                              <button
                                onClick={() => handleAppointmentStatusChange(appt, 'Completed')}
                                className="px-2.5 py-1 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-[11px] transition-colors cursor-pointer"
                              >
                                Complete
                              </button>
                            )}
                            {appt.status !== 'Cancelled' && (
                              <button
                                onClick={() => handleAppointmentStatusChange(appt, 'Cancelled')}
                                className="px-2.5 py-1 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-[11px] transition-colors cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteAppointment(appt)}
                              title="Delete appointment"
                              className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredAppointments.length === 0 && (
              <div className="py-14 text-center space-y-2">
                <p className="text-sm font-semibold text-[#111111]">No appointments found</p>
                <p className="text-xs text-[#777777]">
                  Try adjusting your status filter or search query.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB (B): ADD / EDIT / DELETE PIERCING SERVICES
         ========================================================= */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111]">
                Piercing Service Catalog
              </h2>
              <p className="text-xs text-[#777777] mt-0.5">
                Add new piercing procedures, update studio pricing, healing periods, or remove discontinued services.
              </p>
            </div>
            <button
              onClick={openAddService}
              className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#A63D40] text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Piercing Service</span>
            </button>
          </div>

          {showServiceForm && (
            <form
              onSubmit={handleSaveService}
              className="bg-white border-2 border-[#111111] rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-4">
                <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#111111]">
                  {editingServiceId ? 'Edit Piercing Service' : 'Create New Piercing Service'}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowServiceForm(false)}
                  className="text-[#777777] hover:text-[#111111]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                    placeholder="e.g. Rook Piercing"
                    className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Category *
                  </label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                  >
                    <option value="Ear">Ear</option>
                    <option value="Lobe">Lobe</option>
                    <option value="Cartilage">Cartilage</option>
                    <option value="Facial">Facial</option>
                    <option value="Body">Body</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Price (PHP ₱) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                    placeholder="1400"
                    className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={serviceForm.duration_mins}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, duration_mins: Number(e.target.value) })
                    }
                    className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Healing Time
                  </label>
                  <input
                    type="text"
                    value={serviceForm.healing_time}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, healing_time: e.target.value })
                    }
                    placeholder="e.g. 6-9 months"
                    className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Jewelry Material
                  </label>
                  <input
                    type="text"
                    value={serviceForm.jewelry_material}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, jewelry_material: e.target.value })
                    }
                    placeholder="Implant Grade Titanium"
                    className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  placeholder="Describe anatomical placement, aesthetic notes, and procedure overview..."
                  className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowServiceForm(false)}
                  className="px-4 py-2 rounded-lg border border-[#E9E9E7] text-xs font-semibold text-[#777777] hover:text-[#111111] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingService}
                  className="inline-flex items-center gap-1.5 bg-[#111111] hover:bg-[#A63D40] text-white px-5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isSavingService ? 'Saving...' : 'Save Service'}</span>
                </button>
              </div>
            </form>
          )}

          <div className="bg-white border border-[#E9E9E7] rounded-2xl overflow-hidden shadow-xs">
            <div className="divide-y divide-[#E9E9E7]">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAFAF7]/50 transition-colors"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-['Syne',sans-serif] font-bold text-sm text-[#111111]">
                        {svc.name}
                      </h3>
                      <span className="text-[10px] uppercase font-bold text-[#777777] bg-[#FAFAF7] border border-[#E9E9E7] px-2 py-0.5 rounded">
                        {svc.category}
                      </span>
                      <span className="text-xs font-bold text-[#A63D40]">
                        ₱{Number(svc.price).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#777777]">
                      Duration: {svc.duration_mins} mins · Healing: {svc.healing_time} · Jewelry:{' '}
                      {svc.jewelry_material}
                    </p>
                    {svc.description && (
                      <p className="text-xs text-[#111111]/80 pt-0.5">{svc.description}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <button
                      onClick={() => openEditService(svc)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E9E9E7] hover:border-[#111111] rounded-lg text-xs font-semibold text-[#111111] transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteService(svc)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-rose-200 hover:bg-rose-50 rounded-lg text-xs font-semibold text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
              {services.length === 0 && (
                <div className="py-12 text-center text-xs text-[#777777]">
                  No piercing services configured yet. Click "Add Piercing Service" above.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB (C): CREATE / DELETE AVAILABLE TIME SLOTS
         ========================================================= */}
      {activeTab === 'slots' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Create Slot Panel */}
          <div className="lg:col-span-4 bg-white border border-[#E9E9E7] rounded-2xl p-6 space-y-5 shadow-xs">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63D40]">
                Capacity Control
              </span>
              <h2 className="font-['Syne',sans-serif] text-lg font-bold text-[#111111] mt-0.5">
                Add Available Time Slot
              </h2>
              <p className="text-xs text-[#777777] mt-1">
                Open a new appointment window on the studio calendar.
              </p>
            </div>

            <form onSubmit={handleCreateSlot} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={newSlotDate}
                  onChange={(e) => {
                    setNewSlotDate(e.target.value);
                    setSlotFilterDate(e.target.value);
                  }}
                  className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={newSlotStart}
                    onChange={(e) => setNewSlotStart(e.target.value)}
                    className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={newSlotEnd}
                    onChange={(e) => setNewSlotEnd(e.target.value)}
                    className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSavingSlot}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#111111] hover:bg-[#A63D40] text-white py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isSavingSlot ? 'Adding Slot...' : 'Create Time Slot'}</span>
              </button>
            </form>
          </div>

          {/* Slots List Panel */}
          <div className="lg:col-span-8 bg-white border border-[#E9E9E7] rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E9E7]">
              <div>
                <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#111111]">
                  Scheduled Studio Time Slots
                </h3>
                <p className="text-xs text-[#777777]">
                  Filter by date to view, toggle booking availability, or delete slots.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={slotFilterDate}
                  onChange={(e) => setSlotFilterDate(e.target.value)}
                  className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-1.5 text-xs text-[#111111] focus:border-[#111111] outline-hidden"
                />
                {slotFilterDate && (
                  <button
                    onClick={() => setSlotFilterDate('')}
                    className="text-xs text-[#777777] hover:text-[#111111] px-2 py-1.5 border border-[#E9E9E7] rounded-lg cursor-pointer"
                  >
                    Show All
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                    slot.is_booked
                      ? 'bg-neutral-50 border-[#E9E9E7]'
                      : 'bg-white border-[#E9E9E7] hover:border-[#111111]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        slot.is_booked
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#111111]">{slot.time}</span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            slot.is_booked
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {slot.is_booked ? 'Booked' : 'Available'}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#777777] block">{slot.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleSlotBooked(slot)}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded border border-[#E9E9E7] hover:border-[#111111] text-[#111111] transition-colors cursor-pointer"
                    >
                      {slot.is_booked ? 'Free Up' : 'Mark Booked'}
                    </button>
                    <button
                      onClick={() => handleDeleteSlot(slot)}
                      title="Delete slot"
                      className="p-1.5 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {slots.length === 0 && (
              <div className="py-12 text-center text-xs text-[#777777]">
                No time slots found for the selected filter. Use the form on the left to add slots.
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB (D): MANAGE FAQS & VIEW CONTACT MESSAGES
         ========================================================= */}
      {activeTab === 'faqs-messages' && (
        <div className="space-y-6">
          {/* Sub-navigation */}
          <div className="flex items-center justify-between bg-white border border-[#E9E9E7] rounded-xl p-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSubTabD('faqs')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  subTabD === 'faqs'
                    ? 'bg-[#111111] text-white'
                    : 'text-[#777777] hover:text-[#111111]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Manage FAQs ({faqs.length})</span>
              </button>
              <button
                onClick={() => setSubTabD('messages')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  subTabD === 'messages'
                    ? 'bg-[#111111] text-white'
                    : 'text-[#777777] hover:text-[#111111]'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Messages ({messages.length})</span>
              </button>
            </div>

            {subTabD === 'faqs' && (
              <button
                onClick={openAddFaq}
                className="inline-flex items-center gap-1.5 bg-[#A63D40] hover:bg-[#8E3235] text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            )}
          </div>

          {/* SUB-TAB 1: FAQs */}
          {subTabD === 'faqs' && (
            <div className="space-y-5">
              {showFaqForm && (
                <form
                  onSubmit={handleSaveFaq}
                  className="bg-white border-2 border-[#111111] rounded-2xl p-6 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-3">
                    <h3 className="font-['Syne',sans-serif] text-base font-bold text-[#111111]">
                      {editingFaqId ? 'Edit FAQ' : 'Add New Frequently Asked Question'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowFaqForm(false)}
                      className="text-[#777777] hover:text-[#111111]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                        Question *
                      </label>
                      <input
                        type="text"
                        required
                        value={faqForm.question}
                        onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                        placeholder="e.g. Do I need an appointment for jewelry downsizing?"
                        className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={faqForm.order}
                        onChange={(e) =>
                          setFaqForm({ ...faqForm, order: Number(e.target.value) })
                        }
                        className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#111111] mb-1">
                      Answer *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={faqForm.answer}
                      onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                      placeholder="Provide clear, authoritative studio guidance..."
                      className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowFaqForm(false)}
                      className="px-4 py-2 rounded-lg border border-[#E9E9E7] text-xs font-semibold text-[#777777] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingFaq}
                      className="bg-[#111111] hover:bg-[#A63D40] text-white px-5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isSavingFaq ? 'Saving...' : 'Save FAQ'}
                    </button>
                  </div>
                </form>
              )}

              <div className="bg-white border border-[#E9E9E7] rounded-2xl divide-y divide-[#E9E9E7] shadow-xs">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-[#FAFAF7]/50 transition-colors"
                  >
                    <div className="space-y-1 max-w-3xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold bg-[#FAFAF7] border border-[#E9E9E7] px-2 py-0.5 rounded text-[#777777]">
                          #{faq.order}
                        </span>
                        <h4 className="font-['Syne',sans-serif] font-bold text-sm text-[#111111]">
                          {faq.question}
                        </h4>
                      </div>
                      <p className="text-xs text-[#777777] leading-relaxed">{faq.answer}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditFaq(faq)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#E9E9E7] hover:border-[#111111] rounded-lg text-xs font-semibold text-[#111111] cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(faq)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 border border-rose-200 hover:bg-rose-50 rounded-lg text-xs font-semibold text-rose-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
                {faqs.length === 0 && (
                  <div className="py-12 text-center text-xs text-[#777777]">
                    No FAQs found. Click "Add FAQ" to create your first question.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SUB-TAB 2: CONTACT MESSAGES */}
          {subTabD === 'messages' && (
            <div className="bg-white border border-[#E9E9E7] rounded-2xl divide-y divide-[#E9E9E7] shadow-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-[#FAFAF7]/50 transition-colors"
                >
                  <div className="space-y-1.5 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-[#111111]">{msg.sender_name}</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-[#A63D40] hover:underline font-medium"
                      >
                        {msg.email}
                      </a>
                      <span className="text-[11px] text-[#777777]">
                        · {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#111111] bg-[#FAFAF7] border border-[#E9E9E7] rounded-xl p-3.5 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`mailto:${msg.email}?subject=Re: Palabutasan Studio Inquiry`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#E9E9E7] hover:border-[#111111] rounded-lg text-xs font-semibold text-[#111111]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply</span>
                    </a>
                    <button
                      onClick={() => handleDeleteMessage(msg)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-rose-200 hover:bg-rose-50 rounded-lg text-xs font-semibold text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="py-12 text-center text-xs text-[#777777]">
                  No client contact messages received yet.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
