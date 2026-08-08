export const DATA_VISUAL_SIGNIFICANCE = "data-visual-significance";

const CONTENT_WEIGHT = 0.2;
const BACKGROUND_WEIGHT = 0.25;
const BORDER_WEIGHT = 0.15;
const OUTLINE_WEIGHT = 0.1;
const SHADOW_WEIGHT = 0.1;
const BACKGROUND_IMAGE_WEIGHT = 0.2;

const MAX_CONTRAST = 21;

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

type RGB = { r: number; g: number; b: number };

type Color = { rgb: RGB; alpha: number };

const parseColor = (color: string): Color | null => {
  const channels = color.match(/[\d.]+/g);

  if (!channels || channels.length < 3) return null;

  const [r, g, b] = channels.map(Number);

  if (r === undefined || g === undefined || b === undefined) return null;

  const alpha = channels[3] !== undefined ? Number(channels[3]) : 1;

  return { rgb: { r, g, b }, alpha };
};

const linearize = (channel: number) => {
  const value = channel / 255;

  return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
};

const luminance = ({ r, g, b }: RGB) =>
  0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);

const contrastRatio = (a: RGB, b: RGB) => {
  const lighter = Math.max(luminance(a), luminance(b));
  const darker = Math.min(luminance(a), luminance(b));

  return (lighter + 0.05) / (darker + 0.05);
};

const getNearestBackground = (element: HTMLElement): Color | null => {
  let current: HTMLElement | null = element.parentElement;

  while (current) {
    const color = parseColor(getComputedStyle(current).backgroundColor);

    if (color && color.alpha > 0) return color;

    current = current.parentElement;
  }

  return null;
};

const countBorderSides = (style: CSSStyleDeclaration): number => {
  const sides = [
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
  ] as const;

  return sides.reduce((count, prop) => (Number.parseFloat(style[prop]) > 0 ? count + 1 : count), 0);
};

const MEANINGFUL_SELECTOR = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "a[href]",
  "button",
  "input",
  "select",
  "textarea",
  "img",
  "picture",
  "svg",
  "canvas",
  "video",
  "audio",
  "iframe",
  "table",
  "ul",
  "ol",
  "nav",
  "main",
  "article",
  "section",
  "blockquote",
].join(", ");

const hasDirectText = (element: HTMLElement) =>
  Array.from(element.childNodes).some(
    (node) => node.nodeType === Node.TEXT_NODE && Boolean(node.textContent?.trim()),
  );

const hasMeaningfulContent = (element: HTMLElement) =>
  hasDirectText(element) || element.matches(MEANINGFUL_SELECTOR);
const getContentSignificance = (element: HTMLElement): number =>
  hasMeaningfulContent(element) ? CONTENT_WEIGHT : 0;

export const computeVisualSignificance = (element: HTMLElement): number => {
  const style = getComputedStyle(element);
  const opacity = Number.parseFloat(style.opacity);

  let backgroundScore = 0;
  const backgroundColor = parseColor(style.backgroundColor);

  if (backgroundColor && backgroundColor.alpha > 0) {
    const behind = getNearestBackground(element);

    if (behind) {
      const ratio = contrastRatio(backgroundColor.rgb, behind.rgb);
      const contrastScore = clamp(ratio / MAX_CONTRAST);

      backgroundScore = contrastScore * BACKGROUND_WEIGHT;
    }
  }

  const borderScore = (countBorderSides(style) / 4) * BORDER_WEIGHT;

  const hasOutline = style.outlineStyle !== "none" && Number.parseFloat(style.outlineWidth) > 0;

  const outlineScore = hasOutline ? OUTLINE_WEIGHT : 0;

  const hasShadow = style.boxShadow !== "none" && style.boxShadow !== "";

  const shadowScore = hasShadow ? SHADOW_WEIGHT : 0;

  const hasBackgroundImage = style.backgroundImage !== "none" && style.backgroundImage !== "";

  const backgroundImageScore = hasBackgroundImage ? BACKGROUND_IMAGE_WEIGHT : 0;

  const total =
    getContentSignificance(element) +
    backgroundScore +
    borderScore +
    outlineScore +
    shadowScore +
    backgroundImageScore;

  return clamp(total * opacity);
};

export const applyVisualSignificance = (element: HTMLElement) => {
  const significance = computeVisualSignificance(element);

  element.setAttribute(DATA_VISUAL_SIGNIFICANCE, significance.toFixed(2));

  if (significance === 0 && !element.hasAttribute("data-depth")) {
    element.setAttribute("data-depth", "-1");
  }
};
