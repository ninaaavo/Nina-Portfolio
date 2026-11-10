class UpperRightGroup extends AnimationGroup {
  constructor() {
    super();
    this.currentDeltaMove = 0;

    this.rect = [[[1530, 54], [1602, 72], [1386, 297], [1368, 288]], [[1287, 405], [1935, -108], [2079, -45], [1296, 423]]]
    
      this.circle = [[1413, 441, 36], [1497, 399, 58], [1620, 342, 90], [1773, 288, 126]]
    this.moveOutDelta = [
      [72, -90],
      [108, -72], [108, -54]
    ];
    this.angleDelta = [-0.15, 0, 0.15]
    this.fillColor = [200, 100, 230]
  }

 animate() {
  const smoothing = motionSmoothing();
  const strength = constrain(this.touchStrength, 0, 1);

  this.currentDeltaMove = lerp(
    this.currentDeltaMove,
    strength,
    smoothing
  );

  // Back-and-forth movement every 3 seconds
  const t = cos((millis() / 3000) * 2 * PI) / 2;

  noStroke();

  // Draw rectangles
  for (let i = 0; i < this.rect.length; i++) {
    const dx = this.moveOutDelta[i][0] * t;
    const dy = this.moveOutDelta[i][1] * t;

    const angle = this.angleDelta[i] * this.currentDeltaMove;

    push();

    translate(center[0] + dx, center[1] + dy);
    rotate(angle);
    translate(-center[0], -center[1]);

    fill(this.fillColor[i]);
    drawRect(this.rect[i])

    pop();
  }

  // Draw circles
  const i = 2;

  const dx = this.moveOutDelta[i][0] * t;
  const dy = this.moveOutDelta[i][1] * t;

  const angle = this.angleDelta[i] * this.currentDeltaMove;

  push();

  translate(center[0] + dx, center[1] + dy);
  rotate(angle);
  translate(-center[0], -center[1]);

  fill(this.fillColor[i]);
  for (let c of this.circle) {
    drawCircle(c)
  }

  pop();
}
}
