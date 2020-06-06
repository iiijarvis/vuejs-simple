
export class VNode {
  constructor(tag, data, key, children = [], text, elm, context, componentOptions) {
    this.tag = tag;
    this.data = data;
    this.key = key;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.context = context;
    this.componentOptions = componentOptions;
  }
}
