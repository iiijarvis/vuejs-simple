import { isReservedTag } from '../util/index'
import { createComponent } from './create-component'
import { VNode } from './vnode'

export function createElement (context, tag, data = {}, ...children) {
  let key = data.key;
  let vnode;
  if (key) {
    delete data.key;
  }
  if (typeof tag === 'string') {
    let Ctor;
    if (isReservedTag(tag)) {
      vnode = new VNode(tag, data, key, children, undefined);
    } else if (Ctor = resolveAsset(context.$options, 'components', tag)) {
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      vnode = new VNode(tag, data, key, children, undefined);
    }
  }
  return vnode;
}

export function createTextNode (text) {
  return new VNode(undefined, undefined, undefined, undefined, text);
}

function resolveAsset (options, type, id) {
  const assets = options[type];
  return assets[id];
}
