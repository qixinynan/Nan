import Transform from '../utils/transform';
/**
 * NanObject是GameObject框架的基石。是GameObject每次Update返回给Nan的就是NanObject的列表
 */
export default class NanObject {
    transform: Transform;
    state: Record<string, unknown> | undefined;
    protected context: CanvasRenderingContext2D;
    /**
     * 构造初始化
     * @param transform 变换信息
     */
    constructor(transform: Transform);
    beforeUpdate(): void;
    update(): void;
    updated(): void;
    render(): void;
    showFrameLine(color?: string, lineWidth?: number): void;
}
