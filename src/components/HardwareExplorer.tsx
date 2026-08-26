import React, { useState, useRef, useEffect } from 'react';
import { 
  Cpu, 
  Layers, 
  Zap, 
  Radio, 
  Compass, 
  Battery, 
  ShieldCheck, 
  Info, 
  CheckCircle2,
  Sliders,
  Sparkles,
  Volume2,
  Mic,
  Tag
} from 'lucide-react';
import { sound } from '../utils/sound';

interface ExplodedPart {
  id: string;
  name: string;
  category: string;
  partNumber: string;
  costInr: number;
  offsetY: number;
  offsetX: number;
  width: number;
  height: number;
  color: string;
  glowColor: string;
  description: string;
  specs: string[];
  pinout: string;
}

export const HardwareExplorer: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<'holder' | 'clips'>('holder');
  const [explodeFactor, setExplodeFactor] = useState(65); // 0 to 100
  const [selectedPartId, setSelectedPartId] = useState<string>('part-holder-mcu');
  const [activeLedState, setActiveLedState] = useState<'green' | 'blue' | 'red' | 'cyan'>('green');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Chalk Holder (Transmitter Unit) Exploded Layers
  const holderParts: ExplodedPart[] = [
    {
      id: 'part-holder-chalk',
      name: 'Classroom Chalk + Twist-Feed Sleeve',
      category: 'Ergonomics & Mechanical',
      partNumber: 'Std 9.5mm Chalk + Twist Collet',
      costInr: 0,
      offsetY: -160,
      offsetX: 0,
      width: 170,
      height: 18,
      color: '#F8FAFC',
      glowColor: 'rgba(248, 250, 252, 0.4)',
      description: 'Accepts standard classroom chalk sticks with twist-feed mechanism and dual alignment wedges providing ±50° beam coverage.',
      specs: ['Chalk Diameter: 9.0mm - 10.0mm', 'Twist-Feed: Continuous screw progression', 'Wedges: ±50° acoustic dispersion angle'],
      pinout: 'Mechanical twist collar & dust-free grip'
    },
    {
      id: 'part-holder-fsr',
      name: 'Panasonic EVQ-P7A01P Tactile Switch',
      category: 'Sensors & Triggers',
      partNumber: 'Panasonic EVQ-P7A01P (100gf)',
      costInr: 15,
      offsetY: -110,
      offsetX: 0,
      width: 140,
      height: 16,
      color: '#FB7185',
      glowColor: 'rgba(251, 113, 133, 0.5)',
      description: 'Ultra-low latency pen-down hardware trigger with 100gf actuation force. Immediately initiates 40kHz acoustic burst upon touching blackboard.',
      specs: ['Actuation Force: 100gf (0.98N)', 'Response Time: < 1ms', 'Operating Life: 5,000,000 cycles'],
      pinout: 'GPIO 3 (Hardware Wakeup Interrupt)'
    },
    {
      id: 'part-holder-piezo',
      name: '20mm Piezo Plate (1MΩ Bleed)',
      category: 'Sensors & Triggers',
      partNumber: '20mm Generic PZT Disc',
      costInr: 10,
      offsetY: -65,
      offsetX: 0,
      width: 130,
      height: 16,
      color: '#FB7185',
      glowColor: 'rgba(251, 113, 133, 0.5)',
      description: 'Redundant energy-neutral stroke validation sensor with 1MΩ bleed resistor for proportional writing pressure detection.',
      specs: ['Disc Diameter: 20mm', 'Resistor: 1MΩ bleed damping', 'Voltage Output: 0.1V - 3.3V ADC'],
      pinout: 'GPIO 1 (ADC1 Channel 0)'
    },
    {
      id: 'part-holder-pzt',
      name: 'MCUSD16P40B12RO 40kHz US Burst TX',
      category: 'Acoustic Burst',
      partNumber: 'MCUSD16P40B12RO + MT3608 Boost',
      costInr: 80,
      offsetY: -20,
      offsetX: 0,
      width: 160,
      height: 24,
      color: '#38BDF8',
      glowColor: 'rgba(56, 189, 248, 0.6)',
      description: '40kHz open-structure ultrasonic burst transmitter powered by an MT3608 boost circuit (20-22V) with IR2104 / IRLZ44N gate drive logic.',
      specs: ['Resonant Frequency: 40.0 ± 1.0 kHz', 'Boost Voltage: 20V - 22V Pulse', 'Gate Drive: IR2104 half-bridge + IRLZ44N MOSFET', 'Acoustic SPL: 115 dB'],
      pinout: 'GPIO 8 (PWM 40kHz Timer) via IR2104'
    },
    {
      id: 'part-holder-mic',
      name: 'ICS-43434 24-bit I2S Digital Mic',
      category: 'Voice & Audio',
      partNumber: 'TDK InvenSense ICS-43434',
      costInr: 180,
      offsetY: 30,
      offsetX: 0,
      width: 140,
      height: 20,
      color: '#34D399',
      glowColor: 'rgba(52, 211, 153, 0.5)',
      description: 'Bottom-port digital MEMS microphone capturing teacher lecture voice in 24-bit PCM at 44.1kHz for synchronized multi-modal notes.',
      specs: ['Interface: I2S Digital 24-bit', 'Sample Rate: 44.1 kHz PCM', 'SNR: 65 dBA', 'VAD: WebRTC / Silero Speech Isolation'],
      pinout: 'GPIO 2 (DIN), GPIO 15 (BCLK), GPIO 16 (WS)'
    },
    {
      id: 'part-holder-imu',
      name: 'MPU6050 6-Axis IMU (Fast 400kHz)',
      category: 'Motion Tracking',
      partNumber: 'MPU6050 (Addr 0x68)',
      costInr: 60,
      offsetY: 75,
      offsetX: 0,
      width: 140,
      height: 20,
      color: '#FBBF24',
      glowColor: 'rgba(251, 191, 36, 0.5)',
      description: '6-axis MotionTracking DMP running in Fast Mode (400kHz I2C) for hand orientation, Y-axis tracking, and palm-rejection gesture detection.',
      specs: ['Gyroscope: ±2000 °/s', 'Accelerometer: ±16g', 'I2C Speed: 400 kHz Fast Mode', 'I2C Address: 0x68'],
      pinout: 'GPIO 4 (SDA), GPIO 5 (SCL)'
    },
    {
      id: 'part-holder-mcu',
      name: 'Seeed XIAO ESP32-C3 MCU',
      category: 'MCU + Processing',
      partNumber: 'Seeed XIAO ESP32-C3 (RISC-V)',
      costInr: 280,
      offsetY: 120,
      offsetX: 0,
      width: 150,
      height: 26,
      color: '#A78BFA',
      glowColor: 'rgba(167, 139, 250, 0.5)',
      description: 'Compact RISC-V compute core executing ESP-NOW low-latency synchronization (0.1ms) and BLE GATT server for tablet pairing.',
      specs: ['Core: 32-bit RISC-V @ 160MHz', 'Wireless: ESP-NOW (0.1ms) + BLE 5.0 GATT', 'Memory: 400KB SRAM, 4MB Flash', 'Form Factor: 21mm × 17.5mm'],
      pinout: 'Master Sensor Bus & Wireless Stack'
    },
    {
      id: 'part-holder-power',
      name: '80mAh LiPo + CR2032 Diode-OR Bridge',
      category: 'Power Management',
      partNumber: '80mAh 3.7V + TP4056/MCP73831',
      costInr: 80,
      offsetY: 165,
      offsetX: 0,
      width: 160,
      height: 24,
      color: '#22D3EE',
      glowColor: 'rgba(34, 211, 238, 0.5)',
      description: '80mAh rechargeable LiPo cell with USB-C charging and a seamless CR2032 coin-cell failsafe Diode-OR bridge preventing dead battery downtime.',
      specs: ['LiPo Capacity: 80mAh (8+ hrs active writing)', 'Failsafe: CR2032 Diode-OR switchover', 'Charge IC: TP4056 / MCP73831 USB-C'],
      pinout: 'VBAT, VBUS (5V USB-C), GND'
    },
  ];

  // 2. Corner Clip Unit (Receiver ×2) Exploded Layers
  const clipParts: ExplodedPart[] = [
    {
      id: 'part-clip-mount',
      name: 'Self-Centering Magnetic Alignment Clasp',
      category: 'Mounting & Mechanical',
      partNumber: 'Dual Self-Centering Wedges',
      costInr: 0,
      offsetY: -110,
      offsetX: 0,
      width: 240,
      height: 20,
      color: '#64748B',
      glowColor: 'rgba(100, 116, 139, 0.4)',
      description: 'Tool-free magnetic mounting clasp with self-centering alignment wedges that snap securely to any slate corner in 15 seconds.',
      specs: ['Mounting Time: 15 Seconds', 'Retention: Neodymium N52 magnetic grip', 'Bezel Compatibility: 10mm to 35mm slate frames'],
      pinout: 'Tool-free mechanical snap clasp'
    },
    {
      id: 'part-clip-rx',
      name: 'Murata MA40S4R 40kHz US Receiver (×2)',
      category: 'Acoustic Sensor',
      partNumber: 'Murata MA40S4R High-Gain RX',
      costInr: 80,
      offsetY: -55,
      offsetX: 0,
      width: 200,
      height: 24,
      color: '#38BDF8',
      glowColor: 'rgba(56, 189, 248, 0.6)',
      description: 'High-sensitivity 40kHz acoustic receivers with wide reception angle and 300μs guard delay rejection of near-field ringdown.',
      specs: ['Bandwidth: 40.0 ± 1.0 kHz', 'Sensitivity: -63 dB min', 'Guard Delay: 300μs acoustic settling cutoff'],
      pinout: 'Direct AFE Op-Amp Input'
    },
    {
      id: 'part-clip-afe',
      name: 'LM358 (1000x) + LM393 / 1N4148 AFE',
      category: 'Analog Front-End (AFE)',
      partNumber: 'LM358 Gain + LM393 Comparator + 1N4148',
      costInr: 20, // 5 + 15
      offsetY: 0,
      offsetX: 0,
      width: 220,
      height: 24,
      color: '#FBBF24',
      glowColor: 'rgba(251, 191, 36, 0.5)',
      description: 'Dual-stage op-amp amplifier (100x to 1000x gain) and high-speed comparator with 1N4148 diode envelope detection for sub-microsecond pulse timing.',
      specs: ['Gain Range: 100x – 1000x adjustable', 'Detector: 1N4148 fast envelope rectifier', 'Comparator: LM393 with hysteresis'],
      pinout: 'GPIO 14 (TDOA Timer Capture Interrupt)'
    },
    {
      id: 'part-clip-mcu',
      name: 'ESP32-DevKitC-32E Base MCU',
      category: 'Compute & Multilateration',
      partNumber: 'ESP32-WROOM-32E (240MHz)',
      costInr: 260,
      offsetY: 55,
      offsetX: 0,
      width: 200,
      height: 28,
      color: '#34D399',
      glowColor: 'rgba(52, 211, 153, 0.6)',
      description: 'Captures microsecond TDOA hardware timestamps, coordinates ESP-NOW packets, and executes the ARCKF sensor fusion solver.',
      specs: ['Clock: 240MHz Dual-Core Xtensa LX6', 'Timers: 64-bit hardware microsecond resolution', 'Protocol: ESP-NOW (<0.1ms) + WebSockets'],
      pinout: 'Full Microsecond TDOA Matrix'
    },
    {
      id: 'part-clip-power',
      name: 'TP4056 / MCP73831 + UF4007 Diodes',
      category: 'Power Management',
      partNumber: 'TP4056 + UF4007 Flyback Passives',
      costInr: 27, // 12 + 15
      offsetY: 105,
      offsetX: 0,
      width: 210,
      height: 22,
      color: '#A78BFA',
      glowColor: 'rgba(167, 139, 250, 0.5)',
      description: 'USB-C DC input regulator with Li-ion Diode-OR power path and UF4007 ultra-fast flyback diodes.',
      specs: ['Input: 5V USB-C', 'Protection: DW01A Li-ion cutoff', 'Flyback: UF4007 ultra-fast 50ns recovery'],
      pinout: 'VBUS (5V USB), VBAT, GND'
    },
  ];

  const currentParts = selectedDevice === 'holder' ? holderParts : clipParts;
  const activePart = currentParts.find((p) => p.id === selectedPartId) || currentParts[0];

  // Canvas Exploded View Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Axis Guide
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, 15);
    ctx.lineTo(centerX, height - 15);
    ctx.stroke();
    ctx.restore();

    // Draw Exploded Parts
    currentParts.forEach((part) => {
      const isSelected = part.id === selectedPartId;
      const factor = explodeFactor / 100;
      
      const py = centerY + part.offsetY * (0.2 + factor * 0.95);
      const px = centerX + part.offsetX * (0.2 + factor * 0.95);

      ctx.save();

      // Connector Guide Lines when exploded
      if (factor > 0.3) {
        ctx.strokeStyle = isSelected ? part.color : 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = isSelected ? 1.5 : 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Component Body
      const w = part.width;
      const h = part.height;

      if (isSelected) {
        ctx.shadowColor = part.color;
        ctx.shadowBlur = 18;
      }

      ctx.fillStyle = isSelected ? part.color : '#182230';
      ctx.strokeStyle = isSelected ? '#FFFFFF' : part.color;
      ctx.lineWidth = isSelected ? 2.5 : 1.5;

      const radius = 8;
      ctx.beginPath();
      ctx.roundRect(px - w / 2, py - h / 2, w, h, radius);
      ctx.fill();
      ctx.stroke();

      // Text Label
      ctx.shadowBlur = 0;
      ctx.fillStyle = isSelected ? '#0B1015' : '#F8FAFC';
      ctx.font = 'bold 11px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(part.name.split(' ')[0] + ' ' + (part.name.split(' ')[1] || ''), px, py);

      ctx.restore();
    });

  }, [currentParts, selectedPartId, explodeFactor, selectedDevice]);

  const handleSelectPart = (partId: string) => {
    sound.playClick(800);
    setSelectedPartId(partId);
  };

  const ledConfigs = [
    { state: 'green', label: 'Solid Green', desc: 'Active calibrated TDOA lock (<0.24mm precision)', color: 'text-chalk-emerald', bg: 'bg-chalk-emerald', border: 'border-chalk-emerald' },
    { state: 'blue', label: 'Slow Blue Blink', desc: 'ESP-NOW channel locking with Chalk Holder', color: 'text-chalk-cyan', bg: 'bg-chalk-cyan', border: 'border-chalk-cyan' },
    { state: 'red', label: 'Rapid Red Pulse', desc: 'Failsafe backup battery engaged (<20% charge)', color: 'text-chalk-coral', bg: 'bg-chalk-coral', border: 'border-chalk-coral' },
    { state: 'cyan', label: 'Cyan Strobe', desc: 'Dual-layer RFID / WiFi authentication active (<3s)', color: 'text-cyan-400', bg: 'bg-cyan-400', border: 'border-cyan-400' },
  ];

  return (
    <section id="hardware-explorer" className="py-20 bg-slate-950 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-emerald/10 border border-chalk-emerald/30 text-xs font-mono text-chalk-emerald mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Deep-Dive Hardware Architecture & Itemized Schematics</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Transmitter & Corner Receiver Architecture
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Engineered for reliability with Seeed XIAO ESP32-C3, 40kHz MCUSD16P40B12RO burst emitter, Murata MA40S4R receivers, and failsafe Diode-OR power architecture.
          </p>
        </div>

        {/* Device Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 flex items-center gap-2 shadow-xl">
            <button
              onClick={() => {
                sound.playClick(750);
                setSelectedDevice('holder');
                setSelectedPartId('part-holder-mcu');
              }}
              className={`px-5 py-2.5 rounded-xl font-heading font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                selectedDevice === 'holder'
                  ? 'bg-gradient-to-r from-chalk-cyan to-chalk-emerald text-slate-950 shadow-md shadow-chalk-cyan/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Chalk Holder Unit (Transmitter)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick(750);
                setSelectedDevice('clips');
                setSelectedPartId('part-clip-mcu');
              }}
              className={`px-5 py-2.5 rounded-xl font-heading font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                selectedDevice === 'clips'
                  ? 'bg-gradient-to-r from-chalk-cyan to-chalk-emerald text-slate-950 shadow-md shadow-chalk-cyan/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Corner Clip Unit (Receiver ×2)</span>
            </button>
          </div>
        </div>

        {/* Main Hardware Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Col: Exploded 3D Canvas Visualizer (7 Cols) */}
          <div className="lg:col-span-7 glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/80 flex flex-col gap-4 shadow-2xl">
            
            {/* Top Toolbar with Explode Slider */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-chalk-cyan" />
                <span className="font-heading font-semibold text-sm text-slate-100">
                  {selectedDevice === 'holder' ? 'Chalk Holder Assembly' : 'Corner Clip (×2) Base Units'}
                </span>
              </div>

              {/* Explode Slider */}
              <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-slate-400">Explode Stack:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={explodeFactor}
                  onChange={(e) => setExplodeFactor(Number(e.target.value))}
                  className="w-24 sm:w-32"
                />
                <span className="text-xs font-mono font-bold text-chalk-cyan w-8 text-right">
                  {explodeFactor}%
                </span>
              </div>
            </div>

            {/* Interactive Canvas */}
            <div className="relative w-full h-[400px] bg-slate-900/80 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={650}
                height={400}
                className="w-full h-full block"
              />

              {/* Quick Select Pill Buttons */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5 justify-center bg-slate-950/80 p-2 rounded-xl border border-white/10 backdrop-blur-md">
                {currentParts.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => handleSelectPart(part.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                      selectedPartId === part.id
                        ? 'bg-chalk-cyan/20 border-chalk-cyan text-chalk-cyan font-bold shadow-sm shadow-chalk-cyan/20'
                        : 'bg-slate-900 border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {part.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Corner Clip RGB LED Telemetry Switcher (Only on Receiver Mode) */}
            {selectedDevice === 'clips' && (
              <div className="p-4 rounded-xl bg-slate-900 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-chalk-emerald" />
                    RGB Status LED Telemetry States:
                  </span>
                  <span className="text-slate-400 text-[10px]">GPIO 21/22/23</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                  {ledConfigs.map((led) => (
                    <button
                      key={led.state}
                      onClick={() => {
                        sound.playClick(700);
                        setActiveLedState(led.state as any);
                      }}
                      className={`p-2 rounded-lg border text-left transition-all ${
                        activeLedState === led.state
                          ? `bg-slate-950 ${led.border} shadow-md`
                          : 'bg-slate-950/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-2.5 h-2.5 rounded-full ${led.bg} ${activeLedState === led.state ? 'animate-ping' : ''}`} />
                        <span className={`font-bold ${led.color}`}>{led.label}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 leading-tight">{led.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Col: Selected Component Inspector & Pinout (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {activePart && (
              <div className="glass-card rounded-2xl border border-white/10 p-5 bg-slate-950/90 shadow-2xl space-y-4">
                
                {/* Part Header */}
                <div className="pb-3 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-chalk-cyan/10 text-chalk-cyan border border-chalk-cyan/30">
                      {activePart.category}
                    </span>
                    {activePart.costInr > 0 && (
                      <span className="text-xs font-mono font-bold text-chalk-emerald flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        BOM Cost: ₹{activePart.costInr}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white mt-2">
                    {activePart.name}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    Model: {activePart.partNumber}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {activePart.description}
                </p>

                {/* Technical Specifications */}
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-chalk-emerald" />
                    Engineering Specifications:
                  </h4>
                  <ul className="space-y-1.5">
                    {activePart.specs.map((spec, i) => (
                      <li key={i} className="text-xs font-mono text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-chalk-cyan" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pinout / Electrical Bus */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase block tracking-wider">
                    Firmware Interface & Pinout:
                  </span>
                  <div className="text-chalk-amber font-semibold">
                    {activePart.pinout}
                  </div>
                </div>

                {/* Validation Status */}
                <div className="flex items-center justify-between pt-1 text-xs font-mono">
                  <span className="text-slate-400">Production Readiness:</span>
                  <span className="text-chalk-emerald font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Tested & Production Ready
                  </span>
                </div>

              </div>
            )}

            {/* Quick Summary Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-chalk-cyan/10 to-chalk-emerald/10 border border-chalk-cyan/20 text-xs text-slate-300 leading-relaxed font-mono flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-chalk-cyan shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Provisional Patent App No. 202641089516:</strong> Covers the dual acoustic burst timing, self-centering wedges, and diode-OR failsafe circuit.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
