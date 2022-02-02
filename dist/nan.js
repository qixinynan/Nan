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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

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

var NanEvent = /** @class */ (function () {
    function NanEvent() {
        this.nan = Nan$1.getInstance();
    }
    return NanEvent;
}());

var EventMouse = /** @class */ (function (_super) {
    __extends(EventMouse, _super);
    function EventMouse() {
        var _this = _super.call(this) || this;
        //TODO EventMouse使用了太多Nan的参数，耦合太高了
        _this.isDraging = false;
        _this.isMouseDown = false;
        var canvas = _this.nan.getContext().canvas;
        canvas.onmouseup = _this.onClick;
        canvas.onmousedown = _this.onMouseDown;
        canvas.onwheel = _this.onWheel;
        canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };
        return _this;
    }
    EventMouse.prototype.onClick = function (e) {
        var nan = Nan$1.getInstance();
        this.isMouseDown = false;
        if (this.isDraging) {
            this.isDraging = false;
            return;
        }
        this.isDraging = false;
        var scale = nan.scale;
        var canvasBound = nan.context.canvas.getBoundingClientRect();
        for (var i = 0; i < nan.objList.length; i++) {
            var obj = nan.objList[i];
            var x = e.clientX - canvasBound.left;
            var y = e.clientY - canvasBound.top;
            var xOffset = x - obj.transform.position.x * scale - obj.colliderStartPos.x * scale + nan.originPosition.x;
            var yOffset = y - obj.transform.position.y * scale - obj.colliderStartPos.y * scale + nan.originPosition.y;
            if (0 <= xOffset && xOffset <= obj.collider.x * scale && 0 <= yOffset && yOffset <= obj.collider.y * scale) {
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
    EventMouse.prototype.onMouseDown = function (de) {
        var _this = this;
        var nan = Nan$1.getInstance();
        var canvas = nan.getContext().canvas;
        var lastPos = new Vector(de.clientX, de.clientY);
        this.isMouseDown = true;
        // console.log(de.clientX, de.clientY);
        canvas.onmousemove = function (e) {
            if (_this.isMouseDown) {
                if (nan.canvasDraggable && (e.buttons == 2 || e.buttons == 1)) {
                    var canvasBound = nan.context.canvas.getBoundingClientRect();
                    e.clientX - canvasBound.left;
                    e.clientY - canvasBound.top;
                    var dragX = e.clientX - lastPos.x;
                    var dragY = e.clientY - lastPos.y;
                    if (Math.abs(dragX) < 5 && Math.abs(dragY) < 5) {
                        _this.isDraging = false;
                        return;
                    }
                    _this.isDraging = true;
                    dragX /= nan.scale;
                    dragY /= nan.scale;
                    nan.translateOrigin(dragX, dragY);
                    lastPos = new Vector(e.clientX, e.clientY);
                }
            }
        };
        canvas.onmouseout = function () {
            _this.isMouseDown = false;
            if (_this.isDraging) {
                _this.isDraging = false;
            }
        };
    };
    /**
     * 监听滚轮事件
     * 缩放功能
     */
    EventMouse.prototype.onWheel = function (e) {
        var nan = Nan$1.getInstance();
        if (e.deltaY > 0) {
            nan.scaleOrigin(0.8);
        }
        else {
            nan.scaleOrigin(1.2);
        }
    };
    return EventMouse;
}(NanEvent));

var EventManager = /** @class */ (function () {
    function EventManager() {
    }
    EventManager.prototype.init = function () {
        new EventMouse();
    };
    return EventManager;
}());

var Nan = /** @class */ (function () {
    /**
     *  构造函数初始化
     * @param canvas Canvas对象
     * @param fps 刷新帧率
     */
    function Nan(canvas) {
        this.fps = 30; //帧率
        this.eventManager = new EventManager();
        this.lastUpdateTime = 0;
        this.originPosition = new Vector(0, 0);
        this.originScale = new Vector(1, 1);
        this.objList = []; //已加载的物体列表
        this.canvasDraggable = true; //画布可否可拖拽
        this.canvasScalable = true; //画布是否可缩放
        this.autoUpdate = false;
        this.scale = 1;
        if (Nan.instance)
            console.error("Nan is already created, You can use getInstance() to get it");
        else
            Nan.instance = this;
        if (!canvas)
            console.error("Canvas can't be null");
        this.context = canvas.getContext('2d');
        this.init();
    }
    /**
   * 初始化
   */
    Nan.prototype.init = function () {
        this.eventManager.init();
        if (this.autoUpdate) {
            setInterval(Nan.update, 1000 / this.fps);
        }
    };
    /**
     * 获取单例
     * @returns 单例
     */
    Nan.getInstance = function () {
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
        var cleanX = nan.originPosition.x / nan.scale, cleanY = nan.originPosition.y / nan.scale, canvasWidth = nan.context.canvas.width, canvasHeight = nan.context.canvas.height;
        nan.context.clearRect(cleanX, cleanY, canvasWidth / nan.originScale.x, canvasHeight / nan.originScale.y); //清屏
    };
    /**
     * 更新
     */
    Nan.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nan, i, gameObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nan = Nan.getInstance();
                        nan.clear();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < nan.objList.length)) return [3 /*break*/, 4];
                        gameObj = nan.objList[i];
                        return [4 /*yield*/, gameObj._update()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, nan.lateUpdate()];
                    case 5:
                        _a.sent();
                        nan.lastUpdateTime = Date.now();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 渲染
     */
    Nan.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nan = Nan.getInstance();
                        if (!(Date.now() - nan.lastUpdateTime > 30)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.update()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2: return [2 /*return*/, false];
                }
            });
        });
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
    Nan.prototype.add = function (obj, autoUpdate) {
        if (autoUpdate === void 0) { autoUpdate = true; }
        if (!obj.update) {
            console.warn("The gameobject named %s hasn't return any NanObject in update()", obj.name);
        }
        this.objList.push(obj);
        if (autoUpdate) {
            Nan.render();
        }
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
        return result;
    };
    /**
     * 移动坐标原点并记录
     * @param x x
     * @param y y
     */
    Nan.prototype.translateOrigin = function (x, y) {
        this.context.translate(x, y);
        this.originPosition = new Vector(this.originPosition.x - x * this.scale, this.originPosition.y - y * this.scale);
        if (!this.autoUpdate) {
            Nan.render();
        }
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
    Nan.prototype.scaleOrigin = function (x) {
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
    };
    return Nan;
}());
var Nan$1 = Nan;

/**
 * 变换信息
 * 变换信息类中保存的物体的位置和旋转角度等信息
 */
var Transform = /** @class */ (function () {
    function Transform(position, rotation, size) {
        this.position = position ? position : Vector.zero;
        this.rotation = rotation ? rotation : Vector.zero;
        this.size = size ? size : Vector.one;
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
     */
    GameObject.prototype._update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nanObjectList, i, nanObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.colliderStartPos = new Vector((this.transform.size.x - this.collider.x) / 2, (this.transform.size.y - this.collider.y) / 2);
                        if (!this.update) return [3 /*break*/, 4];
                        nanObjectList = this.update();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < nanObjectList.length)) return [3 /*break*/, 4];
                        nanObject = nanObjectList[i];
                        return [4 /*yield*/, nanObject._update()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GameObject.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._update()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.lateUpdate()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GameObject.prototype.lateUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nanObjectList, i, nanObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.update) return [3 /*break*/, 4];
                        nanObjectList = this.update();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < nanObjectList.length)) return [3 /*break*/, 4];
                        nanObject = nanObjectList[i];
                        return [4 /*yield*/, nanObject._lateUpdate()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GameObject.prototype.showColliderLine = function (color, lineWidth) {
        if (color === void 0) { color = "yellow"; }
        if (lineWidth === void 0) { lineWidth = 1; }
        var context = Nan$1.getInstance().getContext();
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
        var context = Nan$1.getInstance().getContext();
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
        this.context = Nan$1.getInstance().getContext();
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.update) {
                    this.update(this);
                }
                return [2 /*return*/];
            });
        });
    };
    NanObject.prototype._lateUpdate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.lateUpdate) {
                    this.lateUpdate(this);
                }
                return [2 /*return*/];
            });
        });
    };
    NanObject.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._update()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.context.save();
                this.context.beginPath();
                _super.prototype._update.call(this);
                this.context.drawImage(this.image, this.transform.position.x, this.transform.position.y, this.transform.size.x, this.transform.size.y);
                this.context.closePath();
                this.context.restore();
                return [2 /*return*/];
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var textMesure;
            return __generator(this, function (_a) {
                this.context.save();
                this.context.beginPath();
                _super.prototype._update.call(this);
                this.context.font = this.transform.size.y + "px serif";
                if (this.autoUpdateWidth) {
                    textMesure = this.context.measureText(this.text);
                    this.transform.size.x = textMesure.width;
                }
                this.context.fillStyle = this.color;
                this.context.fillText(this.text, this.transform.position.x, this.transform.position.y + this.transform.size.y);
                this.context.closePath();
                this.context.restore();
                return [2 /*return*/];
            });
        });
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
        var _this = _super.call(this, transform) || this;
        _this.width = 1;
        transform.size.x = Math.abs(path.x.x - path.y.x);
        transform.size.y = Math.abs(path.x.y - path.y.y);
        _this = _super.call(this, transform) || this;
        _this.path = path;
        _this.color = color;
        return _this;
    }
    NLine.prototype._update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pos;
            return __generator(this, function (_a) {
                this.context.save();
                this.context.beginPath();
                _super.prototype._update.call(this);
                pos = this.transform.position;
                this.context.strokeStyle = this.color;
                this.context.lineWidth = this.width;
                this.context.moveTo(this.path.x.x + pos.x, this.path.x.y + pos.y);
                this.context.lineTo(this.path.y.x + pos.x, this.path.y.y + pos.y);
                this.context.stroke();
                this.context.closePath();
                this.context.restore();
                return [2 /*return*/];
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var ang, i, x, y;
            return __generator(this, function (_a) {
                this.context.save();
                this.context.beginPath();
                _super.prototype._update.call(this);
                this.context.lineWidth = this.lineWidth;
                ang = 2 * Math.PI / this.angles;
                for (i = 0; i < this.angles; i++) {
                    x = Math.cos(ang * i + this.startAngles) * this.transform.size.x / 2 + this.transform.position.x + this.offsetX;
                    y = Math.sin(ang * i + this.startAngles) * this.transform.size.y / 2 + this.transform.position.y + this.offsetY;
                    this.context.lineTo(x, y);
                }
                this.context.closePath();
                switch (this.renderMethod) {
                    case "fill":
                        this.context.fillStyle = this.color;
                        this.context.strokeStyle = this.lineColor;
                        this.context.fill();
                        this.context.stroke();
                        break;
                    case "stroke":
                        this.context.fillStyle = this.color;
                        this.context.stroke();
                        break;
                    default:
                        console.error("Unknow render way: %s", this.renderMethod);
                }
                this.context.closePath();
                this.context.restore();
                return [2 /*return*/];
            });
        });
    };
    return Polygon;
}(NanObject));

var Rect = /** @class */ (function (_super) {
    __extends(Rect, _super);
    function Rect(transform, renderMethod, color) {
        if (renderMethod === void 0) { renderMethod = "fill"; }
        if (color === void 0) { color = "black"; }
        var _this = _super.call(this, transform) || this;
        _this.lineColor = "yellow";
        _this.lineWidth = 1;
        _this.color = color;
        _this.renderMethod = renderMethod;
        return _this;
    }
    Rect.prototype._update = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.context.save();
                this.context.beginPath();
                _super.prototype._update.call(this);
                this.context.rect(this.transform.position.x, this.transform.position.y, this.transform.size.x, this.transform.size.y);
                switch (this.renderMethod) {
                    case "fill":
                        this.context.fillStyle = this.color;
                        this.context.strokeStyle = this.lineColor;
                        this.context.fill();
                        this.context.stroke();
                        break;
                    case "stroke":
                        this.context.strokeStyle = this.color;
                        this.context.stroke();
                        break;
                    default:
                        console.error("Unknow render way: %s", this.renderMethod);
                }
                this.context.closePath();
                this.context.restore();
                return [2 /*return*/];
            });
        });
    };
    return Rect;
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

export { GameObject, NLine, NText, Nan$1 as Nan, NanObject, Polygon, Rect, Sprite, Transform, Utils, Vector };
