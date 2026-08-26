import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  HelpCircle, 
  RefreshCw, 
  Zap, 
  Wand2, 
  Hand,
  Sliders
} from 'lucide-react';
import { sound } from '../utils/sound';

interface MathSample {
  id: string;
  name: string;
  category: string;
  roughHandwriting: string;
  cleanLatex: string;
  renderedHtml: string;
  stepByStepSolution: string[];
  inferenceTimeMs: number;
  confidence: number;
}

export const EdgeAiPipeline: React.FC = () => {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [showSolution, setShowSolution] = useState(true);
  const [activeGesture, setActiveGesture] = useState<'palm' | 'fist' | 'tap' | 'lasso'>('palm');

  const mathSamples: MathSample[] = [
    {
      id: 'math-1',
      name: 'Kinematics Parabola',
      category: 'Physics Mechanics',
      roughHandwriting: 'y(t) = v0*sin(θ)t - 1/2*g*t^2',
      cleanLatex: 'y(t) = v_0 \\sin(\\theta)t - \\frac{1}{2}gt^2',
      renderedHtml: 'y(t) = v₀·sin(θ)t - ½gt²',
      stepByStepSolution: [
        '1. Differentiate vertical displacement w.r.t time t: dy/dt = v_y(t) = v₀·sin(θ) - gt',
        '2. At maximum projectile height, vertical velocity v_y = 0: 0 = v₀·sin(θ) - gt_peak',
        '3. Time to peak apex: t_peak = (v₀·sin(θ)) / g',
        '4. Substitute into y(t): H_max = (v₀²·sin²(θ)) / (2g)',
      ],
      inferenceTimeMs: 14.2,
      confidence: 99.4,
    },
    {
      id: 'math-2',
      name: 'Calculus Chain Rule',
      category: 'Mathematics',
      roughHandwriting: 'd/dx [sin(x^3 + 2x)]',
      cleanLatex: '\\frac{d}{dx}[\\sin(x^3 + 2x)] = \\cos(x^3 + 2x) \\cdot (3x^2 + 2)',
      renderedHtml: 'd/dx [sin(x³ + 2x)] = cos(x³ + 2x) · (3x² + 2)',
      stepByStepSolution: [
        '1. Let outer function f(u) = sin(u) where inner function u(x) = x³ + 2x',
        '2. Outer derivative: f\'(u) = cos(u)',
        '3. Inner derivative: u\'(x) = 3x² + 2',
        '4. Apply Chain Rule f\'(u)·u\'(x): Answer = cos(x³ + 2x)·(3x² + 2)',
      ],
      inferenceTimeMs: 12.8,
      confidence: 98.9,
    },
    {
      id: 'math-3',
      name: 'Quadratic Formula',
      category: 'Algebra',
      roughHandwriting: 'ax^2 + bx + c = 0',
      cleanLatex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      renderedHtml: 'x = (-b ± √(b² - 4ac)) / (2a)',
      stepByStepSolution: [
        '1. Divide entire equation by leading coefficient a: x² + (b/a)x + c/a = 0',
        '2. Complete the square on left side: (x + b/2a)² - (b²/4a²) + c/a = 0',
        '3. Rearrange constants: (x + b/2a)² = (b² - 4ac) / 4a²',
        '4. Take square roots: x = (-b ± √(b² - 4ac)) / (2a)',
      ],
      inferenceTimeMs: 11.5,
      confidence: 99.7,
    },
  ];

  const currentSample = mathSamples[selectedSampleIndex];

  const handleSelectSample = (idx: number) => {
    sound.playClick(750);
    setIsSolving(true);
    setSelectedSampleIndex(idx);
    setTimeout(() => {
      setIsSolving(false);
      sound.playSuccessChime();
    }, 350);
  };

  const gestures = [
    {
      id: 'palm',
      title: 'Smart Palm Rejection',
      trigger: 'IMU Angle > 65° or Surface Area > 12cm²',
      action: 'Ignores resting palm on blackboard while writing naturally.',
      badge: '99.8% Precision',
      color: 'text-chalk-cyan',
    },
    {
      id: 'fist',
      title: 'Erase-by-Fist Gesture',
      trigger: 'Broad continuous contact (> 8cm²)',
      action: 'Instantly activates 35mm duster eraser mode without pressing buttons.',
      badge: '< 10ms Switch',
      color: 'text-chalk-coral',
    },
    {
      id: 'tap',
      title: 'Double-Tap Color Cycle',
      trigger: 'Dual FSR pressure spike within 200ms',
      action: 'Cycles neon chalk color (White → Cyan → Emerald → Amber).',
      badge: 'Zero UI Lag',
      color: 'text-chalk-amber',
    },
    {
      id: 'lasso',
      title: 'Lasso Equation OCR',
      trigger: 'Closed circular stroke around text',
      action: 'Triggers on-device MobileNetV3-small math OCR & auto-solver.',
      badge: 'INT8 Quantized',
      color: 'text-chalk-emerald',
    },
  ];

  return (
    <section id="edge-ai" className="py-20 bg-slate-900/40 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>On-Device Computer Vision & Gesture Recognition</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            MobileNetV3-Small Edge AI Architecture
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Digi-Chalk executes quantized INT8 neural networks directly on the ESP32-S3 microcontroller. No expensive cloud GPU servers or fast internet connections required in rural classrooms.
          </p>
        </div>

        {/* Top Grid: Math OCR & Handwriting beautification */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left 7 Cols: Interactive Handwriting to LaTeX OCR Demo */}
          <div className="lg:col-span-7 glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/80 shadow-2xl flex flex-col gap-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-chalk-cyan" />
                <span className="font-heading font-semibold text-sm text-slate-100">
                  Live Blackboard Handwriting → LaTeX OCR Engine
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chalk-emerald/10 text-chalk-emerald border border-chalk-emerald/30">
                INT8 TFLite Micro (1.2 MB)
              </span>
            </div>

            {/* Math Sample Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {mathSamples.map((sample, idx) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(idx)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs border transition-all ${
                    selectedSampleIndex === idx
                      ? 'bg-chalk-cyan/20 border-chalk-cyan text-chalk-cyan font-bold shadow-md shadow-chalk-cyan/10'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {sample.name}
                </button>
              ))}
            </div>

            {/* Chalkboard Rough vs Clean LaTeX Comparison Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-1">
              
              {/* Box 1: Rough Teacher Chalk Input */}
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  1. Raw Blackboard Chalk Stroke:
                </span>
                <div className="font-mono text-sm sm:text-base text-slate-300 italic p-3 rounded-lg bg-slate-950/80 border border-white/5 my-auto">
                  "{currentSample.roughHandwriting}"
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-3 flex justify-between">
                  <span>Input: 2D Stroke Trajectory</span>
                  <span>250 SPS</span>
                </div>
              </div>

              {/* Box 2: Beautified Clean LaTeX Math */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-850 border border-chalk-cyan/30 shadow-lg shadow-chalk-cyan/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-chalk-cyan uppercase tracking-wider">
                    2. AI Clean LaTeX Output:
                  </span>
                  <span className="text-[10px] font-mono text-chalk-emerald">
                    ⚡ {currentSample.inferenceTimeMs}ms ({currentSample.confidence}%)
                  </span>
                </div>
                <div className="font-mono font-bold text-base text-white p-3 rounded-lg bg-slate-950/90 border border-chalk-cyan/20 neon-text-cyan my-auto">
                  {currentSample.renderedHtml}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-3 flex justify-between">
                  <span>Export: LaTeX / MathML</span>
                  <span className="text-chalk-emerald font-semibold">Zero Syntax Error</span>
                </div>
              </div>

            </div>

            {/* Step-by-Step AI Math Solver */}
            <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-chalk-amber" />
                  Automated Step-by-Step Classroom Derivation:
                </span>
                <span className="text-[10px] font-mono text-slate-400">Class 11/12 Syllabus</span>
              </div>

              <div className="space-y-1.5 font-mono text-xs text-slate-300">
                {currentSample.stepByStepSolution.map((step, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-950/60 border border-white/5">
                    {step}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right 5 Cols: Edge Gesture Recognition Matrix */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/80 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Hand className="w-4 h-4 text-chalk-emerald" />
                  <h3 className="font-heading font-semibold text-sm text-slate-100">
                    Smart IMU Gesture Engine
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">6-DOF DMP</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                By fusing MPU6050 accelerometer/gyroscope vectors with tip force sensors, Digi-Chalk detects intuitive natural teaching gestures in real time.
              </p>

              {/* Gesture List */}
              <div className="space-y-2.5">
                {gestures.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => {
                      sound.playClick(850);
                      setActiveGesture(g.id as any);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      activeGesture === g.id
                        ? 'bg-slate-900 border-chalk-cyan/50 shadow-md shadow-chalk-cyan/10'
                        : 'bg-slate-900/60 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-heading font-bold text-xs text-white">
                        {g.title}
                      </span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 ${g.color}`}>
                        {g.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      {g.action}
                    </p>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">
                      Trigger: {g.trigger}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
