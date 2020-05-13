import { parseHtml } from './parser-html'

export function compileToFunctions (template) {
  parseHtml(template);
}