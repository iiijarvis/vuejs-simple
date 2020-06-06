import { VNode } from './vnode'

export function createComponent (Ctor, data, context, children, tag) {
  if (!Ctor) return;
  const baseCtor = context.$options._base

  // 针对局部组件注册场景
  if (typeof Ctor === 'object') {
    Ctor = baseCtor.extend(Ctor)
  }

  data = data || {}

  const name = Ctor.options.name || tag

  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, undefined, context,
    { Ctor: Ctor, tag: tag, children: children }
  )

  return vnode;
}

export function createComponentInstanceForVnode (vnode, parent) {
  let options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };

  return new vnode.componentOptions.Ctor(options);
}