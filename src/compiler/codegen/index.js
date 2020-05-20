let defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

export function generate (ast) {
  let children = genChildren(ast);
  let code = `_c("${ast.tag}",
  ${ast.attrs.length ? genData(ast.attrs) : 'undefined'}
  ${children ? `,${children}` : ''}
  )`;

  return code;
}

function genData (attrs) {
  let data = '{';
  data += "attrs:" + genProps(attrs.filter(item => !item.name.startsWith('@'))) + ",";
  let events = attrs.filter(item => item.name.startsWith('@'));
  if (events && events.length) {
    data += "on:" + getHandlers(events);
  }
  data += '}';
  return data;
}

function getHandlers (events) {
  let data = '';
  events.forEach(item => {
    data += `"${item.name.replace('@', '')}":"${item.value}",`;
  })
  return `{${data.slice(0, -1)}}`;
}

function genProps (attrs) {
  let str = '';
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === "style") {
      let obj = {};
      attr.value.split(";").forEach(item => {
        let [key, value] = item.split(":");
        obj[key] = value;
      });
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`;
}

function genChildren (ast) {
  let children = ast.children;
  if (children && children.length > 0) {
    return `${children.map(c => gen(c)).join(',')}`;
  } else {
    return false;
  }
}

function gen (node) {
  if (node.type === 1) {
    return generate(node);
  } else {
    let text = node.text;
    let tokens = [];
    let match, index;
    let lastIndex = defaultTagRE.lastIndex = 0;
    while (match = defaultTagRE.exec(text)) {
      index = match.index;
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return `_v(${tokens.join('+')})`;
  }
}