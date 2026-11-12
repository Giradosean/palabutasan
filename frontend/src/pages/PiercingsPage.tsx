import React, { useState, useEffect } from 'react';
import { PageRoute, Piercing, PiercingCategory } from '../types';
import { PIERCINGS, PIERCING_CATEGORIES } from '../data/piercings';
import { api } from '../api';
import { PiercingCard } from '../components/PiercingCard';
import { EarDiagram } from '../components/EarDiagram';
import { Search, SlidersHorizontal, Sparkles, HelpCircle, Layers } from 'lucide-react';

interface PiercingsPageProps {
  onViewDetails: (piercing: Piercing) => void;
  onBookPiercing: (piercing: Piercing) => void;
}

export const PiercingsPage: React.FC<PiercingsPageProps> = ({
  onViewDetails,
  onBookPiercing
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'diagram'>('grid');
  const [highlightedPiercingId, setHighlightedPiercingId] = useState<string>('helix');
  const [piercingsList, setPiercingsList] = useState<Piercing[]>(PIERCINGS);

  useEffect(() => {
    let isMounted = true;
    api.getServices().then(services => {
      if (!isMounted) return;
      if (services && services.length > 0) {
        const mapped: Piercing[] = services.map(s => {
          const found = PIERCINGS.find(
            p => p.name.toLowerCase() === s.name.toLowerCase() || p.id.toLowerCase() === s.name.toLowerCase()
          );
          if (found) {
            return {
              ...found,
              startingPrice: Number(s.price),
              formattedPrice: `₱${Number(s.price).toLocaleString()}`,
            };
          }
          return {
            id: `service-${s.id}`,
            name: s.name,
            category: (s.category.toLowerCase() === 'facial' ? 'facial' : s.category.toLowerCase() === 'body' ? 'other' : 'ear') as PiercingCategory,
            shortDescription: s.description || `${s.name} at Palabutasan`,
            placement: s.category,
            healingPeriod: s.healing_time,
            jewelryInfo: s.jewelry_material,
            startingPrice: Number(s.price),
            formattedPrice: `₱${Number(s.price).toLocaleString()}`,
            availabilityStatus: 'available' as const,
            painLevel: 'Moderate' as const,
            details: {
              about: s.description,
              prepChecklist: ['Eat a nutritious meal', 'Bring valid government ID'],
              aftercareNotes: ['Clean with sterile saline twice daily', 'Do not rotate jewelry'],
              jewelryMaterials: [s.jewelry_material],
              anatomyNote: 'Requires assessment prior to piercing',
              painLevelDescription: 'Brief pinch followed by mild pressure.'
            }
          };
        });
        setPiercingsList(mapped);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const filteredPiercings = piercingsList.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.placement.toLowerCase().includes(q) ||
      p.jewelryInfo.toLowerCase().includes(q) ||
      p.healingPeriod.toLowerCase().includes(q)
    );
    return matchesCat && matchesSearch;
  });

  const handleDiagramSelect = (id: string) => {
    setHighlightedPiercingId(id);
    const p = PIERCINGS.find(item => item.id === id);
    if (p) {
      onViewDetails(p);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title & Introduction */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E9E9E7]">
        <div className="max-w-2xl">
          <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
            Studio Piercing Catalog
          </span>
          <h1 className="font-['Syne',sans-serif] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight mt-1">
            Piercing Services & Placements
          </h1>
          <p className="text-sm text-[#777777] mt-2 leading-relaxed">
            Browse our studio-supported ear, facial, and body placements. All starting prices include implant-grade titanium jewelry and medical sterilization.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#E9E9E7] rounded-xl self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[#111111] text-white shadow-2xs'
                : 'text-[#777777] hover:text-[#111111]'
            }`}
          >
            Catalog Grid
          </button>
          <button
            onClick={() => setViewMode('diagram')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              viewMode === 'diagram'
                ? 'bg-[#111111] text-white shadow-2xs'
                : 'text-[#777777] hover:text-[#111111]'
            }`}
          >
            Anatomy Map
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {PIERCING_CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
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

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search piercings (e.g. helix, septum)..."
              className="w-full bg-white border border-[#E9E9E7] rounded-xl px-4 py-2.5 pl-9 text-xs text-[#111111] placeholder:text-[#777777]/60 focus:border-[#111111] focus:bg-white outline-hidden transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-[#777777] absolute left-3 top-3 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-[10px] text-[#777777] hover:text-[#111111]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="text-xs text-[#777777] flex items-center justify-between">
          <span>Showing {filteredPiercings.length} of {PIERCINGS.length} studio services</span>
          <span className="hidden sm:inline">Individual healing varies by anatomy</span>
        </div>
      </div>

      {/* Anatomy Diagram View Mode */}
      {viewMode === 'diagram' && (
        <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-10">
          <div className="max-w-xl mx-auto text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
              Interactive Placement Visualizer
            </span>
            <h2 className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111] mt-1">
              Ear Cartilage & Lobe Anatomy
            </h2>
            <p className="text-xs text-[#777777] mt-1">
              Click any circular node on the ear diagram below to open the complete medical breakdown, jewelry recommendations, and booking options.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <EarDiagram
              activePiercingId={highlightedPiercingId}
              onSelectPiercing={handleDiagramSelect}
              size="lg"
            />
          </div>
        </div>
      )}

      {/* Main Grid View */}
      {viewMode === 'grid' && (
        <>
          {filteredPiercings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPiercings.map(piercing => (
                <PiercingCard
                  key={piercing.id}
                  piercing={piercing}
                  onViewDetails={onViewDetails}
                  onCheckAvailability={onBookPiercing}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-[#E9E9E7] rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-[#FAFAF7] border border-[#E9E9E7] flex items-center justify-center text-[#777777] mx-auto mb-3">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-['Syne',sans-serif] text-lg font-bold text-[#111111]">
                No results found. Try another search.
              </h3>
              <p className="text-xs text-[#777777] mt-1 max-w-sm mx-auto">
                No piercing matches "{searchQuery}". Check your spelling or browse all services.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 text-xs font-semibold text-[#A63D40] hover:underline"
              >
                Reset catalog filters
              </button>
            </div>
          )}
        </>
      )}

      {/* Centralized Pricing Disclaimer */}
      <div className="p-4 bg-[#FAFAF7] border border-[#E9E9E7] rounded-xl text-xs text-[#777777] flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-[#A63D40] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Prices shown are sample base studio rates that include the piercing procedure and basic implant-grade titanium jewelry. Custom ornamental solid gold tops, clustered genuine gems, and specialized anatomy jewelry may incur additional charges discussed upfront before procedure.
        </p>
      </div>
    </div>
  );
};
