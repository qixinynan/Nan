/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
import Nan from '../nan';
import Transform from '../utils/transform';
import Vector from '../utils/vector';
import NanObject from './nanobject';
/**
* NanObject是Nan框架的基石。任何能够在Canvas上看得见的东西都应当是GameObject的派生类
*/
export default class GameObject {
  public name: string;

  public transform: Transform; // 变换信息

  public collider: Vector<number>;

  public colliderStartPos: Vector<number> = new Vector(0, 0);

  public objects: NanObject[] = [];

  public onClick: (() => undefined | undefined) | undefined;

  public init: (() => void) | undefined;

  constructor(
    name: string,
    transform: Transform = new Transform(Vector.zero, Vector.zero, Vector.zero),
  ) {
    if (!name) {
      console.error("You must create GameObject with param name, Such as new GameObject('Name')");
    }
    this.name = name;
    this.transform = transform;
    this.collider = transform.size;
    if (this.init) {
      this.init();
    }
  }

  public beforeUpdate() {}

  public update(): NanObject[] | void {
    this.setCollider();
  }

  public updateNanObjects() {
    const updateResult = this.update();
    if (updateResult) {
      this.objects = updateResult;
    }
    for (let i = 0; i < this.objects.length; i += 1) {
      const nanObject = this.objects[i];
      nanObject.update();
    }
  }

  public updated() {
    for (let i = 0; i < this.objects.length; i += 1) {
      const nanObject = this.objects[i];
      nanObject.updated();
    }
  }

  public render() {
    this.beforeUpdate();
    this.updateNanObjects();
    this.updated();
  }

  public setCollider() {
    this.colliderStartPos = new Vector(
      (this.transform.size.x - this.collider.x) / 2,
      (this.transform.size.y - this.collider.y) / 2,
    );
  }

  public showColliderLine(color = 'yellow', lineWidth = 1) {
    const context: CanvasRenderingContext2D = Nan.getInstance().getContext();
    const originPos: Vector<number> = new Vector(
      this.transform.position.x + this.colliderStartPos.x,
      this.transform.position.y + this.colliderStartPos.y,
    );
    const size: Vector<number> = this.collider;
    context.lineWidth = lineWidth;

    context.moveTo(originPos.x, originPos.y);
    context.lineTo(originPos.x + size.x, originPos.y);
    context.lineTo(originPos.x + size.x, originPos.y + size.y);
    context.lineTo(originPos.x, originPos.y + size.y);
    context.lineTo(originPos.x, originPos.y);
    context.strokeStyle = color;
    context.stroke();
  }

  showFrameLine(color = 'blue', lineWidth = 1) {
    const context: CanvasRenderingContext2D = Nan.getInstance().getContext();
    const originPos: Vector<number> = new Vector(
      this.transform.position.x,
      this.transform.position.y,
    );
    const { size } = this.transform;
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
