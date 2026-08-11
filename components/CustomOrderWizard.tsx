'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Upload, CheckCircle2, ArrowRight, ArrowLeft, Image as ImageIcon, 
  MessageSquare, Calendar, User, Mail, Phone, FileText, Check, AlertCircle, RefreshCw, Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRODUCTS, PRESET_SAMPLE_ARTWORK } from '@/lib/data';
import { calculateUnitPrice, calculateTotalPrice, formatAED, buildWhatsAppLink, getTierForQuantity } from '@/lib/utils';

interface CustomOrderWizardProps {
  initialProduct?: 'pin' | 'magnet' | 'mirror';
  initialShape?: 'Round' | 'Square';
  initialQuantity?: number;
  onOrderSubmitted?: (orderData: any) => void;
}

function generateOrderId() {
  const year = 2026;
  const seq = Math.floor(1000 + (typeof performance !== 'undefined' ? performance.now() * 100 : 500) % 9000);
  return `PM-${year}-${seq}`;
}

export function CustomOrderWizard({
  initialProduct = 'pin',
  initialShape = 'Round',
  initialQuantity = 10,
  onOrderSubmitted,
}: CustomOrderWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [product, setProduct] = useState<'pin' | 'magnet' | 'mirror'>(initialProduct);
  const [shape, setShape] = useState<'Round' | 'Square'>(initialShape);
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  
  // Design state
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [designPreview, setDesignPreview] = useState<string | null>(null);
  const [presetSelected, setPresetSelected] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // User details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [occasion, setOccasion] = useState('');
  const [requiredDate, setRequiredDate] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProduct(initialProduct);
      if (initialShape) setShape(initialShape);
      if (initialQuantity) setQuantity(initialQuantity);
    }, 0);
    return () => clearTimeout(timer);
  }, [initialProduct, initialShape, initialQuantity]);

  const unitPrice = calculateUnitPrice(product, quantity);
  const totalPrice = calculateTotalPrice(product, quantity);
  const currentTier = getTierForQuantity(quantity);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDesignFile(file);
      setPresetSelected(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        setDesignPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (presetUrl: string, presetName: string) => {
    setDesignPreview(presetUrl);
    setPresetSelected(presetName);
    setDesignFile(null);
  };

  const handleAnalyzeWithAI = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/gemini/analyze-design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          shape,
          occasion,
          description: presetSelected || 'Custom uploaded photo / design artwork',
          imageBase64: designPreview,
        }),
      });
      const data = await res.json();
      setAiAnalysis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      product,
      shape,
      quantity,
      unitPrice,
      totalPrice,
      name,
      email,
      whatsapp,
      occasion,
      requiredDate,
      specialInstructions,
      designPreview,
      submittedAt: new Date().toISOString(),
    };

    // Save order summary to local storage
    try {
      const existing = JSON.parse(localStorage.getItem('printed_memoirs_quotes') || '[]');
      existing.unshift(orderData);
      localStorage.setItem('printed_memoirs_quotes', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedOrder(orderData);
      if (onOrderSubmitted) onOrderSubmitted(orderData);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C86D51', '#362C2B', '#EAE2D5', '#F3ECE2'],
      });
    }, 1000);
  };

  return (
    <section id="custom-orders" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#EAE2D5]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-2 block">
            Dedicated Customizing Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#362C2B] tracking-tight mb-3">
            CREATE YOUR MEMOIR
          </h2>
          <p className="text-base text-[#5C4D4A]">
            Design your personalized pins, magnets, and mirrors in 5 simple steps.
          </p>
        </div>

        {/* Submitted Order Confirmation View */}
        {submittedOrder ? (
          <div className="bg-white rounded-3xl border border-[#EAE2D5] p-8 sm:p-12 shadow-xl text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
            </div>

            <h3 className="font-serif text-3xl font-bold text-[#362C2B] mb-3">
              Thank you for choosing Printed Memoirs!
            </h3>

            <p className="text-base text-[#5C4D4A] max-w-xl mx-auto leading-relaxed mb-6">
              We&apos;ve received your request and will review your design and requirements. We&apos;ll contact you through WhatsApp or email with the details and quotation.
            </p>

            {/* Reference Badge */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE2D5] max-w-md mx-auto mb-8 text-xs font-semibold text-[#362C2B] space-y-1">
              <div>Reference Code: <span className="font-mono text-[#C86D51] font-bold">{submittedOrder.orderId}</span></div>
              <div>Estimated Total: <span className="font-bold">{formatAED(submittedOrder.totalPrice)}</span> ({submittedOrder.quantity} pcs)</div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={buildWhatsAppLink({
                  name: submittedOrder.name,
                  product: `${submittedOrder.product.toUpperCase()}`,
                  shape: submittedOrder.shape,
                  quantity: submittedOrder.quantity,
                  occasion: submittedOrder.occasion,
                  date: submittedOrder.requiredDate,
                  specialInstructions: submittedOrder.specialInstructions,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-md transition-all flex items-center justify-center min-h-[48px]"
              >
                <MessageSquare className="w-5 h-5 mr-2" aria-hidden="true" />
                Chat Now on WhatsApp
              </a>

              <button
                onClick={() => {
                  setSubmittedOrder(null);
                  setCurrentStep(1);
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#F3ECE2] hover:bg-[#EAE2D5] text-[#362C2B] font-bold rounded-full transition-colors min-h-[48px]"
              >
                Create Another Order
              </button>
            </div>
          </div>
        ) : (
          
          /* 5-Step Order Wizard Box */
          <div className="bg-white rounded-3xl border border-[#EAE2D5] shadow-xl overflow-hidden">
            
            {/* Step Progress Bar */}
            <div className="bg-[#FAF7F2] p-4 sm:p-6 border-b border-[#EAE2D5]">
              <div className="flex justify-between items-center max-w-2xl mx-auto">
                {[1, 2, 3, 4, 5].map((stepNum) => (
                  <div key={stepNum} className="flex flex-col items-center">
                    <button
                      onClick={() => stepNum < currentStep && setCurrentStep(stepNum)}
                      disabled={stepNum > currentStep}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        currentStep === stepNum
                          ? 'bg-[#C86D51] text-white ring-4 ring-[#C86D51]/20 scale-110'
                          : stepNum < currentStep
                          ? 'bg-[#362C2B] text-white cursor-pointer'
                          : 'bg-[#EAE2D5] text-[#8C7A78]'
                      }`}
                    >
                      {stepNum < currentStep ? <Check className="w-4 h-4" /> : stepNum}
                    </button>
                    <span className="text-[10px] font-semibold text-[#8C7A78] mt-1.5 hidden sm:block">
                      {stepNum === 1 && 'Product'}
                      {stepNum === 2 && 'Shape'}
                      {stepNum === 3 && 'Quantity'}
                      {stepNum === 4 && 'Design'}
                      {stepNum === 5 && 'Details'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="p-6 sm:p-10">
              
              {/* STEP 1: CHOOSE YOUR PRODUCT */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <h3 className="font-serif text-2xl font-bold text-[#362C2B]">
                    Step 1 — Choose Your Product
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {PRODUCTS.map((p) => {
                      const isSelected = product === p.type;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setProduct(p.type)}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center ${
                            isSelected
                              ? 'border-[#C86D51] bg-[#FAF7F2] shadow-md ring-2 ring-[#C86D51]/20'
                              : 'border-[#EAE2D5] hover:border-[#C86D51]/50 bg-white'
                          }`}
                        >
                          <span className="text-4xl mb-3">{p.emoji}</span>
                          <span className="font-bold text-[#362C2B] text-base mb-1">
                            {p.name.replace('CUSTOM ', '')}
                          </span>
                          <span className="text-xs text-[#5C4D4A] mb-3">{p.tagline}</span>
                          <span className="mt-auto text-xs font-bold text-[#C86D51] bg-white px-3 py-1 rounded-full border border-[#EAE2D5]">
                            From {formatAED(p.basePriceAED)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-8 py-3.5 bg-[#C86D51] hover:bg-[#B25C42] text-white font-bold rounded-full shadow-md flex items-center min-h-[44px]"
                    >
                      Next: Choose Shape
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE YOUR SHAPE */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <h3 className="font-serif text-2xl font-bold text-[#362C2B]">
                    Step 2 — Choose Your Shape
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div
                      onClick={() => setShape('Round')}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                        shape === 'Round'
                          ? 'border-[#C86D51] bg-[#FAF7F2] shadow-md ring-2 ring-[#C86D51]/20'
                          : 'border-[#EAE2D5] hover:border-[#C86D51]/50 bg-white'
                      }`}
                    >
                      <div className="w-24 h-24 rounded-full bg-white border-4 border-[#EAE2D5] flex items-center justify-center shadow-inner mb-4">
                        <span className="text-2xl font-bold text-[#362C2B]">58 mm</span>
                      </div>
                      <span className="font-bold text-[#362C2B] text-lg mb-1">Round Shape</span>
                      <p className="text-xs text-[#5C4D4A]">Classic circular layout. Perfect for logos, circular monograms, portraits, and quotes.</p>
                    </div>

                    <div
                      onClick={() => setShape('Square')}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                        shape === 'Square'
                          ? 'border-[#C86D51] bg-[#FAF7F2] shadow-md ring-2 ring-[#C86D51]/20'
                          : 'border-[#EAE2D5] hover:border-[#C86D51]/50 bg-white'
                      }`}
                    >
                      <div className="w-24 h-24 rounded-2xl bg-white border-4 border-[#EAE2D5] flex items-center justify-center shadow-inner mb-4">
                        <span className="text-2xl font-bold text-[#362C2B]">50 mm</span>
                      </div>
                      <span className="font-bold text-[#362C2B] text-lg mb-1">Square Shape</span>
                      <p className="text-xs text-[#5C4D4A]">Modern square format. Ideal for Instagram photo prints, artwork, and brand badges.</p>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 bg-[#F3ECE2] hover:bg-[#EAE2D5] text-[#362C2B] font-bold rounded-full flex items-center min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-8 py-3.5 bg-[#C86D51] hover:bg-[#B25C42] text-white font-bold rounded-full shadow-md flex items-center min-h-[44px]"
                    >
                      Next: Choose Quantity
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CHOOSE YOUR QUANTITY */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <h3 className="font-serif text-2xl font-bold text-[#362C2B]">
                    Step 3 — Choose Your Quantity
                  </h3>

                  <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#EAE2D5]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A78] block">
                          Total Pieces Needed
                        </span>
                        <span className="text-3xl font-serif font-bold text-[#362C2B]">
                          {quantity} <span className="text-base font-normal text-[#5C4D4A]">pieces</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 bg-white border border-[#EAE2D5] rounded-xl text-lg font-bold text-[#362C2B] flex items-center justify-center shadow-2xs hover:bg-[#F3ECE2]"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="1000"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 h-10 text-center font-bold text-lg border border-[#EAE2D5] rounded-xl bg-white text-[#362C2B]"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 bg-white border border-[#EAE2D5] rounded-xl text-lg font-bold text-[#362C2B] flex items-center justify-center shadow-2xs hover:bg-[#F3ECE2]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Quantity Quick Presets */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {[1, 5, 10, 25, 50, 100, 250].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setQuantity(num)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            quantity === num
                              ? 'bg-[#C86D51] text-white shadow-2xs'
                              : 'bg-white text-[#362C2B] border border-[#EAE2D5] hover:bg-[#F3ECE2]'
                          }`}
                        >
                          {num} pcs
                        </button>
                      ))}
                    </div>

                    {/* Tier Discount Summary */}
                    <div className="bg-white p-4 rounded-xl border border-[#EAE2D5] space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#8C7A78]">Applied Discount Tier:</span>
                        <span className="font-bold text-[#C86D51]">{currentTier.label} ({currentTier.range})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8C7A78]">Rate Per Unit:</span>
                        <span className="font-bold text-[#362C2B]">{formatAED(unitPrice)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#EAE2D5] text-sm font-bold text-[#362C2B]">
                        <span>Estimated Total:</span>
                        <span className="text-[#C86D51]">{formatAED(totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 bg-[#F3ECE2] hover:bg-[#EAE2D5] text-[#362C2B] font-bold rounded-full flex items-center min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-8 py-3.5 bg-[#C86D51] hover:bg-[#B25C42] text-white font-bold rounded-full shadow-md flex items-center min-h-[44px]"
                    >
                      Next: Upload Design
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: UPLOAD YOUR DESIGN */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <h3 className="font-serif text-2xl font-bold text-[#362C2B]">
                    Step 4 — Upload Your Design
                  </h3>
                  
                  <p className="text-xs text-[#5C4D4A]">
                    Upload your photo, logo, artwork, or design. Accepted formats: <span className="font-bold">JPG | PNG | PDF</span>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Left: Upload Dropzone & Sample Artwork Picker */}
                    <div className="md:col-span-7 space-y-4">
                      
                      {/* Upload Box */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-[#C86D51]/50 bg-[#FAF7F2] hover:bg-[#F3ECE2] p-8 rounded-2xl text-center cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[180px]"
                      >
                        <Upload className="w-8 h-8 text-[#C86D51] mb-2" aria-hidden="true" />
                        <span className="font-bold text-[#362C2B] text-sm mb-1">
                          Click to Browse or Drag & Drop File
                        </span>
                        <span className="text-xs text-[#8C7A78]">
                          High resolution images produce best print results
                        </span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/png,application/pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>

                      {/* Sample Preset Art Picker */}
                      <div>
                        <span className="text-xs font-bold text-[#8C7A78] uppercase tracking-wider block mb-2">
                          Or select sample artwork to test:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {PRESET_SAMPLE_ARTWORK.map((preset) => (
                            <div
                              key={preset.id}
                              onClick={() => handlePresetSelect(preset.url, preset.name)}
                              className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all relative ${
                                presetSelected === preset.name
                                  ? 'border-[#C86D51] ring-2 ring-[#C86D51]/30'
                                  : 'border-[#EAE2D5] hover:border-[#C86D51]/60'
                              }`}
                            >
                              <img
                                src={preset.url}
                                alt={preset.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Right: Live Preview & AI Artwork Check */}
                    <div className="md:col-span-5 bg-[#FAF7F2] p-5 rounded-2xl border border-[#EAE2D5] text-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8C7A78] block mb-3">
                        Mockup Preview ({shape})
                      </span>

                      <div className="relative w-44 h-44 mx-auto mb-4 bg-white border-4 border-[#EAE2D5] shadow-md flex items-center justify-center overflow-hidden transition-all duration-200 ${
                        shape === 'Round' ? 'rounded-full' : 'rounded-2xl'
                      }">
                        {designPreview ? (
                          <img
                            src={designPreview}
                            alt="Custom design preview"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="text-center p-4 text-xs text-[#8C7A78]">
                            <ImageIcon className="w-8 h-8 mx-auto mb-1 text-[#EAE2D5]" aria-hidden="true" />
                            <span>Your artwork will appear here</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/10 pointer-events-none" />
                      </div>

                      {/* AI Artwork Analyzer Trigger */}
                      <button
                        type="button"
                        onClick={handleAnalyzeWithAI}
                        disabled={isAnalyzing}
                        className="w-full py-2 px-3 bg-[#362C2B] hover:bg-[#4A3E3D] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1.5"
                      >
                        {isAnalyzing ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        )}
                        <span>{isAnalyzing ? 'Analyzing...' : 'AI Print Quality Check'}</span>
                      </button>

                      {/* AI Feedback Box */}
                      {aiAnalysis && (
                        <div className="mt-3 p-3 bg-white rounded-xl border border-[#EAE2D5] text-left text-[11px] space-y-1">
                          <div className="font-bold text-[#362C2B] flex justify-between">
                            <span>Resolution:</span>
                            <span className="text-[#C86D51]">{aiAnalysis.resolutionGrade}</span>
                          </div>
                          <p className="text-[#5C4D4A]">{aiAnalysis.framingAdvice}</p>
                          <p className="text-[#8C7A78] italic">{aiAnalysis.summaryNote}</p>
                        </div>
                      )}

                    </div>

                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 bg-[#F3ECE2] hover:bg-[#EAE2D5] text-[#362C2B] font-bold rounded-full flex items-center min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(5)}
                      className="px-8 py-3.5 bg-[#C86D51] hover:bg-[#B25C42] text-white font-bold rounded-full shadow-md flex items-center min-h-[44px]"
                    >
                      Next: Order Details
                      <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: TELL US ABOUT YOUR ORDER */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <h3 className="font-serif text-2xl font-bold text-[#362C2B]">
                    Step 5 — Tell Us About Your Order
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#362C2B] block mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EAE2D5] focus:outline-none focus:ring-2 focus:ring-[#C86D51] text-sm text-[#362C2B]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#362C2B] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EAE2D5] focus:outline-none focus:ring-2 focus:ring-[#C86D51] text-sm text-[#362C2B]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#362C2B] block mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EAE2D5] focus:outline-none focus:ring-2 focus:ring-[#C86D51] text-sm text-[#362C2B]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#362C2B] block mb-1">
                        Event / Occasion
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Wedding Favor, Birthday, Tech Summit"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EAE2D5] focus:outline-none focus:ring-2 focus:ring-[#C86D51] text-sm text-[#362C2B]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#362C2B] block mb-1">
                        Required Date
                      </label>
                      <input
                        type="date"
                        value={requiredDate}
                        onChange={(e) => setRequiredDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EAE2D5] focus:outline-none focus:ring-2 focus:ring-[#C86D51] text-sm text-[#362C2B]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#362C2B] block mb-1">
                        Special Instructions
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Any notes about color preferences, custom packaging, or delivery details..."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EAE2D5] focus:outline-none focus:ring-2 focus:ring-[#C86D51] text-sm text-[#362C2B]"
                      />
                    </div>
                  </div>

                  {/* Order Summary Box */}
                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EAE2D5] flex justify-between items-center text-xs font-semibold text-[#362C2B]">
                    <div>
                      <span>Selected: </span>
                      <span className="font-bold text-[#C86D51] uppercase">{shape} {product} ({quantity} pcs)</span>
                    </div>
                    <div className="text-right">
                      <span>Total: </span>
                      <span className="font-serif text-lg font-bold text-[#362C2B]">{formatAED(totalPrice)}</span>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-3 bg-[#F3ECE2] hover:bg-[#EAE2D5] text-[#362C2B] font-bold rounded-full flex items-center min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-[#C86D51] hover:bg-[#B25C42] text-white font-bold rounded-full shadow-lg transition-all flex items-center min-h-[48px]"
                    >
                      <Sparkles className="w-5 h-5 mr-2" aria-hidden="true" />
                      {isSubmitting ? 'Submitting Order...' : 'REQUEST A QUOTE'}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}

      </div>
    </section>
  );
}
