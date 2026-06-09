import { select } from "@clack/prompts";
import { execa } from "execa";

export default async function installPackages(version: string = "latest") {
  const packageManager = await select({
    message: "Install skullmaster packages?",
    initialValue: "pnpm",
    options: [
      { value: "pnpm", label: "pnpm" },
      { value: "npm", label: "npm" },
      { value: "yarn", label: "yarn" },
      { value: "bun", label: "bun" },
      { value: "skip", label: "Skip installation" },
    ],
  });

  if (!packageManager || packageManager === "skip") {
    return;
  }

  const packages = [`skullmaster@${version}`, `@skullmaster/react@${version}`];

  switch (packageManager) {
    case "pnpm":
      await execa("pnpm", ["add", ...packages], {
        stdio: "inherit",
      });
      break;

    case "npm":
      await execa("npm", ["install", ...packages], {
        stdio: "inherit",
      });
      break;

    case "yarn":
      await execa("yarn", ["add", ...packages], {
        stdio: "inherit",
      });
      break;

    case "bun":
      await execa("bun", ["add", ...packages], {
        stdio: "inherit",
      });
      break;
  }
}
