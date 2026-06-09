import { cancel, confirm, isCancel, outro, select, text } from "@clack/prompts";
import fileExists from "./is-file-exists";
import { readFile, writeFile } from "fs/promises";

export type Preferences = {
  outDir: string;
  project: string;
};
export default async function collectPreferences(): Promise<Preferences> {
  const isAlreadyInitialized = await fileExists("skullmaster.config.json");
  if (isAlreadyInitialized) {
    const shouldOverride = await confirm({
      message:
        "skullmaster.config.json already exists. Do you want to override it?",
    });
    if (!shouldOverride) {
      return JSON.parse(await readFile("./skullmaster.config.json", "utf-8"));
    }
  }

  const outDir = await text({
    message: "Where do you want to output the generated files?",
    placeholder: "src/skulls",
    initialValue: "src/skeletons",
    validate(value) {
      if (value?.length === 0) return `Value is required!`;
    },
  });
  if (isCancel(outDir)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const projectType = await select({
    message: "Pick a project type.",
    initialValue: "react",
    options: [
      { value: "react", label: "React" },
      { value: "svelte", label: "Svelte", disabled: true },
      { value: "angular", label: "Angular", disabled: true },
    ],
  });

  if (isCancel(projectType)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }
  const isTsConfigExists = await fileExists("tsconfig.json");

  const isTypescript = await select({
    message: "Is this a TypeScript project?",
    initialValue: isTsConfigExists,
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  });
  const preferences = {
    outDir,
    project: `${projectType.toString()}-${isTypescript ? "ts" : "js"}`,
  };
  await writeFile(
    "./skullmaster.config.json",
    JSON.stringify(preferences, null, 2),
    "utf-8",
  );

  return preferences;
}
