import { jsxText } from "@babel/types";
import type { Rule, TransformContext } from "../types";
import { DEPTH_ATTRIBUTE, TEXT_CLASSNAME } from "../constants";
import { createJsxStringAttribute } from "../helpers/jsx";
import simpleHash from "../helpers/hash";

export const transformText: Rule = {
  id: "transform-text",
  skipAllRest: true,
  description: "",
  match: (ctx) => ctx.element.nodeType === 3,
  transform: (ctx) => {
    const text = simpleHash(ctx.element.textContent?.trim());

    if (!text) {
      return ctx;
    }

    const isHeading = ctx.parentNode?.nodeName.toLowerCase().startsWith("h");
    if (ctx.parentNode?.nodeName.toLowerCase() !== "p" && !isHeading)
      return {
        ...ctx,
        target: {
          element: "TEXT",
          children: [jsxText(text)],
        },
      } as TransformContext;

    return {
      ...ctx,
      target: {
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
      },
    };
  },
};
