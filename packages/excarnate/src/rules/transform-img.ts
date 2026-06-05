import { isJSXIdentifier } from "@babel/types";
import { createJsxStringAttribute, findStringJsxAttribute } from "../helpers/jsx";
import type { Rule } from "../types";
export const DATA_NAT_H = "data-natural-h";
export const DATA_NAT_W = "data-natural-w";

function createPlaceholderSrc(width?: string, height?: string, bg = "#e5e7eb", fg = "#9ca3af") {
  const w = Number(width) || 1;
  const h = Number(height) || 1;

  return `data:image/svg+xml,${encodeURIComponent(
    `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${w}"
        height="${h}"
        viewBox="0 0 ${w} ${h}"
      >
        <rect width="100%" height="100%" fill="${bg}" />
        <circle cx="${w * 0.3}" cy="${h * 0.35}" r="${Math.min(w, h) * 0.08}" fill="${fg}" />
        <path
          d="M0 ${h * 0.8} L${w * 0.35} ${h * 0.45} L${w * 0.6} ${h * 0.7} L${w} ${h * 0.3} V${h} H0 Z"
          fill="${fg}"
          opacity="0.7"
        />
      </svg>
    `,
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
