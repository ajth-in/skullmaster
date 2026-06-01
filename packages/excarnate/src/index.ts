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
  transformImg,
  transformInput,
  addRootSkeletonsAttrs,
]);

export default function excarnate(
  element: Node,
  depth: number,
  parentDepth?: string,
): JsxChild | null {
  const context: TransformContext = {
    element,
    depth,
    parentDepth,
  };

  executor(context);
  const target = context.target;
  if (!target) return null;
  const { children, element: tagName, attributes } = target;

  if (children) {
    return createJsxElement(tagName, children, attributes);
  }
  const { childNodes } = (element as HTMLElement) ?? { childNodes: [] };

  const existingChildren = Array.from(childNodes)
    .map((child) => excarnate(child, depth + 1, depth.toString()))
    .filter(Boolean) as JsxChild[];

  return createJsxElement(tagName, existingChildren, attributes);
}
