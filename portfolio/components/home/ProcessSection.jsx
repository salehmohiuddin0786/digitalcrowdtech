'use client';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/animations';
import { PROCESS_STEPS } from '@/lib/data';
import { Sparkles } from 'lucide-react';

export default function ProcessSection() {
  return (
    <section className="relative z-10 py-24 lg:py-32" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 mb-3 backdrop-blur-md">
            <Sparkles size={13} className="text-blue-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-300">
              Methodology
            </span>
          </div>
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            How We <span className="text-gradient-orange">Build</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto mt-3">
            A structured, transparent engineering lifecycle designed to eliminate surprise costs and guarantee high-velocity shipping.
          </p>
        </SectionReveal>

        {/* Desktop Connected Horizontal Flow */}
        <div className="hidden lg:block relative mb-12">
          {/* Glowing connecting line */}
          <div
            className="absolute top-10 left-8 right-8 h-px bg-gradient-to-r from-blue-500/10 via-blue-400/40 to-orange-500/20"
            aria-hidden="true"
          />

          <StaggerContainer className="grid grid-cols-7 gap-3">
            {PROCESS_STEPS.map((step) => (
              <StaggerItem key={step.number}>
                <div className="group relative flex flex-col items-center text-center">
                  
                  {/* Step Number Capsule */}
                  <div className="relative mb-5 z-10">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-[#0A192F]/80 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:border-blue-400/50 group-hover:shadow-[0_0_25px_rgba(0,102,255,0.35)]">
                      <span className="font-mono text-lg font-extrabold text-blue-300 group-hover:text-orange-400 transition-colors">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Mobile Vertical Connected Timeline */}
        <div className="lg:hidden relative pl-8 space-y-8">
          <div
            className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/40 via-blue-400/30 to-orange-500/40"
            aria-hidden="true"
          />

          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="relative">
              <div
                className="absolute -left-8 top-0 flex h-8 w-8 items-center justify-center rounded-xl border border-blue-400/40 bg-[#0A192F] font-mono text-xs font-bold text-blue-300 shadow-md"
                aria-hidden="true"
              >
                {step.number}
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0A192F]/40 p-5 backdrop-blur-xl">
                <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
