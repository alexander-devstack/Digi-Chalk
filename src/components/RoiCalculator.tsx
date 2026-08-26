import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Zap, 
  DollarSign, 
  ShieldAlert, 
  Leaf, 
  School, 
  CheckCircle2, 
  ArrowRight,
  PieChart,
  Percent,
  Layers,
  Recycle,
  Tag,
  Target
} from 'lucide-react';
import { sound } from '../utils/sound';

export const RoiCalculator: React.FC = () => {
  const [numSchools, setNumSchools] = useState(25);
  const [classroomsPerSchool, setClassroomsPerSchool] = useState(8);
  const [discountRate, setDiscountRate] = useState(5); // 0% to 25%

  // Unit Economics Constants
  const baseRetailPrice = 2000; // INR
  const volumeCogs = 1055; // INR
  const baseGrossMargin = 945; // INR (~47.25%)
  const phaseBFixedOpCost = 1000000; // ₹10 Lakhs

  // Total Units
  const totalUnits = numSchools * classroomsPerSchool;

  // Pricing with Volume Tender Discount
  const effectiveUnitPrice = Math.round(baseRetailPrice * (1 - discountRate / 100));
  const effectiveUnitMargin = effectiveUnitPrice - volumeCogs;
  const effectiveMarginPercent = ((effectiveUnitMargin / effectiveUnitPrice) * 100).toFixed(1);

  // Totals
  const totalRevenue = totalUnits * effectiveUnitPrice;
  const totalCogs = totalUnits * volumeCogs;
  const totalGrossProfit = totalRevenue - totalCogs;

  // Breakeven Calculation (1,058 units at standard price, up to 1,376 units at discount)
  const breakevenTargetUnits = Math.ceil(phaseBFixedOpCost / (effectiveUnitMargin > 0 ? effectiveUnitMargin : 1));
  const breakevenProgressPercent = Math.min(100, Math.round((totalUnits / breakevenTargetUnits) * 100));
  const isBreakevenAchieved = totalUnits >= breakevenTargetUnits;

  // Environmental E-waste & Plastic Saved Comparison
  // 75" Smartboard IFPD: ~48kg e-waste (glass, metal frame, toxic backlights, circuitry)
  // Digi-Chalk: ~0.24kg lightweight recyclable casing + micro-PCB
  const smartboardEwasteKgPerUnit = 48.0;
  const digiChalkEwasteKgPerUnit = 0.24;
  const netEwasteSavedKg = Math.round(totalUnits * (smartboardEwasteKgPerUnit - digiChalkEwasteKgPerUnit));
  const netEwasteSavedTonnes = (netEwasteSavedKg / 1000).toFixed(2);

  // Total CAPEX comparison vs ₹1,50,000 Smartboards
  const smartboardCapex = totalUnits * 150000;
  const capexSavingsInr = smartboardCapex - totalRevenue;
  const savingsPercentage = ((capexSavingsInr / smartboardCapex) * 100).toFixed(1);

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
    <section id="roi-calculator" className="py-20 bg-slate-900/60 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-emerald/10 border border-chalk-emerald/30 text-xs font-mono text-chalk-emerald mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Unit Economics & Breakeven Simulation</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Dynamic ROI & Breakeven Calculator
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Simulate procurement volumes, state tender discounts, operational breakeven progress, and total plastic/e-waste diverted from landfills.
          </p>
        </div>

        {/* Unit Economics Snapshot Banner */}
        <div className="glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/90 shadow-2xl mb-8">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Tag className="w-4 h-4 text-chalk-cyan" />
              <span>Unit Economics Snapshot (Direct Scaled Run)</span>
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chalk-emerald/10 text-chalk-emerald border border-chalk-emerald/30 font-bold">
              Volume Run: 100+ Units
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-center">
            <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">Govt Procurement Price:</span>
              <div className="font-heading font-black text-xl text-white mt-0.5">₹2,000</div>
              <span className="text-[10px] text-slate-400">per classroom unit</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">Manufacturing Cost (COGS):</span>
              <div className="font-heading font-black text-xl text-chalk-amber mt-0.5">₹1,055</div>
              <span className="text-[10px] text-slate-400">Itemized Target BOM</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-chalk-emerald/40 shadow-sm">
              <span className="text-[10px] text-chalk-emerald block uppercase font-bold">Gross Margin per Unit:</span>
              <div className="font-heading font-black text-xl text-chalk-emerald mt-0.5">₹945</div>
              <span className="text-[10px] text-chalk-emerald font-semibold">~47.25% Margin</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
              <span className="text-[10px] text-slate-400 block uppercase">Breakeven Volume:</span>
              <div className="font-heading font-black text-xl text-chalk-cyan mt-0.5">1,058 – 1,376</div>
              <span className="text-[10px] text-slate-400">Covers ₹10L Op Cost</span>
            </div>
          </div>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Cols: Interactive Parameter Sliders */}
          <div className="lg:col-span-5 glass-card rounded-2xl border border-white/10 p-6 bg-slate-950/80 shadow-2xl space-y-6">
            
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <School className="w-4 h-4 text-chalk-cyan" />
                <span>Procurement Parameters</span>
              </h3>
              <span className="text-xs font-mono text-slate-400 font-bold">{totalUnits} Total Units</span>
            </div>

            {/* Slider 1: Number of Schools */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-mono text-slate-300">Number of Schools:</label>
                <span className="font-heading font-black text-xl text-chalk-cyan">
                  {numSchools} <span className="text-xs font-mono font-normal text-slate-400">schools</span>
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="200"
                step="1"
                value={numSchools}
                onChange={(e) => {
                  sound.playClick(600);
                  setNumSchools(Number(e.target.value));
                }}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>1 School (Pilot)</span>
                <span>50 (Block)</span>
                <span>200 (District Tender)</span>
              </div>
            </div>

            {/* Slider 2: Units per Classroom / School */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-mono text-slate-300">Units / Classrooms per School:</label>
                <span className="font-heading font-black text-xl text-chalk-amber">
                  {classroomsPerSchool} <span className="text-xs font-mono font-normal text-slate-400">rooms</span>
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={classroomsPerSchool}
                onChange={(e) => {
                  sound.playClick(650);
                  setClassroomsPerSchool(Number(e.target.value));
                }}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>1 Room</span>
                <span>8 Rooms (Typical Govt School)</span>
                <span>20 Rooms</span>
              </div>
            </div>

            {/* Slider 3: Procurement Volume Discount Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <label className="text-xs font-mono text-slate-300">Procurement Discount Rate:</label>
                <span className="font-heading font-black text-xl text-chalk-coral">
                  {discountRate}% <span className="text-xs font-mono font-normal text-slate-400">(₹{effectiveUnitPrice}/unit)</span>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={discountRate}
                onChange={(e) => {
                  sound.playClick(700);
                  setDiscountRate(Number(e.target.value));
                }}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0% (Retail ₹2,000)</span>
                <span>10% (State SSA)</span>
                <span>25% (Mega Tender)</span>
              </div>
            </div>

            {/* Breakeven Status Box */}
            <div className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${
              isBreakevenAchieved
                ? 'bg-chalk-emerald/10 border-chalk-emerald/40 text-chalk-emerald'
                : 'bg-slate-900 border-white/10 text-slate-300'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  Phase B Breakeven Progress:
                </span>
                <span className="font-bold">{totalUnits} / {breakevenTargetUnits} Units</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isBreakevenAchieved ? 'bg-chalk-emerald' : 'bg-chalk-cyan'
                  }`}
                  style={{ width: `${breakevenProgressPercent}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] pt-0.5">
                <span>{breakevenProgressPercent}% of ₹10L Fixed Op Cost</span>
                <span className="font-bold">
                  {isBreakevenAchieved ? '✓ Breakeven Achieved!' : `Needs ${breakevenTargetUnits - totalUnits} more units`}
                </span>
              </div>
            </div>

          </div>

          {/* Right 7 Cols: Financial Returns & E-waste Savings */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Financial Revenue & Profit Card */}
            <div className="glass-card rounded-2xl border border-chalk-emerald/40 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-chalk-emerald/10 blur-3xl rounded-full pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-chalk-emerald px-2.5 py-1 rounded bg-chalk-emerald/10 border border-chalk-emerald/30 font-bold">
                  Live Procurement Financials
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {totalUnits} Units Deployed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase block tracking-wider">Total Contract Revenue:</span>
                  <div className="font-heading font-black text-3xl text-white mt-1">
                    {formatLakhs(totalRevenue)}
                  </div>
                  <span className="text-[10px] text-chalk-cyan mt-1 block">@ ₹{effectiveUnitPrice} per unit</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-chalk-emerald/30 shadow-md">
                  <span className="text-[10px] text-chalk-emerald uppercase block tracking-wider font-bold">Net Gross Profit:</span>
                  <div className="font-heading font-black text-3xl text-chalk-emerald mt-1">
                    {formatLakhs(totalGrossProfit)}
                  </div>
                  <span className="text-[10px] text-chalk-emerald mt-1 block">{effectiveMarginPercent}% Gross Margin</span>
                </div>
              </div>

              {/* Total CAPEX Saved vs ₹1.5L Smartboards */}
              <div className="mt-4 pt-4 border-t border-white/10 text-xs font-mono text-slate-300 flex flex-wrap items-center justify-between gap-3">
                <div>
                  CAPEX Saved vs Smartboards: <strong className="text-white">{formatLakhs(capexSavingsInr)}</strong>
                </div>
                <span className="text-chalk-emerald font-bold">({savingsPercentage}% Cost Reduction)</span>
              </div>
            </div>

            {/* Plastic & E-waste Avoided Environmental Card */}
            <div className="glass-card rounded-2xl border border-white/10 p-6 bg-slate-950/90 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Recycle className="w-5 h-5 text-chalk-emerald" />
                  <h4 className="font-heading font-bold text-base text-white">
                    Plastic & Toxic E-Waste Saved
                  </h4>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-chalk-emerald/10 text-chalk-emerald border border-chalk-emerald/30 font-bold">
                  Zero LCD Waste
                </span>
              </div>

              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                A 75" commercial smartboard generates ~48 kg of toxic electronic waste (liquid crystal backlights, heavy aluminum bezels, glass panels) upon breakage. Digi-Chalk utilizes existing indestructible slates, diverting metric tonnes of e-waste from landfills.
              </p>

              <div className="grid grid-cols-2 gap-4 font-mono text-center">
                <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">E-Waste Diverted:</span>
                  <div className="font-heading font-black text-2xl text-chalk-emerald mt-1">
                    {netEwasteSavedTonnes} <span className="text-xs font-normal text-slate-300">Tonnes</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{netEwasteSavedKg.toLocaleString('en-IN')} kg toxic e-waste avoided</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Power Grid Footprint:</span>
                  <div className="font-heading font-black text-2xl text-chalk-cyan mt-1">
                    5W <span className="text-xs font-normal text-slate-400">vs 250W</span>
                  </div>
                  <span className="text-[10px] text-chalk-emerald">50x lower energy draw</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
