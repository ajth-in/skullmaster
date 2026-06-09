#!/usr/bin/env node

import { DEFAULT_PORT } from "@skullmaster/shared";
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
  .option("--version <version>", "Initialize with a specific version", {
    default: "latest",
  })

  .action(async (options) => {
    await initialize(options.version);

    console.log(options);
  });

cli.help();
cli.parse();
