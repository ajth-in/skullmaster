import { cancel, isCancel, select, text } from "@clack/prompts";
import fileExists from "./is-file-exists";
import { readFile, writeFile } from "fs/promises";
import { CONFIG_PATH } from "../constants";

export type Preferences = {
  outDir: string;
  project: string;
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
    initialValue: "react-ts",
    options: [
      { value: "react-ts", label: "React with TypeScript" },
      { value: "react-js", label: "React" },
    ],
  });

  if (isCancel(projectType)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const preferences = {
    outDir,
    project: projectType.toString(),
  };
  await writeFile(`./${CONFIG_PATH}`, JSON.stringify(preferences, null, 2), "utf-8");

  return preferences;
}
