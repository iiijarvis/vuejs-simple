const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
const fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
const fnInvokeRE = /\([^)]*?\);*$/;
const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

export function generate (ast) {
  let children = genChildren(ast);
  let code = `_c("${ast.tag}",
  ${ast.attrsList.length ? genData(ast) : 'undefined'}
  ${children ? `,${children}` : ''}
  )`;

  return code;
}

function genData (ast) {
  let data = '{';
  if (ast.attrs) {
    data += "attrs:" + genProps(ast.attrs) + ",";
  }
  if (ast.events) {
    data += "on:" + genHandlers(ast.events) + ",";
  }
  if (ast.props) {
    data += "domProps:" + genDomProps(ast.props) + ",";
  }

  data = data.replace(/,$/, '');
  // data += "attrs:" + genProps(attrs.filter(item => !item.name.startsWith('@'))) + ",";
  // let events = attrs.filter(item => item.name.startsWith('@'));
  // if (events && events.length) {
  //   data += "on:" + genHandlers(events);
  // }
  data += '}';
  return data;
}

function genHandlers (events) {
  let data = '';
  Object.keys(events).forEach(key => {

    let isMethodPath = simplePathRE.test(events[key]);
    let isFunctionExpression = fnExpRE.test(events[key]);
    // let isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

    if (isMethodPath || isFunctionExpression) {
      data += `"${key}":${events[key]},`;
    } else {
      data += `"${key}":function ($event){ ${events[key]} },`;
    }
  })
  data = data.replace(/,$/, '');

  return `{${data}}`;
}

function genDomProps (props) {
  let data = '{';
  for (var i = 0; i < props.length; i++) {
    data += `"${props[i].name}":${props[i].value},`;
    // if (ast.elm) {
    //   ast.elm[ast.props[i].name] = ast.props[i].value;
    // }
  }

  data = data.replace(/,$/, '');
  data += '}';
  return data;
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