import { parseHtml } from './parser-html';
import { generate } from './codegen/index';

export function compileToFunctions (template) {
  let root = parseHtml(template);
  let code = generate(root);
}