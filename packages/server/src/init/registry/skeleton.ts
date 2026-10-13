import type { Preferences } from "../collect-preferences";

const JSX_SKELETON_TS = `export default function Skeleton({
  name,
  defaultBoneProps = {},
}: SkeletonProps) {
  const Component = registry[name];

  if (!Component) {
    return <DefaultBone {...defaultBoneProps} />;
  }

  return <Component />;
}
`;

const JSX_SKELETON_JS = `export default function Skeleton({
  name,
  defaultBoneProps = {},
}) {
  const Component = registry[name];

  if (!Component) {
    return <DefaultBone {...defaultBoneProps} />;
  }

  return <Component />;
}
`;

export const REGISTRY_SKELETON = (project: Preferences["project"]): string => {
  switch (project) {
    case "react-ts":
      return JSX_SKELETON_TS;
    case "react-js":
      return JSX_SKELETON_JS;
    case "preact-ts":
      return JSX_SKELETON_TS;
    case "preact-js":
      return JSX_SKELETON_JS;
  }
};
