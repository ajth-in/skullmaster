import { isTagNamesIn } from "../matchers";
import type { Rule } from "../types";

export const removeReduntantNode: Rule = {
  id: "remove-node",
  skipAllRest: true,
  match: isTagNamesIn([
    "html",
    "script",
    "style",
    "head",
    "meta",
    "link",
    "noscript",
    "template",
    "audio",
    "video",
    "source",
    "track",
    "iframe",
    "embed",
    "object",
    "title",
    "base",
    "defs",
    "symbol",
    "html",
    "canvas",
    "map",
    "area",
    "picture",
    "portal",
  ]),
  transform: (ctx) => {
    return { ...ctx, target: null };
  },
};
