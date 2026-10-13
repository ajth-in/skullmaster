import { writeFile } from "node:fs/promises";
import { REGISTRY_HEADER } from "./header";
import { getExtension } from "./extension";
import { REGISTRY_IMPORTS } from "./imports";
import { REGISTRY_OBJECT } from "./registry-object";
import { REGISTRY_SKULL_TYPES } from "./skull-types";
import { REGISTRY_SKELETON_PROPS_TYPE } from "./skeleton-props";
import { REGISTRY_SKULL_UTILS } from "./skull-utils";
import { REGISTRY_SKELETON } from "./skeleton";
import type { Preferences } from "../collect-preferences";

export async function generateInitialRegistry(outDir: string, projectType: Preferences["project"]) {
  const ext = getExtension(projectType);

  const skeleton = REGISTRY_SKELETON(projectType);

  const content = `
${REGISTRY_HEADER}


${REGISTRY_IMPORTS(projectType)}

${REGISTRY_OBJECT(projectType)}

${REGISTRY_SKULL_TYPES(projectType)}
${REGISTRY_SKELETON_PROPS_TYPE(projectType)}
${REGISTRY_SKULL_UTILS(projectType)}
${skeleton}
`;

  await writeFile(`${outDir}/registry.${ext}`, content, "utf8");
}
