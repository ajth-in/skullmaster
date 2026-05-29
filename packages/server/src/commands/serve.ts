import { serve } from "@hono/node-server";
import { SkeletonPayloadInputSchema } from "@o-slash/shared";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Project } from "ts-morph";
import { SkeletonCacheDB } from "../cache";
import { hashInput } from "../cache/hash";
import { EMPTY_SET_DEFAULT_DIR } from "../constants";
import generateTarget from "../generate-target";
import { transformInput } from "../transform";
import { log } from "../utils/log";
import { toCamelCase } from "../utils/to-camel-case";

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

      if (shouldSkip) {
        log.gray(`Processing ${key} - skipped (cached)`);
      } else {
        log.success(`Processing ${key} - updated`);
      }

      if (shouldSkip) {
        continue;
      }

      const componentName = toCamelCase(value.component);

      generateTarget({
        project,
        filePath: `${EMPTY_SET_DEFAULT_DIR}/bones/${componentName}.tsx`,
        componentName,
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
      log.info(`Server running at http://localhost:${info.port}`);
    },
  );
}
