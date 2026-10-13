import { cancel, isCancel, select, text } from "@clack/prompts";
import fileExists from "./is-file-exists";
import { readFile, writeFile } from "fs/promises";
import { CONFIG_PATH } from "../constants";
export const projectTypes = [
  { value: "react", label: "React" } as const,
  { value: "preact", label: "Preact" } as const,
];
const projectVariantType = [
  { value: "ts", label: "TypeScript" } as const,
  { value: "js", label: "JavaScript" } as const,
];
export type Preferences = {
  outDir: string;
  project: `${(typeof projectTypes)[number]["value"]}-${(typeof projectVariantType)[number]["value"]}`;
};

export default async function collectPreferences(): Promise<Preferences> {
  const isAlreadyInitialized = await fileExists(CONFIG_PATH);
  if (isAlreadyInitialized) {
    return JSON.parse(await readFile(`./${CONFIG_PATH}`, "utf-8"));
  }

  const outDir = await text({
    message: "Where do you want to output the generated files?",
    placeholder: "src/skeletons",
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
    options: projectTypes,
  });

  if (isCancel(projectType)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const variant = await select({
    message: "Pick a project variant.",
    initialValue: "ts",
    options: projectVariantType,
  });

  if (isCancel(variant)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const preferences: Preferences = {
    outDir,
    project: `${projectType}-${variant.toString()}` as Preferences["project"],
  };
  await writeFile(`./${CONFIG_PATH}`, JSON.stringify(preferences, null, 2), "utf-8");

  return preferences;
}
