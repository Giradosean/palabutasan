import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/gallery';
import { X, ZoomIn, Eye, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  onBookNow?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onBookNow }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Showcase' },
    { id: 'ear', label: 'Ear Curation' },
    { id: 'facial', label: 'Facial Piercings' },
    { id: 'jewelry', label: 'Implant Jewelry' },
    { id: 'studio', label: 'Studio Hygiene' }
  ];

  const filteredItems = GALLERY_ITEMS.filter(
    item => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="space-y-8">
      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#111111] text-white shadow-2xs'
                  : 'bg-white border border-[#E9E9E7] text-[#777777] hover:text-[#111111] hover:border-[#111111]/30'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer bg-white border border-[#E9E9E7] rounded-2xl overflow-hidden hover:border-[#111111] hover:shadow-xs transition-all duration-200 flex flex-col"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#A63D40] block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-['Syne',sans-serif] font-bold text-base text-[#111111] group-hover:text-[#A63D40] transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#777777] mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E9E9E7] flex items-center justify-between text-xs text-[#777777]">
                  <span className="font-medium">Studio Verified</span>
                  <span className="text-[#111111] font-semibold flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Details
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-[#E9E9E7] rounded-2xl p-8">
          <p className="text-sm text-[#777777]">Gallery images will appear here.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E9E9E7] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/10 bg-neutral-900 overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#A63D40] block mb-1">
                {activeItem.category} Curation
              </span>
              <h3 className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111]">
                {activeItem.title}
              </h3>
              <p className="text-sm text-[#777777] mt-2 leading-relaxed">
                {activeItem.description}
              </p>

              <div className="mt-6 pt-4 border-t border-[#E9E9E7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-[#777777]">
                  All procedures follow strict aseptic technique and certified biocompatible metals.
                </span>
                {onBookNow && (
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      onBookNow();
                    }}
                    className="bg-[#A63D40] hover:bg-[#8E3235] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    Check Availability
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
