import NanObject from './nanobject';
import Vector from '../utils/vector';
import Transform from '../utils/transform';

export default class NLine extends NanObject {
  public path: Vector<Vector<number>>;

  public color: string;
  public width: number = 1;

  /**
   *
   * @param transform 变换信息
   * @param path 线段路径信息，必须要一个二维数组（Vector）的二维数组。path.x为起始点,path.y为结束点
   */
  constructor(transform: Transform, path: Vector<Vector<number>>, color = 'black') {
    super(transform);
    this.transform.size.x = Math.abs(path.x.x - path.y.x);
    this.transform.size.y = Math.abs(path.x.y - path.y.y);
    this.path = path;
    this.color = color;
  }

  update() {
    this.context.save();
    this.context.beginPath();
    super.update();

    const pos: Vector<number> = this.transform.position;
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.width;
    this.context.moveTo(this.path.x.x + pos.x, this.path.x.y + pos.y);
    this.context.lineTo(this.path.y.x + pos.x, this.path.y.y + pos.y);
    this.context.stroke();

    this.context.closePath();
    this.context.restore();
  }
}
