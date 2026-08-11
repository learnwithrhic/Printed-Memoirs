'use client';

import { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Heart, Layers } from 'lucide-react';
import { PRODUCTS, ProductItem } from '@/lib/data';
import { formatAED, calculateUnitPrice } from '@/lib/utils';

interface ProductShopProps {
  onSelectProductForQuote: (productType: 'pin' | 'magnet' | 'mirror', shape?: 'Round' | 'Square') => void;
  onOpenStudio: () => void;
}

export function ProductShop({ onSelectProductForQuote, onOpenStudio }: ProductShopProps) {
  const [selectedShapes, setSelectedShapes] = useState<Record<string, 'Round' | 'Square'>>({
    pin: 'Round',
    magnet: 'Square',
    mirror: 'Round',
  });

  const handleShapeToggle = (productId: string, shape: 'Round' | 'Square') => {
    setSelectedShapes((prev) => ({ ...prev, [productId]: shape }));
  };

  return (
    <section id="shop" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#EAE2D5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-2 block">
            Our Catalog & Keepsake Options
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#362C2B] tracking-tight mb-4">
            Small Keepsakes. Big Memories.
          </h2>
          <p className="text-base sm:text-lg text-[#5C4D4A] leading-relaxed">
            Choose from custom pins, photo magnets, and personalized pocket mirrors in both Round and Square shapes.
          </p>
        </div>

        {/* Detailed Product Showcase Sections */}
        <div className="space-y-16">
          {PRODUCTS.map((product, idx) => {
            const currentShape = selectedShapes[product.id] || 'Round';
            const unitPrice = calculateUnitPrice(product.type, 1);
            const isEven = idx % 2 === 0;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#EAE2D5] shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12 transition-all hover:shadow-md"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}>
                  
                  {/* Left Column: Interactive Product Visual & Shape Selector */}
                  <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-2'}`}>
                    <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F3ECE2] p-8 rounded-3xl border border-[#EAE2D5] text-center relative flex flex-col items-center">
                      
                      {/* Product Visual Container */}
                      <div className="relative w-full aspect-square max-w-[280px] my-4 flex items-center justify-center">
                        <div className={`relative transition-all duration-300 w-56 h-56 bg-white shadow-xl border-4 border-[#EAE2D5] overflow-hidden flex items-center justify-center ${
                          currentShape === 'Round' ? 'rounded-full' : 'rounded-3xl'
                        }`}>
                          <img
                            src={product.image}
                            alt={`${product.name} ${currentShape}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-white/10 pointer-events-none" />
                        </div>
                        
                        {/* Shape Indicator Badge */}
                        <div className="absolute bottom-2 bg-black/75 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {currentShape} {product.type.toUpperCase()}
                        </div>
                      </div>

                      {/* Interactive Shape Picker Switcher */}
                      <div className="w-full mt-4">
                        <p className="text-xs font-bold text-[#8C7A78] uppercase tracking-wider mb-2">
                          Available Shapes:
                        </p>
                        <div className="grid grid-cols-2 gap-2 bg-white p-1.5 rounded-2xl border border-[#EAE2D5]">
                          {product.shapes.map((shape) => (
                            <button
                              key={shape}
                              onClick={() => handleShapeToggle(product.id, shape)}
                              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C86D51] ${
                                currentShape === shape
                                  ? 'bg-[#C86D51] text-white shadow-2xs'
                                  : 'text-[#5C4D4A] hover:bg-[#FAF7F2]'
                              }`}
                            >
                              {shape === 'Round' ? '🟢 Round (58mm)' : '⬛ Square (50mm)'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Try in Design Studio Button */}
                      <button
                        onClick={onOpenStudio}
                        className="mt-4 text-xs font-bold text-[#C86D51] hover:text-[#B25C42] flex items-center justify-center cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
                        Test your design in 3D simulator →
                      </button>

                    </div>
                  </div>

                  {/* Right Column: Copywriting & Specifications */}
                  <div className={`lg:col-span-7 flex flex-col ${isEven ? '' : 'lg:order-1'}`}>
                    
                    {/* Category Title */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-2xl">{product.emoji}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51] bg-[#F3ECE2] px-3 py-1 rounded-full border border-[#EAE2D5]">
                        {product.name}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#362C2B] mb-3">
                      {product.headline}
                    </h3>

                    <p className="text-base text-[#5C4D4A] leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Perfect For List */}
                    <div className="mb-8 bg-[#FAF7F2] p-5 rounded-2xl border border-[#EAE2D5]">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#362C2B] mb-3">
                        Perfect For:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {product.perfectFor.map((item, i) => (
                          <div key={i} className="flex items-center text-xs font-medium text-[#4A3E3D]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51] mr-2.5 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 border-t border-[#EAE2D5] gap-4">
                      <div>
                        <span className="text-xs text-[#8C7A78] block font-medium">Standard Pricing</span>
                        <span className="text-2xl font-serif font-bold text-[#362C2B]">
                          {formatAED(unitPrice)} <span className="text-xs font-normal text-[#5C4D4A]">/ piece</span>
                        </span>
                        <span className="text-[11px] text-[#C86D51] font-semibold block">
                          Bulk discounts up to 40% off for 10+ pcs
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectProductForQuote(product.type, currentShape)}
                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-[#C86D51] hover:bg-[#B25C42] rounded-full shadow-sm hover:shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C86D51] focus-visible:ring-offset-2 min-h-[44px]"
                      >
                        <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                        {product.type === 'pin' && 'Get a Quote'}
                        {product.type === 'magnet' && 'Customize Your Magnet'}
                        {product.type === 'mirror' && 'Create Your Mirror'}
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
