import NanObject from "./nanobject";
import Transform from "utils/transform";
export default class NText extends NanObject {
    text: string;
    color: string;
    autoUpdateWidth: boolean;
    constructor(transform: Transform, text: string, color?: string);
    _update(): Promise<void>;
}
