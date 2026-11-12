import React, { useState, useEffect } from 'react';
import { Piercing, TimeSlot } from '../types';
import { PIERCINGS } from '../data/piercings';
import { generateDailySlots, getDateStatus } from '../data/availability';
import { api } from '../api';
import { Calendar as CalendarIcon, Clock, Users, ArrowRight, ShieldCheck, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface AvailabilityCalendarProps {
  initialPiercingId?: string;
  onProceedToBooking: (bookingDetails: {
    piercingId: string;
    piercingName: string;
    date: string;
    time: string;
    peopleCount: number;
    notes?: string;
  }) => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  initialPiercingId = 'helix',
  onProceedToBooking
}) => {
  const [selectedPiercingId, setSelectedPiercingId] = useState<string>(initialPiercingId);
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [clientNotes, setClientNotes] = useState<string>('');

  // Calendar month state
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());
  
  // Format current date as default selected
  const today = new Date();
  const defaultSelected = new Date(today);
  defaultSelected.setDate(defaultSelected.getDate() + 1);
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    defaultSelected.toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>('2:00 PM');

  const selectedPiercing = PIERCINGS.find(p => p.id === selectedPiercingId) || PIERCINGS[0];
  const [slots, setSlots] = useState<TimeSlot[]>(() => generateDailySlots(selectedDateStr));

  useEffect(() => {
    let isMounted = true;
    api.getSlots(selectedDateStr).then(apiSlots => {
      if (!isMounted) return;
      if (apiSlots && apiSlots.length > 0) {
        setSlots(apiSlots.map(s => ({
          id: String(s.id),
          time: s.time,
          status: s.is_booked ? 'booked' : 'available'
        })));
      } else {
        setSlots(generateDailySlots(selectedDateStr));
      }
    }).catch(() => {
      if (isMounted) {
        setSlots(generateDailySlots(selectedDateStr));
      }
    });
    return () => { isMounted = false; };
  }, [selectedDateStr]);

  const selectedDateObj = new Date(selectedDateStr + 'T12:00:00');
  const selectedDateStatus = getDateStatus(selectedDateObj);

  // Month navigation
  const prevMonth = () => {
    const d = new Date(currentMonthDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentMonthDate(d);
  };

  const nextMonth = () => {
    const d = new Date(currentMonthDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentMonthDate(d);
  };

  // Generate calendar days for current month
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleContinue = () => {
    onProceedToBooking({
      piercingId: selectedPiercing.id,
      piercingName: selectedPiercing.name,
      date: selectedDateStr,
      time: selectedTime,
      peopleCount,
      notes: clientNotes
    });
  };

  return (
    <div className="space-y-10">
      {/* Header and Filter step */}
      <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-8">
        <h2 className="text-xs uppercase font-bold tracking-widest text-[#A63D40] mb-2">
          Step 1 of 2: Configure Appointment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="service-select" className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
              Select Piercing Service
            </label>
            <select
              id="service-select"
              value={selectedPiercingId}
              onChange={(e) => setSelectedPiercingId(e.target.value)}
              className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3.5 py-3 text-sm text-[#111111] font-medium focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-hidden"
            >
              {PIERCINGS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} · {p.category.toUpperCase()} ({p.formattedPrice}) — Healing: {p.healingPeriod}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="people-select" className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
              Number of People
            </label>
            <div className="relative">
              <select
                id="people-select"
                value={peopleCount}
                onChange={(e) => setPeopleCount(Number(e.target.value))}
                className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3.5 py-3 text-sm text-[#111111] font-medium focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-hidden"
              >
                <option value={1}>1 Person (Standard)</option>
                <option value={2}>2 People (Friends / Duo)</option>
                <option value={3}>3 People (Group)</option>
              </select>
              <Users className="w-4 h-4 text-[#777777] absolute right-3 top-3.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Calendar & Time Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calendar Column */}
        <div className="lg:col-span-7 bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between pb-6 border-b border-[#E9E9E7]">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#A63D40]" />
              <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111]">
                {monthNames[month]} {year}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={prevMonth}
                className="p-2 border border-[#E9E9E7] hover:border-[#111111] rounded-lg text-[#111111] transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 border border-[#E9E9E7] hover:border-[#111111] rounded-lg text-[#111111] transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Status Legend */}
          <div className="flex flex-wrap items-center gap-4 py-4 text-[11px] text-[#777777] border-b border-[#E9E9E7]/60">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Available
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Limited
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Fully Booked
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              Closed (Mon)
            </span>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs text-[#777777] py-3 uppercase tracking-wider">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {/* Empty offset padding */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10 sm:h-12" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateObj = new Date(year, month, dayNum);
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const isPast = dateObj < new Date(today.setHours(0, 0, 0, 0));
              const isSelected = selectedDateStr === dateStr;
              const status = getDateStatus(dateObj);

              let statusDotColor = 'bg-emerald-500';
              if (status === 'limited') statusDotColor = 'bg-amber-500';
              if (status === 'booked') statusDotColor = 'bg-rose-500';
              if (status === 'closed') statusDotColor = 'bg-neutral-300';

              return (
                <button
                  key={dateStr}
                  disabled={isPast || status === 'closed' || status === 'booked'}
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`h-11 sm:h-13 rounded-xl p-1 flex flex-col items-center justify-between transition-all duration-150 relative ${
                    isSelected
                      ? 'bg-[#111111] text-white shadow-sm ring-2 ring-[#111111]'
                      : isPast || status === 'closed' || status === 'booked'
                      ? 'bg-neutral-50 text-neutral-300 cursor-not-allowed'
                      : 'bg-[#FAFAF7] text-[#111111] hover:bg-[#E9E9E7]/80'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold tabular-nums mt-0.5">
                    {dayNum}
                  </span>
                  {!isPast && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full mb-1 ${
                        isSelected ? 'bg-white' : statusDotColor
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots & Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E9E7]">
              <div>
                <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#111111]">
                  Available Time Slots
                </h3>
                <p className="text-xs text-[#777777] mt-0.5">
                  For {new Date(selectedDateStr + 'T12:00:00').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <Clock className="w-4 h-4 text-[#777777]" />
            </div>

            {selectedDateStatus === 'closed' ? (
              <div className="py-8 text-center text-xs text-[#777777]">
                The studio is closed on this date.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 pt-5">
                {slots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  const isBooked = slot.status === 'booked';
                  const isLimited = slot.status === 'limited';

                  return (
                    <button
                      key={slot.id}
                      disabled={isBooked}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-3 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-all tabular-nums ${
                        isBooked
                          ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-[#111111] text-white shadow-xs'
                          : 'bg-[#FAFAF7] text-[#111111] border border-[#E9E9E7] hover:border-[#111111]'
                      }`}
                    >
                      <span>{slot.time}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-white" />
                      ) : isLimited ? (
                        <span className="text-[10px] text-amber-600 font-normal">Last slot</span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-6 pt-5 border-t border-[#E9E9E7]">
              <label htmlFor="notes-field" className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
                Optional Notes or Questions
              </label>
              <textarea
                id="notes-field"
                rows={2}
                value={clientNotes}
                onChange={(e) => setClientNotes(e.target.value)}
                placeholder="Allergies, previous piercings, or jewelry preferences..."
                className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg p-3 text-xs text-[#111111] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-hidden resize-none"
              />
            </div>
          </div>

          {/* Appointment Summary Box */}
          <div className="bg-[#111111] text-[#FAFAF7] rounded-2xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
                Appointment Summary
              </span>
              <span className="text-xs text-neutral-400">Step 1 Completed</span>
            </div>

            <div className="py-4 space-y-2.5 text-xs text-[#E9E9E7]">
              <div className="flex justify-between">
                <span className="text-neutral-400">Piercing:</span>
                <span className="font-semibold text-white">{selectedPiercing.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Date:</span>
                <span className="font-semibold text-white">
                  {new Date(selectedDateStr + 'T12:00:00').toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Time:</span>
                <span className="font-semibold text-white">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Guests:</span>
                <span className="font-semibold text-white">{peopleCount} {peopleCount === 1 ? 'Person' : 'People'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Available
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-800 text-sm">
                <span className="text-neutral-300">Starting Service:</span>
                <span className="font-bold text-white tabular-nums">{selectedPiercing.formattedPrice}</span>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full mt-4 bg-[#A63D40] hover:bg-[#8E3235] text-white py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
            >
              <span>Continue Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-neutral-400 text-center mt-3 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A63D40]" />
              No upfront payment required to hold schedule.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
