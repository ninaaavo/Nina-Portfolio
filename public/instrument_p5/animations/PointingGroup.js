class PointingGroup extends AnimationGroup {
  constructor() {
    super();
    this.currentDeltaMove = 0;

    this.rect = [
      [
        [1188, 729],
        [1197, 774],
        [1152, 882],
        [1152, 774],
      ],
      [
        [1341, 702],
        [1449, 747],
        [1539, 972],
        [1350, 819],
      ],
      [
        [1539, 504],
        [1602, 477],
        [1755, 531],
        [1602, 549],
      ],
    ];

   
    this.moveOutDelta = [
      [-72, 414],
      [450, 657],
      [477, 81],
    ];
  }

  animate() {
    fill(200)
    strokeWeight(0)
    push()

    translate(...center);
    const t = cos((millis() / 3000) * 2 * PI); //go from 1 - 0 - (-1)
    scale(1 + t * 0.05);
    translate(-center[0], -center[1]);
    
    const smoothing = motionSmoothing();
    const strength = constrain(this.touchStrength, 0, 1);

    this.currentDeltaMove = lerp(this.currentDeltaMove, strength, smoothing);
    
    for(let i = 0; i < this.rect.length; i++){
      const curRect = this.rect[i]
      let curPoints = structuredClone(curRect)
      const dx = this.currentDeltaMove * this.moveOutDelta[i][0]
      const dy = this.currentDeltaMove * this.moveOutDelta[i][1]
      curPoints[2][0] += dx
      curPoints[2][1] += dy
      drawRect(curPoints)
    }
    pop()
    
  }
}
