import * as t from "@babel/types";
import type { Rule } from "../types";
import shouldKeepAttribute from "../helpers/is-style";
import { normalizeAttributeName } from "../helpers/attr-normalize";
import { parseStyle } from "../helpers/parse-style";
import {
  createJsxExpressionAttribute,
  createJsxStringAttribute,
} from "../helpers/jsx";
import { TargetElementMismatchError } from "../exceptions/target-mismatch";
import { DEPTH_ATTRIBUTE } from "../constants";

export const populateAttrs: Rule = {
  id: "populate-attrs",
  description: "",
  match: (ctx) => ctx.element.nodeType === 1,
  transform: (ctx) => {
    const element = ctx.element as HTMLElement;
    const attributes: t.JSXAttribute[] = [];
    const tagName = element.tagName.toLowerCase();
    if (ctx.target?.element && ctx.target?.element !== tagName)
      throw new TargetElementMismatchError(tagName, ctx.target.element);
    if (!element.hasAttribute(DEPTH_ATTRIBUTE)) {
      attributes.push(
        createJsxStringAttribute(DEPTH_ATTRIBUTE, String(ctx.depth)),
      );
    }
    for (const attr of element.attributes) {
      if (!shouldKeepAttribute(attr.name)) {
        continue;
      }

      const name = normalizeAttributeName(attr.name);
      const value = attr.value;

      if (name === "style") {
        attributes.push(
          createJsxExpressionAttribute("style", parseStyle(value)),
        );
        continue;
      }

      attributes.push(createJsxStringAttribute(name, value));
    }
    ctx.target = {
      element: tagName,
      attributes,
    };
  },
};
