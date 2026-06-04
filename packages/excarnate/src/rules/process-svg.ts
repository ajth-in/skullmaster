import { isTagNamesIn } from "../matchers";
import type { Rule } from "../types";

export const processSvg: Rule = {
  id: "process-svg",
  skipAllRest: true,
  match: isTagNamesIn(["svg"]),
  transform: (ctx) => {
    return {
      ...ctx,
      target: {
        ...ctx.target,
        element: "svg",
        children: [],
      },
    };
  },
};
