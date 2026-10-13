import type { Preferences } from "../collect-preferences";

export const REGISTRY_IMPORTS = (project: Preferences["project"]): string => {
  switch (project) {
    case "react-ts":
      return `import "@skullmaster/react/style.css";
import DefaultBone from "./skeletons/DefaultBone";
import { type ComponentProps, type HTMLAttributes, lazy } from "react";`;
    case "react-js":
      return `import "@skullmaster/react/style.css";
import DefaultBone from "./skeletons/DefaultBone";
import { lazy } from "react";`;
    case "preact-ts":
      return `import "@skullmaster/react/style.css";
import DefaultBone from "./skeletons/DefaultBone";
import { type ComponentProps, type HTMLAttributes, lazy } from "preact/compat";`;
    case "preact-js":
      return `import "@skullmaster/react/style.css";
import DefaultBone from "./skeletons/DefaultBone";
import { lazy } from "preact/compat";`;
  }
};
