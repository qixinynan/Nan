(() => {
  "use strict";
  ! function () {
    function t(e, n) {
      void 0 === n && (n = 60), this.objList = [], t.instance ? console.error("Nan is already created, You can use getInstance() to get it") : t.instance = this, this.ctx = e.getContext("2d"), this.fps = n, this.init()
    }
    t.getInstance = function () {
      return t.instance || console.error("Nan have not been create,Please create Nan first"), t.instance
    }, t.prototype.getCtx = function () {
      return this.ctx
    }, t.prototype.init = function () {
      setInterval(this.update, 1e3 / this.fps)
    }, t.prototype.update = function () {
      var e = t.getInstance();
      e.ctx.clearRect(0, 0, e.ctx.canvas.width, e.ctx.canvas.height);
      for (var n = 0; n < e.objList.length; n++) e.objList[n]._update()
    }, t.prototype.addObject = function (t) {
      console.log("Add " + t.name), this.objList.push(t)
    }, t.prototype.findObject = function (t) {
      for (var e = null, n = 0; n < this.objList.length; n++) {
        var o = this.objList[n];
        o.name == t && (e = o)
      }
      return e || console.error("Can't find object by name: %s", t), e
    }
  }()
})();