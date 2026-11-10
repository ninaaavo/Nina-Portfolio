class CircleGroup extends AnimationGroup {
  constructor() {
    super();

    this.images = [];
    this.positions = [
      [0, 0],
      [-86, 87],
      [180, -54],
      [90, 153],
      [143, -213],
      [-44, -122],
      [0, 0]
    ];

    this.maxScale = 0.6;

    // Normalized input: 0 = no touch, 1 = hardest touch.
    this.currentSpread = 1;
    this.maxSpread = 2.5;
  }

  async loadAssets() {
    const results = await Promise.allSettled(
      this.positions.map(
        (_, i) =>
          new Promise((resolve, reject) => {
            loadImage(`assets/img_circles/${i + 1}.webp`, resolve, reject);
          })
      )
    );

    this.images = results.map((result, i) => {
      if (result.status === "fulfilled") {
        return result.value;
      }

      console.error(`Failed image ${i + 1}`, result.reason);
      return null;
    });
  }



  animate() {
    const strength = constrain(this.touchStrength, 0, 1);
    const targetSpread = lerp(1, this.maxSpread, strength);
    const targetScale = lerp(1, this.maxScale, strength);

    const smoothing = motionSmoothing()
    this.currentSpread = lerp(this.currentSpread, targetSpread, smoothing);

    // Start at the original size if currentScale isn't initialized.
    this.currentScale = lerp(this.currentScale ?? 1, targetScale, smoothing);

    push();

    // Continuous floating and rotation.
    const t = cos((millis() / 3000) * 2 * PI); //go from 1 - 0 - (-1)
    translate(center[0], center[1] - t * 20);
    rotate(frameCount * 0.005);

    for(let i = 0; i < this.images.length; i++){
      const img = this.images[i]
      if (!img) return
       const [x, y] = this.positions[i];

      push();
      
      if (i == this.images.length - 1){
        //dont rotate the sparkle, so rotate it backward
        rotate(-frameCount * 0.005)
      } 
      
      translate(x * this.currentSpread, y * this.currentSpread);
      scale(this.currentScale);
      image(img, 0, 0);
      pop();
    }
   

    pop();


    
  }
}
