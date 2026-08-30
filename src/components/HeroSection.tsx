import React from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  Cpu, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  TrendingUp, 
  Sliders
} from 'lucide-react';
import { InteractiveSlate } from './InteractiveSlate';
import { sound } from '../utils/sound';

interface HeroSectionProps {
  onOpenPitchDeck: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPitchDeck }) => {
  const stats = [
    { label: 'Direct Production COGS', value: '₹1,055', sub: 'Target BOM (100+ units)', color: 'text-chalk-emerald' },
    { label: 'Unit Retail Price', value: '₹2,000', sub: 'vs ₹80k+ Smartboard', color: 'text-chalk-cyan' },
    { label: 'Tracking Precision', value: '±0.24 mm', sub: '40kHz TDOA Multilateration', color: 'text-chalk-amber' },
    { label: 'Setup Duration', value: '< 5 Mins', sub: 'Tool-Free Magnetic Snap', color: 'text-white' },
  ];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-slate-linear overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-white/10 text-xs font-mono text-slate-300 shadow-md">
            <ShieldCheck className="w-4 h-4 text-chalk-cyan" />
            <span className="text-chalk-cyan font-semibold">Provisional Patent Filed</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-200">App No. 202641089516</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-chalk-emerald font-medium">TRL-2 → TRL-9 Pathway</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
            Making Every Blackboard a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-chalk-cyan via-chalk-emerald to-chalk-amber">
              Digital Classroom.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans">
            <strong className="text-white">Digi-Chalk</strong> is an edge-computed hardware retrofit that transforms standard blackboards into real-time interactive digital hubs for <strong className="text-chalk-emerald">₹2,000 per unit</strong>—bringing digital equity to the <span className="text-chalk-cyan font-medium">90% of classrooms</span> left behind by high-cost smartboards.
          </p>

          {/* CTA Buttons Group */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            
            <a
              href="#interactive-slate"
              onClick={() => sound.playClick(900)}
              className="px-6 py-3.5 rounded-xl bg-chalk-cyan hover:bg-sky-400 text-slate-950 font-heading font-bold text-sm flex items-center gap-2 shadow-lg shadow-sky-500/15 transition-all active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Try Interactive Slate Demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                sound.playClick(800);
                onOpenPitchDeck();
              }}
              className="px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-slate-200 hover:text-white font-heading font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-chalk-cyan" />
              <span>Pitch Playbook (₹13L Round)</span>
            </button>

          </div>
        </div>

        {/* Quick Highlights Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-10">
          {stats.map((stat) => (
            <div key={stat.label} className="slate-card p-3.5 text-center border border-white/5 bg-slate-900/60">
              <div className={`font-heading font-bold text-2xl ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5">{stat.label}</div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Minimalist Digital Blackboard Sandbox */}
        <div id="interactive-slate" className="mt-12 space-y-3 scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-chalk-cyan animate-ping" />
              Minimalist Digital Blackboard Sandbox
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Freehand sketch to test MobileNetV3 geometric beautification
            </span>
          </div>

          <InteractiveSlate />
        </div>

      </div>
    </section>
  );
};
