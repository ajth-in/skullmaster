import generate from "@babel/generator";
import { JSDOM } from "jsdom";
import fn from "../src";
export function transform(html: string): string {
  const dom = new JSDOM(html);

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
export function normalize(str: string): string {
  return str.replace(/\s+/g, "");
}
