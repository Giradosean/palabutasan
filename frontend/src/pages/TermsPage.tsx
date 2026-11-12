import React from 'react';
import { PageRoute } from '../types';

interface LegalPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const TermsPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-[#E9E9E7] pb-6">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
          Legal & Studio Rules
        </span>
        <h1 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-[#111111]">
          Terms & Conditions
        </h1>
        <p className="text-xs text-[#777777]">
          Last updated: October 2026 · Studio Appointment Agreement
        </p>
      </div>

      <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-[#777777] space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-['Syne',sans-serif] font-bold text-base sm:text-lg text-[#111111]">
            1. Age Requirements & Identification
          </h2>
          <p>
            Clients must be at least 18 years of age with a valid government photo ID to receive piercing services independently. Minors aged 14–17 require in-person parental or legal guardian consent with matching birth certificates or guardianship documentation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Syne',sans-serif] font-bold text-base sm:text-lg text-[#111111]">
            2. Health & Sobriety Policy
          </h2>
          <p>
            Palabutasan strictly reserves the right to refuse service to any individual arriving under the influence of alcohol, recreational drugs, or narcotics. Clients must disclose relevant medical conditions including hemophilia, diabetes, heart conditions, bloodborne pathogens, or severe skin conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Syne',sans-serif] font-bold text-base sm:text-lg text-[#111111]">
            3. Cancellations & Late Arrivals
          </h2>
          <p>
            Please give at least 24 hours notice for any cancellations or schedule adjustments. Arrivals exceeding 15 minutes past the reserved appointment time may require rescheduling to preserve procedural flow for following clients.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-['Syne',sans-serif] font-bold text-base sm:text-lg text-[#111111]">
            4. Limitation of Liability & Medical Advice Disclaimer
          </h2>
          <p>
            Information provided on this website and during consultations is educational in nature. It is not professional medical counsel. Clients are responsible for following aftercare guidance diligently and consulting licensed medical practitioners if infections or adverse complications develop.
          </p>
        </section>
      </div>
    </div>
  );
};
