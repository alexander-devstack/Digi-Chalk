import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Radio, 
  Zap, 
  ShieldCheck, 
  Compass, 
  Battery, 
  Mic
} from 'lucide-react';
import { sound } from '../utils/sound';

export const HardwareBOM: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'holder' | 'clips'>('holder');

  const holderSpecs = [
    {
      label: 'Processing Core',
      value: 'Seeed XIAO ESP32-C3',
      detail: 'I2C Address: 0x68 (Fast Mode 400kHz), BLE 5.0 GATT server & ESP-NOW direct sync.',
      icon: Cpu,
    },
    {
      label: 'Motion & Inertial Tracking',
      value: 'MPU6050 6-Axis IMU Module',
      detail: 'Fast Mode (400kHz I2C, GPIO 4/5 SDA/SCL) with onboard DMP for orientation & palm rejection.',
      icon: Compass,
    },
    {
      label: 'Acoustic Burst Transmitter',
      value: 'MCUSD16P40B12RO (40kHz)',
      detail: '40kHz open-structure burst transducer driven via MT3608 boost circuit (20-22V) with IR2104 / IRLZ44N gate logic.',
      icon: Radio,
    },
    {
      label: 'Voice Audio Interface',
      value: 'ICS-43434 I2S Digital MEMS Mic',
      detail: '24-bit PCM at 44.1kHz for WebRTC/Silero VAD speech isolation and timestamped lecture sync.',
      icon: Mic,
    },
    {
      label: 'Dual Pen-Down Sensing',
      value: 'Panasonic Tactile (100gf) + 20mm Piezo',
      detail: 'EVQ-P7A01P 100gf switch + 20mm Piezo disc (1MΩ bleed resistor) for zero-latency touchdown trigger & zero-state reset.',
      icon: Zap,
    },
    {
      label: 'Power & Failsafe Diode-OR',
      value: '80mAh LiPo + CR2032 Backup Bridge',
      detail: '80mAh 3.7V LiPo with TP4056/MCP73831 USB-C charging + CR2032 failsafe Diode-OR bridge preventing dead battery downtime.',
      icon: Battery,
    },
  ];

  const clipSpecs = [
    {
      label: 'Base Compute & Sync Hub',
      value: 'ESP32 DevKitC-32E Subsystem',
      detail: 'Dual-core 240MHz Xtensa LX6 executing microsecond ESP-NOW sync, timer capture interrupts, and ARCKF sensor fusion.',
      icon: Cpu,
    },
    {
      label: 'Acoustic Ultrasonic Receivers',
      value: 'Murata MA40S4R 40kHz High-Gain RX',
      detail: 'Matched-pair high-sensitivity 40.0 ± 1.0 kHz sensors mounted on blackboard corner brackets.',
      icon: Radio,
    },
    {
      label: 'Analog Front-End (AFE)',
      value: 'LM358 (1000x) + LM393 Comparator',
      detail: 'Dual-stage op-amp gain (100x–1000x) with 1N4148 fast envelope detector and 300µs temporal guard delay.',
      icon: Layers,
    },
    {
      label: 'Power Management Rail',
      value: 'TP4056 / MCP73831 Charge IC',
      detail: '5V USB-C continuous regulation + Li-ion battery management with UF4007 flyback suppression.',
      icon: Battery,
    },
  ];

  const ledIndicators = [
    { state: 'Solid Green', meaning: 'Active calibrated TDOA lock (<0.24mm precision)', color: 'bg-chalk-emerald' },
    { state: 'Slow Blue Blink', meaning: 'Synchronizing ESP-NOW wireless channel', color: 'bg-chalk-cyan' },
    { state: 'Rapid Red Pulse', meaning: 'Running on CR2032 backup failsafe power', color: 'bg-chalk-coral' },
    { state: 'Cyan Strobe', meaning: 'Dual-layer RFID / WiFi MAC authentication active', color: 'bg-sky-300' },
  ];

  return (
    <section id="hardware-architecture" className="py-20 bg-slate-950 relative border-t border-white/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chalk-cyan/10 border border-chalk-cyan/30 text-xs font-mono text-chalk-cyan mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Hardware Architecture</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Transmitter & Receiver Subsystems
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
            Detailed engineering breakdown of the mobile Chalk Holder (Transmitter) and stationary Corner Clip (Receiver Pair).
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-white/10 flex flex-wrap items-center justify-center gap-2 shadow-xl font-mono text-xs sm:text-sm">
            <button
              onClick={() => {
                sound.playClick(750);
                setActiveTab('holder');
              }}
              className={`px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'holder'
                  ? 'bg-chalk-cyan text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Chalk Holder (Transmitter)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick(750);
                setActiveTab('clips');
              }}
              className={`px-4 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'clips'
                  ? 'bg-chalk-cyan text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>Corner Clip Unit (Receiver ×2)</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Chalk Holder Specs */}
        {activeTab === 'holder' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {holderSpecs.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.label} className="slate-card p-5 border border-white/10 bg-slate-900/80 flex flex-col justify-between">
                    <div>
                      <div className="mb-3">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">{spec.label}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon className="w-4 h-4 text-chalk-cyan shrink-0" />
                        <h4 className="font-heading font-bold text-sm text-white">{spec.value}</h4>
                      </div>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed mt-2">
                        {spec.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ergonomics & Mechanical Highlight */}
            <div className="slate-card p-4 border border-white/10 bg-slate-900/60 font-mono text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-chalk-cyan">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Mechanical: Dual alignment ridges for ±50° beam orientation + twist-feed continuous chalk advancement.</span>
              </div>
              <span className="text-slate-400 text-[11px]">Weight: 28g (with chalk)</span>
            </div>
          </div>
        )}

        {/* Tab Content 2: Corner Clip Receiver Specs */}
        {activeTab === 'clips' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clipSpecs.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.label} className="slate-card p-5 border border-white/10 bg-slate-900/80 flex flex-col justify-between">
                    <div>
                      <div className="mb-3">
                        <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">{spec.label}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon className="w-4 h-4 text-chalk-cyan shrink-0" />
                        <h4 className="font-heading font-bold text-sm text-white">{spec.value}</h4>
                      </div>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed mt-2">
                        {spec.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Telemetry LED Status Table */}
            <div className="slate-card p-5 border border-white/10 bg-slate-900/90 space-y-3">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-300">
                Corner Receiver RGB Telemetry LED States
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
                {ledIndicators.map((led) => (
                  <div key={led.state} className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-start gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${led.color} mt-1 shrink-0 animate-pulse`} />
                    <div>
                      <strong className="text-white block text-xs">{led.state}</strong>
                      <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">{led.meaning}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
