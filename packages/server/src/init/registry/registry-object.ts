import type { Preferences } from "../collect-preferences";

export const REGISTRY_OBJECT = (project: Preferences["project"]): string => {
  switch (project) {
    case "react-ts":
      return `const registry = {default: lazy(() => import("./skeletons/DefaultBone"))} as const;`;
    case "preact-ts":
      return `const registry = {default: lazy(() => import("./skeletons/DefaultBone"))} as const;`;
    case "react-js":
    case "preact-js":
      return `const registry = {default: lazy(() => import("./skeletons/DefaultBone"))};`;
  }
};
