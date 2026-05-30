import * as t from "@babel/types";
import { normalizeAttributeName } from "./utils/attr-normalize";
import { parseStyle } from "./utils/parse-style";
import shouldKeepAttribute from "./utils/is-style";

type JsxChild = t.JSXElement | t.JSXText;

const TEXT_CONTAINERS = new Set([
  "p",
  "span",
  "strong",
  "em",
  "b",
  "i",
  "small",
  "mark",
  "label",
  "blockquote",
  "cite",
  "figcaption",
  "caption",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "a",
]);

export default function htmlNodeToJsx(
  node: Node,
  depth: number = 0,
): JsxChild | null {
  if (node.nodeType === node.TEXT_NODE) {
    const text = node.textContent;

    if (!text?.trim()) {
      return null;
    }

    return t.jsxElement(
      t.jsxOpeningElement(
        t.jsxIdentifier("span"),
        [
          t.jsxAttribute(
            t.jsxIdentifier("className"),
            t.stringLiteral("empty-set__text"),
          ),
          t.jsxAttribute(
            t.jsxIdentifier("data-depth"),
            t.stringLiteral(String(depth)),
          ),
        ],
        false,
      ),
      t.jsxClosingElement(t.jsxIdentifier("span")),
      [t.jsxText(text.replace(/\S/g, "#"))],
      false,
    );
  }

  if (node.nodeType !== node.ELEMENT_NODE) {
    return null;
  }

  const element = node as HTMLElement;
  const tagName = element.tagName.toLowerCase();

  const attributes: t.JSXAttribute[] = [];

  const dataDepthAlreadySet = element.hasAttribute("data-depth");

  const hasDirectTextChild = Array.from(element.childNodes).some(
    (child) => child.nodeType === child.TEXT_NODE && child.textContent?.trim(),
  );

  const shouldSuppressParentBackground =
    hasDirectTextChild && TEXT_CONTAINERS.has(tagName);

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

  if (!dataDepthAlreadySet) {
    attributes.push(
      t.jsxAttribute(
        t.jsxIdentifier("data-depth"),
        t.stringLiteral(shouldSuppressParentBackground ? "-1" : String(depth)),
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
