import z from "zod";

export const SkeletonBodySchema = z.record(
  z.string(),
  z.object({
    component: z.string(),
    html: z.string(),
  }),
);

export const SkeletonCacheSchema = z.record(
  z.string(),
  z.object({
    component: z.string(),
    html: z.string(),
    hash: z.string(),
  }),
);

export type SkeletonBody = z.infer<typeof SkeletonBodySchema>;

export type SkeletonCache = z.infer<typeof SkeletonCacheSchema>;
