
import { ASSET_TYPES } from '../shared/constants'
import { extend } from '../util/index'

export function initExtend (Vue) {
  Vue.cid = 0;
  let cid = 1;

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    const Super = this;
    const SuperId = Super.cid;
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    const name = extendOptions.name || Super.options.name;

    const Sub = function VueComponent (options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    // 简易形式， vue 使用 mergeOptions 合并
    Sub.options = Object.assign({}, Super.options, extendOptions);
    Sub['super'] = Super;
    Sub.extend = Super.extend;
    if (name) {
      Sub.options.components[name] = Sub;
    }

    return Sub;
  }
}
