import settings from './settings';
import OrbChild from '../OrbChild/OrbChild';
import Coords from '../../objects/Coords';

/**
 * Orb
 * @type {class}
 */
const Orb = class Orb {

  constructor(ctx, coords) {
    this.ctx = ctx;
    this.coords = coords;
    /* eslint-disable no-mixed-operators */
    /* eslint-disable max-len */
    this.size = Math.floor(Math.random() * (settings.size.max - settings.size.min + 1) + settings.size.min);

    this.children = {};
    this.children.positive = [];
    this.children.negative = [];

    /**
     * Create the children for the orb
     * @type {OrbChild}
     */
    const childX = new OrbChild(
      new Coords(
        this.coords.x,
        this.coords.y,
      ),
      this.coords,
      this.size,
      'x',
    );

    this.children.positive.push(childX);
    this.children.negative.push(childX);

    const childY = new OrbChild(
      new Coords(
        this.coords.x,
        this.coords.y - (this.size),
      ),
      this.coords,
      this.size,
      'y',
    );

    this.children.positive.push(childY);
    this.children.negative.push(childY);

    const xypos = Math.floor(Math.random() * this.size) + 0;

    const childXY = new OrbChild(
      new Coords(
        this.coords.x - (xypos),
        this.coords.y - (xypos),
      ),
      this.coords,
      this.size,
      'xy',
    );

    this.children.positive.push(childXY);
    this.children.negative.push(childXY);

    const yxpos = Math.floor(Math.random() * this.size) + 0;

    const childYX = new OrbChild(
      new Coords(
        this.coords.x + (yxpos),
        this.coords.y - (yxpos),
      ),
      this.coords,
      this.size,
      'yx',
    );

    this.children.positive.push(childYX);
    this.children.negative.push(childYX);
  }

  /**
   * Draw function for the Orb
   */
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.coords.x, this.coords.y, this.size, 0, 2 * Math.PI);
    this.ctx.fillStyle = settings.color;
    this.ctx.fill();
    this.ctx.stroke();

    this.animatePositiveChildren();
  }

  /**
   * Make the orb breathe
   */
  breathe() {
    if (this.size <= settings.size.min) {
      this.direction = 'increase';
    } else if (this.size >= settings.size.max) {
      this.direction = 'decrease';
    }

    const sizeCalc = (this.direction === 'increase') ? settings.size.step : -settings.size.step;

    this.size = this.size + sizeCalc;
  }

  /**
   * Animate the children above in front of the Orb
   */
  animatePositiveChildren() {
    if (this.children.positive.length <= 0) {
      return;
    }

    const length = this.children.positive.length;

    for (let i = length - 1; i >= 0; i -= 1) {
      const child = this.children.positive[i];

      if (child.direction === 'increase') {
        child.update(this.size, this.coords);
        child.draw();
      }
    }
  }

  /**
   * Animate the children behind the Orb
   */
  animateNegativeChildren() {
    if (this.children.negative.length <= 0) {
      return;
    }

    const length = this.children.negative.length;

    for (let i = length - 1; i >= 0; i -= 1) {
      const child = this.children.negative[i];

      if (child.direction === 'decrease') {
        child.update(this.size, this.coords);
        child.draw();
      }
    }
  }

  /**
   * Update function for the Orb
   */
  update() {
    this.breathe();

    this.animateNegativeChildren();
  }
};

export default Orb;
