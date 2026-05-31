import { buildExecutor } from "./executor";
import { populateAttrs } from "./rules/populate-attrs";
import { addRootSkeletonsAttrs } from "./rules/root-skeleton-attrs";
import { transformText } from "./rules/transform-text";
import type { JsxChild, TransformContext } from "./types";
const executor = buildExecutor([
  transformText,
  populateAttrs,
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
  console.log("Context after transformation:", context.target);

  return null;
}
