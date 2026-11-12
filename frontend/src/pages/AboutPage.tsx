import React from 'react';
import { PageRoute } from '../types';
import { ShieldCheck, HeartPulse, Sparkles, Calendar, BookOpen, Clock, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A63D40]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#A63D40]" />
          <span>About Palabutasan</span>
        </div>
        <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
          What is Palabutasan?
        </h1>
        <p className="text-base sm:text-lg text-[#777777] leading-relaxed">
          Palabutasan is a modern, professional piercing information and appointment platform designed to transform how people plan, experience, and heal body modifications. We combine medical-grade hygiene standards, anatomical precision, and an intuitive scheduling interface.
        </p>
      </div>

      {/* Hero Visual Studio Showcase */}
      <div className="relative rounded-3xl overflow-hidden border border-[#E9E9E7] shadow-sm">
        <img
          src="/src/assets/images/studio_interior_clean_1790922161718.jpg"
          alt="Palabutasan studio suite"
          referrerPolicy="no-referrer"
          className="w-full h-80 sm:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-10 text-white">
          <div className="max-w-xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40] block mb-1">
              Mission Statement
            </span>
            <blockquote className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold leading-snug">
              “Our goal is to make piercing information simple, accessible, and easy to understand.”
            </blockquote>
          </div>
        </div>
      </div>

      {/* The 5-Step Visual Flow: Discover → Prepare → Book → Pierce → Care */}
      <div className="space-y-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
            The Journey
          </span>
          <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold text-[#111111] mt-1">
            Discover → Prepare → Book → Pierce → Care
          </h2>
          <p className="text-xs text-[#777777] mt-1">
            How we guide every client from first exploration to full maturation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: 'Step 01',
              title: 'Discover',
              desc: 'Learn about different ear, facial, and body placements, estimated healing periods, jewelry requirements, and starting rates.'
            },
            {
              step: 'Step 02',
              title: 'Prepare',
              desc: 'Follow our pre-appointment health checklist—eating, hydrating, avoiding caffeine or alcohol, and planning appropriate wardrobe.'
            },
            {
              step: 'Step 03',
              title: 'Book',
              desc: 'Check live real-time studio availability, choose a convenient open time slot, and receive an instant reference number.'
            },
            {
              step: 'Step 04',
              title: 'Pierce',
              desc: 'Visit our sterilized procedure room for comprehensive anatomy evaluation, sterile unpackaging, and smooth needle execution.'
            },
            {
              step: 'Step 05',
              title: 'Care',
              desc: 'Practice our two-stage sterile saline aftercare, sleep without friction, and return for your mandatory post downsize.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E9E9E7] rounded-xl p-5 hover:border-[#111111]/30 transition-colors">
              <span className="font-mono text-xs font-bold text-[#A63D40] block mb-2">
                {item.step}
              </span>
              <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
                {item.title}
              </h3>
              <p className="text-xs text-[#777777] mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pillars Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#E9E9E7]">
        {/* Pillar 1: Why Preparation Matters */}
        <div className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-white border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-2">
            <HeartPulse className="w-5 h-5" />
          </div>
          <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111]">
            Why Preparation Matters
          </h3>
          <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
            The physical reaction to a piercing is deeply tied to your systemic health. Arriving on an empty stomach drops blood sugar, provoking fainting or lightheadedness (vasovagal episodes). Hydrated tissue allows clean needle passage with minimal resistance, and well-rested immunity immediately begins efficient cellular repair.
          </p>
        </div>

        {/* Pillar 2: Why Proper Aftercare Matters */}
        <div className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-white border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-2">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111]">
            Why Proper Aftercare Matters
          </h3>
          <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
            A piercing creates an intentional puncture wound through living skin or cartilage. Over-cleaning with alcohol or twisting jewelry rips fragile collagen fibers and introduces pathogens. Our evidence-based protocol uses only sterile 0.9% sodium chloride spray to protect the developing epithelial fistula.
          </p>
        </div>

        {/* Pillar 3: How Users Check Availability */}
        <div className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-white border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-2">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111]">
            How Availability Tracking Works
          </h3>
          <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
            Clients can view live studio dates and individual time blocks. Green slots indicate ample open capacity, amber indicates limited last openings, and red indicates fully booked days. You can reserve without phone delays or manual scheduling friction.
          </p>
        </div>

        {/* Pillar 4: How Appointments Work */}
        <div className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-white border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111]">
            How In-Studio Appointments Work
          </h3>
          <p className="text-xs sm:text-sm text-[#777777] leading-relaxed">
            Every session reserves a full 30 to 45 minutes of dedicated one-on-one attention. We review your health declaration, examine your ear or facial geometry under surgical lighting, inspect and autoclave your jewelry, and perform the piercing calmly.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#111111] rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold">
            Ready to plan your piercing experience?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1">
            Check open calendar dates or explore our anatomical placement guide.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('availability')}
            className="bg-[#A63D40] hover:bg-[#8E3235] text-white px-5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-colors whitespace-nowrap"
          >
            Check Availability
          </button>
          <button
            onClick={() => onNavigate('piercings')}
            className="border border-neutral-700 hover:border-white text-white px-5 py-3 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap"
          >
            Explore Piercings
          </button>
        </div>
      </div>
    </div>
  );
};
