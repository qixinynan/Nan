import Vector from "./vector";
/**
 * 变换信息
 * 变换信息类中保存的物体的位置和旋转角度等信息
 */
export default class Transform {
    public position: Vector; //位置
    public rotation: Vector; //角度 (未实现)
    public size: Vector; //缩放
         
    constructor(position?: Vector, rotation?: Vector, size?: Vector) {
      this.position = position ? position : Vector.zero;
      this.rotation = rotation ? rotation : Vector.zero;
      this.size = size ? size : Vector.one;
    }
  }