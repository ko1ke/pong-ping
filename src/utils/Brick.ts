class Brick {
  columnNum: number;
  rowNum: number;
  life: number;
  width: number;
  height: number;
  padding: number;
  offsetTop: number;
  offsetLeft: number;
  style: string;
  x: number;
  y: number;

  constructor(
    columnNum: number,
    rowNum: number,
    life: number,
    width = 75,
    height = 20,
    padding = 10,
    offsetTop = 30,
    offsetLeft = 30
  ) {
    this.columnNum = columnNum;
    this.rowNum = rowNum;
    this.life = life;
    this.height = height;
    this.width = width;
    this.padding = padding;
    this.offsetTop = offsetTop;
    this.offsetLeft = offsetLeft;
    this.style = this.styleForLife();
    this.x = this.columnNum * (this.width + this.padding) + this.offsetLeft;
    this.y = this.rowNum * (this.height + this.padding) + this.offsetTop;
  }

  decrementLife() {
    this.life = this.life - 1;
    this.style = this.styleForLife();
  }

  styleForLife() {
    switch (this.life) {
      case 3:
        return '#008000';
      case 2:
        return '#ffd700';
      case 1:
        return '#0095DD';
      default:
        return '#0095DD';
    }
  }
}

export default Brick;
