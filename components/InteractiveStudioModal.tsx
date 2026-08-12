'use client';

import { useState, useRef } from 'react';
import { X, Sparkles, Upload, RefreshCw, Layers, Check, ArrowRight, Sun, RotateCw, ZoomIn } from 'lucide-react';
import { PRODUCTS, PRESET_SAMPLE_ARTWORK } from '@/lib/data';
import { formatAED, calculateUnitPrice, calculateTotalPrice } from '@/lib/utils';

interface InteractiveStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToQuote: (productType: 'pin' | 'magnet' | 'mirror' | 'collage', shape: string, qty: number) => void;
}

export function InteractiveStudioModal({ isOpen, onClose, onSendToQuote }: InteractiveStudioModalProps) {
  const [product, setProduct] = useState<'pin' | 'magnet' | 'mirror' | 'collage'>('pin');
  const [shape, setShape] = useState<string>('65mm Round');
  const [quantity, setQuantity] = useState<number>(25);
  const [glossEffect, setGlossEffect] = useState<boolean>(true);
  const [designUrl, setDesignUrl] = useState<string>(
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400&auto=format&fit=crop'
  );
  const [zoom, setZoom] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const unitPrice = calculateUnitPrice(product, quantity, shape);
  const totalPrice = calculateTotalPrice(product, quantity, shape);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setDesignUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="bg-[#FAF7F2] rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl my-8 border border-[#EAE2D5] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#2D321F] hover:bg-[#EFE2C2] rounded-full transition-colors"
          aria-label="Close studio simulator"
        >
          <X className="w-6 h-6" aria-hidden="true" />
        </button>

        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#777F56] mb-1 block">
            3D Keepsake Simulator
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D321F]">
            Interactive Design Studio
          </h3>
          <p className="text-xs text-[#4E553D]">
            Test your photo or artwork live on custom pins, magnets, and mirrors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Replica Stage */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-[#EFE2C2] shadow-inner text-center flex flex-col items-center">
            
            {/* Shape Stage */}
            <div className="relative w-64 h-64 my-4 flex items-center justify-center">
              
              {/* Product Badge Replica */}
              <div
                className={`relative transition-all duration-300 w-56 h-56 shadow-2xl border-4 border-[#EFE2C2] overflow-hidden flex items-center justify-center ${
                  shape === 'Round' ? 'rounded-full' : 'rounded-3xl'
                }`}
                style={{ backgroundColor: '#ffffff' }}
              >
                {/* User Design Canvas Image */}
                <div
                  className="w-full h-full transition-transform duration-100"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  }}
                >
                  <img
                    src={designUrl}
                    alt="Custom design preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Glossy Sheen Overlay */}
                {glossEffect && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-white/10 pointer-events-none" />
                )}
              </div>

              {/* Product Badge Overlay Tag */}
              <div className="absolute bottom-1 bg-[#2D321F]/90 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {shape} {product.toUpperCase()}
              </div>
            </div>

            {/* Fine-Tuning Controls */}
            <div className="w-full space-y-3 pt-2 border-t border-[#EFE2C2] text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2D321F] flex items-center">
                  <Sun className="w-3.5 h-3.5 mr-1 text-[#777F56]" />
                  Gloss Finish Sheen:
                </span>
                <button
                  onClick={() => setGlossEffect(!glossEffect)}
                  className={`px-3 py-1 rounded-full font-bold ${
                    glossEffect ? 'bg-[#777F56] text-white' : 'bg-[#EFE2C2] text-[#2D321F]'
                  }`}
                >
                  {glossEffect ? 'Gloss On' : 'Matte'}
                </button>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <span className="font-bold text-[#2D321F] flex items-center">
                  <ZoomIn className="w-3.5 h-3.5 mr-1 text-[#777F56]" />
                  Zoom:
                </span>
                <input
                  type="range"
                  min="80"
                  max="160"
                  value={zoom}
                  onChange={(e) => setZoom(parseInt(e.target.value))}
                  className="w-32 accent-[#777F56]"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <span className="font-bold text-[#2D321F] flex items-center">
                  <RotateCw className="w-3.5 h-3.5 mr-1 text-[#777F56]" />
                  Rotate:
                </span>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                  className="w-32 accent-[#777F56]"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Options & Controls */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Step 1: Product Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1.5">
                Product Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setProduct(p.type);
                      if (p.type === 'pin' || p.type === 'mirror') setShape('65mm Round');
                      else if (p.type === 'magnet') setShape('65mm Round');
                      else if (p.type === 'collage') setShape('2×3 Grid (6 Pcs)');
                    }}
                    className={`py-2 px-1.5 text-[11px] font-bold rounded-xl transition-all flex flex-col items-center text-center ${
                      product === p.type
                        ? 'bg-[#777F56] text-white shadow-sm'
                        : 'bg-white text-[#2D321F] border border-[#EFE2C2]'
                    }`}
                  >
                    <span className="text-base mb-0.5">{p.emoji}</span>
                    <span className="truncate w-full">{p.name.replace('CUSTOM ', '')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Shape & Size Options */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F] block mb-1.5">
                Size & Specification
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {(product === 'pin' || product === 'mirror') && (
                  <button
                    onClick={() => setShape('65mm Round')}
                    className="py-2 px-3 text-xs font-bold rounded-xl bg-[#777F56] text-white text-left"
                  >
                    🔴 65mm Round (Standard Badge / Pocket Mirror)
                  </button>
                )}

                {product === 'magnet' && (
                  <>
                    <button
                      onClick={() => setShape('65mm Round')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl text-left transition-all ${
                        shape === '65mm Round'
                          ? 'bg-[#777F56] text-white'
                          : 'bg-white text-[#2D321F] border border-[#EFE2C2]'
                      }`}
                    >
                      🔴 65mm Round Magnet
                    </button>
                    <button
                      onClick={() => setShape('58mm Square (Rounded Corners)')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl text-left transition-all ${
                        shape === '58mm Square (Rounded Corners)'
                          ? 'bg-[#777F56] text-white'
                          : 'bg-white text-[#2D321F] border border-[#EFE2C2]'
                      }`}
                    >
                      🟧 58mm Square (Rounded Corners)
                    </button>
                    <button
                      onClick={() => setShape('50mm Square')}
                      className={`py-2 px-3 text-xs font-bold rounded-xl text-left transition-all ${
                        shape === '50mm Square'
                          ? 'bg-[#777F56] text-white'
                          : 'bg-white text-[#2D321F] border border-[#EFE2C2]'
                      }`}
                    >
                      ⬛ 50mm Square Magnet
                    </button>
                  </>
                )}

                {product === 'collage' && (
                  <div className="grid grid-cols-2 gap-1.5">
                    {['2×3 Grid (6 Pcs)', '3×3 Grid (9 Pcs)', '3×4 Grid (12 Pcs)', '4×4 Grid (16 Pcs)'].map((gridOpt) => (
                      <button
                        key={gridOpt}
                        onClick={() => setShape(gridOpt)}
                        className={`py-2 px-2 text-[11px] font-bold rounded-xl transition-all ${
                          shape === gridOpt
                            ? 'bg-[#777F56] text-white'
                            : 'bg-white text-[#2D321F] border border-[#EFE2C2]'
                        }`}
                      >
                        🧩 {gridOpt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Change Image */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2D321F]">
                  Upload Artwork / Photo
                </label>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-[#777F56] underline"
                >
                  Browse File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Sample Art Pickers */}
              <div className="grid grid-cols-4 gap-1.5">
                {PRESET_SAMPLE_ARTWORK.map((preset) => (
                  <div
                    key={preset.id}
                    onClick={() => setDesignUrl(preset.url)}
                    className="aspect-square rounded-lg overflow-hidden border border-[#EFE2C2] cursor-pointer hover:border-[#777F56]"
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Quantity & Pricing */}
            <div className="bg-white p-4 rounded-xl border border-[#EFE2C2] space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#2D321F]">Quantity Needed:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 5))}
                    className="w-6 h-6 bg-[#FDFBF6] border border-[#EFE2C2] rounded font-bold text-[#2D321F]"
                  >
                    -
                  </button>
                  <span className="font-bold text-[#2D321F]">{quantity} pcs</span>
                  <button
                    onClick={() => setQuantity(quantity + 5)}
                    className="w-6 h-6 bg-[#FDFBF6] border border-[#EFE2C2] rounded font-bold text-[#2D321F]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-[#EFE2C2]">
                <span className="font-bold text-[#2D321F]">Est. Total ({formatAED(unitPrice)}/pc):</span>
                <span className="font-serif text-2xl font-bold text-[#777F56]">{formatAED(totalPrice)}</span>
              </div>
            </div>

            {/* Submit Design to Quote Form */}
            <button
              onClick={() => {
                onSendToQuote(product, shape, quantity);
                onClose();
              }}
              className="w-full py-3.5 bg-[#777F56] hover:bg-[#636B45] text-white font-bold rounded-2xl shadow-md transition-colors flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#EFC257]" aria-hidden="true" />
              <span>Use This Design in Custom Order Form</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
