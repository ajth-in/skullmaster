import * as t from "@babel/types";
import type { JsxChild } from "../types";

export function createJsxStringAttribute(
  name: string,
  value: string,
): t.JSXAttribute {
  return t.jsxAttribute(t.jsxIdentifier(name), t.stringLiteral(value));
}

export function createJsxExpressionAttribute(
  name: string,
  expression: t.Expression,
): t.JSXAttribute {
  return t.jsxAttribute(
    t.jsxIdentifier(name),
    t.jsxExpressionContainer(expression),
  );
}

export function findJsxAttribute(
  attributes: readonly (t.JSXAttribute | t.JSXSpreadAttribute)[],
  name: string,
): t.JSXAttribute | undefined {
  return attributes.find(
    (attr): attr is t.JSXAttribute =>
      t.isJSXAttribute(attr) &&
      t.isJSXIdentifier(attr.name) &&
      attr.name.name === name,
  );
}

export function findStringJsxAttribute(
  attributes: readonly t.JSXAttribute[],
  name: string,
): (t.JSXAttribute & { value: t.StringLiteral }) | undefined {
  const attr = findJsxAttribute(attributes, name);

  if (!attr?.value || !t.isStringLiteral(attr.value)) {
    return undefined;
  }

  return attr as t.JSXAttribute & { value: t.StringLiteral };
}

export function createJsxElement(
  tagName: string,
  children: JsxChild[],
  attributes: (t.JSXAttribute | t.JSXSpreadAttribute)[] = [],
): t.JSXElement {
  return t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier(tagName), attributes, false),
    t.jsxClosingElement(t.jsxIdentifier(tagName)),
    children,
    false,
  );
}
