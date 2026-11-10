class LinesGroup extends AnimationGroup {
  constructor() {
    super();
    this.currentDeltaMove = 0;

    this.lines = [
      [
        [-99, 630],
        [-160, 466],
        [823, 439],
        [1123, 475],
        [1154, 479],
        [1156, 479],
        [1141, 489],
        [577, 461],
        [-37, 684],
        [-99, 755],
      ],
      [
        [-207, 837],
        [-160, 799],
        [492, 495],
        [1143, 495],
        [1162, 495],
        [1161, 495],
        [1179, 504],
        [747, 531],
        [-55, 892],
        [-162, 1089],
      ],
      [
        [-108, 1143],
        [-14, 917],
        [759, 570],
        [1188, 513],
        [1206, 522],
        [1206, 522],
        [1206, 522],
        [459, 723],
        [245, 1188],
        [214, 1244],
      ],
      [
        [270, 1296],
        [342, 1044],
        [877, 588],
        [1242, 522],
        [1280, 525],
        [1302, 516],
        [1260, 531],
        [721, 713],
        [654, 1255],
        [702, 1341],
      ],
      [
        [738, 1278],
        [782, 1038],
        [860, 674],
        [1269, 531],
        [1278, 531],
        [1296, 531],
        [1296, 531],
        [799, 752],
        [991, 1232],
        [990, 1278],
      ],
    ];
    this.maxPointsDelta = [
      [
        [-1, -161], // points 0, 1
        [-14, -127], // points 8, 9
      ],
      [
        [7, -128],
        [-38, -79],
      ],
      [
        [-59, -63],
        [79, 73],
      ],
      [
        [81, 21],
        [124, 45],
      ],
      [
        [147, 22],
        [777, 10],
      ],
    ];
    this.innerCorners = [
      [
        [666, 396],
        [459, 441],
      ],
      [
        [360, 477],
        [639, 522],
      ],
      [
        [666, 558],
        [369, 729],
      ],
      [
        [819, 594],
        [657, 720],
      ],
      [
        [828, 675],
        [756, 756],
      ],
    ];
  }

  animate() {
    const smoothing = motionSmoothing();
    const strength = this.touchStrength;

    // Keep this value between frames so smoothing accumulates.
    this.currentDeltaMove = lerp(this.currentDeltaMove, strength, smoothing);

    const endPoint = [1206, 454];

    // One back-and-forth cycle every 3 seconds.
    const t = cos((millis() / 3000) * 2 * PI); //go from 1 - 0 - (-1)
    // console.log(t)
    const curEndPoint = [lerp(endPoint[0], 648, t), lerp(endPoint[1], 715, t)];

    fillGradient("linear", {
      from: [0, 1080],
      to: curEndPoint,
      steps: [color(30), color(200)],
    });

    noStroke();

    for (let i = 0; i < this.lines.length; i++) {
      const curLine = this.lines[i];
      const curPoints = structuredClone(curLine);
      const lastIndex = curLine.length - 1;

      // Touch strength controls the first and last anchors.
      // Move each anchor and its handle by the same delta:
      // first pair: 0, 1; last pair: 8, 9.
      const pointPairs = [
        [0, 1],
        [8, 9],
      ];

      for (let j = 0; j < pointPairs.length; j++) {
        const deltaX = this.maxPointsDelta[i][j][0] * this.currentDeltaMove;

        const deltaY = this.maxPointsDelta[i][j][1] * this.currentDeltaMove;

        for (const index of pointPairs[j]) {
          curPoints[index] = [
            curLine[index][0] + deltaX,
            curLine[index][1] + deltaY,
          ];
        }
      }

      // Inner corners keep their continuous back-and-forth motion.
      const innerCorner = this.innerCorners[i];

      curPoints[2] = [
        lerp(curLine[2][0], innerCorner[0][0], t),
        lerp(curLine[2][1], innerCorner[0][1], t),
      ];

      curPoints[7] = [
        lerp(curLine[7][0], innerCorner[1][0], t),
        lerp(curLine[7][1], innerCorner[1][1], t),
      ];

      drawBezierPoints(curPoints);
    }
  }
}
