class DisappearCircleGroup extends AnimationGroup {
  constructor() {
    super();
    this.loopDuration = 2000;
    this.circles = [
      { x: 1831, y: 945, size: 135 },
      { x: 1701, y: 828, size: 108 },
      { x: 1593, y: 738, size: 81 },
      { x: 1507, y: 661, size: 63 },
      { x: 1443, y: 599, size: 43 }
    ];
    this.currentDeltaColor = 0
    this.currentDeltaY = 0
    this.maxDeltaColor = 200
    this.maxDeltaY = -200
    

  }

  animate() {
    
    const targetDeltaColor = lerp(0, this.maxDeltaColor, this.touchStrength);
    const targetDeltaY = lerp(0, this.maxDeltaY, this.touchStrength);

    // console.log("motion smooth()", motionSmoothing())
    
    this.currentDeltaColor = lerp(this.currentDeltaColor, targetDeltaColor, motionSmoothing())
    
    this.currentDeltaY = lerp (this.currentDeltaY, targetDeltaY, motionSmoothing())

   
    fill(backgroundColor + this.currentDeltaColor);
    noStroke();
    
    for (const c of this.circles) {
      circle(c.x, c.y + this.currentDeltaY, c.size / 1.5);
    }

    for (const c of this.circles) this.drawCircle(c, millis());
  }

  drawCircle({ x, y, size: maxSize }, now) {
    const currentTime = now % this.loopDuration;
    const progress = constrain(currentTime / this.loopDuration, 0, 1);
    const eased = 1 - (1 - progress) ** 2; // easeOutQuad

    stroke(200);
    if (currentTime > this.loopDuration / 3) noFill();
    else fill(200);

    strokeWeight(lerp(maxSize / 6, 0, eased));
    circle(x, y, lerp(0, maxSize, eased));
  }
}
