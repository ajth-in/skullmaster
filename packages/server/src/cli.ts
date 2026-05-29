#!/usr/bin/env node

import { DEFAULT_PORT } from "@o-slash/shared";
import { cac } from "cac";
import { initialize } from "./commands/init";
import { serveCommand } from "./commands/serve";

const cli = cac("Ø");

cli
  .command("serve", "Start Ø dev server")
  .option("--port <port>", "Port", {
    default: DEFAULT_PORT,
  })
  .action(async (options) => {
    await serveCommand(Number(options.port));
  });

cli
  .command("init", "Initialize Ø in your project")
  .option("--ts", "Initialize with typescript", { default: true })

  .action(async (options) => {
    await initialize(options.ts);

    console.log(options);
  });

cli.help();
cli.parse();
