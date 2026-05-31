import generate from "@babel/generator";
import { JSDOM } from "jsdom";
import fn from "../src";
import { TemplateResult } from "lit";
export function transform(html: TemplateResult<1> | string): string {
  const dom = new JSDOM(typeof html === "string" ? html : html.strings[0]);

  const root = dom.window.document.body.firstElementChild;

  if (!root) {
    throw new Error("No root element found");
  }

  const ast = fn(root, 0);

  if (!ast) {
    throw new Error("No JSX generated");
  }

  return generate(ast).code;
}
export function normalize(str: TemplateResult<1> | string): string {
  if (typeof str === "string") {
    return str.replace(/\s+/g, "");
  }
  return str.strings[0].replace(/\s+/g, "");
}
