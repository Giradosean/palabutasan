import React, { useState } from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, HeartPulse, Sparkles, Check, X, Clock, Droplets, AlertCircle, ArrowRight } from 'lucide-react';

interface AftercarePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AftercarePage: React.FC<AftercarePageProps> = ({ onNavigate }) => {
  const [activeTimelineStage, setActiveTimelineStage] = useState<number>(0);

  const timelineStages = [
    {
      id: 0,
      badge: 'Hours 0–24',
      title: 'Day 1: Acute Stabilization',
      subtitle: 'Immediate post-procedure care and bleeding control',
      instructions: [
        'Mild localized throbbing, slight tenderness, and minor pinpoint bleeding or clear lymph seepage are completely normal.',
        'Leave the fresh puncture completely alone for the remainder of the day. Do not touch or spray excessively.',
        'Sleep on your back or on an ear-donut pillow. Avoid any downward pressure on the fresh jewelry.',
        'Drink plenty of water and rest to give your immune system maximum recovery support.'
      ],
      caution: 'Do not pick at small dried blood clots around the jewelry base; they protect the fresh wound entry.'
    },
    {
      id: 1,
      badge: 'Days 2–7',
      title: 'First Week: Initial Inflammatory Peak',
      subtitle: 'Swelling onset and saline irrigation routine',
      instructions: [
        'Swelling typically peaks between days 3 and 5. This is why your piercer installed an initial longer labret post.',
        'Gently spray both sides of the piercing twice daily with sterile 0.9% sodium chloride saline solution.',
        'Allow warm shower water to gently rinse away accumulated crusties without touching.',
        'Carefully pat dry with disposable non-woven gauze or use a hairdryer on the cool low setting.'
      ],
      caution: 'Never spin or rotate the jewelry. Twisting rips newly regenerating skin cells lining the fistula.'
    },
    {
      id: 2,
      badge: 'Weeks 2–4',
      title: 'First Month: Downsizing & Sub-acute Healing',
      subtitle: 'Swelling reduction and vital jewelry post adjustment',
      instructions: [
        'Swelling begins to recede substantially, making the initial longer post stick out.',
        'Between weeks 4 and 8, you MUST visit the studio for a downsize checkup to shorten the post length.',
        'A post left too long will snag on hair, tilt at an angle, and develop stubborn hypertrophic friction bumps.',
        'Continue twice-daily saline spray or reduce to once-daily if skin shows dryness.'
      ],
      caution: 'Do not attempt to change the jewelry at home into a fashion ring or unverified metal.'
    },
    {
      id: 3,
      badge: 'Months 2–12',
      title: 'Full Maturation Period',
      subtitle: 'Long-term fistula collagen formation and jewelry swap',
      instructions: [
        'Even when a piercing looks fully healed on the outside, internal cartilage or tissue continues collagen remodeling.',
        'Lobe piercings finish maturation in 6–8 weeks; cartilage piercings require 6–12 months.',
        'Once fully mature, you can safely switch to snug hoops, ornate gold clusters, or alternative studs.',
        'If you ever plan to remove jewelry, be aware that healed fistulas can still shrink or close quickly if left empty.'
      ],
      caution: 'Healing times differ for every body and piercing. Consult your piercer before attempting your first jewelry change.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
          Comprehensive Healing Protocol
        </span>
        <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
          Aftercare Guide & Timeline
        </h1>
        <p className="text-base text-[#777777] leading-relaxed">
          Proper aftercare represents 70% of piercing success. Our science-backed guidelines protect your healing fistula from irritation, mechanical trauma, and bacterial contamination.
        </p>
      </div>

      {/* DO & DON'T Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* The DO Section */}
        <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 pb-6 border-b border-[#E9E9E7]">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 block">
                Recommended Actions
              </span>
              <h2 className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111]">
                DO
              </h2>
            </div>
          </div>

          <ul className="mt-6 space-y-4 text-xs sm:text-sm text-[#111111]">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ✓
              </div>
              <div>
                <strong className="block text-[#111111]">Clean according to professional instructions:</strong>
                <span className="text-[#777777] text-xs">
                  Spray with sterile isotonic 0.9% saline spray twice daily. Pat dry gently with clean disposable non-woven gauze.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ✓
              </div>
              <div>
                <strong className="block text-[#111111]">Wash your hands thoroughly:</strong>
                <span className="text-[#777777] text-xs">
                  Always scrub hands with antibacterial soap and warm water for at least 20 seconds before touching anywhere near your piercing.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ✓
              </div>
              <div>
                <strong className="block text-[#111111]">Keep initial jewelry in place:</strong>
                <span className="text-[#777777] text-xs">
                  Leave the studio jewelry in until you visit for a professional downsize or assessment.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ✓
              </div>
              <div>
                <strong className="block text-[#111111]">Be patient during the healing process:</strong>
                <span className="text-[#777777] text-xs">
                  Cartilage takes up to a full year to mature completely beneath the surface. Consistent quiet care yields lasting results.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* The DON'T Section */}
        <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3 pb-6 border-b border-[#E9E9E7]">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
              <X className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-700 block">
                Prohibited Actions
              </span>
              <h2 className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111]">
                DON'T
              </h2>
            </div>
          </div>

          <ul className="mt-6 space-y-4 text-xs sm:text-sm text-[#111111]">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ✕
              </div>
              <div>
                <strong className="block text-[#111111]">Don't constantly touch or rotate the jewelry:</strong>
                <span className="text-[#777777] text-xs">
                  Twisting introduces unwashed bacteria and continuously tears the delicate new skin layer trying to form inside the hole.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ✕
              </div>
              <div>
                <strong className="block text-[#111111]">Don't use harsh chemicals:</strong>
                <span className="text-[#777777] text-xs">
                  Never use rubbing alcohol, hydrogen peroxide, Betadine, tea tree oil, or antibiotic ointments. They dry out and scar healing tissue.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ✕
              </div>
              <div>
                <strong className="block text-[#111111]">Don't remove jewelry too early:</strong>
                <span className="text-[#777777] text-xs">
                  Unhealed fistulas can shrink and close shut within 15–30 minutes if initial jewelry is removed.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ✕
              </div>
              <div>
                <strong className="block text-[#111111]">Don't ignore unusual or worsening symptoms:</strong>
                <span className="text-[#777777] text-xs">
                  If you observe spreading redness, persistent severe throbbing, or thick greenish discharge, seek prompt professional evaluation.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Aftercare Timeline */}
      <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
            Interactive Milestone Tracker
          </span>
          <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-[#111111] mt-1">
            Aftercare Timeline
          </h2>
          <p className="text-xs text-[#777777] mt-1">
            Click through each healing milestone to view exact care requirements and normal biological milestones.
          </p>
        </div>

        {/* Timeline Stage Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {timelineStages.map((stage) => {
            const isActive = activeTimelineStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveTimelineStage(stage.id)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                    : 'bg-[#FAFAF7] border-[#E9E9E7] text-[#111111] hover:border-[#111111]/40'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold tracking-wider block mb-1 ${
                  isActive ? 'text-[#A63D40]' : 'text-[#777777]'
                }`}>
                  {stage.badge}
                </span>
                <span className="font-['Syne',sans-serif] font-bold text-sm block">
                  {stage.title.split(':')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
          <div>
            <span className="text-xs font-mono font-bold text-[#A63D40]">
              {timelineStages[activeTimelineStage].badge} Milestone
            </span>
            <h3 className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111] mt-1">
              {timelineStages[activeTimelineStage].title}
            </h3>
            <p className="text-xs text-[#777777] mt-1 font-medium">
              {timelineStages[activeTimelineStage].subtitle}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#111111]">
              Milestone Checklist:
            </span>
            <ul className="space-y-2.5 text-xs text-[#777777]">
              {timelineStages[activeTimelineStage].instructions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Caution:</strong> {timelineStages[activeTimelineStage].caution}
            </p>
          </div>
        </div>

        <p className="text-xs text-[#777777] text-center italic">
          Remember: Healing times differ depending on individual immune function, anatomy location, sleep quality, and lifestyle habits.
        </p>
      </div>

      {/* Saline Solution Recipe / Studio Recommendation */}
      <div className="bg-[#111111] text-white rounded-2xl p-6 sm:p-10 space-y-4 border border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A63D40]">
          <Droplets className="w-4 h-4 text-[#A63D40]" />
          <span>The Standard of Care</span>
        </div>
        <h3 className="font-['Syne',sans-serif] text-2xl font-bold">
          Sterile 0.9% Sodium Chloride (Saline Spray)
        </h3>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
          We exclusively recommend pressurized cans of sterile 0.9% sodium chloride spray with no additives, benzalkonium chloride, or fragrance. Packaged sterile saline maintains pure isotonic equilibrium, gently loosening debris without irritating fresh cells.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('availability')}
            className="bg-[#A63D40] hover:bg-[#8E3235] text-white px-5 py-3 rounded-xl text-xs font-semibold transition-colors"
          >
            Book Downsize Appointment
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="border border-neutral-700 hover:border-white text-white px-5 py-3 rounded-xl text-xs font-semibold transition-colors"
          >
            Ask Piercer a Healing Question
          </button>
        </div>
      </div>
    </div>
  );
};
