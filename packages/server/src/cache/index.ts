import { SkeletonCacheEntry, SkeletonCacheEntrySchema } from "@o-slash/shared";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { EMPTY_SET_DEFAULT_DIR } from "../constants";

export class SkeletonCacheDB {
  private path = `${EMPTY_SET_DEFAULT_DIR}/cache.json`;

  private data: SkeletonCacheEntry = {};

  private constructor() {}

  static async create() {
    const db = new SkeletonCacheDB();

    await db.load();

    return db;
  }

  private async load() {
    try {
      const file = await readFile(this.path, "utf8");

      const parsed = JSON.parse(file);

      this.data = SkeletonCacheEntrySchema.parse(parsed);
    } catch {
      this.data = {};

      await this.persist();
    }
  }

  private async persist() {
    await mkdir(dirname(this.path), {
      recursive: true,
    });

    await writeFile(this.path, JSON.stringify(this.data, null, 2), "utf8");
  }

  get(key: string) {
    return this.data[key];
  }

  async set(key: string, value: SkeletonCacheEntry[string]) {
    this.data[key] = value;

    await this.persist();
  }
}
