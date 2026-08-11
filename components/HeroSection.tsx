'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, Shield, Award, Heart, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenStudio: () => void;
}

export function HeroSection({ onNavigate, onOpenStudio }: HeroSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<'pin' | 'magnet' | 'mirror'>('pin');
  const [selectedShape, setSelectedShape] = useState<'Round' | 'Square'>('Round');

  return (
    <section id="hero" className="relative bg-[#FAF7F2] pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-[#EAE2D5]/60">
      
      {/* Background Decorative Texture Elements */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#C86D51_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subheading, CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center space-x-2 bg-[#F3ECE2] border border-[#EAE2D5] px-3.5 py-1.5 rounded-full w-fit mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#C86D51] animate-pulse" />
              <span className="text-xs font-semibold text-[#4A3E3D] tracking-wide uppercase">
                Crafted in UAE • Custom Keepsakes & Bulk Merchandise
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#362C2B] leading-[1.12] tracking-tight mb-6">
              Turn Your Memories Into Something You Can <span className="italic font-serif font-normal text-[#C86D51] underline decoration-[#EAE2D5] decoration-wavy underline-offset-8">Keep</span>.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-[#5C4D4A] max-w-2xl leading-relaxed mb-8 font-normal">
              Personalized pins, magnets, and mirrors made from your favorite photos, artwork, logos, and special moments.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-10">
              <button
                onClick={() => onNavigate('shop')}
                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white bg-[#C86D51] hover:bg-[#B25C42] active:bg-[#9E4D36] rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C86D51] focus-visible:ring-offset-2 min-h-[48px]"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </button>

              <button
                onClick={() => onNavigate('custom-orders')}
                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-[#362C2B] bg-[#F3ECE2] hover:bg-[#EAE2D5] border border-[#EAE2D5] rounded-full shadow-2xs hover:shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C86D51] focus-visible:ring-offset-2 min-h-[48px]"
              >
                <Sparkles className="w-5 h-5 mr-2 text-[#C86D51]" aria-hidden="true" />
                Create Your Custom Piece
              </button>
            </div>

            {/* Feature Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#EAE2D5]">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-[#F3ECE2] rounded-lg text-[#C86D51]">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[#4A3E3D]">No Min Order Required</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-[#F3ECE2] rounded-lg text-[#C86D51]">
                  <Award className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[#4A3E3D]">Glossy Photo Clarity</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-[#F3ECE2] rounded-lg text-[#C86D51]">
                  <Heart className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[#4A3E3D]">Bulk Discounts Available</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Product Showcase Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Container Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE2D5] shadow-xl relative overflow-hidden">
              
              {/* Product Type Switcher Tabs */}
              <div className="flex p-1 bg-[#F3ECE2] rounded-2xl mb-6">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod.type)}
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C86D51] ${
                      selectedProduct === prod.type
                        ? 'bg-white text-[#C86D51] shadow-sm font-bold'
                        : 'text-[#5C4D4A] hover:text-[#362C2B]'
                    }`}
                  >
                    <span>{prod.emoji}</span>
                    <span className="capitalize">{prod.type}s</span>
                  </button>
                ))}
              </div>

              {/* Shape Switcher */}
              <div className="flex items-center justify-between mb-6 px-2">
                <span className="text-xs font-medium uppercase tracking-wider text-[#8C7A78]">
                  Select Shape
                </span>
                <div className="inline-flex rounded-lg bg-[#FAF7F2] p-1 border border-[#EAE2D5]">
                  <button
                    onClick={() => setSelectedShape('Round')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      selectedShape === 'Round'
                        ? 'bg-[#C86D51] text-white shadow-2xs'
                        : 'text-[#5C4D4A] hover:text-[#362C2B]'
                    }`}
                  >
                    Round 🟢
                  </button>
                  <button
                    onClick={() => setSelectedShape('Square')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      selectedShape === 'Square'
                        ? 'bg-[#C86D51] text-white shadow-2xs'
                        : 'text-[#5C4D4A] hover:text-[#362C2B]'
                    }`}
                  >
                    Square ⬛
                  </button>
                </div>
              </div>

              {/* Dynamic 3D/Glossy Product Visual Representation */}
              <div className="relative aspect-square w-full max-w-[320px] mx-auto flex items-center justify-center my-2 p-6 bg-gradient-to-br from-[#FAF7F2] to-[#F3ECE2] rounded-2xl border border-[#EAE2D5]/80 shadow-inner group">
                
                {/* Physical Product Replica Graphic */}
                <div 
                  className={`relative transition-all duration-300 transform group-hover:scale-105 ${
                    selectedShape === 'Round' ? 'rounded-full' : 'rounded-2xl'
                  } w-52 h-52 bg-white shadow-2xl border-4 border-[#EAE2D5] flex flex-col items-center justify-center p-4 overflow-hidden text-center cursor-pointer`}
                  onClick={onOpenStudio}
                  title="Click to customize in Design Studio"
                >
                  {/* Glossy Reflection Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-white/10 pointer-events-none" />

                  {/* Sample Photo Art */}
                  <img
                    src={
                      selectedProduct === 'pin'
                        ? 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop'
                        : selectedProduct === 'magnet'
                        ? 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400&auto=format&fit=crop'
                        : 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop'
                    }
                    alt={`Custom ${selectedShape} ${selectedProduct}`}
                    className="w-full h-full object-cover rounded-inherit"
                    referrerPolicy="no-referrer"
                  />

                  {/* Keepsake Type Overlay Badge */}
                  <div className="absolute bottom-2 inset-x-2 bg-black/60 backdrop-blur-xs text-white py-1 px-2 text-[10px] font-bold rounded-full uppercase tracking-wider text-center">
                    {selectedShape} {selectedProduct.toUpperCase()}
                  </div>
                </div>

                {/* Backing Badge Indicator */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#362C2B] border border-[#EAE2D5] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-2xs">
                  {selectedProduct === 'pin' && '🛡️ Metal Safety Pin Backing'}
                  {selectedProduct === 'magnet' && '🧲 Strong Rubber Magnet'}
                  {selectedProduct === 'mirror' && '🪞 Crystal Clear Glass Back'}
                </div>

              </div>

              {/* Quick Launch Studio Link */}
              <div className="text-center mt-4">
                <button
                  onClick={onOpenStudio}
                  className="inline-flex items-center text-xs font-bold text-[#C86D51] hover:text-[#B25C42] underline underline-offset-4 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
                  Try your photo on this {selectedProduct} live →
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
