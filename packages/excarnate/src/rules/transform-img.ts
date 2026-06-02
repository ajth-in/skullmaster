import type { Rule } from "../types";
import {
  createJsxStringAttribute,
  findStringJsxAttribute,
} from "../helpers/jsx";
import { isJSXIdentifier } from "@babel/types";

const PLACEHOLDER_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";

export const transformImg: Rule = {
  id: "transform-img",
  description: "Convert images into skeleton placeholders",

  match: (ctx) =>
    ctx.element.nodeType === 1 &&
    (ctx.element as HTMLElement).tagName.toLowerCase() === "img",

  transform: (ctx) => {
    if (!ctx.target) {
      throw new Error(
        "Target must be defined before transforming an image element.",
      );
    }

    const src = findStringJsxAttribute(
      ctx.target.attributes ?? [],
      "src",
    )?.value;

    ctx.target.attributes = ctx.target.attributes?.filter((attr) => {
      const name = isJSXIdentifier(attr.name) ? attr.name.name : undefined;

      return ![
        "src",
        "srcSet",
        "sizes",
        "loading",
        "decoding",
        "fetchPriority",
      ].includes(name ?? "");
    });

    if (src) {
      ctx.target.attributes?.push(
        createJsxStringAttribute("data-image-src", src.value),
      );
    }

    ctx.target.attributes?.push(
      createJsxStringAttribute("src", PLACEHOLDER_SRC),
      createJsxStringAttribute("data-image-skeleton", "true"),
    );
  },
};
