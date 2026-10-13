import type { Preferences } from "../collect-preferences";

export const REGISTRY_SKELETON_PROPS_TYPE = (project: Preferences["project"]): string => {
  switch (project) {
    case "react-ts":
      return `
type SkeletonProps = {
  name: keyof typeof registry | (string & {});
  defaultBoneProps?: ComponentProps<typeof DefaultBone>;
};
`;
    case "preact-ts":
      return `
type SkeletonProps = {
  name: keyof typeof registry | (string & {});
  defaultBoneProps?: ComponentProps<typeof DefaultBone>;
};
`;
    case "react-js":
    case "preact-js":
      return "";
  }
};
