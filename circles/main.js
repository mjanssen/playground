import Canvas from './libraries/Canvas/Canvas';
import Orb from './libraries/Orb/Orb';
import Coords from './objects/Coords';
import OrbSettings from './libraries/Orb/settings';

require('./scss/main.scss');

const orbs = [];
const wrapper = document.querySelector('#root');
const circleCount = 1;

/**
 * Create the canvas
 */
Canvas.createCanvas(wrapper);

/**
 * Place the big orb(s)
 * @type {Orb}
 */
const defaultX = (document.body.clientWidth * window.devicePixelRatio) / 2;
const defaultY = (document.body.clientHeight * window.devicePixelRatio) / 2;
for (let i = circleCount - 1; i >= 0; i -= 1) {
  orbs.push(
    new Orb(
      Canvas.getContext(),
      new Coords(defaultX + (i * OrbSettings.margin), defaultY),
    ),
  );
}

const arrayLength = orbs.length;

/**
 * Animation frame
 * @method animate
 */
const animate = () => {
  Canvas.getContext().clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);

  for (let i = arrayLength - 1; i >= 0; i -= 1) {
    const orb = orbs[i];
    orb.update();
    orb.draw();
  }

  window.requestAnimationFrame(animate);
};

animate();
