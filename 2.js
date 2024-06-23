!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("react")) : "function" == typeof define && define.amd ? define(["exports", "react"], t) : t((e = e || self).ReactSpring = {}, e.React)
}(this, function(e, b) {
    "use strict";
    var d = "default"in b ? b.default : b;
    function R() {
        return (R = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
        ).apply(this, arguments)
    }
    function F(e, t) {
        if (null == e)
            return {};
        var n, r, i = {}, o = Object.keys(e);
        for (r = 0; r < o.length; r++)
            n = o[r],
            0 <= t.indexOf(n) || (i[n] = e[n]);
        return i
    }
    var M = {
        arr: Array.isArray,
        obj: function(e) {
            return "[object Object]" === Object.prototype.toString.call(e)
        },
        fun: function(e) {
            return "function" == typeof e
        },
        str: function(e) {
            return "string" == typeof e
        },
        num: function(e) {
            return "number" == typeof e
        },
        und: function(e) {
            return void 0 === e
        },
        nul: function(e) {
            return null === e
        },
        set: function(e) {
            return e instanceof Set
        },
        map: function(e) {
            return e instanceof Map
        },
        equ: function(e, t) {
            if (typeof e != typeof t)
                return !1;
            if (M.str(e) || M.num(e))
                return e === t;
            if (M.obj(e) && M.obj(t) && Object.keys(e).length + Object.keys(t).length === 0)
                return !0;
            var n;
            for (n in e)
                if (!(n in t))
                    return !1;
            for (n in t)
                if (e[n] !== t[n])
                    return !1;
            return !M.und(n) || e === t
        }
    };
    function w() {
        var e = b.useState(!1)[1];
        return b.useCallback(function() {
            return e(function(e) {
                return !e
            })
        }, [])
    }
    function T(e, t) {
        return M.und(e) || M.nul(e) ? t : e
    }
    function I(e) {
        return M.und(e) ? [] : M.arr(e) ? e : [e]
    }
    function z(e) {
        for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++)
            n[r - 1] = arguments[r];
        return M.fun(e) ? e.apply(void 0, n) : e
    }
    function l(r) {
        var e, i = ((e = r).to,
        e.from,
        e.config,
        e.onStart,
        e.onRest,
        e.onFrame,
        e.children,
        e.reset,
        e.reverse,
        e.force,
        e.immediate,
        e.delay,
        e.attach,
        e.destroyed,
        e.interpolateTo,
        e.ref,
        e.lazy,
        F(e, ["to", "from", "config", "onStart", "onRest", "onFrame", "children", "reset", "reverse", "force", "immediate", "delay", "attach", "destroyed", "interpolateTo", "ref", "lazy"]));
        if (M.und(i))
            return R({
                to: i
            }, r);
        var t = Object.keys(r).reduce(function(e, t) {
            var n;
            return M.und(i[t]) ? R({}, e, ((n = {})[t] = r[t],
            n)) : e
        }, {});
        return R({
            to: i
        }, t)
    }
    function u(e, t) {
        e.prototype = Object.create(t.prototype),
        (e.prototype.constructor = e).__proto__ = t
    }
    function o(e) {
        if (void 0 === e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }
    var p, L, k = function() {
        function e() {
            this.payload = void 0,
            this.children = []
        }
        var t = e.prototype;
        return t.getAnimatedValue = function() {
            return this.getValue()
        }
        ,
        t.getPayload = function() {
            return this.payload || this
        }
        ,
        t.attach = function() {}
        ,
        t.detach = function() {}
        ,
        t.getChildren = function() {
            return this.children
        }
        ,
        t.addChild = function(e) {
            0 === this.children.length && this.attach(),
            this.children.push(e)
        }
        ,
        t.removeChild = function(e) {
            var t = this.children.indexOf(e);
            this.children.splice(t, 1),
            0 === this.children.length && this.detach()
        }
        ,
        e
    }(), s = function(i) {
        function e() {
            for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++)
                n[r] = arguments[r];
            return (t = i.call.apply(i, [this].concat(n)) || this).payload = [],
            t.attach = function() {
                return t.payload.forEach(function(e) {
                    return e instanceof k && e.addChild(o(t))
                })
            }
            ,
            t.detach = function() {
                return t.payload.forEach(function(e) {
                    return e instanceof k && e.removeChild(o(t))
                })
            }
            ,
            t
        }
        return u(e, i),
        e
    }(k), t = function(i) {
        function e() {
            for (var t, e = arguments.length, n = new Array(e), r = 0; r < e; r++)
                n[r] = arguments[r];
            return (t = i.call.apply(i, [this].concat(n)) || this).payload = {},
            t.attach = function() {
                return Object.values(t.payload).forEach(function(e) {
                    return e instanceof k && e.addChild(o(t))
                })
            }
            ,
            t.detach = function() {
                return Object.values(t.payload).forEach(function(e) {
                    return e instanceof k && e.removeChild(o(t))
                })
            }
            ,
            t
        }
        u(e, i);
        var t = e.prototype;
        return t.getValue = function(e) {
            void 0 === e && (e = !1);
            var t = {};
            for (var n in this.payload) {
                var r = this.payload[n];
                (!e || r instanceof k) && (t[n] = r instanceof k ? r[e ? "getAnimatedValue" : "getValue"]() : r)
            }
            return t
        }
        ,
        t.getAnimatedValue = function() {
            return this.getValue(!0)
        }
        ,
        e
    }(k);
    function n(e, t) {
        p = {
            fn: e,
            transform: t
        }
    }
    function r(e) {
        L = e
    }
    var N, A = function(e) {
        return "undefined" != typeof window ? window.requestAnimationFrame(e) : -1
    }, i = function(e) {
        "undefined" != typeof window && window.cancelAnimationFrame(e)
    };
    function a(e) {
        N = e
    }
    var c, D = function() {
        return Date.now()
    };
    function f(e) {
        c = e
    }
    var h, V, m = function(e) {
        return e.current
    };
    function g(e) {
        h = e
    }
    var y = Object.freeze({
        get applyAnimatedValues() {
            return p
        },
        injectApplyAnimatedValues: n,
        get colorNames() {
            return L
        },
        injectColorNames: r,
        get requestFrame() {
            return A
        },
        get cancelFrame() {
            return i
        },
        injectFrame: function(e, t) {
            A = e,
            i = t
        },
        get interpolation() {
            return N
        },
        injectStringInterpolator: a,
        get now() {
            return D
        },
        injectNow: function(e) {
            D = e
        },
        get defaultElement() {
            return c
        },
        injectDefaultElement: f,
        get animatedApi() {
            return m
        },
        injectAnimatedApi: function(e) {
            m = e
        },
        get createAnimatedStyle() {
            return h
        },
        injectCreateAnimatedStyle: g,
        get manualFrameloop() {
            return V
        },
        injectManualFrameloop: function(e) {
            V = e
        }
    })
      , v = function(r) {
        function e(e, t) {
            var n;
            return (n = r.call(this) || this).update = void 0,
            n.payload = e.style ? R({}, e, {
                style: h(e.style)
            }) : e,
            n.update = t,
            n.attach(),
            n
        }
        return u(e, r),
        e
    }(t);
    function x(e) {
        var t = 0;
        if ("undefined" != typeof Symbol && null != e[Symbol.iterator])
            return (t = e[Symbol.iterator]()).next.bind(t);
        if (Array.isArray(e) || (e = function(e, t) {
            if (!e)
                return;
            if ("string" == typeof e)
                return E(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n)
                return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return E(e, t)
        }(e)))
            return function() {
                return t >= e.length ? {
                    done: !0
                } : {
                    done: !1,
                    value: e[t++]
                }
            }
            ;
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    function E(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++)
            r[n] = e[n];
        return r
    }
    function j() {
        if (!S)
            return !1;
        for (var e, t = D(), n = x(O); !(e = n()).done; ) {
            for (var r = e.value, i = !1, o = 0; o < r.configs.length; o++) {
                for (var a = r.configs[o], u = void 0, s = void 0, c = 0; c < a.animatedValues.length; c++) {
                    var l = a.animatedValues[c];
                    if (!l.done) {
                        var f = a.fromValues[c]
                          , d = a.toValues[c]
                          , p = l.lastPosition
                          , h = d instanceof k
                          , m = Array.isArray(a.initialVelocity) ? a.initialVelocity[c] : a.initialVelocity;
                        if (h && (d = d.getValue()),
                        a.immediate)
                            l.setValue(d),
                            l.done = !0;
                        else if ("string" != typeof f && "string" != typeof d) {
                            if (void 0 !== a.duration)
                                p = f + a.easing((t - l.startTime) / a.duration) * (d - f),
                                u = t >= l.startTime + a.duration;
                            else if (a.decay)
                                p = f + m / (1 - .998) * (1 - Math.exp(-(1 - .998) * (t - l.startTime))),
                                (u = Math.abs(l.lastPosition - p) < .1) && (d = p);
                            else {
                                s = void 0 !== l.lastTime ? l.lastTime : t,
                                m = void 0 !== l.lastVelocity ? l.lastVelocity : a.initialVelocity,
                                s + 64 < t && (s = t);
                                for (var g = Math.floor(t - s), y = 0; y < g; ++y) {
                                    p += (m += (-a.tension * (p - d) + -a.friction * m) / a.mass / 1e3) / 1e3
                                }
                                var v = !(!a.clamp || 0 === a.tension) && (f < d ? d < p : p < d)
                                  , b = Math.abs(m) <= a.precision
                                  , w = 0 === a.tension || Math.abs(d - p) <= a.precision;
                                u = v || b && w,
                                l.lastVelocity = m,
                                l.lastTime = t
                            }
                            h && !a.toValues[c].done && (u = !1),
                            u ? (l.value !== d && (p = d),
                            l.done = !0) : i = !0,
                            l.setValue(p),
                            l.lastPosition = p
                        } else
                            l.setValue(d),
                            l.done = !0
                    }
                }
                r.props.onFrame && (r.values[a.name] = a.interpolation.getValue())
            }
            r.props.onFrame && r.props.onFrame(r.values),
            i || (O.delete(r),
            r.stop(!0))
        }
        return O.size ? V ? V() : A(j) : S = !1,
        S
    }
    var S = !1
      , O = new Set;
    function C(e, t, n) {
        if ("function" == typeof e)
            return e;
        if (Array.isArray(e))
            return C({
                range: e,
                output: t,
                extrapolate: n
            });
        if (N && "string" == typeof e.output[0])
            return N(e);
        var r = e
          , i = r.output
          , o = r.range || [0, 1]
          , a = r.extrapolateLeft || r.extrapolate || "extend"
          , u = r.extrapolateRight || r.extrapolate || "extend"
          , s = r.easing || function(e) {
            return e
        }
        ;
        return function(e) {
            var t = function(e, t) {
                for (var n = 1; n < t.length - 1 && !(t[n] >= e); ++n)
                    ;
                return n - 1
            }(e, o);
            return function(e, t, n, r, i, o, a, u, s) {
                var c = s ? s(e) : e;
                if (c < t) {
                    if ("identity" === a)
                        return c;
                    "clamp" === a && (c = t)
                }
                if (n < c) {
                    if ("identity" === u)
                        return c;
                    "clamp" === u && (c = n)
                }
                if (r === i)
                    return r;
                if (t === n)
                    return e <= t ? r : i;
                t === -1 / 0 ? c = -c : n === 1 / 0 ? c -= t : c = (c - t) / (n - t);
                c = o(c),
                r === -1 / 0 ? c = -c : i === 1 / 0 ? c += r : c = c * (i - r) + r;
                return c
            }(e, o[t], o[t + 1], i[t], i[t + 1], s, a, u, r.map)
        }
    }
    var P = function(o) {
        function a(e, t, n, r) {
            var i;
            return (i = o.call(this) || this).calc = void 0,
            i.payload = e instanceof s && !(e instanceof a) ? e.getPayload() : Array.isArray(e) ? e : [e],
            i.calc = C(t, n, r),
            i
        }
        u(a, o);
        var e = a.prototype;
        return e.getValue = function() {
            return this.calc.apply(this, this.payload.map(function(e) {
                return e.getValue()
            }))
        }
        ,
        e.updateConfig = function(e, t, n) {
            this.calc = C(e, t, n)
        }
        ,
        e.interpolate = function(e, t, n) {
            return new a(this,e,t,n)
        }
        ,
        a
    }(s);
    function q(e, o) {
        var t = b.useRef(!1)
          , r = b.useRef()
          , a = M.fun(o)
          , n = b.useMemo(function() {
            var i;
            return r.current && (r.current.map(function(e) {
                return e.destroy()
            }),
            r.current = void 0),
            [new Array(e).fill().map(function(e, t) {
                var n = new _
                  , r = a ? z(o, t, n) : o[t];
                return 0 === t && (i = r.ref),
                n.update(r),
                i || n.start(),
                n
            }), i]
        }, [e])
          , i = n[0]
          , u = n[1];
        r.current = i,
        b.useImperativeHandle(u, function() {
            return {
                start: function() {
                    return Promise.all(r.current.map(function(t) {
                        return new Promise(function(e) {
                            return t.start(e)
                        }
                        )
                    }))
                },
                stop: function(t) {
                    return r.current.forEach(function(e) {
                        return e.stop(t)
                    })
                },
                get controllers() {
                    return r.current
                }
            }
        });
        var s = b.useMemo(function() {
            return function(n) {
                return r.current.map(function(e, t) {
                    e.update(a ? z(n, t, e) : n[t]),
                    u || e.start()
                })
            }
        }, [e]);
        b.useEffect(function() {
            t.current ? a || s(o) : u || r.current.forEach(function(e) {
                return e.start()
            })
        }),
        b.useEffect(function() {
            return t.current = !0,
            function() {
                return r.current.forEach(function(e) {
                    return e.destroy()
                })
            }
        }, []);
        var c = r.current.map(function(e) {
            return e.getValues()
        });
        return a ? [c, s, function(t) {
            return r.current.forEach(function(e) {
                return e.pause(t)
            })
        }
        ] : c
    }
    var G = function(t) {
        function e(e) {
            var n;
            return (n = t.call(this) || this).animatedStyles = new Set,
            n.value = void 0,
            n.startPosition = void 0,
            n.lastPosition = void 0,
            n.lastVelocity = void 0,
            n.startTime = void 0,
            n.lastTime = void 0,
            n.done = !1,
            n.setValue = function(e, t) {
                void 0 === t && (t = !0),
                n.value = e,
                t && n.flush()
            }
            ,
            n.value = e,
            n.startPosition = e,
            n.lastPosition = e,
            n
        }
        u(e, t);
        var n = e.prototype;
        return n.flush = function() {
            0 === this.animatedStyles.size && !function t(e, n) {
                "update"in e ? n.add(e) : e.getChildren().forEach(function(e) {
                    return t(e, n)
                })
            }(this, this.animatedStyles),
            this.animatedStyles.forEach(function(e) {
                return e.update()
            })
        }
        ,
        n.clearStyles = function() {
            this.animatedStyles.clear()
        }
        ,
        n.getValue = function() {
            return this.value
        }
        ,
        n.interpolate = function(e, t, n) {
            return new P(this,e,t,n)
        }
        ,
        e
    }(k)
      , K = function(n) {
        function e(e) {
            var t;
            return (t = n.call(this) || this).payload = e.map(function(e) {
                return new G(e)
            }),
            t
        }
        u(e, n);
        var t = e.prototype;
        return t.setValue = function(t, n) {
            var r = this;
            void 0 === n && (n = !0),
            Array.isArray(t) ? t.length === this.payload.length && t.forEach(function(e, t) {
                return r.payload[t].setValue(e, n)
            }) : this.payload.forEach(function(e) {
                return e.setValue(t, n)
            })
        }
        ,
        t.getValue = function() {
            return this.payload.map(function(e) {
                return e.getValue()
            })
        }
        ,
        t.interpolate = function(e, t) {
            return new P(this,e,t)
        }
        ,
        e
    }(s)
      , $ = 0
      , _ = function() {
        function e() {
            var e = this;
            this.id = void 0,
            this.idle = !0,
            this.hasChanged = !1,
            this.guid = 0,
            this.local = 0,
            this.props = {},
            this.merged = {},
            this.animations = {},
            this.interpolations = {},
            this.values = {},
            this.configs = [],
            this.listeners = [],
            this.queue = [],
            this.localQueue = void 0,
            this.getValues = function() {
                return e.interpolations
            }
            ,
            this.id = $++
        }
        var t = e.prototype;
        return t.update = function(e) {
            if (!e)
                return this;
            var t = l(e)
              , n = t.delay
              , a = void 0 === n ? 0 : n
              , r = t.to
              , u = F(t, ["delay", "to"]);
            if (M.arr(r) || M.fun(r))
                this.queue.push(R({}, u, {
                    delay: a,
                    to: r
                }));
            else if (r) {
                var s = {};
                Object.entries(r).forEach(function(e) {
                    var t, n = e[0], r = e[1], i = R({
                        to: ((t = {})[n] = r,
                        t),
                        delay: z(a, n)
                    }, u), o = s[i.delay] && s[i.delay].to;
                    s[i.delay] = R({}, s[i.delay], i, {
                        to: R({}, o, i.to)
                    })
                }),
                this.queue = Object.values(s)
            }
            return this.queue = this.queue.sort(function(e, t) {
                return e.delay - t.delay
            }),
            this.diff(u),
            this
        }
        ,
        t.start = function(a) {
            var e, u = this;
            if (this.queue.length) {
                this.idle = !1,
                this.localQueue && this.localQueue.forEach(function(e) {
                    var t = e.from
                      , n = void 0 === t ? {} : t
                      , r = e.to
                      , i = void 0 === r ? {} : r;
                    M.obj(n) && (u.merged = R({}, n, u.merged)),
                    M.obj(i) && (u.merged = R({}, u.merged, i))
                });
                var s = this.local = ++this.guid
                  , c = this.localQueue = this.queue;
                this.queue = [],
                c.forEach(function(e, t) {
                    function n(e) {
                        t === c.length - 1 && s === u.guid && e && (u.idle = !0,
                        u.props.onRest && u.props.onRest(u.merged)),
                        a && a()
                    }
                    var r = e.delay
                      , i = F(e, ["delay"])
                      , o = M.arr(i.to) || M.fun(i.to);
                    r ? setTimeout(function() {
                        s === u.guid && (o ? u.runAsync(i, n) : u.diff(i).start(n))
                    }, r) : o ? u.runAsync(i, n) : u.diff(i).start(n)
                })
            } else
                M.fun(a) && this.listeners.push(a),
                this.props.onStart && this.props.onStart(),
                e = this,
                O.has(e) || O.add(e),
                S || (S = !0,
                A(V || j));
            return this
        }
        ,
        t.stop = function(t) {
            return this.listeners.forEach(function(e) {
                return e(t)
            }),
            this.listeners = [],
            this
        }
        ,
        t.pause = function(e) {
            var t;
            return this.stop(!0),
            e && (t = this,
            O.has(t) && O.delete(t)),
            this
        }
        ,
        t.runAsync = function(e, t) {
            var r = this
              , i = (e.delay,
            F(e, ["delay"]))
              , o = this.local
              , a = Promise.resolve(void 0);
            if (M.arr(i.to))
                for (var n = function(e) {
                    var t = e
                      , n = R({}, i, l(i.to[t]));
                    M.arr(n.config) && (n.config = n.config[t]),
                    a = a.then(function() {
                        if (o === r.guid)
                            return new Promise(function(e) {
                                return r.diff(n).start(e)
                            }
                            )
                    })
                }, u = 0; u < i.to.length; u++)
                    n(u);
            else if (M.fun(i.to)) {
                var s, c = 0;
                a = a.then(function() {
                    return i.to(function(e) {
                        var t = R({}, i, l(e));
                        if (M.arr(t.config) && (t.config = t.config[c]),
                        c++,
                        o === r.guid)
                            return s = new Promise(function(e) {
                                return r.diff(t).start(e)
                            }
                            )
                    }, function(e) {
                        return void 0 === e && (e = !0),
                        r.stop(e)
                    }).then(function() {
                        return s
                    })
                })
            }
            a.then(t)
        }
        ,
        t.diff = function(e) {
            var j = this;
            this.props = R({}, this.props, e);
            var t = this.props
              , n = t.from
              , S = void 0 === n ? {} : n
              , r = t.to
              , i = void 0 === r ? {} : r
              , o = t.config
              , O = void 0 === o ? {} : o
              , a = t.reverse
              , u = t.attach
              , C = t.reset
              , P = t.immediate;
            if (a) {
                var s = [i, S];
                S = s[0],
                i = s[1]
            }
            this.merged = R({}, S, this.merged, i),
            this.hasChanged = !1;
            var q = u && u(this);
            if (this.animations = Object.entries(this.merged).reduce(function(e, t) {
                var n = t[0]
                  , r = t[1]
                  , i = e[n] || {}
                  , o = M.num(r)
                  , a = M.str(r) && !r.startsWith("#") && !/\d/.test(r) && !L[r]
                  , u = M.arr(r)
                  , s = !o && !u && !a
                  , c = M.und(S[n]) ? r : S[n]
                  , l = o || u || a ? r : 1
                  , f = z(O, n);
                q && (l = q.animations[n].parent);
                var d, p = i.parent, h = i.interpolation, m = I(q ? l.getPayload() : l), g = r;
                s && (g = N({
                    range: [0, 1],
                    output: [r, r]
                })(1));
                var y, v = h && h.getValue(), b = !M.und(p) && i.animatedValues.some(function(e) {
                    return !e.done
                }), w = !M.equ(g, v), k = !M.equ(g, i.previous), A = !M.equ(f, i.config);
                if (C || k && w || A) {
                    var V;
                    if (o || a)
                        p = h = i.parent || new G(c);
                    else if (u)
                        p = h = i.parent || new K(c);
                    else if (s) {
                        var x = i.interpolation && i.interpolation.calc(i.parent.value);
                        x = void 0 === x || C ? c : x,
                        i.parent ? (p = i.parent).setValue(0, !1) : p = new G(0);
                        var E = {
                            output: [x, r]
                        };
                        i.interpolation ? (h = i.interpolation,
                        i.interpolation.updateConfig(E)) : h = p.interpolate(E)
                    }
                    return m = I(q ? l.getPayload() : l),
                    d = I(p.getPayload()),
                    C && !s && p.setValue(c, !1),
                    j.hasChanged = !0,
                    d.forEach(function(e) {
                        e.startPosition = e.value,
                        e.lastPosition = e.value,
                        e.lastVelocity = b ? e.lastVelocity : void 0,
                        e.lastTime = b ? e.lastTime : void 0,
                        e.startTime = D(),
                        e.done = !1,
                        e.animatedStyles.clear()
                    }),
                    z(P, n) && p.setValue(s ? l : r, !1),
                    R({}, e, ((V = {})[n] = R({}, i, {
                        name: n,
                        parent: p,
                        interpolation: h,
                        animatedValues: d,
                        toValues: m,
                        previous: g,
                        config: f,
                        fromValues: I(p.getValue()),
                        immediate: z(P, n),
                        initialVelocity: T(f.velocity, 0),
                        clamp: T(f.clamp, !1),
                        precision: T(f.precision, .01),
                        tension: T(f.tension, 170),
                        friction: T(f.friction, 26),
                        mass: T(f.mass, 1),
                        duration: f.duration,
                        easing: T(f.easing, function(e) {
                            return e
                        }),
                        decay: f.decay
                    }),
                    V))
                }
                return w ? e : (s && (p.setValue(1, !1),
                h.updateConfig({
                    output: [g, g]
                })),
                p.done = !0,
                j.hasChanged = !0,
                R({}, e, ((y = {})[n] = R({}, e[n], {
                    previous: g
                }),
                y)))
            }, this.animations),
            this.hasChanged)
                for (var c in this.configs = Object.values(this.animations),
                this.values = {},
                this.interpolations = {},
                this.animations)
                    this.interpolations[c] = this.animations[c].interpolation,
                    this.values[c] = this.animations[c].interpolation.getValue();
            return this
        }
        ,
        t.destroy = function() {
            this.stop(),
            this.props = {},
            this.merged = {},
            this.animations = {},
            this.interpolations = {},
            this.values = {},
            this.configs = [],
            this.local = 0
        }
        ,
        e
    }();
    function U(e) {
        var t = 0;
        if ("undefined" != typeof Symbol && null != e[Symbol.iterator])
            return (t = e[Symbol.iterator]()).next.bind(t);
        if (Array.isArray(e) || (e = function(e, t) {
            if (!e)
                return;
            if ("string" == typeof e)
                return W(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n)
                return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return W(e, t)
        }(e)))
            return function() {
                return t >= e.length ? {
                    done: !0
                } : {
                    done: !1,
                    value: e[t++]
                }
            }
            ;
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    function W(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++)
            r[n] = e[n];
        return r
    }
    var H = 0
      , Q = "enter"
      , Z = "leave"
      , B = "update"
      , J = function(e) {
        var t, n, r = e.items, i = e.keys, o = void 0 === i ? function(e) {
            return e
        }
        : i, a = F(e, ["items", "keys"]);
        return R({
            items: r = I(void 0 !== r ? r : null),
            keys: (t = r,
            ("function" == typeof (n = o) ? t.map(n) : I(n)).map(String))
        }, a)
    };
    function X(n, r) {
        for (var i, e = function() {
            function e(e) {
                return e.key !== t
            }
            var t = i.value.key;
            !M.und(r) && r !== t || (n.current.instances.delete(t),
            n.current.transitions = n.current.transitions.filter(e),
            n.current.deleted = n.current.deleted.filter(e))
        }, t = U(n.current.deleted); !(i = t()).done; )
            e();
        n.current.forceUpdate()
    }
    var Y = function(n) {
        function e(e) {
            var t;
            return void 0 === e && (e = {}),
            t = n.call(this) || this,
            !e.transform || e.transform instanceof k || (e = p.transform(e)),
            t.payload = e,
            t
        }
        return u(e, n),
        e
    }(t)
      , ee = {
        transparent: 0,
        aliceblue: 4042850303,
        antiquewhite: 4209760255,
        aqua: 16777215,
        aquamarine: 2147472639,
        azure: 4043309055,
        beige: 4126530815,
        bisque: 4293182719,
        black: 255,
        blanchedalmond: 4293643775,
        blue: 65535,
        blueviolet: 2318131967,
        brown: 2771004159,
        burlywood: 3736635391,
        burntsienna: 3934150143,
        cadetblue: 1604231423,
        chartreuse: 2147418367,
        chocolate: 3530104575,
        coral: 4286533887,
        cornflowerblue: 1687547391,
        cornsilk: 4294499583,
        crimson: 3692313855,
        cyan: 16777215,
        darkblue: 35839,
        darkcyan: 9145343,
        darkgoldenrod: 3095792639,
        darkgray: 2846468607,
        darkgreen: 6553855,
        darkgrey: 2846468607,
        darkkhaki: 3182914559,
        darkmagenta: 2332068863,
        darkolivegreen: 1433087999,
        darkorange: 4287365375,
        darkorchid: 2570243327,
        darkred: 2332033279,
        darksalmon: 3918953215,
        darkseagreen: 2411499519,
        darkslateblue: 1211993087,
        darkslategray: 793726975,
        darkslategrey: 793726975,
        darkturquoise: 13554175,
        darkviolet: 2483082239,
        deeppink: 4279538687,
        deepskyblue: 12582911,
        dimgray: 1768516095,
        dimgrey: 1768516095,
        dodgerblue: 512819199,
        firebrick: 2988581631,
        floralwhite: 4294635775,
        forestgreen: 579543807,
        fuchsia: 4278255615,
        gainsboro: 3705462015,
        ghostwhite: 4177068031,
        gold: 4292280575,
        goldenrod: 3668254975,
        gray: 2155905279,
        green: 8388863,
        greenyellow: 2919182335,
        grey: 2155905279,
        honeydew: 4043305215,
        hotpink: 4285117695,
        indianred: 3445382399,
        indigo: 1258324735,
        ivory: 4294963455,
        khaki: 4041641215,
        lavender: 3873897215,
        lavenderblush: 4293981695,
        lawngreen: 2096890111,
        lemonchiffon: 4294626815,
        lightblue: 2916673279,
        lightcoral: 4034953471,
        lightcyan: 3774873599,
        lightgoldenrodyellow: 4210742015,
        lightgray: 3553874943,
        lightgreen: 2431553791,
        lightgrey: 3553874943,
        lightpink: 4290167295,
        lightsalmon: 4288707327,
        lightseagreen: 548580095,
        lightskyblue: 2278488831,
        lightslategray: 2005441023,
        lightslategrey: 2005441023,
        lightsteelblue: 2965692159,
        lightyellow: 4294959359,
        lime: 16711935,
        limegreen: 852308735,
        linen: 4210091775,
        magenta: 4278255615,
        maroon: 2147483903,
        mediumaquamarine: 1724754687,
        mediumblue: 52735,
        mediumorchid: 3126187007,
        mediumpurple: 2473647103,
        mediumseagreen: 1018393087,
        mediumslateblue: 2070474495,
        mediumspringgreen: 16423679,
        mediumturquoise: 1221709055,
        mediumvioletred: 3340076543,
        midnightblue: 421097727,
        mintcream: 4127193855,
        mistyrose: 4293190143,
        moccasin: 4293178879,
        navajowhite: 4292783615,
        navy: 33023,
        oldlace: 4260751103,
        olive: 2155872511,
        olivedrab: 1804477439,
        orange: 4289003775,
        orangered: 4282712319,
        orchid: 3664828159,
        palegoldenrod: 4008225535,
        palegreen: 2566625535,
        paleturquoise: 2951671551,
        palevioletred: 3681588223,
        papayawhip: 4293907967,
        peachpuff: 4292524543,
        peru: 3448061951,
        pink: 4290825215,
        plum: 3718307327,
        powderblue: 2967529215,
        purple: 2147516671,
        rebeccapurple: 1714657791,
        red: 4278190335,
        rosybrown: 3163525119,
        royalblue: 1097458175,
        saddlebrown: 2336560127,
        salmon: 4202722047,
        sandybrown: 4104413439,
        seagreen: 780883967,
        seashell: 4294307583,
        sienna: 2689740287,
        silver: 3233857791,
        skyblue: 2278484991,
        slateblue: 1784335871,
        slategray: 1887473919,
        slategrey: 1887473919,
        snow: 4294638335,
        springgreen: 16744447,
        steelblue: 1182971135,
        tan: 3535047935,
        teal: 8421631,
        thistle: 3636451583,
        tomato: 4284696575,
        turquoise: 1088475391,
        violet: 4001558271,
        wheat: 4125012991,
        white: 4294967295,
        whitesmoke: 4126537215,
        yellow: 4294902015,
        yellowgreen: 2597139199
    }
      , te = "[-+]?\\d*\\.?\\d+"
      , ne = te + "%";
    function re() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
        return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)"
    }
    var ie = new RegExp("rgb" + re(te, te, te))
      , oe = new RegExp("rgba" + re(te, te, te, te))
      , ae = new RegExp("hsl" + re(te, ne, ne))
      , ue = new RegExp("hsla" + re(te, ne, ne, te))
      , se = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/
      , ce = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/
      , le = /^#([0-9a-fA-F]{6})$/
      , fe = /^#([0-9a-fA-F]{8})$/;
    function de(e, t, n) {
        return n < 0 && (n += 1),
        1 < n && --n,
        n < 1 / 6 ? e + 6 * (t - e) * n : n < .5 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
    }
    function pe(e, t, n) {
        var r = n < .5 ? n * (1 + t) : n + t - n * t
          , i = 2 * n - r
          , o = de(i, r, e + 1 / 3)
          , a = de(i, r, e)
          , u = de(i, r, e - 1 / 3);
        return Math.round(255 * o) << 24 | Math.round(255 * a) << 16 | Math.round(255 * u) << 8
    }
    function he(e) {
        var t = parseInt(e, 10);
        return t < 0 ? 0 : 255 < t ? 255 : t
    }
    function me(e) {
        return (parseFloat(e) % 360 + 360) % 360 / 360
    }
    function ge(e) {
        var t = parseFloat(e);
        return t < 0 ? 0 : 1 < t ? 255 : Math.round(255 * t)
    }
    function ye(e) {
        var t = parseFloat(e);
        return t < 0 ? 0 : 100 < t ? 1 : t / 100
    }
    function ve(e) {
        var t, n, r = "number" == typeof (t = e) ? t >>> 0 === t && 0 <= t && t <= 4294967295 ? t : null : (n = le.exec(t)) ? parseInt(n[1] + "ff", 16) >>> 0 : ee.hasOwnProperty(t) ? ee[t] : (n = ie.exec(t)) ? (he(n[1]) << 24 | he(n[2]) << 16 | he(n[3]) << 8 | 255) >>> 0 : (n = oe.exec(t)) ? (he(n[1]) << 24 | he(n[2]) << 16 | he(n[3]) << 8 | ge(n[4])) >>> 0 : (n = se.exec(t)) ? parseInt(n[1] + n[1] + n[2] + n[2] + n[3] + n[3] + "ff", 16) >>> 0 : (n = fe.exec(t)) ? parseInt(n[1], 16) >>> 0 : (n = ce.exec(t)) ? parseInt(n[1] + n[1] + n[2] + n[2] + n[3] + n[3] + n[4] + n[4], 16) >>> 0 : (n = ae.exec(t)) ? (255 | pe(me(n[1]), ye(n[2]), ye(n[3]))) >>> 0 : (n = ue.exec(t)) ? (pe(me(n[1]), ye(n[2]), ye(n[3])) | ge(n[4])) >>> 0 : null;
        return null === r ? e : "rgba(" + ((4278190080 & (r = r || 0)) >>> 24) + ", " + ((16711680 & r) >>> 16) + ", " + ((65280 & r) >>> 8) + ", " + (255 & r) / 255 + ")"
    }
    var be = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g
      , we = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi
      , ke = new RegExp("(" + Object.keys(ee).join("|") + ")","g")
      , Ae = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    }
      , Ve = ["Webkit", "Ms", "Moz", "O"];
    Ae = Object.keys(Ae).reduce(function(n, r) {
        return Ve.forEach(function(e) {
            return n[e + (t = r).charAt(0).toUpperCase() + t.substring(1)] = n[r];
            var t
        }),
        n
    }, Ae);
    var xe = {};
    g(function(e) {
        return new Y(e)
    }),
    f("div"),
    a(function(n) {
        var r = n.output.map(function(e) {
            return e.replace(we, ve)
        }).map(function(e) {
            return e.replace(ke, ve)
        })
          , i = r[0].match(be).map(function() {
            return []
        });
        r.forEach(function(e) {
            e.match(be).forEach(function(e, t) {
                return i[t].push(+e)
            })
        });
        var o = r[0].match(be).map(function(e, t) {
            return C(R({}, n, {
                output: i[t]
            }))
        });
        return function(e) {
            var t = 0;
            return r[0].replace(be, function() {
                return o[t++](e)
            }).replace(/rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, function(e, t, n, r, i) {
                return "rgba(" + Math.round(t) + ", " + Math.round(n) + ", " + Math.round(r) + ", " + i + ")"
            })
        }
    }),
    r(ee),
    n(function(e, t) {
        if (e.nodeType && void 0 !== e.setAttribute) {
            var n = t.style
              , r = t.children
              , i = t.scrollTop
              , o = t.scrollLeft
              , a = F(t, ["style", "children", "scrollTop", "scrollLeft"])
              , u = "filter" === e.nodeName || e.parentNode && "filter" === e.parentNode.nodeName;
            for (var s in void 0 !== i && (e.scrollTop = i),
            void 0 !== o && (e.scrollLeft = o),
            void 0 !== r && (e.textContent = r),
            n)
                if (n.hasOwnProperty(s)) {
                    var c = 0 === s.indexOf("--")
                      , l = (h = n[p = s],
                    m = c,
                    null == h || "boolean" == typeof h || "" === h ? "" : m || "number" != typeof h || 0 === h || Ae.hasOwnProperty(p) && Ae[p] ? ("" + h).trim() : h + "px");
                    "float" === s && (s = "cssFloat"),
                    c ? e.style.setProperty(s, l) : e.style[s] = l
                }
            for (var f in a) {
                var d = u ? f : xe[f] || (xe[f] = f.replace(/([A-Z])/g, function(e) {
                    return "-" + e.toLowerCase()
                }));
                void 0 !== e.getAttribute(d) && e.setAttribute(d, a[f])
            }
        } else {
            return !1;
            var p, h, m
        }
    }, function(e) {
        return e
    });
    var Ee, je, Se = (void 0 === (je = !(Ee = function(f) {
        return b.forwardRef(function(e, r) {
            var n = w()
              , t = b.useRef(!0)
              , i = b.useRef(null)
              , o = b.useRef(null)
              , a = b.useCallback(function(e) {
                var t = i.current;
                i.current = new v(e,function() {
                    var e = !1;
                    o.current && (e = p.fn(o.current, i.current.getAnimatedValue())),
                    o.current && !1 !== e || n()
                }
                ),
                t && t.detach()
            }, []);
            b.useEffect(function() {
                return function() {
                    t.current = !1,
                    i.current && i.current.detach()
                }
            }, []),
            b.useImperativeHandle(r, function() {
                return m(o, t, n)
            }),
            a(e);
            var u, s = i.current.getValue(), c = (s.scrollTop,
            s.scrollLeft,
            F(s, ["scrollTop", "scrollLeft"])), l = (u = f,
            !M.fun(u) || u.prototype instanceof d.Component ? function(e) {
                return o.current = (t = e,
                (n = r) && (M.fun(n) ? n(t) : M.obj(n) && (n.current = t)),
                t);
                var t, n
            }
            : void 0);
            return d.createElement(f, R({}, c, {
                ref: l
            }))
        })
    }
    )) && (je = !0),
    function(e) {
        return (M.arr(e) ? e : Object.keys(e)).reduce(function(e, t) {
            var n = je ? t[0].toLowerCase() + t.substring(1) : t;
            return e[n] = Ee(n),
            e
        }, Ee)
    }
    ), Oe = Se(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"]);
    e.apply = Se,
    e.config = {
        default: {
            tension: 170,
            friction: 26
        },
        gentle: {
            tension: 120,
            friction: 14
        },
        wobbly: {
            tension: 180,
            friction: 12
        },
        stiff: {
            tension: 210,
            friction: 20
        },
        slow: {
            tension: 280,
            friction: 60
        },
        molasses: {
            tension: 280,
            friction: 120
        }
    },
    e.update = j,
    e.animated = Oe,
    e.a = Oe,
    e.interpolate = function(e, t, n) {
        return e && new P(e,t,n)
    }
    ,
    e.Globals = y,
    e.useSpring = function(e) {
        var t = M.fun(e)
          , n = q(1, t ? e : [e])
          , r = n[0]
          , i = n[1]
          , o = n[2];
        return t ? [r[0], i, o] : r
    }
    ,
    e.useTrail = function(e, t) {
        var n = b.useRef(!1)
          , r = M.fun(t)
          , o = z(t)
          , a = b.useRef()
          , i = q(e, function(e, t) {
            return 0 === e && (a.current = []),
            a.current.push(t),
            R({}, o, {
                config: z(o.config, e),
                attach: 0 < e && function() {
                    return a.current[e - 1]
                }
            })
        })
          , u = i[0]
          , s = i[1]
          , c = i[2]
          , l = b.useMemo(function() {
            return function(i) {
                return s(function(e, t) {
                    i.reverse;
                    var n = i.reverse ? e + 1 : e - 1
                      , r = a.current[n];
                    return R({}, i, {
                        config: z(i.config || o.config, e),
                        attach: r && function() {
                            return r
                        }
                    })
                })
            }
        }, [e, o.reverse]);
        return b.useEffect(function() {
            n.current && !r && l(t)
        }),
        b.useEffect(function() {
            n.current = !0
        }, []),
        r ? [u, l, c] : u
    }
    ,
    e.useTransition = function(e, t, n) {
        var r = R({
            items: e,
            keys: t || function(e) {
                return e
            }
        }, n)
          , i = J(r)
          , o = i.lazy
          , l = void 0 !== o && o
          , a = (i.unique,
        i.reset)
          , f = void 0 !== a && a
          , d = (i.enter,
        i.leave,
        i.update,
        i.onDestroyed)
          , p = (i.keys,
        i.items,
        i.onFrame)
          , h = i.onRest
          , m = i.onStart
          , g = i.ref
          , y = F(i, ["lazy", "unique", "reset", "enter", "leave", "update", "onDestroyed", "keys", "items", "onFrame", "onRest", "onStart", "ref"])
          , u = w()
          , s = b.useRef(!1)
          , v = b.useRef({
            mounted: !1,
            first: !0,
            deleted: [],
            current: {},
            transitions: [],
            prevProps: {},
            paused: !!r.ref,
            instances: !s.current && new Map,
            forceUpdate: u
        });
        return b.useImperativeHandle(r.ref, function() {
            return {
                start: function() {
                    return Promise.all(Array.from(v.current.instances).map(function(e) {
                        var t = e[1];
                        return new Promise(function(e) {
                            return t.start(e)
                        }
                        )
                    }))
                },
                stop: function(t) {
                    return Array.from(v.current.instances).forEach(function(e) {
                        return e[1].stop(t)
                    })
                },
                get controllers() {
                    return Array.from(v.current.instances).map(function(e) {
                        return e[1]
                    })
                }
            }
        }),
        v.current = function(e, t) {
            var o = e.first
              , n = e.prevProps
              , r = F(e, ["first", "prevProps"])
              , i = J(t)
              , a = i.items
              , u = i.keys
              , s = i.initial
              , c = i.from
              , l = i.enter
              , f = i.leave
              , d = i.update
              , p = i.trail
              , h = void 0 === p ? 0 : p
              , m = i.unique
              , g = i.config
              , y = i.order
              , v = void 0 === y ? [Q, Z, B] : y
              , b = J(n)
              , w = b.keys
              , k = b.items
              , A = R({}, r.current)
              , V = [].concat(r.deleted)
              , x = Object.keys(A)
              , E = new Set(x)
              , j = new Set(u)
              , S = u.filter(function(e) {
                return !E.has(e)
            })
              , O = r.transitions.filter(function(e) {
                return !e.destroyed && !j.has(e.originalKey)
            }).map(function(e) {
                return e.originalKey
            })
              , C = u.filter(function(e) {
                return E.has(e)
            })
              , P = -h;
            for (; v.length; ) {
                switch (v.shift()) {
                case Q:
                    S.forEach(function(t, e) {
                        m && V.find(function(e) {
                            return e.originalKey === t
                        }) && (V = V.filter(function(e) {
                            return e.originalKey !== t
                        }));
                        var n = u.indexOf(t)
                          , r = a[n]
                          , i = o && void 0 !== s ? "initial" : Q;
                        A[t] = {
                            slot: i,
                            originalKey: t,
                            key: m ? String(t) : H++,
                            item: r,
                            trail: P += h,
                            config: z(g, r, i),
                            from: z(o && void 0 !== s ? s || {} : c, r),
                            to: z(l, r)
                        }
                    });
                    break;
                case Z:
                    O.forEach(function(e) {
                        var t = w.indexOf(e)
                          , n = k[t]
                          , r = Z;
                        V.unshift(R({}, A[e], {
                            slot: r,
                            destroyed: !0,
                            left: w[Math.max(0, t - 1)],
                            right: w[Math.min(w.length, t + 1)],
                            trail: P += h,
                            config: z(g, n, r),
                            to: z(f, n)
                        })),
                        delete A[e]
                    });
                    break;
                case B:
                    C.forEach(function(e) {
                        var t = u.indexOf(e)
                          , n = a[t];
                        A[e] = R({}, A[e], {
                            item: n,
                            slot: B,
                            trail: P += h,
                            config: z(g, n, B),
                            to: z(d, n)
                        })
                    })
                }
            }
            var q = u.map(function(e) {
                return A[e]
            });
            return V.forEach(function(e) {
                var t, n = e.left, r = (e.right,
                F(e, ["left", "right"]));
                -1 !== (t = q.findIndex(function(e) {
                    return e.originalKey === n
                })) && (t += 1),
                t = Math.max(0, t),
                q = [].concat(q.slice(0, t), [r], q.slice(t))
            }),
            R({}, r, {
                changed: S.length || O.length || C.length,
                first: o && 0 === S.length,
                transitions: q,
                current: A,
                deleted: V,
                prevProps: t
            })
        }(v.current, r),
        v.current.changed && v.current.transitions.forEach(function(t) {
            var n = t.slot
              , e = t.from
              , r = t.to
              , i = t.config
              , o = t.trail
              , a = t.key
              , u = t.item;
            v.current.instances.has(a) || v.current.instances.set(a, new _);
            var s = v.current.instances.get(a)
              , c = R({}, y, {
                to: r,
                from: e,
                config: i,
                ref: g,
                onRest: function(e) {
                    v.current.mounted && (t.destroyed && (g || l || X(v, a),
                    d && d(u)),
                    !Array.from(v.current.instances).some(function(e) {
                        return !e[1].idle
                    }) && (g || l) && 0 < v.current.deleted.length && X(v),
                    h && h(u, n, e))
                },
                onStart: m && function() {
                    return m(u, n)
                }
                ,
                onFrame: p && function(e) {
                    return p(u, n, e)
                }
                ,
                delay: o,
                reset: f && n === Q
            });
            s.update(c),
            v.current.paused || s.start()
        }),
        b.useEffect(function() {
            return v.current.mounted = s.current = !0,
            function() {
                v.current.mounted = s.current = !1,
                Array.from(v.current.instances).map(function(e) {
                    return e[1].destroy()
                }),
                v.current.instances.clear()
            }
        }, []),
        v.current.transitions.map(function(e) {
            var t = e.item
              , n = e.slot
              , r = e.key;
            return {
                item: t,
                key: r,
                state: n,
                props: v.current.instances.get(r).getValues()
            }
        })
    }
    ,
    e.useChain = function(e, o, a) {
        void 0 === a && (a = 1e3);
        var t = b.useRef();
        b.useEffect(function() {
            M.equ(e, t.current) ? e.forEach(function(e) {
                var t = e.current;
                return t && t.start()
            }) : o ? e.forEach(function(e, t) {
                var n = e.current;
                if (n) {
                    var r = n.controllers;
                    if (r.length) {
                        var i = a * o[t];
                        r.forEach(function(e) {
                            e.queue = e.queue.map(function(e) {
                                return R({}, e, {
                                    delay: e.delay + i
                                })
                            }),
                            e.start()
                        })
                    }
                }
            }) : e.reduce(function(e, t, n) {
                var r = t.current;
                return e.then(function() {
                    return r.start()
                })
            }, Promise.resolve()),
            t.current = e
        })
    }
    ,
    e.useSprings = q,
    Object.defineProperty(e, "__esModule", {
        value: !0
    })
});
