// tsdown.config.ts
import { defineConfig } from "tsdown";

export default defineConfig({
  platform: "neutral",
  dts: true,
  exports: true,
  entry: ["src/index.ts", "src/worker.ts"],
  format: ["esm"],
  external: ["react", "react-dom", "@base-ui/react"],
});
