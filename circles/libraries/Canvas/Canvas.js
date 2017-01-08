import settings from './settings';

require('../../scss/canvas.scss');

/**
 * Canvas
 * Used for making the canvas retina
 * @type {class}
 */
class Canvas {
  createCanvas(wrapper) {
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.id = settings.id;
    this.canvas.width = width * window.devicePixelRatio;
    this.canvas.height = height * window.devicePixelRatio;

    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    wrapper.appendChild(this.canvas);
  }

  getContext() {
    return this.ctx;
  }
}

const canvas = new Canvas();

export default canvas;
