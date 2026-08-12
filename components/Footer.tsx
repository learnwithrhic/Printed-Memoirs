'use client';

import { Sparkles, MessageSquare, Mail, Instagram, MapPin } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/utils';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'custom-orders', label: 'Custom Orders' },
    { id: 'story', label: 'Our Story' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'corporate', label: 'Corporate & Events' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-[#2D321F] text-white pt-16 pb-12 border-t border-[#EFE2C2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={() => onNavigate('hero')}
              className="text-left font-serif text-3xl font-bold tracking-tight text-white hover:text-[#EFC257] transition-colors focus-visible:outline-none"
            >
              PRINTED MEMOIRS
            </button>
            <p className="text-xs uppercase tracking-widest text-[#EFE2C2] font-semibold">
              Small Keepsakes. Big Memories.
            </p>
            <p className="text-sm text-[#EFE2C2]/80 max-w-sm leading-relaxed">
              Customized round and square pins, photo magnets, and personalized pocket mirrors made with love and precision in the UAE.
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#EFC257]">
              <MapPin className="w-4 h-4 text-[#99A86F]" aria-hidden="true" />
              <span>UAE Nationwide Delivery • Express Turnaround</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-[#EFE2C2]">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-[#EFC257] transition-colors py-1 text-left focus-visible:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Contact Us
            </h4>

            <div className="space-y-2 text-sm text-[#EFE2C2]">
              <a
                href={buildWhatsAppLink({})}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-[#EFC257] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>WhatsApp: +971 50 000 0000</span>
              </a>

              <a
                href="mailto:hello@printedmemoirs.ae"
                className="flex items-center space-x-2 hover:text-[#EFC257] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#EFC257]" aria-hidden="true" />
                <span>Email: hello@printedmemoirs.ae</span>
              </a>
            </div>

            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#EFE2C2] mb-2">
                Follow Us
              </h5>
              <div className="flex space-x-3 text-xs text-[#EFE2C2]">
                <a href="#instagram" className="hover:text-[#EFC257]">Instagram</a>
                <span>•</span>
                <a href="#tiktok" className="hover:text-[#EFC257]">TikTok</a>
                <span>•</span>
                <a href="#facebook" className="hover:text-[#EFC257]">Facebook</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-[#EFE2C2]/60 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Printed Memoirs. All Rights Reserved.</p>
          <p className="font-serif italic text-white/80">Your memory. Your design. Your keepsake.</p>
        </div>

      </div>
    </footer>
  );
}
