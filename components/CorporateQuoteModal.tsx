'use client';

import { useState } from 'react';
import { X, Building2, Sparkles, Send, CheckCircle2, Trophy, Heart, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CorporateQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CorporateQuoteModal({ isOpen, onClose }: CorporateQuoteModalProps) {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Corporate Event');
  const [quantity, setQuantity] = useState('100+ pieces');
  const [productsNeeded, setProductsNeeded] = useState<string[]>(['Pins', 'Magnets']);
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleProduct = (prod: string) => {
    setProductsNeeded((prev) =>
      prev.includes(prod) ? prev.filter((p) => p !== prod) : [...prev, prod]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#777F56', '#99A86F', '#EFC257'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 relative shadow-2xl my-8 border border-[#EFE2C2] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#2D321F] hover:bg-[#EFE2C2]/40 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-[#777F56] mx-auto" aria-hidden="true" />
            <h3 className="font-serif text-3xl font-bold text-[#2D321F]">Corporate Quote Requested!</h3>
            <p className="text-sm text-[#4E553D] max-w-md mx-auto">
              Thank you, {contactName} from {companyName || 'your organization'}! Our B2B account manager will review your event specifications and issue an official quotation with volume pricing within 4 business hours.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#777F56] hover:bg-[#636B45] text-white font-bold text-sm rounded-full shadow-md"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-[#EFE2C2]/50 text-[#777F56] rounded-2xl">
                <Building2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#777F56]">
                  Corporate & Large Event Quotation
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D321F]">
                  REQUEST A CORPORATE QUOTE
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#4E553D] mb-6">
              Custom pins, magnets, and mirrors branded with your logo, event artwork, or sponsor graphics.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dubai Tech Summit"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 55 468 2194"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1.5">
                  Products Needed (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Pins', 'Magnets', 'Mirrors'].map((item) => {
                    const isChecked = productsNeeded.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleProduct(item)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                          isChecked
                            ? 'bg-[#777F56] text-white border-[#777F56]'
                            : 'bg-[#FDFBF6] text-[#4E553D] border-[#EFE2C2]'
                        }`}
                      >
                        {item === 'Pins' && '📌 Custom Pins'}
                        {item === 'Magnets' && '🧲 Photo Magnets'}
                        {item === 'Mirrors' && '🪞 Pocket Mirrors'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F] bg-white"
                  >
                    <option value="Corporate Event">Corporate Event / Conference</option>
                    <option value="Sports Event">Sports Meet / Race</option>
                    <option value="Wedding / Celebration">Wedding / Large Party</option>
                    <option value="Exhibition / Trade Show">Exhibition / Trade Show</option>
                    <option value="School / University">School / Club Event</option>
                    <option value="Brand Merchandise">Brand Merchandise</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                    Estimated Quantity
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F] bg-white"
                  >
                    <option value="25–49 pieces">25–49 pieces</option>
                    <option value="50–99 pieces">50–99 pieces</option>
                    <option value="100–249 pieces">100–249 pieces</option>
                    <option value="250–499 pieces">250–499 pieces</option>
                    <option value="500+ pieces">500+ pieces</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                  Event / Branding Details & Special Requests
                </label>
                <textarea
                  rows={3}
                  placeholder="Include dates, delivery city in UAE, artwork requirements, or budget constraints..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#777F56] hover:bg-[#636B45] text-white font-bold text-base rounded-full shadow-md transition-all flex items-center justify-center min-h-[48px]"
              >
                <Sparkles className="w-5 h-5 mr-2 text-[#EFC257]" aria-hidden="true" />
                SUBMIT CORPORATE REQUEST
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
