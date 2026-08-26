import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Activity, 
  Thermometer, 
  Radio, 
  Zap, 
  Cpu, 
  Waves, 
  HelpCircle, 
  RefreshCw, 
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { KalmanFilter2D } from '../utils/kalmanFilter';
import { sound } from '../utils/sound';

export const TdoaPhysicsSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Pen state on the 2D blackboard
  const [penPos, setPenPos] = useState({ x: 420, y: 260 });
  const [isDragging, setIsDragging] = useState(false);
  const [temperature, setTemperature] = useState(25); // Celsius
  const [useKalman, setUseKalman] = useState(true);
  const [noiseLevel, setNoiseLevel] = useState(0.4); // Noise amplitude (mm)
  const [numReceivers, setNumReceivers] = useState<2 | 3 | 4>(2);
  const [waveRingRadius, setWaveRingRadius] = useState(0);

  // Kalman filter instance
  const kalmanRef = useRef(new KalmanFilter2D(0.008, 0.05));
  const noisyPointRef = useRef({ x: 420, y: 260 });
  const filteredPointRef = useRef({ x: 420, y: 260 });

  // Speed of sound calculated from temperature
  const speedOfSound = +(331.3 * Math.sqrt(1 + temperature / 273.15)).toFixed(2); // m/s
  const speedOfSoundMmPerUs = (speedOfSound * 1000) / 1000000; // mm / microsecond

  // Receivers positions on a 800 x 480 canvas
  const receivers = [
    { id: 'Mic-L (0,0)', x: 120, y: 60, name: 'Receiver A (Left)' },
    { id: 'Mic-R (600,0)', x: 680, y: 60, name: 'Receiver B (Right)' },
    { id: 'Mic-Bottom (300,400)', x: 400, y: 440, name: 'Receiver C (Base)' },
    { id: 'Mic-Top-Mid (300,0)', x: 400, y: 60, name: 'Receiver D (Center)' },
  ].slice(0, numReceivers);

  // Calculate distances & TDOA times
  const dist1 = Math.hypot(penPos.x - receivers[0].x, penPos.y - receivers[0].y);
  const dist2 = Math.hypot(penPos.x - receivers[1].x, penPos.y - receivers[1].y);
  const deltaD = dist1 - dist2; // mm
  const deltaT = deltaD / speedOfSoundMmPerUs; // microseconds

  // Animate wave pulses
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveRingRadius((r) => (r > 380 ? 0 : r + 6));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Update Kalman state
  useEffect(() => {
    // Generate synthetic acoustic jitter
    const noiseX = (Math.random() - 0.5) * noiseLevel * 12;
    const noiseY = (Math.random() - 0.5) * noiseLevel * 12;
    const measuredX = penPos.x + noiseX;
    const measuredY = penPos.y + noiseY;

    noisyPointRef.current = { x: measuredX, y: measuredY };
    const filtered = kalmanRef.current.update(measuredX, measuredY, 0.03);
    filteredPointRef.current = { x: filtered.x, y: filtered.y };
  }, [penPos, noiseLevel]);

  // Canvas Drawing
  const drawSimulator = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Blackboard Background Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. Draw Hyperbolic Multilateration Curve
    // Locus of points: dist(P, Mic1) - dist(P, Mic2) = deltaD
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    let started = false;
    for (let y = 60; y < height - 20; y += 4) {
      // Find x where hypot(x - r0.x, y - r0.y) - hypot(x - r1.x, y - r1.y) ≈ deltaD
      // Numerical scan across x
      for (let x = 120; x < 680; x += 4) {
        const d1 = Math.hypot(x - receivers[0].x, y - receivers[0].y);
        const d2 = Math.hypot(x - receivers[1].x, y - receivers[1].y);
        if (Math.abs(d1 - d2 - deltaD) < 3.5) {
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
          break;
        }
      }
    }
    ctx.stroke();
    ctx.restore();

    // 3. Draw Ultrasonic Wavefront Propagation Rings from Pen Tip
    ctx.save();
    for (let i = 0; i < 3; i++) {
      const r = (waveRingRadius + i * 110) % 380;
      const alpha = Math.max(0, 1 - r / 380) * 0.45;
      ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(penPos.x, penPos.y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 4. Draw Ray Distance Lines from Pen to Receivers
    receivers.forEach((rec, idx) => {
      ctx.save();
      ctx.strokeStyle = idx === 0 ? 'rgba(56, 189, 248, 0.6)' : 'rgba(251, 191, 36, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(rec.x, rec.y);
      ctx.lineTo(penPos.x, penPos.y);
      ctx.stroke();

      // Distance Label on Midpoint
      const midX = (rec.x + penPos.x) / 2;
      const midY = (rec.y + penPos.y) / 2;
      const d = Math.round(Math.hypot(penPos.x - rec.x, penPos.y - rec.y));
      ctx.fillStyle = idx === 0 ? '#38BDF8' : '#FBBF24';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`d${idx + 1}=${d}mm`, midX + 8, midY - 6);
      ctx.restore();
    });

    // 5. Draw Receiver Bar Mounting & Microphones
    // Bar between Mic-L and Mic-R
    ctx.save();
    ctx.fillStyle = '#182230';
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2;
    ctx.strokeRect(100, 48, 600, 24);
    ctx.fillRect(100, 48, 600, 24);

    // Label on Receiver Bar
    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px "Space Grotesk", sans-serif';
    ctx.fillText('DIGI-CHALK TOP MAGNETIC RECEIVER BAR (600mm Baseline)', 240, 64);

    receivers.forEach((rec, idx) => {
      // Mic Circle
      ctx.fillStyle = idx === 0 ? '#38BDF8' : '#FBBF24';
      ctx.beginPath();
      ctx.arc(rec.x, rec.y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Outer Pulse Ring
      ctx.strokeStyle = idx === 0 ? '#38BDF8' : '#FBBF24';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(rec.x, rec.y, 14, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(rec.name, rec.x - 30, rec.y - 20);
    });
    ctx.restore();

    // 6. Draw Pen Stylus Tip & Kalman Filter Track
    const activePoint = useKalman ? filteredPointRef.current : noisyPointRef.current;

    // Noisy Scatter Cloud
    if (!useKalman) {
      ctx.save();
      ctx.fillStyle = 'rgba(251, 113, 133, 0.4)';
      for (let i = 0; i < 6; i++) {
        const jx = penPos.x + (Math.random() - 0.5) * noiseLevel * 16;
        const jy = penPos.y + (Math.random() - 0.5) * noiseLevel * 16;
        ctx.beginPath();
        ctx.arc(jx, jy, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // Stylus Tip Body
    ctx.save();
    ctx.fillStyle = '#34D399';
    ctx.shadowColor = '#34D399';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(activePoint.x, activePoint.y, 10, 0, Math.PI * 2);
    ctx.fill();

    // Inner Core
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(activePoint.x, activePoint.y, 4, 0, Math.PI * 2);
    ctx.fill();

    // Stylus Coordinate Label
    ctx.font = 'bold 11px "JetBrains Mono", monospace';
    ctx.fillStyle = '#34D399';
    ctx.fillText(`Stylus (X:${Math.round(activePoint.x)}, Y:${Math.round(activePoint.y)})`, activePoint.x + 16, activePoint.y + 4);
    ctx.restore();

  }, [penPos, useKalman, noiseLevel, numReceivers, waveRingRadius, deltaD, deltaT, receivers]);

  useEffect(() => {
    drawSimulator();
  }, [drawSimulator]);

  // Pointer dragging on canvas
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDragging(true);
    setPenPos({ x: Math.max(120, Math.min(680, x)), y: Math.max(90, Math.min(420, y)) });
    sound.playTdoaPing();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPenPos({ x: Math.max(120, Math.min(680, x)), y: Math.max(90, Math.min(420, y)) });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="tdoa-physics" className="py-20 bg-slate-900/50 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>Acoustic Wave Physics & Multilateration Engine</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Sub-Millimeter TDOA Triangulation
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Digi-Chalk emits continuous 40kHz ultrasonic pulses from the chalk tip. The top receiver bar measures the microsecond arrival time differential ($\Delta t$) between two spaced MEMS microphones to solve hyperbolic intersection coordinates at <strong className="text-chalk-cyan font-mono">0.24mm precision</strong>.
          </p>
        </div>

        {/* Main Interactive Physics Simulator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left 2 Cols: Interactive Canvas */}
          <div className="lg:col-span-2 glass-card rounded-2xl border border-white/10 p-4 sm:p-5 flex flex-col gap-4 bg-slate-950/80 shadow-2xl">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Waves className="w-4 h-4 text-chalk-emerald animate-pulse" />
                <span className="font-heading font-semibold text-sm text-slate-100">
                  Interactive Blackboard Acoustic Grid (800mm × 480mm)
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Drag the <span className="text-chalk-emerald font-bold">green stylus</span> to simulate pen position
              </span>
            </div>

            {/* Canvas Surface */}
            <div className="relative w-full h-[320px] sm:h-[400px] bg-slate-900/90 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/5 select-none">
              <canvas
                ref={canvasRef}
                width={800}
                height={480}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="w-full h-full block"
              />

              {/* Math Legend Overlay */}
              <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-white/10 rounded-xl p-2.5 font-mono text-[11px] space-y-1 backdrop-blur-md">
                <div className="text-slate-300">Hyperbolic Equation: <span className="text-chalk-cyan">d₁ - d₂ = v · Δt</span></div>
                <div className="text-slate-400">Baseline separation (b): <span className="text-white">560 mm</span></div>
              </div>
            </div>

            {/* Live Formula Values Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-slate-400 text-[10px] block">Left Mic (d₁):</span>
                <span className="font-bold text-chalk-cyan">{Math.round(dist1)} mm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-slate-400 text-[10px] block">Right Mic (d₂):</span>
                <span className="font-bold text-chalk-amber">{Math.round(dist2)} mm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-slate-400 text-[10px] block">Distance Δd:</span>
                <span className="font-bold text-chalk-coral">{Math.round(deltaD)} mm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                <span className="text-slate-400 text-[10px] block">Time Diff (Δt):</span>
                <span className="font-bold text-chalk-emerald">{Math.round(deltaT)} μs</span>
              </div>
            </div>

          </div>

          {/* Right Col: Controls & Mathematical Parameters */}
          <div className="space-y-4">
            
            {/* Control Box 1: Temperature & Speed of Sound */}
            <div className="glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-chalk-coral" />
                  <h3 className="font-heading font-semibold text-sm text-slate-100">
                    Speed of Sound ($v$) vs Temp
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-chalk-coral">
                  {temperature}°C
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                  <span>Classroom Temperature:</span>
                  <span className="text-white font-bold">{temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="45"
                  step="1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>10°C (Winter)</span>
                  <span>25°C (Standard)</span>
                  <span>45°C (Summer)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 font-mono text-xs space-y-1">
                <div className="text-slate-400 text-[11px]">Calculated Acoustic Velocity:</div>
                <div className="text-chalk-cyan font-bold text-base flex items-baseline gap-1">
                  <span>v = 331.3 × √(1 + T/273.15)</span>
                </div>
                <div className="text-chalk-emerald font-bold text-sm">
                  = {speedOfSound} m/s ({speedOfSoundMmPerUs.toFixed(4)} mm/μs)
                </div>
              </div>
            </div>

            {/* Control Box 2: Kalman Filter & Jitter Rejection */}
            <div className="glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-chalk-cyan" />
                  <h3 className="font-heading font-semibold text-sm text-slate-100">
                    2D State-Space Kalman Filter
                  </h3>
                </div>
                <button
                  onClick={() => {
                    sound.playClick(800);
                    setUseKalman(!useKalman);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
                    useKalman
                      ? 'bg-chalk-emerald/20 border-chalk-emerald text-chalk-emerald'
                      : 'bg-chalk-coral/20 border-chalk-coral text-chalk-coral'
                  }`}
                >
                  {useKalman ? 'ENABLED' : 'RAW JITTER'}
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                The onboard ESP32-S3 runs a 2D Kalman filter combining acoustic TDOA distance with the MPU6050 accelerometer vector, eliminating chalkboard vibration and ultrasonic bounce echoes.
              </p>

              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                  <span>Acoustic Multi-path Echo Noise:</span>
                  <span className="text-chalk-amber font-bold">{(noiseLevel * 10).toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.1"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-chalk-emerald">
                <CheckCircle2 className="w-4 h-4 text-chalk-emerald" />
                <span>Zero Cloud Delay • On-Chip DSP</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
