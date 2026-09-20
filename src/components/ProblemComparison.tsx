import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Sparkles, 
  ShieldCheck,
  Zap,
  TrendingDown
} from 'lucide-react';

export const ProblemComparison: React.FC = () => {
  const comparisonRows = [
    {
      metric: 'Unit Cost',
      smartBoard: '₹80,000 – ₹2,00,000+',
      projectorKit: '₹25,000 – ₹50,000',
      digiChalk: '₹45,000 (Target BOM ₹9,270)',
      isHighlight: true,
    },
    {
      metric: 'Target Segment',
      smartBoard: 'Elite Private Schools (Top 10%)',
      projectorKit: 'Mid-Tier Urban Schools',
      digiChalk: 'Government & Low-Income Schools (90%)',
      isHighlight: false,
    },
    {
      metric: 'Classroom Impact',
      smartBoard: 'Full Board Replacement (Fragile LCD)',
      projectorKit: 'Add-on, Still Capital & Bulb Heavy',
      digiChalk: 'Add-on Retrofit to Existing Slate Board',
      isHighlight: false,
    },
    {
      metric: 'Pedagogy & Habit',
      smartBoard: 'Requires Extensive Teacher Retraining',
      projectorKit: 'Screen-Dependent & Shadow Occlusion',
      digiChalk: 'Zero Behavior Change (Natural Real Chalk)',
      isHighlight: true,
    },
    {
      metric: 'Setup & Installation',
      smartBoard: 'Permanent Wall Drilling (3–5 Days)',
      projectorKit: 'Ceiling Rigging & Regular Recalibration',
      digiChalk: '< 5-Minute Tool-Free Magnetic Setup',
      isHighlight: false,
    },
  ];

  return (
    <section id="problem-comparison" className="py-20 bg-slate-900/60 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-coral/10 border border-chalk-coral/30 text-xs font-mono text-chalk-coral mb-3">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>The Rural Classroom Divide</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            The Digital Divide & The Retrofit Paradigm
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Current technology availability in rural Indian schools is only <strong className="text-chalk-coral font-semibold">8–10%</strong>. Digi-Chalk replaces expensive replacement cycles with an ultra-low-cost, non-invasive hardware retrofit.
          </p>
        </div>

        {/* Clean Linear-style Comparison Table */}
        <div className="slate-card overflow-hidden border border-white/10 shadow-2xl bg-slate-950/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-slate-400 bg-slate-900/90">
                  <th className="py-4 px-4 sm:px-6 font-bold text-slate-300">Metric</th>
                  <th className="py-4 px-4 sm:px-6 text-slate-400">Commercial Smart-Boards</th>
                  <th className="py-4 px-4 sm:px-6 text-slate-400">Projector-Based Kits</th>
                  <th className="py-4 px-4 sm:px-6 text-chalk-emerald font-bold bg-chalk-emerald/5 border-l border-chalk-emerald/20">
                    ★ Digi-Chalk Retrofit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr 
                    key={row.metric} 
                    className={`hover:bg-white/[0.02] transition-colors ${row.isHighlight ? 'bg-white/[0.01]' : ''}`}
                  >
                    <td className="py-4 px-4 sm:px-6 font-semibold text-slate-200 font-heading">
                      {row.metric}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-chalk-coral shrink-0" />
                        <span>{row.smartBoard}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-chalk-amber shrink-0" />
                        <span>{row.projectorKit}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-chalk-emerald bg-chalk-emerald/5 border-l border-chalk-emerald/20">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-chalk-emerald shrink-0" />
                        <span>{row.digiChalk}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
