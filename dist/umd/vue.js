(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var ASSET_TYPES = ['component'];
  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed'];

  function isObject(obj) {
    return obj !== null && _typeof(obj) === 'object';
  }
  function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }
  function def(data, key, value, enumerable) {
    Object.defineProperty(data, key, {
      value: value,
      enumerable: !!enumerable,
      configurable: true
    });
  }
  function bind(fn, ctx) {
    return function (a) {
      var l = arguments.length;
      return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    };
  }
  var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
  var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
  function parsePath(path) {
    if (bailRE.test(path)) {
      return;
    }

    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) return;
        obj = obj[segments[i]];
      }

      return obj;
    };
  }
  function remove(arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);

      if (index > -1) {
        return arr.splice(index, 1);
      }
    }
  }
  function isReservedTag(tag) {
    return isHTMLTag(tag) || isSVG(tag);
  }
  var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot');
  var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);
  function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(',');

    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }

    return expectsLowerCase ? function (val) {
      return map[val.toLowerCase()];
    } : function (val) {
      return map[val];
    };
  }
  var strats = {};
  LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
  });

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        return [childVal];
      }
    } else {
      return parentVal;
    }
  }

  function mergeOptions(parent, child) {
    // let a = { a: { c: 2 } };
    // let b = { a: { b: 1 } };
    var options = {};

    for (var key in parent) {
      mergeField(key);
    }

    for (var _key in child) {
      if (!parent[_key]) {
        mergeField(_key);
      }
    }

    function mergeField(key) {
      if (strats[key]) {
        options[key] = strats[key](parent[key], child[key]);
      } else {
        if (isObject(parent[key]) && isObject(child[key])) {
          options[key] = Object.assign(parent[key], child[key]);
        } else {
          if (!child[key]) {
            options[key] = parent[key];
          } else {
            options[key] = child[key];
          }
        }
      }
    }

    return options;
  }

  var oldArrayMethods = Array.prototype;
  var arrayMethods = Object.create(oldArrayMethods);
  var methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[method].apply(this, args); // 调用原生数组方法

      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case 'splice':
          inserted = args.slice(2);
          break;
      }

      if (inserted) {
        ob.observeArray(inserted);
      }

      return result;
    };
  });

  var uid = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = uid++;
      this.subs = [];
    }

    _createClass(Dep, [{
      key: "addSub",
      value: function addSub(sub) {
        this.subs.push(sub);
      }
    }, {
      key: "removeSub",
      value: function removeSub(sub) {
        remove(this.subs, sub);
      }
    }, {
      key: "depend",
      value: function depend() {
        if (Dep.target) {
          Dep.target.addDep(this);
        }
      }
    }, {
      key: "notify",
      value: function notify() {
        var subs = this.subs.slice();

        for (var i = 0; i < subs.length; i++) {
          subs[i].update();
        }
      }
    }]);

    return Dep;
  }();
  Dep.target = null;

  function observe(data) {
    if (!isObject(data)) return;
    return new Observer(data);
  }
  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      // 给 data 挂载 Observer 实例
      // 这里的作用是方便数组操作时调用 Observer 实例的 observeArray 方法
      def(data, '__ob__', this, false);

      if (Array.isArray(data)) {
        this.observeArray(data);
        data.__proto__ = arrayMethods;
      } else {
        this.walk(data);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          var value = data[key];
          defineReactive(data, key, value);
        });
      }
    }, {
      key: "observeArray",
      value: function observeArray(data) {
        for (var i = 0; i < data.length; i++) {
          observe(data[i]);
        }
      }
    }]);

    return Observer;
  }();

  function defineReactive(data, key, value) {
    var dep = new Dep();
    observe(value); // 递归调用

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        if (Dep.target) {
          dep.depend();
        }

        return value;
      },
      set: function set(newVal) {
        if (newVal === value) return;
        value = newVal;
        dep.notify();
      }
    });
  }

  var VNode = function VNode(tag, data, key) {
    var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    var text = arguments.length > 4 ? arguments[4] : undefined;
    var elm = arguments.length > 5 ? arguments[5] : undefined;
    var context = arguments.length > 6 ? arguments[6] : undefined;
    var componentOptions = arguments.length > 7 ? arguments[7] : undefined;

    _classCallCheck(this, VNode);

    this.tag = tag;
    this.data = data;
    this.key = key;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.context = context;
    this.componentOptions = componentOptions;
  };

  function createComponent(Ctor, data, context, children, tag) {
    if (!Ctor) return;
    var baseCtor = context.$options._base; // 针对局部组件注册场景

    if (_typeof(Ctor) === 'object') {
      Ctor = baseCtor.extend(Ctor);
    }

    data = data || {};
    var name = Ctor.options.name || tag;
    var vnode = new VNode("vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ''), data, undefined, undefined, undefined, undefined, context, {
      Ctor: Ctor,
      tag: tag,
      children: children
    });
    return vnode;
  }
  function createComponentInstanceForVnode(vnode, parent) {
    var options = {
      _isComponent: true,
      _parentVnode: vnode,
      parent: parent
    };
    return new vnode.componentOptions.Ctor(options);
  }

  function createPatchFunction(oldVnode, vnode) {
    var vm = this;
    return patch(oldVnode, vnode);

    function patch(oldVnode, vnode) {
      // let parent = vm.$el.parentNode;
      // const oldElm = oldVnode;
      // const parentElm = oldElm.parentNode;
      // let el = createElm(vnode);
      // parent.appendChild(el);
      // if (isRealElement) {
      //   parentElm.removeChild(oldElm);
      // }
      if (!oldVnode) {
        createElm(vnode);
      } else {
        var isRealElement = oldVnode.nodeType; // 虚拟dom没有nodeType属性，真实dom才有

        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          patchVnode(oldVnode, vnode);
        } else {
          if (isRealElement) {
            oldVnode = emptyNodeAt(oldVnode);
          }

          var elm = oldVnode.elm;
          var parent = elm.parentNode;
          createElm(vnode, [], parent);
          parent.insertBefore(vnode.elm, elm);
          parent.removeChild(elm);
        }
      }

      return vnode.elm;
    }

    function createElm(vnode, insertedVnodeQueue, parentElm, refElm) {
      var tag = vnode.tag,
          data = vnode.data,
          key = vnode.key,
          children = vnode.children,
          text = vnode.text;

      if (createComponent(vnode, [], parentElm)) {
        return;
      }

      if (typeof tag === 'string') {
        vnode.elm = document.createElement(tag);
        children.forEach(function (child) {
          try {
            return vnode.elm.appendChild(createElm(child, [], vnode.elm));
          } catch (e) {
            console.log(e);
          }
        });
        updateProperties(vnode);
      } else {
        vnode.elm = document.createTextNode(text);
      }

      return vnode.elm;
    }

    function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
      if (vnode.tag && vnode.tag.indexOf('vue-component') > -1) {
        var child = createComponentInstanceForVnode(vnode, parentElm);
        child.$mount();
        parentElm.appendChild(child.$el);
        return true;
      }
    }

    function patchVnode(oldVnode, vnode) {
      if (oldVnode === vnode) return;
      var elm = vnode.elm = oldVnode.elm;
      var oldCh = oldVnode.children;
      var ch = vnode.children;

      if (!vnode.text) {
        // 判断是否为文本
        if (oldCh && ch) {
          // 是否有子节点
          updateChildren(elm, oldCh, ch);
        } else if (ch) {
          if (oldCh.text) {
            elm.textContent = '';
          }

          addVnodes(elm, null, ch, 0, ch.length - 1);
        } else if (oldCh) {
          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        } else {
          elm.textContent = '';
        }

        updateDOMProps(oldVnode, vnode);
      } else {
        if (oldCh) {
          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        }

        elm.textContent = vnode.text;
      }
    }

    function emptyNodeAt(elm) {
      return new VNode(elm.tagName.toLowerCase(), {}, [], undefined, undefined, elm);
    }

    function sameVnode(oldVnode, vnode) {
      return oldVnode.key === vnode.key && oldVnode.tag === vnode.tag;
    }

    function removeVnodes(parent, vnodes, startIdx, endIdx) {
      for (var i = startIdx; i <= endIdx; i++) {
        var _vnode = vnodes[i];
        var elm = _vnode.elm;
        parent.removeChild(elm);
      }
    }

    function addVnodes(parent, before, vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var _vnode2 = vnodes[startIdx];

        if (_vnode2) {
          parent.insertBefore(createElm(_vnode2, [], parent), before);
        }
      }
    }

    function updateChildren(parentElm, oldCh, newCh) {
      if (oldCh === newCh) return;
      var oldStartIdx = 0,
          oldEndIdx = oldCh.length - 1,
          oldStartVnode = oldCh[0],
          oldEndVnode = oldCh[oldEndIdx],
          newStartIdx = 0,
          newEndIdx = newCh.length - 1,
          newStartVnode = newCh[0],
          newEndVnode = newCh[newEndIdx],
          oldKeyToIdx,
          idxInold;

      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
          oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldEndVnode == null) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (newStartVnode == null) {
          newStartVnode = newCh[++newStartIdx];
        } else if (newEndVnode == null) {
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
          patchVnode(oldStartVnode, newEndVnode);
          parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
          patchVnode(oldEndVnode, newStartVnode);
          parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (oldKeyToIdx === undefined) {
            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
          }

          idxInold = oldKeyToIdx[newStartVnode.key];

          if (idxInold === undefined) {
            parentElm.insertBefore(createElm(newStartVnode, [], parentElm), oldStartVnode.elm);
          } else {
            var moveVnode = oldCh[idxInold];

            if (!sameVnode(moveVnode, newStartVnode)) {
              parentElm.insertBefore(createElm(newStartVnode, [], parentElm), oldStartVnode.elm);
            } else {
              patchVnode(moveVnode, newStartVnode);
              parentElm.insertBefore(moveVnode.elm, oldStartVnode.elm);
              oldCh[idxInold] = null;
            }
          }

          newStartVnode = newCh[++newStartIdx];
        }
      }

      if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
        if (oldStartIdx > oldEndIdx) {
          // 插入剩余新增的子节点
          var before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
          addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
        } else {
          // 删除废弃的子节点
          removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
      }
    }

    function createKeyToOldIdx(children, startIdx, endIdx) {
      var map = {};

      for (var i = startIdx; i <= endIdx; i++) {
        var key = children[i].key;

        if (key) {
          map[key] = i;
        }
      }

      return map;
    }

    function updateProperties(vnode) {
      var props = vnode.data;
      var elm = vnode.elm;

      if (props) {
        if (props.attrs) {
          for (var attr in props.attrs) {
            if (attr === 'style') {
              for (var styleName in props.attrs.style) {
                elm.style[styleName] = props.attrs.style[styleName];
              }
            } else if (attr === 'class') {
              elm.className = props.attrs[attr];
            } else {
              elm.setAttribute(attr, props.attrs[attr]);
            }
          }
        }

        if (props.on) {
          for (var event in props.on) {
            elm.addEventListener(event, props.on[event].bind(vm));
          }
        }

        if (props.domProps) {
          for (var prop in props.domProps) {
            // elm.prop=props.domProps[prop]
            elm.setAttribute(prop, props.domProps[prop]);
          }
        }
      }
    }

    function updateDOMProps(oldVnode, vnode) {
      if (!oldVnode.data.domProps && !vnode.data.domProps) return;
      var elm = vnode.elm;
      var oldProps = oldVnode.data.domProps || {};
      var props = vnode.data.domProps || {}; // 清空不在新 VNode 里在老 VNode 的 domProps

      for (var key in oldProps) {
        if (!props[key]) {
          elm[key] = '';
        }
      }

      for (var _key in props) {
        var cur = props[_key];

        if (_key === 'value') {
          elm[_key] = cur;
        } else {
          elm[_key] = cur;
        }
      }
    }
  }

  function mountComponent(vm, el) {
    // const option=vm.$options;
    vm.$el = el;
    callHook(vm, 'beforeMount');

    var updateComponent = function updateComponent() {
      // _render 创建虚拟dom
      // _update 解析虚拟dom并创建真实dom
      var vnode = vm._render();

      vm._update(vnode);
    };

    new Watcher(vm, updateComponent, function () {}, {
      before: function before() {
        callHook(vm, 'beforeUpdate');
      }
    });
    callHook(vm, 'mounted');
  }
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      var prevVnode = vm._vnode;
      vm._vnode = vnode;

      if (!prevVnode) {
        vm.$el = vm.__patch__(vm.$el, vnode);
      } else {
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
    };

    Vue.prototype.$destroy = function () {
      var vm = this;
      callHook(vm, 'beforeDestroy');

      if (vm._watcher) {
        vm._watcher.teardown();
      }

      callHook(vm, 'destroyed');
    };
  }
  function callHook(vm, hook) {
    var handlers = vm.$options[hook];

    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(vm);
      }
    }
  }

  var has = {};
  var flushing = false;
  var queue = [];
  var index = 0;
  var waiting = false;
  function queueWatcher(watcher) {
    var id = watcher.id;

    if (!has[id]) {
      has[id] = true;

      if (!flushing) {
        queue.push(watcher);
      } else {
        // 执行 flushSchedulerQueue 过程中插入 watcher
        var i = queue.length - 1; // 按从小到大排列 插入id

        while (i > index && queue[index].id > id) {
          i--;
        }

        queue.splice(i + 1, 0, watcher);
      }

      if (!waiting) {
        waiting = true;
        setTimeout(flushSchedulerQueue, 0);
      }
    }
  }

  function flushSchedulerQueue() {
    flushing = true;
    queue.sort(function (a, b) {
      return a.id - b.id;
    });

    for (index = 0; index < queue.length; index++) {
      var watcher = queue[index];

      if (watcher.before) {
        watcher.before();
      }

      has[watcher.id] = null;
      watcher.run();
    }

    index = queue.length = 0;
    has = {};
    flushing = waiting = false;
    callHook(vm, 'updated');
  }

  var uid$1 = 0;

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, callback, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.callback = callback;
      this.options = options;
      this.deps = [];
      this.depIds = new Set();
      this.id = ++uid$1;

      if (options) {
        this.before = options.before;
      }

      if (typeof exprOrFn === 'function') {
        this.getter = exprOrFn;
      } else {
        this.getter = parsePath(exprOrFn);
      }

      this.value = this.get();
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        Dep.target = this;
        var value = '';

        try {
          value = this.getter.call(this.vm, this.vm);
        } catch (e) {} finally {
          Dep.target = null;
        }

        return value;
      }
    }, {
      key: "addDep",
      value: function addDep(dep) {
        if (!this.depIds.has(dep.id)) {
          dep.addSub(this);
          this.depIds.add(dep.id);
          this.deps.push(dep);
        }
      }
    }, {
      key: "run",
      value: function run() {
        var value = this.get();

        if (value !== this.value) {
          var oldValue = this.value;
          this.value = value;
          this.callback.call(this.vm, this.value, oldValue);
        }
      }
    }, {
      key: "update",
      value: function update() {
        queueWatcher(this);
      }
    }, {
      key: "teardown",
      value: function teardown() {
        var i = this.deps.length;

        while (i--) {
          this.deps[i].removeSub(this);
        }
      }
    }]);

    return Watcher;
  }();

  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: function get() {},
    set: function set() {}
  };

  function initState(vm) {
    var options = vm.$options;

    if (options.props) ;

    if (options.methods) {
      initMethods(vm);
    }

    if (options.data) {
      initData(vm);
    }

    if (options.computed) {
      initComputed(vm, options.computed);
    }

    if (options.watch) {
      initWatch(vm, options.watch);
    }
  }

  function initMethods(vm) {
    var methods = vm.$options.methods;

    if (methods) {
      for (var key in methods) {
        vm[key] = bind(methods[key], vm);
      }
    }
  }

  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
    Object.keys(data).forEach(function (key) {
      proxy(vm, '_data', key);
    });
    observe(data);
  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }

  function initComputed(vm, computed) {
    var watchers = vm._computedWatchers = Object.create(null);

    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;
      watchers[key] = new Watcher(vm, getter, function () {});

      if (!(key in vm)) {
        // computed 定义的变量一般不在 vm 上
        defineComputed(vm, key, userDef);
      }
    }
  }

  function defineComputed(target, key, userDef) {
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = createComputedGetter(key);

      sharedPropertyDefinition.set = function () {};
    }

    Object.defineProperty(target, key, sharedPropertyDefinition);
  }

  function createComputedGetter(key) {
    return function computedGetter() {
      var watcher = this._computedWatchers && this._computedWatchers[key];

      if (watcher) {
        return watcher.value;
      }
    };
  }

  function initWatch(vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      createWatcher(vm, key, handler);
    }
  }

  function createWatcher(vm, expOrFn, handler, options) {
    if (typeof handler === 'string') {
      handler = vm[handler];
    }

    return vm.$watch(expOrFn, handler, options);
  }

  function stateMixin(Vue) {
    Vue.prototype.$watch = function (expOrFn, cb, options) {
      var vm = this;
      options = options || {};
      var watcher = new Watcher(vm, expOrFn, cb);

      if (options.immediate) {
        cb.call(vm, watcher.value);
      }

      return function unwatchFn() {
        watcher.teardown();
      };
    };
  }

  function genAssignmentCode(value, assignment) {
    return value + "=" + assignment;
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  var startTagOpen = new RegExp("^<".concat(qnameCapture));
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var dirRE = /^v-|^@/;
  var root = null;
  var currentParent = null;
  var stack = [];

  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrsList: attrs,
      attrsMap: makeAttrsMap(attrs),
      parent: null
    };
  }

  function makeAttrsMap(attrs) {
    var map = {};

    for (var i = 0; i < attrs.length; i++) {
      map[attrs[i].name] = attrs[i].value;
    }

    return map;
  }

  function parseHtml(html) {
    root = null;
    currentParent = null;
    stack = [];

    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
        } else {
          var endTagMatch = html.match(endTag);

          if (endTagMatch) {
            advance(endTagMatch[0].length);
            end(endTagMatch[1]);
          }
        }
      }

      var text = void 0;

      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);

        var _end, attr; // 获取标签属性


        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length);
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
        }

        if (_end) {
          advance(_end[0].length);
        }

        return match;
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    return root;
  }

  function processAttrs(el) {
    var list = el.attrsList;
    el.attrs = el.attrs ? el.attrs : [];
    el.directives = el.directives ? el.directives : [];
    el.props = el.props ? el.props : [];
    el.events = el.events ? el.events : {};

    for (var i = 0; i < list.length; i++) {
      var name = list[i].name;
      var value = list[i].value;

      if (dirRE.test(name)) {
        if (/v-model/.test(name) && el.tag === 'input') {
          el.directives.push({
            name: 'model',
            rawName: 'v-model',
            value: value
          });
          el.events['input'] = genAssignmentCode(value, '$event.target.value');
          el.props.push({
            name: 'value',
            value: value
          });
        }

        if (/@click/.test(name)) {
          el.events['click'] = value;
        }
      } else {
        el.attrs.push({
          name: name,
          value: value
        });
      }
    }
  } // 处理开始标签


  function start(tagName, attrs) {
    var element = createASTElement(tagName, attrs);
    processAttrs(element);

    if (!root) {
      root = element;
    }

    currentParent = element;
    stack.push(element);

    if (tagName === 'input') {
      end();
    }
  } // 处理文本


  function chars(text) {
    text = text.replace(/\s/g, '');

    if (text) {
      currentParent.children.push({
        text: text,
        type: 3
      });
    }
  } // 处理结束标签


  function end(tagName) {
    var element = stack.pop();
    currentParent = stack[stack.length - 1];

    if (currentParent) {
      element.parent = currentParent;
      currentParent.children.push(element);
    }
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
  var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
  function generate(ast) {
    var children = genChildren(ast);
    var code = "_c(\"".concat(ast.tag, "\",\n  ").concat(ast.attrsList.length ? genData(ast) : 'undefined', "\n  ").concat(children ? ",".concat(children) : '', "\n  )");
    return code;
  }

  function genData(ast) {
    var data = '{';

    if (ast.attrs) {
      data += "attrs:" + genProps(ast.attrs) + ",";
    }

    if (ast.events) {
      data += "on:" + genHandlers(ast.events) + ",";
    }

    if (ast.props) {
      data += "domProps:" + genDomProps(ast.props) + ",";
    }

    data = data.replace(/,$/, ''); // data += "attrs:" + genProps(attrs.filter(item => !item.name.startsWith('@'))) + ",";
    // let events = attrs.filter(item => item.name.startsWith('@'));
    // if (events && events.length) {
    //   data += "on:" + genHandlers(events);
    // }

    data += '}';
    return data;
  }

  function genHandlers(events) {
    var data = '';
    Object.keys(events).forEach(function (key) {
      var isMethodPath = simplePathRE.test(events[key]);
      var isFunctionExpression = fnExpRE.test(events[key]); // let isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

      if (isMethodPath || isFunctionExpression) {
        data += "\"".concat(key, "\":").concat(events[key], ",");
      } else {
        data += "\"".concat(key, "\":function ($event){ ").concat(events[key], " },");
      }
    });
    data = data.replace(/,$/, '');
    return "{".concat(data, "}");
  }

  function genDomProps(props) {
    var data = '{';

    for (var i = 0; i < props.length; i++) {
      data += "\"".concat(props[i].name, "\":").concat(props[i].value, ","); // if (ast.elm) {
      //   ast.elm[ast.props[i].name] = ast.props[i].value;
      // }
    }

    data = data.replace(/,$/, '');
    data += '}';
    return data;
  }

  function genProps(attrs) {
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name === "style") {
        (function () {
          var obj = {};
          attr.value.split(";").forEach(function (item) {
            var _item$split = item.split(":"),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    return "{".concat(str.slice(0, -1), "}");
  }

  function genChildren(ast) {
    var children = ast.children;

    if (children && children.length > 0) {
      return "".concat(children.map(function (c) {
        return gen(c);
      }).join(','));
    } else {
      return false;
    }
  }

  function gen(node) {
    if (node.type === 1) {
      return generate(node);
    } else {
      var text = node.text;
      var tokens = [];
      var match, index;
      var lastIndex = defaultTagRE.lastIndex = 0;

      while (match = defaultTagRE.exec(text)) {
        index = match.index;

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
      }

      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }

      return "_v(".concat(tokens.join('+'), ")");
    }
  }

  function compileToFunctions(template) {
    var root = parseHtml(template);
    var code = generate(root);
    var renderFn = new Function("with(this){return ".concat(code, "}"));
    return renderFn;
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;

      if (options && options._isComponent) {
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(vm.constructor.options, options || {});
      }

      callHook(vm, 'beforeCreate'); // initRender(vm);

      initState(vm);
      callHook(vm, 'created');

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.__patch__ = createPatchFunction;

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = el ? document.querySelector(el) : undefined; // options.el = el;

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        }

        options.render = compileToFunctions(template);
      }

      mountComponent(vm, el);
    };
  }
  function initInternalComponent(vm, options) {
    var opts = vm.$options = mergeOptions(options || {}, vm.constructor.options); // const parentVnode = options._parentVnode
    // opts.parent = options.parent
    // opts._parentVnode = parentVnode
    // if (options.render) {
    //   opts.render = options.render
    // }
  }

  function createElement(context, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var key = data.key;
    var vnode;

    if (key) {
      delete data.key;
    }

    if (typeof tag === 'string') {
      var Ctor;

      for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        children[_key - 3] = arguments[_key];
      }

      if (isReservedTag(tag)) {
        vnode = new VNode(tag, data, key, children, undefined);
      } else if (Ctor = resolveAsset(context.$options, 'components', tag)) {
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        vnode = new VNode(tag, data, key, children, undefined);
      }
    }

    return vnode;
  }
  function createTextNode(text) {
    return new VNode(undefined, undefined, undefined, undefined, text);
  }

  function resolveAsset(options, type, id) {
    var assets = options[type];
    return assets[id];
  }

  function renderMixin(Vue) {
    // _c 创建元素的虚拟节点
    // _v 创建文本的虚拟节点
    // _s 文本变量
    Vue.prototype._c = function (tag) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      return createElement.apply(void 0, [this, tag, data].concat(children));
    };

    Vue.prototype._v = function (text) {
      return createTextNode(text);
    };

    Vue.prototype._s = function (val) {
      return val == null ? '' : _typeof(val) === "object" ? JSON.stringify(val) : val;
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm);
      return vnode;
    };
  }

  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue);
  stateMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(Vue);

  function initExtend(Vue) {
    Vue.cid = 0;
    var cid = 1;

    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId];
      }

      var name = extendOptions.name || Super.options.name;

      var Sub = function VueComponent(options) {
        this._init(options);
      };

      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++; // 简易形式， vue 使用 mergeOptions 合并

      Sub.options = Object.assign({}, Super.options, extendOptions);
      Sub['super'] = Super;
      Sub.extend = Super.extend;

      if (name) {
        Sub.options.components[name] = Sub;
      }

      return Sub;
    };
  }

  function initAssetRegisters(Vue) {
    ASSET_TYPES.forEach(function (type) {
      Vue[type] = function (id, definition) {
        if (!definition) {
          return this.options[type + 's'][id];
        } else {
          if (type === 'component' && isPlainObject(definition)) {
            definition.name = definition.name || id;
          }

          definition = this.options._base.extend(definition); // 继承全局 vue 的 options

          this.options[type + 's'][id] = definition;
          return definition;
        }
      };
    });
  }

  function initGlobalAPI(Vue) {
    Vue.options = Object.create(null);
    ASSET_TYPES.forEach(function (type) {
      Vue.options[type + 's'] = Object.create(null);
    });
    Vue.options._base = Vue;
    initExtend(Vue);
    initAssetRegisters(Vue);
  }

  initGlobalAPI(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
