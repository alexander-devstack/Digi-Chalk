import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Layers, 
  DollarSign, 
  TrendingUp, 
  School, 
  Award,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'DIGI-CHALK: Deep-Tech Pitch Deck',
      subtitle: 'Making Every Blackboard a Digital Classroom at ₹2,000 per unit',
      tag: 'TRL-2 → TRL-9 Pathway | ₹13L Seed Round',
      content: (
        <div className="space-y-4 text-center py-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan">
            <ShieldCheck className="w-4 h-4" />
            <span>Provisional Patent Filed • App No. 202641089516</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Team Zero Resistance
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Transforming 1.5 Million traditional classroom blackboards across India into real-time interactive vector digital hubs through sub-millimeter acoustic multilateration.
          </p>
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-4 font-mono">
            <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
              <div className="text-lg font-bold text-chalk-emerald">₹2,000</div>
              <div className="text-[10px] text-slate-400">Unit Price</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
              <div className="text-lg font-bold text-chalk-cyan">0.1 ms</div>
              <div className="text-[10px] text-slate-400">RF Latency</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
              <div className="text-lg font-bold text-chalk-amber">₹13 Lakh</div>
              <div className="text-[10px] text-slate-400">Seed Target</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'The Problem: The ₹85,000 Smartboard Divide',
      subtitle: '90% of Indian classrooms remain offline due to prohibitive hardware costs',
      tag: 'Market Inequity',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-chalk-coral/30 space-y-3">
            <h4 className="font-heading font-bold text-base text-chalk-coral">
              Current Interactive Flat Panels (IFPD)
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-start gap-2 text-chalk-coral">
                <span>✗</span>
                <span>Prohibitive Cost: ₹80,000 - ₹1,50,000 per screen</span>
              </li>
              <li className="flex items-start gap-2 text-chalk-coral">
                <span>✗</span>
                <span>High Glass Fragility: Shattrs upon impact in rural schools</span>
              </li>
              <li className="flex items-start gap-2 text-chalk-coral">
                <span>✗</span>
                <span>High Electricity: 250W continuous load (requires power backups)</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-chalk-emerald/30 space-y-3">
            <h4 className="font-heading font-bold text-base text-chalk-emerald">
              The Digi-Chalk Retrofit Solution
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 font-mono">
              <li className="flex items-start gap-2 text-chalk-emerald">
                <span>✓</span>
                <span>Affordable: ₹2,000 retrofit (42.5x Cheaper)</span>
              </li>
              <li className="flex items-start gap-2 text-chalk-emerald">
                <span>✓</span>
                <span>Indestructible: Preserves rugged slate blackboard</span>
              </li>
              <li className="flex items-start gap-2 text-chalk-emerald">
                <span>✓</span>
                <span>Ultra-Low Power: 5W receiver + 18-hr rechargeable battery</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'Deep-Tech Physics & Hardware Architecture',
      subtitle: '40kHz Ultrasonic TDOA Multilateration + 6-DOF IMU Sensor Fusion',
      tag: 'Patented Technology',
      content: (
        <div className="space-y-4 py-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs text-slate-300 leading-relaxed">
            <strong className="text-white font-bold block mb-1">Mathematical Principle:</strong>
            Sub-millimeter Time Difference of Arrival ($d_1 - d_2 = v \cdot \Delta t$) solved on ESP32-S3 using Xtensa Vector DSP in <strong className="text-chalk-cyan">45 microseconds</strong> with 2D State-Space Kalman trajectory smoothing.
          </div>
          <div className="grid grid-cols-3 gap-3 font-mono text-xs text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-chalk-cyan/20">
              <span className="text-chalk-cyan font-bold block text-sm">±0.24 mm</span>
              <span className="text-[10px] text-slate-400">Position Precision</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-chalk-emerald/20">
              <span className="text-chalk-emerald font-bold block text-sm">250 SPS</span>
              <span className="text-[10px] text-slate-400">Acoustic Sampling</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-chalk-amber/20">
              <span className="text-chalk-amber font-bold block text-sm">ESP-NOW</span>
              <span className="text-[10px] text-slate-400">0.1ms RF Link</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Edge AI & Multi-Modal Classroom Sync',
      subtitle: 'Quantized MobileNetV3-small + Real-Time Regional Translation',
      tag: 'AI Architecture',
      content: (
        <div className="space-y-3 py-4 text-xs font-mono text-slate-300">
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-chalk-cyan font-bold">
              <span>⚡ MobileNetV3-small Shape Engine</span>
              <span>1.2MB INT8 TFLite Micro</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Automatically cleans hand-drawn geometric sketches into crisp mathematical vectors and converts chalk handwriting into clean LaTeX equations in 14ms.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-1">
            <div className="text-chalk-emerald font-bold">🌐 Multilingual AI Lesson Generation:</div>
            <p className="text-slate-300 text-[11px]">
              Syncs microphone audio with blackboard strokes to generate revision notes in Hindi, Tamil, Telugu, Kannada, and English.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Market Opportunity & Unit Economics',
      subtitle: '1.5 Million Classrooms in India | ₹1,420 BOM Cost → ₹2,000 Retail',
      tag: 'Commercialization',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <h5 className="font-bold text-white">Market Size (SAM & SOM):</h5>
            <ul className="space-y-1.5 text-slate-300 text-[11px]">
              <li>• Total Addressable Market: 1.5M K-12 Indian Schools ($1.8B TAM)</li>
              <li>• Serviceable Obtainable Market: 50,000 Classrooms in 3 Years (₹10 Cr ARR)</li>
              <li>• Channel: Samagra Shiksha State Tenders + CSR Education Grants</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2">
            <h5 className="font-bold text-chalk-emerald">Unit Economics:</h5>
            <ul className="space-y-1.5 text-slate-300 text-[11px]">
              <li>• Bill of Materials (BOM): ₹1,420</li>
              <li>• Assembly, Calibration & QC: ₹180</li>
              <li>• Total CoGS: ₹1,600</li>
              <li>• Sale Price: ₹2,000 (20% Gross Margin)</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: 'The ₹13 Lakh Seed Round Ask & Milestone Roadmap',
      subtitle: 'Deploying in 50 Pilot Classrooms & Completing BIS Wireless Regulatory Approvals',
      tag: 'Investment Ask',
      content: (
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs text-center">
            <div className="p-3 rounded-xl bg-slate-900 border border-chalk-cyan/30">
              <span className="font-bold text-chalk-cyan text-sm block">₹3.9 Lakh</span>
              <span className="text-[10px] text-slate-400">Tooling & PCB Rev-C</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-chalk-emerald/30">
              <span className="font-bold text-chalk-emerald text-sm block">₹3.25 Lakh</span>
              <span className="text-[10px] text-slate-400">50 School Pilot</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-chalk-amber/30">
              <span className="font-bold text-chalk-amber text-sm block">₹2.6 Lakh</span>
              <span className="text-[10px] text-slate-400">Edge AI Firmware</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-chalk-coral/30">
              <span className="font-bold text-chalk-coral text-sm block">₹1.95 Lakh</span>
              <span className="text-[10px] text-slate-400">BIS & IP Defense</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10">
              <span className="font-bold text-slate-200 text-sm block">₹1.3 Lakh</span>
              <span className="text-[10px] text-slate-400">Field Logistics</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-chalk-emerald/40">
              <span className="font-bold text-white text-sm block">₹13.0 Lakh</span>
              <span className="text-[10px] text-chalk-emerald font-bold">Total Seed Round</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      sound.playClick(800);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      sound.playClick(700);
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlide]);

  const handleDownloadFullPlaybook = () => {
    sound.playSuccessChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const markdownDoc = `# DIGI-CHALK (TEAM ZERO RESISTANCE) — INVESTOR PITCH PLAYBOOK
**Provisional Patent Application No. 202641089516**
**Round:** ₹13 Lakh Seed Capital | **Target Unit Cost:** ₹2,000 INR

---

## 1. Executive Summary
Digi-Chalk is an edge-computed hardware retrofit transforming standard slate and green blackboards into real-time interactive digital hubs at ₹2,000 per unit—bringing digital equity to the 90% of classrooms left behind by ₹80,000+ smartboards.

## 2. Core Deep-Tech Principles
- **Acoustic TDOA Multilateration:** 40kHz ultrasonic piezoceramic emitter + Dual I2S MEMS array ($d_1 - d_2 = v \\cdot \\Delta t$) at $\\pm 0.24\\text{mm}$ precision.
- **Edge AI Architecture:** MobileNetV3-small quantized INT8 running on ESP32-S3 dual-core LX7 MCU for on-device shape beautification and handwriting-to-LaTeX OCR in 14ms.
- **Multi-Modal Lecture Sync:** Timestamped blackboard stroke vectors paired with teacher audio for automated multilingual revision notes in Hindi, Tamil, Telugu, Kannada, and English.

## 3. Bill of Materials (BOM) & Unit Economics
- Total Hardware BOM: ₹1,420
- Assembly & QC: ₹180
- Total CoGS: ₹1,600
- Retail Price: ₹2,000 (20.0% Gross Margin)
- Cost Advantage: 42.5x cheaper than ₹85,000 75" Smartboard IFPDs.

## 4. Use of ₹13 Lakh Seed Funds
1. Hardware Tooling & Injection Mold: ₹3,90,000 (30%)
2. 50-Classroom School Pilot Deployment: ₹3,25,000 (25%)
3. Edge AI Firmware & Mobile App: ₹2,60,000 (20%)
4. IP, Patent Filings & BIS Wireless Regulatory Certs: ₹1,95,000 (15%)
5. Operations & Logistics: ₹1,30,000 (10%)

---
*Team Zero Resistance • 2026*
`;

    const blob = new Blob([markdownDoc], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Digi-Chalk-Pitch-Playbook-13L-Round.md`;
    link.click();
  };

  if (!isOpen) return null;

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
      
      {/* Pitch Deck Card Modal */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-chalk-cyan/20 border border-chalk-cyan/40 flex items-center justify-center">
              <span className="font-heading font-black text-xs text-chalk-cyan">DC</span>
            </div>
            <div>
              <div className="font-heading font-bold text-sm text-white">
                Digi-Chalk Pitch Playbook
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                Slide {currentSlide + 1} of {slides.length} • {slide.tag}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadFullPlaybook}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-chalk-emerald/20 hover:bg-chalk-emerald/30 border border-chalk-emerald/40 text-chalk-emerald font-mono text-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF / MD</span>
            </button>

            <button
              onClick={() => {
                sound.playClick(600);
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide Body Surface */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto bg-slate-900/95 flex flex-col justify-between">
          
          <div>
            <div className="mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-chalk-cyan">
                {slide.tag}
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
                {slide.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {slide.subtitle}
              </p>
            </div>

            <div className="mt-4">
              {slide.content}
            </div>
          </div>

          {/* Slide Navigation Footer */}
          <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick(750);
                    setCurrentSlide(idx);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    currentSlide === idx
                      ? 'w-6 bg-chalk-cyan'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-mono text-xs flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentSlide === slides.length - 1}
                className="px-4 py-2 rounded-xl bg-chalk-cyan/20 hover:bg-chalk-cyan/30 disabled:opacity-40 border border-chalk-cyan/40 text-chalk-cyan font-mono text-xs flex items-center gap-1.5 transition-all font-semibold"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
