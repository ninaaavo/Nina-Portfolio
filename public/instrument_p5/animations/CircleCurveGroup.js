class CircleCurveGroup extends AnimationGroup {
  constructor() {
    super();

    this.particleDuration = 7000;
    this.startPosition = [700, 700];
    this.endPosition = [1300, 180];
    this.curvePower = 4;

    this.circleCount = 4;
    this.startTime = null;
  }

  animate() {
    const now = millis();

    if (this.startTime === null) {
      this.startTime = now;
    }
    
    // wiggle when touched
    const wiggle = constrain(this.touchStrength, 0, 1);

    translate(
      sin(now * 0.08) * 20 * wiggle,
      cos(now * 0.08 * 1.3) * 20 * wiggle
    );

    const elapsed = now - this.startTime;
    const spacing = this.particleDuration / this.circleCount;

    for (let i = 0; i < this.circleCount; i++) {
      const offset = i * spacing;

      // Wrap back to 0 whenever the circle completes its cycle.
      const t =
        ((elapsed + offset) % this.particleDuration) /
        this.particleDuration;

      this.drawParticle(t);
    }
  }

  drawParticle(t) {
    const [x, y] = this.curvedPosition(t);

    noStroke();
    fill(255);
    circle(x, y, 100 * (1 - pow(t, 2)));
  }

  curvedPosition(t) {
    const curvedT = 1 - pow(1 - t, this.curvePower);

    return [
      lerp(this.startPosition[0], this.endPosition[0], t),
      lerp(this.startPosition[1], this.endPosition[1], curvedT)
    ];
  }
}