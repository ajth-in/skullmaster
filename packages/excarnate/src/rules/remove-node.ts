import type { Rule } from "../types";
import { isTagNamesIn } from "../matchers";

export const removeReduntantNode: Rule = {
  id: "remove-node",
  skipAllRest: true,
  description: "",
  match: isTagNamesIn(["script", "head", "meta"]),
  transform: (ctx) => {
    return { ...ctx, target: null };
  },
};
