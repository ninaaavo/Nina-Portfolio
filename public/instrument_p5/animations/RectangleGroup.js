class RectangleGroup extends AnimationGroup {
  constructor() {
    super();
    this.currentDeltaMove = 0;

    this.rect = [
      [
        [864, 54],
        [918, -63],
        [1107, -99],
        [1188, -72],
        [1188, -72],
        [1143, -279],
        [1143, -279],
        [720, -90],
        [720, -90],
        [720, -90],
      ],
      [
        [981, 171],
        [1017, 99],
        [1098, 63],
        [1192, 90],
        [1192, 90],
        [1188, -9],
        [1188, -9],
        [1125, -54],
        [945, -36],
        [900, 81],
      ],
      [
        [1089, 279],
        [1116, 234],
        [1161, 216],
        [1208, 234],
        [1208, 234],
        [1197, 126],
        [1197, 126],
        [1134, 99],
        [1053, 117],
        [1008, 198],
      ],
    ];
    this.maxPointsDelta = [
      [
        [648, 72],
        [0, 0],
      ],
      [
        [266, 36],
        [513, 27],
      ],
      [
        [0, 0],
        [216, 27],
      ],
    ];
    this.innerCornersDelta = [
      [0, 27],
      [36, 27],
    ];
    this.fillColor = [35, 80, 150]
  }

  animate() {
    const smoothing = motionSmoothing();
    const strength = constrain(this.touchStrength, 0, 1);

    // raise delta move to strength gradually
    this.currentDeltaMove = lerp(this.currentDeltaMove, strength, smoothing);

    noStroke();

    for (let i = 0; i < this.rect.length; i++) {
      const curRect = this.rect[i];
      const curPoints = structuredClone(curRect);

      // Touch strength controls the 2nd (ind = 2, 3, 4) and 3rd (ind = 5, 6, 7) anchors.

      for (let j = 0; j < 2; j++) {
        const index = j === 0 ? 2 : 5;

        for (let k = 0; k < 3; k++) {
          for (let l = 0; l < 2; l++) {
            curPoints[index + k][l] =
              curRect[index + k][l] +
              this.maxPointsDelta[i][j][l] * this.currentDeltaMove;
          }
        }
      }

      // Inner corners keep  continuous back-and-forth motion.
      // One back-and-forth cycle every 3 seconds.
      const t = -cos((millis() / 3000) * 2 * PI); //go from 1 - 0 - (-1)
      
      for (let j = 0; j < 2; j++) {
        const ind1 = j == 0 ? 1 : 2;
        const ind2 = j == 0 ? 7 : 8;
        for (let k = 0; k < 2; k++) {
          curPoints[ind1][k] += this.innerCornersDelta[j][k] * t;
          curPoints[ind2][k] += this.innerCornersDelta[j][k] * t;
        }
      }
      fill(this.fillColor[i])
      drawBezierPoints(curPoints);
    }
  }
}
