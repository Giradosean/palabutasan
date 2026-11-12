import React from 'react';
import { PageRoute } from '../types';
import { ShieldCheck } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const PrivacyPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-[#E9E9E7] pb-6">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
          Legal & Compliance
        </span>
        <h1 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#111111]">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#777777]">
          Last updated: October 2026 · Effective for Palabutasan Piercing Platform
        </p>
      </div>

      <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-[#777777] space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-['Syne',sans-serif] font-bold text-base sm:text-lg text-[#111111]">
            1. Information We Collect
          </h2>
          <p>
            When you schedule an appointment or contact Palabutasan, we collect essential client information, including your full legal name, email address, mobile phone number, requested piercing services, and any voluntarily disclosed medical or allergy notes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Syne',sans-serif] font-bold text-base sm:text-lg text-[#111111]">
            2. Purpose of Processing
          </h2>
          <p>
            Personal data collected through our appointment and inquiry forms is used strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Verify and reserve studio procedural schedules.</li>
            <li>Send appointment reference confirmations and downsize reminders.</li>
            <li>Assess anatomical suitability and accommodate metal allergy sensitivities.</li>
            <li>Maintain health compliance logs required for clinical body modification safety.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Syne',sans-serif] font-bold text-base sm:text-lg text-[#111111]">
            3. Data Protection & Confidentiality
          </h2>
          <p>
            We implement strict administrative, technical, and physical safeguards to secure client details against unauthorized disclosure, loss, or access. We do not sell, rent, or trade your personal information to third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Syne',sans-serif] font-bold text-base sm:text-lg text-[#111111]">
            4. Contact
          </h2>
          <p>
            For privacy inquiries or request to expunge personal records, contact us at <strong className="text-[#111111]">concierge@palabutasan.ph</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
