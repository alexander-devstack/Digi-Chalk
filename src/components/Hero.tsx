import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  Cpu, 
  Activity, 
  Zap, 
  Layers, 
  TrendingUp, 
  Check,
  ChevronDown
} from 'lucide-react';
import { ChalkCanvas } from './ChalkCanvas';
import { TelemetryHUD } from './TelemetryHUD';
import { sound } from '../utils/sound';

interface HeroProps {
  onOpenPitchDeck: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPitchDeck }) => {
  const [penPosition, setPenPosition] = useState({ x: 320, y: 220, pressure: 0, isDrawing: false });

  const handlePenMove = (x: number, y: number, pressure: number, isDrawing: boolean) => {
    if (x > 0 && y > 0) {
      setPenPosition({ x, y, pressure, isDrawing });
    } else {
      setPenPosition((prev) => ({ ...prev, isDrawing: false }));
    }
  };

  const keyStats = [
    { label: 'Hardware BOM Unit Cost', value: '₹2,000', sub: 'vs ₹85,000 Smartboard', highlight: 'text-chalk-emerald' },
    { label: 'Acoustic Tracking Latency', value: '0.1 ms', sub: 'ESP-NOW Direct Link', highlight: 'text-chalk-cyan' },
    { label: 'Multilateration Precision', value: '±0.24 mm', sub: 'Sub-millimeter TDOA', highlight: 'text-chalk-amber' },
    { label: 'Classroom Digital Equity', value: '90%', sub: 'Zero-Infra Retrofit', highlight: 'text-chalk-coral' },
  ];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-blackboard">
      
      {/* Background Glow Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-chalk-cyan/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[300px] bg-chalk-emerald/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Patent & TRL Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-chalk-cyan/30 text-xs font-mono text-slate-300 shadow-xl shadow-chalk-cyan/10 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-chalk-cyan" />
            <span className="text-chalk-cyan font-bold">Provisional Patent Filed</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200">App No. 202641089516</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-chalk-emerald font-semibold">TRL-2 → TRL-9 Pathway</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1]">
            Making Every Blackboard a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-chalk-cyan via-chalk-emerald to-chalk-amber neon-text-cyan">
              Digital Classroom.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-white font-semibold">Digi-Chalk</strong> is an edge-computed hardware retrofit that transforms standard slate and green blackboards into real-time interactive digital hubs at <strong className="text-chalk-emerald font-semibold">₹2,000 per unit</strong>—bringing digital equity to the <span className="text-chalk-cyan font-semibold">90% of classrooms</span> left behind by ₹80,000+ smartboards.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            
            {/* Primary Glow CTA */}
            <a
              href="#live-slate"
              onClick={() => sound.playClick(900)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-chalk-cyan to-chalk-emerald text-slate-950 font-heading font-bold text-sm flex items-center gap-2 shadow-lg shadow-chalk-cyan/25 hover:shadow-chalk-cyan/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Explore Interactive Demo</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </a>

            {/* Secondary Glass Playbook CTA */}
            <button
              onClick={() => {
                sound.playClick(1000);
                onOpenPitchDeck();
              }}
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/15 hover:border-chalk-cyan/40 text-slate-200 hover:text-white font-heading font-semibold text-sm flex items-center gap-2 backdrop-blur-md transition-all active:scale-[0.98]"
            >
              <Download className="w-4 h-4 text-chalk-cyan" />
              <span>Download Pitch Playbook (₹13L Round)</span>
            </button>

            {/* Tertiary Schematics CTA */}
            <a
              href="#bom-schematics"
              onClick={() => sound.playClick(750)}
              className="px-4 py-3.5 rounded-xl bg-slate-900/40 hover:bg-white/5 border border-white/10 text-slate-300 hover:text-chalk-emerald font-mono text-xs flex items-center gap-2 transition-all"
            >
              <Cpu className="w-4 h-4 text-chalk-emerald" />
              <span>View KiCad & Schematics</span>
            </a>

          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-10">
          {keyStats.map((stat) => (
            <div key={stat.label} className="p-3.5 rounded-xl glass-card border border-white/5 text-center">
              <div className={`font-heading font-black text-2xl ${stat.highlight}`}>
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5">{stat.label}</div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Live Slate & Telemetry HUD Interactive Showcase Container */}
        <div id="live-slate" className="mt-12 space-y-4 scroll-mt-24">
          
          <div className="flex flex-wrap items-center justify-between gap-3 px-2">
            <div>
              <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-chalk-cyan animate-ping" />
                Live Blackboard Simulator & Edge AI Recognizer
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Draw rough sketches below with mouse/touch to test real-time MobileNetV3-small geometric beautification and acoustic TDOA telemetry.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-white/10">
              <Activity className="w-3.5 h-3.5 text-chalk-emerald" />
              <span>Tracking Engine: Active</span>
            </div>
          </div>

          {/* Interactive Chalk Canvas Surface */}
          <ChalkCanvas onPenMove={handlePenMove} />

          {/* Live Telemetry HUD Feed */}
          <TelemetryHUD penPosition={penPosition} />

        </div>

      </div>

    </section>
  );
};
