export function toPascalCase(input: string): string {
  return input
    .trim()
    .replace(/['"]/g, "")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}
