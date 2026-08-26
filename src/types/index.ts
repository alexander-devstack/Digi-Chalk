export interface Point {
  x: number;
  y: number;
  pressure?: number;
  time?: number;
  speed?: number;
  isOccluded?: boolean;
}

export interface Stroke {
  points: Point[];
  color: string;
  width: number;
  type: 'chalk' | 'glow' | 'highlighter' | 'eraser';
  beautifiedShape?: DetectedShape;
  isSilentQuestion?: boolean;
}

export type ShapeType = 'circle' | 'rectangle' | 'triangle' | 'arrow' | 'line' | 'sine_wave' | 'coordinate_axis' | 'question_mark' | 'unknown';

export interface DetectedShape {
  type: ShapeType;
  confidence: number;
  bounds: { minX: number; minY: number; maxX: number; maxY: number };
  center?: { x: number; y: number };
  radius?: number;
  points?: Point[];
  label: string;
  latex?: string;
}

export interface TelemetryData {
  x: number;
  y: number;
  z: number;
  pressure: number;
  deltaT1: number; // microseconds
  deltaT2: number; // microseconds
  deltaT3: number; // microseconds
  temperature: number; // Celsius
  speedOfSound: number; // m/s
  espNowLatency: number; // ms
  packetLoss: number; // %
  batteryVoltage: number; // V
  batteryPercentage: number;
  samplingRate: number; // Hz (e.g., 250Hz)
  ledState: 'solid_green' | 'slow_blue_blink' | 'rapid_red_pulse' | 'cyan_strobe';
  mahalanobisDistance: number;
  isNlosOccluded: boolean;
  guardDelayActive: boolean; // 300us ringdown guard
  imu: {
    accelX: number;
    accelY: number;
    accelZ: number;
    gyroX: number;
    gyroY: number;
    gyroZ: number;
    pitch: number;
    roll: number;
    yaw: number;
  };
  filterMode: 'raw' | 'moving_avg' | 'arckf_lstm';
}

export interface BomItem {
  id: string;
  subsystem: 'Holder' | 'Clips (x2)' | 'Total';
  category: string;
  component: string;
  partNumber: string;
  purpose: string;
  quantity: number;
  unitCostInr: number;
  vendor: string;
  leadTimeWeeks: number;
  status: 'In Stock' | 'Tested & Validated' | 'Production Ready';
}

export interface RoadmapMilestone {
  id: string;
  phase: string;
  trlLevel: string;
  title: string;
  duration: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  budgetInr: number;
  keyDeliverables: string[];
  riskMitigation: string;
}

export interface LectureSample {
  id: string;
  title: string;
  subject: string;
  duration: string;
  instructor: string;
  audioTimestamp: number;
  transcriptLines: {
    time: number;
    speaker: string;
    text: string;
    action: string;
  }[];
  generatedNotes: {
    summary: string;
    keyPoints: string[];
    equations: string[];
    quiz: { question: string; options: string[]; answer: number }[];
  };
}

export interface CostComparisonDimension {
  id: string;
  title: string;
  smartBoard: {
    title: string;
    value: string;
    detail: string;
    rating: 'poor' | 'fair' | 'good' | 'optimal';
  };
  projectorBox: {
    title: string;
    value: string;
    detail: string;
    rating: 'poor' | 'fair' | 'good' | 'optimal';
  };
  digiChalk: {
    title: string;
    value: string;
    detail: string;
    rating: 'poor' | 'fair' | 'good' | 'optimal';
  };
}
