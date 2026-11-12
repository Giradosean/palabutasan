import React, { useState } from 'react';
import { Appointment, Piercing } from '../types';
import { PIERCINGS } from '../data/piercings';
import { getStoredAppointments, updateAppointmentStatus } from '../data/availability';
import { ShieldCheck, Calendar, Users, DollarSign, Search, CheckCircle2, XCircle, Clock, Edit2, AlertCircle } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(getStoredAppointments());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Pending' | 'Cancelled'>('All');
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'schedule'>('appointments');
  const [actionNotice, setActionNotice] = useState<string>('');

  // Editable service prices in local state
  const [piercingList, setPiercingList] = useState<Piercing[]>(PIERCINGS);

  const refreshAppointments = () => {
    setAppointments(getStoredAppointments());
  };

  const handleStatusChange = (ref: string, newStatus: Appointment['status']) => {
    const success = updateAppointmentStatus(ref, newStatus);
    if (success) {
      setActionNotice(`Appointment ${ref} updated to ${newStatus}.`);
      refreshAppointments();
      setTimeout(() => setActionNotice(''), 3000);
    }
  };

  const handleToggleAvailability = (piercingId: string) => {
    setPiercingList(prev => prev.map(p => {
      if (p.id === piercingId) {
        const nextStatus = p.availabilityStatus === 'available' ? 'limited' : 'available';
        return { ...p, availabilityStatus: nextStatus };
      }
      return p;
    }));
  };

  const filteredAppts = appointments.filter(a => {
    const matchesFilter = statusFilter === 'All' || a.status === statusFilter;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term || (
      a.referenceNumber.toLowerCase().includes(term) ||
      a.fullName.toLowerCase().includes(term) ||
      a.piercingName.toLowerCase().includes(term) ||
      a.email.toLowerCase().includes(term)
    );
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Admin Header */}
      <div className="bg-[#111111] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#A63D40] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#A63D40]" />
            <span>Studio Management Architecture</span>
          </div>
          <h1 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold">
            Palabutasan Operations Dashboard
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage live appointments, client declarations, service availability, and calendar capacity.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'appointments' ? 'bg-white text-[#111111]' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Appointments ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'services' ? 'bg-white text-[#111111]' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Service Rates & Slots
          </button>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* TAB 1: APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-white border border-[#E9E9E7] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#777777] font-medium">Status:</span>
              {(['All', 'Confirmed', 'Pending', 'Cancelled'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                    statusFilter === st
                      ? 'bg-[#111111] text-white'
                      : 'bg-[#FAFAF7] text-[#777777] hover:text-[#111111] border border-[#E9E9E7]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search reference, client..."
                className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3 py-2 pl-8 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden"
              />
              <Search className="w-3.5 h-3.5 text-[#777777] absolute left-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white border border-[#E9E9E7] rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFAF7] border-b border-[#E9E9E7] text-[#777777] uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Ref Code</th>
                    <th className="py-3.5 px-4">Client</th>
                    <th className="py-3.5 px-4">Piercing</th>
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E9E7]">
                  {filteredAppts.map((appt) => (
                    <tr key={appt.referenceNumber} className="hover:bg-[#FAFAF7]/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#111111]">
                        {appt.referenceNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#111111] block">{appt.fullName}</span>
                        <span className="text-[11px] text-[#777777]">{appt.phone} · {appt.email}</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#111111]">
                        {appt.piercingName}
                        {appt.notes && (
                          <span className="block text-[11px] text-[#777777] italic truncate max-w-xs mt-0.5">
                            "{appt.notes}"
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-[#111111]">
                        <span className="block font-medium">{appt.date}</span>
                        <span className="text-[11px] text-[#777777]">{appt.time} ({appt.peopleCount} pax)</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold text-[10px] ${
                          appt.status === 'Confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : appt.status === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            appt.status === 'Confirmed' ? 'bg-emerald-500' : appt.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'
                          }`} />
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        {appt.status !== 'Confirmed' && (
                          <button
                            onClick={() => handleStatusChange(appt.referenceNumber, 'Confirmed')}
                            className="text-xs text-emerald-700 hover:underline font-semibold"
                          >
                            Confirm
                          </button>
                        )}
                        {appt.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleStatusChange(appt.referenceNumber, 'Cancelled')}
                            className="text-xs text-rose-600 hover:underline font-semibold"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredAppts.length === 0 && (
              <div className="py-12 text-center text-xs text-[#777777]">
                No matching appointments found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SERVICES & AVAILABILITY TOGGLE */}
      {activeTab === 'services' && (
        <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111]">
              Piercing Services & Availability Controls
            </h2>
            <p className="text-xs text-[#777777] mt-1">
              Toggle availability status on individual piercings when studio inventory or specialized piercers are unavailable.
            </p>
          </div>

          <div className="divide-y divide-[#E9E9E7]">
            {piercingList.map((p) => (
              <div key={p.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Syne',sans-serif] font-bold text-sm text-[#111111]">
                      {p.name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-[#777777] bg-[#FAFAF7] border border-[#E9E9E7] px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#777777] mt-0.5">
                    Starting: {p.formattedPrice} · Healing: {p.healingPeriod}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`text-xs font-semibold ${
                    p.availabilityStatus === 'available' ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {p.availabilityStatus === 'available' ? 'Status: Active (Open)' : 'Status: Limited Booking'}
                  </span>
                  <button
                    onClick={() => handleToggleAvailability(p.id)}
                    className="text-xs font-semibold px-3 py-1.5 border border-[#E9E9E7] hover:border-[#111111] rounded-lg text-[#111111] transition-colors"
                  >
                    Toggle State
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
