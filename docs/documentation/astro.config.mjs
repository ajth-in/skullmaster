// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeRapide from "starlight-theme-rapide";
// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      title: "💀",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ajth-in/skullmaster",
        },
      ],
    }),
  ],
});
