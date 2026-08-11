'use client';

import { Heart, ShieldCheck, Award, Sparkles } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="story" className="py-16 lg:py-24 bg-[#FDFBF7] border-b border-[#EAE2D5]/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl border border-[#EAE2D5] p-8 sm:p-12 lg:p-16 shadow-sm relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Header Tag */}
            <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51] mb-3 block">
              About Printed Memoirs
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#362C2B] tracking-tight mb-8">
              OUR STORY
            </h2>

            {/* Story Text matching prompt text exactly */}
            <div className="space-y-6 text-base sm:text-lg text-[#5C4D4A] leading-relaxed text-left sm:text-justify font-normal">
              
              <p className="font-serif italic text-xl text-[#362C2B] text-center border-y border-[#EAE2D5] py-4 my-6">
                &quot;At Printed Memoirs, we believe that the smallest things can hold the biggest memories.&quot;
              </p>

              <p>
                A photograph from a special trip. A favorite illustration. A meaningful logo. A moment worth remembering.
              </p>

              <p>
                We turn these memories and designs into personalized pins, magnets, and mirrors that you can keep, share, and enjoy.
              </p>

              <p>
                Each piece is created with care and attention to detail because we understand that behind every design is a story.
              </p>

              <p>
                Whether you&apos;re creating something for yourself, looking for a unique gift, preparing souvenirs for a special celebration, or ordering merchandise for your business or event, Printed Memoirs is here to bring your ideas to life.
              </p>

            </div>

            {/* Slogan Footer Callout */}
            <div className="mt-12 pt-8 border-t border-[#EAE2D5] text-center">
              <p className="text-sm font-semibold tracking-widest uppercase text-[#8C7A78] mb-1">
                Your memory. Your design. Your keepsake.
              </p>
              <p className="font-serif text-2xl font-bold text-[#C86D51]">
                Printed Memoirs.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
