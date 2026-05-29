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

    if (name === "style") {
      const parsedStyles: Record<string, string> = {};
      value.split(";").forEach((rule) => {
        const trimmedRule = rule.trim();
        if (!trimmedRule) return;
        const colonIndex = trimmedRule.indexOf(":");
        if (colonIndex === -1) return;
        const key = trimmedRule.slice(0, colonIndex).trim();
        const val = trimmedRule.slice(colonIndex + 1).trim();
        const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        parsedStyles[camelKey] = val;
      });

      const properties = Object.entries(parsedStyles).map(([key, val]) => {
        // Ensure valid identifiers for CSS custom properties or fallback to string keys if contains non-alphanumeric
        const isCustomProp = key.startsWith("--") || key.includes("-");
        const keyNode = isCustomProp ? t.stringLiteral(key) : t.identifier(key);
        return t.objectProperty(keyNode, t.stringLiteral(val));
      });

      attributes.push(
        t.jsxAttribute(
          t.jsxIdentifier("style"),
          t.jsxExpressionContainer(t.objectExpression(properties)),
        ),
      );
    } else {
      attributes.push(
        t.jsxAttribute(t.jsxIdentifier(name), t.stringLiteral(value)),
      );
    }
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
