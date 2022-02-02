import Transform from '../utils/transform';
import NanObject from './nanobject';
export default class Rect extends NanObject {
    lineColor: string;
    lineWidth: number;
    color: string;
    renderMethod: string;
    constructor(transform: Transform, renderMethod?: string, color?: string);
    update(): void;
}
