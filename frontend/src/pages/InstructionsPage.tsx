import React from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, HeartPulse, CheckCircle2, AlertTriangle, Clock, ArrowRight, UserCheck, Stethoscope } from 'lucide-react';

interface InstructionsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const InstructionsPage: React.FC<InstructionsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
          Studio Guidelines & Protocols
        </span>
        <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
          How It Works & Instructions
        </h1>
        <p className="text-base text-[#777777] leading-relaxed">
          Knowledge is the foundation of a pain-free, rapid healing journey. Review our chronological client guide for what to do before, during, and after your piercing appointment.
        </p>
      </div>

      {/* 5-Step Process Timeline */}
      <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-10 space-y-8 shadow-xs">
        <div className="border-b border-[#E9E9E7] pb-4">
          <span className="text-[11px] uppercase font-bold tracking-widest text-[#A63D40]">
            The 5-Step Studio Journey
          </span>
          <h2 className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111] mt-0.5">
            From Appointment to Full Healing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            {
              step: 'STEP 01',
              title: 'Choose Your Piercing',
              desc: 'Browse our service catalog to understand anatomical placement, healing timetables, and jewelry designs.'
            },
            {
              step: 'STEP 02',
              title: 'Check Availability',
              desc: 'Choose your preferred date on our live calendar and lock in an open time slot.'
            },
            {
              step: 'STEP 03',
              title: 'Prepare',
              desc: 'Follow pre-appointment nutrition, sleep, and hygiene checklist before arriving at the studio.'
            },
            {
              step: 'STEP 04',
              title: 'Get Pierced',
              desc: 'Undergo sterile consultation, anatomy alignment marking, and gentle needle procedure in our suite.'
            },
            {
              step: 'STEP 05',
              title: 'Follow Aftercare',
              desc: 'Clean twice daily with 0.9% saline spray, avoid friction or rotation, and return for scheduled post downsizing.'
            }
          ].map((s, idx) => (
            <div key={idx} className="relative space-y-2">
              <span className="font-mono text-xs font-bold text-[#A63D40]">
                {s.step}
              </span>
              <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
                {s.title}
              </h3>
              <p className="text-xs text-[#777777] leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Phases Grid: Before, During, After */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Phase 1: Before Your Piercing */}
        <div className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-4">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63D40]">
              Phase 01
            </span>
            <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111] mt-1 mb-4">
              Before Your Piercing
            </h3>
            <ul className="space-y-3 text-xs text-[#777777]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Eat properly:</strong> Have a solid meal within 1–2 hours of arriving to stabilize blood sugar.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Stay hydrated:</strong> Drink water throughout the day. Hydrated skin perforates smoothly.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Arrive on time:</strong> Come 10 minutes early for paperwork and calm acclimation.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Bring valid ID:</strong> Government-issued ID is required for verification.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Sobriety:</strong> Avoid arriving under the influence of alcohol, drugs, or high doses of aspirin.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Disclose allergies:</strong> Inform piercer of latex, nickel, or antiseptic sensitivities.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Wear loose clothing:</strong> Avoid tight collars or high collars that catch ears or necklines.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Ask questions:</strong> Feel free to ask about any step of the process.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Phase 2: During Your Appointment */}
        <div className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63D40]">
              Phase 02
            </span>
            <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111] mt-1 mb-4">
              During Your Appointment
            </h3>
            <ul className="space-y-3 text-xs text-[#777777]">
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-white border border-[#E9E9E7] flex items-center justify-center text-[10px] font-bold text-[#111111] shrink-0 mt-0.5">1</span>
                <span><strong>Consultation:</strong> Thorough discussion of your desired look, lifestyle, sleep habits, and past piercing reactions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-white border border-[#E9E9E7] flex items-center justify-center text-[10px] font-bold text-[#111111] shrink-0 mt-0.5">2</span>
                <span><strong>Placement discussion:</strong> Anatomical palpation and gentian violet marking. You approve placement in a mirror.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-white border border-[#E9E9E7] flex items-center justify-center text-[10px] font-bold text-[#111111] shrink-0 mt-0.5">3</span>
                <span><strong>Jewelry selection:</strong> Selection of certified ASTM F-136 titanium or solid gold ends fitted to your post gauge.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-white border border-[#E9E9E7] flex items-center justify-center text-[10px] font-bold text-[#111111] shrink-0 mt-0.5">4</span>
                <span><strong>Hygiene prep:</strong> Antiseptic skin prep, sterile field set up, and medical-grade gloves donned.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-white border border-[#E9E9E7] flex items-center justify-center text-[10px] font-bold text-[#111111] shrink-0 mt-0.5">5</span>
                <span><strong>Piercing procedure:</strong> Guided deep breath, quick single needle insertion, and jewelry transfer in seconds.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-white border border-[#E9E9E7] flex items-center justify-center text-[10px] font-bold text-[#111111] shrink-0 mt-0.5">6</span>
                <span><strong>Initial aftercare:</strong> Verbal review of cleaning schedule, aftercare handout, and downsize appointment date.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Phase 3: After Your Piercing */}
        <div className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-4">
              <HeartPulse className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63D40]">
              Phase 03
            </span>
            <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111] mt-1 mb-4">
              After Your Piercing
            </h3>
            <ul className="space-y-3 text-xs text-[#777777]">
              <li className="flex items-start gap-2.5">
                <span className="text-[#A63D40] font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Keep the area clean:</strong> Spray with sterile 0.9% sodium chloride saline twice daily.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A63D40] font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Avoid unnecessary touching:</strong> Never spin, pick at crusties, or touch with unwashed hands.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A63D40] font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>No premature jewelry removal:</strong> Fistulas close in minutes during early weeks.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A63D40] font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Zero pressure sleeping:</strong> Avoid sleeping on the pierced ear to prevent angle migration.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A63D40] font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Avoid submerged water:</strong> No pools, lakes, or bathtubs until initial healing finishes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#A63D40] font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Downsize post:</strong> Return between weeks 4–8 to switch to a shorter snug post once swelling drops.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Critical Medical Warning Section */}
      <div className="bg-rose-50/60 border border-rose-200 rounded-2xl p-6 sm:p-10 space-y-4 text-rose-950">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-rose-700">
              Health & Safety Protocol
            </span>
            <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-rose-950">
              When to Seek Professional Medical Help
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-rose-900 leading-relaxed max-w-3xl">
          While mild local redness, tenderness, and clear lymph fluid are normal during early healing, genuine infections require prompt clinical evaluation. You should consult a qualified physician or healthcare professional immediately if you experience:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="bg-white/80 p-4 rounded-xl border border-rose-200/60 text-xs">
            <span className="font-bold block text-rose-950 mb-1">Spreading Redness</span>
            <p className="text-rose-800">Redness expanding outwards along the skin or radiating streaks.</p>
          </div>
          <div className="bg-white/80 p-4 rounded-xl border border-rose-200/60 text-xs">
            <span className="font-bold block text-rose-950 mb-1">Severe Throbbing & Heat</span>
            <p className="text-rose-800">Intense worsening pain or the site feeling noticeably hot to the touch.</p>
          </div>
          <div className="bg-white/80 p-4 rounded-xl border border-rose-200/60 text-xs">
            <span className="font-bold block text-rose-950 mb-1">Thick Discolored Discharge</span>
            <p className="text-rose-800">Copious greenish-yellow pus accompanied by an unpleasant odor.</p>
          </div>
          <div className="bg-white/80 p-4 rounded-xl border border-rose-200/60 text-xs">
            <span className="font-bold block text-rose-950 mb-1">Systemic Symptoms</span>
            <p className="text-rose-800">Fever, chills, swollen lymph nodes in the neck or jaw, or body malaise.</p>
          </div>
        </div>

        <div className="pt-2 text-xs text-rose-800 font-medium">
          <strong>Important Disclaimer:</strong> Information on this website is for educational and appointment guidance only. It is not a substitute for formal medical advice, diagnosis, or treatment. Do not remove jewelry if you suspect an infection, as closing the wound can trap pathogens inside an abscess. Seek physician care promptly.
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border border-[#E9E9E7] rounded-2xl">
        <div>
          <h4 className="font-['Syne',sans-serif] text-lg font-bold text-[#111111]">
            Ready to check available appointment dates?
          </h4>
          <p className="text-xs text-[#777777] mt-0.5">
            Book your session online in less than two minutes.
          </p>
        </div>
        <button
          onClick={() => onNavigate('availability')}
          className="bg-[#A63D40] hover:bg-[#8E3235] text-white px-6 py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-colors whitespace-nowrap"
        >
          Check Availability & Schedule
        </button>
      </div>
    </div>
  );
};
