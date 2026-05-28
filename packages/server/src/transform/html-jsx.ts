import * as t from "@babel/types";

type JsxChild = t.JSXElement | t.JSXText;

export default function htmlNodeToJsx(node: Node): JsxChild | null {
  if (node.nodeType === node.TEXT_NODE) {
    const text = node.textContent?.trim();

    if (!text) {
      return null;
    }

    return t.jsxText(text);
  }

  if (node.nodeType !== node.ELEMENT_NODE) {
    return null;
  }

  const element = node as HTMLElement;

  const tagName = element.tagName.toLowerCase();

  const attributes: t.JSXAttribute[] = [];

  for (const attr of element.attributes) {
    let name = attr.name;
    const value = attr.value;

    if (name === "class") {
      name = "className";
    }

    attributes.push(
      t.jsxAttribute(t.jsxIdentifier(name), t.stringLiteral(value)),
    );
  }

  const children = Array.from(element.childNodes)
    .map((child) => htmlNodeToJsx(child))
    .filter(Boolean) as JsxChild[];

  return t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier(tagName), attributes, false),
    t.jsxClosingElement(t.jsxIdentifier(tagName)),
    children,
    false,
  );
}
