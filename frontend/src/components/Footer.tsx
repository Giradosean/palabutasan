import React from 'react';
import { PageRoute } from '../types';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

interface FooterProps {
  onRouteChange: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onRouteChange }) => {
  const handleNav = (route: PageRoute) => {
    onRouteChange(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#FAFAF7] border-t border-neutral-800">
      {/* Top Banner / Mission Callout */}
      <div className="border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A63D40] mb-2">
              <ShieldCheck className="w-4 h-4 text-[#A63D40]" />
              <span>Know. Prepare. Pierce.</span>
            </div>
            <p className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold text-white tracking-tight">
              Piercing Made Simple. Safe. Clean. Yours.
            </p>
          </div>
          <button
            onClick={() => handleNav('availability')}
            className="bg-[#A63D40] hover:bg-[#8E3235] text-white text-xs font-semibold px-5 py-3 rounded-lg transition-colors whitespace-nowrap"
          >
            Check Schedule Availability
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#111111]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8" />
                  <line x1="4" y1="12" x2="20" y2="12" stroke="#A63D40" strokeWidth="3" />
                </svg>
              </div>
              <span className="font-['Syne',sans-serif] font-bold text-xl tracking-tight text-white">
                PALABUTASAN
              </span>
            </div>
            <p className="text-sm text-[#E9E9E7]/70 leading-relaxed max-w-sm">
              A modern, professional piercing information and appointment platform. Dedicated to medical-grade hygiene, transparent anatomy education, and precision aesthetic curation.
            </p>
            <div className="flex items-center gap-4 text-[#E9E9E7]/60 pt-2">
              <a
                href="#social"
                onClick={(e) => { e.preventDefault(); }}
                className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center hover:text-white hover:border-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#social"
                onClick={(e) => { e.preventDefault(); }}
                className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center hover:text-white hover:border-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Exploration */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#E9E9E7]">
              Services & Guides
            </h3>
            <ul className="space-y-2 text-sm text-[#E9E9E7]/70">
              <li>
                <button onClick={() => handleNav('piercings')} className="hover:text-white transition-colors">
                  Ear Piercings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('piercings')} className="hover:text-white transition-colors">
                  Facial Piercings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('instructions')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('instructions')} className="hover:text-white transition-colors">
                  Before You Pierce
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('aftercare')} className="hover:text-white transition-colors">
                  Aftercare Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('safety')} className="hover:text-white transition-colors">
                  Hygiene & Safety
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Booking */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#E9E9E7]">
              Appointments
            </h3>
            <ul className="space-y-2 text-sm text-[#E9E9E7]/70">
              <li>
                <button onClick={() => handleNav('availability')} className="hover:text-white transition-colors">
                  Check Calendar
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('status')} className="hover:text-white transition-colors">
                  Track Appointment
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricing')} className="hover:text-white transition-colors">
                  Service Pricing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-white transition-colors">
                  Studio Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faqs')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin-dashboard')} className="text-neutral-400 hover:text-white transition-colors">
                  Studio Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Hours & Contact Info */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#E9E9E7]">
              Studio Information
            </h3>
            <div className="space-y-2.5 text-xs text-[#E9E9E7]/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A63D40] shrink-0 mt-0.5" />
                <span>Unit 302, Artisan Creative Hub, Bonifacio High St., Taguig City, Philippines</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A63D40] shrink-0" />
                <span>+63 917 888 7437</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A63D40] shrink-0" />
                <span>concierge@palabutasan.ph</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#A63D40] shrink-0 mt-0.5" />
                <div>
                  <p>Tue – Sun: 10:00 AM – 7:00 PM</p>
                  <p className="text-neutral-400">Mondays: Closed (Autoclave Sterilization)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E9E9E7]/60">
          <div>
            © 2026 Palabutasan. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
              Contact Studio
            </button>
            <button onClick={() => handleNav('admin-dashboard')} className="text-neutral-500 hover:text-neutral-300 transition-colors">
              Studio Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
