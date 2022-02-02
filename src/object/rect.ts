import Transform from '../utils/transform';
import NanObject from './nanobject';

export default class Rect extends NanObject {
  public lineColor = 'yellow';

  public lineWidth = 1;

  public color: string;

  public renderMethod: string;

  constructor(transform: Transform, renderMethod = 'fill', color = 'black') {
    super(transform);
    this.color = color;
    this.renderMethod = renderMethod;
  }

  update() {
    this.context.save();
    this.context.beginPath();
    super.update();

    this.context.rect(
      this.transform.position.x,
      this.transform.position.y,
      this.transform.size.x,
      this.transform.size.y,
    );

    switch (this.renderMethod) {
      case 'fill':
        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.lineColor;
        this.context.fill();
        this.context.stroke();
        break;
      case 'stroke':
        this.context.strokeStyle = this.color;
        this.context.stroke();
        break;
      default:
        console.error('Unknow render way: %s', this.renderMethod);
    }

    this.context.closePath();
    this.context.restore();
  }
}
