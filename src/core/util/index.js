export function isObject (obj) {
  return obj !== null && typeof obj === 'object';
}

export function def (data, key, value, enumerable) {
  Object.defineProperty(data, key, {
    value: value,
    enumerable: !!enumerable,
    configurable: true
  })
}

export function bind (fn, ctx) {
  return function (a) {
    var l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
}
