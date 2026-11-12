import React, { useState, useEffect, useCallback } from 'react';
import { PageRoute, Piercing } from './types';
import { PIERCINGS } from './data/piercings';
import { getAdminToken } from './api';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PiercingDetailModal } from './components/PiercingDetailModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PiercingsPage } from './pages/PiercingsPage';
import { InstructionsPage } from './pages/InstructionsPage';
import { AftercarePage } from './pages/AftercarePage';
import { AvailabilityPage } from './pages/AvailabilityPage';
import { BookingPage } from './pages/BookingPage';
import { StatusPage } from './pages/StatusPage';
import { SafetyPage } from './pages/SafetyPage';
import { PricingPage } from './pages/PricingPage';
import { GalleryPage } from './pages/GalleryPage';
import { FAQsPage } from './pages/FAQsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

function resolveRouteFromLocation(): PageRoute {
  const hashRaw = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
  const pathRaw = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const candidate = hashRaw || pathRaw;

  if (candidate === 'admin/login' || candidate === 'admin-login') {
    return 'admin-login';
  }
  if (
    candidate === 'admin/dashboard' ||
    candidate === 'admin-dashboard' ||
    candidate === 'admin'
  ) {
    return getAdminToken() ? 'admin-dashboard' : 'admin-login';
  }

  const validRoutes: PageRoute[] = [
    'home',
    'about',
    'piercings',
    'instructions',
    'aftercare',
    'availability',
    'booking',
    'status',
    'safety',
    'pricing',
    'gallery',
    'faqs',
    'contact',
    'privacy',
    'terms',
  ];

  if (validRoutes.includes(candidate as PageRoute)) {
    return candidate as PageRoute;
  }

  return 'home';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => resolveRouteFromLocation());
  const [selectedPiercingForModal, setSelectedPiercingForModal] = useState<Piercing | null>(null);

  // Booking details passed from calendar to booking form
  const [bookingDetails, setBookingDetails] = useState<
    | {
        piercingId: string;
        piercingName: string;
        date: string;
        time: string;
        peopleCount: number;
        notes?: string;
      }
    | undefined
  >(undefined);

  // Reference number for status tracking
  const [trackedReference, setTrackedReference] = useState<string>('');

  const navigateTo = useCallback((route: PageRoute) => {
    if (route === 'admin' || route === 'admin-dashboard') {
      if (!getAdminToken()) {
        setCurrentRoute('admin-login');
        window.location.hash = '#/admin/login';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      setCurrentRoute('admin-dashboard');
      window.location.hash = '#/admin/dashboard';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (route === 'admin-login') {
      setCurrentRoute('admin-login');
      window.location.hash = '#/admin/login';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentRoute(route);
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Synchronize route with URL hash / popstate for navigation & bookmarking
  useEffect(() => {
    const syncRoute = () => {
      const resolved = resolveRouteFromLocation();
      setCurrentRoute(resolved);
      if (resolved === 'admin-login' && window.location.hash.includes('admin/dashboard')) {
        window.location.hash = '#/admin/login';
      }
    };

    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    syncRoute();

    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const handleOpenPiercingModal = (piercing: Piercing) => {
    setSelectedPiercingForModal(piercing);
  };

  const handleSelectAlternativePiercingInModal = (piercingId: string) => {
    const found = PIERCINGS.find((p) => p.id === piercingId);
    if (found) {
      setSelectedPiercingForModal(found);
    }
  };

  const handleBookPiercingFromCardOrModal = (piercing: Piercing) => {
    setSelectedPiercingForModal(null);
    setBookingDetails({
      piercingId: piercing.id,
      piercingName: piercing.name,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '2:00 PM',
      peopleCount: 1,
    });
    navigateTo('availability');
  };

  const handleSelectSlotAndBook = (piercingId: string, date: string, time: string) => {
    const p = PIERCINGS.find((item) => item.id === piercingId);
    setBookingDetails({
      piercingId,
      piercingName: p?.name || 'Selected Piercing',
      date,
      time,
      peopleCount: 1,
    });
    navigateTo('booking');
  };

  const handleProceedToBooking = (details: {
    piercingId: string;
    piercingName: string;
    date: string;
    time: string;
    peopleCount: number;
    notes?: string;
  }) => {
    setBookingDetails(details);
    navigateTo('booking');
  };

  const handleTrackStatus = (ref?: string) => {
    if (ref) {
      setTrackedReference(ref);
    }
    navigateTo('status');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#111111] font-sans antialiased selection:bg-[#A63D40] selection:text-white">
      {/* Global Navigation */}
      <Navbar currentRoute={currentRoute} onRouteChange={navigateTo} />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onViewPiercingDetails={handleOpenPiercingModal}
            onBookPiercing={handleBookPiercingFromCardOrModal}
            onSelectSlotAndBook={handleSelectSlotAndBook}
          />
        )}

        {currentRoute === 'about' && <AboutPage onNavigate={navigateTo} />}

        {currentRoute === 'piercings' && (
          <PiercingsPage
            onViewDetails={handleOpenPiercingModal}
            onBookPiercing={handleBookPiercingFromCardOrModal}
          />
        )}

        {currentRoute === 'instructions' && <InstructionsPage onNavigate={navigateTo} />}

        {currentRoute === 'aftercare' && <AftercarePage onNavigate={navigateTo} />}

        {currentRoute === 'availability' && (
          <AvailabilityPage
            initialPiercingId={bookingDetails?.piercingId}
            onProceedToBooking={handleProceedToBooking}
            onTrackStatus={() => navigateTo('status')}
          />
        )}

        {currentRoute === 'booking' && (
          <BookingPage
            initialData={bookingDetails}
            onBackToCalendar={() => navigateTo('availability')}
            onViewStatus={handleTrackStatus}
          />
        )}

        {currentRoute === 'status' && (
          <StatusPage
            initialReference={trackedReference}
            onBookNew={() => navigateTo('availability')}
          />
        )}

        {currentRoute === 'safety' && <SafetyPage onNavigate={navigateTo} />}

        {currentRoute === 'pricing' && (
          <PricingPage
            onSelectPiercingToBook={handleBookPiercingFromCardOrModal}
            onViewDetails={handleOpenPiercingModal}
          />
        )}

        {currentRoute === 'gallery' && <GalleryPage onNavigate={navigateTo} />}

        {currentRoute === 'faqs' && <FAQsPage onNavigate={navigateTo} />}

        {currentRoute === 'contact' && <ContactPage onNavigate={navigateTo} />}

        {currentRoute === 'admin-login' && (
          <AdminLoginPage
            onLoginSuccess={() => navigateTo('admin-dashboard')}
            onNavigate={navigateTo}
          />
        )}

        {(currentRoute === 'admin-dashboard' || currentRoute === 'admin') && (
          <AdminPage onRequireLogin={() => navigateTo('admin-login')} />
        )}

        {currentRoute === 'privacy' && <PrivacyPage onNavigate={navigateTo} />}

        {currentRoute === 'terms' && <TermsPage onNavigate={navigateTo} />}
      </main>

      {/* Piercing Details Modal */}
      <PiercingDetailModal
        piercing={selectedPiercingForModal}
        onClose={() => setSelectedPiercingForModal(null)}
        onCheckAvailability={handleBookPiercingFromCardOrModal}
        onSelectAlternativePiercing={handleSelectAlternativePiercingInModal}
      />

      {/* Global Footer */}
      <Footer onRouteChange={navigateTo} />
    </div>
  );
}
