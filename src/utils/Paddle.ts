import { CANVAS_RECT } from '../constants';

class Paddle {
  height: number;
  width: number;
  x: number;
  movement: number;
  style: string;

  constructor(height = 10, width = 75, movement = 7, style = '#0095DD') {
    this.height = height;
    this.width = width;
    this.x = (CANVAS_RECT.width - this.width) / 2;
    this.movement = movement;
    this.style = style;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, CANVAS_RECT.height - this.height, this.width, this.height);
    ctx.fillStyle = this.style;
    ctx.fill();
    ctx.closePath();
  }

  moveRight() {
    this.x = this.x + this.movement;
  }

  moveLeft() {
    this.x = this.x - this.movement;
  }
}

export default Paddle;
