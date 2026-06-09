#!/usr/bin/env node

import { DEFAULT_PORT } from "@skullmaster/shared";
import { cac } from "cac";
import { initialize } from "./commands/init";
import { serveCommand } from "./commands/serve";
import collectPreferences from "./init/collect-preferences";

const cli = cac("Ø");

cli
  .command("serve", "Start 💀 dev server")
  .option("--port <port>", "Port", {
    default: DEFAULT_PORT,
  })
  .action(async (options) => {
    const preferences = await collectPreferences(false);
    if (!preferences)
      throw new Error("Invalid preferences!! have you ran skullmaster init");
    await serveCommand(preferences, Number(options.port));
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
