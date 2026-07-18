import { type HTMLAttributes } from "react";

export type SkullTweaks = {
  /** Exclude this element and its entire subtree from skeleton generation. */
  hideSubTree?: boolean;
  /** Render this element as transparent (layout preserved) in the skeleton. */
  isTransparent?: boolean;
  /** Margin applied to the generated skeleton via `data-skull-styles`. */
  insetMargin?: number;
};

export type WithDataSkull = HTMLAttributes<HTMLElement> & {
  "data-skullmaster": string;
  "data-skip-skull"?: boolean;
  "data-depth"?: "-1";
  "data-inset-margin"?: number;
};

const buildSkullAttributes = ({
  hideSubTree,
  isTransparent,
  insetMargin,
}: SkullTweaks): Omit<WithDataSkull, "data-skullmaster"> => {
  return {
    "data-skip-skull": hideSubTree,
    "data-depth": isTransparent ? "-1" : undefined,
    "data-inset-margin": insetMargin,
  };
};

export const markAsSkull = (name: string, tweaks: SkullTweaks = {}): WithDataSkull => {
  return {
    "data-skullmaster": name,
    ...buildSkullAttributes(tweaks),
  };
};

export const tweakForSkull = (
  tweaks: SkullTweaks = {},
): Omit<WithDataSkull, "data-skullmaster"> => {
  return buildSkullAttributes(tweaks);
};
