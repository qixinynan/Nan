import Transform from '../utils/transform';
import NanObject from './nanobject';
export default class NText extends NanObject {
    text: string;
    color: string;
    autoUpdateWidth: boolean;
    constructor(transform: Transform, text: string, color?: string);
    update(): void;
}
