import { isJSXIdentifier } from "@babel/types";
import {
  createJsxStringAttribute,
  findStringJsxAttribute,
} from "../helpers/jsx";
import type { Rule } from "../types";

export const transformIframe: Rule = {
  id: "transform-iframe",

  match: (ctx) =>
    ctx.element.nodeType === Node.ELEMENT_NODE &&
    (ctx.element as HTMLElement).tagName.toLowerCase() === "iframe",

  transform: (ctx) => {
    if (!ctx.target) return;

    ctx.target.element = "div";

    const src = findStringJsxAttribute(
      ctx.target.attributes ?? [],
      "src",
    )?.value;

    ctx.target.attributes = ctx.target.attributes?.filter((attr) => {
      const name = isJSXIdentifier(attr.name) ? attr.name.name : undefined;

      return !["src", "srcdoc", "allow", "sandbox", "loading"].includes(
        name ?? "",
      );
    });

    if (src) {
      ctx.target.attributes?.push(
        createJsxStringAttribute("data-iframe-src", src.value),
      );
    }

    ctx.target.attributes?.push(
      createJsxStringAttribute("data-skeleton-type", "iframe"),
    );

    ctx.target.children = [];
  },
};
