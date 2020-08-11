import Watcher from '../observer/watcher'
import { patch } from '../vdom/patch'

export function mountComponent (vm, el) {
  // const option=vm.$options;
  vm.$el = el;

  callHook(vm, 'beforeMount');

  let updateComponent = () => {
    // _render 创建虚拟dom
    // _update 解析虚拟dom并创建真实dom
    let vnode = vm._render();
    vm._update(vnode);
  }
  new Watcher(vm, updateComponent, () => { }, {
    before () {
      callHook(vm, 'beforeUpdate');
    }
  });

  callHook(vm, 'mounted');

}

export function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    let prevVnode = vm._vnode;
    vm._vnode = vnode;
    if (!prevVnode) {
      vm.$el = vm.__patch__(vm.$el, vnode);
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
  }

  Vue.prototype.$destroy = function () {
    const vm = this;

    callHook(vm, 'beforeDestroy');

    if (vm._watcher) {
      vm._watcher.teardown()
    }

    callHook(vm, 'destroyed');

  }
}

export function callHook (vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm);
    }
  }
}
