import * as t from "@babel/types";
import { normalizeAttributeName } from "./utils/attr-normalize";
import { parseStyle } from "./utils/parse-style";
import shouldKeepAttribute from "./utils/is-style";

type JsxChild = t.JSXElement | t.JSXText;

export default function htmlNodeToJsx(
  node: Node,
  depth: number = 0,
): JsxChild | null {
  if (node.nodeType === node.TEXT_NODE) {
    const text = node.textContent;
    if (!text?.trim()) return null;
    return t.jsxText("#".repeat(text.length));
  }

  if (node.nodeType !== node.ELEMENT_NODE) return null;

  const element = node as HTMLElement;
  const tagName = element.tagName.toLowerCase();
  const attributes: t.JSXAttribute[] = [];

  const dataDepthAlreadySet = element.getAttribute("data-depth") !== null;

  for (const attr of element.attributes) {
    if (!shouldKeepAttribute(attr.name)) continue;

    const value = attr.value;
    const name = normalizeAttributeName(attr.name);

    if (name === "style") {
      attributes.push(
        t.jsxAttribute(
          t.jsxIdentifier("style"),
          t.jsxExpressionContainer(parseStyle(value)),
        ),
      );
      continue;
    }

    if (name === "data-depth") {
      attributes.push(
        t.jsxAttribute(t.jsxIdentifier("data-depth"), t.stringLiteral(value)),
      );
      continue;
    }

    attributes.push(
      t.jsxAttribute(t.jsxIdentifier(name), t.stringLiteral(value)),
    );

    if (depth === 0 && name === "className") {
      const existingClassName = attributes.find(
        (attr): attr is t.JSXAttribute =>
          t.isJSXAttribute(attr) &&
          t.isJSXIdentifier(attr.name) &&
          attr.name.name === "className",
      );
      if (
        existingClassName?.value &&
        t.isStringLiteral(existingClassName.value)
      ) {
        existingClassName.value = t.stringLiteral(
          `empty-set__skeleton ${existingClassName.value.value}`,
        );
      }
    }
  }

  if (
    depth === 0 &&
    !attributes.some(
      (a): a is t.JSXAttribute =>
        t.isJSXAttribute(a) &&
        t.isJSXIdentifier(a.name) &&
        a.name.name === "className",
    )
  ) {
    attributes.push(
      t.jsxAttribute(
        t.jsxIdentifier("className"),
        t.stringLiteral("empty-set__skeleton"),
      ),
    );
  }

  if (!dataDepthAlreadySet) {
    attributes.push(
      t.jsxAttribute(
        t.jsxIdentifier("data-depth"),
        t.stringLiteral(String(depth)),
      ),
    );
  }

  const children = Array.from(element.childNodes)
    .map((child) => htmlNodeToJsx(child, depth + 1))
    .filter(Boolean) as JsxChild[];

  return t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier(tagName), attributes, false),
    t.jsxClosingElement(t.jsxIdentifier(tagName)),
    children,
    false,
  );
}
