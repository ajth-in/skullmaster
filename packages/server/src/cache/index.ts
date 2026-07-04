import { type SkeletonCacheEntry, SkeletonCacheEntrySchema } from "@skullmaster/shared";
import { readFile } from "node:fs/promises";
import type { Config } from "../init/preferences";

export class SkeletonCacheDB {
  private data: SkeletonCacheEntry = {};
  config: Config;
  private constructor(config: Config) {
    this.config = config;
  }

  static async create(config: Config) {
    const db = new SkeletonCacheDB(config);

    await db.load();

    return db;
  }

  private async load() {
    try {
      const file = await readFile(this.config.getCachePath(), "utf8");

      const parsed = JSON.parse(file);

      this.data = SkeletonCacheEntrySchema.parse(parsed);
    } catch {
      this.data = {};

      await this.config.cache({ type: "replace", cacheEntry: {} });
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
    this.config.cache({ type: "update", componentName: key, payload: value });
  }
}
