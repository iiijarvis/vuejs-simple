import { observe } from '../observer/index'

function initState (vm) {
  const options = vm.$options;
  if (options.props) {
    initProps();
  }
  if (options.methods) {
    initMethods();
  }
  if (options.data) {
    initData(vm);
  }
  if (options.computed) {
    initComputed();
  }
  if (options.watch) {
    initWatch();
  }
}

function initProps () { }

function initMethods () { }

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


function initComputed () { }

function initWatch () { }

export { initState };