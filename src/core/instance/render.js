import { createElement, createTextNode } from '../vdom/create-element'

let cacheComponent = {};

export function initRender (vm) {
  vm._c = (tag, options) => {
    let Ctor = vm.constructor.options['component'][tag];
    let sub;
    if (cacheComponent[tag]) {
      sub = cacheComponent[tag];
    } else {
      sub = cacheComponent[tag] = new Ctor(Ctor.options);
    }

    return Ctor.options.render.call(sub);
  }
}

export function renderMixin (Vue) {

  // _c 创建元素的虚拟节点
  // _v 创建文本的虚拟节点
  // _s 文本变量
  Vue.prototype._c = function (tag, data = {}, ...children) {
    return createElement(this, tag, data, ...children);
  }
  Vue.prototype._v = function (text) {
    return createTextNode(text);
  }
  Vue.prototype._s = function (val) {
    return val == null ? '' : (typeof val === "object" ? JSON.stringify(val) : val);
  }

  Vue.prototype._render = function () {
    const vm = this;
    const { render } = vm.$options;

    let vnode = render.call(vm);
    return vnode;
  }
}