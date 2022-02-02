/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
import Vector from '../utils/vector';
import Transform from '../utils/transform';
import Nan from '../nan';
/**
 * NanObject是GameObject框架的基石。是GameObject每次Update返回给Nan的就是NanObject的列表
 */
export default class NanObject {
  public transform: Transform; // 变换信息

  public state: Record<string, unknown> | undefined; // 状态，保存当前NanObject的变量等

  protected context: CanvasRenderingContext2D; // 一般为Nan单例中的ctx

  /**
   * 构造初始化
   * @param transform 变换信息
   */
  constructor(transform: Transform) {
    this.transform = transform;
    this.context = Nan.getInstance().getContext();
  }

  public beforeUpdate() {}

  public update() {}

  public updated() {}

  public render() {
    this.beforeUpdate();
    this.update();
    this.updated();
  }

  showFrameLine(color = 'red', lineWidth = 1) {
    const originPos: Vector<number> = this.transform.position;
    const { size } = this.transform;

    this.context.lineWidth = lineWidth;

    this.context.moveTo(originPos.x, originPos.y);
    this.context.lineTo(originPos.x + size.x, originPos.y);
    this.context.lineTo(originPos.x + size.x, originPos.y + size.y);
    this.context.lineTo(originPos.x, originPos.y + size.y);
    this.context.lineTo(originPos.x, originPos.y);

    this.context.strokeStyle = color;
    this.context.stroke();
  }
}
