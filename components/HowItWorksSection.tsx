'use client';

import { Sparkles, CheckCircle, PackageCheck, Send, Layers } from 'lucide-react';

export function HowItWorksSection({ onNavigate }: { onNavigate: (sectionId: string) => void }) {
  const steps = [
    {
      number: '01',
      title: 'Choose',
      description: 'Select your pin, magnet, or mirror in round or square shape.',
      icon: Layers,
      color: 'bg-amber-100 text-amber-900',
    },
    {
      number: '02',
      title: 'Personalize',
      description: 'Send us your photo, artwork, logo, or design via website form or WhatsApp.',
      icon: Send,
      color: 'bg-emerald-100 text-emerald-900',
    },
    {
      number: '03',
      title: 'Approve',
      description: "We'll review your requirements and confirm the design proof before production.",
      icon: CheckCircle,
      color: 'bg-rose-100 text-rose-900',
    },
    {
      number: '04',
      title: 'Create & Receive',
      description: 'We create your personalized keepsakes and prepare them for collection or UAE delivery.',
      icon: PackageCheck,
      color: 'bg-purple-100 text-purple-900',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-[#FDFBF6] border-b border-[#EFE2C2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#777F56] mb-2 block">
            Simple 4-Step Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D321F] tracking-tight mb-4">
            HOW IT WORKS
          </h2>
          <p className="text-base sm:text-lg text-[#4E553D]">
            Creating your personalized keepsakes is quick, easy, and stress-free.
          </p>
        </div>

        {/* 4 Illustrated Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-8 border border-[#EFE2C2] shadow-xs hover:shadow-md transition-all duration-200 relative flex flex-col group"
              >
                {/* Step Number Badge */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif text-3xl font-extrabold text-[#777F56] opacity-90">
                    {step.number}
                  </span>
                  <div className={`p-3 rounded-2xl ${step.color}`}>
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                </div>

                {/* Step Title & Description */}
                <h3 className="font-serif text-2xl font-bold text-[#2D321F] mb-3 group-hover:text-[#777F56] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4E553D] leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('custom-orders')}
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white bg-[#777F56] hover:bg-[#636B45] rounded-full shadow-md hover:shadow-lg transition-all min-h-[48px]"
          >
            <Sparkles className="w-5 h-5 mr-2 text-[#EFC257]" aria-hidden="true" />
            Start Your Custom Order Now
          </button>
        </div>

      </div>
    </section>
  );
}
