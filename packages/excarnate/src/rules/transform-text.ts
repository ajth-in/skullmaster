import { jsxText } from "@babel/types";
import type { Rule } from "../types";
import { DEPTH_ATTRIBUTE, TEXT_CLASSNAME } from "../constants";
import { createJsxStringAttribute } from "../helpers/jsx";

export const transformText: Rule = {
  id: "transform-text",
  skipAllRest: true,
  description: "",
  match: (ctx) => ctx.element.nodeType === 3,
  transform: (ctx) => {
    const text = ctx.element.textContent;

    if (!text?.trim()) {
      return null;
    }
    ctx.target = {
      element: "span",
      attributes: [
        createJsxStringAttribute("className", TEXT_CLASSNAME),
        createJsxStringAttribute("data-text-node", "true"),

        createJsxStringAttribute(
          DEPTH_ATTRIBUTE,
          ctx.parentDepth ?? String(ctx.depth),
        ),
      ],
      children: [jsxText(text)],
    };
  },
};
