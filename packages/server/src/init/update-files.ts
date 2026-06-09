import { Project } from "ts-morph";
import { Preferences } from "./collect-preferences";
import { updateCacheRegistry } from "./cache-registry";
import defaultBone from "./default-bone";
import { generateInitialRegistry } from "./registry";

export default async function updateFiles(preferences: Preferences) {
  let project: Project;
  if (preferences.project.endsWith("ts")) {
    project = new Project({
      tsConfigFilePath: "tsconfig.json",
    });
  } else {
    project = new Project();
  }

  await updateCacheRegistry(
    {
      type: "replace",
      cacheEntry: {},
    },
    preferences.outDir,
  );
  await defaultBone(preferences.outDir, preferences.project);
  await generateInitialRegistry(preferences.outDir, preferences.project);
  project.saveSync();
}
