import React from 'react';
import { ShieldCheck, Cpu, CheckCircle2, Radio, Sparkles } from 'lucide-react';

export const SystemStatusBar: React.FC = () => {
  return (
    <div className="w-full bg-slate-950/90 border-b border-white/10 text-[11px] font-mono py-1.5 px-4 sticky top-0 z-50 backdrop-blur-md overflow-x-auto whitespace-nowrap">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-slate-300">
        
        {/* Left Status Pointers */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-chalk-emerald animate-pulse" />
            <span className="text-white font-bold">System Status:</span>
            <span className="text-chalk-emerald font-semibold">KiCad DRC Passed</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-chalk-cyan" />
            <span>Patent App No. <strong className="text-white">202641089516</strong></span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 text-slate-300">
            <span className="text-chalk-amber font-semibold">TRL-3 Bench Validated</span>
          </div>
        </div>

        {/* Right Status Info */}
        <div className="hidden md:flex items-center gap-3 text-slate-400">
          <div className="flex items-center gap-1">
            <Radio className="w-3 h-3 text-chalk-cyan animate-ping" />
            <span>ESP-NOW 0.1ms RF Lock</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1">
            <span className="text-chalk-emerald">Sri Ramakrishna Engg College (SREC)</span>
          </div>
        </div>

      </div>
    </div>
  );
};
