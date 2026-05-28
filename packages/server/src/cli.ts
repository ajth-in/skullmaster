#!/usr/bin/env node

import { cac } from "cac";
import { serveCommand } from "./commands/serve";

const cli = cac("caustic");

cli
  .command("serve", "Start Caustics dev server")
  .option("--port <port>", "Port", {
    default: "4000",
  })
  .action(async (options) => {
    await serveCommand(Number(options.port));
  });

cli.help();
cli.parse();
