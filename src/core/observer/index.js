import { isObject } from '../util/index'

export function observe (data) {
  if (!isObject(data)) return;
  return new Observer(data);
}

export class Observer {
  constructor(data) {
    if (Array.isArray(data)) {
      console.log('暂不支持数组');
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
}

function defineReactive (data, key, value) {
  observe(value); // 递归调用
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get () {
      return value;
    },
    set (newVal) {
      if (newVal === value) return;
      value = newVal;
    }
  })
}