'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, Shield, Award, Heart, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenStudio: () => void;
}

export function HeroSection({ onNavigate, onOpenStudio }: HeroSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<'pin' | 'magnet' | 'mirror' | 'collage'>('pin');
  const [selectedShape, setSelectedShape] = useState<string>('65mm Round');

  return (
    <section id="hero" className="relative bg-[#FDFBF6] pt-8 pb-16 lg:pt-12 lg:pb-24 overflow-hidden border-b border-[#EFE2C2]/60">
      
      {/* Background Decorative Texture Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#777F56_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subheading, CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left">
            
            {/* Top Pill Tag */}
            <div className="inline-flex items-center space-x-2 bg-[#EFE2C2]/50 border border-[#EFE2C2] px-3.5 py-1.5 rounded-full w-fit mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#777F56] animate-pulse" />
              <span className="text-xs font-semibold text-[#3B4029] tracking-wide uppercase">
                Crafted in UAE • Custom Keepsakes & Bulk Merchandise
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2D321F] leading-[1.12] tracking-tight mb-6">
              Turn Your Memories Into Something You Can <span className="italic font-serif font-normal text-[#777F56] underline decoration-[#EFE2C2] decoration-wavy underline-offset-8">Keep</span>.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-[#4E553D] max-w-2xl leading-relaxed mb-8 font-normal">
              Personalized pins, magnets, and mirrors made from your favorite photos, artwork, logos, and special moments.
            </p>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-10">
              <button
                onClick={() => onNavigate('shop')}
                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white bg-[#777F56] hover:bg-[#636B45] active:bg-[#4E5535] rounded-full shadow-md hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777F56] focus-visible:ring-offset-2 min-h-[48px]"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2 text-[#EFC257]" aria-hidden="true" />
              </button>

              <button
                onClick={() => onNavigate('custom-orders')}
                className="inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-[#2D321F] bg-[#EFE2C2]/60 hover:bg-[#EFE2C2] border border-[#EFE2C2] rounded-full shadow-2xs hover:shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777F56] focus-visible:ring-offset-2 min-h-[48px]"
              >
                <Sparkles className="w-5 h-5 mr-2 text-[#777F56]" aria-hidden="true" />
                Create Your Custom Piece
              </button>
            </div>

            {/* Feature Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#EFE2C2]">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-[#EFE2C2]/50 rounded-lg text-[#777F56]">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[#3B4029]">No Min Order Required</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-[#EFE2C2]/50 rounded-lg text-[#777F56]">
                  <Award className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[#3B4029]">Glossy Photo Clarity</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-[#EFE2C2]/50 rounded-lg text-[#777F56]">
                  <Heart className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-xs font-semibold text-[#3B4029]">Bulk Discounts Available</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Product Showcase Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Visual Container Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EFE2C2] shadow-xl relative overflow-hidden">
              
              {/* Product Type Switcher Tabs */}
              <div className="flex p-1 bg-[#EFE2C2]/50 rounded-2xl mb-6">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod.type)}
                    className={`flex-1 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777F56] ${
                      selectedProduct === prod.type
                        ? 'bg-white text-[#777F56] shadow-sm font-bold'
                        : 'text-[#4E553D] hover:text-[#2D321F]'
                    }`}
                  >
                    <span>{prod.emoji}</span>
                    <span className="capitalize">{prod.type}s</span>
                  </button>
                ))}
              </div>

              {/* Shape Switcher */}
              <div className="flex items-center justify-between mb-6 px-2">
                <span className="text-xs font-medium uppercase tracking-wider text-[#777F56]">
                  Select Specification
                </span>
                <div className="inline-flex rounded-lg bg-[#FDFBF6] p-1 border border-[#EFE2C2]">
                  <button
                    onClick={() => setSelectedShape('65mm Round')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      selectedShape.includes('Round')
                        ? 'bg-[#777F56] text-white shadow-2xs'
                        : 'text-[#4E553D] hover:text-[#2D321F]'
                    }`}
                  >
                    Round 🟢
                  </button>
                  <button
                    onClick={() => setSelectedShape('Square')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      selectedShape.includes('Square') || selectedShape.includes('Grid')
                        ? 'bg-[#777F56] text-white shadow-2xs'
                        : 'text-[#4E553D] hover:text-[#2D321F]'
                    }`}
                  >
                    Square / Grid 🧩
                  </button>
                </div>
              </div>

              {/* Dynamic 3D/Glossy Product Visual Representation */}
              <div className="relative aspect-square w-full max-w-[320px] mx-auto flex items-center justify-center my-2 p-6 bg-gradient-to-br from-[#FDFBF6] to-[#EFE2C2]/40 rounded-2xl border border-[#EFE2C2]/80 shadow-inner group">
                
                {/* Physical Product Replica Graphic */}
                <div 
                  className={`relative transition-all duration-300 transform group-hover:scale-105 ${
                    selectedShape.includes('Round') ? 'rounded-full' : 'rounded-2xl'
                  } w-52 h-52 bg-white shadow-2xl border-4 border-[#EFE2C2] flex flex-col items-center justify-center p-4 overflow-hidden text-center cursor-pointer`}
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
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#2D321F] border border-[#EFE2C2] text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-2xs">
                  {selectedProduct === 'pin' && '🛡️ Metal Safety Pin Backing'}
                  {selectedProduct === 'magnet' && '🧲 Strong Rubber Magnet'}
                  {selectedProduct === 'mirror' && '🪞 Crystal Clear Glass Back'}
                  {selectedProduct === 'collage' && '🧩 Multi-Piece Magnet Set'}
                </div>

              </div>

              {/* Quick Launch Studio Link */}
              <div className="text-center mt-4">
                <button
                  onClick={onOpenStudio}
                  className="inline-flex items-center text-xs font-bold text-[#777F56] hover:text-[#636B45] underline underline-offset-4 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1 text-[#EFC257]" aria-hidden="true" />
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
