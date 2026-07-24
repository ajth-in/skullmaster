#!/usr/bin/env node

import { cac } from "cac";
import { cancel, isCancel, confirm } from "@clack/prompts";
import { serveCommand } from "./commands/serve";
import collectPreferences from "./init/collect-preferences";
import { Config } from "./init/preferences";
import { DEFAULT_PORT, log } from "./shared";

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

cli.command("reset", "Reset Skullmaster to its initial state").action(async () => {
  const proceed = await confirm({
    message:
      "This will wipe out all present generated skeletons and reset the registry. Are you sure?",
  });

  if (isCancel(proceed) || !proceed) {
    cancel("Reset cancelled.");
    process.exit(0);
  }

  const preferences = await collectPreferences();
  const config = new Config(preferences.outDir, preferences.project);
  await config.initialize(true);
  log.success("Reset complete");
});

cli.help();
cli.parse();
