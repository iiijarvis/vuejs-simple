import { initMixin } from './init'
import { renderMixin } from './render'
import { lifecycleMixin } from './lifecycle'
import { stateMixin } from './state'

export default function Vue (options) {
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
renderMixin(Vue);
lifecycleMixin(Vue);