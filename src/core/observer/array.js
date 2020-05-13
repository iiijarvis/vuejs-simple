const oldArrayMethods = Array.prototype;
export const arrayMethods = Object.create(oldArrayMethods)

const methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice'];

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    const result = oldArrayMethods[method].apply(this, args); // 调用原生数组方法
    let inserted;
    const ob = this.__ob__;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    return result;
  }
});
