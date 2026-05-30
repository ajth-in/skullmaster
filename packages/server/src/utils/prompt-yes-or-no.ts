import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";

export async function askYesNo(
  question: string,
  defaultValue = false,
): Promise<boolean> {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  const suffix = defaultValue ? "(Y/n)" : "(y/N)";

  const answer = await rl.question(`${question} ${suffix}: `);

  rl.close();

  const normalized = answer.trim().toLowerCase();

  if (!normalized) {
    return defaultValue;
  }

  return normalized === "y" || normalized === "yes";
}
