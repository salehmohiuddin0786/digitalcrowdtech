"use client";

import React from "react";
import {
  Sliders,
  Code2,
  Smartphone,
  Package,
  ShieldCheck,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { SpotlightCard } from "./SpotlightCard";

export default function WhyChooseSection({ id = "why-choose", className = "" }) {
  const cards = [
    {
      number: "01",
      title: "Customized Solutions",
      description:
        "We develop solutions according to your business requirements instead of forcing you to use generic software.",
      icon: Sliders,
      accentColor: "#2F7DE1",
      spotlight: "rgba(47, 125, 225, 0.16)",
      tag: "Tailored Engineering",
    },
    {
      number: "02",
      title: "Modern Technology",
      description:
        "We use modern technologies and scalable architecture to build reliable digital products.",
      icon: Code2,
      accentColor: "#F87000",
      spotlight: "rgba(248, 112, 0, 0.16)",
      tag: "Scalable Architecture",
    },
    {
      number: "03",
      title: "User-Friendly Experience",
      description:
        "We focus on intuitive interfaces, smooth navigation, and responsive experiences across devices.",
      icon: Smartphone,
      accentColor: "#10B981",
      spotlight: "rgba(16, 185, 129, 0.16)",
      tag: "Intuitive UI/UX",
    },
    {
      number: "04",
      title: "Complete Digital Solutions",
      description:
        "From websites and applications to business management systems, we provide integrated digital solutions.",
      icon: Package,
      accentColor: "#8B5CF6",
      spotlight: "rgba(139, 92, 246, 0.16)",
      tag: "End-to-End Delivery",
    },
    {
      number: "05",
      title: "Reliable Support",
      description:
        "We help clients with implementation, troubleshooting, maintenance, and technical support.",
      icon: ShieldCheck,
      accentColor: "#06B6D4",
      spotlight: "rgba(6, 182, 212, 0.16)",
      tag: "Continuous SLA",
    },
    {
      number: "06",
      title: "Business-Focused Approach",
      description:
        "We understand business requirements and develop technology that improves productivity and customer experience.",
      icon: Target,
      accentColor: "#EC4899",
      spotlight: "rgba(236, 72, 153, 0.16)",
      tag: "Measurable Impact",
    },
  ];

  return (
    <section
      id={id}
      className={`py-20 md:py-28 bg-transparent border-b border-white/5 [html.light_&]:border-slate-200/80 relative overflow-hidden ${className}`}
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-[#2F7DE1]/10 blur-[130px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[250px] bg-[#F87000]/10 blur-[130px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          badge="The Digital Crowd Tech Advantage"
          title="Why Choose Digital Crowd Tech?"
          subtitle="We combine technology, creativity, and innovation to build digital solutions that help businesses grow, operate efficiently, and stay ahead."
        />

        {/* 6 Cards Responsive Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <SpotlightCard
                key={card.title}
                spotlightColor={card.spotlight}
                className="p-7 sm:p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 shadow-xl relative overflow-hidden"
              >
                <div>
                  {/* Card Header: Number & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-inner"
                      style={{
                        backgroundColor: `${card.accentColor}15`,
                        border: `1px solid ${card.accentColor}35`,
                        color: card.accentColor,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/5 font-semibold">
                        {card.tag}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {card.number}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-white [html.light_&]:text-[#0A2540] group-hover:text-white transition-colors mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 [html.light_&]:text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Subtle Card Footer Indicator */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <CheckCircle2 size={13} />
                    Verified Standard
                  </span>
                  <span
                    className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                    style={{ backgroundColor: card.accentColor }}
                  />
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
