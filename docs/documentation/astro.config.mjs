// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeRapide from "starlight-theme-rapide";
// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      customCss: [
        "@fontsource/figtree/400.css",
        "@fontsource/figtree/500.css",
        "@fontsource/figtree/600.css",
        "@fontsource/figtree/700.css",
        "./src/styles/custom.css",
      ],
      title: "Skullmaster",
      description: "Generate customizable skeleton loaders directly from the rendered UI.",
      logo: {
        src: "./src/assets/skull-logo.png",
        replacesTitle: true,
        alt: "Skullmaster logo",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/ajth-in/skullmaster",
        },
      ],
      sidebar: [
        {
          label: "Start here",
          items: [{ label: "Getting started", slug: "getting-started" }],
        },
        {
          label: "Guides",
          items: [
            { label: "Marking components", slug: "guides/marking-components" },
            { label: "DefaultBone", slug: "guides/default-bone" },
            { label: "Customization", slug: "guides/customization" },
          ],
        },
        {
          label: "Concepts",
          items: [
            { label: "How it works", slug: "concepts/how-it-works" },
            { label: "Why preserve the DOM?", slug: "concepts/why-preserve-dom" },
          ],
        },
        {
          label: "Reference",
          items: [
            { label: "CLI", slug: "reference/cli" },
            { label: "React package", slug: "reference/react" },
            { label: "Accessibility & caveats", slug: "reference/accessibility" },
          ],
        },
      ],
    }),
  ],
});
