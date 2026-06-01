import { Project } from "ts-morph";
import { join } from "node:path";
import { EMPTY_SET_DEFAULT_DIR } from "@skullmaster/shared";

export function generateRegistry(
  project: Project,
  components: string[],
  isTs: boolean,
) {
  const registryEntries = components
    .map((component) => `"${component}": lazy(() => import("./${component}"))`)
    .join(",\n  ");

  const content = `
  import {
    lazy,
    ${isTs ? "type PropsWithChildren," : ""}
    ${isTs ? "type LazyExoticComponent," : ""}
    ${isTs ? "type ComponentType," : ""}
  } from "react";
  import { Skeleton as SMSkeleton } from "@skullmaster/react";

  const registry${
    isTs
      ? `: Record<
    string,
    LazyExoticComponent<ComponentType<any>>
  >`
      : ""
  } = {
    ${registryEntries}
  };

  ${
    isTs
      ? `
  type SkeletonProps = PropsWithChildren<{
    loading: boolean;
    name: keyof typeof registry;
  }>;
  `
      : ""
  }

  export default function Skeleton({
    loading,
    name,
    children,
  }${isTs ? ": SkeletonProps" : ""}) {
    if (!loading) {
      return (
        <SMSkeleton name={name}>
          {children}
        </SMSkeleton>
      );
    }

    const Component = registry[name];

    if (!Component) {
      return <>loading...</>;
    }

    return <Component />;
  }
  `;

  const sourceFile = project.createSourceFile(
    join(EMPTY_SET_DEFAULT_DIR, "bones", `registry.${isTs ? "tsx" : "jsx"}`),
    content,
    { overwrite: true },
  );

  sourceFile.formatText();
}
