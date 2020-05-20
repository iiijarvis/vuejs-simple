import { initState } from './state'
import { compileToFunctions } from '../../compiler/index'
import { mountComponent } from './lifecycle'
import { createPatchFunction } from '../vdom/patch'

export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;

    initState(this);

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  }

  Vue.prototype.__patch__ = createPatchFunction;

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    // options.el = el;

    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }
      options.render = compileToFunctions(template);
    }
    mountComponent(vm, el);
  }
}