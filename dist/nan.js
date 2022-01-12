var Nan = /** @class */ (function () {
    function Nan(canvas) {
        this.objList = [];
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }
    Nan.prototype.addObject = function (obj) {
        console.log("Add " + obj.name);
        this.objList.push(obj);
    };
    return Nan;
}());
export { Nan };
