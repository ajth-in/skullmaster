import { isJSXIdentifier } from "@babel/types";
import { createJsxStringAttribute, findStringJsxAttribute } from "../helpers/jsx";
import type { Rule } from "../types";
export const DATA_NAT_H = "data-natural-h";
export const DATA_NAT_W = "data-natural-w";

function createPlaceholderSrc(width?: string, height?: string) {
  const w = Number(width) || 1;
  const h = Number(height) || 1;

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"/>`,
  )}`;
}

export const transformImg: Rule = {
  id: "transform-img",

  match: (ctx) =>
    ctx.element.nodeType === 1 && (ctx.element as HTMLElement).tagName.toLowerCase() === "img",

  transform: (ctx) => {
    if (!ctx.target) {
      throw new Error("Target must be defined before transforming an image element.");
    }

    const attrs = ctx.target.attributes ?? [];

    const src = findStringJsxAttribute(attrs, "src")?.value;

    const naturalWidth = findStringJsxAttribute(attrs, DATA_NAT_W)?.value;

    const naturalHeight = findStringJsxAttribute(attrs, DATA_NAT_H)?.value;

    const placeholderSrc = createPlaceholderSrc(naturalWidth?.value, naturalHeight?.value);

    const filteredAttrs = attrs.filter((attr) => {
      const name = isJSXIdentifier(attr.name) ? attr.name.name : undefined;

      return !["src", "srcSet", "sizes", "loading", "decoding", "fetchPriority"].includes(
        name ?? "",
      );
    });

    const attributes = [
      ...filteredAttrs,
      ...(src ? [createJsxStringAttribute("data-image-src", src.value)] : []),
      createJsxStringAttribute("src", placeholderSrc),
      createJsxStringAttribute("data-image-skeleton", "true"),
    ];

    return {
      ...ctx,
      target: {
        ...ctx.target,
        attributes,
      },
    };
  },
};
