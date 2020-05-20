import { VNode } from './create-element'

export function createPatchFunction (oldVnode, vnode) {
  const vm = this;
  return patch(oldVnode, vnode);

  function patch (oldVnode, vnode) {
    const isRealElement = oldVnode.nodeType; // 虚拟dom没有nodeType属性，真实dom才有
    // let parent = vm.$el.parentNode;
    // const oldElm = oldVnode;
    // const parentElm = oldElm.parentNode;

    // let el = createElm(vnode);
    // parent.appendChild(el);
    // if (isRealElement) {
    //   parentElm.removeChild(oldElm);
    // }
    if (!isRealElement && sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode);
    } else {
      if (isRealElement) {
        oldVnode = emptyNodeAt(oldVnode);
      }
      let elm = oldVnode.elm;
      let parent = elm.parentNode;
      createElm(vnode);
      parent.insertBefore(vnode.elm, elm);
      parent.removeChild(elm);
    }
    return vnode.elm;
  }

  function createElm (vnode) {
    let { tag, data, key, children, text } = vnode;

    if (typeof tag === 'string') {
      vnode.elm = document.createElement(tag);
      children.forEach(child => {
        return vnode.elm.appendChild(createElm(child));
      })
      updateProperties(vnode);
    } else {
      vnode.elm = document.createTextNode(text);
    }
    return vnode.elm;
  }

  function patchVnode (oldVnode, vnode) {
    if (oldVnode === vnode) return;

    const elm = vnode.elm = oldVnode.elm;
    const oldCh = oldVnode.children;
    const ch = vnode.children;

    if (!vnode.text) { // 判断是否为文本
      if (oldCh && ch) { // 是否有子节点
        updateChildren(elm, oldCh, ch);
      } else if (ch) {
        if (oldCh.text) {
          elm.textContent = '';
        }
        addVnodes(elm, null, ch, 0, ch.length - 1);
      } else if (oldCh) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else {
        elm.textContent = '';
      }
    } else {
      if (oldCh) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      }
      elm.textContent = vnode.text;
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(elm.tagName.toLowerCase(), {}, [], undefined, undefined, elm);
  }

  function sameVnode (oldVnode, vnode) {
    return oldVnode.key === vnode.key && oldVnode.tag === vnode.tag;
  }

  function removeVnodes (parent, vnodes, startIdx, endIdx) {
    for (let i = startIdx; i <= endIdx; i++) {
      let vnode = vnodes[i];
      let elm = vnode.elm;
      parent.removeChild(elm);
    }
  }

  function addVnodes (parent, before, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      let vnode = vnodes[startIdx];
      if (vnode) {
        parent.insertBefore(createElm(vnode), before);
      }
    }
  }

  function updateChildren (parentElm, oldCh, newCh) {
    if (oldCh === newCh) return;
    let oldStartIdx = 0,
      oldEndIdx = oldCh.length - 1,
      oldStartVnode = oldCh[0],
      oldEndVnode = oldCh[oldEndIdx],
      newStartIdx = 0,
      newEndIdx = newCh.length - 1,
      newStartVnode = newCh[0],
      newEndVnode = newCh[newEndIdx],
      oldKeyToIdx,
      idxInold;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx];
      } else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode);
        parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode);
        parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }
        idxInold = oldKeyToIdx[newStartVnode.key];
        if (idxInold === undefined) {
          parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm);
        } else {
          let moveVnode = oldCh[idxInold];
          if (!sameVnode(moveVnode, newStartVnode)) {
            parentElm.insertBefore(createElm(newStartVnode), oldStartVnode.elm);
          } else {
            patchVnode(moveVnode, newStartVnode);
            parentElm.insertBefore(moveVnode.elm, oldStartVnode.elm);
            oldCh[idxInold] = null;
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        // 插入剩余新增的子节点
        let before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
      } else {
        // 删除废弃的子节点
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }

  function createKeyToOldIdx (children, startIdx, endIdx) {
    let map = {};
    for (let i = startIdx; i <= endIdx; i++) {
      let key = children[i].key;
      if (key) {
        map[key] = i;
      }
    }
    return map;
  }

  function updateProperties (vnode) {
    let props = vnode.data;
    let elm = vnode.elm;
    if (props) {
      if (props.attrs) {
        for (let attr in props.attrs) {
          if (attr === 'style') {
            for (let styleName in props.attrs.style) {
              elm.style[styleName] = props.attrs.style[styleName];
            }
          } else if (attr === 'class') {
            elm.className = props.attrs[attr];
          } else {
            elm.setAttribute(attr, props.attrs[attr]);
          }
        }
      }
      if (props.on) {
        for (let event in props.on) {
          elm.addEventListener(event, vm[props.on[event]].bind(vm));
        }
      }
    }
  }
}
