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
  match: (ctx) => ctx.element.nodeType === Node.ELEMENT_NODE && atDepth(0)(ctx),
  transform: (ctx) => {
    const element = ctx.element as Element;
    const tagName = element.tagName.toLowerCase();

    if (ctx.target?.element && ctx.target.element !== tagName) {
      throw new TargetElementMismatchError(tagName, ctx.target.element);
    }

    ctx.target ??= {
      element: tagName,
      attributes: [],
    };

    const classNameAttr = findStringJsxAttribute(
      ctx.target.attributes ?? [],
      "className",
    );

    if (classNameAttr) {
      classNameAttr.value.value += ` ${SKELETON_CLASSNAME}`;
    } else {
      ctx.target.attributes?.push(
        createJsxStringAttribute("className", SKELETON_CLASSNAME),
      );
    }
    ctx.target.attributes = [
      ...(ctx.target.attributes ?? []),
      createJsxStringAttribute("role", "status"),
      createJsxStringAttribute("aria-live", "polite"),
      createJsxStringAttribute("aria-busy", "true"),
    ];

    ctx.target.element = tagName;
  },
};
