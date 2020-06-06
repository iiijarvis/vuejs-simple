const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const doctype = /^<!DOCTYPE [^>]+>/i;
const dirRE = /^v-|^@/;

import { genAssignmentCode } from './directives/model.js';


let root = null;
let currentParent = null;
let stack = [];

function createASTElement (tagName, attrs) {
  return {
    tag: tagName,
    type: 1,
    children: [],
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: null
  }
}

function makeAttrsMap (attrs) {
  let map = {};
  for (let i = 0; i < attrs.length; i++) {
    map[attrs[i].name] = attrs[i].value;
  }
  return map;
}

export function parseHtml (html) {

  root = null;
  currentParent = null;
  stack = [];

  while (html) {
    let textEnd = html.indexOf('<');
    if (textEnd === 0) {
      let startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
      } else {
        let endTagMatch = html.match(endTag);
        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
        }
      }
    }
    let text;
    if (textEnd >= 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      chars(text);
    }
  }

  function parseStartTag () {
    let start = html.match(startTagOpen);
    if (start) {
      const match = { tagName: start[1], attrs: [] };
      advance(start[0].length);

      let end, attr;
      // 获取标签属性
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        });
      }
      if (end) {
        advance(end[0].length);
      }

      return match;
    }
  }

  function advance (n) {
    html = html.substring(n);
  }

  return root;
}

function processAttrs (el) {
  let list = el.attrsList;
  el.attrs = el.attrs ? el.attrs : [];
  el.directives = el.directives ? el.directives : [];
  el.props = el.props ? el.props : [];
  el.events = el.events ? el.events : {};

  for (let i = 0; i < list.length; i++) {
    let name = list[i].name;
    let value = list[i].value;
    if (dirRE.test(name)) {
      if (/v-model/.test(name) && el.tag === 'input') {
        el.directives.push({ name: 'model', rawName: 'v-model', value: value });
        el.events['input'] = genAssignmentCode(value, '$event.target.value');
        el.props.push({ name: 'value', value: value });
      }
      if (/@click/.test(name)) {
        el.events['click'] = value;
      }
    } else {
      el.attrs.push({ name: name, value: value });
    }
  }
}

// 处理开始标签
function start (tagName, attrs) {
  let element = createASTElement(tagName, attrs);
  processAttrs(element);
  if (!root) {
    root = element;
  }
  currentParent = element;
  stack.push(element);
  if (tagName === 'input') {
    end(tagName);
  }
}

// 处理文本
function chars (text) {
  text = text.replace(/\s/g, '');
  if (text) {
    currentParent.children.push({
      text: text,
      type: 3
    });
  }
}

// 处理结束标签
function end (tagName) {
  let element = stack.pop();
  currentParent = stack[stack.length - 1];
  if (currentParent) {
    element.parent = currentParent;
    currentParent.children.push(element);
  }
}