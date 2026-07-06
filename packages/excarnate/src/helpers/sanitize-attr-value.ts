export function sanitizeAttrValue(value: string): string {
  return value.replace(/"/g, "'").replace(/\\/g, "/");
}
