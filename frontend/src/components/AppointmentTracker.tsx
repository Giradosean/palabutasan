import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { findAppointmentByReference, updateAppointmentStatus } from '../data/availability';
import { api } from '../api';
import { Search, Calendar, Clock, Sparkles, CheckCircle2, AlertCircle, XCircle, RefreshCw, FileText } from 'lucide-react';

interface AppointmentTrackerProps {
  initialReference?: string;
  onBookNew: () => void;
}

export const AppointmentTracker: React.FC<AppointmentTrackerProps> = ({
  initialReference = '',
  onBookNew
}) => {
  const [refInput, setRefInput] = useState<string>(initialReference);
  const [searchedRef, setSearchedRef] = useState<string>(initialReference);
  const [result, setResult] = useState<Appointment | null | undefined>(undefined);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string>('');

  const handleSearch = async (refToSearch: string) => {
    const trimmed = refToSearch.trim();
    if (!trimmed) return;
    setIsSearching(true);
    setSearchedRef(trimmed);
    setActionMessage('');

    try {
      const serverAppt = await api.trackAppointment(trimmed);
      const mapped: Appointment = {
        referenceNumber: serverAppt.tracking_code || serverAppt.referenceNumber,
        fullName: serverAppt.client_name || serverAppt.fullName || '',
        email: serverAppt.client_email || serverAppt.email || '',
        phone: serverAppt.client_phone || serverAppt.phone || '',
        piercingId: String(serverAppt.service || ''),
        piercingName: serverAppt.service_name || serverAppt.piercingName || 'Piercing Service',
        date: serverAppt.date || serverAppt.slot_date || '',
        time: serverAppt.time || serverAppt.slot_time || '',
        peopleCount: 1,
        notes: serverAppt.notes || '',
        status: (serverAppt.status as Appointment['status']) || 'Confirmed',
        createdAt: serverAppt.created_at || new Date().toISOString()
      };
      setResult(mapped);
    } catch {
      const localFound = findAppointmentByReference(trimmed);
      setResult(localFound || null);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (initialReference) {
      handleSearch(initialReference);
    }
  }, [initialReference]);

  const handleCancel = (ref: string) => {
    if (window.confirm('Are you sure you wish to cancel this appointment request?')) {
      const success = updateAppointmentStatus(ref, 'Cancelled');
      if (success) {
        setActionMessage('Appointment has been marked as Cancelled.');
        handleSearch(ref);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Search Input Box */}
      <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 shadow-xs">
        <span className="text-[11px] uppercase tracking-wider text-[#A63D40] font-bold">
          Appointment Verification Portal
        </span>
        <h2 className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111] mt-1">
          Check Appointment Status
        </h2>
        <p className="text-xs text-[#777777] mt-1 mb-6">
          Enter the unique reference code provided when you requested your appointment (e.g. PAL-2026-001).
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(refInput);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              placeholder="e.g. PAL-2026-001"
              className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-xl px-4 py-3.5 text-sm text-[#111111] font-mono uppercase tracking-wider focus:border-[#111111] focus:bg-white outline-hidden transition-colors"
            />
            <Search className="w-4 h-4 text-[#777777] absolute right-4 top-4 pointer-events-none" />
          </div>
          <button
            type="submit"
            disabled={isSearching || !refInput.trim()}
            className="bg-[#111111] hover:bg-neutral-800 text-white px-6 py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-colors whitespace-nowrap disabled:opacity-50 cursor-pointer"
          >
            {isSearching ? 'Checking...' : 'Check Status'}
          </button>
        </form>

        {/* Quick Demo Pre-seed links */}
        <div className="mt-4 pt-4 border-t border-[#E9E9E7]/80 flex flex-wrap items-center gap-2 text-xs text-[#777777]">
          <span>Try sample codes:</span>
          <button
            onClick={() => {
              setRefInput('PAL-2026-001');
              handleSearch('PAL-2026-001');
            }}
            className="font-mono text-xs bg-[#FAFAF7] hover:bg-[#E9E9E7] px-2 py-1 rounded text-[#111111] transition-colors"
          >
            PAL-2026-001
          </button>
          <button
            onClick={() => {
              setRefInput('PAL-2026-042');
              handleSearch('PAL-2026-042');
            }}
            className="font-mono text-xs bg-[#FAFAF7] hover:bg-[#E9E9E7] px-2 py-1 rounded text-[#111111] transition-colors"
          >
            PAL-2026-042
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Result: Found */}
      {result && (
        <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E9E9E7] gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#777777]">
                <span>Reference:</span>
                <span className="font-mono font-bold text-[#111111]">{result.referenceNumber}</span>
              </div>
              <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111] mt-1">
                {result.piercingName}
              </h3>
            </div>

            {/* Status Pill Badge Alternative (clean unboxed indicator with icon) */}
            <div className="flex items-center gap-2">
              {result.status === 'Confirmed' && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Confirmed Schedule</span>
                </div>
              )}
              {result.status === 'Pending' && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                  <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
                  <span>Pending Confirmation</span>
                </div>
              )}
              {result.status === 'Cancelled' && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Cancelled</span>
                </div>
              )}
            </div>
          </div>

          {/* Key Schedule Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#FAFAF7] p-4 rounded-xl border border-[#E9E9E7]">
              <span className="text-[#777777] flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#A63D40]" />
                Scheduled Date
              </span>
              <span className="font-bold text-[#111111] text-sm block">
                {result.date}
              </span>
            </div>

            <div className="bg-[#FAFAF7] p-4 rounded-xl border border-[#E9E9E7]">
              <span className="text-[#777777] flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#A63D40]" />
                Time Slot
              </span>
              <span className="font-bold text-[#111111] text-sm block">
                {result.time}
              </span>
            </div>

            <div className="bg-[#FAFAF7] p-4 rounded-xl border border-[#E9E9E7]">
              <span className="text-[#777777] block mb-1">Registered Client</span>
              <span className="font-bold text-[#111111] text-sm block truncate">
                {result.fullName}
              </span>
            </div>
          </div>

          {/* Notes */}
          {result.notes && (
            <div className="p-4 bg-[#FAFAF7] rounded-xl border border-[#E9E9E7] text-xs">
              <span className="font-semibold text-[#111111] block mb-1">Appointment Notes:</span>
              <p className="text-[#777777] italic leading-relaxed">{result.notes}</p>
            </div>
          )}

          {/* Preparation Reminder */}
          <div className="p-4 rounded-xl border border-[#E9E9E7] text-xs space-y-1.5 text-[#777777]">
            <span className="font-semibold text-[#111111] block">Studio Arrival Guidelines:</span>
            <p>· Please bring your photo ID and arrive 10 minutes before {result.time}.</p>
            <p>· Ensure you have eaten within the last 2 hours to maintain stable blood sugar levels.</p>
            <p>· If you need to make changes, please notify us at least 24 hours in advance.</p>
          </div>

          {/* Cancellation button if confirmed */}
          {result.status !== 'Cancelled' && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => handleCancel(result.referenceNumber)}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline"
              >
                Request Schedule Cancellation
              </button>
            </div>
          )}
        </div>
      )}

      {/* Result: Not Found */}
      {result === null && (
        <div className="bg-white border border-[#E9E9E7] rounded-2xl p-8 sm:p-10 text-center shadow-xs animate-in fade-in duration-150">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111]">
            We couldn't find an appointment with that reference number.
          </h3>
          <p className="text-xs text-[#777777] mt-2 max-w-md mx-auto leading-relaxed">
            Please check that the code <span className="font-mono text-[#111111] font-bold">"{searchedRef}"</span> was entered correctly, or browse availability to make a fresh appointment.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={onBookNew}
              className="bg-[#A63D40] hover:bg-[#8E3235] text-white px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors"
            >
              Check Availability & Book
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
