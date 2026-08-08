import { injectNaturalImageDimensions } from "./add-data-attrs-img";
import { applyComputedBd } from "./get-computed-bd";
import { applyVisualSignificance } from "./get-visual-significance";

export const updateAttributes = async (root: HTMLElement) => {
  await injectNaturalImageDimensions(root);
  const elements = root.querySelectorAll<HTMLElement>("*");

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (!element) continue;

    applyComputedBd(element);
    applyVisualSignificance(element);
  }
};
