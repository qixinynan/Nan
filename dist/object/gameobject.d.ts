import Transform from '../utils/transform';
import Vector from '../utils/vector';
import NanObject from './nanobject';
/**
* NanObject是Nan框架的基石。任何能够在Canvas上看得见的东西都应当是GameObject的派生类
*/
export default class GameObject {
    name: string;
    transform: Transform;
    collider: Vector<number>;
    colliderStartPos: Vector<number>;
    objects: NanObject[];
    onClick: (() => undefined | undefined) | undefined;
    init: (() => void) | undefined;
    constructor(name: string, transform?: Transform);
    beforeUpdate(): void;
    update(): NanObject[] | void;
    updateNanObjects(): void;
    updated(): void;
    render(): void;
    setCollider(): void;
    showColliderLine(color?: string, lineWidth?: number): void;
    showFrameLine(color?: string, lineWidth?: number): void;
}
