import { ATTRIBUTE_MAP } from "./attribute-replace-map";

export function normalizeAttributeName(name: string): string {
  const lower = name.toLowerCase();

  if (ATTRIBUTE_MAP[lower]) {
    return ATTRIBUTE_MAP[lower];
  }

  if (lower.startsWith("data-") || lower.startsWith("aria-")) {
    return lower;
  }

  return name.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}
