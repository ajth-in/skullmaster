import z from "zod";

export const SkeletonPayloadInputSchema = z.record(
  z.string(),
  z.object({
    component: z.string(),
    html: z.string(),
  }),
);

export const SkeletonCacheEntrySchema = z.record(
  z.string(),
  z.object({
    component: z.string(),
    html: z.string(),
    hash: z.string(),
  }),
);

export type SkeletonPayloadInput = z.infer<typeof SkeletonPayloadInputSchema>;

export type SkeletonCacheEntry = z.infer<typeof SkeletonCacheEntrySchema>;
