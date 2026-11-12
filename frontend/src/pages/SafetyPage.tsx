import React from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, CheckCircle2, Sparkles, AlertCircle, ArrowRight, Layers, ThermometerSnowflake, FileCheck, RefreshCw } from 'lucide-react';

interface SafetyPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const SafetyPage: React.FC<SafetyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
          Clinical Hygiene Protocol
        </span>
        <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
          Safety & Hygiene Standards
        </h1>
        <p className="text-base text-[#777777] leading-relaxed">
          At Palabutasan, we believe that world-class body art begins with non-negotiable aseptic standards. We operate on medical-grade cleanliness benchmarks at every stage of your piercing.
        </p>
      </div>

      {/* Visual Operational Flow: Clean → Prepare → Pierce → Care */}
      <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#A63D40]">
            The Chain of Sterility
          </span>
          <h2 className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111] mt-0.5">
            Clean → Prepare → Pierce → Care
          </h2>
          <p className="text-xs text-[#777777] mt-1">
            How our piercers preserve complete barrier integrity from client arrival to departure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-[#E9E9E7]">
          <div className="bg-[#FAFAF7] p-5 rounded-xl border border-[#E9E9E7] space-y-2">
            <span className="font-mono text-xs font-bold text-[#A63D40]">01. Clean</span>
            <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
              Decontamination
            </h3>
            <p className="text-xs text-[#777777] leading-relaxed">
              EPA-registered hospital disinfectant wipe-down of all clinical touchpoints, lighting, and hydraulic chairs between every client.
            </p>
          </div>

          <div className="bg-[#FAFAF7] p-5 rounded-xl border border-[#E9E9E7] space-y-2">
            <span className="font-mono text-xs font-bold text-[#A63D40]">02. Prepare</span>
            <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
              Aseptic Setup
            </h3>
            <p className="text-xs text-[#777777] leading-relaxed">
              Sterile tray barrier paper laid out; individual single-use needle pouches and autoclaved tools opened exclusively in front of the client.
            </p>
          </div>

          <div className="bg-[#FAFAF7] p-5 rounded-xl border border-[#E9E9E7] space-y-2">
            <span className="font-mono text-xs font-bold text-[#A63D40]">03. Pierce</span>
            <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
              Precision Execution
            </h3>
            <p className="text-xs text-[#777777] leading-relaxed">
              Laser-honed tri-beveled single-use surgical needle creates a smooth channel without blunt tissue destruction or gun trauma.
            </p>
          </div>

          <div className="bg-[#FAFAF7] p-5 rounded-xl border border-[#E9E9E7] space-y-2">
            <span className="font-mono text-xs font-bold text-[#A63D40]">04. Care</span>
            <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
              Post-Care Guard
            </h3>
            <p className="text-xs text-[#777777] leading-relaxed">
              Clean skin barrier pat-down, sterile saline mist demonstration, and personal aftercare calendar provided with clear downsize instructions.
            </p>
          </div>
        </div>
      </div>

      {/* The 8 Core Safety Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: 'Medical-Grade Hand Hygiene',
            desc: 'Surgical scrub protocols before touching any sterile field. We wear powder-free, medical-grade nitrile examination gloves and perform glove changes if any non-sterile surface is touched.'
          },
          {
            title: 'Isolated & Disinfected Work Area',
            desc: 'Our procedure suites are physically separated from waiting rooms to prevent aerosol cross-contamination. Non-porous medical vinyl and stainless surfaces are disinfected with intermediate hospital germicide.'
          },
          {
            title: 'Class-B Vacuum Autoclave Sterilization',
            desc: 'All non-disposable metal receiving tools, forceps, and taper pins are cleaned in an ultrasonic bath, sealed into Class-4 indicator pouches, and processed in our medical steam autoclave. Spore tests are performed monthly.'
          },
          {
            title: '100% Single-Use Sterile Needles',
            desc: 'We never reuse, re-sterilize, or repackage piercing needles. Every needle is pre-sterilized by the manufacturer, opened directly in your sightline, and placed into a certified biohazard sharps container immediately after use.'
          },
          {
            title: 'Biocompatible Implant Jewelry Standards',
            desc: 'We strictly stock ASTM F-136 implant-grade titanium, 14k/18k solid nickel-free gold, and niobium. We never pierce with mystery alloys, plated costume metals, or cheap surgical steels that trigger nickel reactions.'
          },
          {
            title: 'Strict Sharps & Biohazard Disposal',
            desc: 'Used needles, gauze, and prep pads are isolated into regulated puncture-resistant biohazard receptacles that are logged and managed by licensed medical waste services.'
          },
          {
            title: 'Pre-Procedure Consultation & Anatomy Check',
            desc: 'We inspect tissue thickness, vascularity, and movement before agreeing to perform a piercing. If anatomy cannot safely support a chosen placement, we honestly explain why and suggest suitable alternatives.'
          },
          {
            title: 'Comprehensive Aftercare Guidance & Checkups',
            desc: 'We supply clear printed and digital instructions, recommending only isotonic saline spray. Clients enjoy complimentary downsize checkups and quick troubleshooting if bumps or snags occur.'
          }
        ].map((pillar, idx) => (
          <div key={idx} className="bg-white border border-[#E9E9E7] rounded-xl p-6 hover:border-[#111111]/30 transition-colors">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#777777] mt-2 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prominent Golden Rule Callout */}
      <div className="bg-[#111111] text-white rounded-2xl p-8 sm:p-10 border border-neutral-800 text-center max-w-3xl mx-auto space-y-3">
        <Sparkles className="w-6 h-6 text-[#A63D40] mx-auto" />
        <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold">
          “Always ask the piercer about their sterilization and hygiene procedures if you have questions.”
        </h3>
        <p className="text-xs text-neutral-400 max-w-lg mx-auto">
          A reputable professional will always be eager to show you their autoclave spore reports, sealed sterile packaging, and certified titanium mill certificates.
        </p>
        <div className="pt-4">
          <button
            onClick={() => onNavigate('availability')}
            className="bg-[#A63D40] hover:bg-[#8E3235] text-white px-6 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors"
          >
            Schedule a Studio Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
