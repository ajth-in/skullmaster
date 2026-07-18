import { type CSSProperties, type HTMLAttributes } from "react";

export type SkullTweaks = {
  /** Exclude this element and its entire subtree from skeleton generation. */
  hideSubTree?: boolean;
  /** Render this element as transparent (layout preserved) in the skeleton. */
  isTransparent?: boolean;
  /** Margin applied to the generated skeleton via `data-skull-styles`. */
  margin?: CSSProperties["margin"];
};

export type WithDataSkull = HTMLAttributes<HTMLElement> & {
  "data-skullmaster": string;
  "data-skip-skull"?: boolean;
  "data-depth"?: "-1";
  "data-skull-styles"?: string;
};

const buildSkullAttributes = ({
  hideSubTree,
  isTransparent,
  margin,
}: SkullTweaks): {
  "data-skip-skull"?: boolean;
  "data-depth"?: "-1";
  "data-skull-styles"?: string;
} => {
  return {
    "data-skip-skull": hideSubTree,
    "data-depth": isTransparent ? "-1" : undefined,
    "data-skull-styles": margin != null ? `margin: ${margin};` : undefined,
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
