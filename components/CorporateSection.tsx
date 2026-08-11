'use client';

import { Building2, Trophy, PartyPopper, Heart, Gift, School, Tent, Tag, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface CorporateSectionProps {
  onOpenCorporateModal: () => void;
}

export function CorporateSection({ onOpenCorporateModal }: CorporateSectionProps) {
  const useCases = [
    { label: 'Sports Events', emoji: '🏃', icon: Trophy },
    { label: 'Corporate Events', emoji: '🏢', icon: Building2 },
    { label: 'Celebrations', emoji: '🎉', icon: PartyPopper },
    { label: 'Weddings', emoji: '💍', icon: Heart },
    { label: 'Birthdays', emoji: '🎂', icon: Gift },
    { label: 'Schools', emoji: '🏫', icon: School },
    { label: 'Exhibitions', emoji: '🎪', icon: Tent },
    { label: 'Giveaways', emoji: '🎁', icon: Gift },
    { label: 'Brand Merchandise', emoji: '🏷️', icon: Tag },
  ];

  return (
    <section id="corporate" className="py-16 lg:py-24 bg-[#FDFBF7] border-b border-[#EAE2D5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-2 block">
            B2B Bulk & Event Solutions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#362C2B] tracking-tight mb-4">
            MAKE YOUR EVENT MEMORABLE
          </h2>
          <p className="text-base sm:text-lg text-[#5C4D4A] leading-relaxed">
            Looking for something different from ordinary giveaways? Printed Memoirs creates customized pins, magnets, and mirrors for events, brands, organizations, and special occasions.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="mb-16">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#8C7A78] text-center mb-8">
            Perfect For
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {useCases.map((item) => (
              <div
                key={item.label}
                className="bg-white p-6 rounded-2xl border border-[#EAE2D5] shadow-2xs hover:shadow-md transition-all flex items-center space-x-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#EAE2D5] flex items-center justify-center text-2xl flex-shrink-0">
                  {item.emoji}
                </div>
                <div>
                  <h4 className="font-bold text-[#362C2B] text-base">{item.label}</h4>
                  <span className="text-xs text-[#8C7A78]">Custom Branded</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* For Brands & Organizations Hero Callout */}
        <div className="bg-[#362C2B] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-2 block">
              For Brands & Organizations
            </span>
            
            <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
              Put your logo on something people will actually want to keep.
            </h3>

            <p className="text-base sm:text-lg text-[#EAE2D5] leading-relaxed mb-8">
              Our customized products can be designed around your brand identity, event theme, campaign, or special occasion. High-definition color rendering, durable metal/glass finishes, and express bulk delivery across the UAE.
            </p>

            <button
              onClick={onOpenCorporateModal}
              className="px-8 py-4 bg-[#C86D51] hover:bg-[#B25C42] text-white font-bold text-base rounded-full shadow-lg transition-all inline-flex items-center justify-center min-h-[48px]"
            >
              <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
              REQUEST A CORPORATE QUOTE
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
