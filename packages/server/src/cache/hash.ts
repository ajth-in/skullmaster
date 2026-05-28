import { createHash } from "node:crypto";

export function hashInput(input: string) {
  return createHash("sha256").update(input).digest("hex");
}
