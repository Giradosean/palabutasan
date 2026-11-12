import React, { useState, useEffect } from 'react';
import { FAQItem } from '../types';
import { FAQS, FAQ_CATEGORIES } from '../data/faqs';
import { api } from '../api';
import { Search, ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQAccordionProps {
  initialSearch?: string;
  onContactStudio?: () => void;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  initialSearch = '',
  onContactStudio
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('pain');
  const [faqList, setFaqList] = useState<FAQItem[]>(FAQS);

  useEffect(() => {
    let isMounted = true;
    api.getFAQs().then(serverFaqs => {
      if (!isMounted) return;
      if (serverFaqs && serverFaqs.length > 0) {
        // Merge or replace with server faqs
        const mapped = serverFaqs.map(f => ({
          id: String(f.id),
          question: f.question,
          answer: f.answer,
          category: 'general' as const
        }));
        setFaqList(mapped);
        setOpenId(String(serverFaqs[0].id));
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const filteredFaqs = faqList.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
    );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search Bar & Category Filters */}
      <div className="space-y-4">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. pain, aftercare, jewelry, healing)..."
            className="w-full bg-white border border-[#E9E9E7] rounded-xl px-4 py-3.5 pl-11 text-sm text-[#111111] placeholder:text-[#777777]/60 focus:border-[#111111] focus:bg-white outline-hidden shadow-2xs transition-colors"
          />
          <Search className="w-4 h-4 text-[#777777] absolute left-4 top-4 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-xs text-[#777777] hover:text-[#111111] py-0.5 px-1.5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {FAQ_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
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
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white border border-[#E9E9E7] rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAFAF7]/60 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#A63D40]"
                  aria-expanded={isOpen}
                >
                  <span className="font-['Syne',sans-serif] text-sm sm:text-base font-bold text-[#111111] leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#FAFAF7] border border-[#E9E9E7] flex items-center justify-center text-[#777777] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#A63D40] bg-[#A63D40]/5 border-[#A63D40]/30' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#E9E9E7]/60 text-xs sm:text-sm text-[#777777] leading-relaxed animate-in fade-in duration-150">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white border border-[#E9E9E7] rounded-2xl p-8">
            <div className="w-10 h-10 rounded-full bg-[#FAFAF7] border border-[#E9E9E7] flex items-center justify-center text-[#777777] mx-auto mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="font-['Syne',sans-serif] text-base font-bold text-[#111111]">
              No results found. Try another search.
            </h4>
            <p className="text-xs text-[#777777] mt-1 max-w-sm mx-auto">
              We couldn't find any questions matching "{searchQuery}". You can clear your search or reach out directly.
            </p>
            {onContactStudio && (
              <button
                onClick={onContactStudio}
                className="mt-4 text-xs font-semibold text-[#A63D40] hover:underline"
              >
                Send a question to our piercers →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
