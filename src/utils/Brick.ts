class Brick {
  columnNum: number;
  rowNum: number;
  width: number;
  height: number;
  padding: number;
  offsetTop: number;
  offsetLeft: number;
  status: number;
  style: string;
  x: number;
  y: number;
  
  constructor(
    columnNum: number,
    rowNum: number,
    width = 75,
    height = 20,
    padding = 10,
    offsetTop = 30,
    offsetLeft = 30,
    status = 1,
    style = '#0095DD'
  ) {
    this.columnNum = columnNum;
    this.rowNum = rowNum;
    this.height = height;
    this.width = width;
    this.padding = padding;
    this.offsetTop = offsetTop;
    this.offsetLeft = offsetLeft;
    this.status = status;
    this.style = style;
    this.x = this.columnNum * (this.width + this.padding) + this.offsetLeft;
    this.y = this.rowNum * (this.height + this.padding) + this.offsetTop;
  }

  decrementStatus() {
    this.status = this.status - 1;
  }
}

export default Brick;
