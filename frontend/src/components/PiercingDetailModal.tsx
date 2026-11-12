import React from 'react';
import { Piercing } from '../types';
import { EarDiagram } from './EarDiagram';
import { X, Clock, Sparkles, CheckCircle2, ShieldAlert, ArrowRight, HeartPulse } from 'lucide-react';

interface PiercingDetailModalProps {
  piercing: Piercing | null;
  onClose: () => void;
  onCheckAvailability: (piercing: Piercing) => void;
  onSelectAlternativePiercing?: (piercingId: string) => void;
}

export const PiercingDetailModal: React.FC<PiercingDetailModalProps> = ({
  piercing,
  onClose,
  onCheckAvailability,
  onSelectAlternativePiercing
}) => {
  if (!piercing) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E9E9E7] relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-piercing-title"
      >
        {/* Sticky Modal Header Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#E9E9E7] flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-xs text-[#777777]">
            <span className="uppercase tracking-wider font-semibold text-[#A63D40]">
              {piercing.category} Piercing
            </span>
            <span>·</span>
            <span>{piercing.painLevel} Discomfort</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#777777] hover:text-[#111111] hover:bg-[#E9E9E7] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Top Title & Price Grid */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E9E7]">
            <div>
              <h2
                id="modal-piercing-title"
                className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight"
              >
                {piercing.name}
              </h2>
              <p className="text-sm text-[#777777] mt-1 max-w-xl">
                {piercing.shortDescription}
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-[#777777] block font-medium">
                Starting Studio Rate
              </span>
              <span className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111] tabular-nums">
                {piercing.formattedPrice}
              </span>
              <span className="text-[10px] text-[#777777] block mt-0.5">
                Includes implant-grade basic post
              </span>
            </div>
          </div>

          {/* Placement Illustration & Key Specs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FAFAF7] p-6 rounded-2xl border border-[#E9E9E7]">
            {/* Placement Illustration */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              {piercing.category === 'ear' ? (
                <EarDiagram
                  activePiercingId={piercing.id}
                  onSelectPiercing={onSelectAlternativePiercing}
                  size="md"
                />
              ) : (
                <div className="w-full h-64 flex flex-col items-center justify-center p-6 text-center border border-dashed border-[#E9E9E7] rounded-xl bg-white">
                  <div className="w-14 h-14 rounded-full bg-[#FAFAF7] border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
                    {piercing.name} Placement
                  </h4>
                  <p className="text-xs text-[#777777] mt-1.5 leading-relaxed">
                    {piercing.placement}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Spec list */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-white p-4 rounded-xl border border-[#E9E9E7] space-y-3 text-xs">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#777777] block font-semibold">
                    Anatomical Placement
                  </span>
                  <p className="text-[#111111] font-medium text-sm mt-0.5">
                    {piercing.placement}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E9E9E7] flex justify-between items-center">
                  <span className="text-[#777777] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#A63D40]" />
                    Estimated Healing Period:
                  </span>
                  <span className="text-sm font-bold text-[#111111] tabular-nums">
                    {piercing.healingPeriod}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#E9E9E7]">
                  <span className="text-[11px] uppercase tracking-wider text-[#777777] block font-semibold mb-1">
                    Anatomy Compatibility Note:
                  </span>
                  <p className="text-xs text-[#777777] leading-relaxed">
                    {piercing.details.anatomyNote}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E9E9E7] flex justify-between items-center">
                  <span className="text-[#777777] flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-[#A63D40]" />
                    Sensation Rating:
                  </span>
                  <span className="text-xs text-[#111111] font-semibold">
                    {piercing.details.painLevelDescription}
                  </span>
                </div>
              </div>

              {/* Jewelry Options */}
              <div className="bg-white p-4 rounded-xl border border-[#E9E9E7] text-xs">
                <span className="text-[11px] uppercase tracking-wider text-[#777777] block font-semibold mb-2">
                  Studio-Approved Jewelry Materials
                </span>
                <ul className="space-y-1.5 text-xs text-[#111111]">
                  {piercing.details.jewelryMaterials.map((mat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* In-depth About */}
          <div>
            <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#111111] mb-2">
              About the Procedure
            </h3>
            <p className="text-sm text-[#777777] leading-relaxed">
              {piercing.details.about}
            </p>
          </div>

          {/* Before & Aftercare Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Appointment */}
            <div className="bg-white border border-[#E9E9E7] p-5 rounded-xl">
              <h4 className="font-['Syne',sans-serif] text-sm font-bold text-[#111111] uppercase tracking-wider mb-3">
                Before Your Appointment
              </h4>
              <ul className="space-y-2.5 text-xs text-[#777777]">
                {piercing.details.prepChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#FAFAF7] border border-[#E9E9E7] flex items-center justify-center text-[10px] font-bold text-[#111111] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Aftercare */}
            <div className="bg-white border border-[#E9E9E7] p-5 rounded-xl">
              <h4 className="font-['Syne',sans-serif] text-sm font-bold text-[#111111] uppercase tracking-wider mb-3">
                Crucial Aftercare Rules
              </h4>
              <ul className="space-y-2.5 text-xs text-[#777777]">
                {piercing.details.aftercareNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#A63D40] font-bold shrink-0 mt-0.5">✓</span>
                    <span className="leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mandatory Important Health Note */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">Important Medical Note:</span>
              <p>
                Individual healing times can vary based on personal health, sleep, and lifestyle. Follow your piercer’s instructions carefully and seek professional medical advice if you experience concerning symptoms such as excessive spreading redness, fever, or severe localized swelling.
              </p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#E9E9E7] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="text-xs font-semibold text-[#777777] hover:text-[#111111] transition-colors"
            >
              Close Window
            </button>
            <button
              onClick={() => {
                onClose();
                onCheckAvailability(piercing);
              }}
              className="w-full sm:w-auto bg-[#A63D40] hover:bg-[#8E3235] text-white px-6 py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Check Availability for {piercing.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
