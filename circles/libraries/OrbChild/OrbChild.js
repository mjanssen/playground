import Canvas from '../Canvas/Canvas';
import settings from './settings';

/**
 * OrbChild
 * @type {class}
 */
const orbChild = class OrbChild {

  constructor(coords, orbCoords, orbRadius, orbitDirection) {
    this.coords = coords;
    this.color = settings.positiveColor;
    this.ctx = Canvas.getContext();
    this.orbCoords = orbCoords;
    this.orbRadius = orbRadius;
    /* eslint-disable no-mixed-operators */
    /* eslint-disable max-len */
    this.stepSize = Math.floor(Math.random() * (settings.stepRange.max - settings.stepRange.min + 1) + settings.stepRange.min);

    this.calculateRanges(orbRadius, orbCoords);

    this.direction = 'increase';

    this.orbitDirection = orbitDirection;
  }

  /**
   * Draw function for the child
   */
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.coords.x,
      this.coords.y,
      settings.size,
      0, 2 * Math.PI,
    );
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  /**
   * Moving the child around the Orb
   */
  orbit() {
    const step = (this.direction === 'increase') ? this.stepSize : -this.stepSize;

    switch (this.orbitDirection) {
      case 'x':
        this.orbitX(step);
        break;
      case 'y':
        this.orbitY(step);
        break;
      case 'xy':
        this.orbitXY(step);
        break;
      case 'xxy':
        this.orbitXXY(step);
        break;
      case 'yx':
        this.orbitYX(step);
        break;
      default:
        break;
    }
  }

  /**
   * Orbit in X direction
   */
  orbitX(step) {
    if (this.coords.x <= this.range.x.min) {
      this.color = settings.positiveColor;
      this.direction = 'increase';
    } else if (this.coords.x >= this.range.x.max) {
      this.color = settings.negativeColor;
      this.direction = 'decrease';
    }

    this.coords.x = this.coords.x + step;
  }

  /**
   * Orbit in Y direction
   */
  orbitY(step) {
    if (this.coords.y <= this.range.y.min) {
      this.color = settings.positiveColor;
      this.direction = 'increase';
    } else if (this.coords.y >= this.range.y.max) {
      this.color = settings.negativeColor;
      this.direction = 'decrease';
    }

    this.coords.y = this.coords.y + step;
  }

  /**
   * Orbit in XY direction
   */
  orbitXY(step) {
    if (this.coords.y <= this.range.diagonal.min) {
      this.color = settings.positiveColor;
      this.direction = 'increase';
    } else if (this.coords.y >= this.range.diagonal.max) {
      this.color = settings.negativeColor;
      this.direction = 'decrease';
    }

    this.coords.y = this.coords.y + step;
    this.coords.x = this.coords.x + step;
  }

  /**
   * Orbit in XXY direction [not used]
   */
  orbitXXY(step) {
    if (this.coords.x <= this.range.diagonalThird.min) {
      this.color = settings.positiveColor;
      this.direction = 'increase';
    } else if (this.coords.x >= this.range.diagonalThird.max) {
      this.color = settings.negativeColor;
      this.direction = 'decrease';
    }

    this.coords.x = this.coords.x + step;
    this.coords.y = (this.coords.y + step * 0.33);
  }

  /**
   * Orbit in YX direction
   */
  orbitYX(step) {
    if (this.coords.y <= this.range.diagonal.min) {
      this.color = settings.positiveColor;
      this.direction = 'increase';
    } else if (this.coords.y >= this.range.diagonal.max) {
      this.color = settings.negativeColor;
      this.direction = 'decrease';
    }

    this.coords.y = this.coords.y + step;
    this.coords.x = this.coords.x - step;
  }

  /* eslint-disable no-bitwise */
  /**
   * Calculate the min/max range for the child
   */
  calculateRanges(orbRadius, orbCoords) {
    this.range = {
      x: {
        min: (orbCoords.x - orbRadius) - settings.orbMargin,
        max: (orbCoords.x + orbRadius) + settings.orbMargin,
      },
      y: {
        min: (orbCoords.y - orbRadius) - settings.orbMargin,
        max: (orbCoords.y + orbRadius) + settings.orbMargin,
      },
      diagonal: {
        min: (orbCoords.y - orbRadius) - (Math.sqrt(settings.orbMargin ^ 2 + settings.orbMargin ^ 2)),
        max: (orbCoords.y + orbRadius) + (Math.sqrt(settings.orbMargin ^ 2 + settings.orbMargin ^ 2)),
      },
      diagonalThird: {
        min: (orbCoords.x - orbRadius) - (Math.sqrt(settings.orbMargin ^ 2 + (settings.orbMargin / 1) ^ 2)),
        max: (orbCoords.x + orbRadius) + (Math.sqrt(settings.orbMargin ^ 2 + (settings.orbMargin / 1) ^ 2)),
      },
    };
  }

  /**
   * Update function for the child
   */
  update(orbRadius, orbCoords) {
    this.orbCoords = orbCoords;
    this.orbRadius = orbRadius;
    this.calculateRanges(orbRadius, orbCoords);
    this.orbit();
  }
};

export default orbChild;
