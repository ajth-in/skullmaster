import { buildExecutor } from "./executor";
import { populateAttrs } from "./rules/populate-attrs";
import { addRootSkeletonsAttrs } from "./rules/root-skeleton-attrs";
import { transformText } from "./rules/transform-text";
import type { JsxChild, TransformContext } from "./types";
import { createJsxElement } from "./helpers/jsx";
import { removeReduntantNode } from "./rules/remove-node";
import { transformImg } from "./rules/transform-img";
import { transformInput } from "./rules/transform-input";
const executor = buildExecutor([
  transformText,
  removeReduntantNode,
  populateAttrs,
  // transformImg,
  transformInput,
  addRootSkeletonsAttrs,
]);

export default function excarnate(
  element: Node,
  depth: number,
  parentNode: HTMLElement | null = null,
  parentDepth?: string,
): JsxChild | null {
  const context: TransformContext = {
    element,
    depth,
    parentNode,
    parentDepth,
  };

  const result = executor(context);
  const target = result.target;
  if (!target) return null;
  const { children, element: tagName, attributes } = target;
  if (tagName === "TEXT") return children?.[0] ?? null;
  if (children) {
    return createJsxElement(tagName, children, attributes);
  }
  const { childNodes } = (element as HTMLElement) ?? { childNodes: [] };

  const existingChildren = Array.from(childNodes)
    .map((child) =>
      excarnate(child, depth + 1, element as HTMLElement, depth.toString()),
    )
    .filter(Boolean) as JsxChild[];

  return createJsxElement(tagName, existingChildren, attributes);
}
