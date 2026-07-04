import { SkeletonCacheEntrySchema } from "@skullmaster/shared";
import z from "zod";
import { readFile, writeFile } from "node:fs/promises";
import fileExists from "./is-file-exists";
import { fnv1a } from "../utils/fnv1a";

export type CacheOperation =
  | { type: "replace"; cacheEntry: z.infer<typeof SkeletonCacheEntrySchema> }
  | { type: "delete"; componentName: string }
  | {
      type: "update";
      componentName: string;
      payload: z.infer<typeof SkeletonCacheEntrySchema>[string];
    };

export async function updateCacheRegistry(operation: CacheOperation, outDir: string) {
  const cacheFilePath = outDir;
  let cacheEntries: z.infer<typeof SkeletonCacheEntrySchema> = {};
  if (!(await fileExists(cacheFilePath))) {
    await writeFile(cacheFilePath, JSON.stringify({}), "utf8");
  } else {
    cacheEntries = SkeletonCacheEntrySchema.parse(
      JSON.parse(await readFile(cacheFilePath, "utf8")),
    );
  }
  switch (operation.type) {
    case "replace":
      await writeFile(cacheFilePath, JSON.stringify(operation.cacheEntry), "utf8");
      break;
    case "delete":
      delete cacheEntries[operation.componentName];
      await writeFile(cacheFilePath, JSON.stringify(cacheEntries), "utf8");
      break;
    case "update":
      cacheEntries[operation.componentName] = {
        ...operation.payload,
        hash: fnv1a(operation.payload.html).toString(),
      };
      await writeFile(cacheFilePath, JSON.stringify(cacheEntries), "utf8");
  }
}
