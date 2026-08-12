'use client';

import { useState } from 'react';
import { Send, MessageSquare, Mail, Instagram, MapPin, Sparkles, Phone, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppLink, formatAED } from '@/lib/utils';
import confetti from 'canvas-confetti';

export function ContactSection() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('Pin');
  const [quantity, setQuantity] = useState('10');
  const [requiredDate, setRequiredDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#777F56', '#99A86F', '#EFC257'],
    });
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#FDFBF6] border-b border-[#EFE2C2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#777F56] mb-2 block">
            Direct Communication & Inquiries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D321F] tracking-tight mb-4">
            LET&apos;S CREATE SOMETHING MEMORABLE
          </h2>
          <p className="text-base sm:text-lg text-[#4E553D] leading-relaxed">
            Have an idea? We&apos;d love to hear it. Whether you need one personalized keepsake or hundreds of pieces for an event, send us your requirements and we&apos;ll help bring your idea to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-8 border border-[#EFE2C2] shadow-xs space-y-6">
              <h3 className="font-serif text-2xl font-bold text-[#2D321F]">
                Direct Contacts
              </h3>

              {/* WhatsApp Item */}
              <a
                href={buildWhatsAppLink({ name, product, quantity: parseInt(quantity) || 10, message })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 rounded-2xl bg-[#FDFBF6] hover:bg-[#EFE2C2]/40 transition-colors border border-[#EFE2C2] group"
              >
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs text-[#777F56] font-bold uppercase tracking-wider block">WhatsApp Direct</span>
                  <span className="text-sm font-bold text-[#2D321F]">+971 55 468 2194</span>
                  <span className="text-[11px] text-emerald-700 font-semibold block">Click to Chat Instantly</span>
                </div>
              </a>

              {/* Email Item */}
              <a
                href="mailto:hello@printedmemoirs.ae"
                className="flex items-center space-x-4 p-4 rounded-2xl bg-[#FDFBF6] hover:bg-[#EFE2C2]/40 transition-colors border border-[#EFE2C2] group"
              >
                <div className="p-3 bg-amber-100 text-amber-800 rounded-xl group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs text-[#777F56] font-bold uppercase tracking-wider block">Email Inquiries</span>
                  <span className="text-sm font-bold text-[#2D321F]">hello@printedmemoirs.ae</span>
                </div>
              </a>

              {/* Instagram */}
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#FDFBF6] border border-[#EFE2C2]">
                <div className="p-3 bg-rose-100 text-rose-800 rounded-xl">
                  <Instagram className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs text-[#777F56] font-bold uppercase tracking-wider block">Social Channels</span>
                  <span className="text-sm font-bold text-[#2D321F]">@printedmemoirs.ae</span>
                  <span className="text-[11px] text-[#777F56] block">Instagram & TikTok</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#FDFBF6] border border-[#EFE2C2]">
                <div className="p-3 bg-blue-100 text-blue-800 rounded-xl">
                  <MapPin className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs text-[#777F56] font-bold uppercase tracking-wider block">Workshop Location</span>
                  <span className="text-sm font-bold text-[#2D321F]">United Arab Emirates (UAE)</span>
                  <span className="text-[11px] text-[#777F56] block">Express Delivery Across All 7 Emirates</span>
                </div>
              </div>

            </div>

          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EFE2C2] shadow-lg">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D321F] mb-2">
                GET A QUOTE
              </h3>
              <p className="text-xs text-[#777F56] mb-8">
                Fill in your order requirements and our team will get back to you with a formal quote within hours.
              </p>

              {submitted ? (
                <div className="p-8 bg-[#FDFBF6] rounded-2xl border border-[#EFE2C2] text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#777F56] mx-auto" aria-hidden="true" />
                  <h4 className="font-serif text-2xl font-bold text-[#2D321F]">Inquiry Received!</h4>
                  <p className="text-sm text-[#4E553D]">
                    Thank you, {name}! We&apos;ve logged your request for {quantity} {product}s. We&apos;ll be in touch via WhatsApp or email shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#777F56] hover:bg-[#636B45] text-white font-bold text-xs rounded-full"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 55 468 2194"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                        Product
                      </label>
                      <select
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F] bg-white"
                      >
                        <option value="Pin">📌 Custom Pin</option>
                        <option value="Magnet">🧲 Custom Magnet</option>
                        <option value="Mirror">🪞 Custom Mirror</option>
                        <option value="Mix">Mix of Products</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="e.g. 25"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                        Required Date
                      </label>
                      <input
                        type="date"
                        value={requiredDate}
                        onChange={(e) => setRequiredDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                      Message / Event Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your design, theme, or any questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#777F56] hover:bg-[#636B45] text-white font-bold text-base rounded-full shadow-md transition-all flex items-center justify-center min-h-[48px]"
                  >
                    <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                    SEND INQUIRY
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
