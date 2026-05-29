// tsdown.config.ts
import { defineConfig } from "tsdown";

export default defineConfig({
  platform: "neutral",
  dts: true,
  exports: true,
  entry: ["src/index.ts"],
  format: ["esm"],
  deps: { neverBundle: ["react", "react-dom"] },
});
