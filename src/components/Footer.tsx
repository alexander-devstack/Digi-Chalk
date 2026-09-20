import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Cpu, 
  Activity, 
  BookOpen, 
  FileText, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { sound } from '../utils/sound';

interface FooterProps {
  onOpenPitchDeck: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPitchDeck }) => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-chalk-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1 & 2: Branding & Patent Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-chalk-cyan to-chalk-emerald p-[1.5px]">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <span className="font-heading font-black text-base text-chalk-cyan">DC</span>
                </div>
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                DIGI-CHALK
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              An edge-computed hardware retrofit transforming standard slate & green blackboards into real-time interactive digital hubs at ₹2,000 per unit.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 space-y-1 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-chalk-cyan font-semibold">
                <ShieldCheck className="w-4 h-4 text-chalk-cyan" />
                <span>Provisional Patent Application Filed</span>
              </div>
              <div className="text-slate-400">
                Application Number: <strong className="text-white">202641089516</strong>
              </div>
              <div className="text-slate-500 text-[10px]">
                Filed with the Indian Patent Office (IPO)
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-200">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <a href="#live-slate" className="hover:text-chalk-cyan transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> Live Slate Canvas
                </a>
              </li>
              <li>
                <a href="#tdoa-physics" className="hover:text-chalk-cyan transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> TDOA Multilateration
                </a>
              </li>
              <li>
                <a href="#hardware-explorer" className="hover:text-chalk-cyan transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> 3D Exploded View
                </a>
              </li>
              <li>
                <a href="#edge-ai" className="hover:text-chalk-cyan transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> MobileNetV3 Edge AI
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Economics */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-200">
              Economics & Specs
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>
                <a href="#lecture-sync" className="hover:text-chalk-emerald transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> Lecture Audio Sync
                </a>
              </li>
              <li>
                <a href="#roi-calculator" className="hover:text-chalk-emerald transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> School Budget ROI
                </a>
              </li>
              <li>
                <a href="#bom-schematics" className="hover:text-chalk-emerald transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> Bill of Materials (BOM)
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-chalk-emerald transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" /> ₹23L Seed Roadmap
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Investor Actions */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-200">
              Investor Relations
            </h4>
            <p className="text-[11px] font-mono text-slate-400">
              Seeking ₹23.18 Lakhs for 50-classroom pilot deployment & regulatory certs.
            </p>
            <a
              href="/Digi-Chalk_Business_Model_23L.pdf"
              download="Digi-Chalk_Business_Model_23L.pdf"
              onClick={() => sound.playClick(900)}
              className="w-full py-2 px-3 rounded-xl bg-chalk-cyan/20 hover:bg-chalk-cyan/30 border border-chalk-cyan/40 text-chalk-cyan font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-chalk-cyan/10"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pitch Playbook (₹23L)</span>
            </a>
          </div>

        </div>

        {/* Bottom Credits Strip */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 <strong className="text-slate-300">Team Zero Resistance</strong>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with deep-tech for</span>
            <span className="text-chalk-emerald font-bold">100% Digital Classroom Equity</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
