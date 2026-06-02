import { TargetElementMismatchError } from "../exceptions/target-mismatch";
import { atDepth } from "../matchers";
import type { Rule } from "../types";
import {
  createJsxStringAttribute,
  findStringJsxAttribute,
} from "../helpers/jsx";
import { SKELETON_CLASSNAME } from "../constants";

export const addRootSkeletonsAttrs: Rule = {
  id: "add-root-skeleton-attrs",
  description: "",
  match: (ctx) => ctx.element.nodeType === 1 && atDepth(0)(ctx),
  transform: (ctx) => {
    const element = ctx.element as Element;
    const tagName = element.tagName.toLowerCase();

    if (ctx.target?.element && ctx.target.element !== tagName) {
      throw new TargetElementMismatchError(tagName, ctx.target.element);
    }

    const existingTarget = ctx.target ?? { element: tagName, attributes: [] };
    const existingAttrs = existingTarget.attributes ?? [];

    const classNameAttr = findStringJsxAttribute(existingAttrs, "className");
    const baseAttrs = classNameAttr
      ? existingAttrs.map((attr) =>
          attr === classNameAttr
            ? { ...attr, value: { ...classNameAttr.value, value: `${classNameAttr.value.value} ${SKELETON_CLASSNAME}` } }
            : attr,
        )
      : [
          ...existingAttrs,
          createJsxStringAttribute("className", SKELETON_CLASSNAME),
        ];

    const attributes = [
      ...baseAttrs,
      createJsxStringAttribute("role", "status"),
      createJsxStringAttribute("aria-live", "polite"),
      createJsxStringAttribute("aria-busy", "true"),
    ];

    return {
      ...ctx,
      target: { ...existingTarget, element: tagName, attributes },
    };
  },
};
