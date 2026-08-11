'use client';

import { useState } from 'react';
import { FAQS } from '@/lib/data';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<string | null>('f1');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Customization', 'Ordering & Pricing', 'File Requirements', 'Delivery & Timing'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Generate FAQPage JSON-LD schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faqs" className="py-16 lg:py-24 bg-[#FDFBF7] border-b border-[#EAE2D5]/60">
      
      {/* Schema Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-2 block">
            Got Questions? We Have Answers.
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#362C2B] tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-[#5C4D4A]">
            Everything you need to know about customizing your pins, magnets, and mirrors.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8C7A78]" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. bulk, delivery, file formats)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-[#EAE2D5] focus:outline-none focus:ring-2 focus:ring-[#C86D51] text-sm text-[#362C2B] shadow-2xs"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[36px] ${
                activeCategory === cat
                  ? 'bg-[#C86D51] text-white shadow-2xs'
                  : 'bg-white text-[#5C4D4A] hover:bg-[#F3ECE2] border border-[#EAE2D5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#EAE2D5] shadow-2xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 sm:p-6 text-left font-serif font-bold text-lg text-[#362C2B] flex items-center justify-between space-x-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C86D51]"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C86D51] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 pt-0 text-sm text-[#5C4D4A] leading-relaxed border-t border-[#FAF7F2] animate-in fade-in duration-150">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#EAE2D5]">
              <p className="text-sm text-[#8C7A78]">No questions found matching your search criteria.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
