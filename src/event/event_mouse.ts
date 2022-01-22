import Nan from "../nan";
import GameObject from "../object/gameobject";
import Vector from "../utils/vector";
import NanEvent from "./nanevent";

export default class EventMouse extends NanEvent {
  //TODO EventMouse使用了太多Nan的参数，耦合太高了


  private isDraging = false;
  private isMouseDown = false;

  constructor() {
    super();
    let canvas: HTMLCanvasElement = this.nan.getContext().canvas;
    canvas.onmouseup = this.onClick;
    canvas.onmousedown = this.onMouseDown;
    canvas.onwheel = this.onWheel;
    canvas.oncontextmenu = function(e) {
      e.preventDefault();
    }
  }

  onClick(e: MouseEvent) {
    let nan = Nan.getInstance();
    this.isMouseDown = false;
    if(this.isDraging) {
      this.isDraging = false;
      return;
    }
    for (let i = 0; i < nan.objList.length ; i++) {
      const obj: GameObject = nan.objList[i];
      var canvasBound = nan.context.canvas.getBoundingClientRect()
      let x = e.clientX - canvasBound.left;
      let y = e.clientY - canvasBound.top;
      let xOffset = x - obj.transform.position.x - obj.colliderStartPos.x + nan.originPosition.x;
      let yOffset = y - obj.transform.position.y - obj.colliderStartPos.y + nan.originPosition.y;
      if (0 <= xOffset && xOffset <= obj.collider.x && 0 <= yOffset && yOffset <= obj.collider.y) {
        if (obj.onClick) {
          obj.onClick();
        }
      }
    }
  }

  /**
   * 按下事件处理
   */
   //TODO client坐标在canvas坐标变更后可能失效
  onMouseDown(de: MouseEvent) {
    let nan = Nan.getInstance();
    let canvas = nan.getContext().canvas;
    let lastPos = new Vector(de.clientX, de.clientY);
    this.isMouseDown = true;
    // console.log(de.clientX, de.clientY);
    canvas.onmousemove = (e: MouseEvent) => {
      if (this.isMouseDown) {
        if (nan.canvasDraggable && (e.buttons == 2 || e.buttons == 1)) {
          this.isDraging = true;
          var canvasBound = nan.context.canvas.getBoundingClientRect()
          let x = e.clientX - canvasBound.left;
          let y = e.clientY - canvasBound.top;
          let dragX = e.clientX - lastPos.x;
          let dragY = e.clientY - lastPos.y;
          dragX/=nan.scale;
          dragY/=nan.scale;
          nan.translateOrigin(dragX, dragY);
          lastPos = new Vector(e.clientX, e.clientY);
        }
      }
    }
    canvas.onmouseout = () => {
      this.isMouseDown = false;
      if(this.isDraging) {
        this.isDraging = false;
      }
    }
  }

  /**
   * 监听滚轮事件
   * 缩放功能
   */
  onWheel(e: WheelEvent) {
    let nan = Nan.getInstance();
    if (e.deltaY > 0) {
      nan.scaleOrigin(0.8);
    }
    else {
      nan.scaleOrigin(1.2);
    }
  }
}