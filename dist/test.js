(() => {
  "use strict";
  var t = {
      450: (t, n, o) => {
        o.d(n, {
          c: () => e
        });
        var e = function () {
          function t(n, o) {
            void 0 === o && (o = 60), this.objList = [], t.instance ? console.error("Nan is already created, You can use getInstance() to get it") : t.instance = this, this.ctx = n.getContext("2d"), this.fps = o, this.init()
          }
          return t.getInstance = function () {
            return t.instance || console.error("Nan have not been create,Please create Nan first"), t.instance
          }, t.prototype.getCtx = function () {
            return this.ctx
          }, t.prototype.init = function () {
            setInterval(this.update, 1e3 / this.fps)
          }, t.prototype.update = function () {
            var n = t.getInstance();
            n.ctx.clearRect(0, 0, n.ctx.canvas.width, n.ctx.canvas.height);
            for (var o = 0; o < n.objList.length; o++) n.objList[o]._update()
          }, t.prototype.addObject = function (t) {
            console.log("Add " + t.name), this.objList.push(t)
          }, t.prototype.findObject = function (t) {
            for (var n = null, o = 0; o < this.objList.length; o++) {
              var e = this.objList[o];
              e.name == t && (n = e)
            }
            return n || console.error("Can't find object by name: %s", t), n
          }, t
        }()
      }
    },
    n = {};

  function o(e) {
    var r = n[e];
    if (void 0 !== r) return r.exports;
    var i = n[e] = {
      exports: {}
    };
    return t[e](i, i.exports, o), i.exports
  }
  o.d = (t, n) => {
    for (var e in n) o.o(n, e) && !o.o(t, e) && Object.defineProperty(t, e, {
      enumerable: !0,
      get: n[e]
    })
  }, o.o = (t, n) => Object.prototype.hasOwnProperty.call(t, n), (() => {
    var t, n = o(450),
      e = function () {
        function t(t, o) {
          this.name = t, this.transform = o, this.ctx = n.c.getInstance().getCtx()
        }
        return t.prototype.doInit = function (t) {
          t && (this.init = t), this.init && this.init(this)
        }, t.prototype._update = function () {
          this.update && this.update(this)
        }, t
      }(),
      r = (t = function (n, o) {
        return t = Object.setPrototypeOf || {
          __proto__: []
        }
        instanceof Array && function (t, n) {
          t.__proto__ = n
        } || function (t, n) {
          for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
        }, t(n, o)
      }, function (n, o) {
        if ("function" != typeof o && null !== o) throw new TypeError("Class extends value " + String(o) + " is not a constructor or null");

        function e() {
          this.constructor = n
        }
        t(n, o), n.prototype = null === o ? Object.create(o) : (e.prototype = o.prototype, new e)
      }),
      i = function (t) {
        function n(n, o, e) {
          var r = t.call(this, n, o) || this;
          return r.text = e, r
        }
        return r(n, t), n.prototype._update = function () {
          t.prototype._update.call(this), this.ctx.fillText(this.text, this.transform.position.x, this.transform.position.y)
        }, n
      }(e),
      s = function () {
        function t(t, n) {
          this.x = t, this.y = n
        }
        return t.zero = new t(0, 0), t.one = new t(1, 1), t
      }(),
      c = function () {
        var t = function (n, o) {
          return t = Object.setPrototypeOf || {
            __proto__: []
          }
          instanceof Array && function (t, n) {
            t.__proto__ = n
          } || function (t, n) {
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
          }, t(n, o)
        };
        return function (n, o) {
          if ("function" != typeof o && null !== o) throw new TypeError("Class extends value " + String(o) + " is not a constructor or null");

          function e() {
            this.constructor = n
          }
          t(n, o), n.prototype = null === o ? Object.create(o) : (e.prototype = o.prototype, new e)
        }
      }(),
      a = function (t) {
        function n(n, o, e, r) {
          var i = t.call(this, n, o) || this;
          return i.image = e, i.size = r || new s(e.width, e.height), i
        }
        return c(n, t), n.prototype._update = function () {
          t.prototype._update.call(this), this.ctx.drawImage(this.image, this.transform.position.x, this.transform.position.y, this.size.x * this.transform.scale.x, this.size.y * this.transform.scale.y)
        }, n.prototype.setImage = function (t) {
          this.image = t
        }, n
      }(e),
      u = function (t, n, o) {
        this.position = s.zero, this.rotation = s.zero, this.scale = s.zero, this.position = t, this.rotation = n, this.scale = o
      },
      p = document.getElementById("canvas"),
      f = new n.c(p, 60),
      l = new Image;
    l.src = "a.png", l.onload = function () {
      var t = new a("Hello123", new u(s.zero, s.zero, s.one), l);
      t.update = function (t) {
        t.transform.position.x += 1
      }, n.c.getInstance().addObject(t)
    }, document.getElementById("btn").onclick = function () {
      n.c.getInstance().findObject("Hello123").transform.position.x = 0
    }, f.getCtx().font = "normal 36px Verdana", f.getCtx().fillStyle = "#000000";
    var h = new i("text", new u(new s(10, 40), s.zero, s.one), "Hello World");
    h.update = function (t) {
      t.text = "当前时间戳" + Date.now().toString()
    }, f.addObject(h), h.doInit((function (t) {
      console.log("时间戳初始化", t.text)
    }))
  })()
})();