import { intro, outro } from "@clack/prompts";
import collectPreferences from "../init/collect-preferences";
import installPackages from "../init/install-packages";
import updateFiles from "../init/update-files";

export async function initialize(version: string): Promise<void> {
  intro("💀 SkullMaster");
  const preferences = await collectPreferences();
  await installPackages(version);
  await updateFiles(preferences);
  outro("All set! run `skullmaster server` to start the dev server.");
}
