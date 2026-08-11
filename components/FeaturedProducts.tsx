'use client';

import { ArrowRight, Sparkles, Check, Heart, ShieldCheck } from 'lucide-react';
import { PRODUCTS, ProductItem } from '@/lib/data';
import { formatAED } from '@/lib/utils';

interface FeaturedProductsProps {
  onNavigate: (sectionId: string) => void;
  onSelectProductForQuote: (productType: 'pin' | 'magnet' | 'mirror') => void;
}

export function FeaturedProducts({ onNavigate, onSelectProductForQuote }: FeaturedProductsProps) {
  return (
    <section id="featured" className="py-16 lg:py-24 bg-[#FDFBF7] border-b border-[#EAE2D5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-2 block">
            Featured Keepsakes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#362C2B] tracking-tight mb-4">
            Made to Remember
          </h2>
          <p className="text-base sm:text-lg text-[#5C4D4A] leading-relaxed">
            From meaningful memories to special celebrations, we turn your favorite designs into little keepsakes you&apos;ll love to carry, display, or share.
          </p>
        </div>

        {/* Product Grid - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-[#EAE2D5] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Product Image Header */}
                <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden mb-6 bg-[#FAF7F2]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-2xs ${product.badgeColor}`}>
                    {product.emoji} {product.type.toUpperCase()}
                  </div>

                  {/* Starting Price Pill */}
                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-semibold">
                    From {formatAED(product.basePriceAED)}
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-serif text-2xl font-bold text-[#362C2B] mb-2 flex items-center">
                  <span className="mr-2">{product.emoji}</span>
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-[#C86D51] mb-3">
                  {product.headline}
                </p>
                <p className="text-sm text-[#5C4D4A] leading-relaxed mb-6">
                  {product.tagline}
                </p>

                {/* Available Shapes & Features */}
                <div className="space-y-2 mb-6 text-xs text-[#4A3E3D] bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EAE2D5]/80">
                  <div className="flex justify-between font-medium">
                    <span className="text-[#8C7A78]">Available Shapes:</span>
                    <span className="font-bold text-[#362C2B]">Round • Square</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-[#8C7A78]">Quality:</span>
                    <span className="font-bold text-[#362C2B]">High-Gloss Water-Resistant</span>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-2">
                <button
                  onClick={() => onSelectProductForQuote(product.type)}
                  className="w-full py-3 px-4 bg-[#F3ECE2] hover:bg-[#C86D51] text-[#362C2B] hover:text-white font-semibold rounded-2xl transition-colors duration-200 flex items-center justify-center space-x-2 min-h-[44px] shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C86D51]"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>Customize {product.type.toUpperCase()}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Products CTA */}
        <div className="text-center mb-16">
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-[#C86D51] hover:bg-[#B25C42] rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C86D51] min-h-[48px]"
          >
            Explore All Products
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </button>
        </div>

        {/* Planning an Event Banner Highlight (As requested in key requirements) */}
        <div className="bg-gradient-to-r from-[#362C2B] to-[#4A3E3D] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#C86D51]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 text-left">
              <span className="inline-block px-3.5 py-1 bg-[#C86D51] text-white text-xs font-extrabold uppercase tracking-widest rounded-full mb-4">
                Corporate & Events Spotlight
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
                Planning an Event?
              </h3>
              <p className="text-base sm:text-lg text-[#EAE2D5] leading-relaxed max-w-2xl mb-6">
                Make your event unforgettable with customized keepsakes your guests will actually want to take home. Perfect for sports meets, corporate brand merchandise, weddings, and exhibitions.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-white">
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">📌 Custom Pins</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">🧲 Photo Magnets</span>
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">🪞 Pocket Mirrors</span>
                <span className="bg-[#C86D51] px-3 py-1.5 rounded-lg font-bold">Bulk & Custom Orders Available</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
              <button
                onClick={() => onNavigate('corporate')}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-[#FAF7F2] text-[#362C2B] font-bold text-base rounded-full shadow-lg hover:shadow-xl transition-all duration-200 min-h-[48px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Request a Corporate Quote
                <ArrowRight className="w-5 h-5 ml-2 text-[#C86D51]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
