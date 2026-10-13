const CONTAINER_TAGS = new Set([
  "div",
  "section",
  "article",
  "aside",
  "main",
  "nav",
  "header",
  "footer",
  "form",
  "fieldset",
]);

const isVisibleColor = (color: string) =>
  color && color !== "transparent" && color !== "rgba(0, 0, 0, 0)";

function hasVisibleBackgroundOrBorder(element: HTMLElement): boolean {
  const style = getComputedStyle(element);

  const hasBackground = isVisibleColor(style.backgroundColor);

  const sides = ["Top", "Right", "Bottom", "Left"] as const;

  const hasFullBorder = sides.every((side) => {
    const width = parseFloat(style[`border${side}Width`]);
    const borderStyle = style[`border${side}Style`];
    const color = style[`border${side}Color`];

    return width > 0 && borderStyle !== "none" && borderStyle !== "hidden" && isVisibleColor(color);
  });

  return hasBackground || hasFullBorder;
}

export function markTransparentContainers(root: HTMLElement): void {
  const containers = root.querySelectorAll<HTMLElement>(Array.from(CONTAINER_TAGS).join(","));
  for (const el of containers) {
    if (!hasVisibleBackgroundOrBorder(el)) {
      el.setAttribute("data-depth", "-1");
    }
  }
}
