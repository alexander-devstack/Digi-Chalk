import { RoadmapMilestone } from '../types';

export interface RoadmapPhase {
  id: string;
  name: string;
  stage: string;
  duration: string;
  budgetInr: number;
  subphases: {
    title: string;
    budgetInr: number;
    description: string;
  }[];
  deliverables: string[];
}

export const COMMERCIALIZATION_ROADMAP = {
  totalSeedBudgetInr: 1300000,
  totalSeedBudgetFormatted: '₹13,00,000 ($15.5k)',
  timeline: '15 Months (Gated Milestone Architecture)',
  phaseA: {
    title: 'Phase A: Path to TRL-6 (Months 1–6)',
    budgetInr: 300000,
    items: [
      {
        phase: 'Phase 1: Bench Prototyping',
        budgetInr: 90000,
        description: '3-unit PCB fabrication, component buffer, and firmware testing tools validation.',
      },
      {
        phase: 'Phase 2: Small-Batch Fabrication',
        budgetInr: 135000,
        description: '10–15 unit batch, field logistics, safety checks, and design iteration buffer.',
      },
      {
        phase: 'Phase 3: Pilot Deployment',
        budgetInr: 75000,
        description: 'Initial classroom pilot, teacher onboarding, travel, and contingency reserve.',
      },
    ],
  },
  phaseB: {
    title: 'Phase B: Path to TRL-9 Scale (Months 7–15)',
    budgetInr: 1000000,
    items: [
      {
        phase: '100+ Unit Production Run',
        budgetInr: 350000,
        description: 'Scaled manufacturing with regional Coimbatore/Tamil Nadu contract partner.',
      },
      {
        phase: 'Multi-District Pilot',
        budgetInr: 250000,
        description: 'Classroom deployment across 3–5 districts over a full academic term.',
      },
      {
        phase: 'BIS & Safety Compliance',
        budgetInr: 100000,
        description: 'Official certification for state government tender & GeM eligibility.',
      },
      {
        phase: 'Teacher Training & Field Operations',
        budgetInr: 200000,
        description: 'Regional rollout, educator onboarding layer, and maintenance support.',
      },
      {
        phase: 'Operational Contingency',
        budgetInr: 100000,
        description: 'Dedicated operational and supply chain contingency reserve.',
      },
    ],
  },
};

export const MARKET_DATA_TN = {
  geographicFocus: 'Tamil Nadu Government Schools (SSA / Samagra Shiksha Channel)',
  totalSchools: 37626,
  unitsPerSchool: 2,
  unitPriceInr: 45000,
  tam: {
    label: 'TAM (Total Addressable Market)',
    value: '₹338.63 Crores',
    basis: '37,626 TN Schools × 2 Units/School × ₹45,000',
    description: 'Complete digitalization of state government school blackboards in Tamil Nadu.',
  },
  sam: {
    label: 'SAM (Serviceable Addressable Market)',
    value: '₹33.86 Crores',
    basis: '3-Year Target (10% of TN Schools)',
    description: '3,762 schools across high-density educational blocks.',
  },
  som: {
    label: 'SOM (Serviceable Obtainable Market)',
    value: '₹33.86 Lakhs',
    basis: 'Year 1–2 Pilot Rollout (1% of Schools)',
    description: '376 schools in initial Coimbatore, Madurai & Chennai clusters.',
  },
  unitEconomics: {
    retailPriceInr: 45000,
    cogsInr: 9270,
    grossMarginInr: 35730,
    grossMarginPercent: 79.4,
    breakevenMin: 28,
    breakevenMax: 35,
    fixedOpCostsInr: 1000000, // ₹10L Phase B Fixed Costs
  },
};

export const UNIT_ECONOMICS = MARKET_DATA_TN.unitEconomics;

export const ROADMAP_DATA: RoadmapMilestone[] = [
  {
    id: 'TRL-2',
    phase: 'Phase 1: Proof of Concept (TRL 2 → 3)',
    trlLevel: 'TRL 2 → 3',
    title: 'Acoustic TDOA Multilateration & Patent Filing',
    duration: 'Months 1–3 (Completed)',
    status: 'Completed',
    budgetInr: 90000,
    keyDeliverables: [
      'Provisional Patent Filed: Application No. 202641089516 (Indian Patent Office)',
      'Sub-millimeter 40kHz acoustic TDOA bench validation (0.24mm precision)',
      'Seeed XIAO ESP32-C3 + MPU6050 6-axis IMU complementary Kalman fusion',
      'ESP-NOW wireless packet transmission at < 0.1ms latency',
    ],
    riskMitigation: '300μs ring-down guard delay and hardware high-pass filtering eliminates acoustic multipath reflection.',
  },
  {
    id: 'TRL-4',
    phase: 'Phase 2: Alpha Lab Prototype (TRL 4 → 5)',
    trlLevel: 'TRL 4 → 5',
    title: 'Dual Corner Receiver Clips & ARCKF Edge AI Model',
    duration: 'Months 4–7 (In Progress)',
    status: 'In Progress',
    budgetInr: 135000,
    keyDeliverables: [
      'Custom 4-layer PCB Rev-C layout with onboard ESP32-DevKitC-32E and LM358 AFE',
      'Quantized MobileNetV3-small shape inference engine (14ms on-device latency)',
      'Self-centering magnetic blackboard mounting clasp with ±50° beam wedges',
      'ARCKF Mahalanobis χ² gating algorithm for NLOS teacher body occlusion handling',
    ],
    riskMitigation: 'Diode-OR power bridge failover from 80mAh LiPo to CR2032 prevents classroom battery outage.',
  },
  {
    id: 'TRL-6',
    phase: 'Phase 3: 50-Classroom School Pilot (TRL 6 → 7)',
    trlLevel: 'TRL 6 → 7',
    title: 'Tamil Nadu Government School Pilot & Multilingual AI',
    duration: 'Months 8–11 (Upcoming)',
    status: 'Upcoming',
    budgetInr: 75000,
    keyDeliverables: [
      'Classroom pilot deployment across Govt Hr Sec Schools in Coimbatore & Tamil Nadu',
      'Real-time lecture audio transcription + timestamped blackboard vector snapshot pipeline',
      'Multilingual AI notes generation in Tamil, Hindi, Telugu, Kannada, and English',
      'Teacher pedagogical feedback loop & battery endurance validation (>18 hours writing)',
    ],
    riskMitigation: 'Offline-first Edge computing ensures zero dependence on rural internet bandwidth.',
  },
  {
    id: 'TRL-9',
    phase: 'Phase 4: Commercial Mass Production (TRL 8 → 9)',
    trlLevel: 'TRL 8 → 9',
    title: 'Injection Tooling, BIS Certification & Scale to 10k Units',
    duration: 'Months 12–15 (Upcoming)',
    status: 'Upcoming',
    budgetInr: 1000000,
    keyDeliverables: [
      'Hardened steel injection mold for ABS chalk sleeve & magnetic corner clip housing',
      'BIS & WPC wireless regulatory certification compliance for commercial procurement',
      'Tier-1 EMS contract manufacturing partnership (Unit COGS sub-₹1,055 at volume)',
      'Samagra Shiksha Abhiyan (SSA) state education tender onboarding via GeM portal',
    ],
    riskMitigation: 'Multi-source dual-vendor component strategy for all passive and semiconductor ICs.',
  },
];

export const FUNDING_ALLOCATION = {
  totalTargetInr: 1300000,
  totalTargetUsd: '$15.5k',
  timelineMonths: 15,
  breakdown: [
    { category: 'Phase A: Prototyping & Small-Batch Pilot', percentage: 23, amountInr: 300000, color: '#0EA5E9' },
    { category: 'Phase B: 100+ Unit Production Run', percentage: 27, amountInr: 350000, color: '#10B981' },
    { category: 'Phase B: Multi-District Pilot (3–5 Districts)', percentage: 19, amountInr: 250000, color: '#F59E0B' },
    { category: 'Phase B: BIS & Regulatory Certification', percentage: 8, amountInr: 100000, color: '#F43F5E' },
    { category: 'Phase B: Teacher Training & Field Operations', percentage: 15, amountInr: 200000, color: '#8B5CF6' },
    { category: 'Phase B: Operational Contingency', percentage: 8, amountInr: 100000, color: '#64748B' },
  ],
};
