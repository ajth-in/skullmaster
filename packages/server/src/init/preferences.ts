import { mkdirSync, writeFileSync } from "node:fs";
import { log } from "@skullmaster/shared";
import fileExists from "./is-file-exists";
import { generateInitialRegistry, generateRegistry, type RegistryOperation } from "./registry";
import { updateCacheRegistry, type CacheOperation } from "./cache-registry";
import defaultBone from "./default-bone";

export class Config {
  outDir: string;
  projectType: string;

  constructor(outDir: string, projectType: string) {
    this.outDir = outDir;
    this.projectType = projectType;
  }
  async initialize() {
    log.info("Initializing project structure...");
    if (!(await fileExists(this.outDir))) {
      mkdirSync(this.outDir, { recursive: true });
      log.success(`Created output directory: ${this.outDir}`);
    } else {
      log.gray(`Output directory exists: ${this.outDir}`);
    }
    const skeletonsDirectoryPath = this.getSkeletonPath();
    if (!(await fileExists(skeletonsDirectoryPath))) {
      mkdirSync(skeletonsDirectoryPath, { recursive: true });
      log.success(`Created skeletons directory: ${skeletonsDirectoryPath}`);
    } else {
      log.gray(`Skeletons directory exists: ${skeletonsDirectoryPath}`);
    }
    const registryFilePath = this.getRegistryPath();
    if (!(await fileExists(registryFilePath))) {
      await generateInitialRegistry(this.outDir, this.projectType);
      log.success(`Created registry: ${registryFilePath}`);
    } else {
      log.gray(`Registry exists: ${registryFilePath}`);
    }
    const cachePath = this.getCachePath();
    if (!(await fileExists(cachePath))) {
      writeFileSync(cachePath, JSON.stringify({}), "utf8");
      log.success(`Created cache: ${cachePath}`);
    } else {
      log.gray(`Cache exists: ${cachePath}`);
    }
    const defaultBonePath = this.getDefSkeletonPath();
    if (!(await fileExists(defaultBonePath))) {
      await defaultBone(defaultBonePath);
      log.success(`Created default bone: ${defaultBonePath}`);
    } else {
      log.gray(`Default bone exists: ${defaultBonePath}`);
    }
    log.success("Initialization complete");
  }
  async cache(op: CacheOperation) {
    return await updateCacheRegistry(op, this.outDir);
  }
  async registry(op: RegistryOperation) {
    return generateRegistry(op, this.projectType.endsWith("ts"), this.getRegistryPath());
  }
  getCachePath() {
    return `${this.outDir}/cache.json`;
  }
  getSkeletonPath() {
    return `${this.outDir}/skeletons`;
  }
  getDefSkeletonPath() {
    return `${this.getSkeletonPath()}/DefaultBone.${this.getExt()}`;
  }
  getExt() {
    return this.projectType.endsWith("ts") ? "tsx" : "jsx";
  }
  getRegistryPath() {
    return `${this.outDir}/registry.${this.getExt()}`;
  }
}
