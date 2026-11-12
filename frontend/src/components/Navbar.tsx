import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { Menu, X, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';

interface NavbarProps {
  currentRoute: PageRoute;
  onRouteChange: (route: PageRoute) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onRouteChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About', route: 'about' },
    { label: 'Piercings', route: 'piercings' },
    { label: 'How It Works', route: 'instructions' },
    { label: 'Aftercare', route: 'aftercare' },
    { label: 'Availability', route: 'availability' },
    { label: 'FAQs', route: 'faqs' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    onRouteChange(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#E9E9E7] shadow-xs'
          : 'bg-[#FAFAF7] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A63D40] rounded-sm"
            aria-label="Palabutasan homepage"
          >
            <div className="w-9 h-9 rounded-full bg-[#111111] flex items-center justify-center text-[#FAFAF7] transition-transform duration-200 group-hover:scale-105">
              {/* Minimal geometric piercing aperture needle glyph */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8" />
                <line x1="4" y1="12" x2="20" y2="12" stroke="#A63D40" strokeWidth="2.5" />
                <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-['Syne',sans-serif] font-bold text-xl sm:text-2xl tracking-tight text-[#111111] leading-none">
                PALABUTASAN
              </span>
              <span className="text-[10px] tracking-widest text-[#777777] uppercase font-medium mt-1">
                Studio & Availability
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#777777]">
            {navLinks.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`relative py-1 transition-colors whitespace-nowrap hover:text-[#111111] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A63D40] rounded-sm ${
                    isActive ? 'text-[#111111] font-semibold' : 'text-[#777777]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#A63D40] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('status')}
              className="text-xs font-medium text-[#777777] hover:text-[#111111] px-3 py-2 transition-colors whitespace-nowrap"
            >
              Track Appointment
            </button>
            <button
              onClick={() => handleNavClick('availability')}
              className="inline-flex items-center gap-2 bg-[#A63D40] hover:bg-[#8E3235] text-white px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A63D40] whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Check Availability</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('availability')}
              className="sm:hidden inline-flex items-center gap-1.5 bg-[#A63D40] text-white px-3 py-1.5 rounded-md text-xs font-semibold"
            >
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] hover:bg-[#E9E9E7] rounded-lg transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A63D40]"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E9E9E7] bg-[#FAFAF7] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in duration-150">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#E9E9E7] text-[#111111] font-semibold text-[#A63D40]'
                      : 'text-[#111111] hover:bg-[#E9E9E7]/60'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#777777]" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E9E9E7] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('status')}
              className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-[#777777] hover:text-[#111111] rounded-md hover:bg-[#E9E9E7]/60"
            >
              <span>Track Appointment Status</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavClick('availability')}
              className="w-full flex items-center justify-center gap-2 bg-[#A63D40] hover:bg-[#8E3235] text-white py-3 rounded-lg text-sm font-semibold transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Availability & Book</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
