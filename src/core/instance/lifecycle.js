import Watcher from '../observer/watcher'
import { patch } from '../vdom/patch'

export function mountComponent (vm, el) {
  // const option=vm.$options;
  vm.$el = el;

  let updateComponent = () => {
    // _render 创建虚拟dom
    // _update 解析虚拟dom并创建真实dom
    vm._update(vm._render());
  }
  new Watcher(vm, updateComponent, () => { }, true);
}

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
  }
}