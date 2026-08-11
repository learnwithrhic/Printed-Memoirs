'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ProductShop } from '@/components/ProductShop';
import { PricingSection } from '@/components/PricingSection';
import { CustomOrderWizard } from '@/components/CustomOrderWizard';
import { AboutSection } from '@/components/AboutSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { CorporateSection } from '@/components/CorporateSection';
import { GallerySection } from '@/components/GallerySection';
import { FaqSection } from '@/components/FaqSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { InteractiveStudioModal } from '@/components/InteractiveStudioModal';
import { CorporateQuoteModal } from '@/components/CorporateQuoteModal';
import { QuickQuoteDrawer } from '@/components/QuickQuoteDrawer';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [quoteCount, setQuoteCount] = useState<number>(0);

  // Modals & Drawers state
  const [studioOpen, setStudioOpen] = useState<boolean>(false);
  const [corporateModalOpen, setCorporateModalOpen] = useState<boolean>(false);
  const [quickQuoteDrawerOpen, setQuickQuoteDrawerOpen] = useState<boolean>(false);

  // Custom Order pre-filled state
  const [quoteProduct, setQuoteProduct] = useState<'pin' | 'magnet' | 'mirror' | 'collage'>('pin');
  const [quoteShape, setQuoteShape] = useState<string>('65mm Round');
  const [quoteQuantity, setQuoteQuantity] = useState<number>(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem('printed_memoirs_quotes');
        if (stored) {
          const parsed = JSON.parse(stored);
          setQuoteCount(parsed.length || 0);
        }
      } catch (err) {
        console.error(err);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [studioOpen, quickQuoteDrawerOpen]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectProductForQuote = (
    productType: 'pin' | 'magnet' | 'mirror' | 'collage',
    shape: string = '65mm Round',
    quantity: number = 10
  ) => {
    setQuoteProduct(productType);
    setQuoteShape(shape);
    setQuoteQuantity(quantity);
    handleNavigate('custom-orders');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] font-sans antialiased selection:bg-[#C86D51] selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        quoteCount={quoteCount}
        openQuickQuoteDrawer={() => setQuickQuoteDrawerOpen(true)}
      />

      {/* Main Semantic Landmark */}
      <main id="main-content">
        
        {/* 1. HERO SECTION */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenStudio={() => setStudioOpen(true)}
        />

        {/* 2. FEATURED PRODUCTS SECTION */}
        <FeaturedProducts
          onNavigate={handleNavigate}
          onSelectProductForQuote={handleSelectProductForQuote}
        />

        {/* 3. PRODUCT CATALOG SHOP SECTION */}
        <ProductShop
          onSelectProductForQuote={handleSelectProductForQuote}
          onOpenStudio={() => setStudioOpen(true)}
        />

        {/* 4. PRICING STRUCTURE & BULK CALCULATOR */}
        <PricingSection
          onNavigate={handleNavigate}
          onSelectProductForQuote={handleSelectProductForQuote}
        />

        {/* 5. CUSTOM ORDER WIZARD (5-Step Form) */}
        <CustomOrderWizard
          initialProduct={quoteProduct}
          initialShape={quoteShape}
          initialQuantity={quoteQuantity}
          onOrderSubmitted={() => setQuoteCount((prev) => prev + 1)}
        />

        {/* 6. OUR STORY / ABOUT US */}
        <AboutSection />

        {/* 7. HOW IT WORKS (4 Illustrated Steps) */}
        <HowItWorksSection onNavigate={handleNavigate} />

        {/* 8. CORPORATE & EVENTS PAGE */}
        <CorporateSection
          onOpenCorporateModal={() => setCorporateModalOpen(true)}
        />

        {/* 9. GALLERY (Memories We've Made) */}
        <GallerySection />

        {/* 10. FAQs */}
        <FaqSection />

        {/* 11. CONTACT PAGE */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Modals & Drawers */}
      <InteractiveStudioModal
        isOpen={studioOpen}
        onClose={() => setStudioOpen(false)}
        onSendToQuote={(product, shape, qty) => {
          handleSelectProductForQuote(product, shape, qty);
        }}
      />

      <CorporateQuoteModal
        isOpen={corporateModalOpen}
        onClose={() => setCorporateModalOpen(false)}
      />

      <QuickQuoteDrawer
        isOpen={quickQuoteDrawerOpen}
        onClose={() => setQuickQuoteDrawerOpen(false)}
        onNavigateToOrderForm={() => handleNavigate('custom-orders')}
      />

    </div>
  );
}
