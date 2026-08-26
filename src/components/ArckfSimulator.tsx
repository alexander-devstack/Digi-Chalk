import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Activity, 
  Cpu, 
  Layers, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  EyeOff, 
  HelpCircle, 
  Wand2, 
  Flame, 
  BrainCircuit, 
  Lock, 
  Key,
  TrendingDown,
  RotateCcw
} from 'lucide-react';
import { sound } from '../utils/sound';

export const ArckfSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [filterMode, setFilterMode] = useState<'raw' | 'arckf_rts' | 'arckf_lstm'>('arckf_lstm');
  const [isOccluded, setIsOccluded] = useState(false);
  const [mahalanobisThreshold] = useState(6.2); // Chi-Square alpha = 0.001
  const [currentMahalanobis, setCurrentMahalanobis] = useState(2.14);
  const [guardDelayActive, setGuardDelayActive] = useState(false);
  const [silentQuestionDetected, setSilentQuestionDetected] = useState(false);
  const [strokeSpeedMode, setStrokeSpeedMode] = useState<'normal' | 'heatmap'>('heatmap');
  const [dropoutScore, setDropoutScore] = useState(24); // 0-100 scale

  // Simulated pen trajectory points on the canvas
  const [penPath, setPenPath] = useState<{ x: number; y: number; rawX: number; rawY: number; speed: number; rejected: boolean }[]>([
    { x: 100, y: 180, rawX: 100, rawY: 180, speed: 1.2, rejected: false },
    { x: 160, y: 140, rawX: 164, rawY: 136, speed: 2.5, rejected: false },
    { x: 220, y: 110, rawX: 218, rawY: 114, speed: 3.1, rejected: false },
    { x: 280, y: 130, rawX: 285, rawY: 125, speed: 2.8, rejected: false },
    { x: 340, y: 170, rawX: 338, rawY: 175, speed: 1.5, rejected: false },
    { x: 400, y: 220, rawX: 410, rawY: 230, speed: 0.8, rejected: false },
    { x: 460, y: 240, rawX: 455, rawY: 245, speed: 0.6, rejected: false },
    { x: 520, y: 210, rawX: 524, rawY: 206, speed: 1.9, rejected: false },
    { x: 580, y: 160, rawX: 578, rawY: 162, speed: 2.4, rejected: false },
  ]);

  const [isDrawing, setIsDrawing] = useState(false);

  // Trigger synthetic NLOS Occlusion (e.g. Teacher body blocking line of sight)
  const toggleOcclusion = () => {
    sound.playClick(650);
    const newOcc = !isOccluded;
    setIsOccluded(newOcc);
    if (newOcc) {
      setCurrentMahalanobis(8.74); // Exceeds 6.2 threshold -> Gating active
      setGuardDelayActive(true);
    } else {
      setCurrentMahalanobis(2.35);
      setGuardDelayActive(false);
    }
  };

  // Draw on the simulation canvas
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // 1. Grid
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

    // 2. If Occluded, Draw Teacher Body Obstacle Zone
    if (isOccluded) {
      ctx.save();
      ctx.fillStyle = 'rgba(251, 113, 133, 0.12)';
      ctx.strokeStyle = 'rgba(251, 113, 133, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.roundRect(240, 40, 180, 220, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FB7185';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText('⚠ NLOS Teacher Body Occlusion Zone', 250, 60);
      ctx.fillText('Mahalanobis γ = 8.74 (Threshold > 6.2)', 250, 75);
      ctx.restore();
    }

    if (penPath.length < 2) return;

    // 3. Render Raw Noisy Jitter Path (if selected or comparison)
    if (filterMode === 'raw') {
      ctx.save();
      ctx.strokeStyle = '#FB7185';
      ctx.lineWidth = 2;
      ctx.beginPath();
      penPath.forEach((pt, i) => {
        const jitterX = isOccluded && pt.x > 240 && pt.x < 420 ? pt.rawX + (Math.random() - 0.5) * 45 : pt.rawX;
        const jitterY = isOccluded && pt.x > 240 && pt.x < 420 ? pt.rawY + (Math.random() - 0.5) * 45 : pt.rawY;
        if (i === 0) ctx.moveTo(jitterX, jitterY);
        else ctx.lineTo(jitterX, jitterY);

        // Scatter dots
        ctx.fillStyle = '#FB7185';
        ctx.fillRect(jitterX - 2, jitterY - 2, 4, 4);
      });
      ctx.stroke();
      ctx.restore();
    } else {
      // 4. Render ARCKF + RTS Smoothed + LSTM Trajectory Path
      ctx.save();
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < penPath.length - 1; i++) {
        const p1 = penPath[i];
        const p2 = penPath[i + 1];

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;
        ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);

        // Stroke speed heatmap colors (cyan = fast, amber = medium, coral = slow deliberate pause)
        if (strokeSpeedMode === 'heatmap') {
          if (p1.speed < 1.0) ctx.strokeStyle = '#FB7185'; // Slow / pause
          else if (p1.speed < 2.0) ctx.strokeStyle = '#FBBF24'; // Medium
          else ctx.strokeStyle = '#38BDF8'; // Fast stroke
        } else {
          ctx.strokeStyle = '#34D399';
        }

        ctx.shadowColor = ctx.strokeStyle;
        ctx.shadowBlur = 10;
        ctx.stroke();
      }
      ctx.restore();

      // Draw active pen tip
      const lastPt = penPath[penPath.length - 1];
      ctx.save();
      ctx.fillStyle = '#34D399';
      ctx.beginPath();
      ctx.arc(lastPt.x, lastPt.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

  }, [penPath, filterMode, isOccluded, strokeSpeedMode]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    const initialPt = { x, y, rawX: x + (Math.random() - 0.5) * 8, rawY: y + (Math.random() - 0.5) * 8, speed: 1.5, rejected: false };
    setPenPath([initialPt]);
    sound.playChalkScratch(1.0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate speed
    const prev = penPath[penPath.length - 1] || { x, y };
    const dist = Math.hypot(x - prev.x, y - prev.y);
    const speed = Math.min(4.0, dist * 0.2);

    // Apply synthetic noise or occlusion rejection
    const inOcclusionZone = isOccluded && x > 240 && x < 420;
    const rawNoise = inOcclusionZone ? (Math.random() - 0.5) * 40 : (Math.random() - 0.5) * 6;

    // Check for '?' shape trigger
    if (penPath.length > 15 && Math.abs(x - penPath[0].x) < 30 && y > penPath[0].y + 60) {
      if (!silentQuestionDetected) {
        setSilentQuestionDetected(true);
        sound.playSuccessChime();
      }
    }

    setPenPath((prevPath) => [
      ...prevPath,
      {
        x: inOcclusionZone && filterMode !== 'raw' ? prev.x + (x - prev.x) * 0.85 : x,
        y: inOcclusionZone && filterMode !== 'raw' ? prev.y + (y - prev.y) * 0.85 : y,
        rawX: x + rawNoise,
        rawY: y + rawNoise,
        speed,
        rejected: inOcclusionZone,
      }
    ]);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handleResetPath = () => {
    sound.playClick(600);
    setSilentQuestionDetected(false);
    setPenPath([
      { x: 100, y: 180, rawX: 100, rawY: 180, speed: 1.2, rejected: false },
      { x: 160, y: 140, rawX: 164, rawY: 136, speed: 2.5, rejected: false },
      { x: 220, y: 110, rawX: 218, rawY: 114, speed: 3.1, rejected: false },
      { x: 280, y: 130, rawX: 285, rawY: 125, speed: 2.8, rejected: false },
      { x: 340, y: 170, rawX: 338, rawY: 175, speed: 1.5, rejected: false },
      { x: 400, y: 220, rawX: 410, rawY: 230, speed: 0.8, rejected: false },
      { x: 460, y: 240, rawX: 455, rawY: 245, speed: 0.6, rejected: false },
      { x: 520, y: 210, rawX: 524, rawY: 206, speed: 1.9, rejected: false },
      { x: 580, y: 160, rawX: 578, rawY: 162, speed: 2.4, rejected: false },
    ]);
  };

  return (
    <section id="arckf-pipeline" className="py-20 bg-slate-900/60 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan mb-3">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Mathematical Moat & Sensor Fusion</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Zero-Drift Sensor Fusion & Classroom AI Telemetry
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Digi-Chalk integrates an <strong className="text-white">Adaptive-Robust Complementary Kalman Filter (ARCKF)</strong> with Mahalanobis $\chi^2$ gating and LSTM trajectory correction to reject NLOS teacher body occlusions and multipath echoes.
          </p>
        </div>

        {/* Mathematical Moat Formulas & Pipeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left 7 Cols: Interactive Live ARCKF + Occlusion Simulator */}
          <div className="lg:col-span-7 glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/90 shadow-2xl flex flex-col gap-4">
            
            {/* Header & Mode Switches */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-chalk-emerald animate-pulse" />
                <span className="font-heading font-semibold text-sm text-slate-100">
                  Live ARCKF Trajectory & NLOS Occlusion Canvas
                </span>
              </div>

              {/* Reset & Speed Heatmap Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sound.playClick(750);
                    setStrokeSpeedMode(strokeSpeedMode === 'heatmap' ? 'normal' : 'heatmap');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
                    strokeSpeedMode === 'heatmap'
                      ? 'bg-chalk-amber/20 border-chalk-amber text-chalk-amber font-bold'
                      : 'bg-slate-900 border-white/10 text-slate-400'
                  }`}
                >
                  <Flame className="w-3 h-3 inline mr-1" />
                  Speed Heatmap: {strokeSpeedMode === 'heatmap' ? 'ON' : 'OFF'}
                </button>

                <button
                  onClick={handleResetPath}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                  title="Reset Path"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Drawing Surface */}
            <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-900/90 rounded-xl overflow-hidden cursor-crosshair border border-white/5 select-none">
              <canvas
                ref={canvasRef}
                width={700}
                height={380}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="w-full h-full block"
              />

              {/* Silent Question Trigger Banner */}
              {silentQuestionDetected && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-chalk-amber px-3.5 py-1.5 rounded-full font-mono text-xs text-chalk-amber flex items-center gap-2 shadow-xl animate-bounce">
                  <HelpCircle className="w-4 h-4 text-chalk-amber" />
                  <span>Silent-Question '?' Detected • Flagged for Assistance</span>
                </div>
              )}

              {/* Watermark legend */}
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-slate-400 pointer-events-none bg-slate-950/80 p-2 rounded-lg backdrop-blur-md">
                Draw across the canvas or toggle Teacher Occlusion to test zero-drift gating
              </div>
            </div>

            {/* Filter Mode Selector Pills & NLOS Occlusion Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              
              {/* Filter Toggles */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-white/10 font-mono text-xs">
                <button
                  onClick={() => {
                    sound.playClick(600);
                    setFilterMode('raw');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    filterMode === 'raw'
                      ? 'bg-chalk-coral/20 text-chalk-coral font-bold border border-chalk-coral/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Raw Noisy Jitter
                </button>

                <button
                  onClick={() => {
                    sound.playClick(800);
                    setFilterMode('arckf_lstm');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    filterMode === 'arckf_lstm'
                      ? 'bg-chalk-emerald/20 text-chalk-emerald font-bold border border-chalk-emerald/30 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ★ ARCKF + RTS/LSTM
                </button>
              </div>

              {/* Simulate Teacher Body Occlusion Trigger */}
              <button
                onClick={toggleOcclusion}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 border transition-all ${
                  isOccluded
                    ? 'bg-chalk-coral/20 border-chalk-coral text-chalk-coral shadow-lg shadow-chalk-coral/10'
                    : 'bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <EyeOff className="w-4 h-4" />
                <span>{isOccluded ? 'Teacher Occlusion: ACTIVE' : 'Simulate Teacher Occlusion'}</span>
              </button>

            </div>

            {/* Live Gating Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-[10px] text-slate-400 block">Mahalanobis γ:</span>
                <span className={`font-bold ${currentMahalanobis > 6.2 ? 'text-chalk-coral' : 'text-chalk-emerald'}`}>
                  {currentMahalanobis.toFixed(2)} {currentMahalanobis > 6.2 ? '(REJECTED)' : '(ACCEPTED)'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-[10px] text-slate-400 block">χ² Threshold (α=0.001):</span>
                <span className="font-bold text-chalk-cyan">{mahalanobisThreshold}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-[10px] text-slate-400 block">300μs Guard Delay:</span>
                <span className={`font-bold ${guardDelayActive ? 'text-chalk-amber' : 'text-slate-400'}`}>
                  {guardDelayActive ? 'Engaged' : 'Standby'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-[10px] text-slate-400 block">Trajectory Precision:</span>
                <span className="font-bold text-chalk-emerald">±0.24 mm</span>
              </div>
            </div>

          </div>

          {/* Right 5 Cols: Mathematical Formulations & Cloud-ML AI Engine */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Box 1: Mathematical Formulation Rendering */}
            <div className="glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/90 shadow-2xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-chalk-cyan" />
                  <span>ARCKF Mahalanobis Formulation</span>
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chalk-cyan/10 text-chalk-cyan">
                  Eq. 4.1
                </span>
              </div>

              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Adaptive-Robust Complementary Kalman Filter calculates the normalized innovation vector &gamma;<sub>k,i</sub>:
              </p>

              {/* Mathematical Equation Block */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-chalk-cyan/30 text-center font-mono text-xs sm:text-sm text-chalk-cyan overflow-x-auto shadow-inner">
                {"γ_{k,i} = (Z_{k,i} - H_{k,i}X_k)^T (H_{k,i}P_k^-H_{k,i}^T + R_{k,i})^{-1} (Z_{k,i} - H_{k,i}X_k)"}
              </div>

              <ul className="space-y-1.5 text-[11px] font-mono text-slate-300">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-chalk-emerald shrink-0 mt-0.5" />
                  <span><strong>Mahalanobis Gating:</strong> If &gamma; &gt; 6.2, acoustic measurement is gated out as NLOS reflection.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-chalk-emerald shrink-0 mt-0.5" />
                  <span><strong>RTS Smoothing & LSTM:</strong> Backward pass smooths trajectory, eliminating coordinate jumps.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-chalk-emerald shrink-0 mt-0.5" />
                  <span><strong>300μs Ring-Down Guard:</strong> Ignores near-field acoustic ringing on tight blackboards.</span>
                </li>
              </ul>
            </div>

            {/* Box 2: Cloud-ML Early Warning System (EWS) & Dropout Risk */}
            <div className="glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/90 shadow-2xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-chalk-amber" />
                  <h4 className="font-heading font-bold text-sm text-white">
                    Cloud-ML Early Warning System (EWS)
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-chalk-amber">Scikit-Learn Ensemble</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Aggregates stroke velocity pauses, silent questions, and attendance to compute real-time student disengagement risk scores.
              </p>

              {/* Dropout Risk Score Gauge */}
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Class Dropout Risk Score:</span>
                  <div className="font-heading font-black text-xl text-chalk-emerald mt-0.5">
                    {dropoutScore} / 100 <span className="text-xs font-normal text-chalk-emerald">(Low Risk)</span>
                  </div>
                </div>
                <div className="text-right text-[10px] text-slate-400">
                  <span>SHAP / LIME Explainable</span>
                  <div className="text-chalk-cyan font-semibold">Pedagogical Factor: 82%</div>
                </div>
              </div>

              {/* Dual-Layer Anti-Fraud Authentication */}
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-chalk-cyan" />
                  <span>Dual Anti-Fraud: RFID + ESP32 MAC</span>
                </div>
                <span className="text-chalk-emerald font-bold">&lt;3s Verified</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
