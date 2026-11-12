import React, { useState } from 'react';
import { PIERCINGS } from '../data/piercings';
import { generateDailySlots, getDateStatus } from '../data/availability';
import { Calendar as CalendarIcon, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AvailabilityWidgetProps {
  onSelectSlotAndBook: (piercingId: string, date: string, time: string) => void;
  onViewFullAvailability: () => void;
}

export const AvailabilityWidget: React.FC<AvailabilityWidgetProps> = ({
  onSelectSlotAndBook,
  onViewFullAvailability
}) => {
  const [selectedPiercingId, setSelectedPiercingId] = useState<string>('helix');
  
  // Default to today or tomorrow
  const getTomorrowDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTomorrowDateString());
  const [selectedTime, setSelectedTime] = useState<string>('2:00 PM');

  const slots = generateDailySlots(selectedDate);
  const dateObj = new Date(selectedDate + 'T12:00:00');
  const dateStatus = getDateStatus(dateObj);

  const handleBook = () => {
    onSelectSlotAndBook(selectedPiercingId, selectedDate, selectedTime);
  };

  return (
    <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E9E7]">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A63D40] font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Live Calendar Preview
          </span>
          <h3 className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111] mt-1">
            Find Your Schedule
          </h3>
        </div>
        <button
          onClick={onViewFullAvailability}
          className="text-xs font-semibold text-[#A63D40] hover:text-[#8E3235] flex items-center gap-1 transition-colors self-start sm:self-auto"
        >
          <span>View Full Availability</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {/* Field 1: Choose Piercing */}
        <div>
          <label htmlFor="widget-piercing" className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
            1. Choose Piercing Service
          </label>
          <select
            id="widget-piercing"
            value={selectedPiercingId}
            onChange={(e) => setSelectedPiercingId(e.target.value)}
            className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3.5 py-2.5 text-sm text-[#111111] font-medium focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-hidden"
          >
            <optgroup label="Ear Piercings">
              {PIERCINGS.filter(p => p.category === 'ear').map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.formattedPrice})
                </option>
              ))}
            </optgroup>
            <optgroup label="Facial Piercings">
              {PIERCINGS.filter(p => p.category === 'facial').map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.formattedPrice})
                </option>
              ))}
            </optgroup>
            <optgroup label="Body Piercings">
              {PIERCINGS.filter(p => p.category === 'other').map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.formattedPrice})
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Field 2: Choose Date */}
        <div>
          <label htmlFor="widget-date" className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-2">
            2. Choose Preferred Date
          </label>
          <div className="relative">
            <input
              id="widget-date"
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
              className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3.5 py-2.5 text-sm text-[#111111] font-medium focus:border-[#111111] focus:ring-1 focus:ring-[#111111] outline-hidden"
            />
            <CalendarIcon className="w-4 h-4 text-[#777777] absolute right-3 top-3 pointer-events-none" />
          </div>
          {dateStatus === 'closed' && (
            <p className="text-[11px] text-[#A63D40] mt-1.5">
              Studio closed on Mondays for autoclave cycle & sterile maintenance.
            </p>
          )}
        </div>
      </div>

      {/* Available Times Display */}
      <div className="mt-6 pt-5 border-t border-[#E9E9E7]/80">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
            3. Available Times
          </label>
          <span className="text-[11px] text-[#777777]">
            {dateStatus === 'closed' ? 'Closed' : `${slots.filter(s => s.status !== 'booked').length} slots open`}
          </span>
        </div>

        {dateStatus === 'closed' ? (
          <div className="bg-[#FAFAF7] rounded-xl p-4 text-center text-xs text-[#777777]">
            The studio is closed on this date. Please pick another day.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {slots.slice(0, 5).map((slot) => {
              const isSelected = selectedTime === slot.time;
              const isBooked = slot.status === 'booked';

              return (
                <button
                  key={slot.id}
                  disabled={isBooked}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg text-center transition-all tabular-nums ${
                    isBooked
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed line-through'
                      : isSelected
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'bg-[#FAFAF7] text-[#111111] border border-[#E9E9E7] hover:border-[#111111]'
                  }`}
                >
                  {slot.time}
                </button>
              );
            })}
          </div>
        )}

        {/* Selected Slot Confirmation CTA */}
        {dateStatus !== 'closed' && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAFAF7] p-4 rounded-xl border border-[#E9E9E7]">
            <div className="flex items-center gap-3 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#A63D40] shrink-0" />
              <div>
                <span className="text-[#777777]">Selected Slot: </span>
                <span className="font-semibold text-[#111111]">
                  {PIERCINGS.find(p => p.id === selectedPiercingId)?.name} · {selectedDate} at {selectedTime}
                </span>
              </div>
            </div>
            <button
              onClick={handleBook}
              className="w-full sm:w-auto bg-[#A63D40] hover:bg-[#8E3235] text-white px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors whitespace-nowrap"
            >
              Continue Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
