import type { Rule } from "../types";

export const skipNode: Rule = {
  id: "skip-node",
  skipAllRest: true,
  match: (ctx) =>
    ctx.element.nodeType === 1 && (ctx.element as HTMLElement).hasAttribute("data-skip-skull"),
  transform: (ctx) => ({ ...ctx, target: null }),
};
