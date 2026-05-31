import * as t from "@babel/types";

export const createElement = (
  name: string,
  attrs: Array<{ key: string; value: string }>,
  children: Array<t.JSXElement | t.JSXText>,
) => {
  return t.jsxElement(
    t.jsxOpeningElement(
      t.jsxIdentifier(name),
      attrs.map((attr) =>
        t.jsxAttribute(t.jsxIdentifier(attr.key), t.stringLiteral(attr.value)),
      ),
      false,
    ),
    t.jsxClosingElement(t.jsxIdentifier(name)),
    children,
    false,
  );
};
