import React from "react";
import Link from "next/link";
import { Mail, ArrowRight, Briefcase, MapPin, Clock, ShieldCheck, Sparkles } from "lucide-react";
import SectionHeading from "../Component/SectionHeading";
import { HaikeiMeshGlow } from "../Component/HaikeiDecorations";
import { COMPANY } from "../data/company";

export const metadata = {
  title: "Careers | Digital Crowd Technologies",
  description:
    "Explore career opportunities at Digital Crowd Technologies. Send your resume to join our full-stack engineering team in Hyderabad.",
  alternates: {
    canonical: "https://digitalcrowdtech.in/careers",
  },
};

export default function CareersPage() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <HaikeiMeshGlow />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#2F7DE1]/10 border border-[#2F7DE1]/30 text-[#2F7DE1] mb-6">
            <Sparkles size={13} />
            <span>Work With Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white [html.light_&]:text-[#0A2540] tracking-tight leading-tight">
            Careers at <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F7DE1] to-[#F87000]">
              Digital Crowd Technologies
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#C5CEDD] [html.light_&]:text-[#40484C] leading-relaxed">
            We are always interested in speaking with talented full-stack developers, frontend specialists, and backend engineers who value clean code and honest communication.
          </p>
        </div>
      </section>

      {/* OPENINGS STATUS */}
      <section className="py-20 bg-[#0B1220] [html.light_&]:bg-white border-b border-[#26344F]/60 [html.light_&]:border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="p-10 rounded-2xl bg-[#16223A] [html.light_&]:bg-[#F4F7FB] border border-[#26344F] [html.light_&]:border-slate-200 space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-white/5 [html.light_&]:bg-slate-200 border border-[#26344F] [html.light_&]:border-slate-300 text-[#2F7DE1] flex items-center justify-center mx-auto">
              <Briefcase size={28} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white [html.light_&]:text-[#0A2540] mb-2">
                No Current Openings
              </h2>
              <p className="text-sm text-[#8494AD] [html.light_&]:text-[#64748B] max-w-md mx-auto leading-relaxed">
                We currently do not have any open active vacancies. However, we are continuously expanding our engineering bench.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#2F7DE1]/10 border border-[#2F7DE1]/25 text-xs sm:text-sm text-[#2F7DE1] max-w-lg mx-auto leading-relaxed font-medium">
              You&apos;re welcome to send your resume for future opportunities. We retain qualified profiles and reach out whenever a new role opens.
            </div>

            <div className="pt-2">
              <a
                href={`mailto:${COMPANY.email}?subject=Resume Submission - Full Stack Engineering`}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-[#0B1220] [html.light_&]:text-white bg-[#F87000] hover:bg-[#FF8A24] rounded-full shadow-lg shadow-orange-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                <Mail size={16} />
                <span>Send Your Resume via Email</span>
              </a>
            </div>

            <div className="pt-4 text-xs text-[#8494AD] [html.light_&]:text-[#64748B]">
              Direct email: <span className="text-white [html.light_&]:text-[#0A2540] font-mono font-semibold">{COMPANY.email}</span>
            </div>
          </div>

        </div>
      </section>

      {/* WHAT WE VALUE */}
      <section className="py-16 bg-[#101A2E] [html.light_&]:bg-[#F4F7FB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Engineering Culture"
            title="What We Value in Our Engineers"
            subtitle="Skills and attitudes that thrive at Digital Crowd Technologies."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-[#16223A] [html.light_&]:bg-white border border-[#26344F] [html.light_&]:border-slate-200 shadow-md">
              <h3 className="text-sm font-bold text-white [html.light_&]:text-[#0A2540] mb-2">Modern JavaScript</h3>
              <p className="text-xs text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed">
                Deep understanding of React, Next.js, ES6+, and state management without relying on bloated libraries.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#16223A] [html.light_&]:bg-white border border-[#26344F] [html.light_&]:border-slate-200 shadow-md">
              <h3 className="text-sm font-bold text-white [html.light_&]:text-[#0A2540] mb-2">Database Integrity</h3>
              <p className="text-xs text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed">
                Comfort with relational schema modeling in MySQL, indexing, normalization, and ACID transaction safety.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#16223A] [html.light_&]:bg-white border border-[#26344F] [html.light_&]:border-slate-200 shadow-md">
              <h3 className="text-sm font-bold text-white [html.light_&]:text-[#0A2540] mb-2">Honest Communication</h3>
              <p className="text-xs text-[#8494AD] [html.light_&]:text-[#64748B] leading-relaxed">
                Clear expectations, milestone updates, proactive issue flagging, and genuine respect for client objectives.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
