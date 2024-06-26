(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
    (global = global || self, factory(global.ReactUseGesture = {}, global.React));
  }(this, (function (exports, React) { 'use strict';
  
    React = React && Object.prototype.hasOwnProperty.call(React, 'default') ? React['default'] : React;
  
    // vector add
    function addV(v1, v2) {
      return v1.map(function (v, i) {
        return v + v2[i];
      });
    } // vector substract
  
    function subV(v1, v2) {
      return v1.map(function (v, i) {
        return v - v2[i];
      });
    }
    /**
     * Calculates velocity
     * @param delta the difference between current and previous vectors
     * @param delta_t the time offset
     * @param len the length of the delta vector
     * @returns velocity
     */
  
    function calculateVelocity(delta, delta_t, len) {
      len = len || Math.hypot.apply(Math, delta);
      return delta_t ? len / delta_t : 0;
    }
    /**
     * Calculates velocities vector
     * @template T the expected vector type
     * @param delta the difference between current and previous vectors
     * @param delta_t the time offset
     * @returns velocities vector
     */
  
    function calculateVelocities(delta, delta_t) {
      return delta_t ? delta.map(function (v) {
        return v / delta_t;
      }) : Array(delta.length).fill(0);
    }
    /**
     * Calculates distance
     * @param movement the difference between current and initial vectors
     * @returns distance
     */
  
    function calculateDistance(movement) {
      return Math.hypot.apply(Math, movement);
    }
    /**
     * Calculates direction
     * @template T the expected vector type
     * @param delta
     * @param len
     * @returns direction
     */
  
    function calculateDirection(delta, len) {
      len = len || Math.hypot.apply(Math, delta) || 1;
      return delta.map(function (v) {
        return v / len;
      });
    }
    /**
     * Calculates all kinematics
     * @template T the expected vector type
     * @param movement the difference between current and initial vectors
     * @param delta the difference between current and previous vectors
     * @param delta_t the time difference between current and previous timestamps
     * @returns all kinematics
     */
  
    function calculateAllKinematics(movement, delta, delta_t) {
      var len = Math.hypot.apply(Math, delta);
      return {
        velocities: calculateVelocities(delta, delta_t),
        velocity: calculateVelocity(delta, delta_t, len),
        distance: calculateDistance(movement),
        direction: calculateDirection(delta, len)
      };
    }
    function getIntentionalDisplacement(movement, threshold) {
      var abs = Math.abs(movement);
      return abs >= threshold ? Math.sign(movement) * threshold : false;
    }
  
    function minMax(value, min, max) {
      return Math.max(min, Math.min(value, max));
    } // Based on @aholachek ;)
    // https://twitter.com/chpwn/status/285540192096497664
    // iOS constant = 0.55
    // https://medium.com/@nathangitter/building-fluid-interfaces-ios-swift-9732bb934bf5
  
  
    function rubberband2(distance, constant) {
      // default constant from the article is 0.7
      return Math.pow(distance, constant * 5);
    }
  
    function rubberband(distance, dimension, constant) {
      if (dimension === 0 || Math.abs(dimension) === Infinity) return rubberband2(distance, constant);
      return distance * dimension * constant / (dimension + constant * distance);
    }
  
    function rubberbandIfOutOfBounds(position, min, max, constant) {
      if (constant === void 0) {
        constant = 0.15;
      }
  
      if (constant === 0) return minMax(position, min, max);
  
      if (position < min) {
        return -rubberband(min - position, max - min, constant) + min;
      }
  
      if (position > max) {
        return rubberband(position - max, max - min, constant) + max;
      }
  
      return position;
    }
  
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }
  
    function _extends() {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
  
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
  
        return target;
      };
  
      return _extends.apply(this, arguments);
    }
  
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
  
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
  
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
  
      return target;
    }
  
    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
  
      return self;
    }
  
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
  
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
  
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  
      return arr2;
    }
  
    function _createForOfIteratorHelperLoose(o) {
      var i = 0;
  
      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) return function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        };
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
  
      i = o[Symbol.iterator]();
      return i.next.bind(i);
    }
  
    // blank function
    function noop() {} // returns a function that chains all functions given as parameters
  
    var chainFns = function chainFns() {
      for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
        fns[_key] = arguments[_key];
      }
  
      return function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
  
        return fns.forEach(function (fn) {
          return fn.apply(void 0, args);
        });
      };
    };
    var def = {
      array: function array(value) {
        return Array.isArray(value) ? value : [value, value];
      },
      withDefault: function withDefault(value, defaultIfUndefined) {
        return value !== void 0 ? value : defaultIfUndefined;
      }
    };
    function matchKeysFromObject(obj, matchingObject) {
      var o = {};
      Object.entries(obj).forEach(function (_ref) {
        var key = _ref[0],
            value = _ref[1];
        return (value !== void 0 || key in matchingObject) && (o[key] = value);
      });
      return o;
    }
    function valueFn(v) {
      return typeof v === 'function' ? v() : v;
    }
  
    function getInitialState() {
      // common initial state for all gestures
      var initialCommon = {
        _active: false,
        _blocked: false,
        _intentional: [false, false],
        _movement: [0, 0],
        _initial: [0, 0],
        _lastEventType: undefined,
        event: undefined,
        // currentTarget: undefined,
        // pointerId: undefined,
        values: [0, 0],
        velocities: [0, 0],
        delta: [0, 0],
        movement: [0, 0],
        offset: [0, 0],
        lastOffset: [0, 0],
        direction: [0, 0],
        initial: [0, 0],
        previous: [0, 0],
        first: false,
        last: false,
        active: false,
        timeStamp: 0,
        startTime: 0,
        elapsedTime: 0,
        cancel: noop,
        canceled: false,
        memo: undefined,
        args: undefined
      }; // initial state for coordinates-based gestures
  
      var initialCoordinates = {
        axis: undefined,
        xy: [0, 0],
        vxvy: [0, 0],
        velocity: 0,
        distance: 0
      }; // initial state for distance and angle-based gestures (pinch)
  
      var initialDistanceAngle = {
        da: [0, 0],
        vdva: [0, 0],
        origin: undefined,
        turns: 0
      }; // initial state object (used by the gesture controller)
  
      return {
        shared: {
          hovering: false,
          scrolling: false,
          wheeling: false,
          dragging: false,
          moving: false,
          pinching: false,
          touches: 0,
          buttons: 0,
          down: false,
          shiftKey: false,
          altKey: false,
          metaKey: false,
          ctrlKey: false
        },
        drag: _extends({}, initialCommon, {}, initialCoordinates, {
          _isTap: true,
          _delayedEvent: false,
          tap: false,
          swipe: [0, 0]
        }),
        pinch: _extends({}, initialCommon, {}, initialDistanceAngle),
        wheel: _extends({}, initialCommon, {}, initialCoordinates),
        move: _extends({}, initialCommon, {}, initialCoordinates),
        scroll: _extends({}, initialCommon, {}, initialCoordinates)
      };
    }
  
    var setListeners = function setListeners(add) {
      return function (el, listeners, options) {
        var action = add ? 'addEventListener' : 'removeEventListener';
        listeners.forEach(function (_ref) {
          var eventName = _ref[0],
              fn = _ref[1];
          return el[action](eventName, fn, options);
        });
      };
    };
    /**
     * Whether the browser supports GestureEvent (ie Safari)
     * @returns true if the browser supports gesture event
     */
  
  
    function supportsGestureEvents() {
      try {
        // TODO [TS] possibly find GestureEvent definitions?
        // @ts-ignore: no type definitions for webkit GestureEvents
        return 'constructor' in GestureEvent;
      } catch (e) {
        return false;
      }
    }
    var addListeners = /*#__PURE__*/setListeners(true);
    var removeListeners = /*#__PURE__*/setListeners(false);
    /**
     * Gets modifier keys from event
     * @param event
     * @returns modifier keys
     */
  
    function getModifierKeys(event) {
      var shiftKey = event.shiftKey,
          altKey = event.altKey,
          metaKey = event.metaKey,
          ctrlKey = event.ctrlKey;
      return {
        shiftKey: shiftKey,
        altKey: altKey,
        metaKey: metaKey,
        ctrlKey: ctrlKey
      };
    }
  
    function getTouchEvents(event) {
      if ('touches' in event) {
        var touches = event.touches,
            changedTouches = event.changedTouches;
        return touches.length > 0 ? touches : changedTouches;
      }
  
      return null;
    }
  
    function getGenericEventData(event) {
      var buttons = 'buttons' in event ? event.buttons : 0;
      var touchEvents = getTouchEvents(event);
      var touches = touchEvents && touchEvents.length || 0;
      var down = touches > 0 || buttons > 0;
      return _extends({
        touches: touches,
        down: down,
        buttons: buttons
      }, getModifierKeys(event));
    }
    /**
     * Gets scroll event values
     * @param event
     * @returns scroll event values
     */
  
    function getScrollEventValues(event) {
      // If the currentTarget is the window then we return the scrollX/Y position.
      // If not (ie the currentTarget is a DOM element), then we return scrollLeft/Top
      var _event$currentTarget = event.currentTarget,
          scrollX = _event$currentTarget.scrollX,
          scrollY = _event$currentTarget.scrollY,
          scrollLeft = _event$currentTarget.scrollLeft,
          scrollTop = _event$currentTarget.scrollTop;
      return {
        values: [scrollX || scrollLeft || 0, scrollY || scrollTop || 0]
      };
    }
    /**
     * Gets wheel event values.
     * @param event
     * @returns wheel event values
     */
  
    function getWheelEventValues(event) {
      var deltaX = event.deltaX,
          deltaY = event.deltaY; //TODO implement polyfill ?
      // https://developer.mozilla.org/en-US/docs/Web/Events/wheel#Polyfill
  
      return {
        values: [deltaX, deltaY]
      };
    }
    /**
     * Gets pointer event values.
     * @param event
     * @returns pointer event values
     */
  
    function getPointerEventValues(event) {
      var touchEvents = getTouchEvents(event);
  
      var _ref2 = touchEvents ? touchEvents[0] : event,
          clientX = _ref2.clientX,
          clientY = _ref2.clientY;
  
      return {
        values: [clientX, clientY]
      };
    }
    var WEBKIT_DISTANCE_SCALE_FACTOR = 260;
    /**
     * Gets webkit gesture event values.
     * @param event
     * @returns webkit gesture event values
     */
  
    function getWebkitGestureEventValues(event) {
      return {
        values: [event.scale * WEBKIT_DISTANCE_SCALE_FACTOR, event.rotation]
      };
    }
    /**
     * Gets two touches event data
     * @param event
     * @returns two touches event data
     */
  
    function getTwoTouchesEventData(event) {
      var touches = event.touches;
      var dx = touches[1].clientX - touches[0].clientX;
      var dy = touches[1].clientY - touches[0].clientY;
      var values = [Math.hypot(dx, dy), -(Math.atan2(dx, dy) * 180) / Math.PI];
      var origin = [(touches[1].clientX + touches[0].clientX) / 2, (touches[1].clientY + touches[0].clientY) / 2];
      return {
        values: values,
        origin: origin
      };
    }
  
    /**
     * The controller will keep track of the state for all gestures and also keep
     * track of timeouts, and window listeners.
     *
     * @template BinderType the type the bind function should return
     */
  
    var Controller = function Controller() {
      var _this = this;
  
      this.state = getInitialState(); // state for all gestures
  
      this.timeouts = {}; // keeping track of timeouts for debounced gestures (such as move, scroll, wheel)
  
      this.domListeners = []; // when config.domTarget is set, we attach events directly to the dom
  
      this.windowListeners = {}; // keeps track of window listeners added by gestures (drag only at the moment)
  
      this.bindings = {}; // an object holding the handlers associated to the gestures
  
      /**
       * Function ran on component unmount: cleans timeouts and removes dom listeners set by the bind function.
       */
  
      this.clean = function () {
        _this.resetBindings();
  
        Object.values(_this.timeouts).forEach(clearTimeout);
        Object.keys(_this.windowListeners).forEach(function (stateKey) {
          return _this.removeWindowListeners(stateKey);
        });
      };
      /**
       * Function run every time the bind function is run (ie on every render).
       * Resets the binding object and remove dom listeners attached to config.domTarget
       */
  
  
      this.resetBindings = function () {
        _this.bindings = {};
  
        var domTarget = _this.getDomTarget();
  
        if (domTarget) {
          removeListeners(domTarget, _this.domListeners, _this.config.eventOptions);
          _this.domListeners = [];
        }
      };
      /**
       * Returns the domTarget element and parses a ref if needed.
       */
  
  
      this.getDomTarget = function () {
        var domTarget = _this.config.domTarget;
        return domTarget && 'current' in domTarget ? domTarget.current : domTarget;
      };
      /**
       * Commodity function to let recognizers simply add listeners to config.window.
       */
  
  
      this.addWindowListeners = function (stateKey, listeners) {
        if (!_this.config.window) return; // we use this.windowListeners to keep track of the listeners we add
  
        _this.windowListeners[stateKey] = listeners;
        addListeners(_this.config.window, listeners, _this.config.eventOptions);
      };
      /**
       * Commodity function to let recognizers simply remove listeners to config.window.
       */
  
  
      this.removeWindowListeners = function (stateKey) {
        if (!_this.config.window) return;
        var listeners = _this.windowListeners[stateKey];
  
        if (listeners) {
          removeListeners(_this.config.window, listeners, _this.config.eventOptions);
          delete _this.windowListeners[stateKey];
        }
      };
      /**
       * When config.domTarget is set, this function will add dom listeners to it
       */
  
  
      this.addDomTargetListeners = function (target) {
        /** We iterate on the entries of this.binding for each event, then we chain
         * the array of functions mapped to it and push them to this.domListeners
         */
        Object.entries(_this.bindings).forEach(function (_ref) {
          var event = _ref[0],
              fns = _ref[1];
  
          _this.domListeners.push([event.substr(2).toLowerCase(), chainFns.apply(void 0, fns)]);
        });
        addListeners(target, _this.domListeners, _this.config.eventOptions);
      };
      /**
       * this.bindings is an object which keys match ReactEventHandlerKeys.
       * Since a recognizer might want to bind a handler function to an event key already used by a previously
       * added recognizer, we need to make sure that each event key is an array of all the functions mapped for
       * that key.
       */
  
  
      this.addBindings = function (eventNames, fn) {
        var eventNamesArray = !Array.isArray(eventNames) ? [eventNames] : eventNames;
        eventNamesArray.forEach(function (eventName) {
          if (_this.bindings[eventName]) _this.bindings[eventName].push(fn);else _this.bindings[eventName] = [fn];
        });
      };
      /**
       * getBindings will return an object that will be bound by users
       * to the react component they want to interact with.
       */
  
  
      this.getBindings = function () {
        var bindings = {};
        var captureString = _this.config.captureString;
        Object.entries(_this.bindings).forEach(function (_ref2) {
          var event = _ref2[0],
              fns = _ref2[1];
          var fnsArray = Array.isArray(fns) ? fns : [fns];
          var key = event + captureString;
          bindings[key] = chainFns.apply(void 0, fnsArray);
        });
        return bindings;
      };
  
      this.getBind = function () {
        // If config.domTarget is set we add event listeners to it and return the clean function.
        if (_this.config.domTarget) {
          var domTarget = _this.getDomTarget();
  
          domTarget && _this.addDomTargetListeners(domTarget);
          return _this.clean;
        } // If not, we return an object that contains gesture handlers mapped to react handler event keys.
  
  
        return _this.getBindings();
      };
    };
  
    /**
     * @private
     *
     * Utility hook called by all gesture hooks and that will be responsible for the internals.
     *
     * @param {Partial<InternalHandlers>} handlers
     * @param {RecognizerClasses} classes
     * @param {InternalConfig} config
     * @param {NativeHandlersPartial} nativeHandlers - native handlers such as onClick, onMouseDown, etc.
     * @returns {(...args: any[]) => HookReturnType<Config>}
     */
  
    function useRecognizers(handlers, classes, config, nativeHandlers) {
      // The gesture controller keeping track of all gesture states
      var controller = React.useMemo(function () {
        var current = new Controller();
        /**
         * The bind function will create gesture recognizers and return the right
         * bind object depending on whether `domTarget` was specified in the config object.
         */
  
        var bind = function bind() {
          current.resetBindings();
  
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
  
          for (var _iterator = _createForOfIteratorHelperLoose(classes), _step; !(_step = _iterator()).done;) {
            var RecognizerClass = _step.value;
            new RecognizerClass(current, args).addBindings();
          } // we also add event bindings for native handlers
  
  
          if (controller.nativeRefs) {
            for (var eventName in controller.nativeRefs) {
              current.addBindings(eventName, // @ts-ignore we're cheating when it comes to event type :(
              controller.nativeRefs[eventName]);
            }
          }
  
          return current.getBind();
        };
  
        return {
          nativeRefs: nativeHandlers,
          current: current,
          bind: bind
        };
      }, []); // We reassign the config and handlers to the controller on every render.
  
      controller.current.config = config;
      controller.current.handlers = handlers; // We assign nativeHandlers, otherwise they won't be refreshed on the next render.
  
      controller.nativeRefs = nativeHandlers; // Run controller clean functions on unmount.
  
      React.useEffect(function () {
        return controller.current.clean;
      }, []);
      return controller.bind;
    }
  
    /**
     * @private
     * Recognizer abstract class.
     *
     * @protected
     * @abstract
     * @type {StateKey<T>} whether the Recognizer should deal with coordinates or distance / angle
     */
  
    var Recognizer = /*#__PURE__*/function () {
      /**
       * Creates an instance of a gesture recognizer.
       * @param stateKey drag, move, pinch, etc.
       * @param controller the controller attached to the gesture
       * @param [args] the args that should be passed to the gesture handler
       */
      function Recognizer(stateKey, controller, args) {
        var _this = this;
  
        if (args === void 0) {
          args = [];
        }
  
        this.stateKey = stateKey;
        this.controller = controller;
        this.args = args;
        this.debounced = true; // Convenience method to set a timeout for a given gesture
  
        this.setTimeout = function (callback, ms) {
          var _window;
  
          if (ms === void 0) {
            ms = 140;
          }
  
          for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }
  
          _this.controller.timeouts[_this.stateKey] = (_window = window).setTimeout.apply(_window, [callback, ms].concat(args));
        }; // Convenience method to clear a timeout for a given gesture
  
  
        this.clearTimeout = function () {
          clearTimeout(_this.controller.timeouts[_this.stateKey]);
        }; // Convenience method to add window listeners for a given gesture
  
  
        this.addWindowListeners = function (listeners) {
          _this.controller.addWindowListeners(_this.stateKey, listeners);
        }; // Convenience method to remove window listeners for a given gesture
  
  
        this.removeWindowListeners = function () {
          _this.controller.removeWindowListeners(_this.stateKey);
        };
        /**
         * Returns the reinitialized start state for the gesture.
         * Should be common to all gestures.
         *
         * @param {Vector2} values
         * @param {UseGestureEvent} event
         * @returns - the start state for the gesture
         */
  
  
        this.getStartGestureState = function (values, event) {
          return _extends({}, getInitialState()[_this.stateKey], {
            _active: true,
            values: values,
            initial: values,
            offset: _this.state.offset,
            lastOffset: _this.state.offset,
            startTime: event.timeStamp
          });
        }; // Runs rubberband on a vector
  
  
        this.rubberband = function (vector, rubberband) {
          var bounds = _this.config.bounds;
          /**
           * [x, y]: [rubberband(x, min, max), rubberband(y, min, max)]
           */
  
          return vector.map(function (v, i) {
            return rubberbandIfOutOfBounds(v, bounds[i][0], bounds[i][1], rubberband[i]);
          });
        };
        /**
         * Fires the gesture handler
         *
         * @param {boolean} [forceFlag] - if true, then the handler will fire even if the gesture is not intentional
         */
  
  
        this.fireGestureHandler = function (forceFlag) {
          /**
           * If the gesture has been blocked (this can happen when the gesture has started in an unwanted direction),
           * clean everything and don't do anything.
           */
          if (_this.state._blocked) {
            // we need debounced gestures to end by themselves
            if (!_this.debounced) {
              _this.state._active = false;
  
              _this.clean();
            }
  
            return null;
          } // If the gesture has no intentional dimension, don't do fire the handler.
  
  
          var _this$state$_intentio = _this.state._intentional,
              intentionalX = _this$state$_intentio[0],
              intentionalY = _this$state$_intentio[1];
          if (!forceFlag && intentionalX === false && intentionalY === false) return null;
          var _this$state = _this.state,
              _active = _this$state._active,
              active = _this$state.active;
          _this.state.active = _active;
          _this.state.first = _active && !active; // `first` is true when the gesture becomes active
  
          _this.state.last = active && !_active; // `last` is true when the gesture becomes inactive
  
          _this.controller.state.shared[_this.ingKey] = _active; // Sets dragging, pinching, etc. to the gesture active state
  
          var state = _extends({}, _this.controller.state.shared, {}, _this.state, {}, _this.mapStateValues(_this.state)); // @ts-ignore
  
  
          var newMemo = _this.handler(state); // Sets memo to the returned value of the handler (unless it's not undefined)
  
  
          _this.state.memo = newMemo !== void 0 ? newMemo : _this.state.memo; // Cleans the gesture when the gesture is no longer active.
  
          if (!_active) _this.clean();
          return state;
        };
      } // Returns the gesture config
  
  
      var _proto = Recognizer.prototype;
  
      // Conveninence method to update the shared state
      _proto.updateSharedState = function updateSharedState(sharedState) {
        Object.assign(this.controller.state.shared, sharedState);
      } // Conveninence method to update the gesture state
      ;
  
      _proto.updateGestureState = function updateGestureState(gestureState) {
        Object.assign(this.state, gestureState);
      }
      /**
       * Returns a generic, common payload for all gestures from an event.
       *
       * @param {UseGestureEvent} event
       * @param {boolean} [isStartEvent]
       * @returns - the generic gesture payload
       */
      ;
  
      _proto.getGenericPayload = function getGenericPayload(event, isStartEvent) {
        var timeStamp = event.timeStamp,
            type = event.type;
        var _this$state2 = this.state,
            values = _this$state2.values,
            startTime = _this$state2.startTime;
        return {
          _lastEventType: type,
          event: event,
          timeStamp: timeStamp,
          elapsedTime: isStartEvent ? 0 : timeStamp - startTime,
          args: this.args,
          previous: values
        };
      }
      /**
       * Returns state properties depending on the movement and state.
       *
       * Should be overriden for custom behavior, doesn't do anything in the implementation
       * below.
       */
      ;
  
      _proto.checkIntentionality = function checkIntentionality(_intentional, _movement, _state) {
        return {
          _intentional: _intentional,
          _blocked: false
        };
      }
      /**
       * Returns basic movement properties for the gesture based on the next values and current state.
       */
      ;
  
      _proto.getMovement = function getMovement(values, state) {
        if (state === void 0) {
          state = this.state;
        }
  
        var _this$config = this.config,
            initial = _this$config.initial,
            threshold = _this$config.threshold,
            rubberband = _this$config.rubberband;
        var t0 = threshold[0],
            t1 = threshold[1];
        var _state2 = state,
            _initial = _state2._initial,
            _active = _state2._active,
            intentional = _state2._intentional,
            lastOffset = _state2.lastOffset,
            prevMovement = _state2.movement;
        var i0 = intentional[0],
            i1 = intentional[1];
  
        var _this$getInternalMove = this.getInternalMovement(values, state),
            _m0 = _this$getInternalMove[0],
            _m1 = _this$getInternalMove[1];
        /**
         * For both dimensions of the gesture, check its intentionality on each frame.
         */
  
  
        if (i0 === false) {
          i0 = getIntentionalDisplacement(_m0, t0);
        }
  
        if (i1 === false) {
          i1 = getIntentionalDisplacement(_m1, t1);
        } // Get gesture specific state properties based on intentionality and movement.
  
  
        var intentionalityCheck = this.checkIntentionality([i0, i1], [_m0, _m1], state);
        var _intentional = intentionalityCheck._intentional,
            _blocked = intentionalityCheck._blocked;
        var _i0 = _intentional[0],
            _i1 = _intentional[1];
        var _movement = [_m0, _m1];
        if (_i0 !== false && intentional[0] === false) _initial[0] = valueFn(initial)[0];
        if (_i1 !== false && intentional[1] === false) _initial[1] = valueFn(initial)[1];
        /**
         * If the gesture has been blocked (from gesture specific checkIntentionality),
         * stop right there.
         */
  
        if (_blocked) return _extends({}, intentionalityCheck, {
          _movement: _movement,
          delta: [0, 0]
        });
        /**
         * The movement sent to the handler has 0 in its dimensions when intentionality is false.
         * It is calculated from the actual movement minus the threshold.
         */
  
        var movement = [_i0 !== false ? _m0 - _i0 : valueFn(initial)[0], _i1 !== false ? _m1 - _i1 : valueFn(initial)[1]];
        var offset = addV(movement, lastOffset);
        /**
         * Rubberband should be 0 when the gesture is no longer active, so that movement
         * and offset can return within their bounds.
         */
  
        var _rubberband = _active ? rubberband : [0, 0];
  
        movement = this.rubberband(addV(movement, _initial), _rubberband); // rubberbanded movement
  
        return _extends({}, intentionalityCheck, {
          _initial: _initial,
          _movement: _movement,
          movement: movement,
          offset: this.rubberband(offset, _rubberband),
          delta: subV(movement, prevMovement)
        });
      } // Cleans the gesture. Can be overriden by gestures.
      ;
  
      _proto.clean = function clean() {
        this.clearTimeout();
        this.removeWindowListeners();
      };
  
      _createClass(Recognizer, [{
        key: "config",
        get: function get() {
          return this.controller.config[this.stateKey];
        } // Is the gesture enabled
  
      }, {
        key: "enabled",
        get: function get() {
          return this.controller.config.enabled && this.config.enabled;
        } // Returns the controller state for a given gesture
  
      }, {
        key: "state",
        get: function get() {
          return this.controller.state[this.stateKey];
        } // Returns the gesture handler
  
      }, {
        key: "handler",
        get: function get() {
          return this.controller.handlers[this.stateKey];
        }
      }]);
  
      return Recognizer;
    }();
  
    /**
     * @private
     * Abstract class for coordinates-based gesture recongizers
     * @abstract
     * @class CoordinatesRecognizer
     * @extends {Recognizer<T>}
     * @template T
     */
  
    var CoordinatesRecognizer = /*#__PURE__*/function (_Recognizer) {
      _inheritsLoose(CoordinatesRecognizer, _Recognizer);
  
      function CoordinatesRecognizer() {
        return _Recognizer.apply(this, arguments) || this;
      }
  
      var _proto = CoordinatesRecognizer.prototype;
  
      /**
       * Returns the real movement (without taking intentionality into acount)
       */
      _proto.getInternalMovement = function getInternalMovement(values, state) {
        return subV(values, state.initial);
      }
      /**
       * In coordinates-based gesture, this function will detect the first intentional axis,
       * lock the gesture axis if lockDirection is specified in the config, block the gesture
       * if the first intentional axis doesn't match the specified axis in config.
       *
       * @param {[FalseOrNumber, FalseOrNumber]} _intentional
       * @param {Vector2} _movement
       * @param {PartialGestureState<T>} state
       */
      ;
  
      _proto.checkIntentionality = function checkIntentionality(_intentional, _movement, state) {
        var _intentional2 = _intentional,
            _ix = _intentional2[0],
            _iy = _intentional2[1];
        var intentionalMovement = _ix !== false || _iy !== false;
        var axis = state.axis;
        var _blocked = false; // If the movement is intentional, we can compute axis.
  
        if (intentionalMovement) {
          var _movement$map = _movement.map(Math.abs),
              absX = _movement$map[0],
              absY = _movement$map[1];
  
          var _this$config = this.config,
              configAxis = _this$config.axis,
              lockDirection = _this$config.lockDirection; // We make sure we only set axis value if it hadn't been detected before.
  
          axis = axis || (absX > absY ? 'x' : absX < absY ? 'y' : undefined);
  
          if (!!configAxis || lockDirection) {
            if (!!axis) {
              // If the detected axis doesn't match the config axis we block the gesture
              if (!!configAxis && axis !== configAxis) _blocked = true;else {
                // Otherwise we prevent the gesture from updating the unwanted axis.
                var lockedIndex = axis === 'x' ? 1 : 0;
                _intentional[lockedIndex] = false;
              }
            } else {
              // Until we've detected the axis, we prevent the hnadler from updating.
              _intentional = [false, false];
            }
          }
        }
  
        return {
          _intentional: _intentional,
          _blocked: _blocked,
          axis: axis
        };
      };
  
      _proto.getKinematics = function getKinematics(values, event) {
        var timeStamp = this.state.timeStamp;
        var movementDetection = this.getMovement(values, this.state);
        var _blocked = movementDetection._blocked,
            delta = movementDetection.delta,
            movement = movementDetection.movement;
        if (_blocked) return movementDetection;
        var delta_t = event.timeStamp - timeStamp;
        var kinematics = calculateAllKinematics(movement, delta, delta_t);
        return _extends({
          values: values,
          delta: delta
        }, movementDetection, {}, kinematics);
      };
  
      _proto.mapStateValues = function mapStateValues(state) {
        return {
          xy: state.values,
          vxvy: state.velocities
        };
      };
  
      return CoordinatesRecognizer;
    }(Recognizer);
  
    var TAP_DISTANCE_THRESHOLD = 3;
    var SWIPE_MAX_ELAPSED_TIME = 220;
    var FILTER_REPEATED_EVENTS_DELAY = 200;
  
    var DragRecognizer = /*#__PURE__*/function (_CoordinatesRecognize) {
      _inheritsLoose(DragRecognizer, _CoordinatesRecognize);
  
      function DragRecognizer(controller, args) {
        var _this;
  
        _this = _CoordinatesRecognize.call(this, 'drag', controller, args) || this;
        _this.ingKey = 'dragging';
        _this.wasTouch = false;
  
        _this.isEventTypeTouch = function (type) {
          return !!type && type.indexOf('touch') === 0;
        };
  
        _this.dragShouldStart = function (event) {
          var _getGenericEventData = getGenericEventData(event),
              touches = _getGenericEventData.touches;
  
          var _lastEventType = _this.state._lastEventType;
          /**
           * This tries to filter out mouse events triggered by touch screens
           * */
          // If the previous gesture was touch-based, and the current one is mouse based,
          // this means that we might be dealing with mouse simulated events if they're close to
          // each other. We're only doing this check when we're not using pointer events.
  
          if (!_this.controller.config.pointer && _this.isEventTypeTouch(_lastEventType) && !_this.isEventTypeTouch(event.type)) {
            var delay = Math.abs(event.timeStamp - _this.state.startTime);
            if (delay < FILTER_REPEATED_EVENTS_DELAY) return false;
          }
  
          return _this.enabled && touches < 2;
        };
  
        _this.setPointers = function (event) {
          var currentTarget = event.currentTarget,
              pointerId = event.pointerId;
          if (currentTarget) currentTarget.setPointerCapture(pointerId);
  
          _this.updateGestureState({
            currentTarget: currentTarget,
            pointerId: pointerId
          });
        };
  
        _this.removePointers = function () {
          var _this$state = _this.state,
              currentTarget = _this$state.currentTarget,
              pointerId = _this$state.pointerId;
          if (currentTarget && pointerId) currentTarget.releasePointerCapture(pointerId);
        };
  
        _this.setListeners = function (isTouch) {
          _this.removeWindowListeners();
  
          var dragListeners = isTouch ? [['touchmove', _this.onDragChange], ['touchend', _this.onDragEnd], ['touchcancel', _this.onDragEnd]] : [['mousemove', _this.onDragChange], ['mouseup', _this.onDragEnd]];
  
          _this.addWindowListeners(dragListeners);
        };
  
        _this.onDragStart = function (event) {
          if (!_this.dragShouldStart(event)) return; // if pointers events
  
          if (_this.controller.config.pointer) _this.setPointers(event);else _this.setListeners(_this.isEventTypeTouch(event.type));
  
          if (_this.config.delay > 0) {
            _this.state._delayedEvent = true;
            if (typeof event.persist === 'function') event.persist();
  
            _this.setTimeout(function () {
              return _this.startDrag(event);
            }, _this.config.delay);
          } else {
            _this.startDrag(event);
          }
        };
  
        _this.onDragChange = function (event) {
          var canceled = _this.state.canceled;
          if (canceled) return;
  
          if (!_this.state._active) {
            if (_this.state._delayedEvent) {
              _this.clearTimeout();
  
              _this.startDrag(event);
            }
  
            return;
          }
  
          var genericEventData = getGenericEventData(event);
  
          if (!genericEventData.down) {
            _this.onDragEnd(event);
  
            return;
          }
  
          _this.updateSharedState(genericEventData);
  
          var _getPointerEventValue = getPointerEventValues(event),
              values = _getPointerEventValue.values;
  
          var kinematics = _this.getKinematics(values, event);
  
          var _isTap = _this.state._isTap;
          if (_isTap && calculateDistance(kinematics._movement) >= TAP_DISTANCE_THRESHOLD) _isTap = false;
  
          _this.updateGestureState(_extends({}, _this.getGenericPayload(event), {}, kinematics, {
            _isTap: _isTap,
            cancel: function cancel() {
              return _this.onCancel();
            }
          }));
  
          _this.fireGestureHandler();
        };
  
        _this.onDragEnd = function (event) {
          _this.state._active = false;
  
          _this.updateSharedState({
            down: false,
            buttons: 0,
            touches: 0
          });
  
          var _this$state2 = _this.state,
              _isTap = _this$state2._isTap,
              values = _this$state2.values,
              _this$state2$velociti = _this$state2.velocities,
              vx = _this$state2$velociti[0],
              vy = _this$state2$velociti[1],
              _this$state2$movement = _this$state2.movement,
              mx = _this$state2$movement[0],
              my = _this$state2$movement[1],
              _this$state2$_intenti = _this$state2._intentional,
              ix = _this$state2$_intenti[0],
              iy = _this$state2$_intenti[1];
  
          var endState = _extends({}, _this.getGenericPayload(event), {}, _this.getMovement(values));
  
          var elapsedTime = endState.elapsedTime;
          var _this$config = _this.config,
              _this$config$swipeVel = _this$config.swipeVelocity,
              svx = _this$config$swipeVel[0],
              svy = _this$config$swipeVel[1],
              _this$config$swipeDis = _this$config.swipeDistance,
              sx = _this$config$swipeDis[0],
              sy = _this$config$swipeDis[1];
          var swipe = [0, 0];
  
          if (elapsedTime < SWIPE_MAX_ELAPSED_TIME) {
            if (ix !== false && Math.abs(vx) > svx && Math.abs(mx) > sx) swipe[0] = Math.sign(vx);
            if (iy !== false && Math.abs(vy) > svy && Math.abs(my) > sy) swipe[1] = Math.sign(vy);
          }
  
          _this.updateGestureState(_extends({
            event: event
          }, endState, {
            tap: _isTap,
            swipe: swipe
          }));
  
          _this.fireGestureHandler(_this.config.filterTaps && _this.state._isTap);
        };
  
        _this.clean = function () {
          _CoordinatesRecognize.prototype.clean.call(_assertThisInitialized(_this));
  
          _this.state._delayedEvent = false;
          if (_this.controller.config.pointer) _this.removePointers();
        };
  
        _this.onCancel = function () {
          _this.updateGestureState({
            canceled: true,
            cancel: noop
          });
  
          _this.state._active = false;
  
          _this.updateSharedState({
            down: false,
            buttons: 0,
            touches: 0
          });
  
          requestAnimationFrame(function () {
            return _this.fireGestureHandler();
          });
        };
  
        return _this;
      }
  
      var _proto = DragRecognizer.prototype;
  
      _proto.startDrag = function startDrag(event) {
        var _this2 = this;
  
        var _getPointerEventValue2 = getPointerEventValues(event),
            values = _getPointerEventValue2.values;
  
        this.updateSharedState(getGenericEventData(event));
  
        var startState = _extends({}, this.getStartGestureState(values, event), {}, this.getGenericPayload(event, true));
  
        this.updateGestureState(_extends({}, startState, {}, this.getMovement(values, startState), {
          cancel: function cancel() {
            return _this2.onCancel();
          }
        }));
        this.fireGestureHandler();
      };
  
      _proto.addBindings = function addBindings() {
        if (this.controller.config.pointer) {
          this.controller.addBindings('onPointerDown', this.onDragStart);
          this.controller.addBindings('onPointerMove', this.onDragChange);
          this.controller.addBindings(['onPointerUp', 'onPointerCancel'], this.onDragEnd);
        } else {
          this.controller.addBindings(['onTouchStart', 'onMouseDown'], this.onDragStart);
        }
      };
  
      return DragRecognizer;
    }(CoordinatesRecognizer);
  
    var DEFAULT_DRAG_DELAY = 180;
    var DEFAULT_RUBBERBAND = 0.15;
    var DEFAULT_SWIPE_VELOCITY = 0.5;
    var DEFAULT_SWIPE_DISTANCE = 60;
    var defaultWindow = typeof window !== 'undefined' ? window : undefined;
    var defaultCoordinatesOptions = {
      lockDirection: false,
      axis: undefined,
      bounds: undefined
    };
    /**
     * @private
     *
     * Returns the internal generic option object.
     *
     * @param {Partial<GenericOptions>} [config={}]
     * @returns {InternalGenericOptions}
     */
  
    function getInternalGenericOptions(config) {
      if (config === void 0) {
        config = {};
      }
  
      var _config = config,
          _config$eventOptions = _config.eventOptions;
      _config$eventOptions = _config$eventOptions === void 0 ? {} : _config$eventOptions;
  
      var _config$eventOptions$ = _config$eventOptions.passive,
          passive = _config$eventOptions$ === void 0 ? true : _config$eventOptions$,
          _config$eventOptions$2 = _config$eventOptions.capture,
          capture = _config$eventOptions$2 === void 0 ? false : _config$eventOptions$2,
          _config$eventOptions$3 = _config$eventOptions.pointer,
          pointer = _config$eventOptions$3 === void 0 ? false : _config$eventOptions$3,
          _config$window = _config.window,
          window = _config$window === void 0 ? defaultWindow : _config$window,
          _config$domTarget = _config.domTarget,
          domTarget = _config$domTarget === void 0 ? undefined : _config$domTarget,
          _config$enabled = _config.enabled,
          enabled = _config$enabled === void 0 ? true : _config$enabled,
          restConfig = _objectWithoutPropertiesLoose(_config, ["eventOptions", "window", "domTarget", "enabled"]);
  
      return _extends({}, restConfig, {
        enabled: enabled,
        domTarget: domTarget,
        window: window,
        // passive is always true if there's no domTarget
        eventOptions: {
          passive: !domTarget || !!passive,
          capture: !!capture
        },
        captureString: capture ? 'Capture' : '',
        pointer: !!pointer
      });
    }
    function getInternalGestureOptions(gestureConfig) {
      var _gestureConfig$thresh = gestureConfig.threshold,
          threshold = _gestureConfig$thresh === void 0 ? undefined : _gestureConfig$thresh,
          _gestureConfig$rubber = gestureConfig.rubberband,
          rubberband = _gestureConfig$rubber === void 0 ? 0 : _gestureConfig$rubber,
          _gestureConfig$enable = gestureConfig.enabled,
          enabled = _gestureConfig$enable === void 0 ? true : _gestureConfig$enable,
          _gestureConfig$initia = gestureConfig.initial,
          initial = _gestureConfig$initia === void 0 ? [0, 0] : _gestureConfig$initia;
      if (typeof rubberband === 'boolean') rubberband = rubberband ? DEFAULT_RUBBERBAND : 0;
      if (threshold === void 0) threshold = 0;
      return {
        enabled: enabled,
        initial: initial,
        threshold: def.array(threshold),
        rubberband: def.array(rubberband)
      };
    }
    function getInternalCoordinatesOptions(coordinatesConfig) {
      if (coordinatesConfig === void 0) {
        coordinatesConfig = {};
      }
  
      var _coordinatesConfig = coordinatesConfig,
          axis = _coordinatesConfig.axis,
          lockDirection = _coordinatesConfig.lockDirection,
          _coordinatesConfig$bo = _coordinatesConfig.bounds,
          bounds = _coordinatesConfig$bo === void 0 ? {} : _coordinatesConfig$bo,
          internalOptions = _objectWithoutPropertiesLoose(_coordinatesConfig, ["axis", "lockDirection", "bounds"]);
  
      var boundsArray = [[def.withDefault(bounds.left, -Infinity), def.withDefault(bounds.right, Infinity)], [def.withDefault(bounds.top, -Infinity), def.withDefault(bounds.bottom, Infinity)]];
      return _extends({}, getInternalGestureOptions(internalOptions), {}, defaultCoordinatesOptions, {}, matchKeysFromObject({
        axis: axis,
        lockDirection: lockDirection
      }, coordinatesConfig), {
        bounds: boundsArray
      });
    }
    function getInternalDistanceAngleOptions(distanceAngleConfig) {
      if (distanceAngleConfig === void 0) {
        distanceAngleConfig = {};
      }
  
      var _distanceAngleConfig = distanceAngleConfig,
          _distanceAngleConfig$ = _distanceAngleConfig.distanceBounds,
          distanceBounds = _distanceAngleConfig$ === void 0 ? {} : _distanceAngleConfig$,
          _distanceAngleConfig$2 = _distanceAngleConfig.angleBounds,
          angleBounds = _distanceAngleConfig$2 === void 0 ? {} : _distanceAngleConfig$2,
          internalOptions = _objectWithoutPropertiesLoose(_distanceAngleConfig, ["distanceBounds", "angleBounds"]);
  
      var boundsArray = [[def.withDefault(distanceBounds.min, -Infinity), def.withDefault(distanceBounds.max, Infinity)], [def.withDefault(angleBounds.min, -Infinity), def.withDefault(angleBounds.max, Infinity)]];
      return _extends({}, getInternalGestureOptions(internalOptions), {
        bounds: boundsArray
      });
    }
    function getInternalDragOptions(dragConfig) {
      if (dragConfig === void 0) {
        dragConfig = {};
      }
  
      var _dragConfig = dragConfig,
          enabled = _dragConfig.enabled,
          threshold = _dragConfig.threshold,
          bounds = _dragConfig.bounds,
          rubberband = _dragConfig.rubberband,
          initial = _dragConfig.initial,
          dragOptions = _objectWithoutPropertiesLoose(_dragConfig, ["enabled", "threshold", "bounds", "rubberband", "initial"]);
  
      var _dragOptions$swipeVel = dragOptions.swipeVelocity,
          swipeVelocity = _dragOptions$swipeVel === void 0 ? DEFAULT_SWIPE_VELOCITY : _dragOptions$swipeVel,
          _dragOptions$swipeDis = dragOptions.swipeDistance,
          swipeDistance = _dragOptions$swipeDis === void 0 ? DEFAULT_SWIPE_DISTANCE : _dragOptions$swipeDis,
          _dragOptions$delay = dragOptions.delay,
          delay = _dragOptions$delay === void 0 ? false : _dragOptions$delay,
          _dragOptions$filterTa = dragOptions.filterTaps,
          filterTaps = _dragOptions$filterTa === void 0 ? false : _dragOptions$filterTa,
          axis = dragOptions.axis,
          lockDirection = dragOptions.lockDirection;
  
      if (threshold === void 0) {
        threshold = Math.max(0, filterTaps ? 3 : 0, lockDirection || axis ? 1 : 0);
      } else {
        filterTaps = true;
      }
  
      var internalCoordinatesOptions = getInternalCoordinatesOptions(matchKeysFromObject({
        enabled: enabled,
        threshold: threshold,
        bounds: bounds,
        rubberband: rubberband,
        axis: axis,
        lockDirection: lockDirection,
        initial: initial
      }, dragConfig));
      return _extends({}, internalCoordinatesOptions, {
        filterTaps: filterTaps || internalCoordinatesOptions.threshold[0] + internalCoordinatesOptions.threshold[1] > 0,
        swipeVelocity: def.array(swipeVelocity),
        swipeDistance: def.array(swipeDistance),
        delay: typeof delay === 'number' ? delay : delay ? DEFAULT_DRAG_DELAY : 0
      });
    }
  
    /**
     * @public
     *
     * Drag hook.
     *
     * @param {Handler<'drag'>} handler - the function fired every time the drag gesture updates
     * @param {(Config | {})} [config={}] - the config object including generic options and drag options
     * @returns {(...args: any[]) => HookReturnType<Config>}
     */
  
    function useDrag(handler, config) {
      if (config === void 0) {
        config = {};
      }
  
      var _config = config,
          domTarget = _config.domTarget,
          eventOptions = _config.eventOptions,
          window = _config.window,
          drag = _objectWithoutPropertiesLoose(_config, ["domTarget", "eventOptions", "window"]);
      /**
       * TODO: at the moment we recompute the config object at every render
       * this could probably be optimized
       */
  
  
      var mergedConfig = _extends({}, getInternalGenericOptions({
        domTarget: domTarget,
        eventOptions: eventOptions,
        window: window
      }), {
        drag: getInternalDragOptions(drag)
      });
  
      return useRecognizers({
        drag: handler
      }, [DragRecognizer], mergedConfig);
    }
  
    /**
     * @private
     * Abstract class for distance/angle-based gesture recongizers
     * @abstract
     * @class DistanceAngleRecognizer
     * @extends {Recognizer<T>}
     * @template T
     */
  
    var DistanceAngleRecognizer = /*#__PURE__*/function (_Recognizer) {
      _inheritsLoose(DistanceAngleRecognizer, _Recognizer);
  
      function DistanceAngleRecognizer() {
        return _Recognizer.apply(this, arguments) || this;
      }
  
      var _proto = DistanceAngleRecognizer.prototype;
  
      /**
       * Returns the real movement (without taking intentionality into acount)
       */
      _proto.getInternalMovement = function getInternalMovement(_ref, state) {
        var d = _ref[0],
            a = _ref[1];
        var da = state.values,
            turns = state.turns,
            initial = state.initial; // angle might not be defined when ctrl wheel is used for zoom only
        // in that case we set it to the previous angle value
  
        a = a !== void 0 ? a : da[1];
        var delta_a = a - da[1];
        /**
         * The angle value might jump from 179deg to -179deg when we actually want to
         * read 181deg to ensure continuity. To make that happen, we detect when the jump
         * is supsiciously high (ie > 270deg) and increase the `turns` value
         */
  
        var newTurns = Math.abs(delta_a) > 270 ? turns + Math.sign(delta_a) : turns; // we update the angle difference to its corrected value
  
        var movement_d = d - initial[0];
        var movement_a = a - 360 * newTurns - initial[1];
        return [movement_d, movement_a];
      };
  
      _proto.getKinematics = function getKinematics(values, event) {
        var _this$state = this.state,
            timeStamp = _this$state.timeStamp,
            initial = _this$state.initial;
        var movementDetection = this.getMovement(values, this.state);
        var delta = movementDetection.delta,
            movement = movementDetection.movement;
        var turns = (values[1] - movement[1] - initial[1]) / 360;
        var delta_t = event.timeStamp - timeStamp;
        var kinematics = calculateAllKinematics(movement, delta, delta_t);
        return _extends({
          values: values,
          delta: delta,
          turns: turns
        }, movementDetection, {}, kinematics);
      };
  
      _proto.mapStateValues = function mapStateValues(state) {
        return {
          da: state.values,
          vdva: state.velocities
        };
      };
  
      return DistanceAngleRecognizer;
    }(Recognizer);
  
    var PinchRecognizer = /*#__PURE__*/function (_DistanceAngleRecogni) {
      _inheritsLoose(PinchRecognizer, _DistanceAngleRecogni);
  
      function PinchRecognizer(controller, args) {
        var _this;
  
        _this = _DistanceAngleRecogni.call(this, 'pinch', controller, args) || this;
        _this.ingKey = 'pinching';
  
        _this.pinchShouldStart = function (event) {
          var _getGenericEventData = getGenericEventData(event),
              touches = _getGenericEventData.touches;
  
          return _this.enabled && touches === 2;
        };
  
        _this.onPinchStart = function (event) {
          if (!_this.pinchShouldStart(event)) return;
  
          var _getTwoTouchesEventDa = getTwoTouchesEventData(event),
              values = _getTwoTouchesEventDa.values,
              origin = _getTwoTouchesEventDa.origin;
  
          _this.updateSharedState(getGenericEventData(event));
  
          var startState = _extends({}, _this.getStartGestureState(values, event), {}, _this.getGenericPayload(event, true));
  
          _this.updateGestureState(_extends({}, startState, {}, _this.getMovement(values, startState), {
            origin: origin,
            cancel: function cancel() {
              return _this.onCancel();
            }
          }));
  
          _this.fireGestureHandler();
        };
  
        _this.onPinchChange = function (event) {
          var _this$state = _this.state,
              canceled = _this$state.canceled,
              timeStamp = _this$state.timeStamp,
              _active = _this$state._active;
          if (canceled || !_active) return;
          var genericEventData = getGenericEventData(event);
          if (genericEventData.touches !== 2 || event.timeStamp === timeStamp) return;
  
          _this.updateSharedState(genericEventData);
  
          var _getTwoTouchesEventDa2 = getTwoTouchesEventData(event),
              values = _getTwoTouchesEventDa2.values,
              origin = _getTwoTouchesEventDa2.origin;
  
          var kinematics = _this.getKinematics(values, event);
  
          _this.updateGestureState(_extends({}, _this.getGenericPayload(event), {}, kinematics, {
            origin: origin,
            cancel: function cancel() {
              return _this.onCancel();
            }
          }));
  
          _this.fireGestureHandler();
        };
  
        _this.onPinchEnd = function (event) {
          if (!_this.state.active) return;
          _this.state._active = false;
  
          _this.updateSharedState({
            down: false,
            touches: 0
          });
  
          _this.updateGestureState(_extends({
            event: event
          }, _this.getGenericPayload(event), {}, _this.getMovement(_this.state.values)));
  
          _this.fireGestureHandler();
        };
  
        _this.onCancel = function () {
          _this.state._active = false;
  
          _this.updateGestureState({
            canceled: true,
            cancel: noop
          });
  
          _this.updateSharedState({
            down: false,
            touches: 0
          });
  
          requestAnimationFrame(function () {
            return _this.fireGestureHandler();
          });
        };
        /**
         * PINCH WITH WEBKIT GESTURES
         */
  
  
        _this.onGestureStart = function (event) {
          if (!_this.enabled) return;
          event.preventDefault();
  
          var _getWebkitGestureEven = getWebkitGestureEventValues(event),
              values = _getWebkitGestureEven.values;
  
          _this.updateSharedState(getGenericEventData(event));
  
          var startState = _extends({}, _this.getStartGestureState(values, event), {}, _this.getGenericPayload(event, true));
  
          _this.updateGestureState(_extends({}, startState, {}, _this.getMovement(values, startState), {
            cancel: function cancel() {
              return _this.onCancel();
            }
          }));
  
          _this.fireGestureHandler();
        };
  
        _this.onGestureChange = function (event) {
          var _this$state2 = _this.state,
              canceled = _this$state2.canceled,
              _active = _this$state2._active;
          if (canceled || !_active) return;
          event.preventDefault();
          var genericEventData = getGenericEventData(event);
  
          _this.updateSharedState(genericEventData);
  
          var _getWebkitGestureEven2 = getWebkitGestureEventValues(event),
              values = _getWebkitGestureEven2.values;
  
          var kinematics = _this.getKinematics(values, event);
  
          _this.updateGestureState(_extends({}, _this.getGenericPayload(event), {}, kinematics, {
            cancel: function cancel() {
              return _this.onCancel();
            }
          }));
  
          _this.fireGestureHandler();
        };
  
        _this.onGestureEnd = function (event) {
          event.preventDefault();
          if (!_this.state.active) return;
          _this.state._active = false;
  
          _this.updateSharedState({
            down: false,
            touches: 0
          });
  
          _this.updateGestureState(_extends({
            event: event
          }, _this.getGenericPayload(event), {}, _this.getMovement(_this.state.values)));
  
          _this.fireGestureHandler();
        };
  
        _this.updateTouchData = function (event) {
          if (!_this.enabled || event.touches.length !== 2 || !_this.state._active) return;
  
          var _getTwoTouchesEventDa3 = getTwoTouchesEventData(event),
              origin = _getTwoTouchesEventDa3.origin;
  
          _this.state.origin = origin;
        };
        /**
         * PINCH WITH WHEEL
         */
  
  
        _this.wheelShouldRun = function (event) {
          return _this.enabled && event.ctrlKey;
        };
  
        _this.getWheelValuesFromEvent = function (event) {
          var _getWheelEventValues = getWheelEventValues(event),
              _getWheelEventValues$ = _getWheelEventValues.values,
              delta_d = _getWheelEventValues$[1];
  
          var _this$state$values = _this.state.values,
              prev_d = _this$state$values[0],
              prev_a = _this$state$values[1];
          var d = prev_d - delta_d;
          var a = prev_a !== void 0 ? prev_a : 0;
          return {
            values: [d, a],
            origin: [event.clientX, event.clientY],
            delta: [0, delta_d]
          };
        };
  
        _this.onWheel = function (event) {
          if (!_this.wheelShouldRun(event)) return;
  
          _this.clearTimeout();
  
          _this.setTimeout(_this.onWheelEnd);
  
          if (!_this.state._active) _this.onWheelStart(event);else _this.onWheelChange(event);
        };
  
        _this.onWheelStart = function (event) {
          var _this$getWheelValuesF = _this.getWheelValuesFromEvent(event),
              values = _this$getWheelValuesF.values,
              delta = _this$getWheelValuesF.delta,
              origin = _this$getWheelValuesF.origin;
  
          if (!_this.controller.config.eventOptions.passive) {
            event.preventDefault();
          } else if (process.env.NODE_ENV === 'development') {
            console.warn('To support zoom on trackpads, try using the `domTarget` option and `config.event.passive` set to `false`. This message will only appear in development mode.');
          }
  
          _this.updateSharedState(getGenericEventData(event));
  
          var startState = _extends({}, _this.getStartGestureState(values, event), {}, _this.getGenericPayload(event, true), {
            initial: _this.state.values
          });
  
          _this.updateGestureState(_extends({}, startState, {}, _this.getMovement(values, startState), {
            offset: values,
            delta: delta,
            origin: origin
          }));
  
          _this.fireGestureHandler();
        };
  
        _this.onWheelChange = function (event) {
          var genericEventData = getGenericEventData(event);
  
          _this.updateSharedState(genericEventData);
  
          var _this$getWheelValuesF2 = _this.getWheelValuesFromEvent(event),
              values = _this$getWheelValuesF2.values,
              origin = _this$getWheelValuesF2.origin,
              delta = _this$getWheelValuesF2.delta;
  
          var kinematics = _this.getKinematics(values, event);
  
          _this.updateGestureState(_extends({}, _this.getGenericPayload(event), {}, kinematics, {
            origin: origin,
            delta: delta
          }));
  
          _this.fireGestureHandler();
        };
  
        _this.onWheelEnd = function () {
          _this.state._active = false;
  
          _this.updateGestureState(_this.getMovement(_this.state.values));
  
          _this.fireGestureHandler();
        };
  
        return _this;
      }
  
      var _proto = PinchRecognizer.prototype;
  
      _proto.addBindings = function addBindings() {
        // Only try to use gesture events when they are supported and domTarget is set
        // as React doesn't support gesture handlers.
        if (this.controller.config.domTarget && supportsGestureEvents()) {
          this.controller.addBindings('onGestureStart', this.onGestureStart);
          this.controller.addBindings('onGestureChange', this.onGestureChange);
          this.controller.addBindings(['onGestureEnd', 'onTouchCancel'], this.onGestureEnd);
          this.controller.addBindings(['onTouchStart', 'onTouchMove'], this.updateTouchData);
        } else {
          this.controller.addBindings('onTouchStart', this.onPinchStart);
          this.controller.addBindings('onTouchMove', this.onPinchChange);
          this.controller.addBindings(['onTouchEnd', 'onTouchCancel'], this.onPinchEnd);
          this.controller.addBindings('onWheel', this.onWheel);
        }
      };
  
      return PinchRecognizer;
    }(DistanceAngleRecognizer);
  
    /**
     * @public
     *
     * Pinch hook.
     *
     * @param {Handler<'pinch'>} handler - the function fired every time the pinch gesture updates
     * @param {(Config | {})} [config={}] - the config object including generic options and pinch options
     * @returns {(...args: any[]) => HookReturnType<Config>}
     */
  
    function usePinch(handler, config) {
      if (config === void 0) {
        config = {};
      }
  
      var _config = config,
          domTarget = _config.domTarget,
          eventOptions = _config.eventOptions,
          window = _config.window,
          pinch = _objectWithoutPropertiesLoose(_config, ["domTarget", "eventOptions", "window"]);
      /**
       * TODO: at the moment we recompute the config object at every render
       * this could probably be optimized
       */
  
  
      var mergedConfig = _extends({}, getInternalGenericOptions({
        domTarget: domTarget,
        eventOptions: eventOptions,
        window: window
      }), {
        pinch: getInternalDistanceAngleOptions(pinch)
      });
  
      return useRecognizers({
        pinch: handler
      }, [PinchRecognizer], mergedConfig);
    }
  
    var WheelRecognizer = /*#__PURE__*/function (_CoordinatesRecognize) {
      _inheritsLoose(WheelRecognizer, _CoordinatesRecognize);
  
      function WheelRecognizer(controller, args) {
        var _this;
  
        _this = _CoordinatesRecognize.call(this, 'wheel', controller, args) || this;
        _this.ingKey = 'wheeling';
        _this.debounced = true;
  
        _this.wheelShouldRun = function (event) {
          if (event.ctrlKey && 'pinch' in _this.controller.handlers) return false;
          return _this.enabled;
        };
  
        _this.getValuesFromEvent = function (event) {
          var prevValues = _this.state.values;
  
          var _getWheelEventValues = getWheelEventValues(event),
              values = _getWheelEventValues.values;
  
          return {
            values: addV(values, prevValues)
          };
        };
  
        _this.onWheel = function (event) {
          if (!_this.wheelShouldRun(event)) return;
  
          _this.clearTimeout();
  
          _this.setTimeout(_this.onWheelEnd);
  
          if (!_this.state._active) _this.onWheelStart(event);else _this.onWheelChange(event);
        };
  
        _this.onWheelStart = function (event) {
          var _this$getValuesFromEv = _this.getValuesFromEvent(event),
              values = _this$getValuesFromEv.values;
  
          _this.updateSharedState(getGenericEventData(event));
  
          var startState = _extends({}, _this.getStartGestureState(values, event), {}, _this.getGenericPayload(event, true), {
            initial: _this.state.values
          });
  
          var movementDetection = _this.getMovement(values, startState);
  
          var delta = movementDetection.delta;
  
          _this.updateGestureState(_extends({}, startState, {}, movementDetection, {
            distance: calculateDistance(delta),
            direction: calculateDirection(delta)
          }));
  
          _this.fireGestureHandler();
        };
  
        _this.onWheelChange = function (event) {
          var genericEventData = getGenericEventData(event);
  
          _this.updateSharedState(genericEventData);
  
          var _this$getValuesFromEv2 = _this.getValuesFromEvent(event),
              values = _this$getValuesFromEv2.values;
  
          var kinematics = _this.getKinematics(values, event);
  
          _this.updateGestureState(_extends({}, _this.getGenericPayload(event), {}, kinematics));
  
          _this.fireGestureHandler();
        };
  
        _this.onWheelEnd = function () {
          _this.state._active = false;
  
          _this.updateGestureState(_extends({}, _this.getMovement(_this.state.values), {
            velocities: [0, 0],
            velocity: 0
          }));
  
          _this.fireGestureHandler();
        };
  
        return _this;
      }
  
      var _proto = WheelRecognizer.prototype;
  
      _proto.addBindings = function addBindings() {
        this.controller.addBindings('onWheel', this.onWheel);
      };
  
      return WheelRecognizer;
    }(CoordinatesRecognizer);
  
    /**
     * @public
     *
     * Wheel hook.
     *
     * @param {Handler<'wheel'>} handler - the function fired every time the wheel gesture updates
     * @param {(Config | {})} [config={}] - the config object including generic options and wheel options
     * @returns {(...args: any[]) => HookReturnType<Config>}
     */
  
    function useWheel(handler, config) {
      if (config === void 0) {
        config = {};
      }
  
      var _config = config,
          domTarget = _config.domTarget,
          eventOptions = _config.eventOptions,
          window = _config.window,
          wheel = _objectWithoutPropertiesLoose(_config, ["domTarget", "eventOptions", "window"]);
      /**
       * TODO: at the moment we recompute the config object at every render
       * this could probably be optimized
       */
  
  
      var mergedConfig = _extends({}, getInternalGenericOptions({
        domTarget: domTarget,
        eventOptions: eventOptions,
        window: window
      }), {
        wheel: getInternalCoordinatesOptions(wheel)
      });
  
      return useRecognizers({
        wheel: handler
      }, [WheelRecognizer], mergedConfig);
    }
  
    var MoveRecognizer = /*#__PURE__*/function (_CoordinatesRecognize) {
      _inheritsLoose(MoveRecognizer, _CoordinatesRecognize);
  
      function MoveRecognizer(controller, args) {
        var _this;
  
        _this = _CoordinatesRecognize.call(this, 'move', controller, args) || this;
        _this.ingKey = 'moving';
        _this.debounced = true;
  
        _this.moveShouldRun = function () {
          return _this.enabled;
        };
  
        _this.onMove = function (event) {
          if (!_this.moveShouldRun()) return;
  
          _this.clearTimeout();
  
          _this.setTimeout(_this.onMoveEnd);
  
          if (!_this.state._active) _this.onMoveStart(event);else _this.onMoveChange(event);
        };
  
        _this.onMoveStart = function (event) {
          var _getPointerEventValue = getPointerEventValues(event),
              values = _getPointerEventValue.values;
  
          _this.updateSharedState(getGenericEventData(event));
  
          var startState = _extends({}, _this.getStartGestureState(values, event), {}, _this.getGenericPayload(event, true));
  
          _this.updateGestureState(_extends({}, startState, {}, _this.getMovement(values, startState)));
  
          _this.fireGestureHandler();
        };
  
        _this.onMoveChange = function (event) {
          var genericEventData = getGenericEventData(event);
  
          _this.updateSharedState(genericEventData);
  
          var _getPointerEventValue2 = getPointerEventValues(event),
              values = _getPointerEventValue2.values;
  
          var kinematics = _this.getKinematics(values, event);
  
          _this.updateGestureState(_extends({}, _this.getGenericPayload(event), {}, kinematics));
  
          _this.fireGestureHandler();
        };
  
        _this.onMoveEnd = function () {
          _this.state._active = false;
  
          _this.updateGestureState(_extends({}, _this.getMovement(_this.state.values), {
            velocities: [0, 0],
            velocity: 0
          }));
  
          _this.fireGestureHandler();
        };
  
        _this.onPointerEnter = function (event) {
          _this.controller.state.shared.hovering = true;
          if (!_this.controller.config.enabled) return;
  
          if (_this.controller.config.hover.enabled) {
            var _getPointerEventValue3 = getPointerEventValues(event),
                values = _getPointerEventValue3.values;
  
            var state = _extends({}, _this.controller.state.shared, {}, _this.state, {}, _this.getGenericPayload(event, true), {
              values: values,
              active: true,
              hovering: true
            });
  
            _this.controller.handlers.hover(_extends({}, state, {}, _this.mapStateValues(state)));
          }
  
          if ('move' in _this.controller.handlers) _this.onMoveStart(event);
        };
  
        _this.onPointerLeave = function (event) {
          _this.controller.state.shared.hovering = false;
          if ('move' in _this.controller.handlers) _this.onMoveEnd();
  
          if (_this.controller.config.hover.enabled) {
            var _getPointerEventValue4 = getPointerEventValues(event),
                values = _getPointerEventValue4.values;
  
            var state = _extends({}, _this.controller.state.shared, {}, _this.state, {}, _this.getGenericPayload(event), {
              values: values,
              active: false
            });
  
            _this.controller.handlers.hover(_extends({}, state, {}, _this.mapStateValues(state)));
          }
        };
  
        return _this;
      }
  
      var _proto = MoveRecognizer.prototype;
  
      _proto.addBindings = function addBindings() {
        if (this.controller.config.pointer) {
          if ('move' in this.controller.handlers) {
            this.controller.addBindings('onPointerMove', this.onMove);
          }
  
          if ('hover' in this.controller.handlers) {
            this.controller.addBindings('onPointerEnter', this.onPointerEnter);
            this.controller.addBindings('onPointerLeave', this.onPointerLeave);
          }
        } else {
          if ('move' in this.controller.handlers) {
            this.controller.addBindings('onMouseMove', this.onMove);
          }
  
          if ('hover' in this.controller.handlers) {
            this.controller.addBindings('onMouseEnter', this.onPointerEnter);
            this.controller.addBindings('onMouseLeave', this.onPointerLeave);
          }
        }
      };
  
      return MoveRecognizer;
    }(CoordinatesRecognizer);
  
    /**
     * @public
     *
     * Move hook.
     *
     * @param {Handler<'move'>} handler - the function fired every time the move gesture updates
     * @param {(Config | {})} [config={}] - the config object including generic options and move options
     * @returns {(...args: any[]) => HookReturnType<Config>}
     */
  
    function useMove(handler, config) {
      if (config === void 0) {
        config = {};
      }
  
      var _config = config,
          domTarget = _config.domTarget,
          eventOptions = _config.eventOptions,
          window = _config.window,
          move = _objectWithoutPropertiesLoose(_config, ["domTarget", "eventOptions", "window"]);
      /**
       * TODO: at the moment we recompute the config object at every render
       * this could probably be optimized
       */
  
  
      var mergedConfig = _extends({}, getInternalGenericOptions({
        domTarget: domTarget,
        eventOptions: eventOptions,
        window: window
      }), {
        move: getInternalCoordinatesOptions(move)
      });
  
      return useRecognizers({
        move: handler
      }, [MoveRecognizer], mergedConfig);
    }
  
    /**
     * @public
     *
     * Hover hook.
     *
     * @param {Handler<'hover'>} handler - the function fired every time the hover gesture updates
     * @param {(Config | {})} [config={}] - the config object including generic options and hover options
     * @returns {(...args: any[]) => HookReturnType<Config>}
     */
  
    function useHover(handler, config) {
      if (config === void 0) {
        config = {};
      }
  
      var _config = config,
          domTarget = _config.domTarget,
          eventOptions = _config.eventOptions,
          window = _config.window,
          hover = _objectWithoutPropertiesLoose(_config, ["domTarget", "eventOptions", "window"]);
      /**
       * TODO: at the moment we recompute the config object at every render
       * this could probably be optimized
       */
  
  
      var mergedConfig = _extends({}, getInternalGenericOptions({
        domTarget: domTarget,
        eventOptions: eventOptions,
        window: window
      }), {
        hover: _extends({
          enabled: true
        }, hover)
      });
  
      return useRecognizers({
        hover: handler
      }, [MoveRecognizer], mergedConfig);
    }
  
    var ScrollRecognizer = /*#__PURE__*/function (_CoordinatesRecognize) {
      _inheritsLoose(ScrollRecognizer, _CoordinatesRecognize);
  
      function ScrollRecognizer(controller, args) {
        var _this;
  
        _this = _CoordinatesRecognize.call(this, 'scroll', controller, args) || this;
        _this.ingKey = 'scrolling';
        _this.debounced = true;
  
        _this.scrollShouldRun = function () {
          return _this.enabled;
        };
  
        _this.onScroll = function (event) {
          if (!_this.scrollShouldRun()) return;
  
          _this.clearTimeout();
  
          _this.setTimeout(_this.onScrollEnd);
  
          if (!_this.state._active) _this.onScrollStart(event);else _this.onScrollChange(event);
        };
  
        _this.onScrollStart = function (event) {
          var _getScrollEventValues = getScrollEventValues(event),
              values = _getScrollEventValues.values;
  
          _this.updateSharedState(getGenericEventData(event));
  
          var startState = _extends({}, _this.getStartGestureState(values, event), {}, _this.getGenericPayload(event, true), {
            initial: _this.state.values
          });
  
          var movementDetection = _this.getMovement(values, startState);
  
          var delta = movementDetection.delta;
  
          _this.updateGestureState(_extends({}, startState, {}, movementDetection, {
            distance: calculateDistance(delta),
            direction: calculateDirection(delta)
          }));
  
          _this.fireGestureHandler();
        };
  
        _this.onScrollChange = function (event) {
          var genericEventData = getGenericEventData(event);
  
          _this.updateSharedState(genericEventData);
  
          var _getScrollEventValues2 = getScrollEventValues(event),
              values = _getScrollEventValues2.values;
  
          var kinematics = _this.getKinematics(values, event);
  
          _this.updateGestureState(_extends({}, _this.getGenericPayload(event), {}, kinematics));
  
          _this.fireGestureHandler();
        };
  
        _this.onScrollEnd = function () {
          _this.state._active = false;
  
          _this.updateGestureState(_extends({}, _this.getMovement(_this.state.values), {
            velocities: [0, 0],
            velocity: 0
          }));
  
          _this.fireGestureHandler();
        };
  
        return _this;
      }
  
      var _proto = ScrollRecognizer.prototype;
  
      _proto.addBindings = function addBindings() {
        this.controller.addBindings('onScroll', this.onScroll);
      };
  
      return ScrollRecognizer;
    }(CoordinatesRecognizer);
  
    /**
     * @public
     *
     * Scroll hook.
     *
     * @param {Handler<'scroll'>} handler - the function fired every time the scroll gesture updates
     * @param {(Config | {})} [config={}] - the config object including generic options and scroll options
     * @returns {(...args: any[]) => HookReturnType<Config>}
     */
  
    function useScroll(handler, config) {
      if (config === void 0) {
        config = {};
      }
  
      var _config = config,
          domTarget = _config.domTarget,
          eventOptions = _config.eventOptions,
          window = _config.window,
          scroll = _objectWithoutPropertiesLoose(_config, ["domTarget", "eventOptions", "window"]);
      /**
       * TODO: at the moment we recompute the config object at every render
       * this could probably be optimized
       */
  
  
      var mergedConfig = _extends({}, getInternalGenericOptions({
        domTarget: domTarget,
        eventOptions: eventOptions,
        window: window
      }), {
        scroll: getInternalCoordinatesOptions(scroll)
      });
  
      return useRecognizers({
        scroll: handler
      }, [ScrollRecognizer], mergedConfig);
    }
  
    /**
     * @public
     *
     * The most complete gesture hook, allowing support for multiple gestures.
     *
     * @param {UserHandlersPartial} handlers - an object with on[Gesture] keys containg gesture handlers
     * @param {UseGestureConfig} [config={}] - the full config object
     * @returns {(...args: any[]) => HookReturnType<Config>}
     */
  
    function useGesture(handlers, config) {
      if (config === void 0) {
        config = {};
      }
  
      /**
       * If handlers contains {onDragStart, onDrag, onDragEnd, onMoveStart, onMove}
       * actions will include 'onDrag' and 'onMove.
       */
      var _React$useState = React.useState(function () {
        return new Set(Object.keys(handlers).map(function (k) {
          return k.replace(/End|Start/, '');
        }));
      }),
          actions = _React$useState[0];
      /**
       * Here we compute the derived internal config based on the provided config object.
       * We decompose the config into its generic and gesture options and compute each.
       * TODO: this is currently done on every render!
       */
  
  
      var _config = config,
          drag = _config.drag,
          wheel = _config.wheel,
          move = _config.move,
          scroll = _config.scroll,
          pinch = _config.pinch,
          hover = _config.hover,
          restConfig = _objectWithoutPropertiesLoose(_config, ["drag", "wheel", "move", "scroll", "pinch", "hover"]);
  
      var mergedConfig = getInternalGenericOptions(restConfig);
      var classes = [];
      var internalHandlers = {}; // will hold reference to native handlers such as onClick, onMouseDown, etc.
  
      var _nativeHandlers = _extends({}, handlers);
  
      if (actions.has('onDrag')) {
        classes.push(DragRecognizer);
        internalHandlers.drag = includeStartEndHandlers(handlers, 'onDrag', _nativeHandlers);
        mergedConfig.drag = getInternalDragOptions(drag);
      }
  
      if (actions.has('onWheel')) {
        classes.push(WheelRecognizer);
        internalHandlers.wheel = includeStartEndHandlers(handlers, 'onWheel', _nativeHandlers);
        mergedConfig.wheel = getInternalCoordinatesOptions(wheel);
      }
  
      if (actions.has('onScroll')) {
        classes.push(ScrollRecognizer);
        internalHandlers.scroll = includeStartEndHandlers(handlers, 'onScroll', _nativeHandlers);
        mergedConfig.scroll = getInternalCoordinatesOptions(scroll);
      }
  
      if (actions.has('onMove')) {
        classes.push(MoveRecognizer);
        internalHandlers.move = includeStartEndHandlers(handlers, 'onMove', _nativeHandlers);
        mergedConfig.move = getInternalCoordinatesOptions(move);
      }
  
      if (actions.has('onPinch')) {
        classes.push(PinchRecognizer);
        internalHandlers.pinch = includeStartEndHandlers(handlers, 'onPinch', _nativeHandlers);
        mergedConfig.pinch = getInternalDistanceAngleOptions(pinch);
      }
  
      if (actions.has('onHover')) {
        if (!actions.has('onMove')) classes.push(MoveRecognizer);
        internalHandlers.hover = handlers.onHover;
        mergedConfig.hover = _extends({
          enabled: true
        }, hover);
        delete _nativeHandlers.onHover;
      }
  
      return useRecognizers(internalHandlers, classes, mergedConfig, _nativeHandlers);
    }
    /**
     * @private
     *
     * This utility function will integrate start and end handlers into the regular
     * handler function by using first and last conditions.
     *
     * @param {UserHandlersPartial} handlers - the handlers function object
     * @param {HandlerKey} handlerKey - the key for which to integrate start and end handlers
     * @returns
     */
  
    function includeStartEndHandlers(handlers, handlerKey, _nativeHandlers) {
      var startKey = handlerKey + 'Start';
      var endKey = handlerKey + 'End';
      delete _nativeHandlers[handlerKey];
      delete _nativeHandlers[startKey];
      delete _nativeHandlers[endKey];
  
      var fn = function fn(state) {
        var memo = undefined;
        if (state.first && startKey in handlers) handlers[startKey](state);
        if (handlerKey in handlers) memo = handlers[handlerKey](state);
        if (state.last && endKey in handlers) handlers[endKey](state);
        return memo;
      };
  
      return fn;
    }
  
    exports.addV = addV;
    exports.rubberbandIfOutOfBounds = rubberbandIfOutOfBounds;
    exports.subV = subV;
    exports.useDrag = useDrag;
    exports.useGesture = useGesture;
    exports.useHover = useHover;
    exports.useMove = useMove;
    exports.usePinch = usePinch;
    exports.useScroll = useScroll;
    exports.useWheel = useWheel;
  
    Object.defineProperty(exports, '__esModule', { value: true });
  
  })));