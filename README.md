> [!WARNING]
> **Experimental:** This package is under active development. APIs and generated output may change between releases.

# Skullmaster

Skullmaster is a CLI tool that lets you generate customizable skeleton loaders for your UI components directly from the browser. Instead of manually creating placeholder components, Skullmaster analyzes the rendered component and generates a matching skeleton that you can customize further with data attributes.

## Getting started

Choose the guide for your framework to install Skullmaster, configure the development server, and generate your first skeleton component.

- ⚛️ **[React](/docs/react.md)**
  Learn how to install Skullmaster in a React project, start the development server, and generate customizable skeleton components.

- 🔶 **[Svelte](/docs/svelte.md)**
  Set up Skullmaster in a Svelte project and generate framework-native skeleton components from your application's rendered UI.

## How it works

Generating an accurate skeleton requires runtime information that only exists after your application has been rendered by the browser. This includes the final HTML structure, computed styles, image dimensions, text layout, and other rendering details.

Skullmaster solves this by running a small development helper inside your application. During development, this helper collects the runtime information required to recreate your UI as a skeleton and sends it to the Skullmaster CLI, which runs locally (by default on port **8080**).

The CLI receives this payload and generates skeleton components for your chosen framework.

### Generated output

Unlike approaches that reconstruct your skeletons from scratch, Skullmaster preserves the original DOM structure as much as possible. The generated skeleton closely resembles the original markup.

For example, unlike libraries such as [0xGF/boneyard](https://github.com/0xGF/boneyard), Skullmaster does **not** flatten your UI into a collection of generic `<div>` elements. Semantic elements such as `<article>`, `<section>`, `<header>`, `<nav>`, `<button>`, and `<img>` are preserved whenever possible.

Interactive elements are transformed so they remain visually accurate while behaving like non-interactive placeholders.

### During generation, Skullmaster performs the following transformations:

- Replaces all text content with placeholder characters of approximately the same visual length.
- Replaces images with placeholder SVGs that preserve the original aspect ratio and natural dimensions.
- Removes all interactive behavior from controls such as buttons, links, inputs, and other focusable elements.
- Hides the generated skeleton from the accessibility tree so assistive technologies do not announce placeholder content.
- Applies skeleton styling and shimmer animations while preserving the original layout.

## Why preserve the DOM?

Keeping the generated markup close to the original component has several advantages:

- Responsiveness is not a concern. SkullMaster preserves your component's DOM structure, so if the original component is responsive, the generated skeleton will be responsive too.
- You don't need to maintain a separate skeleton. The generated skeleton always mirrors the rendered output. If the component's styles change, you'll need to manually trigger regeneration to apply the updated styles.

## Customization

The generated skeleton is intended to be a starting point. Depending on your component, the default output may not always match the level of detail you want. In some cases, generating placeholders for every DOM element can make the skeleton appear overly cluttered.

To reduce unnecessary visual noise, SkullMaster automatically assigns `data-depth="-1"` to elements that are used only for layout or are not visually significant. These elements are rendered as transparent while still preserving the layout.

You can also use this attribute yourself to fine tune the generated skeleton:

- Set `data-depth="-1"` on elements you want to remain transparent while preserving their layout.
- Remove or change the attribute on elements that should render a visible skeleton placeholder.

If you want to exclude an entire subtree from skeleton generation, add the `data-skip-skull` attribute to its root element. SkullMaster will ignore that element and all of its descendants during generation.

```html
<div data-skip-skull>
  <!-- This subtree will not be included in the generated skeleton -->
</div>
```

## Accessibility

Generated skeletons are intended to be visual placeholders only.

To avoid confusing screen reader users, SkullMaster automatically removes interactive behavior, marks placeholder content as inaccessible, and applies the appropriate `aria-busy` attributes to indicate that content is still loading.

Generated skeletons should never be interpreted as meaningful page content.

## Caveats

- If the HTML generated in development differs from the HTML rendered in production, the generated skeleton may not accurately match the production UI.
- Generated skeletons may not be semantically correct for a skeleton.
