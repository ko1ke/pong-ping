class Score {
  count: number;
  font: string;
  style: string;

  constructor(count = 0, font = '16px Arial', style = '#0095DD') {
    this.count = count;
    this.font = font;
    this.style = style;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.style;
    ctx.fillText('Score:' + this.count, 8, 20);
  }

  incrementCount() {
    this.count = this.count + 1;
  }
}

export default Score;
