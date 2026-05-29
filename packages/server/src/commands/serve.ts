import { serve } from "@hono/node-server";
import { SkeletonPayloadInputSchema } from "@o-slash/shared";
import { loadConfig } from "c12";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Project } from "ts-morph";
import { SkeletonCacheDB } from "../cache";
import { hashInput } from "../cache/hash";
import generateTarget from "../generate-target";
import { transformInput } from "../transform";

export async function serveCommand(port: number) {
  const app = new Hono();

  app.use(
    "*",
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    }),
  );

  const db = await SkeletonCacheDB.create();

  const { config } = await loadConfig({
    name: "auto-shimmer",
  });

  app.get("/health", (c) => {
    return c.json({
      ok: true,
    });
  });

  app.post("/skeletons", async (c) => {
    const body = await c.req.json();

    const result = SkeletonPayloadInputSchema.parse(body);

    const project = new Project();

    for (const [key, value] of Object.entries(result)) {
      const hash = hashInput(value.html);

      const cached = db.get(key);

      const shouldSkip = cached && cached.hash === hash;

      console.log(`Processing ${key} - ${shouldSkip ? "skipped (cached)" : "updated"}`);

      if (shouldSkip) {
        continue;
      }

      generateTarget({
        project,
        filePath: `.skeletons/${value.component}.tsx`,
        componentName: value.component,
        body: transformInput(value.html),
      });

      await db.set(key, {
        component: value.component,
        html: value.html,
        hash,
      });
    }

    await project.save();

    return c.json({
      ok: true,
    });
  });

  serve(
    {
      fetch: app.fetch,
      port,
    },
    (info) => {
      console.log(`o-slash running at http://localhost:${info.port}`);
    },
  );
}
