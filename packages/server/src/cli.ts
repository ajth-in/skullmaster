#!/usr/bin/env node

import { cac } from "cac";
import { serveCommand } from "./commands/serve";
import collectPreferences from "./init/collect-preferences";
import { Config } from "./init/preferences";
import { DEFAULT_PORT } from "./shared";

const cli = cac("💀");

cli
  .command("serve", "Start 💀 dev server")
  .option("--port <port>", "Port", {
    default: DEFAULT_PORT,
  })
  .action(async (options) => {
    const preferences = await collectPreferences();
    const config = new Config(preferences.outDir, preferences.project);
    await config.initialize();
    await serveCommand(config, Number(options.port));
  });

cli.help();
cli.parse();
