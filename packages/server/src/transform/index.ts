import { JSDOM } from "jsdom";
import * as t from "@babel/types";
import pkg from "@babel/generator";
import { format } from "oxfmt";

// @ts-ignore
const generate = pkg.default;

import htmlNodeToJsx from "./html-jsx";

export function transformInput(html: string) {
  const dom = new JSDOM(html);

  const root = dom.window.document.body.firstElementChild;

  if (!root) {
    throw new Error("No root element found");
  }

  const jsxAst = htmlNodeToJsx(root);

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
