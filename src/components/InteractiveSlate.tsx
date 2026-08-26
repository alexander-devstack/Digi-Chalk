import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Wand2, 
  RotateCcw, 
  Trash2, 
  Download, 
  Activity, 
  Radio, 
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { recognizeShape } from '../utils/shapeRecognizer';
import { sound } from '../utils/sound';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
  shape?: any;
}

export const InteractiveSlate: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [autoBeautify, setAutoBeautify] = useState(true);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [telemetry, setTelemetry] = useState({ x: 218.4, y: 142.6, tdoa: 18.2, latency: 0.1 });
  const [beautifiedBadge, setBeautifiedBadge] = useState<string | null>(null);

  // High-DPI Canvas Scaling
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
  }, [setupCanvas]);

  // Initial welcome geometry demo
  useEffect(() => {
    setStrokes([
      {
        points: [
          { x: 120, y: 110 }, { x: 260, y: 110 }, { x: 260, y: 200 }, { x: 120, y: 200 }, { x: 120, y: 110 }
        ],
        color: '#0EA5E9',
        width: 2.5,
        shape: {
          type: 'rectangle',
          label: 'MobileNetV3 Bounding Box [99.2%]',
          bounds: { minX: 120, minY: 110, maxX: 260, maxY: 200 }
        }
      },
      {
        points: [
          { x: 380, y: 160 }, { x: 440, y: 80 }, { x: 500, y: 160 }, { x: 380, y: 160 }
        ],
        color: '#10B981',
        width: 2.5,
        shape: {
          type: 'triangle',
          label: 'Acoustic Triangulation [98.6%]',
          bounds: { minX: 380, minY: 80, maxX: 500, maxY: 160 },
          points: [{ x: 440, y: 80 }, { x: 500, y: 160 }, { x: 380, y: 160 }]
        }
      }
    ]);
  }, []);

  // Main Render Loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    // 1. Subtle Blackboard Grid Texture
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    const gridSize = 28;
    for (let x = 0; x < rect.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }
    for (let y = 0; y < rect.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Render Completed Strokes
    strokes.forEach((stroke) => {
      ctx.save();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.shape) {
        const s = stroke.shape;
        ctx.beginPath();
        if (s.type === 'circle' && s.center && s.radius) {
          ctx.arc(s.center.x, s.center.y, s.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = stroke.color + '12';
          ctx.fill();
        } else if (s.type === 'rectangle') {
          const { minX, minY, maxX, maxY } = s.bounds;
          ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
          ctx.fillStyle = stroke.color + '0e';
          ctx.fillRect(minX, minY, maxX - minX, maxY - minY);
        } else if (s.type === 'triangle' && s.points && s.points.length === 3) {
          ctx.moveTo(s.points[0].x, s.points[0].y);
          ctx.lineTo(s.points[1].x, s.points[1].y);
          ctx.lineTo(s.points[2].x, s.points[2].y);
          ctx.closePath();
          ctx.stroke();
          ctx.fillStyle = stroke.color + '12';
          ctx.fill();
        } else if (s.type === 'line' && s.points) {
          ctx.moveTo(s.points[0].x, s.points[0].y);
          ctx.lineTo(s.points[1].x, s.points[1].y);
          ctx.stroke();
        } else {
          stroke.points.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.stroke();
        }

        if (s.label) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = stroke.color;
          ctx.fillText(`⚡ ${s.label}`, s.bounds.minX, Math.max(14, s.bounds.minY - 5));
        }
      } else {
        ctx.beginPath();
        stroke.points.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x, p.y);
          else {
            const prev = stroke.points[idx - 1];
            const midX = (prev.x + p.x) / 2;
            const midY = (prev.y + p.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
        });
        ctx.stroke();
      }
      ctx.restore();
    });

    // 3. Current In-Progress Stroke
    if (currentStroke.length > 1) {
      ctx.save();
      ctx.strokeStyle = '#F8FAFC';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      currentStroke.forEach((p, idx) => {
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else {
          const prev = currentStroke[idx - 1];
          const midX = (prev.x + p.x) / 2;
          const midY = (prev.y + p.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
      });
      ctx.stroke();
      ctx.restore();
    }
  }, [strokes, currentStroke]);

  useEffect(() => {
    render();
  }, [render]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setCurrentStroke([{ x, y }]);
    sound.playChalkScratch(0.8);
    setTelemetry({ x: +x.toFixed(1), y: +y.toFixed(1), tdoa: 18.2, latency: 0.1 });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentStroke((prev) => [...prev, { x, y }]);
    setTelemetry({ x: +x.toFixed(1), y: +y.toFixed(1), tdoa: +(15 + Math.random() * 8).toFixed(1), latency: 0.1 });
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentStroke.length > 2) {
      let shape: any = null;
      if (autoBeautify) {
        shape = recognizeShape(currentStroke);
        if (shape) {
          sound.playSuccessChime();
          setBeautifiedBadge(`Recognized ${shape.label}`);
          setTimeout(() => setBeautifiedBadge(null), 3000);
        }
      }

      setStrokes((prev) => [
        ...prev,
        {
          points: currentStroke,
          color: shape ? '#0EA5E9' : '#F8FAFC',
          width: 3,
          shape: shape || undefined,
        }
      ]);
    }
    setCurrentStroke([]);
  };

  const handleClear = () => {
    sound.playClick(500);
    setStrokes([]);
  };

  const handleUndo = () => {
    sound.playClick(650);
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handleDownload = () => {
    sound.playClick(900);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0B0F19';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.download = `digi-chalk-slate-${Date.now()}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="w-full slate-card p-4 sm:p-5 flex flex-col gap-4 shadow-xl relative overflow-hidden bg-slate-900/90 border border-white/10">
      
      {/* Top Slate Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        
        {/* HUD Pill Badge */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-chalk-emerald animate-pulse" />
            <span>X: <strong className="text-white">{telemetry.x}mm</strong></span>
            <span>Y: <strong className="text-white">{telemetry.y}mm</strong></span>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-white/10 text-slate-400">
            <span>TDOA Delta: <strong className="text-chalk-cyan">{telemetry.tdoa}µs</strong></span>
          </div>

          <div className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-white/10 text-chalk-emerald">
            <span>IMU Fusion: Active</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800 border border-white/10 text-slate-400">
            <span>Sync Latency: &lt;1ms</span>
          </div>
        </div>

        {/* Auto-Beautify Switch */}
        <button
          onClick={() => {
            sound.playClick(750);
            setAutoBeautify(!autoBeautify);
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
            autoBeautify
              ? 'bg-chalk-cyan/15 border-chalk-cyan/50 text-chalk-cyan font-semibold'
              : 'bg-slate-800 border-white/10 text-slate-400'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Edge Auto-Beautify: {autoBeautify ? 'ON' : 'OFF'}</span>
        </button>

      </div>

      {/* Canvas Drawing Surface */}
      <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-950/95 rounded-xl overflow-hidden cursor-crosshair border border-white/5 select-none">
        
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-full block"
        />

        {/* Recognition notification */}
        {beautifiedBadge && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-slate-900/95 border border-chalk-cyan text-xs font-mono text-chalk-cyan shadow-xl backdrop-blur-md flex items-center gap-1.5 animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-chalk-cyan" />
            <span>{beautifiedBadge}</span>
          </div>
        )}

        {/* Chalkboard watermark instruction */}
        <div className="absolute bottom-3 left-3 text-[11px] font-mono text-slate-500 pointer-events-none">
          Draw rough circles, boxes, triangles, or lines to trigger edge geometric inference
        </div>

      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-1">
        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-chalk-emerald" />
          <span>Continuous 250Hz Ultrasonic Multilateration Sampling</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 border border-white/10 text-slate-300 text-xs transition-all"
            title="Undo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleClear}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-300 text-xs transition-all"
            title="Clear Slate"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-chalk-cyan" />
            <span>Export</span>
          </button>
        </div>
      </div>

    </div>
  );
};
