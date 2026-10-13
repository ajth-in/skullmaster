import type { Preferences } from "../collect-preferences";

const JSX_SKULL_TYPES = `
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
`;

export const REGISTRY_SKULL_TYPES = (project: Preferences["project"]): string => {
  switch (project) {
    case "react-ts":
      return JSX_SKULL_TYPES;
    case "preact-ts":
      return JSX_SKULL_TYPES;
    case "react-js":
    case "preact-js":
      return "";
  }
};
