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