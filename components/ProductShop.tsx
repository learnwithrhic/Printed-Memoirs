'use client';

import { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Heart, Layers } from 'lucide-react';
import { PRODUCTS, ProductItem } from '@/lib/data';
import { formatAED, calculateUnitPrice } from '@/lib/utils';

interface ProductShopProps {
  onSelectProductForQuote: (productType: 'pin' | 'magnet' | 'mirror' | 'collage', shape?: string) => void;
  onOpenStudio: () => void;
}

export function ProductShop({ onSelectProductForQuote, onOpenStudio }: ProductShopProps) {
  const [selectedShapes, setSelectedShapes] = useState<Record<string, string>>({
    pin: '65mm Round',
    magnet: '65mm Round',
    mirror: '65mm Round',
    collage: '2×3 Grid (6 Pcs)',
  });

  const handleShapeToggle = (productId: string, shape: string) => {
    setSelectedShapes((prev) => ({ ...prev, [productId]: shape }));
  };

  const getGridColsRows = (shapeStr: string) => {
    if (shapeStr.includes('2×3') || shapeStr.includes('2x3')) return { cols: 2, rows: 3 };
    if (shapeStr.includes('3×3') || shapeStr.includes('3x3')) return { cols: 3, rows: 3 };
    if (shapeStr.includes('3×4') || shapeStr.includes('3x4')) return { cols: 3, rows: 4 };
    if (shapeStr.includes('4×4') || shapeStr.includes('4x4')) return { cols: 4, rows: 4 };
    return { cols: 2, rows: 3 };
  };

  return (
    <section id="shop" className="py-16 lg:py-24 bg-[#FDFBF6] border-b border-[#EFE2C2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#777F56] mb-2 block">
            Our Catalog & Product Specifications
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D321F] tracking-tight mb-4">
            Custom Shapes & Exact Dimensions
          </h2>
          <p className="text-base sm:text-lg text-[#4E553D] leading-relaxed">
            Crafted with precision. Explore 65mm round pins & mirrors, 58mm/50mm square magnets, and multi-piece photo puzzle collages.
          </p>
        </div>

        {/* Detailed Product Showcase Sections */}
        <div className="space-y-16">
          {PRODUCTS.map((product, idx) => {
            const currentShape = selectedShapes[product.id] || product.shapes[0];
            const unitPrice = calculateUnitPrice(product.type, 1, currentShape);
            const isEven = idx % 2 === 0;
            const isCollage = product.type === 'collage';
            const isSquare58 = currentShape.includes('58mm');
            const isSquare50 = currentShape.includes('50mm Square');
            const isRound = currentShape.includes('Round');

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#EFE2C2] shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12 transition-all hover:shadow-md"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}>
                  
                  {/* Left Column: Interactive Product Visual & Shape Selector */}
                  <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-2'}`}>
                    <div className="bg-gradient-to-br from-[#FDFBF6] to-[#EFE2C2]/40 p-8 rounded-3xl border border-[#EFE2C2] text-center relative flex flex-col items-center">
                      
                      {/* Product Visual Container */}
                      <div className="relative w-full aspect-square max-w-[280px] my-4 flex items-center justify-center">
                        {isCollage ? (
                          /* Interactive Collage Puzzle Visual Grid */
                          (() => {
                            const { cols, rows } = getGridColsRows(currentShape);
                            return (
                              <div 
                                className="relative w-56 h-56 bg-white shadow-xl border-4 border-[#EFE2C2] overflow-hidden grid gap-1 p-1 bg-[#777F56]/10 rounded-xl"
                                style={{
                                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                                  gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                                }}
                              >
                                {Array.from({ length: cols * rows }).map((_, i) => {
                                  const colIdx = i % cols;
                                  const rowIdx = Math.floor(i / cols);
                                  return (
                                    <div
                                      key={i}
                                      className="relative overflow-hidden rounded-xs border border-white/60 shadow-2xs group"
                                    >
                                      <img
                                        src={product.image}
                                        alt={`Piece ${i + 1}`}
                                        className="absolute w-56 h-56 max-w-none object-cover"
                                        style={{
                                          left: `-${colIdx * (224 / cols)}px`,
                                          top: `-${rowIdx * (224 / rows)}px`,
                                        }}
                                        referrerPolicy="no-referrer"
                                      />
                                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })()
                        ) : (
                          /* Standard Single Item Visual */
                          <div className={`relative transition-all duration-300 w-56 h-56 bg-white shadow-xl border-4 border-[#EFE2C2] overflow-hidden flex items-center justify-center ${
                            isRound ? 'rounded-full' : isSquare58 ? 'rounded-3xl' : 'rounded-md'
                          }`}>
                            <img
                              src={product.image}
                              alt={`${product.name} ${currentShape}`}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-white/10 pointer-events-none" />
                          </div>
                        )}
                        
                        {/* Shape Indicator Badge */}
                        <div className="absolute bottom-2 bg-black/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {currentShape}
                        </div>
                      </div>

                      {/* Interactive Size/Shape Picker Switcher */}
                      <div className="w-full mt-4">
                        <p className="text-xs font-bold text-[#777F56] uppercase tracking-wider mb-2">
                          Available Specs & Dimensions:
                        </p>
                        <div className={`grid gap-1.5 bg-white p-2 rounded-2xl border border-[#EFE2C2] ${
                          product.shapes.length > 2 ? 'grid-cols-1 sm:grid-cols-1' : 'grid-cols-1'
                        }`}>
                          {product.shapes.map((shape) => (
                            <button
                              key={shape}
                              onClick={() => handleShapeToggle(product.id, shape)}
                              className={`py-2 px-3 text-xs font-bold rounded-xl transition-all duration-150 text-left flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777F56] ${
                                currentShape === shape
                                  ? 'bg-[#777F56] text-white shadow-2xs'
                                  : 'text-[#4E553D] hover:bg-[#FDFBF6]'
                              }`}
                            >
                              <span>{shape}</span>
                              <Check className={`w-3.5 h-3.5 ${currentShape === shape ? 'opacity-100' : 'opacity-0'}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Try in Design Studio Button */}
                      <button
                        onClick={onOpenStudio}
                        className="mt-4 text-xs font-bold text-[#777F56] hover:text-[#636B45] flex items-center justify-center cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 mr-1 text-[#EFC257]" aria-hidden="true" />
                        Preview in Interactive Studio →
                      </button>

                    </div>
                  </div>

                  {/* Right Column: Copywriting & Specifications */}
                  <div className={`lg:col-span-7 flex flex-col ${isEven ? '' : 'lg:order-1'}`}>
                    
                    {/* Category Title */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-2xl">{product.emoji}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#777F56] bg-[#EFE2C2]/50 px-3 py-1 rounded-full border border-[#EFE2C2]">
                        {product.name}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D321F] mb-3">
                      {product.headline}
                    </h3>

                    <p className="text-base text-[#4E553D] leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Perfect For List */}
                    <div className="mb-8 bg-[#FDFBF6] p-5 rounded-2xl border border-[#EFE2C2]">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D321F] mb-3">
                        Ideal Uses & Applications:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {product.perfectFor.map((item, i) => (
                          <div key={i} className="flex items-center text-xs font-medium text-[#3B4029]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#777F56] mr-2.5 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 border-t border-[#EFE2C2] gap-4">
                      <div>
                        <span className="text-xs text-[#777F56] block font-medium">
                          {isCollage ? 'Selected Grid Pricing' : 'Standard Pricing'}
                        </span>
                        <span className="text-2xl font-serif font-bold text-[#2D321F]">
                          {formatAED(unitPrice)} <span className="text-xs font-normal text-[#4E553D]">{isCollage ? '/ grid set' : '/ piece'}</span>
                        </span>
                        <span className="text-[11px] text-[#777F56] font-semibold block">
                          Tiered bulk discounts available up to 40% off
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectProductForQuote(product.type, currentShape)}
                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-[#777F56] hover:bg-[#636B45] rounded-full shadow-sm hover:shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777F56] focus-visible:ring-offset-2 min-h-[44px]"
                      >
                        <Sparkles className="w-4 h-4 mr-2 text-[#EFC257]" aria-hidden="true" />
                        {product.type === 'pin' && 'Order 65mm Round Pin'}
                        {product.type === 'magnet' && 'Customize Magnet'}
                        {product.type === 'mirror' && 'Order 65mm Round Mirror'}
                        {product.type === 'collage' && 'Customize Collage Set'}
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
