export function toCamelCase(input: string): string {
  return input
    .trim()
    .replace(/['"]/g, "")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();

      return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}
