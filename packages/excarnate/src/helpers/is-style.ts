const STYLE_ATTRIBUTES = new Set([
  "class",
  "style",
  "type",
  "fill",
  "fill-opacity",
  "fill-rule",
  "src",
  "stroke",
  "stroke-width",
  "stroke-opacity",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-dasharray",
  "stroke-dashoffset",

  "opacity",
  "role",
  "width",
  "height",
  "x",
  "y",
  "cx",
  "cy",
  "r",
  "rx",
  "ry",
  "viewbox",
  "transform",
  "d",
  "points",
]);

export default function shouldKeepAttribute(name: string): boolean {
  const lowerName = name.toLowerCase();
  return (
    lowerName.startsWith("data-") ||
    lowerName.startsWith("aria-") ||
    STYLE_ATTRIBUTES.has(lowerName)
  );
}
