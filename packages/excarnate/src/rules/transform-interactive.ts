import { createJsxStringAttribute } from "../helpers/jsx";
import type { Rule } from "../types";

const INTERACTIVE_TAGS = new Set([
  "input",
  "textarea",
  "select",
  "option",
  "optgroup",
  "button",
  "label",
  "fieldset",
  "legend",
  "output",
  "datalist",

  "a",
  "details",
  "summary",

  "audio",
  "video",

  "iframe",
  "embed",
  "object",

  "dialog",
]);

const INTERACTIVE_ROLES = new Set([
  "button",
  "link",
  "tab",
  "menuitem",
  "checkbox",
  "radio",
  "switch",
  "option",
  "combobox",
  "textbox",
  "searchbox",
  "slider",
  "spinbutton",
  "listbox",
  "treeitem",
  "gridcell",
  "rowheader",
  "columnheader",
]);

const ARIA_ATTRIBUTES_TO_REMOVE = new Set([
  "role",
  "aria-label",
  "aria-labelledby",
  "aria-describedby",
  "aria-controls",
  "aria-expanded",
  "aria-haspopup",
  "aria-pressed",
  "aria-selected",
  "aria-checked",
  "aria-current",
  "contenteditable",
  "tabindex",
]);

export const transformInteractiveElements: Rule = {
  id: "transform-interactive-elements",

  match: (ctx) => {
    if (ctx.element.nodeType !== 1) {
      return false;
    }

    const element = ctx.element as HTMLElement;
    const tag = element.tagName.toLowerCase();

    if (INTERACTIVE_TAGS.has(tag)) {
      return true;
    }

    const role = element.getAttribute("role")?.toLowerCase();

    if (role && INTERACTIVE_ROLES.has(role)) {
      return true;
    }

    if (element.hasAttribute("contenteditable")) {
      return true;
    }

    if (element.hasAttribute("tabindex")) {
      return true;
    }

    return false;
  },

  transform: (ctx) => {
    if (!ctx.target) {
      return ctx;
    }

    const attributes = (ctx.target.attributes ?? []).filter((attribute) => {
      const name =
        attribute.type === "JSXAttribute" && attribute.name?.name
          ? String(attribute.name.name).toLowerCase()
          : "";

      return !ARIA_ATTRIBUTES_TO_REMOVE.has(name);
    });

    attributes.push(
      createJsxStringAttribute("data-skeleton-interactive", "true"),
      createJsxStringAttribute("aria-hidden", "true"),
      createJsxStringAttribute("tabIndex", "-1"),
    );

    return {
      ...ctx,
      target: {
        ...ctx.target,
        attributes,
      },
    };
  },
};
