import { JSDOM } from "jsdom";
import pkg from "@babel/generator";

// @ts-ignore
const generate = pkg.default;

import htmlNodeToJsx from "@skullmaster/excarnate";

export function transformInput(html: string) {
  const dom = new JSDOM(html);

  const root = dom.window.document.body.firstElementChild;

  if (!root) {
    throw new Error("No root element found");
  }

  const jsxAst = htmlNodeToJsx(root, 0);

  if (!jsxAst) {
    throw new Error("Failed to generate JSX AST");
  }

  const result = generate(jsxAst, {
    jsescOption: {
      minimal: true,
    },
  });

  return result.code;
}
