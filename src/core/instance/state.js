import { observe } from '../observer/index'
import { bind } from '../util/index'
import Watcher from '../observer/watcher'
import Dep from '../observer/dep';

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: () => { },
  set: () => { }
}

function initState (vm) {
  const options = vm.$options;
  if (options.props) {
    initProps();
  }
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

function initProps () { }

function initMethods (vm) {
  const methods = vm.$options.methods;
  if (methods) {
    for (let key in methods) {
      vm[key] = bind(methods[key], vm);
    }
  }
}

function initData (vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};

  Object.keys(data).forEach((key) => {
    proxy(vm, '_data', key);
  });
  observe(data);
}

function proxy (vm, source, key) {
  Object.defineProperty(vm, key, {
    configurable: true,
    enumerable: true,
    get () {
      return vm[source][key];
    },
    set (newValue) {
      vm[source][key] = newValue;
    }
  })
}

function initComputed (vm, computed) {
  const watchers = vm._computedWatchers = Object.create(null);

  for (let key in computed) {
    const userDef = computed[key];
    let getter = typeof userDef === 'function' ? userDef : userDef.get;
    watchers[key] = new Watcher(vm, getter, () => { });

    if (!(key in vm)) { // computed 定义的变量一般不在 vm 上
      defineComputed(vm, key, userDef);
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = () => { };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      return watcher.value;
    }
  }
}

function initWatch (vm, watch) {
  for (let key in watch) {
    const handler = watch[key];

    createWatcher(vm, key, handler);
  }
}

function createWatcher (vm, expOrFn, handler, options) {
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}

export function stateMixin (Vue) {
  Vue.prototype.$watch = function (expOrFn, cb, options) {
    const vm = this;
    options = options || {};
    const watcher = new Watcher(vm, expOrFn, cb);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  }
}

export { initState };