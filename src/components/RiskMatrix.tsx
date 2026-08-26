import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Radio, 
  Layers, 
  Building2, 
  Eye, 
  RotateCcw, 
  Sparkles,
  Filter
} from 'lucide-react';
import { sound } from '../utils/sound';

export const RiskMatrix: React.FC = () => {
  const [selectedRiskCategory, setSelectedRiskCategory] = useState<string>('All');

  const risks = [
    {
      id: 'risk-supply',
      category: 'Supply Chain',
      potentialIssue: 'Overseas component delivery bottlenecks & IC lead time delays.',
      mitigation: 'Front-loaded selection of local Coimbatore PCB fabrication and SMT assembly partners in Q1 Week 2 with secondary vendor BOM mapping.',
      severity: 'Medium',
      impact: 'Zero Timeline Slippage',
      icon: Layers,
      color: 'text-chalk-cyan',
      borderColor: 'border-chalk-cyan/40',
    },
    {
      id: 'risk-acoustic',
      category: 'Acoustic Noise',
      potentialIssue: 'Near-field acoustic echoes & ring-down on compact slates (<30cm).',
      mitigation: 'Firmware-level 300µs Guard Delay temporal gate before acoustic sampling + hardware bandpass active envelope filtering.',
      severity: 'High',
      impact: '0.24mm Multi-Path Immunity',
      icon: Radio,
      color: 'text-chalk-emerald',
      borderColor: 'border-chalk-emerald/40',
    },
    {
      id: 'risk-optical',
      category: 'Optical / Display',
      potentialIssue: 'Lack of expensive on-device LCD/OLED screen.',
      mitigation: 'Intentional headless IoT sensor architecture utilizing the teacher’s existing smartphone, classroom TV, or projector as the digital hub gateway.',
      severity: 'Low',
      impact: 'Sub-₹2,000 BOM Maintained',
      icon: Eye,
      color: 'text-chalk-amber',
      borderColor: 'border-chalk-amber/40',
    },
    {
      id: 'risk-imu',
      category: 'IMU Integration',
      potentialIssue: 'Dead-reckoning orientation integration drift over long writing sessions.',
      mitigation: 'Redundant Tactile switch + Piezo plate agreement triggering instant Zero-State Kalman Reset (ZUPT) on every single chalk touchdown.',
      severity: 'High',
      impact: 'Zero Long-Term Drift',
      icon: RotateCcw,
      color: 'text-chalk-coral',
      borderColor: 'border-chalk-coral/40',
    },
    {
      id: 'risk-emi',
      category: 'Hardware Interference',
      potentialIssue: 'Raspberry Pi / HDMI high-frequency EMI desensitizing 2.4GHz ESP-NOW WiFi receiver.',
      mitigation: 'Mandatory double-shielded braided HDMI cabling and EMI-hardened star-grounded 4-layer PCB ground planes.',
      severity: 'Medium',
      impact: '0.0% Wireless Packet Loss',
      icon: Cpu,
      color: 'text-chalk-violet',
      borderColor: 'border-chalk-violet/40',
    },
    {
      id: 'risk-gov',
      category: 'Government Adoption',
      potentialIssue: 'Bureaucratic state tender access and procurement onboarding barriers.',
      mitigation: 'Direct startup acceleration engagement with StartupTN, state incubation mentors, and direct line-item alignment with Samagra Shiksha Abhiyan (SSA) ICT budgets.',
      severity: 'Medium',
      impact: 'Direct SSA Grant Eligibility',
      icon: Building2,
      color: 'text-chalk-cyan',
      borderColor: 'border-chalk-cyan/40',
    },
  ];

  const categories = ['All', 'Supply Chain', 'Acoustic Noise', 'IMU Integration', 'Hardware Interference', 'Government Adoption'];

  const filteredRisks = risks.filter((r) => selectedRiskCategory === 'All' || r.category === selectedRiskCategory);

  return (
    <section id="risk-matrix" className="py-20 bg-slate-950 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-coral/10 border border-chalk-coral/30 text-xs font-mono text-chalk-coral mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Robust Engineering Architecture</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Risk Matrix & System Resilience
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Every technical and commercial failure mode has been anticipated with hardened hardware guardrails, local Coimbatore fabrication pipelines, and institutional StartupTN backing.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick(700);
                setSelectedRiskCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs border transition-all ${
                selectedRiskCategory === cat
                  ? 'bg-chalk-cyan/20 border-chalk-cyan text-chalk-cyan font-bold shadow-md shadow-chalk-cyan/10'
                  : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 6-Risk Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRisks.map((risk) => {
            const Icon = risk.icon;
            return (
              <div
                key={risk.id}
                className={`glass-card rounded-2xl p-6 border ${risk.borderColor} bg-slate-950/80 shadow-2xl flex flex-col justify-between space-y-4`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                      {risk.category}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      risk.severity === 'High' ? 'bg-chalk-coral/20 text-chalk-coral' : 'bg-chalk-amber/20 text-chalk-amber'
                    }`}>
                      {risk.severity} Risk
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${risk.color}`} />
                    <h3 className="font-heading font-bold text-base text-white">
                      {risk.category}
                    </h3>
                  </div>

                  {/* Potential Issue */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-chalk-coral/20 font-mono text-xs text-slate-300 mb-3 space-y-1">
                    <span className="text-[10px] text-chalk-coral uppercase block font-bold">
                      ⚠ Potential Failure Mode:
                    </span>
                    <p className="text-[11px] text-slate-200">
                      {risk.potentialIssue}
                    </p>
                  </div>

                  {/* Strategic Mitigation */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-chalk-emerald/30 font-mono text-xs text-slate-300 space-y-1">
                    <span className="text-[10px] text-chalk-emerald uppercase block font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Strategic Engineering Mitigation:
                    </span>
                    <p className="text-[11px] text-slate-200 leading-relaxed">
                      {risk.mitigation}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>System Resilience:</span>
                  <span className="text-chalk-emerald font-bold">{risk.impact}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
