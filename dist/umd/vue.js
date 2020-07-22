(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
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

  /**
   * @name: 当前数据是不是对象
   * @param {*}: 
   * @return: Boolean
   */
  function isObject(value) {
    return _typeof(value) === 'object' && value !== null;
  }
  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  }

  var oldArrayMethods = Array.prototype;
  var arrayMethods = Object.create(oldArrayMethods); // 重写了会引起数组本身变化的api

  var methods = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splie'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[method].apply(this, args); // push unshift 添加的可能还是一个数组对象，需要对新添加的对象继续拦截

      var inserted;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
          break;
      } // 对新增的对象进行拦截


      var ob = this.__ob__;

      if (inserted) {
        ob.observeArray(inserted);
      }

      return result;
    };
  });

  // 用来观测数据

  var Observe = /*#__PURE__*/function () {
    function Observe(data) {
      _classCallCheck(this, Observe);

      this.data = data; // 给监听过的数组添加 实例方法和属性
      // 直接挂在的话会造成死循环
      // data.__ob__ = this

      def(data, '__ob__', this);

      if (Array.isArray(data)) {
        // 如果是数组的话，不要对索引进行观测，因为会有性能损耗
        // 而且一般前端开发中很少直接操作索引。 基本使用push pop shift unshift ...
        // 对原生的数组方法进行重写
        data.__proto__ = arrayMethods; // 如果数组中放的是对象的话在进行拦截

        this.observeArray(data);
      } else {
        // 对对象进行拦截
        this.walk(data);
      }
    }

    _createClass(Observe, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          // 给每个属性添加劫持操作
          defineReactive(data, key, data[key]);
        });
      }
    }, {
      key: "observeArray",
      value: function observeArray(data) {
        data.forEach(function (item) {
          observe(item);
        });
      }
    }]);

    return Observe;
  }(); // 数据劫持，收集响应

  function defineReactive(data, key, value) {
    // 如果value也是一个对象的话，递归实现深度监测
    // 多层object 会造成性能损耗
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) return;
        value = newValue; // 可能用户设置的还是个对象，需要对新设置的值进行监测(劫持)

        observe(value);
      }
    });
  }

  function observe(data) {
    var ob;

    if (!isObject(data)) {
      return;
    } else {
      ob = new Observe(data);
    }

    return ob;
  }

  function initState(vm) {
    var opts = vm.$options; // vue 的数据来源： 属性、方法、数据、计算属性、watch

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    var data = vm.$options.data; // data最终得到的是个object

    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}; // 获取到数据并对数据进行劫持
    // 添加响应，Object.defineProperty() 给属性添加get set方法

    observe(data);
  }

  // Regular Expressions for parsing tags and attributes
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z".concat(unicodeRegExp.source, "]*");
  // 虚拟dom：用对象来描述真实的dom节点信息

  function compileToFunction(template) {
    console.log(333, template); // 将template 模板编译成

    return function render() {};
  }

  function initMixin(Vue) {
    // 初始化流程
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 初始化状态

      initState(vm); // 挂载

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el); // render template el 的渲染顺序

      if (!options.render) {
        // 对模板进行编译
        var tempalte = options.tempalte; // 对el进行编译

        if (!tempalte && el) {
          tempalte = el.outerHTML;
        }

        var render = compileToFunction(tempalte); // ？

        options.render = render;
      }
    };
  }

  function Vue(options) {
    // if(process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    //   console.warn('Vue is a constructor and should be called with the `new` keyword')
    // }
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
