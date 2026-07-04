import { serve } from "@hono/node-server";
import { log, SkeletonPayloadInputSchema } from "@skullmaster/shared";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Project } from "ts-morph";
import { SkeletonCacheDB } from "../cache";
import generateTarget from "../generate-target";
import { transformInput } from "../transform";
import { toPascalCase } from "../utils/to-pascal-case";
import { fnv1a } from "../utils/fnv1a";
import type { Config } from "../init/preferences";

export async function serveCommand(config: Config, port: number) {
  const app = new Hono();

  app.use(
    "*",
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    }),
  );

  const db = await SkeletonCacheDB.create(config);

  app.get("/health", (c) => {
    return c.json({
      ok: true,
    });
  });

  app.post("/skeletons", async (c) => {
    const body = await c.req.json();

    const result = SkeletonPayloadInputSchema.parse(body);

    const project = new Project();
    const entries = Object.entries(result).map(async ([key, value]) => {
      const componentName = toPascalCase(value.component);
      const transformedHtml = transformInput(value.html);
      const hash = fnv1a(transformedHtml).toString();
      const cached = db.get(key);
      const shouldSkip = cached && cached.hash === hash;

      if (shouldSkip) {
        return;
      }

      generateTarget({
        project,
        filePath: `${config.getSkeletonPath()}/${componentName}.${config.getExt()}`,
        componentName,
        body: transformedHtml,
      });

      await db.set(key, {
        component: value.component,
        html: transformedHtml,
        hash,
      });
    });
    await Promise.all(entries);
    config.registry({ type: "add", components: db.getComponentNames() });
    await project.save();

    return c.json({
      sucess: true,
    });
  });

  serve(
    {
      fetch: app.fetch,
      port,
    },
    (info) => {
      log.info(`Server running at http://localhost:${info.port}`);
    },
  );
}
