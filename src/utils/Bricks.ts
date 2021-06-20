import Brick from './Brick';

class Bricks {
  rowCount: number;
  columnCount: number;
  life: number;
  items: Brick[][];

  constructor(life: number, rowCount = 3, columnCount = 5) {
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.life = life;
    this.items = this.buildItems();
  }

  buildItems() {
    const arr = [] as Brick[][];
    for (let c = 0; c < this.columnCount; c++) {
      arr[c] = [];
      for (let r = 0; r < this.rowCount; r++) {
        arr[c][r] = new Brick(c, r, this.life);
      }
    }
    return arr;
  }

  drawItems(ctx: CanvasRenderingContext2D) {
    for (let c = 0; c < this.columnCount; c++) {
      for (let r = 0; r < this.rowCount; r++) {
        if (this.items[c][r].life > 0) {
          const brick = this.items[c][r];
          ctx.beginPath();
          ctx.rect(brick.x, brick.y, brick.width, brick.height);
          ctx.fillStyle = brick.style;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
}

export default Bricks;
