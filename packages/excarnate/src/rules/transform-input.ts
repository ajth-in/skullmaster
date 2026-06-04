import { createJsxStringAttribute } from "../helpers/jsx";
import type { Rule } from "../types";

const FORM_TAGS = new Set([
  "input",
  "textarea",
  "select",
  "option",
  "button",
  "label",
  "fieldset",
  "legend",
]);

export const transformFormControls: Rule = {
  id: "transform-form-controls",

  match: (ctx) => {
    if (ctx.element.nodeType !== 1) {
      return false;
    }

    const tag = (ctx.element as HTMLElement).tagName.toLowerCase();

    return FORM_TAGS.has(tag);
  },

  transform: (ctx) => {
    if (!ctx.target) {
      return ctx;
    }

    const attributes = [
      ...(ctx.target.attributes ?? []),

      createJsxStringAttribute("data-skeleton-input", "true"),
      createJsxStringAttribute("aria-hidden", "true"),
      createJsxStringAttribute("tabIndex", "-1"),
    ];

    return {
      ...ctx,
      target: {
        ...ctx.target,
        attributes,
      },
    };
  },
};
