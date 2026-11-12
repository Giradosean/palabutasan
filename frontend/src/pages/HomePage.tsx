import React, { useState } from 'react';
import { PageRoute, Piercing } from '../types';
import { PIERCINGS } from '../data/piercings';
import { PiercingCard } from '../components/PiercingCard';
import { AvailabilityWidget } from '../components/AvailabilityWidget';
import { FAQAccordion } from '../components/FAQAccordion';
import {
  ShieldCheck,
  CheckCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
  HeartPulse,
  Award,
  ChevronRight,
  Droplets,
  Layers,
  ThermometerSnowflake
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onViewPiercingDetails: (piercing: Piercing) => void;
  onBookPiercing: (piercing: Piercing) => void;
  onSelectSlotAndBook: (piercingId: string, date: string, time: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onViewPiercingDetails,
  onBookPiercing,
  onSelectSlotAndBook
}) => {
  const [featuredCategory, setFeaturedCategory] = useState<'all' | 'ear' | 'facial'>('all');

  const filteredPiercings = PIERCINGS.filter(p => {
    if (featuredCategory === 'all') return true;
    return p.category === featuredCategory;
  }).slice(0, 6); // featured sample

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      {/* 2. Hero Section */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A63D40] bg-white border border-[#E9E9E7] px-3.5 py-1.5 rounded-full shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A63D40]" />
                <span>Professional Piercing Studio & Availability</span>
              </div>

              <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-[1.08] text-balance">
                Your Piercing. <br />
                Your Style. <br />
                <span className="text-[#A63D40]">Done Right.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#777777] max-w-xl leading-relaxed">
                Explore our piercing services, learn how to prepare, and check availability before your visit. Transparent pricing, medical-grade hygiene, and personalized anatomical styling.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('availability')}
                  className="bg-[#A63D40] hover:bg-[#8E3235] text-white px-7 py-4 rounded-xl text-sm font-semibold tracking-wide transition-all shadow-xs hover:shadow-md flex items-center gap-2 group cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Check Availability</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('piercings')}
                  className="bg-white hover:bg-[#FAFAF7] border border-[#E9E9E7] hover:border-[#111111] text-[#111111] px-7 py-4 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Explore Piercings
                </button>
              </div>

              {/* Quiet Micro Trust Indicators */}
              <div className="pt-6 border-t border-[#E9E9E7] flex flex-wrap items-center gap-6 text-xs text-[#777777]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>ASTM F-136 Implant Titanium</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Class-B Autoclave Sterilization</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Transparent Scheduling</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E9E9E7] shadow-sm bg-neutral-100 group">
                <img
                  src="/src/assets/images/hero_piercing_editorial_1790922132779.jpg"
                  alt="Modern clean ear piercing curation featuring implant titanium studs"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto aspect-4/5 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating caption overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAFAF7]/80 block">
                    Curated Placement
                  </span>
                  <p className="font-['Syne',sans-serif] font-bold text-lg mt-0.5">
                    Individualized Anatomy Assessment
                  </p>
                  <p className="text-xs text-[#FAFAF7]/75 mt-0.5">
                    Every channel mapped for long-term comfort and alignment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Information Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-[#E9E9E7] rounded-xl p-6 hover:border-[#111111]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF7] border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
              Safe & Hygienic
            </h3>
            <p className="text-xs text-[#777777] mt-2 leading-relaxed">
              Professional hygiene practices, hospital-grade autoclave sterilization, and sealed single-use surgical needles.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E9E9E7] rounded-xl p-6 hover:border-[#111111]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF7] border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
              Professional Service
            </h3>
            <p className="text-xs text-[#777777] mt-2 leading-relaxed">
              A clean, calm, and organized piercing experience in a dedicated, distraction-free private procedure suite.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E9E9E7] rounded-xl p-6 hover:border-[#111111]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF7] border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
              Clear Instructions
            </h3>
            <p className="text-xs text-[#777777] mt-2 leading-relaxed">
              Know exactly what to do before your appointment and follow comprehensive step-by-step aftercare healing protocols.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#E9E9E7] rounded-xl p-6 hover:border-[#111111]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#FAFAF7] border border-[#E9E9E7] flex items-center justify-center text-[#A63D40] mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111]">
              Easy Availability
            </h3>
            <p className="text-xs text-[#777777] mt-2 leading-relaxed">
              Check live studio schedules, select your preferred time slot, and reserve your session online in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* 4. What is Palabutasan? */}
      <section className="bg-white border-y border-[#E9E9E7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
              About Our Purpose
            </span>
            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              What is Palabutasan?
            </h2>
            <p className="text-sm sm:text-base text-[#777777] leading-relaxed">
              Palabutasan is a piercing-focused platform designed to make the body modification experience easier, more informed, and completely transparent. We bridge the gap between creative personal style and rigorous clinical safety.
            </p>
            <p className="font-['Syne',sans-serif] font-semibold text-base sm:text-lg text-[#111111] pt-2 italic">
              “Our goal is to make piercing information simple, accessible, and easy to understand.”
            </p>
          </div>

          {/* Visual 5-Step Flow: Discover → Prepare → Book → Pierce → Care */}
          <div className="mt-14 pt-10 border-t border-[#E9E9E7]">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { step: '01', title: 'Discover', desc: 'Browse curated placements, healing ranges, and certified metals.' },
                { step: '02', title: 'Prepare', desc: 'Follow nutrition, hydration, and sleep guidelines for painless sessions.' },
                { step: '03', title: 'Book', desc: 'Pick your verified piercer and exact date without phone tag.' },
                { step: '04', title: 'Pierce', desc: 'Experience aseptic single-needle precision in a sterile suite.' },
                { step: '05', title: 'Care', desc: 'Track your healing calendar with saline protocols and downsize alerts.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#A63D40]">
                      {item.step}
                    </span>
                    <h3 className="font-['Syne',sans-serif] font-bold text-base text-[#111111] mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#777777] mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  {idx < 4 && (
                    <div className="hidden md:flex justify-end pt-3 text-[#777777]/40">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Piercings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#E9E9E7]">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
              Studio Catalog
            </span>
            <h2 className="font-['Syne',sans-serif] text-3xl font-extrabold text-[#111111] tracking-tight mt-1">
              Popular Piercings
            </h2>
            <p className="text-xs text-[#777777] mt-1">
              Select any piercing to inspect healing specifications and anatomy requirements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFeaturedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                featuredCategory === 'all'
                  ? 'bg-[#111111] text-white'
                  : 'bg-white border border-[#E9E9E7] text-[#777777] hover:text-[#111111]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFeaturedCategory('ear')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                featuredCategory === 'ear'
                  ? 'bg-[#111111] text-white'
                  : 'bg-white border border-[#E9E9E7] text-[#777777] hover:text-[#111111]'
              }`}
            >
              Ear
            </button>
            <button
              onClick={() => setFeaturedCategory('facial')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                featuredCategory === 'facial'
                  ? 'bg-[#111111] text-white'
                  : 'bg-white border border-[#E9E9E7] text-[#777777] hover:text-[#111111]'
              }`}
            >
              Facial
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {filteredPiercings.map(piercing => (
            <PiercingCard
              key={piercing.id}
              piercing={piercing}
              onViewDetails={onViewPiercingDetails}
              onCheckAvailability={onBookPiercing}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate('piercings')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#111111] hover:text-[#A63D40] py-2 px-4 border border-[#E9E9E7] rounded-xl hover:border-[#111111] transition-colors"
          >
            <span>View Full Piercing Catalog (15 Services)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 6. How It Works */}
      <section className="bg-[#111111] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
              The Studio Walkthrough
            </span>
            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
              We eliminate guesswork with a straightforward five-step journey from your initial browsing to full post-procedure healing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-12">
            {[
              { num: 'STEP 01', title: 'Choose Your Piercing', text: 'Browse available piercing services, view anatomy requirements, and check starting prices.' },
              { num: 'STEP 02', title: 'Check Availability', text: 'Select your preferred date and choose an open time slot that suits your schedule.' },
              { num: 'STEP 03', title: 'Prepare', text: 'Review preparation guidelines: eat properly, stay hydrated, and bring a valid ID.' },
              { num: 'STEP 04', title: 'Get Pierced', text: 'Visit the studio and complete the piercing procedure with a certified professional piercer.' },
              { num: 'STEP 05', title: 'Follow Aftercare', text: 'Follow our sterile saline aftercare regimen to ensure smooth, complication-free healing.' }
            ].map((step, idx) => (
              <div key={idx} className="border-t border-neutral-800 pt-5 space-y-2">
                <span className="font-mono text-xs text-[#A63D40] font-bold">
                  {step.num}
                </span>
                <h3 className="font-['Syne',sans-serif] text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-neutral-400">
              Have questions about your anatomy before booking?
            </span>
            <button
              onClick={() => onNavigate('instructions')}
              className="text-xs font-semibold text-white hover:text-[#A63D40] flex items-center gap-1 transition-colors"
            >
              <span>Read Detailed Preparation Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Safety & Hygiene Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A63D40]">
              <ShieldCheck className="w-4 h-4 text-[#A63D40]" />
              <span>Aseptic Clinical Protocol</span>
            </div>

            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight">
              Safety & Hygiene Without Compromise
            </h2>

            <p className="text-sm text-[#777777] leading-relaxed">
              We treat body piercing as an invasive minor procedure demanding hospital-tier sterile protocols. From medical-grade autoclave sterilization to single-use surgical needles, your health and safety are our foremost priority.
            </p>

            {/* Visual Process: Clean → Prepare → Pierce → Care */}
            <div className="p-4 bg-[#FAFAF7] border border-[#E9E9E7] rounded-xl">
              <span className="text-[11px] uppercase font-bold tracking-wider text-[#111111] block mb-2">
                Standard Operational Flow
              </span>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#111111]">
                <span>Clean</span>
                <span className="text-[#A63D40]">→</span>
                <span>Prepare</span>
                <span className="text-[#A63D40]">→</span>
                <span>Pierce</span>
                <span className="text-[#A63D40]">→</span>
                <span>Care</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#777777]">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Single-use tri-beveled surgical needles opened in your view</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Class-B autoclave steam sterilization with spore test logs</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Certified ASTM F-136 implant-grade titanium jewelry only</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Rigid biohazard containment and sharps disposal standards</span>
              </div>
            </div>

            <p className="text-xs italic text-[#777777] pt-2">
              “Always ask the piercer about their sterilization and hygiene procedures if you have questions.”
            </p>

            <button
              onClick={() => onNavigate('safety')}
              className="text-xs font-semibold text-[#A63D40] hover:text-[#8E3235] flex items-center gap-1.5 transition-colors pt-2"
            >
              <span>Explore Studio Hygiene Documentation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E9E9E7] shadow-xs">
              <img
                src="/src/assets/images/piercing_sterilization_tools_1790922193760.jpg"
                alt="Sealed sterile pouches, autoclave test strips, and surgical tools"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-4/3 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Before Your Appointment Section */}
      <section className="bg-white border-y border-[#E9E9E7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
              Preparation Essentials
            </span>
            <h2 className="font-['Syne',sans-serif] text-3xl font-extrabold text-[#111111] tracking-tight mt-1">
              Before Your Appointment
            </h2>
            <p className="text-xs sm:text-sm text-[#777777] mt-1.5 leading-relaxed">
              Arriving well-prepared ensures minimal sensation, stable blood sugar, and a smooth procedure.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Eat a Solid Meal',
                desc: 'Have a nutritious meal 1–2 hours before your appointment. Low blood sugar is the #1 cause of lightheadedness.'
              },
              {
                title: 'Hydrate & Rest',
                desc: 'Drink plenty of water and get a full night of restful sleep. Well-hydrated skin perforates smoothly and heals quicker.'
              },
              {
                title: 'Bring Valid Photo ID',
                desc: 'Government-issued ID is mandatory for age verification and studio consent records before any procedure.'
              },
              {
                title: 'Wear Comfortable Attire',
                desc: 'Loose clothing with open necklines prevents accidental friction or snagging over newly placed piercings.'
              }
            ].map((tip, idx) => (
              <div key={idx} className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-xl p-5">
                <span className="font-mono text-xs font-bold text-[#A63D40]">
                  0{idx + 1}
                </span>
                <h3 className="font-['Syne',sans-serif] font-bold text-sm text-[#111111] mt-1">
                  {tip.title}
                </h3>
                <p className="text-xs text-[#777777] mt-2 leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Availability Preview on Home ("Find Your Schedule") */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AvailabilityWidget
          onSelectSlotAndBook={onSelectSlotAndBook}
          onViewFullAvailability={() => onNavigate('availability')}
        />
      </section>

      {/* 10. FAQ Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
            Common Inquiries
          </span>
          <h2 className="font-['Syne',sans-serif] text-3xl font-extrabold text-[#111111] tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#777777] mt-1.5">
            Transparent answers on sensation, jewelry standards, downsize milestones, and studio policies.
          </p>
        </div>

        <FAQAccordion onContactStudio={() => onNavigate('contact')} />
      </section>

      {/* 11. Contact CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden border border-neutral-800">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
              Ready for Your Next Piercing?
            </span>
            <h2 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold tracking-tight">
              Have Questions or Want Custom Styling?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Visit our studio for an in-person anatomy consultation, explore our curated jewelry showcase, or book your schedule online today.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('availability')}
                className="bg-[#A63D40] hover:bg-[#8E3235] text-white px-6 py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-colors"
              >
                Check Studio Availability
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="border border-neutral-700 hover:border-white text-white px-6 py-3.5 rounded-xl text-xs font-semibold transition-colors"
              >
                Contact Concierge
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
