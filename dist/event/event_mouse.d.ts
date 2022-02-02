import NanEvent from './nanevent';
export default class EventMouse extends NanEvent {
    private isDraging;
    private isMouseDown;
    constructor();
    onClick(e: MouseEvent): void;
    /**
     * 按下事件处理
     */
    onMouseDown(de: MouseEvent): void;
    /**
     * 监听滚轮事件
     * 缩放功能
     */
    static onWheel(e: WheelEvent): void;
}
