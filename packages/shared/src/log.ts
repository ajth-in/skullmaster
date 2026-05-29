export const log = {
  success: (message: string) => console.log(`\x1b[32m[Ø] ${message}\x1b[0m`),
  info: (message: string) => console.log(`\x1b[36m[Ø] ${message}\x1b[0m`),
  warn: (message: string) => console.log(`\x1b[33m[Ø] ${message}\x1b[0m`),
  error: (message: string) => console.log(`\x1b[31m[Ø] ${message}\x1b[0m`),
  gray: (message: string) => console.log(`\x1b[90m[Ø] ${message}\x1b[0m`),
};
