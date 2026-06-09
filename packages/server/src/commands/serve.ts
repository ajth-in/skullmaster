import { serve } from "@hono/node-server";
import {
  EMPTY_SET_DEFAULT_DIR,
  log,
  SkeletonPayloadInputSchema,
} from "@skullmaster/shared";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Project } from "ts-morph";
import { SkeletonCacheDB } from "../cache";
import generateTarget from "../generate-target";
import { generateRegistry } from "../init/registry";
import { transformInput } from "../transform";
import { toPascalCase } from "../utils/to-pascal-case";
import { fnv1a } from "../utils/fnv1a";
import { Preferences } from "../init/collect-preferences";

export async function serveCommand(preferences: Preferences, port: number) {
  const { outDir, project: projectType } = preferences;
  const isTs = projectType.endsWith("ts");
  const app = new Hono();

  app.use(
    "*",
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    }),
  );

  const db = await SkeletonCacheDB.create(outDir, projectType);

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
      const componentName = toPascalCase(value.component);
      const transformedHtml = transformInput(value.html);
      const hash = fnv1a(transformedHtml).toString();
      const cached = db.get(key);
      const shouldSkip = cached && cached.hash === hash;

      if (shouldSkip) {
        continue;
      }

      generateTarget({
        project,
        filePath: `${outDir}/bones/${componentName}.${isTs ? "tsx" : "jsx"}`,
        componentName,
        body: transformedHtml,
      });

      await db.set(key, {
        component: value.component,
        html: transformedHtml,
        hash,
      });
    }
    generateRegistry(
      { type: "add", components: db.getComponentNames() },
      outDir,
      projectType,
    );
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
