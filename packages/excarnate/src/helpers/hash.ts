const SAFE_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.~";

export default function spacePreservedObfuscator(
  input?: string,
): string | null {
  if (!input) return null;

  let seed = 2166136261;

  for (const char of input) {
    seed ^= char.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }

  const len = SAFE_CHARS.length;

  return [...input]
    .map((char, i) => {
      if (char === " ") {
        return " ";
      }

      seed ^= seed << 13;
      seed ^= seed >>> 17;
      seed ^= seed << 5;

      return SAFE_CHARS[Math.abs(seed + i) % len];
    })
    .join("");
}
