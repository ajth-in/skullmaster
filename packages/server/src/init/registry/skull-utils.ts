import type { Preferences } from "../collect-preferences";

const JSX_SKULL_UTILS_TS = `
const buildSkullAttributes = ({ hideSubTree, isTransparent }: SkullTweaks): Omit<WithDataSkull, "data-skullmaster"> => {
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

export const tweakForSkull = (tweaks: SkullTweaks = {}): Omit<WithDataSkull, "data-skullmaster"> => {
  return buildSkullAttributes(tweaks);
};
`;

const JSX_SKULL_UTILS_JS = `
const buildSkullAttributes = ({ hideSubTree, isTransparent }) => {
  return {
    "data-skip-skull": hideSubTree,
    "data-depth": isTransparent ? "-1" : undefined,
  };
};

export const markAsSkull = (name: string, tweaks = {}) => {
  return {
    "data-skullmaster": name,
    ...buildSkullAttributes(tweaks),
  };
};

export const tweakForSkull = (tweaks = {}) => {
  return buildSkullAttributes(tweaks);
};
`;

export const REGISTRY_SKULL_UTILS = (project: Preferences["project"]): string => {
  switch (project) {
    case "react-ts":
      return JSX_SKULL_UTILS_TS;
    case "react-js":
      return JSX_SKULL_UTILS_JS;
    case "preact-ts":
      return JSX_SKULL_UTILS_TS;
    case "preact-js":
      return JSX_SKULL_UTILS_JS;
  }
};
