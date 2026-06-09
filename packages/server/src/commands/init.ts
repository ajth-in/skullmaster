import { EMPTY_SET_DEFAULT_DIR, log } from "@skullmaster/shared";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { askYesNo } from "../utils/prompt-yes-or-no";
import { generateRegistry } from "../init/registry";
import { Project } from "ts-morph";
import { intro, isCancel, outro } from "@clack/prompts";
import collectPreferences from "../init/collect-preferences";
import installPackages from "../init/install-packages";
import { version } from "hono/jsx/dom/server";
import updateFiles from "../init/update-files";
// async function initializeRootDirectory(): Promise<boolean> {
//   try {
//     await mkdir(EMPTY_SET_DEFAULT_DIR);
//     return true;
//   } catch {
//     const shouldOverride = await askYesNo(
//       `"${EMPTY_SET_DEFAULT_DIR}" already exists. Override?`,
//     );

//     if (!shouldOverride) {
//       return false;
//     }

//     await rm(EMPTY_SET_DEFAULT_DIR, {
//       recursive: true,
//       force: true,
//     });

//     await mkdir(EMPTY_SET_DEFAULT_DIR);

//     return true;
//   }
// }

// async function initializeCache(): Promise<void> {
//   await writeFile(
//     join(EMPTY_SET_DEFAULT_DIR, "cache.json"),
//     JSON.stringify({}, null, 2),
//   );
// }

// async function initializeBonesDirectory(): Promise<void> {
//   await mkdir(join(EMPTY_SET_DEFAULT_DIR, "bones"), {
//     recursive: true,
//   });
// }

const project = new Project();
export async function initialize(version: string): Promise<void> {
  intro("💀 SkullMaster");
  const preferences = await collectPreferences();
  await installPackages(version);

  await updateFiles(preferences);

  outro("All set! run `skullmaster server` to start the dev server.");

  // const initialized = await initializeRootDirectory();
  // if (!initialized) {
  //   log.error("Initialization cancelled.");
  //   return;
  // }
  // await initializeCache();
  // await initializeBonesDirectory();
  // generateRegistry(project, [], isTs);
  // await project.save();
  // log.success("Initialized successfully.");
}
