import type { Matcher } from "./types";

export const atDepth =
  (depth: number): Matcher =>
  (ctx) =>
    ctx.depth === depth;

export const isRoot: Matcher = atDepth(0);
