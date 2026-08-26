import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  Eraser, 
  RotateCcw, 
  Trash2, 
  Download, 
  Wand2, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Info,
  Maximize2
} from 'lucide-react';
import { Point, Stroke, DetectedShape } from '../types';
import { recognizeShape } from '../utils/shapeRecognizer';
import { sound } from '../utils/sound';

interface ChalkCanvasProps {
  onPenMove?: (x: number, y: number, pressure: number, isDrawing: boolean) => void;
}

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

const CHALK_COLORS = [
  { name: 'Neon White', value: '#F8FAFC', glow: 'rgba(248, 250, 252, 0.4)' },
  { name: 'Chalk Cyan', value: '#38BDF8', glow: 'rgba(56, 189, 248, 0.5)' },
  { name: 'Emerald Glow', value: '#34D399', glow: 'rgba(52, 211, 153, 0.5)' },
  { name: 'Amber Energy', value: '#FBBF24', glow: 'rgba(251, 191, 36, 0.5)' },
  { name: 'Coral Highlighter', value: '#FB7185', glow: 'rgba(251, 113, 133, 0.5)' },
  { name: 'Violet Beam', value: '#A78BFA', glow: 'rgba(167, 139, 250, 0.5)' },
];

export const ChalkCanvas: React.FC<ChalkCanvasProps> = ({ onPenMove }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState(CHALK_COLORS[1].value);
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [autoBeautify, setAutoBeautify] = useState(true);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [lastDetectedShape, setLastDetectedShape] = useState<DetectedShape | null>(null);
  const [aiDetectionBanner, setAiDetectionBanner] = useState<string | null>(null);

  const particlesRef = useRef<DustParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Initialize Canvas & High-DPI scaling
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

  // Load initial welcome chalkboard sketch
  useEffect(() => {
    // Add initial pre-drawn welcome demo
    const initialShapes: Stroke[] = [
      {
        points: [
          { x: 120, y: 140 }, { x: 260, y: 140 }, { x: 260, y: 240 }, { x: 120, y: 240 }, { x: 120, y: 140 }
        ],
        color: '#38BDF8',
        width: 3,
        type: 'chalk',
        beautifiedShape: {
          type: 'rectangle',
          confidence: 0.98,
          bounds: { minX: 120, minY: 140, maxX: 260, maxY: 240 },
          center: { x: 190, y: 190 },
          label: 'MobileNetV3 Edge Bounding Box [98.4%]',
          latex: 'A = \\Delta x \\times \\Delta y',
        }
      },
      {
        points: [
          { x: 380, y: 190 }, { x: 440, y: 110 }, { x: 500, y: 190 }, { x: 380, y: 190 }
        ],
        color: '#34D399',
        width: 3,
        type: 'chalk',
        beautifiedShape: {
          type: 'triangle',
          confidence: 0.96,
          bounds: { minX: 380, minY: 110, maxX: 500, maxY: 190 },
          center: { x: 440, y: 160 },
          points: [{ x: 440, y: 110 }, { x: 500, y: 190 }, { x: 380, y: 190 }],
          label: 'Acoustic Triangulation Triangle [96.7%]',
          latex: 'd_1^2 + d_2^2 - 2 d_1 d_2 \\cos(\\theta)',
        }
      }
    ];
    setStrokes(initialShapes);
  }, []);

  // Spawn chalk dust particles
  const spawnDust = (x: number, y: number, color: string, count: number = 3) => {
    for (let i = 0; i < count; i++) {
      particlesRef.current.push({
        x: x + (Math.random() * 8 - 4),
        y: y + (Math.random() * 8 - 4),
        vx: (Math.random() - 0.5) * 1.5,
        vy: Math.random() * 1.2 + 0.4, // Fall softly
        alpha: 0.7 + Math.random() * 0.3,
        size: Math.random() * 2.2 + 0.8,
        color,
      });
    }
    // Limit max particles
    if (particlesRef.current.length > 150) {
      particlesRef.current.splice(0, particlesRef.current.length - 150);
    }
  };

  // Render Loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    // 1. Draw Subtle Slate Grid & Blackboard texture
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.lineWidth = 1;
    const gridSize = 32;
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

    // 2. Render Completed Strokes & Beautified Shapes
    strokes.forEach((stroke) => {
      ctx.save();
      if (stroke.type === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = stroke.width * 4;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.shadowColor = stroke.color;
        ctx.shadowBlur = 8;
      }

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // If beautified shape exists, render crisp geometry
      if (stroke.beautifiedShape && stroke.type !== 'eraser') {
        const shape = stroke.beautifiedShape;
        ctx.beginPath();

        if (shape.type === 'circle' && shape.center && shape.radius) {
          ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, Math.PI * 2);
          ctx.stroke();
          // Subtle fill glow
          ctx.fillStyle = stroke.color + '15';
          ctx.fill();
        } else if (shape.type === 'rectangle') {
          const { minX, minY, maxX, maxY } = shape.bounds;
          ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
          ctx.fillStyle = stroke.color + '10';
          ctx.fillRect(minX, minY, maxX - minX, maxY - minY);
        } else if (shape.type === 'triangle' && shape.points && shape.points.length === 3) {
          ctx.moveTo(shape.points[0].x, shape.points[0].y);
          ctx.lineTo(shape.points[1].x, shape.points[1].y);
          ctx.lineTo(shape.points[2].x, shape.points[2].y);
          ctx.closePath();
          ctx.stroke();
          ctx.fillStyle = stroke.color + '15';
          ctx.fill();
        } else if (shape.type === 'line' && shape.points && shape.points.length >= 2) {
          ctx.moveTo(shape.points[0].x, shape.points[0].y);
          ctx.lineTo(shape.points[1].x, shape.points[1].y);
          ctx.stroke();
        } else if (shape.type === 'arrow' && shape.points && shape.points.length >= 2) {
          const start = shape.points[0];
          const end = shape.points[1];
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();

          // Arrow head
          const angle = Math.atan2(end.y - start.y, end.x - start.x);
          const headLen = 14;
          ctx.beginPath();
          ctx.moveTo(end.x, end.y);
          ctx.lineTo(end.x - headLen * Math.cos(angle - Math.PI / 6), end.y - headLen * Math.sin(angle - Math.PI / 6));
          ctx.moveTo(end.x, end.y);
          ctx.lineTo(end.x - headLen * Math.cos(angle + Math.PI / 6), end.y - headLen * Math.sin(angle + Math.PI / 6));
          ctx.stroke();
        } else {
          // Fallback render regular points
          ctx.beginPath();
          stroke.points.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          });
          ctx.stroke();
        }

        // Draw shape AI badge
        if (shape.label) {
          ctx.save();
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = stroke.color;
          ctx.shadowBlur = 0;
          const badgeX = shape.bounds.minX;
          const badgeY = Math.max(16, shape.bounds.minY - 6);
          ctx.fillText(`⚡ ${shape.label}`, badgeX, badgeY);
          ctx.restore();
        }

      } else {
        // Draw normal chalk stroke with subtle texture
        if (stroke.points.length > 0) {
          ctx.beginPath();
          stroke.points.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else {
              // Smooth bezier curves
              const prev = stroke.points[idx - 1];
              const midX = (prev.x + p.x) / 2;
              const midY = (prev.y + p.y) / 2;
              ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
            }
          });
          ctx.stroke();
        }
      }
      ctx.restore();
    });

    // 3. Render Current In-Progress Stroke
    if (currentStroke.length > 1) {
      ctx.save();
      if (isEraser) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = strokeWidth * 4;
        ctx.strokeStyle = '#FFFFFF';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = strokeWidth;
        ctx.shadowColor = selectedColor;
        ctx.shadowBlur = 10;
      }
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

    // 4. Render Dust Particles
    ctx.save();
    particlesRef.current.forEach((particle, idx) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.alpha -= 0.015;

      if (particle.alpha <= 0) {
        particlesRef.current.splice(idx, 1);
        return;
      }

      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.alpha;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    animFrameRef.current = requestAnimationFrame(render);
  }, [strokes, currentStroke, isEraser, selectedColor, strokeWidth]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [render]);

  // Pointer event handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pressure = e.pressure || 0.5;

    setIsDrawing(true);
    setCurrentStroke([{ x, y, pressure, time: performance.now() }]);
    spawnDust(x, y, isEraser ? '#94A3B8' : selectedColor, 6);
    sound.playChalkScratch(1.2);

    if (onPenMove) {
      onPenMove(x, y, pressure, true);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pressure = e.pressure || 0.5;

    if (onPenMove) {
      onPenMove(x, y, pressure, isDrawing);
    }

    if (!isDrawing) return;

    setCurrentStroke((prev) => [...prev, { x, y, pressure, time: performance.now() }]);

    // Intermittent scratch sound & dust
    if (Math.random() < 0.35) {
      spawnDust(x, y, isEraser ? '#94A3B8' : selectedColor, 2);
      sound.playChalkScratch(0.8);
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentStroke.length > 2) {
      let beautified: DetectedShape | null = null;

      if (autoBeautify && !isEraser) {
        beautified = recognizeShape(currentStroke);
        if (beautified) {
          setLastDetectedShape(beautified);
          setAiDetectionBanner(`Recognized: ${beautified.label} (${Math.round(beautified.confidence * 100)}% Match)`);
          sound.playSuccessChime();

          setTimeout(() => {
            setAiDetectionBanner(null);
          }, 3500);
        }
      }

      const newStroke: Stroke = {
        points: currentStroke,
        color: selectedColor,
        width: strokeWidth,
        type: isEraser ? 'eraser' : 'chalk',
        beautifiedShape: beautified || undefined,
      };

      setStrokes((prev) => [...prev, newStroke]);
    }

    setCurrentStroke([]);
    if (onPenMove) {
      onPenMove(0, 0, 0, false);
    }
  };

  const handleClear = () => {
    sound.playClick(500);
    setStrokes([]);
    setLastDetectedShape(null);
  };

  const handleUndo = () => {
    sound.playClick(650);
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handleDownloadImage = () => {
    sound.playClick(1000);
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create an offscreen canvas with chalkboard background
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // Blackboard fill
    ctx.fillStyle = '#0B1015';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    // Add watermark
    ctx.font = 'bold 16px "Space Grotesk", sans-serif';
    ctx.fillStyle = '#38BDF8';
    ctx.fillText('DIGI-CHALK Live Slate Session • Team Zero Resistance', 30, exportCanvas.height - 30);

    const dataUrl = exportCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `digichalk-slate-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  // Load preset demo templates
  const loadPresetTemplate = (preset: 'parabola' | 'circuit' | 'circle' | 'derivative') => {
    sound.playSuccessChime();
    const canvas = canvasRef.current;
    const w = canvas ? canvas.clientWidth : 700;
    const h = canvas ? canvas.clientHeight : 450;

    let newStrokes: Stroke[] = [];

    if (preset === 'parabola') {
      newStrokes = [
        // Coordinate axes
        {
          points: [{ x: 80, y: h - 60 }, { x: w - 80, y: h - 60 }],
          color: '#F8FAFC',
          width: 2,
          type: 'chalk',
          beautifiedShape: {
            type: 'line',
            confidence: 0.99,
            bounds: { minX: 80, minY: h - 60, maxX: w - 80, maxY: h - 60 },
            points: [{ x: 80, y: h - 60 }, { x: w - 80, y: h - 60 }],
            label: 'X-Axis: Time / Displacement',
          }
        },
        {
          points: [{ x: 120, y: h - 40 }, { x: 120, y: 60 }],
          color: '#F8FAFC',
          width: 2,
          type: 'chalk',
          beautifiedShape: {
            type: 'line',
            confidence: 0.99,
            bounds: { minX: 120, minY: 60, maxX: 120, maxY: h - 40 },
            points: [{ x: 120, y: h - 40 }, { x: 120, y: 60 }],
            label: 'Y-Axis: Height y(t)',
          }
        },
        // Parabolic trajectory
        {
          points: Array.from({ length: 40 }, (_, i) => {
            const t = i / 39;
            const x = 120 + t * (w - 220);
            const y = (h - 60) - 4 * (h - 160) * t * (1 - t);
            return { x, y };
          }),
          color: '#38BDF8',
          width: 4,
          type: 'chalk',
          beautifiedShape: {
            type: 'sine_wave',
            confidence: 0.97,
            bounds: { minX: 120, minY: 100, maxX: w - 100, maxY: h - 60 },
            label: 'Trajectory: y(t) = v0*sin(θ)t - 1/2gt²',
            latex: 'y(t) = v_0 \\sin(\\theta)t - \\frac{1}{2}gt^2',
          }
        }
      ];
    } else if (preset === 'circuit') {
      newStrokes = [
        {
          points: [{ x: 100, y: 150 }, { x: 400, y: 150 }, { x: 400, y: 320 }, { x: 100, y: 320 }, { x: 100, y: 150 }],
          color: '#34D399',
          width: 3,
          type: 'chalk',
          beautifiedShape: {
            type: 'rectangle',
            confidence: 0.98,
            bounds: { minX: 100, minY: 150, maxX: 400, maxY: 320 },
            label: 'Ohm’s Closed Circuit Loop: V = I × R',
          }
        }
      ];
    } else if (preset === 'circle') {
      newStrokes = [
        {
          points: Array.from({ length: 30 }, (_, i) => {
            const angle = (i / 30) * Math.PI * 2;
            return { x: 280 + Math.cos(angle) * 110, y: 220 + Math.sin(angle) * 110 };
          }),
          color: '#FBBF24',
          width: 3,
          type: 'chalk',
          beautifiedShape: {
            type: 'circle',
            confidence: 0.99,
            bounds: { minX: 170, minY: 110, maxX: 390, maxY: 330 },
            center: { x: 280, y: 220 },
            radius: 110,
            label: 'Unit Circle: x² + y² = r² [Acoustic Isochrone]',
          }
        }
      ];
    } else {
      newStrokes = [
        {
          points: [{ x: 80, y: 240 }, { x: 480, y: 240 }],
          color: '#FB7185',
          width: 3,
          type: 'chalk',
          beautifiedShape: {
            type: 'arrow',
            confidence: 0.96,
            bounds: { minX: 80, minY: 230, maxX: 480, maxY: 250 },
            points: [{ x: 80, y: 240 }, { x: 480, y: 240 }],
            label: 'Tangent Gradient: dy/dx = f\'(x)',
          }
        }
      ];
    }

    setStrokes(newStrokes);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden glass-card border border-white/10 shadow-2xl relative flex flex-col bg-slate-900/90">
      
      {/* Top Blackboard Slate Header Bar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
        
        {/* Title & Live Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-chalk-emerald animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Live Digital Slate Canvas
            </span>
          </div>
          <span className="hidden sm:inline text-[10px] font-mono px-2 py-0.5 rounded bg-chalk-cyan/10 text-chalk-cyan border border-chalk-cyan/20">
            250Hz Ultrasonic Sampling
          </span>
        </div>

        {/* AI Shape Recognition Switch */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playClick(850);
              setAutoBeautify(!autoBeautify);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-all ${
              autoBeautify
                ? 'bg-chalk-emerald/20 border-chalk-emerald text-chalk-emerald shadow-sm shadow-chalk-emerald/20'
                : 'bg-slate-800 border-white/10 text-slate-400'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>AI Auto-Beautify: {autoBeautify ? 'ON' : 'OFF'}</span>
          </button>
        </div>

      </div>

      {/* Interactive Chalkboard Drawing Surface */}
      <div className="relative w-full h-[380px] sm:h-[460px] cursor-crosshair touch-none bg-slate-950 select-none overflow-hidden">
        
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-full block"
        />

        {/* AI Shape Recognition Live Banner Notification */}
        {aiDetectionBanner && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-slate-900/90 border border-chalk-emerald/50 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-mono text-chalk-emerald animate-bounce">
            <Sparkles className="w-4 h-4 text-chalk-emerald animate-spin" />
            <span>{aiDetectionBanner}</span>
            <CheckCircle2 className="w-4 h-4 text-chalk-emerald" />
          </div>
        )}

        {/* Chalkboard Corner Watermark Overlay */}
        <div className="absolute bottom-3 left-4 pointer-events-none opacity-40 text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-chalk-cyan" />
          <span>Draw rough shapes (Circle, Box, Triangle, Arrow) to trigger on-device MobileNetV3</span>
        </div>

      </div>

      {/* Bottom Tooling & Controls Bar */}
      <div className="px-4 py-3 bg-slate-950/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
        
        {/* Chalk Color Palette */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">Color:</span>
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-white/10">
            {CHALK_COLORS.map((c) => (
              <button
                key={c.name}
                onClick={() => {
                  sound.playClick(700);
                  setSelectedColor(c.value);
                  setIsEraser(false);
                }}
                title={c.name}
                className={`w-6 h-6 rounded-lg transition-all relative flex items-center justify-center ${
                  selectedColor === c.value && !isEraser ? 'scale-110 ring-2 ring-white shadow-md' : 'opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.value, boxShadow: selectedColor === c.value ? `0 0 10px ${c.glow}` : 'none' }}
              />
            ))}
          </div>

          {/* Eraser / Duster Mode */}
          <button
            onClick={() => {
              sound.playClick(600);
              setIsEraser(!isEraser);
            }}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all ${
              isEraser
                ? 'bg-chalk-coral/20 border-chalk-coral text-chalk-coral'
                : 'bg-slate-900 border-white/10 text-slate-300 hover:bg-slate-800'
            }`}
            title="Blackboard Duster / Eraser"
          >
            <Eraser className="w-4 h-4" />
            <span className="hidden md:inline font-mono">Duster</span>
          </button>
        </div>

        {/* Stroke Width Slider */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-white/10">
          <span className="text-[11px] font-mono text-slate-400">Width:</span>
          <input
            type="range"
            min="2"
            max="16"
            step="1"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-xs font-mono text-chalk-cyan w-6 text-right">{strokeWidth}px</span>
        </div>

        {/* Quick Demo Template Presets */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10 text-xs">
          <span className="text-[10px] font-mono text-slate-400 px-1.5 hidden xl:inline">Presets:</span>
          <button
            onClick={() => loadPresetTemplate('parabola')}
            className="px-2 py-1 rounded-lg text-slate-300 hover:text-chalk-cyan hover:bg-white/5 font-mono text-[11px]"
          >
            Parabola
          </button>
          <button
            onClick={() => loadPresetTemplate('circuit')}
            className="px-2 py-1 rounded-lg text-slate-300 hover:text-chalk-emerald hover:bg-white/5 font-mono text-[11px]"
          >
            Circuit
          </button>
          <button
            onClick={() => loadPresetTemplate('circle')}
            className="px-2 py-1 rounded-lg text-slate-300 hover:text-chalk-amber hover:bg-white/5 font-mono text-[11px]"
          >
            Circle
          </button>
        </div>

        {/* Actions: Undo, Clear, Export */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={strokes.length === 0}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-white/10 text-slate-300 transition-all text-xs"
            title="Undo Stroke"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleClear}
            className="p-2 rounded-xl bg-slate-900 hover:bg-red-500/20 hover:border-red-500/40 border border-white/10 text-slate-300 hover:text-red-400 transition-all text-xs"
            title="Clear Entire Slate"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={handleDownloadImage}
            className="px-3 py-1.5 rounded-xl bg-chalk-cyan/20 hover:bg-chalk-cyan/30 border border-chalk-cyan/40 text-chalk-cyan hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all shadow-md shadow-chalk-cyan/10"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PNG</span>
          </button>
        </div>

      </div>

    </div>
  );
};
