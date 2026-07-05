export const log = {
  success: (message: string) => console.log(`\x1b[32m[💀] ${message}\x1b[0m`),
  info: (message: string) => console.log(`\x1b[36m[💀] ${message}\x1b[0m`),
  warn: (message: string) => console.log(`\x1b[33m[💀] ${message}\x1b[0m`),
  error: (message: string) => console.log(`\x1b[31m[💀] ${message}\x1b[0m`),
  gray: (message: string) => console.log(`\x1b[90m[💀] ${message}\x1b[0m`),
};
