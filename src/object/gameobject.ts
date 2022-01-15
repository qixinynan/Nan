
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
  public onClick: Function | undefined;

  constructor(name: string, transform: Transform = new Transform(Vector.zero,Vector.zero,Vector.zero)) {
    if (!name) {
      console.error("You must create GameObject with param name, Such as new GameObject('Name')");      
    }
    this.name = name;
    this.transform = transform;
    this.collider = transform.size;
    this.init();
  }
  init() {}

  /**
   * Update会在每帧调用一次
   * 
   * Update应当返回一个NanObject的列表
   * @returns NanObject[]
   */
  update(): NanObject[] | undefined {    
    return undefined;    
  }

  showColliderLine(color:string = "yellow", lineWidth: number = 1) {
    let context: CanvasRenderingContext2D = Nan.getInstance().getContext();
    let originPos: Vector = this.transform.position;
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
} 