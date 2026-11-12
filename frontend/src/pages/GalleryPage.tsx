import React from 'react';
import { PageRoute } from '../types';
import { GallerySection } from '../components/GallerySection';

interface GalleryPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
          Visual Portfolio
        </span>
        <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
          Studio Gallery & Curation
        </h1>
        <p className="text-base text-[#777777] leading-relaxed">
          Explore finished piercing placements, certified implant-grade jewelry collections, and our sterile procedural suite. Click any photo to view in high resolution.
        </p>
      </div>

      <GallerySection onBookNow={() => onNavigate('availability')} />
    </div>
  );
};
