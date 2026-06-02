import * as t from "@babel/types";

import type { Rule } from "../types";
import { createJsxStringAttribute } from "../helpers/jsx";

const KEEP_EXACT = new Set([
  "class",
  "className",
  "style",
  "width",
  "height",
  "type",
  "role",
]);

function shouldKeepInputAttr(name: string): boolean {
  return (
    KEEP_EXACT.has(name) || name.startsWith("aria-") || name.startsWith("data-")
  );
}

export const transformInput: Rule = {
  id: "transform-input",
  description: "Convert inputs into skeleton placeholders",

  match: (ctx) =>
    ctx.element.nodeType === 1 &&
    (ctx.element as HTMLElement).tagName.toLowerCase() === "input",

  transform: (ctx) => {
    if (!ctx.target) {
      return;
    }

    ctx.target.attributes = ctx.target.attributes?.filter((attr) => {
      if (!t.isJSXIdentifier(attr.name)) {
        return false;
      }

      return shouldKeepInputAttr(attr.name.name);
    });

    ctx.target.attributes?.push(
      createJsxStringAttribute("data-skeleton-input", "true"),
    );
  },
};
