import Transform from '../utils/transform';
import NanObject from './nanobject';
export default class Polygon extends NanObject {
    angles: number;
    renderMethod: string;
    color: string;
    startAngles: number;
    lineColor: string;
    lineWidth: number;
    offsetX: number;
    offsetY: number;
    /**
     * 多边形
     * @param transform 变换信息
     * @param angles 边数
     * @param renderMethod 绘制方法 fill为实心 stroke为描边
     * @param color 颜色
     */
    constructor(transform: Transform, angles: number, renderMethod?: string, color?: string);
    update(): void;
}
