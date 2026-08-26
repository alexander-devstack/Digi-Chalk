// 2D State-Space Kalman Filter for Digi-Chalk Pen Coordinate Smoothing

export class KalmanFilter2D {
  private x: number = 0; // State estimate x
  private y: number = 0; // State estimate y
  private vx: number = 0; // Velocity x
  private vy: number = 0; // Velocity y

  // Covariance matrix elements
  private p00: number = 1;
  private p01: number = 0;
  private p10: number = 0;
  private p11: number = 1;

  // Process Noise Covariance (Q)
  private q: number = 0.008;

  // Measurement Noise Covariance (R) - Ultrasonic TDOA jitter ~0.25mm
  private r: number = 0.05;

  private isInitialized: boolean = false;
  private lastTimestamp: number = 0;

  constructor(processNoise = 0.008, measurementNoise = 0.05) {
    this.q = processNoise;
    this.r = measurementNoise;
  }

  public reset(initX = 0, initY = 0) {
    this.x = initX;
    this.y = initY;
    this.vx = 0;
    this.vy = 0;
    this.p00 = 1;
    this.p01 = 0;
    this.p10 = 0;
    this.p11 = 1;
    this.isInitialized = true;
    this.lastTimestamp = performance.now();
  }

  public update(measuredX: number, measuredY: number, isGatedOutOrDt: boolean | number = false, customDt: number = 0.016): { x: number; y: number; vx: number; vy: number } {
    const isGatedOut = typeof isGatedOutOrDt === 'boolean' ? isGatedOutOrDt : false;
    const dt = typeof isGatedOutOrDt === 'number' ? isGatedOutOrDt : customDt;

    if (!this.isInitialized) {
      this.reset(measuredX, measuredY);
      return { x: measuredX, y: measuredY, vx: 0, vy: 0 };
    }

    // 1. Predict Step
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    this.p00 += this.p01 * dt + this.p10 * dt + this.p11 * dt * dt + this.q;
    this.p01 += this.p11 * dt;
    this.p10 += this.p11 * dt;
    this.p11 += this.q;

    // If gated out (Mahalanobis distance > 6.2), skip measurement update and use pure prediction
    if (isGatedOut) {
      return { x: this.x, y: this.y, vx: this.vx, vy: this.vy };
    }

    // 2. Update Step for X
    const kx0 = this.p00 / (this.p00 + this.r);
    const kx1 = this.p10 / (this.p00 + this.r);

    const residualX = measuredX - this.x;
    this.x += kx0 * residualX;
    this.vx += kx1 * residualX;

    // Update Step for Y
    const ky0 = this.p00 / (this.p00 + this.r);
    const ky1 = this.p10 / (this.p00 + this.r);

    const residualY = measuredY - this.y;
    this.y += ky0 * residualY;
    this.vy += ky1 * residualY;

    // Update error covariance
    const p00Temp = this.p00;
    const p01Temp = this.p01;

    this.p00 -= kx0 * p00Temp;
    this.p01 -= kx0 * p01Temp;
    this.p10 -= kx1 * p00Temp;
    this.p11 -= kx1 * p01Temp;

    return { x: this.x, y: this.y, vx: this.vx, vy: this.vy };
  }
}
