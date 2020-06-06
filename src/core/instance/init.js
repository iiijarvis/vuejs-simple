import { initState } from './state'
import { compileToFunctions } from '../../compiler/index'
import { mountComponent } from './lifecycle'
import { createPatchFunction } from '../vdom/patch'
// import { initRender } from './render'

export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = options;

    if (options && options._isComponent) {
      initInternalComponent(vm, options);
    } else {
      vm.$options = Object.assign({}, vm.constructor.options, options || {})
    }

    // initRender(vm);
    initState(vm);

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  }

  Vue.prototype.__patch__ = createPatchFunction;

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = el ? document.querySelector(el) : undefined;
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

export function initInternalComponent (vm, options) {
  const opts = vm.$options = Object.assign({}, vm.constructor.options, options)

  // const parentVnode = options._parentVnode
  // opts.parent = options.parent
  // opts._parentVnode = parentVnode
  // if (options.render) {
  //   opts.render = options.render
  // }
}
