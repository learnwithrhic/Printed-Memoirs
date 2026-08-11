'use client';

import { useState, useEffect } from 'react';
import { X, ShoppingBag, Trash2, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { formatAED, buildWhatsAppLink } from '@/lib/utils';

interface QuickQuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToOrderForm: () => void;
}

export function QuickQuoteDrawer({ isOpen, onClose, onNavigateToOrderForm }: QuickQuoteDrawerProps) {
  const [savedQuotes, setSavedQuotes] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        try {
          const stored = localStorage.getItem('printed_memoirs_quotes');
          if (stored) {
            setSavedQuotes(JSON.parse(stored));
          }
        } catch (err) {
          console.error(err);
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClearQuote = (index: number) => {
    const updated = [...savedQuotes];
    updated.splice(index, 1);
    setSavedQuotes(updated);
    try {
      localStorage.setItem('printed_memoirs_quotes', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-[#FAF7F2] w-full max-w-md h-full shadow-2xl p-6 overflow-y-auto flex flex-col border-l border-[#EAE2D5] animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EAE2D5]">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#C86D51]" aria-hidden="true" />
            <h3 className="font-serif text-xl font-bold text-[#362C2B]">Quote Drafts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#4A3E3D] hover:bg-[#EAE2D5] rounded-full transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 py-6 space-y-4">
          {savedQuotes.length > 0 ? (
            savedQuotes.map((q, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-[#EAE2D5] shadow-2xs relative space-y-2"
              >
                <button
                  onClick={() => handleClearQuote(idx)}
                  className="absolute top-3 right-3 text-[#8C7A78] hover:text-rose-600 p-1"
                  title="Remove quote"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="pr-6">
                  <span className="text-[10px] font-bold text-[#C86D51] uppercase tracking-wider block">
                    Ref: {q.orderId || 'Draft'}
                  </span>
                  <h4 className="font-bold text-[#362C2B] text-base capitalize">
                    {q.shape} Custom {q.product}
                  </h4>
                  <p className="text-xs text-[#5C4D4A]">
                    Quantity: <span className="font-bold">{q.quantity} pcs</span>
                  </p>
                  <p className="text-xs font-serif font-bold text-[#362C2B] mt-1">
                    Est. Total: {formatAED(q.totalPrice || 0)}
                  </p>
                </div>

                <a
                  href={buildWhatsAppLink({
                    name: q.name,
                    product: `${q.product.toUpperCase()}`,
                    shape: q.shape,
                    quantity: q.quantity,
                    occasion: q.occasion,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1 mt-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </a>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-[#8C7A78]">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-[#EAE2D5]" aria-hidden="true" />
              <p className="text-sm font-medium">No saved quote drafts yet.</p>
              <p className="text-xs mt-1">Use our order form to configure custom pins, magnets, or mirrors.</p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-[#EAE2D5]">
          <button
            onClick={() => {
              onNavigateToOrderForm();
              onClose();
            }}
            className="w-full py-3.5 bg-[#C86D51] hover:bg-[#B25C42] text-white font-bold rounded-2xl shadow-md flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create New Custom Order</span>
          </button>
        </div>

      </div>
    </div>
  );
}
