import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  School, 
  Calculator, 
  ShieldCheck, 
  Users, 
  DollarSign, 
  CheckCircle2,
  PieChart,
  Layers,
  ArrowRight
} from 'lucide-react';
import { MARKET_DATA_TN } from '../data/roadmapData';
import { sound } from '../utils/sound';

export const MarketEconomics: React.FC = () => {
  const [numSchools, setNumSchools] = useState(500);
  const unitsPerSchool = 2;
  const unitPrice = 45000;
  const unitCogs = 9270;
  const unitMargin = 35730;
  const smartBoardCostPerClassroom = 100000; // ₹1.0L

  const totalUnits = numSchools * unitsPerSchool;
  const totalRevenue = totalUnits * unitPrice;
  const totalGrossProfit = totalUnits * unitMargin;
  const smartBoardTotalCost = totalUnits * smartBoardCostPerClassroom;
  const totalCapitalSaved = smartBoardTotalCost - totalRevenue;
  const capexReductionPercent = Math.round(((smartBoardTotalCost - totalRevenue) / smartBoardTotalCost) * 100);
  const totalStudentsReached = totalUnits * 40; // avg 40 students per classroom

  const formatLakhs = (inr: number) => {
    if (inr >= 10000000) {
      return `₹${(inr / 10000000).toFixed(2)} Cr`;
    }
    if (inr >= 100000) {
      return `₹${(inr / 100000).toFixed(2)} Lakh`;
    }
    return `₹${inr.toLocaleString('en-IN')}`;
  };

  return (
    <section id="market-economics" className="py-20 bg-slate-950 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-emerald/10 border border-chalk-emerald/30 text-xs font-mono text-chalk-emerald mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Market Sizing & Unit Economics</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Tamil Nadu SSA Market & Unit Economics
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Targeting the <strong className="text-white">Samagra Shiksha Abhiyan (SSA) ICT funding channel</strong> across Tamil Nadu's 37,626 government schools.
          </p>
        </div>

        {/* TAM / SAM / SOM Table */}
        <div className="slate-card p-6 border border-white/10 bg-slate-900/80 shadow-2xl mb-12">
          <h3 className="font-heading font-bold text-base text-white mb-4 flex items-center gap-2">
            <School className="w-4 h-4 text-chalk-cyan" />
            <span>Geographic Opportunity: Tamil Nadu Government Schools (SSA Channel)</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3.5 px-4 font-bold text-slate-300">Market Tier</th>
                  <th className="py-3.5 px-4 text-slate-400">Coverage & Basis</th>
                  <th className="py-3.5 px-4 text-right text-chalk-emerald font-bold">Financial Valuation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans text-xs sm:text-sm">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-bold text-white font-heading">
                    {MARKET_DATA_TN.tam.label}
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-mono text-xs">
                    {MARKET_DATA_TN.tam.basis}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-white font-heading text-base">
                    {MARKET_DATA_TN.tam.value}
                  </td>
                </tr>

                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-bold text-chalk-cyan font-heading">
                    {MARKET_DATA_TN.sam.label}
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-mono text-xs">
                    {MARKET_DATA_TN.sam.basis}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-chalk-cyan font-heading text-base">
                    {MARKET_DATA_TN.sam.value}
                  </td>
                </tr>

                <tr className="hover:bg-white/[0.02] transition-colors bg-chalk-emerald/[0.03]">
                  <td className="py-4 px-4 font-bold text-chalk-emerald font-heading">
                    {MARKET_DATA_TN.som.label}
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-mono text-xs">
                    {MARKET_DATA_TN.som.basis}
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-chalk-emerald font-heading text-base">
                    {MARKET_DATA_TN.som.value}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Unit Economics Snapshot Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 font-mono text-center">
          <div className="slate-card p-4 border border-white/5 bg-slate-900/60">
            <span className="text-[11px] text-slate-400 block uppercase">Procurement Price:</span>
            <div className="font-heading font-black text-2xl text-white mt-1">₹45,000</div>
            <span className="text-[10px] text-slate-400">per classroom retrofit</span>
          </div>

          <div className="slate-card p-4 border border-white/5 bg-slate-900/60">
            <span className="text-[11px] text-slate-400 block uppercase">Volume Production Cost:</span>
            <div className="font-heading font-black text-2xl text-chalk-amber mt-1">₹9,270</div>
            <span className="text-[10px] text-slate-400">Kit COGS (1,000-unit vol)</span>
          </div>

          <div className="slate-card p-4 border border-chalk-emerald/30 bg-slate-900/80">
            <span className="text-[11px] text-chalk-emerald block uppercase font-bold">Gross Margin:</span>
            <div className="font-heading font-black text-2xl text-chalk-emerald mt-1">₹35,730</div>
            <span className="text-[10px] text-chalk-emerald font-semibold">79.4% Margin</span>
          </div>

          <div className="slate-card p-4 border border-white/5 bg-slate-900/60">
            <span className="text-[11px] text-slate-400 block uppercase">Operational Breakeven:</span>
            <div className="font-heading font-black text-2xl text-chalk-cyan mt-1">28 – 35</div>
            <span className="text-[10px] text-slate-400">Units (₹10L Op Cost)</span>
          </div>
        </div>

        {/* Interactive Simple ROI & Deployment Slider */}
        <div className="slate-card p-6 sm:p-8 border border-white/10 bg-slate-900/90 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 5 Cols: Slider Input */}
            <div className="lg:col-span-5 space-y-5">
              <div className="pb-3 border-b border-white/10">
                <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-chalk-cyan" />
                  <span>Deployment ROI Simulator</span>
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Adjust school count to view capital savings & student reach
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline font-mono text-xs">
                  <span className="text-slate-300 font-semibold">Number of Schools Deployed:</span>
                  <span className="font-heading font-black text-2xl text-chalk-cyan">
                    {numSchools} <span className="text-xs font-mono font-normal text-slate-400">schools</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="2000"
                  step="10"
                  value={numSchools}
                  onChange={(e) => {
                    sound.playClick(650);
                    setNumSchools(Number(e.target.value));
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>10 (Pilot Cluster)</span>
                  <span>500 (Default)</span>
                  <span>2,000 (State Block)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 font-mono text-xs text-slate-400 flex items-center justify-between">
                <span>Total Classrooms ({unitsPerSchool} per school):</span>
                <strong className="text-white font-bold">{totalUnits.toLocaleString('en-IN')} Units</strong>
              </div>
            </div>

            {/* Right 7 Cols: Financial & Impact Outputs */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
              
              <div className="p-4 rounded-xl bg-slate-950 border border-chalk-emerald/30 shadow-md flex flex-col justify-between">
                <span className="text-[10px] text-chalk-emerald uppercase font-bold block">
                  Capital Saved vs Smart-Boards:
                </span>
                <div className="font-heading font-black text-2xl text-chalk-emerald my-1">
                  {formatLakhs(totalCapitalSaved)}
                </div>
                <span className="text-[10px] text-slate-400">{capexReductionPercent}% CAPEX Reduction</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-chalk-cyan/30 shadow-md flex flex-col justify-between">
                <span className="text-[10px] text-chalk-cyan uppercase font-bold block">
                  Students Reached:
                </span>
                <div className="font-heading font-black text-2xl text-white my-1">
                  {totalStudentsReached.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-400">Active Learners</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-chalk-amber/30 shadow-md flex flex-col justify-between">
                <span className="text-[10px] text-chalk-amber uppercase font-bold block">
                  Gross Margin Generated:
                </span>
                <div className="font-heading font-black text-2xl text-chalk-amber my-1">
                  {formatLakhs(totalGrossProfit)}
                </div>
                <span className="text-[10px] text-slate-400">79.4% margin</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
