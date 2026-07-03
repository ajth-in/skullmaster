import { isJSXIdentifier } from "@babel/types";
import { createJsxStringAttribute, findStringJsxAttribute } from "../helpers/jsx";
import type { Rule } from "../types";
export const DATA_NAT_H = "data-natural-h";
export const DATA_NAT_W = "data-natural-w";

function createSkeletonSrc(width?: string, height?: string, color = "#e5e7eb") {
  const w = Number(width) || 400;
  const h = Number(height) || 300;

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${w}"
      height="${h}"
      viewBox="0 0 ${w} ${h}"
      preserveAspectRatio="none"
    >
      <rect width="100%" height="100%" fill="${color}" />
    </svg>
  `)}`;
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

    const naturalWidth = findStringJsxAttribute(attrs, DATA_NAT_W)?.value;

    const naturalHeight = findStringJsxAttribute(attrs, DATA_NAT_H)?.value;

    const placeholderSrc = createSkeletonSrc(naturalWidth?.value, naturalHeight?.value);

    const filteredAttrs = attrs.filter((attr) => {
      const name = isJSXIdentifier(attr.name) ? attr.name.name : undefined;

      return !["src", "srcSet", "sizes", "loading", "decoding", "fetchPriority"].includes(
        name ?? "",
      );
    });

    const attributes = [
      ...filteredAttrs,
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
