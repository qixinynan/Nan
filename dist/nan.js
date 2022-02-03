/**
 * 二维数组
 */
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
Vector.zero = new Vector(0, 0);
Vector.one = new Vector(1, 1);

class NanEvent {
    constructor() {
        this.nan = Nan.getInstance();
    }
}

class EventMouse extends NanEvent {
    constructor() {
        super();
        // TODO EventMouse使用了太多Nan的参数，耦合太高了
        this.isDraging = false;
        this.isMouseDown = false;
        const { canvas } = this.nan.getContext();
        canvas.onmouseup = this.onClick;
        canvas.onmousedown = this.onMouseDown;
        canvas.onwheel = EventMouse.onWheel;
        canvas.oncontextmenu = (e) => {
            e.preventDefault();
        };
    }
    onClick(e) {
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
            const obj = nan.objList[i];
            const x = e.clientX - canvasBound.left;
            const y = e.clientY - canvasBound.top;
            const xOffset = x - obj.transform.position.x * scale
                - obj.colliderStartPos.x * scale + nan.originPosition.x;
            const yOffset = y - obj.transform.position.y * scale
                - obj.colliderStartPos.y * scale + nan.originPosition.y;
            if (yOffset >= 0
                && xOffset >= 0
                && xOffset <= obj.collider.x * scale
                && yOffset <= obj.collider.y * scale) {
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
    onMouseDown(de) {
        const nan = Nan.getInstance();
        const { canvas } = nan.getContext();
        let lastPos = new Vector(de.clientX, de.clientY);
        this.isMouseDown = true;
        // console.log(de.clientX, de.clientY);
        canvas.onmousemove = (e) => {
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
    static onWheel(e) {
        const nan = Nan.getInstance();
        if (e.deltaY > 0) {
            nan.scaleOrigin(0.8);
        }
        else {
            nan.scaleOrigin(1.2);
        }
    }
}

class EventManager {
    init() {
        this.eventMouse = new EventMouse();
    }
}

class Nan {
    /**
     *  构造函数初始化
     * @param canvas Canvas对象
     * @param fps 刷新帧率
     */
    constructor(canvas) {
        this.fps = 30; // 帧率
        this.eventManager = new EventManager();
        this.lastUpdateTime = 0;
        this.originPosition = new Vector(0, 0);
        this.originScale = new Vector(1, 1);
        this.objList = []; // 已加载的物体列表
        this.canvasDraggable = true; // 画布可否可拖拽
        this.canvasScalable = true; // 画布是否可缩放
        this.autoUpdate = false;
        this.scale = 1;
        if (Nan.instance) {
            console.error('Nan is already created, You can use getInstance() to get it');
        }
        else {
            Nan.instance = this;
        }
        if (!canvas) {
            console.error("Canvas can't be null");
        }
        this.context = canvas.getContext('2d');
        this.init();
    }
    /**
   * 初始化
   */
    init() {
        this.eventManager.init();
        if (this.autoUpdate) {
            setInterval(Nan.update, 1000 / this.fps);
        }
    }
    /**
     * 获取单例
     * @returns 单例
     */
    static getInstance() {
        return Nan.instance;
    }
    /**
     * 获取Canvas渲染器
     * @returns Canvas渲染器
     */
    getContext() {
        return this.context;
    }
    // 清屏
    static clear() {
        const nan = Nan.getInstance();
        const cleanX = nan.originPosition.x / nan.scale;
        const cleanY = nan.originPosition.y / nan.scale;
        const canvasWidth = nan.context.canvas.width;
        const canvasHeight = nan.context.canvas.height;
        nan.context.clearRect(cleanX, cleanY, canvasWidth / nan.originScale.x, canvasHeight / nan.originScale.y); // 清屏
    }
    /**
     * 更新
     */
    static update() {
        const nan = Nan.getInstance();
        Nan.clear();
        for (let i = 0; i < nan.objList.length; i += 1) {
            const gameObject = nan.objList[i];
            gameObject.beforeUpdate();
            gameObject.updateNanObjects();
        }
        nan.lastUpdateTime = Date.now();
    }
    /**
     * update执行后执行
     */
    static updated() {
        const nan = Nan.getInstance();
        for (let i = 0; i < nan.objList.length; i += 1) {
            const gameObject = nan.objList[i];
            gameObject.updated();
        }
    }
    /**
     * 渲染
     */
    static render() {
        const nan = Nan.getInstance();
        if (Date.now() - nan.lastUpdateTime > 30) {
            this.update();
            this.updated();
            return true;
        }
        return false;
    }
    /**
     * 添加GameObject对象
     * @param obj GameObject对象
     */
    add(obj, autoUpdate = true) {
        if (!obj.update) {
            console.warn("The gameobject named %s hasn't return any NanObject in update()", obj.name);
        }
        this.objList.push(obj);
        if (!autoUpdate) {
            Nan.render();
        }
    }
    /**
     * 查询Nan对象
     * @param name 名称
     * @returns Nan对象
     */
    findGameObject(name) {
        let result = null;
        for (let i = 0; i < this.objList.length; i += 1) {
            const obj = this.objList[i];
            if (obj.name === name) {
                result = obj;
            }
        }
        return result;
    }
    /**
     * 移动坐标原点并记录
     * @param x x
     * @param y y
     */
    translateOrigin(x, y) {
        this.context.translate(x, y);
        this.originPosition = new Vector(this.originPosition.x - x * this.scale, this.originPosition.y - y * this.scale);
        if (!this.autoUpdate) {
            Nan.render();
        }
    }
    /**
     * 移动“到”坐标原点并记录
     * @param x x
     * @param y x
     */
    moveOrigin(x, y) {
        this.translateOrigin(this.originPosition.x + x, this.originPosition.y + y);
    }
    /**
     * 缩放画布
     * @param x x
     * @param y x
     */
    // TODO 以中心缩放
    scaleOrigin(x) {
        if (this.scale < 0.1 && x < 1)
            return;
        if (this.scale > 3 && x > 1)
            return;
        this.scale *= x;
        this.context.scale(x, x);
        this.originScale = new Vector(this.originScale.x * x, this.originScale.y * x);
        if (!this.autoUpdate) {
            Nan.render();
        }
    }
}

/**
 * 变换信息
 * 变换信息类中保存的物体的位置和旋转角度等信息
 */
class Transform {
    constructor(position, rotation, size) {
        this.position = position || Vector.zero;
        this.rotation = rotation || Vector.zero;
        this.size = size || Vector.one;
    }
}

/* eslint-disable @typescript-eslint/no-empty-function */
/**
* NanObject是Nan框架的基石。任何能够在Canvas上看得见的东西都应当是GameObject的派生类
*/
class GameObject {
    constructor(name, transform = new Transform(Vector.zero, Vector.zero, Vector.zero)) {
        this.colliderStartPos = new Vector(0, 0);
        this.objects = [];
        if (!name) {
            console.error("You must create GameObject with param name, Such as new GameObject('Name')");
        }
        this.name = name;
        this.transform = transform;
        this.collider = transform.size;
        if (this.init) {
            this.init();
        }
    }
    beforeUpdate() { }
    update() {
        this.setCollider();
    }
    updateNanObjects() {
        const updateResult = this.update();
        if (updateResult) {
            this.objects = updateResult;
        }
        for (let i = 0; i < this.objects.length; i += 1) {
            const nanObject = this.objects[i];
            nanObject.update();
        }
    }
    updated() {
        for (let i = 0; i < this.objects.length; i += 1) {
            const nanObject = this.objects[i];
            nanObject.updated();
        }
    }
    render() {
        this.beforeUpdate();
        this.updateNanObjects();
        this.updated();
    }
    setCollider() {
        this.colliderStartPos = new Vector((this.transform.size.x - this.collider.x) / 2, (this.transform.size.y - this.collider.y) / 2);
    }
    showColliderLine(color = 'yellow', lineWidth = 1) {
        const context = Nan.getInstance().getContext();
        const originPos = new Vector(this.transform.position.x + this.colliderStartPos.x, this.transform.position.y + this.colliderStartPos.y);
        const size = this.collider;
        context.lineWidth = lineWidth;
        context.moveTo(originPos.x, originPos.y);
        context.lineTo(originPos.x + size.x, originPos.y);
        context.lineTo(originPos.x + size.x, originPos.y + size.y);
        context.lineTo(originPos.x, originPos.y + size.y);
        context.lineTo(originPos.x, originPos.y);
        context.strokeStyle = color;
        context.stroke();
    }
    showFrameLine(color = 'blue', lineWidth = 1) {
        const context = Nan.getInstance().getContext();
        const originPos = new Vector(this.transform.position.x, this.transform.position.y);
        const { size } = this.transform;
        context.lineWidth = lineWidth;
        context.moveTo(originPos.x, originPos.y);
        context.lineTo(originPos.x + size.x, originPos.y);
        context.lineTo(originPos.x + size.x, originPos.y + size.y);
        context.lineTo(originPos.x, originPos.y + size.y);
        context.lineTo(originPos.x, originPos.y);
        context.strokeStyle = color;
        context.stroke();
    }
}

/**
 * NanObject是GameObject框架的基石。是GameObject每次Update返回给Nan的就是NanObject的列表
 */
class NanObject {
    /**
     * 构造初始化
     * @param transform 变换信息
     */
    constructor(transform) {
        this.transform = transform;
        this.context = Nan.getInstance().getContext();
    }
    beforeUpdate() { }
    update() { }
    updated() { }
    render() {
        this.beforeUpdate();
        this.update();
        this.updated();
    }
    showFrameLine(color = 'red', lineWidth = 1) {
        const originPos = this.transform.position;
        const { size } = this.transform;
        this.context.lineWidth = lineWidth;
        this.context.moveTo(originPos.x, originPos.y);
        this.context.lineTo(originPos.x + size.x, originPos.y);
        this.context.lineTo(originPos.x + size.x, originPos.y + size.y);
        this.context.lineTo(originPos.x, originPos.y + size.y);
        this.context.lineTo(originPos.x, originPos.y);
        this.context.strokeStyle = color;
        this.context.stroke();
    }
}

/**
 * Sprite类
 * 渲染图片的对象都属于Sprite类，Sprite类属于Nan对象
 */
class Sprite extends NanObject {
    /**
     * 构造函数
     * @param name 对象名称
     * @param transform 变换信息
     * @param image 图像
     */
    constructor(transform, image, autoSize = true) {
        super(transform);
        this.image = image;
        if (autoSize) {
            this.transform.size = new Vector(image.width, image.height);
        }
        else {
            this.transform.size = transform.size;
        }
    }
    /**
     * 内部帧更新函数
     */
    update() {
        this.context.save();
        this.context.beginPath();
        super.update();
        this.context.drawImage(this.image, this.transform.position.x, this.transform.position.y, this.transform.size.x, this.transform.size.y);
        this.context.closePath();
        this.context.restore();
    }
    /**
     * 设置图像
     * @param image 图像
     */
    setImage(image) {
        this.image = image;
    }
}

class NText extends NanObject {
    constructor(transform, text, color = 'black') {
        super(transform);
        this.autoUpdateWidth = true;
        this.text = text;
        this.color = color;
    }
    update() {
        this.context.save();
        this.context.beginPath();
        super.update();
        this.context.font = `${this.transform.size.y}px serif`;
        if (this.autoUpdateWidth) {
            const textMesure = this.context.measureText(this.text);
            this.transform.size.x = textMesure.width;
        }
        this.context.fillStyle = this.color;
        this.context.fillText(this.text, this.transform.position.x, this.transform.position.y + this.transform.size.y);
        this.context.closePath();
        this.context.restore();
    }
}

class NLine extends NanObject {
    /**
     *
     * @param transform 变换信息
     * @param path 线段路径信息，必须要一个二维数组（Vector）的二维数组。path.x为起始点,path.y为结束点
     */
    constructor(transform, path, color = 'black') {
        super(transform);
        this.width = 1;
        this.transform.size.x = Math.abs(path.x.x - path.y.x);
        this.transform.size.y = Math.abs(path.x.y - path.y.y);
        this.path = path;
        this.color = color;
    }
    update() {
        this.context.save();
        this.context.beginPath();
        super.update();
        const pos = this.transform.position;
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.width;
        this.context.moveTo(this.path.x.x + pos.x, this.path.x.y + pos.y);
        this.context.lineTo(this.path.y.x + pos.x, this.path.y.y + pos.y);
        this.context.stroke();
        this.context.closePath();
        this.context.restore();
    }
}

class Polygon extends NanObject {
    /**
     * 多边形
     * @param transform 变换信息
     * @param angles 边数
     * @param renderMethod 绘制方法 fill为实心 stroke为描边
     * @param color 颜色
     */
    constructor(transform, angles, renderMethod = 'fill', color = '#000000') {
        super(transform);
        // 启始角度 （弧度制）
        this.startAngles = 0;
        // 描边像素
        this.lineWidth = 1;
        this.angles = angles;
        this.renderMethod = renderMethod;
        this.color = color;
        this.lineColor = color;
        this.offsetX = this.transform.size.x / 2;
        this.offsetY = this.transform.size.x / 2;
    }
    update() {
        this.context.save();
        this.context.beginPath();
        super.update();
        this.context.lineWidth = this.lineWidth;
        const ang = (2 * Math.PI) / this.angles;
        for (let i = 0; i < this.angles; i += 1) {
            const x = (Math.cos(ang * i + this.startAngles)
                * this.transform.size.x) / 2
                + this.transform.position.x + this.offsetX;
            const y = (Math.sin(ang * i + this.startAngles)
                * this.transform.size.y) / 2
                + this.transform.position.y + this.offsetY;
            this.context.lineTo(x, y);
        }
        this.context.closePath();
        switch (this.renderMethod) {
            case 'fill':
                this.context.fillStyle = this.color;
                this.context.strokeStyle = this.lineColor;
                this.context.fill();
                this.context.stroke();
                break;
            case 'stroke':
                this.context.fillStyle = this.color;
                this.context.stroke();
                break;
            default:
                console.error('Unknow render way: %s', this.renderMethod);
        }
        this.context.closePath();
        this.context.restore();
    }
}

class Rect extends NanObject {
    constructor(transform, renderMethod = 'fill', color = 'black') {
        super(transform);
        this.lineColor = 'yellow';
        this.lineWidth = 1;
        this.color = color;
        this.renderMethod = renderMethod;
    }
    update() {
        this.context.save();
        this.context.beginPath();
        super.update();
        this.context.rect(this.transform.position.x, this.transform.position.y, this.transform.size.x, this.transform.size.y);
        switch (this.renderMethod) {
            case 'fill':
                this.context.fillStyle = this.color;
                this.context.strokeStyle = this.lineColor;
                this.context.fill();
                this.context.stroke();
                break;
            case 'stroke':
                this.context.strokeStyle = this.color;
                this.context.stroke();
                break;
            default:
                console.error('Unknow render way: %s', this.renderMethod);
        }
        this.context.closePath();
        this.context.restore();
    }
}

class Utils {
    static getRandomColor() {
        let colorStr = '#';
        const randomArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        for (let i = 0; i < 6; i += 1) {
            colorStr += randomArr[Math.ceil(Math.random() * (15 - 0) + 0)];
        }
        return colorStr;
    }
}

export { GameObject, NLine, NText, Nan, NanObject, Polygon, Rect, Sprite, Transform, Utils, Vector };
