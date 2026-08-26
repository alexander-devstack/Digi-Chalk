export interface HardwareModule {
  id: string;
  name: string;
  role: 'Chalk Holder (Transmitter)' | 'Corner Clip (Receiver ×2)';
  description: string;
  electricalSpecs: {
    operatingVoltage: string;
    currentDraw: string;
    interfaceBus: string;
    clockSpeed: string;
    dimensions: string;
  };
  keyFeatures: string[];
  pinout: { pin: string; function: string; connection: string }[];
  ledStates?: { state: string; behavior: string; meaning: string; color: string }[];
}

export const HARDWARE_MODULES: HardwareModule[] = [
  {
    id: 'hw-holder',
    name: 'Chalk Holder Unit (Transmitter)',
    role: 'Chalk Holder (Transmitter)',
    description: 'Ergonomic handheld chalk sleeve with twist-feed mechanism and dual alignment wedges providing ±50° acoustic beam coverage. Integrates 40kHz ultrasonic burst transmitter boosted to 20-22V, MPU6050 6-axis IMU, and ICS-43434 24-bit voice mic.',
    electricalSpecs: {
      operatingVoltage: '3.7V LiPo (80mAh) + CR2032 Failsafe Diode-OR',
      currentDraw: '14mA (Active Writing) / 25μA (Deep Sleep)',
      interfaceBus: 'I2C (0x68 @ 400kHz), I2S Audio, ESP-NOW RF',
      clockSpeed: 'Seeed XIAO ESP32-C3 (160MHz RISC-V)',
      dimensions: '128mm length × 15mm diameter (28g with chalk)',
    },
    keyFeatures: [
      'Twist-Feed Mechanism: Continuously advances standard 9-10mm classroom chalk sticks',
      'Dual Alignment Wedges: Ensures ±50° acoustic dispersion across entire blackboard',
      'MT3608 Boost + IR2104/IRLZ44N Gate Drive: Drives MCUSD16P40B12RO at 20-22V burst',
      'Redundant Pen-Down Detection: Panasonic EVQ-P7A01P (100gf) + 20mm Piezo with 1MΩ bleed',
      'Diode-OR Power Architecture: Seamless failover between 80mAh LiPo and coin cell backup',
    ],
    pinout: [
      { pin: 'GPIO 4 (SDA)', function: 'I2C Data (400kHz)', connection: 'MPU6050 6-Axis MotionTracking IMU (Addr 0x68)' },
      { pin: 'GPIO 5 (SCL)', function: 'I2C Clock (400kHz)', connection: 'MPU6050 6-Axis MotionTracking IMU (Addr 0x68)' },
      { pin: 'GPIO 8 (PWM)', function: '40kHz Burst Gate', connection: 'IR2104 / IRLZ44N Driver & MCUSD16P40B12RO TX' },
      { pin: 'GPIO 2 (DIN)', function: 'I2S Audio Data', connection: 'ICS-43434 24-bit MEMS Microphone (44.1kHz PCM)' },
      { pin: 'GPIO 3 (INT)', function: 'Tactile Wakeup', connection: 'Panasonic EVQ-P7A01P 100gf Tactile Switch' },
      { pin: 'GPIO 1 (ADC)', function: 'Piezo Sense', connection: '20mm Generic Piezo Plate (1MΩ bleed resistor)' },
    ],
  },
  {
    id: 'hw-clip',
    name: 'Corner Clip Unit (Receiver ×2)',
    role: 'Corner Clip (Receiver ×2)',
    description: 'Dual self-centering magnetic base clips mounted at blackboard corners. Houses Murata MA40S4R 40kHz acoustic receivers, LM358 100x-1000x AFE gain stages, LM393 comparator with 1N4148 envelope detector, and ESP32 DevKitC-32E running microsecond TDOA timestamps.',
    electricalSpecs: {
      operatingVoltage: '5.0V USB-C / Internal Li-ion Cell (TP4056 / MCP73831)',
      currentDraw: '95mA (Continuous ESP-NOW Multilateration capture)',
      interfaceBus: 'ESP-NOW Low-Latency Wireless + Hardware Timers',
      clockSpeed: 'ESP32-DevKitC-32E (240MHz Dual-Core Xtensa LX6)',
      dimensions: '85mm × 45mm × 24mm (Magnetic Clip Enclosure)',
    },
    keyFeatures: [
      'Self-Centering Tool-Free Mount: Magnetic clasp aligns instantly on any blackboard bezel',
      'Murata MA40S4R High-Gain RX: High sensitivity at 40.0 ± 1.0 kHz with 1000x LM358 AFE',
      'LM393 Comparator + 1N4148 Envelope Detector: Clean microsecond pulse edge detection',
      '300μs Guard Delay: Hardware rejection of acoustic near-field ring-down settling',
      'Dual-Layer RFID + WiFi MAC Authentication: Verifies instructor presence in <3 seconds',
    ],
    pinout: [
      { pin: 'GPIO 14 (CAPTURE)', function: 'TDOA Timer Interrupt', connection: 'LM393 Comparator / 1N4148 Envelope Output' },
      { pin: 'GPIO 21 (STATUS_R)', function: 'RGB LED Red', connection: 'Failsafe Battery / Fault Indicator' },
      { pin: 'GPIO 22 (STATUS_G)', function: 'RGB LED Green', connection: 'Calibrated TDOA Lock Telemetry' },
      { pin: 'GPIO 23 (STATUS_B)', function: 'RGB LED Blue', connection: 'ESP-NOW & RFID Auth Telemetry' },
      { pin: 'VBUS (5V USB)', function: 'Main DC Power', connection: 'TP4056 / MCP73831 Charge Controller' },
    ],
    ledStates: [
      { state: 'Solid Green', behavior: 'Continuous Steady Glow', meaning: 'Active calibrated TDOA lock (<0.24mm precision)', color: '#34D399' },
      { state: 'Slow Blue Blink', behavior: '1Hz Blue Pulse', meaning: 'ESP-NOW channel locking with Chalk Holder', color: '#38BDF8' },
      { state: 'Rapid Red Pulse', behavior: '5Hz Red Strobe', meaning: 'Failsafe backup battery engaged (<20% charge)', color: '#FB7185' },
      { state: 'Cyan Strobe', behavior: 'Fast Cyan Sweep', meaning: 'Dual-layer RFID / WiFi MAC authentication active', color: '#22D3EE' },
    ],
  },
];
