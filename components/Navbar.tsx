'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageSquare, ShoppingBag, ShieldCheck } from 'lucide-react';
import { formatAED } from '@/lib/utils';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  quoteCount: number;
  openQuickQuoteDrawer: () => void;
}

export function Navbar({ activeSection, onNavigate, quoteCount, openQuickQuoteDrawer }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'custom-orders', label: 'Custom Orders' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'story', label: 'Our Story' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'corporate', label: 'Corporate & Events' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#FDFBF6]/95 backdrop-blur-md shadow-sm border-b border-[#EFE2C2]/80 py-3' 
        : 'bg-[#FDFBF6] py-4 border-b border-[#EFE2C2]/50'
    }`}>
      {/* Skip to Main Content Link for WCAG Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#777F56] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
      >
        Skip to Main Content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Tagline */}
          <button 
            onClick={() => handleLinkClick('hero')}
            className="flex flex-col text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777F56] focus-visible:ring-offset-2 rounded-lg p-1 transition-transform active:scale-98"
            aria-label="Printed Memoirs Home"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2D321F] group-hover:text-[#777F56] transition-colors">
              PRINTED MEMOIRS
            </span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase text-[#777F56] font-medium -mt-1">
              Small Keepsakes. Big Memories.
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777F56] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-[#EFE2C2]/70 text-[#777F56] font-semibold'
                      : 'text-[#3B4029] hover:text-[#777F56] hover:bg-[#EFE2C2]/40'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Quote Draft Counter */}
            <button
              onClick={openQuickQuoteDrawer}
              className="relative p-2 text-[#3B4029] hover:text-[#777F56] hover:bg-[#EFE2C2]/40 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777F56]"
              aria-label={`View Quote Draft (${quoteCount} items)`}
              title="View Quote Draft"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              {quoteCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EFC257] text-[#2D321F] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm border border-white">
                  {quoteCount}
                </span>
              )}
            </button>

            {/* CTA Button: Get a Quote */}
            <button
              onClick={() => handleLinkClick('custom-orders')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#777F56] hover:bg-[#636B45] active:bg-[#4E5535] rounded-full shadow-sm hover:shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777F56] focus-visible:ring-offset-2 min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 mr-2 text-[#EFC257]" aria-hidden="true" />
              Get a Quote
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#3B4029] hover:bg-[#EFE2C2]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#777F56] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden fixed inset-x-0 top-[73px] bg-[#FDFBF6] border-b border-[#EFE2C2] shadow-xl py-6 px-6 transition-all duration-200 max-h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-all min-h-[44px] flex items-center ${
                    isActive
                      ? 'bg-[#EFE2C2] text-[#777F56] font-semibold'
                      : 'text-[#2D321F] hover:bg-[#EFE2C2]/40'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#EFE2C2] flex flex-col space-y-3">
              <button
                onClick={() => handleLinkClick('custom-orders')}
                className="w-full py-3 px-4 bg-[#777F56] text-white font-semibold rounded-xl text-center shadow-md hover:bg-[#636B45] transition-colors min-h-[44px] flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 mr-2 text-[#EFC257]" aria-hidden="true" />
                Get a Custom Quote
              </button>
              <div className="flex items-center justify-center space-x-2 text-xs text-[#777F56] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#777F56]" aria-hidden="true" />
                <span>Made with care in the UAE • Express Delivery</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
