import React from 'react';
import { PageRoute, Piercing } from '../types';
import { PIERCINGS } from '../data/piercings';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Check } from 'lucide-react';

interface PricingPageProps {
  onSelectPiercingToBook: (piercing: Piercing) => void;
  onViewDetails: (piercing: Piercing) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onSelectPiercingToBook,
  onViewDetails
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
          Transparent Studio Rates
        </span>
        <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
          Service & Jewelry Pricing
        </h1>
        <p className="text-base text-[#777777] leading-relaxed">
          No hidden fees. Every service package includes one-on-one anatomical assessment, precision aseptic needle piercing, and basic certified ASTM F-136 implant titanium post.
        </p>
      </div>

      {/* Centralized Pricing Table */}
      <div className="bg-white border border-[#E9E9E7] rounded-2xl overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 border-b border-[#E9E9E7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111]">
              Standard Piercing Service Menu
            </h2>
            <p className="text-xs text-[#777777] mt-1">
              Organized by body zone. Prices include base sterile titanium jewelry.
            </p>
          </div>
          <div className="text-xs text-[#777777] font-medium bg-[#FAFAF7] border border-[#E9E9E7] px-3.5 py-1.5 rounded-lg self-start sm:self-auto">
            Currency: Philippine Peso (PHP ₱)
          </div>
        </div>

        <div className="divide-y divide-[#E9E9E7]">
          {PIERCINGS.map((p) => (
            <div
              key={p.id}
              className="p-5 sm:p-6 hover:bg-[#FAFAF7]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-['Syne',sans-serif] font-bold text-lg text-[#111111]">
                    {p.name}
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A63D40] bg-[#A63D40]/5 px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                </div>
                <p className="text-xs text-[#777777] max-w-xl">
                  {p.shortDescription}
                </p>
                <div className="flex items-center gap-4 text-xs text-[#777777] pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#A63D40]" />
                    Healing: <strong className="text-[#111111]">{p.healingPeriod}</strong>
                  </span>
                  <span>·</span>
                  <span>Initial: {p.jewelryInfo.split(';')[0]}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pt-2 sm:pt-0">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#777777] block font-medium">
                    Starting Base Rate
                  </span>
                  <span className="font-['Syne',sans-serif] text-xl font-bold text-[#111111] tabular-nums">
                    {p.formattedPrice}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewDetails(p)}
                    className="text-xs font-semibold text-[#111111] hover:text-[#A63D40] py-2 px-3 border border-[#E9E9E7] rounded-lg transition-colors whitespace-nowrap"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => onSelectPiercingToBook(p)}
                    className="text-xs font-semibold text-white bg-[#A63D40] hover:bg-[#8E3235] py-2 px-3.5 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
                  >
                    Check Schedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrades & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#111111]">
            Jewelry Upgrade Options
          </h3>
          <p className="text-xs text-[#777777] leading-relaxed">
            While every piercing comes with a mirror-polished implant titanium flat back or ring, you may customize with premium decorative front ends during your consultation:
          </p>
          <ul className="space-y-2 text-xs text-[#111111]">
            <li className="flex items-center justify-between py-1 border-b border-[#E9E9E7]">
              <span>ASTM F-136 Titanium Anodized Finish (Rose, Gold, Teal, Bronze)</span>
              <span className="font-semibold tabular-nums">+₱150</span>
            </li>
            <li className="flex items-center justify-between py-1 border-b border-[#E9E9E7]">
              <span>Swarovski Cubic Zirconia / Synthetic Opal Bezel Ends</span>
              <span className="font-semibold tabular-nums">+₱350–₱650</span>
            </li>
            <li className="flex items-center justify-between py-1 border-b border-[#E9E9E7]">
              <span>Solid 14k Nickel-Free Yellow / White / Rose Gold Castings</span>
              <span className="font-semibold tabular-nums">+₱1,200–₱3,500</span>
            </li>
            <li className="flex items-center justify-between py-1">
              <span>Sterile Saline Spray Bottle (Full 177ml pressurized can)</span>
              <span className="font-semibold tabular-nums">₱450</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#A63D40]">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#111111]">
              Important Pricing Policy Note
            </h3>
          </div>
          <p className="text-xs text-[#777777] leading-relaxed">
            Prices shown are sample base rates and may vary depending on jewelry selection, gauge specifications, anatomical complexity, and studio policies.
          </p>
          <p className="text-xs text-[#777777] leading-relaxed">
            Your piercer will always provide a 100% itemized, total cost quote during your placement consultation before opening any sterile packaging.
          </p>
          <div className="pt-2">
            <span className="text-xs font-semibold text-[#111111] flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              Complimentary jewelry downsize checkup included with all services.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
