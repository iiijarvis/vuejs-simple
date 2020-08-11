import { initState } from './state'
import { compileToFunctions } from '../../compiler/index'
import { mountComponent } from './lifecycle'
import { createPatchFunction } from '../vdom/patch'
import { callHook } from './lifecycle'
import { mergeOptions } from '../util/index'
// import { initRender } from './render'

export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;

    if (options && options._isComponent) {
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(vm.constructor.options, options || {});
    }

    callHook(vm, 'beforeCreate');

    // initRender(vm);
    initState(vm);
    callHook(vm, 'created');

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
  const opts = vm.$options = mergeOptions(options || {}, vm.constructor.options);

  // const parentVnode = options._parentVnode
  // opts.parent = options.parent
  // opts._parentVnode = parentVnode
  // if (options.render) {
  //   opts.render = options.render
  // }
}
