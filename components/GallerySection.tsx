'use client';

import { useState } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '@/lib/data';
import { Sparkles, Eye, X } from 'lucide-react';

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Pins', 'Magnets', 'Mirrors', 'Events', 'Corporate'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#EAE2D5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-2 block">
            Client Showcase
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#362C2B] tracking-tight mb-4">
            MEMORIES WE&apos;VE MADE
          </h2>
          <p className="text-base sm:text-lg text-[#5C4D4A] leading-relaxed">
            Every design has a story. Take a look at some of the personalized pieces we&apos;ve created for weddings, brand events, family celebrations, and everyday moments.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C86D51] ${
                selectedCategory === cat
                  ? 'bg-[#C86D51] text-white shadow-sm'
                  : 'bg-white text-[#5C4D4A] hover:bg-[#F3ECE2] border border-[#EAE2D5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="bg-white rounded-3xl border border-[#EAE2D5] overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="relative aspect-4/3 w-full bg-[#FAF7F2] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.shape} {item.type}
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="p-3 bg-[#C86D51] rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-5 h-5" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C86D51] block mb-1">
                  {item.category} • {item.client}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#362C2B] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5C4D4A] line-clamp-2">
                  {item.story}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveItem(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 text-[#4A3E3D] hover:bg-[#F3ECE2] rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>

              <div className="aspect-16/9 w-full rounded-2xl overflow-hidden mb-6 bg-[#FAF7F2]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51] block mb-1">
                {activeItem.category} • {activeItem.client}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#362C2B] mb-3">
                {activeItem.title}
              </h3>
              <p className="text-sm text-[#5C4D4A] leading-relaxed mb-4">
                {activeItem.story}
              </p>

              <div className="inline-block bg-[#FAF7F2] px-4 py-2 rounded-xl border border-[#EAE2D5] text-xs font-semibold text-[#362C2B]">
                Format: {activeItem.shape} {activeItem.type.toUpperCase()}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
