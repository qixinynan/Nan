import Transform from "utils/transform";
/**
 * NanObject是GameObject框架的基石。是GameObject每次Update返回给Nan的就是NanObject的列表
 */
export default class NanObject {
    transform: Transform;
    update: Function | undefined;
    lateUpdate: Function | undefined;
    state: Object | undefined;
    protected context: CanvasRenderingContext2D;
    init: Function | undefined;
    /**
     * 构造初始化
     * @param transform 变换信息
     */
    constructor(transform: Transform);
    /**
     * 如果Init方法已被赋值，则执行Init方法
     * 或者你也可以直接在此传入Init。doInit()会自动帮你对init进行赋值
     */
    doInit(init?: Function): void;
    /**
     * 内部帧更新函数
     */
    _update(): Promise<void>;
    _lateUpdate(): Promise<void>;
    render(): Promise<void>;
    showFrameLine(color?: string, lineWidth?: number): void;
}
