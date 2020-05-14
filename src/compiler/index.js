import { parseHtml } from './parser-html';
import { generate } from './codegen/index';

export function compileToFunctions (template) {
  let root = parseHtml(template);
  let code = generate(root);

  let renderFn = new Function(`with(this){return ${code}}`);

  return renderFn;
}