import { buildExecutor } from "./executor";
import { createJsxElement } from "./helpers/jsx";
import { populateAttrs } from "./rules/populate-attrs";
import { processSvg } from "./rules/process-svg";
import { removeReduntantNode } from "./rules/remove-node";
import { addRootSkeletonsAttrs } from "./rules/root-skeleton-attrs";
import { skipNode } from "./rules/skip-node";
import { transformImg } from "./rules/transform-img";
import { transformInteractiveElements } from "./rules/transform-interactive";
import { transformText } from "./rules/transform-text";
import type { JsxChild, TransformContext } from "./types";
const executor = buildExecutor([
  skipNode,
  transformText,
  removeReduntantNode,
  populateAttrs,
  processSvg,
  transformImg,
  transformInteractiveElements,
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
    .map((child) => excarnate(child, depth + 1, element as HTMLElement, depth.toString()))
    .filter(Boolean) as JsxChild[];

  return createJsxElement(tagName, existingChildren, attributes);
}
