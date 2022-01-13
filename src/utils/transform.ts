import Vector from "./vector";
/**
 * 变换信息
 * 变换信息类中保存的物体的位置和旋转角度等信息
 */
export default class Transform {
    position:Vector = Vector.zero; //位置
    rotation:Vector = Vector.zero; //角度 (未实现)
    scale:Vector = Vector.zero; //缩放
    constructor(position: Vector = Vector.zero, rotation: Vector = Vector.zero ,scale: Vector = Vector.zero) {
      this.position = position;
      this.rotation = rotation;
      this.scale = scale;
    }    
  }