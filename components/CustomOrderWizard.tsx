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
  initialProduct?: 'pin' | 'magnet' | 'mirror' | 'collage';
  initialShape?: string;
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
  initialShape = '65mm Round',
  initialQuantity = 10,
  onOrderSubmitted,
}: CustomOrderWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [product, setProduct] = useState<'pin' | 'magnet' | 'mirror' | 'collage'>(initialProduct);
  const [shape, setShape] = useState<string>(initialShape);
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

  const unitPrice = calculateUnitPrice(product, quantity, shape);
  const totalPrice = calculateTotalPrice(product, quantity, shape);
  const currentTier = getTierForQuantity(quantity);

  const handleProductSelect = (pType: 'pin' | 'magnet' | 'mirror' | 'collage') => {
    setProduct(pType);
    if (pType === 'pin' || pType === 'mirror') {
      setShape('65mm Round');
    } else if (pType === 'magnet') {
      setShape('65mm Round');
    } else if (pType === 'collage') {
      setShape('2×3 Grid (6 Pcs)');
    }
  };

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
        colors: ['#777F56', '#99A86F', '#EFE2C2', '#EFC257', '#E1A77A'],
      });
    }, 1000);
  };

  return (
    <section id="custom-orders" className="py-16 lg:py-24 bg-[#FDFBF6] border-b border-[#EFE2C2]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#777F56] mb-2 block">
            Dedicated Customizing Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D321F] tracking-tight mb-3">
            CREATE YOUR MEMOIR
          </h2>
          <p className="text-base text-[#4E553D]">
            Design your personalized pins, magnets, and mirrors in 5 simple steps.
          </p>
        </div>

        {/* Submitted Order Confirmation View */}
        {submittedOrder ? (
          <div className="bg-white rounded-3xl border border-[#EFE2C2] p-8 sm:p-12 shadow-xl text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-[#99A86F]/20 text-[#777F56] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#99A86F]/30">
              <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
            </div>

            <h3 className="font-serif text-3xl font-bold text-[#2D321F] mb-3">
              Thank you for choosing Printed Memoirs!
            </h3>

            <p className="text-base text-[#4E553D] max-w-xl mx-auto leading-relaxed mb-6">
              We&apos;ve received your request and will review your design and requirements. We&apos;ll contact you through WhatsApp or email with the details and quotation.
            </p>

            {/* Reference Badge */}
            <div className="bg-[#FDFBF6] p-4 rounded-2xl border border-[#EFE2C2] max-w-md mx-auto mb-8 text-xs font-semibold text-[#2D321F] space-y-1">
              <div>Reference Code: <span className="font-mono text-[#777F56] font-bold">{submittedOrder.orderId}</span></div>
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
                className="w-full sm:w-auto px-7 py-3.5 bg-[#777F56] hover:bg-[#636B45] text-white font-bold rounded-full shadow-md transition-all flex items-center justify-center min-h-[48px]"
              >
                <MessageSquare className="w-5 h-5 mr-2 text-[#EFC257]" aria-hidden="true" />
                Chat Now on WhatsApp
              </a>

              <button
                onClick={() => {
                  setSubmittedOrder(null);
                  setCurrentStep(1);
                }}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#EFE2C2]/60 hover:bg-[#EFE2C2] text-[#2D321F] font-bold rounded-full transition-colors min-h-[48px]"
              >
                Create Another Order
              </button>
            </div>
          </div>
        ) : (
          
          /* 5-Step Order Wizard Box */
          <div className="bg-white rounded-3xl border border-[#EFE2C2] shadow-xl overflow-hidden">
            
            {/* Step Progress Bar */}
            <div className="bg-[#FDFBF6] p-4 sm:p-6 border-b border-[#EFE2C2]">
              <div className="flex justify-between items-center max-w-2xl mx-auto">
                {[1, 2, 3, 4, 5].map((stepNum) => (
                  <div key={stepNum} className="flex flex-col items-center">
                    <button
                      onClick={() => stepNum < currentStep && setCurrentStep(stepNum)}
                      disabled={stepNum > currentStep}
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        currentStep === stepNum
                          ? 'bg-[#777F56] text-white ring-4 ring-[#777F56]/20 scale-110'
                          : stepNum < currentStep
                          ? 'bg-[#2D321F] text-white cursor-pointer'
                          : 'bg-[#EFE2C2] text-[#777F56]'
                      }`}
                    >
                      {stepNum < currentStep ? <Check className="w-4 h-4" /> : stepNum}
                    </button>
                    <span className="text-[10px] font-semibold text-[#777F56] mt-1.5 hidden sm:block">
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
                  <h3 className="font-serif text-2xl font-bold text-[#2D321F]">
                    Step 1 — Choose Your Product Category
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {PRODUCTS.map((p) => {
                      const isSelected = product === p.type;
                      return (
                        <div
                          key={p.id}
                          onClick={() => handleProductSelect(p.type)}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center ${
                            isSelected
                              ? 'border-[#777F56] bg-[#FDFBF6] shadow-md ring-2 ring-[#777F56]/20'
                              : 'border-[#EFE2C2] hover:border-[#777F56]/50 bg-white'
                          }`}
                        >
                          <span className="text-3xl mb-2">{p.emoji}</span>
                          <span className="font-bold text-[#2D321F] text-sm mb-1">
                            {p.name}
                          </span>
                          <span className="text-[11px] text-[#4E553D] mb-3 leading-snug">{p.tagline}</span>
                          <span className="mt-auto text-xs font-bold text-[#777F56] bg-white px-2.5 py-1 rounded-full border border-[#EFE2C2]">
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
                      className="px-8 py-3.5 bg-[#777F56] hover:bg-[#636B45] text-white font-bold rounded-full shadow-md flex items-center min-h-[44px]"
                    >
                      Next: Choose Shape & Size
                      <ArrowRight className="w-4 h-4 ml-2 text-[#EFC257]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE YOUR SHAPE & SIZE */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-[#2D321F]">
                      Step 2 — Select Shape & Dimensions
                    </h3>
                    <span className="text-xs font-bold text-[#777F56] bg-[#FDFBF6] px-3 py-1 rounded-full border border-[#EFE2C2] uppercase">
                      For {product.toUpperCase()}
                    </span>
                  </div>

                  <div className={`grid gap-4 ${
                    product === 'collage' || product === 'magnet' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
                  }`}>
                    {/* Render Shapes for Pin & Mirror */}
                    {(product === 'pin' || product === 'mirror') && (
                      <div
                        onClick={() => setShape('65mm Round')}
                        className="p-6 rounded-2xl border-2 border-[#777F56] bg-[#FDFBF6] shadow-md ring-2 ring-[#777F56]/20 cursor-pointer flex flex-col items-center text-center"
                      >
                        <div className="w-24 h-24 rounded-full bg-white border-4 border-[#EFE2C2] flex items-center justify-center shadow-inner mb-4">
                          <span className="text-xl font-bold text-[#2D321F]">65 mm</span>
                        </div>
                        <span className="font-bold text-[#2D321F] text-lg mb-1">65mm Round</span>
                        <p className="text-xs text-[#4E553D]">Standard premium circular format. Perfect for wearable pins and compact hand mirrors.</p>
                      </div>
                    )}

                    {/* Render Shapes for Custom Magnets */}
                    {product === 'magnet' && (
                      <>
                        <div
                          onClick={() => setShape('65mm Round')}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            shape === '65mm Round'
                              ? 'border-[#777F56] bg-[#FDFBF6] shadow-md ring-2 ring-[#777F56]/20'
                              : 'border-[#EFE2C2] hover:border-[#777F56]/50 bg-white'
                          }`}
                        >
                          <div className="w-20 h-20 rounded-full bg-white border-4 border-[#EFE2C2] flex items-center justify-center shadow-inner mb-3">
                            <span className="text-base font-bold text-[#2D321F]">65 mm</span>
                          </div>
                          <span className="font-bold text-[#2D321F] text-base mb-1">65mm Round</span>
                          <p className="text-xs text-[#4E553D]">Classic round magnetic souvenir badge.</p>
                        </div>

                        <div
                          onClick={() => setShape('58mm Square (Rounded Corners)')}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            shape === '58mm Square (Rounded Corners)'
                              ? 'border-[#777F56] bg-[#FDFBF6] shadow-md ring-2 ring-[#777F56]/20'
                              : 'border-[#EFE2C2] hover:border-[#777F56]/50 bg-white'
                          }`}
                        >
                          <div className="w-20 h-20 rounded-2xl bg-white border-4 border-[#EFE2C2] flex items-center justify-center shadow-inner mb-3">
                            <span className="text-base font-bold text-[#2D321F]">58 mm</span>
                          </div>
                          <span className="font-bold text-[#2D321F] text-base mb-1">58mm Square (Rounded Corners)</span>
                          <p className="text-xs text-[#4E553D]">Soft rounded-corner modern square format.</p>
                        </div>

                        <div
                          onClick={() => setShape('50mm Square')}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            shape === '50mm Square'
                              ? 'border-[#777F56] bg-[#FDFBF6] shadow-md ring-2 ring-[#777F56]/20'
                              : 'border-[#EFE2C2] hover:border-[#777F56]/50 bg-white'
                          }`}
                        >
                          <div className="w-20 h-20 rounded-md bg-white border-4 border-[#EFE2C2] flex items-center justify-center shadow-inner mb-3">
                            <span className="text-base font-bold text-[#2D321F]">50 mm</span>
                          </div>
                          <span className="font-bold text-[#2D321F] text-base mb-1">50mm Square</span>
                          <p className="text-xs text-[#4E553D]">Clean straight-edge square magnet.</p>
                        </div>
                      </>
                    )}

                    {/* Render Shapes for Collage / Puzzle Magnets */}
                    {product === 'collage' && (
                      <>
                        <div
                          onClick={() => setShape('2×3 Grid (6 Pcs)')}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            shape.includes('2×3') || shape.includes('2x3')
                              ? 'border-[#777F56] bg-[#FDFBF6] shadow-md ring-2 ring-[#777F56]/20'
                              : 'border-[#EFE2C2] hover:border-[#777F56]/50 bg-white'
                          }`}
                        >
                          <div className="w-20 h-24 bg-white border-2 border-[#EFE2C2] rounded-lg grid grid-cols-2 gap-0.5 p-1 mb-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div key={i} className="bg-[#777F56]/20 rounded-2xs" />
                            ))}
                          </div>
                          <span className="font-bold text-[#2D321F] text-base mb-1">2×3 Grid (6 Magnets)</span>
                          <p className="text-xs text-[#4E553D]">100mm × 150mm total area made of 6 pieces 50mm square magnets.</p>
                        </div>

                        <div
                          onClick={() => setShape('3×3 Grid (9 Pcs)')}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            shape.includes('3×3') || shape.includes('3x3')
                              ? 'border-[#777F56] bg-[#FDFBF6] shadow-md ring-2 ring-[#777F56]/20'
                              : 'border-[#EFE2C2] hover:border-[#777F56]/50 bg-white'
                          }`}
                        >
                          <div className="w-20 h-20 bg-white border-2 border-[#EFE2C2] rounded-lg grid grid-cols-3 gap-0.5 p-1 mb-3">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <div key={i} className="bg-[#777F56]/20 rounded-2xs" />
                            ))}
                          </div>
                          <span className="font-bold text-[#2D321F] text-base mb-1">3×3 Grid (9 Magnets)</span>
                          <p className="text-xs text-[#4E553D]">150mm × 150mm total area made of 9 pieces 50mm square magnets.</p>
                        </div>

                        <div
                          onClick={() => setShape('3×4 Grid (12 Pcs)')}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            shape.includes('3×4') || shape.includes('3x4')
                              ? 'border-[#777F56] bg-[#FDFBF6] shadow-md ring-2 ring-[#777F56]/20'
                              : 'border-[#EFE2C2] hover:border-[#777F56]/50 bg-white'
                          }`}
                        >
                          <div className="w-20 h-24 bg-white border-2 border-[#EFE2C2] rounded-lg grid grid-cols-3 gap-0.5 p-1 mb-3">
                            {Array.from({ length: 12 }).map((_, i) => (
                              <div key={i} className="bg-[#777F56]/20 rounded-2xs" />
                            ))}
                          </div>
                          <span className="font-bold text-[#2D321F] text-base mb-1">3×4 Grid (12 Magnets)</span>
                          <p className="text-xs text-[#4E553D]">150mm × 200mm total area made of 12 pieces 50mm square magnets.</p>
                        </div>

                        <div
                          onClick={() => setShape('4×4 Grid (16 Pcs)')}
                          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${
                            shape.includes('4×4') || shape.includes('4x4')
                              ? 'border-[#777F56] bg-[#FDFBF6] shadow-md ring-2 ring-[#777F56]/20'
                              : 'border-[#EFE2C2] hover:border-[#777F56]/50 bg-white'
                          }`}
                        >
                          <div className="w-20 h-20 bg-white border-2 border-[#EFE2C2] rounded-lg grid grid-cols-4 gap-0.5 p-1 mb-3">
                            {Array.from({ length: 16 }).map((_, i) => (
                              <div key={i} className="bg-[#777F56]/20 rounded-2xs" />
                            ))}
                          </div>
                          <span className="font-bold text-[#2D321F] text-base mb-1">4×4 Grid (16 Magnets)</span>
                          <p className="text-xs text-[#4E553D]">200mm × 200mm total area made of 16 pieces 50mm square magnets.</p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 bg-[#EFE2C2]/60 hover:bg-[#EFE2C2] text-[#2D321F] font-bold rounded-full flex items-center min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-8 py-3.5 bg-[#777F56] hover:bg-[#636B45] text-white font-bold rounded-full shadow-md flex items-center min-h-[44px]"
                    >
                      Next: Choose Quantity
                      <ArrowRight className="w-4 h-4 ml-2 text-[#EFC257]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CHOOSE YOUR QUANTITY */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <h3 className="font-serif text-2xl font-bold text-[#2D321F]">
                    Step 3 — Choose Your Quantity
                  </h3>

                  <div className="bg-[#FDFBF6] p-6 rounded-2xl border border-[#EFE2C2]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#777F56] block">
                          Total Pieces Needed
                        </span>
                        <span className="text-3xl font-serif font-bold text-[#2D321F]">
                          {quantity} <span className="text-base font-normal text-[#4E553D]">pieces</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 bg-white border border-[#EFE2C2] rounded-xl text-lg font-bold text-[#2D321F] flex items-center justify-center shadow-2xs hover:bg-[#EFE2C2]/50"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="1000"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 h-10 text-center font-bold text-lg border border-[#EFE2C2] rounded-xl bg-white text-[#2D321F]"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 bg-white border border-[#EFE2C2] rounded-xl text-lg font-bold text-[#2D321F] flex items-center justify-center shadow-2xs hover:bg-[#EFE2C2]/50"
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
                              ? 'bg-[#777F56] text-white shadow-2xs'
                              : 'bg-white text-[#2D321F] border border-[#EFE2C2] hover:bg-[#EFE2C2]/50'
                          }`}
                        >
                          {num} pcs
                        </button>
                      ))}
                    </div>

                    {/* Tier Discount Summary */}
                    <div className="bg-white p-4 rounded-xl border border-[#EFE2C2] space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#777F56]">Applied Discount Tier:</span>
                        <span className="font-bold text-[#777F56]">{currentTier.label} ({currentTier.range})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#777F56]">Rate Per Unit:</span>
                        <span className="font-bold text-[#2D321F]">{formatAED(unitPrice)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#EFE2C2] text-sm font-bold text-[#2D321F]">
                        <span>Estimated Total:</span>
                        <span className="text-[#777F56]">{formatAED(totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 bg-[#EFE2C2]/60 hover:bg-[#EFE2C2] text-[#2D321F] font-bold rounded-full flex items-center min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-8 py-3.5 bg-[#777F56] hover:bg-[#636B45] text-white font-bold rounded-full shadow-md flex items-center min-h-[44px]"
                    >
                      Next: Upload Design
                      <ArrowRight className="w-4 h-4 ml-2 text-[#EFC257]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: UPLOAD YOUR DESIGN */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <h3 className="font-serif text-2xl font-bold text-[#2D321F]">
                    Step 4 — Upload Your Design
                  </h3>
                  
                  <p className="text-xs text-[#4E553D]">
                    Upload your photo, logo, artwork, or design. Accepted formats: <span className="font-bold">JPG | PNG | PDF</span>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Left: Upload Dropzone & Sample Artwork Picker */}
                    <div className="md:col-span-7 space-y-4">
                      
                      {/* Upload Box */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-[#777F56]/50 bg-[#FDFBF6] hover:bg-[#EFE2C2]/40 p-8 rounded-2xl text-center cursor-pointer transition-colors flex flex-col items-center justify-center min-h-[180px]"
                      >
                        <Upload className="w-8 h-8 text-[#777F56] mb-2" aria-hidden="true" />
                        <span className="font-bold text-[#2D321F] text-sm mb-1">
                          Click to Browse or Drag & Drop File
                        </span>
                        <span className="text-xs text-[#777F56]">
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
                        <span className="text-xs font-bold text-[#777F56] uppercase tracking-wider block mb-2">
                          Or select sample artwork to test:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {PRESET_SAMPLE_ARTWORK.map((preset) => (
                            <div
                              key={preset.id}
                              onClick={() => handlePresetSelect(preset.url, preset.name)}
                              className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all relative ${
                                presetSelected === preset.name
                                  ? 'border-[#777F56] ring-2 ring-[#777F56]/30'
                                  : 'border-[#EFE2C2] hover:border-[#777F56]/60'
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
                    <div className="md:col-span-5 bg-[#FDFBF6] p-5 rounded-2xl border border-[#EFE2C2] text-center">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#777F56] block mb-3">
                        Mockup Preview ({shape})
                      </span>

                      <div className="relative w-44 h-44 mx-auto mb-4 bg-white border-4 border-[#EFE2C2] shadow-md flex items-center justify-center overflow-hidden transition-all duration-200">
                        {designPreview ? (
                          <img
                            src={designPreview}
                            alt="Custom design preview"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="text-center p-4 text-xs text-[#777F56]">
                            <ImageIcon className="w-8 h-8 mx-auto mb-1 text-[#EFE2C2]" aria-hidden="true" />
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
                        className="w-full py-2 px-3 bg-[#2D321F] hover:bg-[#3B4029] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1.5"
                      >
                        {isAnalyzing ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-[#EFC257]" />
                        )}
                        <span>{isAnalyzing ? 'Analyzing...' : 'AI Print Quality Check'}</span>
                      </button>

                      {/* AI Feedback Box */}
                      {aiAnalysis && (
                        <div className="mt-3 p-3 bg-white rounded-xl border border-[#EFE2C2] text-left text-[11px] space-y-1">
                          <div className="font-bold text-[#2D321F] flex justify-between">
                            <span>Resolution:</span>
                            <span className="text-[#777F56]">{aiAnalysis.resolutionGrade}</span>
                          </div>
                          <p className="text-[#4E553D]">{aiAnalysis.framingAdvice}</p>
                          <p className="text-[#777F56] italic">{aiAnalysis.summaryNote}</p>
                        </div>
                      )}

                    </div>

                  </div>

                  <div className="pt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 bg-[#EFE2C2]/60 hover:bg-[#EFE2C2] text-[#2D321F] font-bold rounded-full flex items-center min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(5)}
                      className="px-8 py-3.5 bg-[#777F56] hover:bg-[#636B45] text-white font-bold rounded-full shadow-md flex items-center min-h-[44px]"
                    >
                      Next: Order Details
                      <ArrowRight className="w-4 h-4 ml-2 text-[#EFC257]" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: TELL US ABOUT YOUR ORDER */}
              {currentStep === 5 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <h3 className="font-serif text-2xl font-bold text-[#2D321F]">
                    Step 5 — Tell Us About Your Order
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="+971 50 123 4567"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                        Event / Occasion
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Wedding Favor, Birthday, Tech Summit"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                      />
                    </div>

                    <div className="sm:col-span-2">
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

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1">
                        Special Instructions
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Any notes about color preferences, custom packaging, or delivery details..."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#EFE2C2] focus:outline-none focus:ring-2 focus:ring-[#777F56] text-sm text-[#2D321F]"
                      />
                    </div>
                  </div>

                  {/* Order Summary Box */}
                  <div className="bg-[#FDFBF6] p-4 rounded-2xl border border-[#EFE2C2] flex justify-between items-center text-xs font-semibold text-[#2D321F]">
                    <div>
                      <span>Selected: </span>
                      <span className="font-bold text-[#777F56] uppercase">{shape} {product} ({quantity} pcs)</span>
                    </div>
                    <div className="text-right">
                      <span>Total: </span>
                      <span className="font-serif text-lg font-bold text-[#2D321F]">{formatAED(totalPrice)}</span>
                    </div>
                  </div>

                  <div className="pt-6 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="px-6 py-3 bg-[#EFE2C2]/60 hover:bg-[#EFE2C2] text-[#2D321F] font-bold rounded-full flex items-center min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-[#777F56] hover:bg-[#636B45] text-white font-bold rounded-full shadow-lg transition-all flex items-center min-h-[48px]"
                    >
                      <Sparkles className="w-5 h-5 mr-2 text-[#EFC257]" aria-hidden="true" />
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
