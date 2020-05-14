export function patch (oldVnode, vnode) {
  const isRealElement = oldVnode.nodeType;
  if (isRealElement) {
    const oldElm = oldVnode;
    const parentElm = oldElm.parentNode;

    let el = createElm(vnode);
    parentElm.insertBefore(el, oldElm.nextSibling);
    parentElm.removeChild(oldElm);
  }
}

function createElm (vnode) {
  let { tag, data, key, children, text } = vnode;

  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag);
    children.forEach(child => {
      return vnode.el.appendChild(createElm(child));
    })
    updateProperties(vnode);
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function updateProperties (vnode) {
  let newProps = vnode.data;
  let el = vnode.el;
  for (let key in newProps) {
    if (key === 'style') {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === 'class') {
      el.className = newProps.class;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}