import Nan from '../nan';
import GameObject from '../object/gameobject';
import Vector from '../utils/vector';
import NanEvent from './nanevent';

export default class EventMouse extends NanEvent {
  // TODO EventMouse使用了太多Nan的参数，耦合太高了

  private isDraging = false;

  private isMouseDown = false;

  constructor() {
    super();
    const { canvas } = this.nan.getContext();
    canvas.onmouseup = this.onClick;
    canvas.onmousedown = this.onMouseDown;
    canvas.onwheel = EventMouse.onWheel;
    canvas.oncontextmenu = (e) => {
      e.preventDefault();
    };
  }

  onClick(e: MouseEvent) {
    const nan = Nan.getInstance();
    this.isMouseDown = false;
    if (this.isDraging) {
      this.isDraging = false;
      return;
    }

    this.isDraging = false;
    const { scale } = nan;
    const canvasBound = nan.context.canvas.getBoundingClientRect();

    for (let i = 0; i < nan.objList.length; i += 1) {
      const obj: GameObject = nan.objList[i];
      const x = e.clientX - canvasBound.left;
      const y = e.clientY - canvasBound.top;
      const xOffset = x - obj.transform.position.x * scale
        - obj.colliderStartPos.x * scale + nan.originPosition.x;
      const yOffset = y - obj.transform.position.y * scale
        - obj.colliderStartPos.y * scale + nan.originPosition.y;
      if (
        yOffset >= 0
        && xOffset >= 0
        && xOffset <= obj.collider.x * scale
        && yOffset <= obj.collider.y * scale
      ) {
        nan.selectedObj = obj;
        if (obj.onClick) {
          obj.onClick();
        }
      }
    }
  }

  /**
   * 按下事件处理
   */
  // TODO client坐标在canvas坐标变更后可能失效
  onMouseDown(de: MouseEvent) {
    const nan = Nan.getInstance();
    const { canvas } = nan.getContext();
    let lastPos = new Vector(de.clientX, de.clientY);
    this.isMouseDown = true;
    // console.log(de.clientX, de.clientY);
    canvas.onmousemove = (e: MouseEvent) => {
      if (this.isMouseDown) {
        if (nan.canvasDraggable && (e.buttons === 2 || e.buttons === 1)) {
          let dragX = e.clientX - lastPos.x;
          let dragY = e.clientY - lastPos.y;
          if (Math.abs(dragX) < 5 && Math.abs(dragY) < 5) {
            this.isDraging = false;
            return;
          }

          this.isDraging = true;
          dragX /= nan.scale;
          dragY /= nan.scale;
          nan.translateOrigin(dragX, dragY);
          lastPos = new Vector(e.clientX, e.clientY);
        }
      }
    };
    canvas.onmouseout = () => {
      this.isMouseDown = false;
      if (this.isDraging) {
        this.isDraging = false;
      }
    };
  }

  /**
   * 监听滚轮事件
   * 缩放功能
   */
  static onWheel(e: WheelEvent) {
    const nan = Nan.getInstance();
    if (e.deltaY > 0) {
      nan.scaleOrigin(0.8);
    } else {
      nan.scaleOrigin(1.2);
    }
  }
}
