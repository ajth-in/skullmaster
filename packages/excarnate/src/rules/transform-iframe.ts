import { isJSXIdentifier } from "@babel/types";
import {
  createJsxStringAttribute,
  findStringJsxAttribute,
} from "../helpers/jsx";
import type { Rule } from "../types";

export const transformIframe: Rule = {
  id: "transform-iframe",

  match: (ctx) =>
    ctx.element.nodeType === 1 &&
    (ctx.element as HTMLElement).tagName.toLowerCase() === "iframe",

  transform: (ctx) => {
    if (!ctx.target) return ctx;

    const src = findStringJsxAttribute(
      ctx.target.attributes ?? [],
      "src",
    )?.value;

    const attributes = [
      ...(ctx.target.attributes ?? []).filter((attr) => {
        const name = isJSXIdentifier(attr.name) ? attr.name.name : undefined;
        return !["src", "srcdoc", "allow", "sandbox", "loading"].includes(
          name ?? "",
        );
      }),
      ...(src ? [createJsxStringAttribute("data-iframe-src", src.value)] : []),
      createJsxStringAttribute("data-skeleton-type", "iframe"),
    ];

    return {
      ...ctx,
      target: { ...ctx.target, element: "div", attributes, children: [] },
    };
  },
};
