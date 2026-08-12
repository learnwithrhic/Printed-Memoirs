'use client';

import { useState } from 'react';
import { Calculator, Sparkles, ArrowRight, ShieldCheck, HelpCircle, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, PRICING_TIERS } from '@/lib/data';
import { calculateUnitPrice, calculateTotalPrice, formatAED, getTierForQuantity } from '@/lib/utils';

interface PricingSectionProps {
  onNavigate: (sectionId: string) => void;
  onSelectProductForQuote: (productType: 'pin' | 'magnet' | 'mirror' | 'collage', shape?: string, quantity?: number) => void;
}

export function PricingSection({ onNavigate, onSelectProductForQuote }: PricingSectionProps) {
  const [calcProduct, setCalcProduct] = useState<'pin' | 'magnet' | 'mirror' | 'collage'>('pin');
  const [calcShape, setCalcShape] = useState<string>('65mm Round');
  const [calcQuantity, setCalcQuantity] = useState<number>(25);

  const currentProduct = PRODUCTS.find((p) => p.type === calcProduct) || PRODUCTS[0];
  const unitPrice = calculateUnitPrice(calcProduct, calcQuantity, calcShape);
  const totalPrice = calculateTotalPrice(calcProduct, calcQuantity, calcShape);
  const basePrice = currentProduct.basePriceAED;
  const standardTotal = basePrice * calcQuantity;
  const savings = Math.max(0, standardTotal - totalPrice);
  const activeTier = getTierForQuantity(calcQuantity);

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-[#FDFBF6] border-b border-[#EFE2C2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#777F56] mb-2 block">
            Transparent Pricing & Volume Discounts
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D321F] tracking-tight mb-4">
            Pricing Structure
          </h2>
          <p className="text-base sm:text-lg text-[#4E553D] leading-relaxed">
            We offer fair base rates for single custom pieces and generous quantity discounts for bulk celebrations and corporate events.
          </p>
        </div>

        {/* Pricing Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Standard Products Price Table & Tier Discounts */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Base Product Price Table */}
            <div className="bg-white rounded-3xl border border-[#EFE2C2] p-6 sm:p-8 shadow-2xs">
              <h3 className="font-serif text-2xl font-bold text-[#2D321F] mb-2">
                CUSTOM PRODUCTS
              </h3>
              <p className="text-xs text-[#777F56] mb-6">
                Standard base pricing for 1–9 individual custom keepsakes in UAE Dirhams.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#EFE2C2] bg-[#FDFBF6] text-xs font-bold uppercase text-[#3B4029]">
                      <th className="py-3 px-4 rounded-l-xl">Product</th>
                      <th className="py-3 px-4">Shape</th>
                      <th className="py-3 px-4">Quantity</th>
                      <th className="py-3 px-4 rounded-r-xl text-right">Price (AED)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE2C2]/60 text-sm">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#2D321F]">📌 Custom Pin</td>
                      <td className="py-3 px-4 text-[#4E553D]">Round</td>
                      <td className="py-3 px-4 text-[#4E553D]">1–9 pcs</td>
                      <td className="py-3 px-4 font-bold text-[#2D321F] text-right">AED 15</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#2D321F]">📌 Custom Pin</td>
                      <td className="py-3 px-4 text-[#4E553D]">Square</td>
                      <td className="py-3 px-4 text-[#4E553D]">1–9 pcs</td>
                      <td className="py-3 px-4 font-bold text-[#2D321F] text-right">AED 15</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#2D321F]">🧲 Custom Magnet</td>
                      <td className="py-3 px-4 text-[#4E553D]">Round</td>
                      <td className="py-3 px-4 text-[#4E553D]">1–9 pcs</td>
                      <td className="py-3 px-4 font-bold text-[#2D321F] text-right">AED 18</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#2D321F]">🧲 Custom Magnet</td>
                      <td className="py-3 px-4 text-[#4E553D]">Square</td>
                      <td className="py-3 px-4 text-[#4E553D]">1–9 pcs</td>
                      <td className="py-3 px-4 font-bold text-[#2D321F] text-right">AED 18</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#2D321F]">🪞 Custom Mirror</td>
                      <td className="py-3 px-4 text-[#4E553D]">Round</td>
                      <td className="py-3 px-4 text-[#4E553D]">1–9 pcs</td>
                      <td className="py-3 px-4 font-bold text-[#2D321F] text-right">AED 22</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-[#2D321F]">🪞 Custom Mirror</td>
                      <td className="py-3 px-4 text-[#4E553D]">Square</td>
                      <td className="py-3 px-4 text-[#4E553D]">1–9 pcs</td>
                      <td className="py-3 px-4 font-bold text-[#2D321F] text-right">AED 22</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bulk Orders Tier List */}
            <div className="bg-white rounded-3xl border border-[#EFE2C2] p-6 sm:p-8 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-2xl font-bold text-[#2D321F]">
                  BULK ORDERS & DISCOUNTS
                </h3>
                <span className="bg-[#777F56] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full">
                  Save Up to 40%
                </span>
              </div>
              <p className="text-xs text-[#777F56] mb-6">
                Automatic tiered volume discounts applied at quote request.
              </p>

              <div className="space-y-3">
                {PRICING_TIERS.map((tier) => (
                  <div
                    key={tier.range}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-[#FDFBF6] border border-[#EFE2C2] hover:border-[#777F56] transition-colors"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#2D321F] text-base">{tier.range}</span>
                        <span className="text-xs font-semibold text-[#777F56] bg-white px-2.5 py-0.5 rounded-full border border-[#EFE2C2]">
                          {tier.label}
                        </span>
                      </div>
                      <p className="text-xs text-[#4E553D] mt-1">{tier.note}</p>
                    </div>

                    <div className="mt-2 sm:mt-0 text-left sm:text-right">
                      <span className="text-sm font-extrabold text-[#2D321F]">
                        {tier.discountPercentage > 0 ? `${tier.discountPercentage}% OFF` : 'Base Price'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Event / Large order note */}
              <div className="mt-6 p-4 rounded-2xl bg-[#EFE2C2]/50 border border-[#EFE2C2] flex items-start space-x-3">
                <HelpCircle className="w-5 h-5 text-[#777F56] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs font-medium text-[#3B4029] leading-relaxed">
                  Planning a large event or corporate order? Contact us for a personalized quotation with custom branding options and rush production capabilities.
                </p>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Live Price Estimator Widget */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-gradient-to-br from-[#2D321F] to-[#3B4029] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
                <div className="p-2.5 bg-[#777F56] rounded-2xl">
                  <Calculator className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold">Instant Price Estimator</h3>
                  <p className="text-xs text-[#EFE2C2]">Estimate your custom order in AED</p>
                </div>
              </div>

              {/* Step 1: Product Selector */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#EFE2C2] block mb-2">
                    1. Select Product
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PRODUCTS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setCalcProduct(p.type)}
                        className={`py-2 px-2 text-xs font-bold rounded-xl transition-all ${
                          calcProduct === p.type
                            ? 'bg-[#777F56] text-white shadow-sm'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {p.emoji} {p.type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Shape Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#EFE2C2] block mb-2">
                    2. Select Shape
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCalcShape('Round')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                        calcShape === 'Round'
                          ? 'bg-[#777F56] text-white shadow-sm'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      🟢 Round (58mm)
                    </button>
                    <button
                      onClick={() => setCalcShape('Square')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                        calcShape === 'Square'
                          ? 'bg-[#777F56] text-white shadow-sm'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      ⬛ Square (50mm)
                    </button>
                  </div>
                </div>

                {/* Step 3: Quantity Slider & Counter */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#EFE2C2]">
                      3. Quantity Needed
                    </label>
                    <span className="text-xs font-extrabold bg-[#777F56] text-white px-2.5 py-0.5 rounded-full">
                      {calcQuantity} pcs
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="150"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(parseInt(e.target.value) || 1)}
                    className="w-full accent-[#777F56] bg-white/20 rounded-lg cursor-pointer h-2"
                  />

                  {/* Preset Quick Buttons */}
                  <div className="flex justify-between gap-1 mt-3">
                    {[1, 10, 25, 50, 100].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCalcQuantity(num)}
                        className={`px-2 py-1 text-[11px] font-bold rounded-lg ${
                          calcQuantity === num
                            ? 'bg-white text-[#2D321F]'
                            : 'bg-white/10 text-[#EFE2C2] hover:bg-white/20'
                        }`}
                      >
                        {num} pcs
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Output Summary Box */}
              <div className="bg-white/10 p-5 rounded-2xl border border-white/15 mb-6 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#EFE2C2]">Discount Tier:</span>
                  <span className="font-bold text-white bg-[#777F56]/80 px-2.5 py-0.5 rounded-full">
                    {activeTier.label}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#EFE2C2]">Estimated Rate per Piece:</span>
                  <span className="font-bold text-white">{formatAED(unitPrice)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between items-center text-xs text-[#EFC257]">
                    <span>Bulk Tier Savings:</span>
                    <span className="font-bold">Save {formatAED(savings)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-white/15 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-white">Estimated Total:</span>
                  <span className="text-3xl font-serif font-extrabold text-white">
                    {formatAED(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Pre-fill Quote Button */}
              <button
                onClick={() => onSelectProductForQuote(calcProduct, calcShape, calcQuantity)}
                className="w-full py-3.5 px-4 bg-[#777F56] hover:bg-[#636B45] text-white font-bold rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-[#EFC257]" aria-hidden="true" />
                <span>Request Official Quote ({calcQuantity} pcs)</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
