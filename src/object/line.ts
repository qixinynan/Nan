import NanObject from "./nanobject";
import Vector from "../utils/vector";
import Transform from "utils/transform";

export default class NLine extends NanObject {
  public path: Vector;
  
  /**
   * 
   * @param transform 变换信息
   * @param path 线段路径信息，必须要一个二维数组（Vector）的二维数组。path.x为起始点,path.y为结束点
   */
  constructor(transform: Transform, path: Vector){
    super(transform);
    if(path.x.x && path.x.y && path.y.x && path.y.y) {
      console.error("The variable path must be a Vector of Vector")
    }
    this.path = path;
  }

  _update(): void {
    super._update(); 
    this.context.moveTo(this.path.x.x,this.path.x.y);
    this.context.lineTo(this.path.y.x,this.path.y.y);
    this.context.stroke();
  }
}