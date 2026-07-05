// tsdown.config.ts
import { defineConfig } from "tsdown";

export default defineConfig({
  platform: "neutral",
  dts: true,
  exports: true,
  entry: ["src/index.ts", "src/styles.css"],
  format: ["esm"],
  deps: { neverBundle: ["react", "react-dom"] },
  css: {
    minify: true,
    target: ["chrome80", "firefox75", "safari13.1"],
  },
});
