import NanObject from "./nanobject";
import Transform from "../utils/transform";
/**
 * Sprite类
 * 渲染图片的对象都属于Sprite类，Sprite类属于Nan对象
 */
export default class Sprite extends NanObject {
    image: CanvasImageSource;
    /**
     * 构造函数
     * @param name 对象名称
     * @param transform 变换信息
     * @param image 图像
     */
    constructor(transform: Transform, image: CanvasImageSource, autoSize?: boolean);
    /**
     * 内部帧更新函数
     */
    _update(): Promise<void>;
    /**
     * 设置图像
     * @param image 图像
     */
    setImage(image: CanvasImageSource): void;
}
