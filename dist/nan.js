/**
 * 二维数组
 */
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.zero = new Vector(0, 0);
    Vector.one = new Vector(1, 1);
    return Vector;
}());

var Nan = /** @class */ (function () {
    /**
     *  构造函数初始化
     * @param canvas Canvas对象
     * @param fps 刷新帧率
     */
    function Nan(canvas, fps) {
        if (fps === void 0) { fps = 60; }
        this.objList = []; //已加载的物体列表
        this.objMap = new Map(); //已加载的物体列表
        this.originPosition = new Vector(0, 0);
        this.originScale = new Vector(1, 1);
        this.canvasDraggable = true; //画布可否拖拽
        this.canvasScalable = true; //FIXME 放大后不停拖拽移动位置后再缩小会有严重渲染错误
        this.extraCleanRect = new Vector(0, 0); //额外擦除区域
        this.isDraging = false;
        this.isMouseDown = false;
        this.bc = 20; //多边形单位长度
        this.itemMap = new Map(); //已加载的物体列表
        this.scale = 1;
        if (Nan.instance)
            console.error("Nan is already created, You can use getInstance() to get it");
        else
            Nan.instance = this;
        if (!canvas)
            console.error("Canvas can't be null");
        this.fps = fps;
        this.context = canvas.getContext('2d');
        this.init();
    }
    Nan.prototype.setBc = function (bc) {
        this.bc = bc;
        console.log(this.bc);
    };
    Nan.prototype.getBc = function () {
        return this.bc;
    };
    /**
   * 初始化
   */
    Nan.prototype.init = function () {
        this.registerEvent();
        setInterval(this.update, 1000 / this.fps);
    };
    /**
     * 事件注册
     */
    Nan.prototype.registerEvent = function () {
        var canvas = Nan.getInstance().context.canvas;
        canvas.onmouseup = this.clickEvent;
        canvas.onmousedown = this.mouseDown;
        canvas.onwheel = this.onWheel;
        canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };
    };
    /**
     * 获取单例
     * @returns 单例
     */
    Nan.getInstance = function () {
        if (!Nan.instance) {
            console.error("Nan have not been create,Please create Nan first");
        }
        return Nan.instance;
    };
    /**
     * 获取Canvas渲染器
     * @returns Canvas渲染器
     */
    Nan.prototype.getContext = function () {
        return this.context;
    };
    // 清屏
    Nan.prototype.clear = function () {
        var nan = Nan.getInstance();
        // let allNanObjList: NanObject[] = [];
        var cleanX = nan.originPosition.x, cleanY = nan.originPosition.y, canvasWidth = nan.context.canvas.width, canvasHeight = nan.context.canvas.height;
        console.log(cleanX, cleanY, canvasWidth, canvasHeight);
        nan.context.clearRect(cleanX - 10, cleanY - 10, canvasWidth / nan.originScale.x + nan.extraCleanRect.x, canvasHeight / nan.originScale.y + nan.extraCleanRect.y); //清屏
    };
    /**
     * 每帧刷新
     */
    Nan.prototype.update = function () {
        var nan = Nan.getInstance();
        var allNanObjList = [];
        // let cleanX = nan.originPosition.x,
        //     cleanY = nan.originPosition.y,
        //     canvasWidth = nan.context.canvas.width,
        //     canvasHeight = nan.context.canvas.height;
        // console.log(cleanX, cleanY, canvasWidth, canvasHeight);
        // nan.context.clearRect(cleanX-10, cleanY-10, canvasWidth / nan.originScale.x  + nan.extraCleanRect.x, canvasHeight / nan.originScale.y  + nan.extraCleanRect.y); //清屏
        // nan.context.clearRect(-100, -100, 2000, 2000); //清屏
        nan.clear();
        for (var i = 0; i < nan.objList.length; i++) {
            var gameObj = nan.objList[i];
            var nanObjList = gameObj.update();
            if (nanObjList) {
                if (!nanObjList.length) { //若没有length对象便就断言不是array对象
                    console.error("Function update() must return a array of GameObject");
                }
                for (var j = 0; j < nanObjList.length; j++) {
                    var nanObj = nanObjList[j];
                    allNanObjList.push(nanObj);
                    nanObj._update();
                }
            }
        }
        for (var i = 0; i < allNanObjList.length; i++) {
            allNanObjList[i]._lateUpdate();
        }
        nan.lateUpdate();
        // nan.context.rect(cleanX, cleanY, canvasWidth / nan.originScale.x  + nan.extraCleanRect.x, canvasHeight / nan.originScale.y  + nan.extraCleanRect.y); //清屏
        nan.context.stroke();
    };
    /**
     * update执行后执行
     */
    Nan.prototype.lateUpdate = function () {
        var nan = Nan.getInstance();
        for (var i = 0; i < nan.objList.length; i++) {
            var gameObj = nan.objList[i];
            gameObj.lateUpdate();
        }
    };
    /**
     * 添加GameObject对象
     * @param obj GameObject对象
     */
    Nan.prototype.add = function (obj) {
        if (!obj.update()) {
            console.warn("The gameobject named %s hasn't return any NanObject in update()", obj.name);
        }
        this.objList.push(obj);
        this.objMap[obj.name] = obj;
    };
    /**
     * 查询Nan对象
     * @param name 名称
     * @returns Nan对象
     */
    Nan.prototype.findGameObject = function (name) {
        var result = null;
        for (var i = 0; i < this.objList.length; i++) {
            var obj = this.objList[i];
            if (obj.name == name) {
                result = obj;
            }
        }
        if (!result) {
            console.error("Can't find object by name: %s", name);
        }
        return result;
    };
    Nan.prototype.findGameObject1 = function (name) {
        var result = null;
        result = this.objMap[name];
        if (!result) {
            console.error("Can't find object by name: %s", name);
        }
        return result;
    };
    /**
     * 点击事件处理
     */
    Nan.prototype.clickEvent = function (e) {
        var nan = Nan.getInstance();
        nan.isMouseDown = false;
        if (nan.isDraging) {
            nan.isDraging = false;
            return;
        }
        var canvasBound = nan.context.canvas.getBoundingClientRect();
        var x = e.clientX - canvasBound.left;
        var y = e.clientY - canvasBound.top;
        var j = Math.floor(y / 3 / nan.bc);
        var offsetX = j % 2 == 0 ? 0 : Math.sqrt(nan.bc * nan.bc * 3);
        var i = (x - offsetX) / 2;
        i = Math.floor(i / Math.sqrt(nan.bc * nan.bc * 3));
        var key = [i, j];
        // console.log(key, x, y, nan.bc);
        var obj = nan.itemMap[key];
        // console.log(key, nan.itemMap.has(key), obj, nan.itemMap)
        if (obj && obj.onClick) {
            obj.onClick();
        }
    };
    Nan.prototype.clickEvent1 = function (e) {
        var nan = Nan.getInstance();
        nan.isMouseDown = false;
        if (nan.isDraging) {
            nan.isDraging = false;
            return;
        }
        for (var i = 0; i < nan.objList.length; i++) {
            var obj = nan.objList[i];
            var canvasBound = nan.context.canvas.getBoundingClientRect();
            var x = e.clientX - canvasBound.left;
            var y = e.clientY - canvasBound.top;
            var xOffset = x - obj.transform.position.x - obj.colliderStartPos.x + nan.originPosition.x;
            var yOffset = y - obj.transform.position.y - obj.colliderStartPos.y + nan.originPosition.y;
            if (0 <= xOffset && xOffset <= obj.collider.x && 0 <= yOffset && yOffset <= obj.collider.y) {
                if (obj.onClick) {
                    obj.onClick();
                }
            }
        }
    };
    /**
     * 按下事件处理
     */
    //TODO client坐标在canvas坐标变更后可能失效
    Nan.prototype.mouseDown = function (de) {
        var nan = Nan.getInstance();
        var canvas = nan.getContext().canvas;
        var lastPos = new Vector(de.clientX, de.clientY);
        nan.isMouseDown = true;
        canvas.onmousemove = function (e) {
            if (nan.isMouseDown) {
                // console.log(nan.canvasDraggable, e.buttons);
                if (nan.canvasDraggable && (e.buttons == 2 || e.buttons == 4)) {
                    nan.isDraging = true;
                    var canvasBound = nan.context.canvas.getBoundingClientRect();
                    e.clientX - canvasBound.left;
                    e.clientY - canvasBound.top;
                    var dragX = e.clientX - lastPos.x;
                    var dragY = e.clientY - lastPos.y;
                    nan.translateOrigin(dragX, dragY);
                    lastPos = new Vector(e.clientX, e.clientY);
                }
            }
        };
        canvas.onmouseout = function () {
            nan.isMouseDown = false;
            if (nan.isDraging) {
                nan.isDraging = false;
            }
        };
    };
    /**
     * 监听滚轮事件
     * 缩放功能
     */
    Nan.prototype.onWheel = function (e) {
        var nan = Nan.getInstance();
        if (e.deltaY > 0) {
            nan.scaleOrigin(0.8, 0.8);
        }
        else {
            nan.scaleOrigin(1.2, 1.2);
        }
    };
    /**
     * 移动坐标原点并记录
     * @param x x
     * @param y y
     */
    Nan.prototype.translateOrigin = function (x, y) {
        this.context.translate(x, y);
        this.originPosition = new Vector(this.originPosition.x - x, this.originPosition.y - y);
    };
    /**
     * 移动“到”坐标原点并记录
     * @param x x
     * @param y x
     */
    Nan.prototype.moveOrigin = function (x, y) {
        this.translateOrigin(this.originPosition.x + x, this.originPosition.y + y);
    };
    /**
     * 缩放画布
     * @param x x
     * @param y x
     */
    //TODO 以中心缩放
    Nan.prototype.scaleOrigin = function (x, y) {
        if (this.scale < 0.1 && x < 1)
            return;
        if (this.scale > 10 && x > 1)
            return;
        this.clear();
        // context.translate((_left + _width/2) - (_width / 2) * scale, (_top + _height/2)  - (_height / 2) * scale);
        this.context.canvas.width;
        this.context.canvas.height;
        this.bc = this.bc * x;
        // this.translateOrigin(cWidth / 4, cHeight / 4)
        // this.translateOrigin((cWidth + this.originPosition.x)/2,(cHeight + this.originPosition.y))
        this.scale *= x;
        // origin.x = x - (x - origin.x) * scaleBy;
        // origin.y = y - (y - origin.y) * scaleBy;
        this.context.scale(x, y);
        this.originScale = new Vector(this.originScale.x * x, this.originScale.y * y);
        // console.log(this.originScale, this.bc);;
        this.clear();
    };
    return Nan;
}());

/**
 * 变换信息
 * 变换信息类中保存的物体的位置和旋转角度等信息
 */
var Transform = /** @class */ (function () {
    function Transform(position, rotation, size) {
        if (position === void 0) { position = Vector.zero; }
        if (rotation === void 0) { rotation = Vector.zero; }
        if (size === void 0) { size = Vector.zero; }
        this.position = Vector.zero; //位置
        this.rotation = Vector.zero; //角度 (未实现)
        this.size = Vector.zero; //缩放
        this.position = position;
        this.rotation = rotation;
        this.size = size;
    }
    return Transform;
}());

/**
* NanObject是Nan框架的基石。任何能够在Canvas上看得见的东西都应当是GameObject的派生类
*/
var GameObject = /** @class */ (function () {
    function GameObject(name, transform) {
        if (transform === void 0) { transform = new Transform(Vector.zero, Vector.zero, Vector.zero); }
        this.colliderStartPos = new Vector(0, 0);
        if (!name) {
            console.error("You must create GameObject with param name, Such as new GameObject('Name')");
        }
        this.name = name;
        this.transform = transform;
        this.collider = transform.size;
        this.init();
    }
    GameObject.prototype.init = function () { };
    /**
     * Update会在每帧调用一次
     *
     * Update应当返回一个NanObject的列表
     * @returns NanObject[]
     */
    GameObject.prototype.update = function () {
        this.colliderStartPos = new Vector((this.transform.size.x - this.collider.x) / 2, (this.transform.size.y - this.collider.y) / 2);
        return undefined;
    };
    GameObject.prototype.lateUpdate = function () {
    };
    GameObject.prototype.showColliderLine = function (color, lineWidth) {
        if (color === void 0) { color = "yellow"; }
        if (lineWidth === void 0) { lineWidth = 1; }
        var context = Nan.getInstance().getContext();
        var originPos = new Vector(this.transform.position.x + this.colliderStartPos.x, this.transform.position.y + this.colliderStartPos.y);
        var size = this.collider;
        context.lineWidth = lineWidth;
        context.moveTo(originPos.x, originPos.y);
        context.lineTo(originPos.x + size.x, originPos.y);
        context.lineTo(originPos.x + size.x, originPos.y + size.y);
        context.lineTo(originPos.x, originPos.y + size.y);
        context.lineTo(originPos.x, originPos.y);
        context.strokeStyle = color;
        context.stroke();
    };
    GameObject.prototype.showFrameLine = function (color, lineWidth) {
        if (color === void 0) { color = "blue"; }
        if (lineWidth === void 0) { lineWidth = 1; }
        var context = Nan.getInstance().getContext();
        var originPos = new Vector(this.transform.position.x, this.transform.position.y);
        var size = this.transform.size;
        context.lineWidth = lineWidth;
        context.moveTo(originPos.x, originPos.y);
        context.lineTo(originPos.x + size.x, originPos.y);
        context.lineTo(originPos.x + size.x, originPos.y + size.y);
        context.lineTo(originPos.x, originPos.y + size.y);
        context.lineTo(originPos.x, originPos.y);
        context.strokeStyle = color;
        context.stroke();
    };
    return GameObject;
}());

/**
 * NanObject是GameObject框架的基石。是GameObject每次Update返回给Nan的就是NanObject的列表
 */
var NanObject = /** @class */ (function () {
    /**
     * 构造初始化
     * @param transform 变换信息
     */
    function NanObject(transform) {
        this.transform = transform;
        this.context = Nan.getInstance().getContext();
    }
    /**
     * 如果Init方法已被赋值，则执行Init方法
     * 或者你也可以直接在此传入Init。doInit()会自动帮你对init进行赋值
     */
    NanObject.prototype.doInit = function (init) {
        if (init)
            this.init = init;
        if (this.init)
            this.init(this);
    };
    /**
     * 内部帧更新函数
     */
    NanObject.prototype._update = function () {
        if (this.update) {
            this.update(this);
        }
    };
    NanObject.prototype._lateUpdate = function () {
        if (this.lateUpdate) {
            this.lateUpdate(this);
        }
    };
    NanObject.prototype.showFrameLine = function (color, lineWidth) {
        if (color === void 0) { color = "red"; }
        if (lineWidth === void 0) { lineWidth = 1; }
        var originPos = this.transform.position;
        var size = this.transform.size;
        this.context.lineWidth = lineWidth;
        this.context.moveTo(originPos.x, originPos.y);
        this.context.lineTo(originPos.x + size.x, originPos.y);
        this.context.lineTo(originPos.x + size.x, originPos.y + size.y);
        this.context.lineTo(originPos.x, originPos.y + size.y);
        this.context.lineTo(originPos.x, originPos.y);
        this.context.strokeStyle = color;
        this.context.stroke();
    };
    return NanObject;
}());

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Sprite类
 * 渲染图片的对象都属于Sprite类，Sprite类属于Nan对象
 */
var Sprite = /** @class */ (function (_super) {
    __extends(Sprite, _super);
    /**
     * 构造函数
     * @param name 对象名称
     * @param transform 变换信息
     * @param image 图像
     */
    function Sprite(transform, image, autoSize) {
        if (autoSize === void 0) { autoSize = true; }
        var _this = _super.call(this, transform) || this;
        _this.image = image;
        if (autoSize)
            _this.transform.size = new Vector(image.width, image.height);
        else
            _this.transform.size = transform.size;
        return _this;
    }
    /**
     * 内部帧更新函数
     */
    Sprite.prototype._update = function () {
        _super.prototype._update.call(this);
        this.context.drawImage(this.image, this.transform.position.x, this.transform.position.y, this.transform.size.x, this.transform.size.y);
    };
    /**
     * 设置图像
     * @param image 图像
     */
    Sprite.prototype.setImage = function (image) {
        this.image = image;
    };
    return Sprite;
}(NanObject));

var NText = /** @class */ (function (_super) {
    __extends(NText, _super);
    function NText(transform, text, color) {
        if (color === void 0) { color = "black"; }
        var _this = _super.call(this, transform) || this;
        _this.autoUpdateWidth = true;
        _this.text = text;
        _this.color = color;
        return _this;
    }
    NText.prototype._update = function () {
        _super.prototype._update.call(this);
        this.context.font = this.transform.size.y + "px serif";
        if (this.autoUpdateWidth) {
            var textMesure = this.context.measureText(this.text);
            this.transform.size.x = textMesure.width;
        }
        this.context.fillStyle = this.color;
        this.context.fillText(this.text, this.transform.position.x, this.transform.position.y + this.transform.size.y);
    };
    return NText;
}(NanObject));

var NLine = /** @class */ (function (_super) {
    __extends(NLine, _super);
    /**
     *
     * @param transform 变换信息
     * @param path 线段路径信息，必须要一个二维数组（Vector）的二维数组。path.x为起始点,path.y为结束点
     */
    function NLine(transform, path, color) {
        if (color === void 0) { color = "black"; }
        var _this = this;
        if (path.x.x && path.x.y && path.y.x && path.y.y) {
            console.error("The variable path must be a Vector of Vector");
        }
        transform.size.x = Math.abs(path.x.x - path.y.x);
        transform.size.y = Math.abs(path.x.y - path.y.y);
        _this = _super.call(this, transform) || this;
        _this.path = path;
        _this.color = color;
        return _this;
    }
    NLine.prototype._update = function () {
        _super.prototype._update.call(this);
        var pos = this.transform.position;
        this.context.strokeStyle = this.color;
        this.context.moveTo(this.path.x.x + pos.x, this.path.x.y + pos.y);
        this.context.lineTo(this.path.y.x + pos.x, this.path.y.y + pos.y);
        this.context.stroke();
    };
    return NLine;
}(NanObject));

var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    /**
     * 多边形
     * @param transform 变换信息
     * @param angles 边数
     * @param renderMethod 绘制方法 fill为实心 stroke为描边
     * @param color 颜色
     */
    function Polygon(transform, angles, renderMethod, color) {
        if (renderMethod === void 0) { renderMethod = "fill"; }
        if (color === void 0) { color = "#000000"; }
        var _this = _super.call(this, transform) || this;
        // 启始角度 （弧度制）
        _this.startAngles = 0;
        // 描边像素
        _this.lineWidth = 1;
        _this.angles = angles;
        _this.renderMethod = renderMethod;
        _this.color = color;
        _this.lineColor = color;
        _this.offsetX = _this.transform.size.x / 2;
        _this.offsetY = _this.transform.size.x / 2;
        return _this;
    }
    Polygon.prototype._update = function () {
        _super.prototype._update.call(this);
        this.context.lineWidth = this.lineWidth;
        this.context.beginPath();
        var ang = 2 * Math.PI / this.angles;
        for (var i = 0; i < this.angles; i++) {
            var x = Math.cos(ang * i + this.startAngles) * this.transform.size.x / 2 + this.transform.position.x + this.offsetX;
            var y = Math.sin(ang * i + this.startAngles) * this.transform.size.y / 2 + this.transform.position.y + this.offsetY;
            this.context.lineTo(x, y);
        }
        this.context.closePath();
        switch (this.renderMethod) {
            case "fill":
                this.context.fillStyle = this.color;
                this.context.strokeStyle = this.lineColor;
                this.context.stroke();
                this.context.fill();
                break;
            case "stroke":
                this.context.strokeStyle = this.color;
                this.context.stroke();
                break;
            default:
                console.error("Unknow render way: %s", this.renderMethod);
        }
    };
    return Polygon;
}(NanObject));

var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.getRandomColor = function () {
        var colorStr = "#";
        var randomArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
        for (var i = 0; i < 6; i++) {
            colorStr += randomArr[Math.ceil(Math.random() * (15 - 0) + 0)];
        }
        return colorStr;
    };
    return Utils;
}());

export { GameObject, NLine, NText, Nan, NanObject, Polygon, Sprite, Transform, Utils, Vector };
