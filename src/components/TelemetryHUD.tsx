import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Wifi, 
  BatteryCharging, 
  Cpu, 
  Radio, 
  Compass, 
  Gauge, 
  Zap,
  Sliders
} from 'lucide-react';
import { TelemetryData } from '../types';

interface TelemetryHUDProps {
  penPosition: { x: number; y: number; pressure: number; isDrawing: boolean };
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({ penPosition }) => {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    x: 320.4,
    y: 215.8,
    z: 0.0,
    pressure: 0.0,
    deltaT1: 842.6, // microseconds
    deltaT2: 615.2, // microseconds
    deltaT3: 1120.4,
    temperature: 26.5,
    speedOfSound: 347.1,
    espNowLatency: 0.12,
    packetLoss: 0.0,
    batteryVoltage: 3.87,
    batteryPercentage: 88,
    samplingRate: 250,
    ledState: 'solid_green',
    mahalanobisDistance: 2.14,
    isNlosOccluded: false,
    guardDelayActive: false,
    imu: {
      accelX: 0.02,
      accelY: -0.98,
      accelZ: 0.15,
      gyroX: 1.2,
      gyroY: -0.4,
      gyroZ: 0.8,
      pitch: -12.4,
      roll: 24.8,
      yaw: 182.1,
    },
    filterMode: 'arckf_lstm',
  });

  // Continuously update synthetic telemetry based on pen movement & sensor oscillations
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const isDrawing = penPosition.isDrawing;
        const targetX = isDrawing ? penPosition.x * 1.5 : prev.x + (Math.random() - 0.5) * 1.2;
        const targetY = isDrawing ? penPosition.y * 1.5 : prev.y + (Math.random() - 0.5) * 1.2;

        // Acoustic TDOA calculation
        // Receiver 1 at (0, 0), Receiver 2 at (600, 0)
        const mic1Dist = Math.hypot(targetX, targetY);
        const mic2Dist = Math.hypot(600 - targetX, targetY);
        const vSoundMmPerUs = (prev.speedOfSound * 1000) / 1000000; // mm per microsecond

        const dt1 = +(mic1Dist / vSoundMmPerUs + (Math.random() - 0.5) * 0.4).toFixed(1);
        const dt2 = +(mic2Dist / vSoundMmPerUs + (Math.random() - 0.5) * 0.4).toFixed(1);

        // IMU dynamics
        const jitter = isDrawing ? 4.5 : 0.8;
        const pitch = +(prev.imu.pitch + (Math.random() - 0.5) * jitter).toFixed(1);
        const roll = +(prev.imu.roll + (Math.random() - 0.5) * jitter).toFixed(1);
        const yaw = +(prev.imu.yaw + (Math.random() - 0.5) * 0.5).toFixed(1);

        return {
          ...prev,
          x: +targetX.toFixed(1),
          y: +targetY.toFixed(1),
          pressure: isDrawing ? +(penPosition.pressure * 10 + 2.5).toFixed(2) : 0.0,
          deltaT1: dt1,
          deltaT2: dt2,
          espNowLatency: +(0.10 + Math.random() * 0.05).toFixed(2),
          batteryVoltage: +(3.87 - Math.random() * 0.01).toFixed(2),
          imu: {
            ...prev.imu,
            pitch: Math.max(-45, Math.min(45, pitch)),
            roll: Math.max(-60, Math.min(60, roll)),
            yaw: ((yaw % 360) + 360) % 360,
            accelX: +(Math.sin(pitch * Math.PI / 180) + (Math.random() - 0.5) * 0.05).toFixed(2),
            accelY: +(-Math.cos(pitch * Math.PI / 180) + (Math.random() - 0.5) * 0.05).toFixed(2),
            accelZ: +(Math.sin(roll * Math.PI / 180) + (Math.random() - 0.5) * 0.05).toFixed(2),
          }
        };
      });
    }, 80);

    return () => clearInterval(interval);
  }, [penPosition]);

  return (
    <div className="w-full rounded-2xl glass-card border border-white/10 p-4 sm:p-5 flex flex-col gap-4 bg-slate-900/80">
      
      {/* Header with ESP-NOW Status & Patent Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-chalk-cyan animate-pulse" />
          <span className="font-heading font-semibold text-sm text-slate-100">
            Real-Time Edge Telemetry HUD
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-chalk-emerald/10 text-chalk-emerald border border-chalk-emerald/30">
            ESP-NOW LOCKED (0.1ms)
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-chalk-cyan animate-ping" />
            <span className="text-slate-300">40.0 kHz PZT</span>
          </div>
          <div className="flex items-center gap-1">
            <BatteryCharging className="w-3.5 h-3.5 text-chalk-emerald" />
            <span className="text-slate-200">{telemetry.batteryPercentage}% ({telemetry.batteryVoltage}V)</span>
          </div>
        </div>
      </div>

      {/* Grid of Telemetry Sensors & Live Meters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Metric 1: Coordinate State (X, Y) */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Compass className="w-3 h-3 text-chalk-cyan" />
              TDOA Position (X, Y)
            </span>
            <span className="text-chalk-emerald text-[10px]">±0.24mm</span>
          </div>
          <div className="my-2">
            <div className="font-mono font-bold text-lg text-chalk-cyan flex items-baseline gap-1">
              <span>X:{telemetry.x}</span>
              <span className="text-xs text-slate-400">mm</span>
            </div>
            <div className="font-mono font-bold text-lg text-chalk-cyan flex items-baseline gap-1">
              <span>Y:{telemetry.y}</span>
              <span className="text-xs text-slate-400">mm</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>State: {penPosition.isDrawing ? 'Active Writing' : 'Hover / Standby'}</span>
            <span className="text-chalk-amber">250 SPS</span>
          </div>
        </div>

        {/* Metric 2: Acoustic TDOA Microsecond Latency (Δt1, Δt2) */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-chalk-amber" />
              TDOA Delay (Δt)
            </span>
            <span className="text-slate-400 text-[10px]">Dual MEMS</span>
          </div>
          <div className="my-2">
            <div className="flex justify-between items-baseline font-mono text-xs text-slate-300">
              <span>Δt₁ (Mic-L):</span>
              <span className="font-bold text-chalk-amber">{telemetry.deltaT1} μs</span>
            </div>
            <div className="flex justify-between items-baseline font-mono text-xs text-slate-300 mt-1">
              <span>Δt₂ (Mic-R):</span>
              <span className="font-bold text-chalk-amber">{telemetry.deltaT2} μs</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-chalk-amber to-chalk-coral h-full transition-all duration-75"
                style={{ width: `${Math.min(100, (telemetry.deltaT1 / 1500) * 100)}%` }}
              />
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Sound Vel: {telemetry.speedOfSound} m/s</span>
            <span className="text-chalk-cyan">26.5°C Calib</span>
          </div>
        </div>

        {/* Metric 3: MPU6050 6-DOF IMU Vectors & Tilt */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Gauge className="w-3 h-3 text-chalk-emerald" />
              MPU6050 IMU Pitch/Roll
            </span>
            <span className="text-chalk-emerald text-[10px]">6-DOF DMP</span>
          </div>
          <div className="my-2 flex items-center gap-3">
            {/* Visual Tilt Indicator */}
            <div className="w-12 h-12 rounded-full border border-white/10 bg-slate-900 relative flex items-center justify-center overflow-hidden">
              <div 
                className="w-8 h-1 bg-chalk-emerald rounded-full transition-transform duration-75 shadow-sm shadow-chalk-emerald"
                style={{ transform: `rotate(${telemetry.imu.pitch}deg)` }}
              />
              <div 
                className="w-1 h-8 bg-chalk-cyan/50 rounded-full absolute transition-transform duration-75"
                style={{ transform: `rotate(${telemetry.imu.roll}deg)` }}
              />
            </div>
            <div className="font-mono text-xs space-y-0.5">
              <div className="text-slate-300">Pitch: <span className="text-chalk-emerald font-bold">{telemetry.imu.pitch}°</span></div>
              <div className="text-slate-300">Roll: <span className="text-chalk-cyan font-bold">{telemetry.imu.roll}°</span></div>
              <div className="text-slate-400 text-[10px]">Yaw: {telemetry.imu.yaw}°</div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-400 flex justify-between">
            <span>Accel: ({telemetry.imu.accelX}, {telemetry.imu.accelY})g</span>
            <span className="text-chalk-emerald">Palm Rejected</span>
          </div>
        </div>

        {/* Metric 4: Wireless Bridge & Kalman Filter State */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-chalk-coral" />
              ESP32-S3 Pipeline
            </span>
            <span className="text-chalk-cyan text-[10px]">240MHz</span>
          </div>
          <div className="my-2">
            <div className="flex justify-between items-baseline font-mono text-xs text-slate-300">
              <span>Wireless Protocol:</span>
              <span className="text-chalk-coral font-bold">ESP-NOW</span>
            </div>
            <div className="flex justify-between items-baseline font-mono text-xs text-slate-300 mt-1">
              <span>RF Latency:</span>
              <span className="text-chalk-emerald font-bold">{telemetry.espNowLatency} ms</span>
            </div>
            <div className="flex justify-between items-baseline font-mono text-xs text-slate-300 mt-1">
              <span>Tip Force (FSR):</span>
              <span className="text-chalk-amber font-bold">{telemetry.pressure} N</span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span className="text-chalk-emerald flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-chalk-emerald"></span>
              Kalman 2D Filtered
            </span>
            <span className="text-slate-400">0.0% Loss</span>
          </div>
        </div>

      </div>

    </div>
  );
};
