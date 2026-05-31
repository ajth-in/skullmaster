import * as t from "@babel/types";

export function parseStyle(style: string): t.ObjectExpression {
  const properties: t.ObjectProperty[] = [];

  for (const rule of style.split(";")) {
    const trimmedRule = rule.trim();

    if (!trimmedRule) {
      continue;
    }

    const colonIndex = trimmedRule.indexOf(":");

    if (colonIndex === -1) {
      continue;
    }

    const rawKey = trimmedRule.slice(0, colonIndex).trim();
    const rawValue = trimmedRule.slice(colonIndex + 1).trim();

    const key = rawKey.replace(/-([a-z])/g, (_, char: string) =>
      char.toUpperCase(),
    );

    const keyNode =
      key.startsWith("--") || key.includes("-")
        ? t.stringLiteral(key)
        : t.identifier(key);

    properties.push(t.objectProperty(keyNode, t.stringLiteral(rawValue)));
  }

  return t.objectExpression(properties);
}
