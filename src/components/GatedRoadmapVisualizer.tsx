import React, { useState } from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  DollarSign, 
  AlertTriangle, 
  ChevronRight,
  Target,
  FileCheck
} from 'lucide-react';
import { ROADMAP_DATA, FUNDING_ALLOCATION, UNIT_ECONOMICS } from '../data/roadmapData';
import { sound } from '../utils/sound';

export const GatedRoadmapVisualizer: React.FC = () => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('TRL-4');

  const selectedMilestone = ROADMAP_DATA.find((m) => m.id === selectedMilestoneId) || ROADMAP_DATA[1];

  const handleSelectMilestone = (id: string) => {
    sound.playClick(800);
    setSelectedMilestoneId(id);
  };

  return (
    <div className="glass-card rounded-3xl border border-white/10 p-6 sm:p-8 bg-slate-950/90 shadow-2xl space-y-8">
      
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>Interactive Gated Milestone Visualizer</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-white tracking-tight">
            15-Month Stage-Gated Timeline (TRL 2 → TRL 9)
          </h3>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <span className="text-chalk-emerald font-bold">Total Ask: ₹23,18,850 ($27.8k)</span>
          <span>•</span>
          <span>15 Months</span>
        </div>
      </div>

      {/* Interactive Horizontal Timeline Bar */}
      <div className="relative pt-6 pb-2">
        {/* Background connector line */}
        <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-800 -translate-y-1/2 z-0 hidden md:block" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {ROADMAP_DATA.map((milestone, idx) => {
            const isSelected = selectedMilestoneId === milestone.id;
            const isCompleted = milestone.status === 'Completed';
            const isInProgress = milestone.status === 'In Progress';
            return (
              <button
                key={milestone.id}
                onClick={() => handleSelectMilestone(milestone.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-chalk-cyan shadow-xl shadow-chalk-cyan/15 scale-[1.03] ring-1 ring-chalk-cyan'
                    : isCompleted
                    ? 'bg-slate-950/80 border-chalk-emerald/40 hover:border-chalk-emerald'
                    : isInProgress
                    ? 'bg-slate-950/80 border-chalk-cyan/40 hover:border-chalk-cyan'
                    : 'bg-slate-950/50 border-white/5 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isSelected ? 'bg-chalk-cyan text-slate-950' : 'bg-white/10 text-white'
                    }`}>
                      {milestone.trlLevel}
                    </span>
                    <span className={`text-[10px] font-mono flex items-center gap-1 ${
                      isCompleted ? 'text-chalk-emerald font-bold' : isInProgress ? 'text-chalk-cyan font-bold animate-pulse' : 'text-slate-500'
                    }`}>
                      {isCompleted && <CheckCircle2 className="w-3 h-3" />}
                      {isInProgress && <Clock className="w-3 h-3" />}
                      {milestone.status}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-sm text-white line-clamp-1">
                    {milestone.title}
                  </h4>
                  <div className="text-[11px] font-mono text-chalk-amber mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{milestone.duration.split(' ')[0]} {milestone.duration.split(' ')[1]}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Budget:</span>
                  <span className="font-bold text-chalk-emerald">₹{(milestone.budgetInr / 100000).toFixed(2)}L</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Milestone Deep-Dive Box */}
      {selectedMilestone && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-chalk-cyan/30 shadow-2xl space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-chalk-cyan/20 text-chalk-cyan font-bold">
                  {selectedMilestone.phase}
                </span>
                <span className="text-xs font-mono text-chalk-amber">
                  {selectedMilestone.duration}
                </span>
              </div>
              <h4 className="font-heading font-bold text-xl sm:text-2xl text-white mt-2">
                {selectedMilestone.title}
              </h4>
            </div>

            <div className="text-right font-mono">
              <span className="text-[10px] text-slate-400 uppercase block">Phase Budget Allocation:</span>
              <div className="font-heading font-black text-2xl text-chalk-emerald">
                ₹{(selectedMilestone.budgetInr / 100000).toFixed(2)} Lakh
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Key Deliverables */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-chalk-emerald" />
                <span>Key Deliverables & Verification Criteria:</span>
              </h5>
              <ul className="space-y-2">
                {selectedMilestone.keyDeliverables.map((item, i) => (
                  <li key={i} className="text-xs font-mono text-slate-300 flex items-start gap-2 bg-slate-950/60 p-3 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-chalk-emerald shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategic Engineering De-risking */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-chalk-cyan" />
                <span>Strategic Risk De-risking & Mitigation:</span>
              </h5>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-chalk-cyan/20 space-y-2 font-mono text-xs">
                <div className="text-chalk-amber font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Phase Risk Protocol:</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {selectedMilestone.riskMitigation}
                </p>
              </div>

              {/* TRL Stage Progression Badge */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-chalk-cyan/10 to-chalk-emerald/10 border border-chalk-emerald/30 font-mono text-xs flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Gated Stage Transition:</span>
                  <span className="font-bold text-white text-sm">{selectedMilestone.trlLevel}</span>
                </div>
                <span className="text-chalk-emerald font-bold flex items-center gap-1">
                  <span>Go / No-Go Gate</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
