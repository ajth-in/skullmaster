import type { Matcher } from "./types";

export const atDepth =
  (depth: number): Matcher =>
  (ctx) =>
    ctx.depth === depth;

export const isRoot: Matcher = atDepth(0);

export const isTagNamesIn =
  (elements: string[]): Matcher =>
  (ctx) =>
    ctx.element.nodeType === 1 &&
    elements.includes((ctx.element as HTMLElement).tagName.toLowerCase());
