class AnimationGroup {
  constructor() {
    this.touchStrength = 0;
  }

  setTouchStrength(strength) {    
    this.touchStrength = strength;
  }

  draw() {
    push();
    this.animate();
    pop();

  }

  animate() {
    throw new Error("Animation groups must implement animate().");
  }
}
