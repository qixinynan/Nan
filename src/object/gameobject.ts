
import { Utils } from "index";
import Nan from "nan";
import Transform from "utils/transform";
import Vector from "utils/vector";
import NanObject from "./nanobject";
/**
* NanObject是Nan框架的基石。任何能够在Canvas上看得见的东西都应当是GameObject的派生类
*/
export default class GameObject {
  public name: string;
  public transform: Transform; //变换信息
  public collider: Vector;
  public colliderStartPos: Vector = new Vector(0, 0);
  public onClick: Function | undefined;

  constructor(name: string, transform: Transform = new Transform(Vector.zero, Vector.zero, Vector.zero)) {
    if (!name) {
      console.error("You must create GameObject with param name, Such as new GameObject('Name')");
    }
    this.name = name;
    this.transform = transform;
    this.collider = transform.size;
    this.init();
  }
  init() { }

  /**
   * Update会在每帧调用一次
   *
   * Update应当返回一个NanObject的列表
   * @returns NanObject[]
   */
  update(): NanObject[] | undefined {
    this.colliderStartPos = new Vector(
      (this.transform.size.x - this.collider.x) / 2,
      (this.transform.size.y - this.collider.y) / 2,
    )
    return undefined;
  }

  lateUpdate() {
  }

  showColliderLine(color: string = "yellow", lineWidth: number = 1) {

    let context: CanvasRenderingContext2D = Nan.getInstance().getContext();
    let originPos: Vector = new Vector(this.transform.position.x + this.colliderStartPos.x, this.transform.position.y + this.colliderStartPos.y);
    let size: Vector = this.collider;
    context.lineWidth = lineWidth;

    context.moveTo(originPos.x, originPos.y);
    context.lineTo(originPos.x + size.x, originPos.y);
    context.lineTo(originPos.x + size.x, originPos.y + size.y);
    context.lineTo(originPos.x, originPos.y + size.y);
    context.lineTo(originPos.x, originPos.y);
    context.strokeStyle = color;
    context.stroke();
  }

  showFrameLine(color: string = "blue", lineWidth: number = 1) {

    let context: CanvasRenderingContext2D = Nan.getInstance().getContext();
    let originPos: Vector = new Vector(this.transform.position.x, this.transform.position.y);
    let size: Vector = this.transform.size;
    context.lineWidth = lineWidth;

    context.moveTo(originPos.x, originPos.y);
    context.lineTo(originPos.x + size.x, originPos.y);
    context.lineTo(originPos.x + size.x, originPos.y + size.y);
    context.lineTo(originPos.x, originPos.y + size.y);
    context.lineTo(originPos.x, originPos.y);
    context.strokeStyle = color;
    context.stroke();
  }
}