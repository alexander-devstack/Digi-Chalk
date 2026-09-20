import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Layers, 
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { COMMERCIALIZATION_ROADMAP } from '../data/roadmapData';
import { sound } from '../utils/sound';

interface RoadmapTimelineProps {
  onOpenPitchDeck: () => void;
}

export const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ onOpenPitchDeck }) => {
  return (
    <section id="commercialization-roadmap" className="py-20 bg-slate-900/40 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>15-Month Gated Commercialization Pathway</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            TRL-2 to TRL-9 Roadmap (₹23L Seed Round)
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            A structured, risk-mitigated pathway moving from bench prototype to 50-classroom district pilots and state education tender onboarding.
          </p>
        </div>

        {/* 2-Column Grid: Phase A vs Phase B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Phase A: Path to TRL-6 (Months 1–6) — ₹2,64,850 */}
          <div className="slate-card p-6 sm:p-7 border border-chalk-cyan/30 bg-slate-950/80 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chalk-cyan/20 text-chalk-cyan font-bold uppercase">
                  Phase A • Months 1–6
                </span>
                <h3 className="font-heading font-bold text-xl text-white mt-1.5">
                  Path to TRL-6 (Prototyping & Pilot)
                </h3>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] text-slate-400 uppercase block">Phase Budget:</span>
                <div className="font-heading font-black text-2xl text-chalk-cyan">₹2,64,850</div>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {COMMERCIALIZATION_ROADMAP.phaseA.items.map((item, idx) => (
                <div key={item.phase} className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-heading">{item.phase}</span>
                    <span className="font-bold text-chalk-cyan">₹{item.budgetInr.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-chalk-cyan/10 border border-chalk-cyan/20 font-mono text-xs text-chalk-cyan flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Milestone Exit Gate: 15-classroom functional pilot validation</span>
            </div>

          </div>

          {/* Phase B: Path to TRL-9 Scale (Months 7–15) — ₹20,54,000 */}
          <div className="slate-card p-6 sm:p-7 border border-chalk-emerald/30 bg-slate-950/80 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chalk-emerald/20 text-chalk-emerald font-bold uppercase">
                  Phase B • Months 7–15
                </span>
                <h3 className="font-heading font-bold text-xl text-white mt-1.5">
                  Path to TRL-9 (Mass Scale & Tenders)
                </h3>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] text-slate-400 uppercase block">Phase Budget:</span>
                <div className="font-heading font-black text-2xl text-chalk-emerald">₹20,54,000</div>
              </div>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {COMMERCIALIZATION_ROADMAP.phaseB.items.map((item, idx) => (
                <div key={item.phase} className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white font-heading">{item.phase}</span>
                    <span className="font-bold text-chalk-emerald">₹{item.budgetInr.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-chalk-emerald/10 border border-chalk-emerald/20 font-mono text-xs text-chalk-emerald flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Milestone Exit Gate: BIS wireless compliance & GeM portal tender eligibility</span>
            </div>

          </div>

        </div>

        {/* Pitch Playbook Banner CTA */}
        <div className="slate-card p-6 sm:p-8 border border-white/10 bg-slate-950 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-lg text-white">
              Total Seed Funding Ask: <strong className="text-chalk-cyan">₹23,18,850 ($27.8k)</strong>
            </h4>
            <p className="text-xs font-mono text-slate-400">
              Covers complete TRL-2 through TRL-9 commercialization over 15 months.
            </p>
          </div>

          <a
            href="/Digi-Chalk_Business_Model_23L.pdf"
            download="Digi-Chalk_Business_Model_23L.pdf"
            onClick={() => sound.playClick(900)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-chalk-cyan to-chalk-emerald text-slate-950 font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-sky-500/15 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Download Pitch Playbook (₹23L)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
