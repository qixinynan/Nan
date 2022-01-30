import Transform from "utils/transform";
import Vector from "utils/vector";
import NanObject from "./nanobject";
/**
* NanObject是Nan框架的基石。任何能够在Canvas上看得见的东西都应当是GameObject的派生类
*/
export default class GameObject {
    name: string;
    transform: Transform;
    collider: Vector;
    colliderStartPos: Vector;
    onClick: Function | undefined;
    update: (() => NanObject[]) | undefined;
    constructor(name: string, transform?: Transform);
    init(): void;
    /**
     * Update会在每帧调用一次
     *
     */
    _update(): Promise<void>;
    render(): Promise<void>;
    lateUpdate(): Promise<void>;
    showColliderLine(color?: string, lineWidth?: number): void;
    showFrameLine(color?: string, lineWidth?: number): void;
}
