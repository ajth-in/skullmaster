import { JSDOM } from "jsdom";
import pkg from "@babel/generator";

// @ts-ignore
const generate = pkg.default;

import htmlNodeToJsx from "@skullmaster/excarnate";
import { stripToShim } from "./strip-to-shim";

export function transformInput(html: string) {
  const dom = new JSDOM(html);

  const root = dom.window.document.body.firstElementChild;

  if (!root) {
    throw new Error("No root element found");
  }

  const strippedRoot = stripToShim(root);

  if (!strippedRoot) {
    throw new Error("Failed to generate skeleton DOM structure");
  }

  const jsxAst = htmlNodeToJsx(strippedRoot, 0);

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
