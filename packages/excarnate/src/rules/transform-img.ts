import * as t from "@babel/types";
import { createJsxStringAttribute, findStringJsxAttribute } from "../helpers/jsx";
import type { Rule } from "../types";
export const DATA_NAT_H = "data-natural-h";
export const DATA_NAT_W = "data-natural-w";
export const DATA_IMAGE_SKELETON = "data-image-skeleton";

function createSkeletonSrc(width?: string, height?: string, color = "#e5e7eb") {
  const w = Number(width) || 400;
  const h = Number(height) || 300;

  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><rect width="100%" height="100%" fill="${color}"/></svg>`,
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

    const naturalWidthAttr = findStringJsxAttribute(attrs, DATA_NAT_W);
    const naturalHeightAttr = findStringJsxAttribute(attrs, DATA_NAT_H);

    const naturalWidth = naturalWidthAttr?.value?.value;
    const naturalHeight = naturalHeightAttr?.value?.value;

    const placeholderSrc = createSkeletonSrc(naturalWidth, naturalHeight);

    const filteredAttrs: t.JSXAttribute[] = attrs.filter((attr): attr is t.JSXAttribute => {
      if (!t.isJSXAttribute(attr)) return false;
      const name = t.isJSXIdentifier(attr.name) ? attr.name.name : undefined;

      return ![
        "src",
        "srcSet",
        "sizes",
        "loading",
        "decoding",
        "fetchPriority",
        DATA_NAT_W,
        DATA_NAT_H,
        DATA_IMAGE_SKELETON,
      ].includes(name ?? "");
    });

    const attributes: t.JSXAttribute[] = [
      ...filteredAttrs,
      createJsxStringAttribute("src", placeholderSrc),
      createJsxStringAttribute(DATA_IMAGE_SKELETON, "true"),
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
