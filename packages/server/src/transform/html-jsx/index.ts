import * as t from "@babel/types";
import { normalizeAttributeName } from "./utils/attr-normalize";
import { parseStyle } from "./utils/parse-style";
import shouldKeepAttribute from "./utils/is-style";
import { createElement } from "./utils/create-element";
import flow from "lodash/flow";
type JsxChild = t.JSXElement | t.JSXText;

export default function htmlNodeToJsx(
  node: Node,
  depth: number = 0,
  parentDepth?: string,
): JsxChild | null {
  if (node.nodeType === node.TEXT_NODE) {
    const text = node.textContent;

    if (!text?.trim()) {
      return null;
    }
    return createElement(
      "span",
      [
        { key: "className", value: "empty-set__text" },
        { key: "data-depth", value: parentDepth ?? String(depth) },
      ],
      [t.jsxText(text.replace(/\S/g, "."))],
    );
  }

  if (node.nodeType !== node.ELEMENT_NODE) {
    return null;
  }

  const element = node as HTMLElement;
  const tagName = element.tagName.toLowerCase();

  const attributes: t.JSXAttribute[] = [];

  const explicitDepth = element.getAttribute("data-depth");
  const dataDepthAlreadySet = explicitDepth !== null;

  for (const attr of element.attributes) {
    if (!shouldKeepAttribute(attr.name)) {
      continue;
    }

    const name = normalizeAttributeName(attr.name);
    const value = attr.value;

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
  }

  if (depth === 0) {
    const classNameAttr = attributes.find(
      (attr): attr is t.JSXAttribute =>
        t.isJSXAttribute(attr) &&
        t.isJSXIdentifier(attr.name) &&
        attr.name.name === "className",
    );

    if (classNameAttr?.value && t.isStringLiteral(classNameAttr.value)) {
      classNameAttr.value = t.stringLiteral(
        `empty-set__skeleton ${classNameAttr.value.value}`,
      );
    } else {
      attributes.push(
        t.jsxAttribute(
          t.jsxIdentifier("className"),
          t.stringLiteral("empty-set__skeleton"),
        ),
      );
    }
  }

  const effectiveDepth = explicitDepth ?? String(depth);

  if (!dataDepthAlreadySet) {
    attributes.push(
      t.jsxAttribute(
        t.jsxIdentifier("data-depth"),
        t.stringLiteral(effectiveDepth),
      ),
    );
  }

  const children = Array.from(element.childNodes)
    .map((child) => htmlNodeToJsx(child, depth + 1, effectiveDepth))
    .filter(Boolean) as JsxChild[];

  return t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier(tagName), attributes, false),
    t.jsxClosingElement(t.jsxIdentifier(tagName)),
    children,
    false,
  );
}
