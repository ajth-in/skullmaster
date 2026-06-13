import { Preferences } from "./collect-preferences";
import { updateCacheRegistry } from "./cache-registry";
import defaultBone from "./default-bone";
import { generateInitialRegistry, generateRegistry } from "./registry";

export default async function updateFiles(preferences: Preferences) {
  await updateCacheRegistry(
    {
      type: "replace",
      cacheEntry: {},
    },
    preferences.outDir,
  );
  await defaultBone(preferences.outDir, preferences.project);
  await generateInitialRegistry(preferences.outDir, preferences.project);
  await generateRegistry(
    { type: "init", components: ["DefaultBone"] },
    preferences.outDir,
    preferences.project,
  );
}
