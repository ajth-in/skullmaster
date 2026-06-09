import { EMPTY_SET_DEFAULT_DIR, log } from "@skullmaster/shared";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { askYesNo } from "../utils/prompt-yes-or-no";
import { generateRegistry } from "../init/registry";
import { Project } from "ts-morph";
import { intro, isCancel, outro } from "@clack/prompts";
import collectPreferences from "../init/collect-preferences";
import installPackages from "../init/install-packages";
import updateFiles from "../init/update-files";

const project = new Project();
export async function initialize(version: string): Promise<void> {
  intro("💀 SkullMaster");
  const preferences = await collectPreferences();
  await installPackages(version);
  await updateFiles(preferences);
  outro("All set! run `skullmaster server` to start the dev server.");
}
