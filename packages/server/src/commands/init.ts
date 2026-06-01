import { EMPTY_SET_DEFAULT_DIR, log } from "@skullmaster/shared";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { askYesNo } from "../utils/prompt-yes-or-no";
import { generateRegistry } from "../init/registry";
import { Project } from "ts-morph";

async function initializeRootDirectory(): Promise<boolean> {
  try {
    await mkdir(EMPTY_SET_DEFAULT_DIR);
    return true;
  } catch {
    const shouldOverride = await askYesNo(
      `"${EMPTY_SET_DEFAULT_DIR}" already exists. Override?`,
    );

    if (!shouldOverride) {
      return false;
    }

    await rm(EMPTY_SET_DEFAULT_DIR, {
      recursive: true,
      force: true,
    });

    await mkdir(EMPTY_SET_DEFAULT_DIR);

    return true;
  }
}

async function initializeCache(): Promise<void> {
  await writeFile(
    join(EMPTY_SET_DEFAULT_DIR, "cache.json"),
    JSON.stringify({}, null, 2),
  );
}

async function initializeBonesDirectory(): Promise<void> {
  await mkdir(join(EMPTY_SET_DEFAULT_DIR, "bones"), {
    recursive: true,
  });
}

const project = new Project();
export async function initialize(isTs: boolean): Promise<void> {
  const initialized = await initializeRootDirectory();

  if (!initialized) {
    log.error("Initialization cancelled.");
    return;
  }

  await initializeCache();
  await initializeBonesDirectory();
  generateRegistry(project, [], isTs);
  await project.save();

  log.success("Initialized successfully.");
}
