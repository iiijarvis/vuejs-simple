import { isObject, def } from '../util/index';
import { arrayMethods } from './array';
import Dep from './dep';

export function observe (data) {
  if (!isObject(data)) return;
  return new Observer(data);
}

export class Observer {
  constructor(data) {
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
  walk (data) {
    Object.keys(data).forEach(key => {
      let value = data[key];
      defineReactive(data, key, value);
    });
  }
  observeArray (data) {
    for (let i = 0; i < data.length; i++) {
      observe(data[i]);
    }
  }
}

function defineReactive (data, key, value) {
  const dep = new Dep();
  observe(value); // 递归调用
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      if (Dep.target) {
        dep.depend();
      }
      return value;
    },
    set (newVal) {
      if (newVal === value) return;
      value = newVal;
      dep.notify();
    }
  })
}
