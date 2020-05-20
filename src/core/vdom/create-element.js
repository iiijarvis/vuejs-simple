export function createElement (tag, data = {}, ...children) {
  let key = data.key;
  if (key) {
    delete data.key;
  }
  return VNode(tag, data, key, children, undefined);
}

export function createTextNode (text) {
  return VNode(undefined, undefined, undefined, undefined, text);
}

export function VNode (tag, data, key, children, text, elm) {
  return {
    tag: tag,
    data: data,
    key: key,
    children: children,
    text: text,
    elm: elm
  };
}