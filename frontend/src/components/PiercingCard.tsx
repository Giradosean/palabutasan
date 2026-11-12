import React from 'react';
import { Piercing } from '../types';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

interface PiercingCardProps {
  piercing: Piercing;
  onViewDetails: (piercing: Piercing) => void;
  onCheckAvailability: (piercing: Piercing) => void;
}

export const PiercingCard: React.FC<PiercingCardProps> = ({
  piercing,
  onViewDetails,
  onCheckAvailability
}) => {
  return (
    <div className="bg-white border border-[#E9E9E7] rounded-xl p-6 flex flex-col justify-between hover:border-[#111111]/30 hover:shadow-xs transition-all duration-200 group">
      <div>
        {/* Top unboxed metadata line */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#777777] mb-3">
          <div className="flex items-center gap-1.5 uppercase tracking-wider font-medium text-[11px]">
            <span>{piercing.category}</span>
            <span aria-hidden="true">·</span>
            <span>{piercing.painLevel} Sensation</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-medium">
            <span
              className={`w-2 h-2 rounded-full ${
                piercing.availabilityStatus === 'available'
                  ? 'bg-emerald-500'
                  : piercing.availabilityStatus === 'limited'
                  ? 'bg-amber-500'
                  : 'bg-neutral-400'
              }`}
            />
            <span className="capitalize text-[#111111]">
              {piercing.availabilityStatus === 'available' ? 'Available' : 'Limited Slots'}
            </span>
          </div>
        </div>

        {/* Piercing Title */}
        <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111] group-hover:text-[#A63D40] transition-colors">
          {piercing.name}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-[#777777] mt-2 line-clamp-2 leading-relaxed">
          {piercing.shortDescription}
        </p>

        {/* Anatomical & Healing Spec Box */}
        <div className="mt-5 pt-4 border-t border-[#E9E9E7]/80 space-y-2 text-xs">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[#777777] shrink-0">Placement:</span>
            <span className="text-[#111111] text-right font-medium truncate max-w-[190px]">
              {piercing.placement}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-[#777777] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Healing:
            </span>
            <span className="text-[#111111] font-semibold tabular-nums">
              {piercing.healingPeriod}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-[#777777] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Initial Jewelry:
            </span>
            <span className="text-[#111111] font-medium text-right truncate max-w-[190px]">
              {piercing.jewelryInfo.split(';')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="mt-6 pt-4 border-t border-[#E9E9E7] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#777777] block font-medium">
            Starting At
          </span>
          <span className="font-['Syne',sans-serif] text-lg font-bold text-[#111111] tabular-nums">
            {piercing.formattedPrice}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(piercing)}
            className="text-xs font-semibold text-[#111111] hover:text-[#A63D40] py-2 px-3 border border-[#E9E9E7] rounded-lg hover:border-[#111111]/20 transition-colors whitespace-nowrap"
          >
            View Details
          </button>
          <button
            onClick={() => onCheckAvailability(piercing)}
            className="text-xs font-semibold text-white bg-[#A63D40] hover:bg-[#8E3235] py-2 px-3.5 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
          >
            <span>Book</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
