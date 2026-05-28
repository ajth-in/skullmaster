import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { SkeletonBodySchema } from "../schema";
import { loadConfig } from "c12";
import { Project } from "ts-morph";
import generateTarget from "../generate-target";
import { transformInput } from "../transform";
import { SkeletonCacheDB } from "../cache";
import { hashInput } from "../cache/hash";

export async function serveCommand(port: number) {
  const app = new Hono();

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

    const result = SkeletonBodySchema.parse(body);

    const project = new Project();

    for (const [key, value] of Object.entries(result)) {
      const hash = hashInput(value.html);

      const cached = db.get(key);

      const shouldSkip = cached && cached.hash === hash;
      console.log(
        `Processing ${key} - ${shouldSkip ? "skipped (cached)" : "updated"}`,
      );
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
      console.log(`Caustic running at http://localhost:${info.port}`);
    },
  );
}
