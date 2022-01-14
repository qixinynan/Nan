var Nan = /** @class */ (function () {
    /**
     *  构造函数初始化
     * @param canvas Canvas对象
     * @param fps 刷新帧率
     */
    function Nan(canvas, fps) {
        if (fps === void 0) { fps = 60; }
        this.objList = []; //已加载的物体列表
        if (Nan.instance)
            console.error("Nan is already created, You can use getInstance() to get it");
        else
            Nan.instance = this;
        if (!canvas)
            console.error("Canvas can't be null");
        this.ctx = canvas.getContext('2d');
        this.fps = fps;
        this.init();
    }
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
    Nan.prototype.getCtx = function () {
        return this.ctx;
    };
    /**
     * 初始化
     */
    Nan.prototype.init = function () {
        setInterval(this.update, 1000 / this.fps);
    };
    /**
     * 每帧刷新
     */
    Nan.prototype.update = function () {
        var nan = Nan.getInstance();
        nan.ctx.clearRect(0, 0, nan.ctx.canvas.width, nan.ctx.canvas.height); //清屏
        for (var i = 0; i < nan.objList.length; i++) {
            var obj = nan.objList[i];
            obj._update();
        }
    };
    /**
     * 添加Nan对象
     * @param obj Nan对象
     */
    Nan.prototype.addObject = function (obj) {
        console.log("Add " + obj.name);
        this.objList.push(obj);
    };
    /**
     * 查询Nan对象
     * @param name 名称
     * @returns Nan对象
     */
    Nan.prototype.findObject = function (name) {
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
    return Nan;
}());

/**
 * NanObject是Nan框架的基石。任何能够在屏幕上看得见的东西（Canvas中）都应当是NanObject（Nan对象）的派生类
 */
var NanObject = /** @class */ (function () {
    /**
     * 构造初始化
     * @param name 对象名称
     * @param transform 变换信息
     */
    function NanObject(name, transform) {
        this.name = name; //TODO 检查是否重名
        this.transform = transform;
        this.ctx = Nan.getInstance().getCtx();
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
 * 二维数组
 */
var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector2.zero = new Vector2(0, 0);
    Vector2.one = new Vector2(1, 1);
    return Vector2;
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
    function Sprite(name, transform, image, size) {
        var _this = _super.call(this, name, transform) || this;
        _this.image = image;
        if (!size)
            _this.size = new Vector2(image.width, image.height);
        else
            _this.size = size;
        return _this;
    }
    /**
     * 内部帧更新函数
     */
    Sprite.prototype._update = function () {
        _super.prototype._update.call(this);
        this.ctx.drawImage(this.image, this.transform.position.x, this.transform.position.y, this.size.x * this.transform.scale.x, this.size.y * this.transform.scale.y);
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
    function NText(name, transform, text) {
        var _this = _super.call(this, name, transform) || this;
        _this.text = text;
        return _this;
    }
    NText.prototype._update = function () {
        _super.prototype._update.call(this);
        this.ctx.fillText(this.text, this.transform.position.x, this.transform.position.y);
    };
    return NText;
}(NanObject));

/**
 * 变换信息
 * 变换信息类中保存的物体的位置和旋转角度等信息
 */
var Transform = /** @class */ (function () {
    function Transform(position, rotation, scale) {
        this.position = Vector2.zero; //位置
        this.rotation = Vector2.zero; //角度 (未实现)
        this.scale = Vector2.zero; //缩放
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
    return Transform;
}());

export { NText, Nan, NanObject, Sprite, Transform, Vector2 as Vector };
