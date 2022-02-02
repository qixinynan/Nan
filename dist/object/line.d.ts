import NanObject from "./nanobject";
import Vector from "../utils/vector";
import Transform from "../utils/transform";
export default class NLine extends NanObject {
    path: Vector<Vector<number>>;
    color: string;
    width: number;
    /**
     *
     * @param transform 变换信息
     * @param path 线段路径信息，必须要一个二维数组（Vector）的二维数组。path.x为起始点,path.y为结束点
     */
    constructor(transform: Transform, path: Vector<Vector<number>>, color?: string);
    _update(): Promise<void>;
}
