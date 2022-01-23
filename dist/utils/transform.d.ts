import Vector from "./vector";
/**
 * 变换信息
 * 变换信息类中保存的物体的位置和旋转角度等信息
 */
export default class Transform {
    position: Vector;
    rotation: Vector;
    size: Vector;
    constructor(position?: Vector, rotation?: Vector, size?: Vector);
}
