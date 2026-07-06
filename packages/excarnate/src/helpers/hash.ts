export default function spacePreservedObfuscator(input?: string): string | null {
  if (!input) return null;

  return [...input].map((char) => (char === " " ? " " : "█")).join("");
}
