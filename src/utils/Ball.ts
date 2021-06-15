import { CANVAS_RECT } from '../constants';
import { randRange, randPick } from '../functions';

class Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  style: string;

  constructor(
    dx = randPick<number>([2, -2]),
    dy = 2,
    yOffset = 120,
    radius = 10,
    style = '#0095DD'
  ) {
    this.x = randRange(0, CANVAS_RECT.width);
    this.y = CANVAS_RECT.height - yOffset;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.style = style;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.style;
    ctx.fill();
    ctx.closePath();
  }

  invertDx() {
    this.dx = -this.dx;
  }

  invertDy() {
    this.dy = -this.dy;
  }

  moveX() {
    this.x += this.dx;
  }

  moveY() {
    this.y += this.dy;
  }
}

export default Ball;
