import React, { useRef, useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  RotateCcw, 
  ShieldAlert, 
  Cpu, 
  Mic, 
  UserCheck, 
  Sliders
} from 'lucide-react';
import { KalmanFilter2D } from '../utils/kalmanFilter';
import { sound } from '../utils/sound';

export const MathAndFilterMoat: React.FC = () => {
  const simCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [filterActive, setFilterActive] = useState(true);
  const [isOccluded, setIsOccluded] = useState(false);
  const [mahalanobisValue, setMahalanobisValue] = useState(2.14);
  const [kalmanFilter] = useState(() => new KalmanFilter2D(0.004, 1.8));

  const [rawPoints, setRawPoints] = useState<{ x: number; y: number }[]>([]);
  const [filteredPoints, setFilteredPoints] = useState<{ x: number; y: number }[]>([]);

  // Simulation Render Loop
  useEffect(() => {
    const canvas = simCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Raw Jittery Path (Red/Coral)
    if (rawPoints.length > 1) {
      ctx.strokeStyle = isOccluded ? '#F43F5E' : '#F59E0B';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      rawPoints.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Filtered ARCKF Path (Cyan / Emerald)
    if (filteredPoints.length > 1) {
      ctx.strokeStyle = '#0EA5E9';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      filteredPoints.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
    }
  }, [rawPoints, filteredPoints, isOccluded]);

  // Handle Freehand Simulation Drawing
  const handleSimPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1) return;
    const canvas = simCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Synthetic acoustic jitter + severe NLOS deviation if occluded
    const jitterMagnitude = isOccluded ? 32 : 5.5;
    const rawX = x + (Math.random() - 0.5) * jitterMagnitude;
    const rawY = y + (Math.random() - 0.5) * jitterMagnitude;

    const currentMahalanobis = isOccluded ? +(8.4 + Math.random() * 4).toFixed(2) : +(1.8 + Math.random() * 1.5).toFixed(2);
    setMahalanobisValue(currentMahalanobis);

    const isGatedOut = currentMahalanobis > 6.2;
    const filtered = filterActive
      ? kalmanFilter.update(rawX, rawY, isGatedOut)
      : { x: rawX, y: rawY };

    setRawPoints((prev) => [...prev.slice(-120), { x: rawX, y: rawY }]);
    setFilteredPoints((prev) => [...prev.slice(-120), filtered]);
  };

  const handleSimClear = () => {
    sound.playClick(500);
    kalmanFilter.reset(200, 150);
    setRawPoints([]);
    setFilteredPoints([]);
    setMahalanobisValue(2.14);
  };

  const toggleOcclusion = () => {
    sound.playClick(900);
    setIsOccluded(!isOccluded);
  };

  return (
    <section id="arckf-pipeline" className="py-20 bg-slate-900/40 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan mb-3">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Mathematical Moat & Edge AI Layer</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            ARCKF Zero-Drift & Pedagogical AI Pipeline
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Eliminating line-of-sight acoustic loss, IMU dead-reckoning drift, and ambient classroom room noise with mathematical rigor.
          </p>
        </div>

        {/* 2-Column Grid: Math Formulation vs Live Occlusion Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left 6 Cols: ARCKF Formulation & Features */}
          <div className="lg:col-span-6 slate-card p-6 sm:p-7 border border-white/10 bg-slate-950/80 shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-heading font-bold text-base text-white">
                ARCKF Mahalanobis Formulation
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chalk-cyan/10 text-chalk-cyan font-bold">
                Eq. 4.1
              </span>
            </div>

            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              The Adaptive-Robust Complementary Kalman Filter (ARCKF) calculates the normalized innovation vector &gamma;<sub>k,i</sub>:
            </p>

            {/* Rendered Math Formula Block */}
            <div className="p-4 rounded-xl bg-slate-900 border border-chalk-cyan/30 font-mono text-xs sm:text-sm text-chalk-cyan overflow-x-auto shadow-inner text-center">
              {"γ_{k,i} = (Z_{k,i} - H_{k,i}X_k)^T (H_{k,i}P_k^-H_{k,i}^T + R_{k,i})^{-1} (Z_{k,i} - H_{k,i}X_k)"}
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                <div className="font-bold text-chalk-emerald flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mahalanobis Distance Gating:</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Rejects acoustic multipath reflections when teacher's arm or body breaks direct line of sight.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                <div className="font-bold text-chalk-cyan flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Temporal Guard Delay:</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Prevents near-field acoustic ring-down interference on compact surfaces before initiating envelope sampling.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                <div className="font-bold text-chalk-amber flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tactile-Piezo Zero-State Reset:</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Double agreement on chalk pen-down halts integration loops and resets IMU gyroscopic drift to zero on every stroke.
                </p>
              </div>
            </div>

          </div>

          {/* Right 6 Cols: Live Occlusion & Filter Simulator */}
          <div className="lg:col-span-6 slate-card p-6 sm:p-7 border border-white/10 bg-slate-950/90 shadow-2xl space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-chalk-cyan" />
                <h4 className="font-heading font-bold text-sm text-white">
                  Live Sensor Fusion Simulator
                </h4>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className={`px-2 py-0.5 rounded font-bold ${
                  mahalanobisValue > 6.2 ? 'bg-chalk-coral/20 text-chalk-coral' : 'bg-chalk-emerald/20 text-chalk-emerald'
                }`}>
                  &gamma;: {mahalanobisValue} {mahalanobisValue > 6.2 ? '(GATED OUT)' : '(ACCEPTED)'}
                </span>
              </div>
            </div>

            {/* Simulator Canvas */}
            <div className="relative w-full h-[260px] bg-slate-900 rounded-xl overflow-hidden cursor-crosshair border border-white/5 select-none">
              <canvas
                ref={simCanvasRef}
                width={500}
                height={260}
                onPointerMove={handleSimPointerMove}
                className="w-full h-full block"
              />

              <div className="absolute top-2 left-2 flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1 text-chalk-amber">
                  <span className="w-2 h-2 rounded-full bg-chalk-amber" />
                  Raw Noisy TDOA Path
                </span>
                <span className="flex items-center gap-1 text-chalk-cyan">
                  <span className="w-2 h-2 rounded-full bg-chalk-cyan" />
                  ARCKF Zero-Drift Output
                </span>
              </div>

              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-500">
                Click & drag to test noise rejection and occlusion gating
              </div>
            </div>

            {/* Interactive Simulation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={toggleOcclusion}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 ${
                  isOccluded
                    ? 'bg-chalk-coral/20 border-chalk-coral text-chalk-coral font-bold shadow-lg shadow-coral-500/10'
                    : 'bg-slate-800 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{isOccluded ? '⚠ Occlusion Simulated (NLOS)' : 'Simulate Body Occlusion'}</span>
              </button>

              <button
                onClick={handleSimClear}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 text-xs transition-all"
                title="Clear Simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* Pedagogical AI Layer Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          
          <div className="slate-card p-4 border border-white/10 bg-slate-950/80 space-y-2">
            <div className="flex items-center gap-2 text-chalk-cyan">
              <Cpu className="w-4 h-4" />
              <strong className="font-heading text-white text-xs">MobileNetV3 Edge Inference</strong>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Quantized model converts rough chalk sketches to clean geometric SVG paths in &lt;100ms.
            </p>
          </div>

          <div className="slate-card p-4 border border-white/10 bg-slate-950/80 space-y-2">
            <div className="flex items-center gap-2 text-chalk-emerald">
              <Mic className="w-4 h-4" />
              <strong className="font-heading text-white text-xs">Silero / WebRTC VAD</strong>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Isolates teacher voice on the ICS-43434 mic, filtering background rural classroom noise.
            </p>
          </div>

          <div className="slate-card p-4 border border-white/10 bg-slate-950/80 space-y-2">
            <div className="flex items-center gap-2 text-chalk-amber">
              <Activity className="w-4 h-4" />
              <strong className="font-heading text-white text-xs">Early Warning System (EWS)</strong>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Scikit-Learn ensemble model predicts student dropout risks with SHAP/LIME explainability.
            </p>
          </div>

          <div className="slate-card p-4 border border-white/10 bg-slate-950/80 space-y-2">
            <div className="flex items-center gap-2 text-chalk-violet">
              <UserCheck className="w-4 h-4" />
              <strong className="font-heading text-white text-xs">Dual-Layer Anti-Fraud Auth</strong>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Integrated RFID scan + ESP32 WiFi MAC verification prevents proxy attendance in &lt;3 seconds.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
