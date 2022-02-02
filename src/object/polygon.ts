import Transform from '../utils/transform';
import NanObject from './nanobject';

export default class Polygon extends NanObject {
  public angles: number;

  public renderMethod: string;

  public color: string;

  // 启始角度 （弧度制）
  public startAngles = 0;

  // 描边颜色
  public lineColor: string;

  // 描边像素
  public lineWidth = 1;

  public offsetX: number;

  public offsetY: number;

  /**
   * 多边形
   * @param transform 变换信息
   * @param angles 边数
   * @param renderMethod 绘制方法 fill为实心 stroke为描边
   * @param color 颜色
   */
  constructor(transform: Transform, angles: number, renderMethod = 'fill', color = '#000000') {
    super(transform);
    this.angles = angles;
    this.renderMethod = renderMethod;
    this.color = color;
    this.lineColor = color;
    this.offsetX = this.transform.size.x / 2;
    this.offsetY = this.transform.size.x / 2;
  }

  update() {
    this.context.save();
    this.context.beginPath();
    super.update();

    this.context.lineWidth = this.lineWidth;
    const ang: number = (2 * Math.PI) / this.angles;

    for (let i = 0; i < this.angles; i += 1) {
      const x:number = (Math.cos(ang * i + this.startAngles)
      * this.transform.size.x) / 2
      + this.transform.position.x + this.offsetX;
      const y:number = (Math.sin(ang * i + this.startAngles)
      * this.transform.size.y) / 2
      + this.transform.position.y + this.offsetY;
      this.context.lineTo(x, y);
    }

    this.context.closePath();
    switch (this.renderMethod) {
      case 'fill':
        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.lineColor;
        this.context.fill();
        this.context.stroke();
        break;
      case 'stroke':
        this.context.fillStyle = this.color;
        this.context.stroke();
        break;
      default:
        console.error('Unknow render way: %s', this.renderMethod);
    }

    this.context.closePath();
    this.context.restore();
  }
}
