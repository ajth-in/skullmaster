import { type HTMLAttributes } from "react";

export type SkullTweaks = {
  /** Exclude this element and its entire subtree from skeleton generation. */
  hideSubTree?: boolean;
  /** Render this element as transparent (layout preserved) in the skeleton. */
  isTransparent?: boolean;
};

export type WithDataSkull = HTMLAttributes<HTMLElement> & {
  "data-skullmaster": string;
  "data-skip-skull"?: boolean;
  "data-depth"?: "-1";
};

const buildSkullAttributes = ({
  hideSubTree,
  isTransparent,
}: SkullTweaks): Omit<WithDataSkull, "data-skullmaster"> => {
  return {
    "data-skip-skull": hideSubTree,
    "data-depth": isTransparent ? "-1" : undefined,
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
