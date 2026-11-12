import React from 'react';
import { PageRoute } from '../types';
import { FAQAccordion } from '../components/FAQAccordion';

interface FAQsPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const FAQsPage: React.FC<FAQsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
          Clear Answers
        </span>
        <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-[#777777] leading-relaxed">
          Everything you need to know about pain sensations, appointment durations, initial jewelry standards, cancellation policies, and medical safety.
        </p>
      </div>

      <FAQAccordion onContactStudio={() => onNavigate('contact')} />
    </div>
  );
};
