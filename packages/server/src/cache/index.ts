import {
  EMPTY_SET_DEFAULT_DIR,
  SkeletonCacheEntry,
  SkeletonCacheEntrySchema,
} from "@skullmaster/shared";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { updateCacheRegistry } from "../init/cache-registry";

export class SkeletonCacheDB {
  private data: SkeletonCacheEntry = {};
  outDir: string;
  projectType: string;

  private constructor(outDir: string, projectType: string) {
    this.outDir = outDir;
    this.projectType = projectType;
  }

  static async create(outDir: string, projectType: string) {
    const db = new SkeletonCacheDB(outDir, projectType);

    await db.load();

    return db;
  }

  private async load() {
    try {
      const file = await readFile(this.outDir, "utf8");

      const parsed = JSON.parse(file);

      this.data = SkeletonCacheEntrySchema.parse(parsed);
    } catch {
      this.data = {};

      await updateCacheRegistry({ type: "replace", cacheEntry: {} }, this.outDir);
    }
  }

  get(key: string) {
    return this.data[key];
  }
  getComponentNames(): string[] {
    return Object.values(this.data).map((entry) => entry.component);
  }

  async set(key: string, value: SkeletonCacheEntry[string]) {
    this.data[key] = value;
    updateCacheRegistry({ type: "update", componentName: key, payload: value }, this.outDir);
  }
}
