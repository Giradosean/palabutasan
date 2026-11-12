import React from 'react';
import { PageRoute } from '../types';
import { AvailabilityCalendar } from '../components/AvailabilityCalendar';
import { ShieldCheck, Calendar, Clock, Sparkles } from 'lucide-react';

interface AvailabilityPageProps {
  initialPiercingId?: string;
  onProceedToBooking: (bookingDetails: {
    piercingId: string;
    piercingName: string;
    date: string;
    time: string;
    peopleCount: number;
    notes?: string;
  }) => void;
  onTrackStatus: () => void;
}

export const AvailabilityPage: React.FC<AvailabilityPageProps> = ({
  initialPiercingId,
  onProceedToBooking,
  onTrackStatus
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title & Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E9E9E7]">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
            Studio Reservation
          </span>
          <h1 className="font-['Syne',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight">
            Check Availability
          </h1>
          <p className="text-sm text-[#777777] leading-relaxed">
            Select your desired piercing, pick an available date on the calendar, and reserve an open time slot.
          </p>
        </div>

        <button
          onClick={onTrackStatus}
          className="text-xs font-semibold text-[#111111] hover:text-[#A63D40] py-2.5 px-4 border border-[#E9E9E7] rounded-xl hover:border-[#111111] transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          Already booked? Track Status
        </button>
      </div>

      {/* Main Calendar & Slot Flow */}
      <AvailabilityCalendar
        initialPiercingId={initialPiercingId}
        onProceedToBooking={onProceedToBooking}
      />
    </div>
  );
};
