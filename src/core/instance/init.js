import { initState } from './state'
import { compileToFunctions } from '../../compiler/index'
import { mountComponent } from './lifecycle'

export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;

    initState(this);

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  }

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);

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