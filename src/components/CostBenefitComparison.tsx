import React, { useState } from 'react';
import { 
  Sliders, 
  DollarSign, 
  Clock, 
  UserCheck, 
  ShieldAlert, 
  HeartHandshake, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ArrowRight,
  Zap,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/sound';

export const CostBenefitComparison: React.FC = () => {
  const [activeDimension, setActiveDimension] = useState<number>(0);

  const dimensions = [
    {
      id: 'cost',
      title: 'Infrastructure & Hardware Cost',
      icon: DollarSign,
      description: 'Capital expenditure, replacement parts, and total procurement budget per classroom.',
      smartBoard: {
        value: '₹1,50,000',
        sub: '75" 4K Interactive Flat Panel (IFPD)',
        points: ['High Capex (₹1.5L - ₹2.2L)', 'Requires dedicated AC/stabilizer', 'Replacement LCD panel: ₹75,000'],
        rating: 'poor',
        score: '15/100',
      },
      projectorBox: {
        value: '₹18,000',
        sub: `'pπ' Interactive Projector System`,
        points: ['Moderate initial cost (₹18,000)', 'Replacement lamps cost ₹6,000/yr', 'Shadows block screen writing'],
        rating: 'fair',
        score: '58/100',
      },
      digiChalk: {
        value: '₹2,000',
        sub: 'Digi-Chalk Dual Corner Clip + Stylus',
        points: ['Ultra-Low Capex: ₹2,000 (42.5x cheaper)', 'Uses existing blackboard slate', 'Production BOM cost: ₹1,055'],
        rating: 'optimal',
        score: '98/100',
      },
    },
    {
      id: 'setup',
      title: 'Setup Time & Calibration',
      icon: Clock,
      description: 'Installation complexity, tool requirements, and daily operational overhead.',
      smartBoard: {
        value: '3–5 Days',
        sub: 'Heavy Wall Mounting & Structural Reinforcement',
        points: ['Requires specialized masonry drilling', 'High-voltage wiring & dedicated line', 'Complex OS setup & teacher training'],
        rating: 'poor',
        score: '20/100',
      },
      projectorBox: {
        value: '4–6 Hours',
        sub: 'Ceiling Rigging & Optical Alignment',
        points: ['Ceiling mount alignment drifts over time', 'Daily manual 4-point calibration', 'Keystone distortion adjustments'],
        rating: 'fair',
        score: '50/100',
      },
      digiChalk: {
        value: '15 Seconds',
        sub: 'Tool-Free Magnetic Snap Mounting',
        points: ['Self-centering dual alignment wedges', 'Zero tools or structural drilling', 'Instant 1-tap auto acoustic calibration'],
        rating: 'optimal',
        score: '99/100',
      },
    },
    {
      id: 'friction',
      title: 'Teacher Friction & Ergonomics',
      icon: UserCheck,
      description: 'Natural pedagogical workflow, tactile blackboard feel, and learning curve.',
      smartBoard: {
        value: 'High Friction',
        sub: 'Foreign Stylus & Touch Latency Lag',
        points: ['Teachers resist complex Android/Windows UI', 'Slippery glass surface causes fatigue', 'Stylus battery anxiety & loss'],
        rating: 'poor',
        score: '30/100',
      },
      projectorBox: {
        value: 'Medium Friction',
        sub: 'Teacher Body Shadow Occlusion',
        points: ['Teacher blocks light beam while writing', 'Optical parallax between pen and ink', 'Dim in well-lit natural classrooms'],
        rating: 'fair',
        score: '60/100',
      },
      digiChalk: {
        value: 'Zero Friction',
        sub: 'Standard Chalk Tactile Experience',
        points: ['Works with real classroom calcium chalk', 'Preserves 100% natural teaching habits', 'Twist-feed ergonomics & 32g weight'],
        rating: 'optimal',
        score: '96/100',
      },
    },
    {
      id: 'health',
      title: 'Health & Chalk Dust Impact',
      icon: HeartHandshake,
      description: 'Airborne particulate matter (PM2.5/PM10), teacher respiratory comfort, and clean writing.',
      smartBoard: {
        value: 'Dust-Free (High Screen Glare)',
        sub: 'Zero Dust but Severe Eye Strain',
        points: ['No particulate dust emissions', 'High blue light & specular glare', 'Headaches during 6-hour lecture days'],
        rating: 'fair',
        score: '65/100',
      },
      projectorBox: {
        value: 'Dust-Free (Direct Light Beam)',
        sub: 'Zero Dust but Blinding Lens Glare',
        points: ['Projector bulb shines directly into eyes', 'Fan noise interferes with audio clarity', 'Dust filters clog in rural classrooms'],
        rating: 'fair',
        score: '55/100',
      },
      digiChalk: {
        value: 'Dustless Enclosed Grip',
        sub: 'Chalk Sleeve + Zero Screen Blue Light',
        points: ['Enclosed sleeve keeps hands 100% clean', 'Zero screen glare on natural slate', 'Compatible with dust-free coated chalk'],
        rating: 'optimal',
        score: '92/100',
      },
    },
    {
      id: 'durability',
      title: 'Durability & Rural Classroom Resilience',
      icon: ShieldAlert,
      description: 'Resistance to impact, voltage spikes, humidity, power cuts, and rough student handling.',
      smartBoard: {
        value: 'Very Fragile',
        sub: 'Glass Shatters on Direct Impact',
        points: ['Sports ball or desk hit cracks entire LCD', 'Sensitive to voltage surges & humidity', 'Zero functionality during power cuts'],
        rating: 'poor',
        score: '10/100',
      },
      projectorBox: {
        value: 'Moderate Fragility',
        sub: 'Bulb Filament Shock Sensitivity',
        points: ['Projector lamps burn out with power surges', 'Filter requires regular cleaning', 'Requires UPS backup for bulb cooldown'],
        rating: 'fair',
        score: '45/100',
      },
      digiChalk: {
        value: 'Indestructible Slate',
        sub: 'Drop-Tested ABS + Diode-OR Failsafe',
        points: ['Slate blackboard withstands heavy physical impact', '18-hour internal LiPo battery runs offline', 'CR2032 failsafe Diode-OR backup bridge'],
        rating: 'optimal',
        score: '97/100',
      },
    },
  ];

  const currentDim = dimensions[activeDimension];

  const handleSelectDimension = (idx: number) => {
    sound.playClick(750);
    setActiveDimension(idx);
  };

  return (
    <section id="cost-benefit" className="py-20 bg-slate-950 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Technology Benchmark</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Side-by-Side Cost & Benefit Matrix
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Compare <strong className="text-white">Commercial Smartboards (₹1.5L)</strong> vs. <strong className="text-white">'pπ' Projector Boxes (₹18K)</strong> vs. <strong className="text-chalk-emerald">Digi-Chalk (₹2,000)</strong> across 5 critical dimensions.
          </p>
        </div>

        {/* 5-Dimension Slider / Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {dimensions.map((dim, idx) => {
            const Icon = dim.icon;
            const isSelected = activeDimension === idx;
            return (
              <button
                key={dim.id}
                onClick={() => handleSelectDimension(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm border transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-chalk-cyan to-chalk-emerald text-slate-950 font-bold border-transparent shadow-lg shadow-chalk-cyan/20 scale-105'
                    : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{dim.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Dimension Description */}
        <div className="text-center max-w-xl mx-auto mb-8 font-mono text-xs text-slate-400">
          {currentDim.description}
        </div>

        {/* 3-Column Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Option 1: Commercial Smart Board */}
          <div className="glass-card rounded-2xl border border-chalk-coral/30 p-6 bg-slate-950/80 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-chalk-coral/10 text-chalk-coral border border-chalk-coral/30 font-bold">
                  Legacy High-End
                </span>
                <span className="text-xs font-mono text-slate-400">Score: {currentDim.smartBoard.score}</span>
              </div>

              <h3 className="font-heading font-bold text-lg text-white">
                Commercial Smart Board
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                {currentDim.smartBoard.sub}
              </p>

              {/* Main Metric Value */}
              <div className="my-5 p-4 rounded-xl bg-slate-900 border border-white/5 text-center">
                <div className="font-heading font-black text-3xl text-chalk-coral">
                  {currentDim.smartBoard.value}
                </div>
              </div>

              {/* Feature Points */}
              <ul className="space-y-2.5 font-mono text-xs text-slate-300">
                {currentDim.smartBoard.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-chalk-coral shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>Classroom Suitability:</span>
              <span className="text-chalk-coral font-bold">10% Urban Elite</span>
            </div>
          </div>

          {/* Option 2: 'pπ' Projector Box */}
          <div className="glass-card rounded-2xl border border-chalk-amber/30 p-6 bg-slate-950/80 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-chalk-amber/10 text-chalk-amber border border-chalk-amber/30 font-bold">
                  Mid-Tier Optical
                </span>
                <span className="text-xs font-mono text-slate-400">Score: {currentDim.projectorBox.score}</span>
              </div>

              <h3 className="font-heading font-bold text-lg text-white">
                'pπ' Projector Box System
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                {currentDim.projectorBox.sub}
              </p>

              {/* Main Metric Value */}
              <div className="my-5 p-4 rounded-xl bg-slate-900 border border-white/5 text-center">
                <div className="font-heading font-black text-3xl text-chalk-amber">
                  {currentDim.projectorBox.value}
                </div>
              </div>

              {/* Feature Points */}
              <ul className="space-y-2.5 font-mono text-xs text-slate-300">
                {currentDim.projectorBox.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-chalk-amber shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-slate-500 flex items-center justify-between">
              <span>Classroom Suitability:</span>
              <span className="text-chalk-amber font-bold">25% Semi-Urban</span>
            </div>
          </div>

          {/* Option 3: Digi-Chalk Retrofit (Winner) */}
          <div className="glass-card rounded-2xl border-2 border-chalk-emerald p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-between shadow-2xl relative overflow-hidden ring-1 ring-chalk-emerald/40 scale-[1.02]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-chalk-emerald/15 blur-3xl rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-chalk-emerald/20 text-chalk-emerald border border-chalk-emerald/50 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  ★ Digi-Chalk Retrofit
                </span>
                <span className="text-xs font-mono text-chalk-emerald font-bold">Score: {currentDim.digiChalk.score}</span>
              </div>

              <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                <span>Digi-Chalk (Team Zero Resistance)</span>
              </h3>
              <p className="text-xs font-mono text-chalk-cyan mt-0.5">
                {currentDim.digiChalk.sub}
              </p>

              {/* Main Metric Value */}
              <div className="my-5 p-4 rounded-xl bg-slate-900/90 border border-chalk-emerald/40 text-center shadow-lg shadow-chalk-emerald/10">
                <div className="font-heading font-black text-4xl text-chalk-emerald">
                  {currentDim.digiChalk.value}
                </div>
                <div className="text-[11px] font-mono text-slate-300 mt-1">Direct Target BOM: ₹1,055</div>
              </div>

              {/* Feature Points */}
              <ul className="space-y-2.5 font-mono text-xs text-slate-200">
                {currentDim.digiChalk.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-chalk-emerald shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Classroom Suitability:</span>
              <span className="text-chalk-emerald font-bold">100% All Indian Schools</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
