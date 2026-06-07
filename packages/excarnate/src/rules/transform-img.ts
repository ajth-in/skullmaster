import { isJSXIdentifier } from "@babel/types";
import {
  createJsxStringAttribute,
  findStringJsxAttribute,
} from "../helpers/jsx";
import type { Rule } from "../types";
export const DATA_NAT_H = "data-natural-h";
export const DATA_NAT_W = "data-natural-w";

function createSkeletonSrc(
  width?: string,
  height?: string,
  base = "#e5e7eb",
  highlight = "#f3f4f6",
) {
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
      <defs>
        <linearGradient id="shimmer" x1="-100%" y1="0" x2="100%" y2="0">
          <stop offset="0%" stop-color="${base}" />
          <stop offset="45%" stop-color="${base}" />
          <stop offset="50%" stop-color="${highlight}" />
          <stop offset="55%" stop-color="${base}" />
          <stop offset="100%" stop-color="${base}" />

          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="-1 0"
            to="1 0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="url(#shimmer)"
      />
    </svg>
  `)}`;
}
export const transformImg: Rule = {
  id: "transform-img",

  match: (ctx) =>
    ctx.element.nodeType === 1 &&
    (ctx.element as HTMLElement).tagName.toLowerCase() === "img",

  transform: (ctx) => {
    if (!ctx.target) {
      throw new Error(
        "Target must be defined before transforming an image element.",
      );
    }

    const attrs = ctx.target.attributes ?? [];

    const naturalWidth = findStringJsxAttribute(attrs, DATA_NAT_W)?.value;

    const naturalHeight = findStringJsxAttribute(attrs, DATA_NAT_H)?.value;

    const placeholderSrc = createSkeletonSrc(
      naturalWidth?.value,
      naturalHeight?.value,
    );

    const filteredAttrs = attrs.filter((attr) => {
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
