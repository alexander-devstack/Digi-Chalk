import React, { useState } from 'react';
import { 
  FileText, 
  Cpu, 
  Download, 
  CheckCircle2, 
  Search,
  Tag,
  Sparkles
} from 'lucide-react';
import { BOM_DATA, BOM_SUMMARY } from '../data/bomData';
import { sound } from '../utils/sound';

export const SchematicsBom: React.FC = () => {
  const [selectedSubsystem, setSelectedSubsystem] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'bom' | 'schematic'>('bom');
  const [selectedCircuitBlock, setSelectedCircuitBlock] = useState<string>('pzt-driver');

  const subsystems = ['All', 'Holder', 'Clips (x2)'];

  const filteredBom = BOM_DATA.filter((item) => {
    const matchesSubsystem = selectedSubsystem === 'All' || item.subsystem === selectedSubsystem;
    const matchesSearch = 
      item.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubsystem && matchesSearch;
  });

  const handleDownloadCsv = () => {
    sound.playClick(1000);
    const headers = 'ID,Subsystem,Category,Component Name,Model / Spec,Purpose,Quantity,Unit Cost (INR),Vendor,Lead Time,Status\n';
    const rows = BOM_DATA.map((b) => 
      `"${b.id}","${b.subsystem}","${b.category}","${b.component}","${b.partNumber}","${b.purpose.replace(/"/g, '""')}",${b.quantity},${b.unitCostInr},"${b.vendor}","${b.leadTimeWeeks} weeks","${b.status}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `digi-chalk-target-bom-rev-c-${Date.now()}.csv`;
    link.click();
  };

  const circuitBlocks = [
    {
      id: 'pzt-driver',
      name: '40kHz MCUSD16P40B12RO Boost & Gate Drive',
      domain: 'Chalk Holder Unit',
      description: 'MT3608 boost converter stepping 3.7V up to 20-22V burst rail. High-speed IR2104 gate driver and IRLZ44N MOSFET push-pull acoustic pulse.',
      components: 'MCUSD16P40B12RO TX, MT3608 Boost IC, IR2104 Driver, IRLZ44N MOSFET, 10μH Choke',
      operatingVoltage: '3.7V LiPo -> 20V - 22V Acoustic Burst Pulse',
    },
    {
      id: 'mems-i2s',
      name: 'ICS-43434 24-bit I2S & MPU6050 Fast-Mode Bus',
      domain: 'Chalk Holder Unit',
      description: 'Digital audio capture at 44.1kHz PCM with WebRTC/Silero VAD speech isolation and 400kHz Fast-Mode I2C bus for 6-axis IMU.',
      components: 'ICS-43434 Digital MEMS Mic, MPU6050 IMU, Seeed XIAO ESP32-C3',
      operatingVoltage: '3.3V Low-Noise LDO Rail',
    },
    {
      id: 'clip-afe',
      name: 'Murata MA40S4R Receiver & LM358/LM393 AFE',
      domain: 'Corner Clip Unit (×2)',
      description: 'Murata MA40S4R 40kHz receiver connected to dual-stage LM358 op-amp (1000x gain) and LM393 comparator with 1N4148 fast envelope detector.',
      components: 'Murata MA40S4R, LM358 Op-Amp, LM393 Comparator, 1N4148 Diode',
      operatingVoltage: '3.3V / 5.0V with 300μs Ring-Down Guard Delay',
    },
    {
      id: 'diode-or',
      name: 'Diode-OR Failsafe Power & TP4056 USB-C',
      domain: 'Power Management',
      description: 'Dual power path utilizing low-forward-drop Schottky diodes to seamlessly switch from 80mAh LiPo to CR2032 backup battery.',
      components: 'TP4056 / MCP73831, DW01A Protection, BAT54C Diode-OR Pair, UF4007',
      operatingVoltage: '5V USB-C In / 3.7V LiPo / 3.0V Coin Cell Failover',
    },
  ];

  const activeCircuit = circuitBlocks.find((c) => c.id === selectedCircuitBlock) || circuitBlocks[0];

  return (
    <section id="bom-schematics" className="py-20 bg-slate-950 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Hardware Engineering & Target Production BOM</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Itemized Bill of Materials: Target BOM ₹1,055
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Full itemized BOM table with direct scaled hardware costs for volume runs (100+ units), delivering a <strong className="text-chalk-emerald">47.25% gross margin</strong> at ₹2,000 retail pricing.
          </p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-mono">
          <div className="p-4 rounded-2xl glass-card border border-white/10 text-center">
            <span className="text-xs text-slate-400">Holder Subtotal</span>
            <div className="font-heading font-black text-2xl text-chalk-cyan mt-1">₹{BOM_SUMMARY.holderSubtotalInr}</div>
            <span className="text-[10px] text-slate-400">7 Core Components</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/10 text-center">
            <span className="text-xs text-slate-400">Corner Clips (×2) Subtotal</span>
            <div className="font-heading font-black text-2xl text-chalk-amber mt-1">₹{BOM_SUMMARY.clipsSubtotalInr}</div>
            <span className="text-[10px] text-slate-400">Dual Receiver Base</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border-2 border-chalk-emerald text-center shadow-lg shadow-chalk-emerald/10">
            <span className="text-xs text-chalk-emerald font-bold">★ Target Production BOM</span>
            <div className="font-heading font-black text-3xl text-chalk-emerald mt-1">₹{BOM_SUMMARY.totalHardwareBOMInr}</div>
            <span className="text-[10px] text-chalk-emerald">Direct Scaled (100+ units)</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-white/10 text-center">
            <span className="text-xs text-slate-400">Target Retail Price</span>
            <div className="font-heading font-black text-2xl text-white mt-1">₹{BOM_SUMMARY.targetRetailPriceInr}</div>
            <span className="text-[10px] text-chalk-emerald font-bold">{BOM_SUMMARY.grossMarginPercentage}% Gross Margin</span>
          </div>
        </div>

        {/* Sub-Tabs: BOM vs Schematic */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-900 p-1.5 rounded-2xl border border-white/10 flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick(750);
                setActiveTab('bom');
              }}
              className={`px-5 py-2 rounded-xl font-heading font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                activeTab === 'bom'
                  ? 'bg-gradient-to-r from-chalk-cyan to-chalk-emerald text-slate-950 shadow-md shadow-chalk-cyan/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Itemized BOM Table (₹1,055)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick(750);
                setActiveTab('schematic');
              }}
              className={`px-5 py-2 rounded-xl font-heading font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                activeTab === 'schematic'
                  ? 'bg-gradient-to-r from-chalk-cyan to-chalk-emerald text-slate-950 shadow-md shadow-chalk-cyan/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>KiCad Circuit Blocks</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Itemized BOM Table */}
        {activeTab === 'bom' && (
          <div className="glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/90 shadow-2xl space-y-4">
            
            {/* Filters & Export Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10">
              
              {/* Subsystem Filter Pills */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-slate-400 mr-1">Subsystem:</span>
                {subsystems.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => {
                      sound.playClick(700);
                      setSelectedSubsystem(sub);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-mono border transition-all ${
                      selectedSubsystem === sub
                        ? 'bg-chalk-cyan/20 border-chalk-cyan text-chalk-cyan font-bold shadow-sm shadow-chalk-cyan/20'
                        : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>

              {/* Search & CSV Download Button */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search components, ICs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-chalk-cyan"
                  />
                </div>

                <button
                  onClick={handleDownloadCsv}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-chalk-emerald" />
                  <span>Export CSV</span>
                </button>
              </div>

            </div>

            {/* Table Surface */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-3">Subsystem</th>
                    <th className="py-3 px-3">Component Name</th>
                    <th className="py-3 px-3">Model / Specification</th>
                    <th className="py-3 px-3">Purpose & Interface</th>
                    <th className="py-3 px-3 text-right">Cost (₹)</th>
                    <th className="py-3 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBom.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          item.subsystem === 'Holder'
                            ? 'bg-chalk-cyan/10 text-chalk-cyan border border-chalk-cyan/30'
                            : 'bg-chalk-amber/10 text-chalk-amber border border-chalk-amber/30'
                        }`}>
                          {item.subsystem}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white text-xs">{item.component}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.category}</div>
                      </td>
                      <td className="py-3.5 px-3 text-chalk-cyan text-[11px]">
                        {item.partNumber}
                      </td>
                      <td className="py-3.5 px-3 max-w-xs text-slate-300 text-[11px] leading-relaxed">
                        {item.purpose}
                      </td>
                      <td className="py-3.5 px-3 text-right font-bold text-chalk-emerald text-sm">
                        ₹{item.unitCostInr}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-flex items-center gap-1 text-[10px] text-chalk-emerald">
                          <CheckCircle2 className="w-3 h-3" />
                          Validated
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-chalk-emerald/50 bg-slate-900/60 font-bold text-white text-sm">
                    <td colSpan={4} className="py-4 px-3 text-right text-chalk-emerald font-heading">
                      TOTAL TARGET PRODUCTION BOM (Volume 100+ units):
                    </td>
                    <td className="py-4 px-3 text-right text-chalk-emerald font-black text-base font-heading">
                      ₹1,055
                    </td>
                    <td className="py-4 px-3 text-center text-xs text-slate-400 font-mono">
                      47.25% Margin
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

          </div>
        )}

        {/* Tab 2: KiCad Circuit Inspector */}
        {activeTab === 'schematic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 4 Cols: Circuit Block Selector */}
            <div className="lg:col-span-4 space-y-2.5">
              {circuitBlocks.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    sound.playClick(750);
                    setSelectedCircuitBlock(c.id);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedCircuitBlock === c.id
                      ? 'bg-slate-900 border-chalk-cyan/50 shadow-md shadow-chalk-cyan/10'
                      : 'bg-slate-950/60 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-bold text-xs text-white">
                      {c.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-chalk-cyan border border-white/10">
                      {c.domain}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right 8 Cols: Schematic Preview & Details */}
            <div className="lg:col-span-8 glass-card rounded-2xl border border-white/10 p-6 bg-slate-950/90 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-chalk-cyan uppercase tracking-wider">
                    {activeCircuit.domain} • KiCad Rev C
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white mt-1">
                    {activeCircuit.name}
                  </h3>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-chalk-emerald/10 text-chalk-emerald border border-chalk-emerald/30">
                  Sub-Microsecond AFE
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {activeCircuit.description}
              </p>

              {/* Signal Routing Visual Architecture Diagram */}
              <div className="p-6 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs space-y-3">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Signal Flow & Gate Timing:
                </div>
                <div className="p-4 rounded-lg bg-slate-950 border border-chalk-cyan/20 text-chalk-cyan flex flex-wrap items-center justify-center gap-3">
                  <span className="px-3 py-1.5 rounded bg-slate-900 border border-white/10 text-white font-bold">
                    XIAO ESP32-C3 (GPIO 8)
                  </span>
                  <span>──[ PWM 40kHz ]──►</span>
                  <span className="px-3 py-1.5 rounded bg-slate-900 border border-chalk-amber/30 text-chalk-amber font-bold">
                    MT3608 Boost (22V) + IR2104
                  </span>
                  <span>──[ 115dB Burst ]──►</span>
                  <span className="px-3 py-1.5 rounded bg-slate-900 border border-chalk-emerald/30 text-chalk-emerald font-bold">
                    MCUSD16P40B12RO (±50° Wedges)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Key Active Components:</span>
                  <span className="font-bold text-slate-200 mt-1 block">{activeCircuit.components}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Power & Voltage Rail:</span>
                  <span className="font-bold text-chalk-emerald mt-1 block">{activeCircuit.operatingVoltage}</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
