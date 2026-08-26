import React from 'react';
import { 
  TrendingUp, 
  Users, 
  PieChart, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  Calendar,
  DollarSign,
  Target
} from 'lucide-react';
import { ROADMAP_DATA, FUNDING_ALLOCATION, UNIT_ECONOMICS } from '../data/roadmapData';
import { sound } from '../utils/sound';

interface RoadmapPitchDeckProps {
  onOpenPitchDeck: () => void;
}

export const RoadmapPitchDeck: React.FC<RoadmapPitchDeckProps> = ({ onOpenPitchDeck }) => {
  return (
    <section id="roadmap" className="py-20 bg-slate-900/40 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>15-Month Gated Commercialization Pathway</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            TRL-2 to TRL-9 Roadmap & ₹13L Seed Round
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            A structured <strong className="text-white">15-Month Gated Milestone Architecture</strong> backed by a <strong className="text-chalk-emerald">₹13,00,000 ($15.5k)</strong> seed round to take Digi-Chalk from prototype to mass production and 50-school classroom deployment.
          </p>
        </div>

        {/* Top Key Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 font-mono text-center">
          <div className="p-4 rounded-2xl glass-card border border-white/10">
            <span className="text-xs text-slate-400">Total Seed Round</span>
            <div className="font-heading font-black text-2xl text-white mt-1">₹13,00,000</div>
            <span className="text-[10px] text-chalk-cyan">$15.5k USD Target</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/10">
            <span className="text-xs text-slate-400">Gated Timeline</span>
            <div className="font-heading font-black text-2xl text-chalk-amber mt-1">15 Months</div>
            <span className="text-[10px] text-slate-400">4 Stage-Gated Phases</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/10">
            <span className="text-xs text-slate-400">Breakeven Volume</span>
            <div className="font-heading font-black text-2xl text-chalk-emerald mt-1">1,058 – 1,376</div>
            <span className="text-[10px] text-chalk-emerald">Units (₹10L Op Cost)</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/10">
            <span className="text-xs text-slate-400">Pilot Deployment</span>
            <div className="font-heading font-black text-2xl text-chalk-cyan mt-1">50 Schools</div>
            <span className="text-[10px] text-slate-400">Tamil Nadu SSA Pilot</span>
          </div>
        </div>

        {/* Milestone Timeline (4 Phases across 15 Months) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ROADMAP_DATA.map((milestone) => {
            const isCompleted = milestone.status === 'Completed';
            const isInProgress = milestone.status === 'In Progress';
            return (
              <div
                key={milestone.id}
                className={`glass-card rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                  isCompleted
                    ? 'border-chalk-emerald/40 bg-slate-950/80'
                    : isInProgress
                    ? 'border-chalk-cyan/60 bg-slate-900/90 shadow-lg shadow-chalk-cyan/10 ring-1 ring-chalk-cyan/30'
                    : 'border-white/10 bg-slate-950/60 opacity-85'
                }`}
              >
                <div>
                  {/* Status & TRL Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                      {milestone.trlLevel}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                        isCompleted
                          ? 'bg-chalk-emerald/20 text-chalk-emerald font-bold'
                          : isInProgress
                          ? 'bg-chalk-cyan/20 text-chalk-cyan font-bold animate-pulse'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                      {isInProgress && <Clock className="w-3 h-3" />}
                      {milestone.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-white mb-1">
                    {milestone.title}
                  </h3>
                  <div className="text-xs font-mono text-chalk-amber mb-3 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{milestone.duration}</span>
                  </div>

                  {/* Key Deliverables */}
                  <ul className="space-y-2 mb-4">
                    {milestone.keyDeliverables.map((item, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-chalk-cyan shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span className="text-chalk-emerald font-bold">Budget:</span>
                  <span className="text-white font-bold">₹{(milestone.budgetInr / 100000).toFixed(2)} Lakh</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ₹13,00,000 ($15.5k) Fund Allocation Breakdown Card */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 bg-slate-950/90 shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 6 Cols: Allocation Stats */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-emerald/10 border border-chalk-emerald/30 text-xs font-mono text-chalk-emerald">
                <PieChart className="w-3.5 h-3.5" />
                <span>Seed Round Use of Funds</span>
              </div>
              <h3 className="font-heading font-extrabold text-3xl text-white tracking-tight">
                ₹13,00,000 ($15.5k) Capital Allocation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
                Directly budgeted to execute the 15-month gated milestones: tooling, 50-school Tamil Nadu pilot deployment, and BIS regulatory wireless certification.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    sound.playClick(900);
                    onOpenPitchDeck();
                  }}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-chalk-cyan to-chalk-emerald text-slate-950 font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-chalk-cyan/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open Full Pitch Deck Playbook</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right 6 Cols: Breakdown Progress Bars */}
            <div className="lg:col-span-6 space-y-3 font-mono text-xs">
              {FUNDING_ALLOCATION.breakdown.map((item) => (
                <div key={item.category} className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-200 font-semibold">{item.category}</span>
                    <span className="font-bold text-white">
                      ₹{(item.amountInr / 100000).toFixed(2)} Lakh ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Team Zero Resistance Credentials Card */}
        <div className="p-6 rounded-2xl glass-card border border-white/10 bg-slate-950/80 text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-amber/10 border border-chalk-amber/30 text-xs font-mono text-chalk-amber">
            <Users className="w-3.5 h-3.5" />
            <span>Founding Team</span>
          </div>
          <h4 className="font-heading font-bold text-xl text-white">
            Team Zero Resistance
          </h4>
          <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed font-mono">
            Embedded firmware architects, acoustic signal processing researchers, and edge AI developers building hardware for the next 100M Indian students.
          </p>
          <div className="pt-2 text-[11px] font-mono text-slate-400">
            Provisional Patent App No. 202641089516 • Indian Patent Office
          </div>
        </div>

      </div>
    </section>
  );
};
