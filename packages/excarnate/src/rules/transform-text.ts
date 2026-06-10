import { jsxText } from "@babel/types";
import { DEPTH_ATTRIBUTE, TEXT_CLASSNAME } from "../constants";
import spacePreservedObfuscator from "../helpers/hash";
import { createJsxStringAttribute } from "../helpers/jsx";
import type { Rule, TransformContext } from "../types";

export const transformText: Rule = {
  id: "transform-text",
  skipAllRest: true,
  match: (ctx) => ctx.element.nodeType === 3,
  transform: (ctx) => {
    const text = spacePreservedObfuscator(ctx.element.textContent?.trim());

    if (!text) {
      return ctx;
    }

    const isHeading = ctx.parentNode?.nodeName.toLowerCase().startsWith("h");
    if (!["p", "label"].includes(ctx.parentNode?.nodeName.toLowerCase() ?? "") && !isHeading)
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
          createJsxStringAttribute(DEPTH_ATTRIBUTE, ctx.parentDepth ?? String(ctx.depth)),
        ],
        children: [jsxText(text)],
      },
    };
  },
};
