import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  exports: true,
  entry: ["src/index.ts", "src/cli.ts"],
  deps: {
    alwaysBundle: ["@skullmaster/excarnate"],
    neverBundle: ["react", "react-dom"],
  },
});
