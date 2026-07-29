> [!WARNING]
> **Experimental:** This package is under active development. APIs and generated output may change between releases.

# Skullmaster

Skullmaster is a CLI tool that lets you generate customizable skeleton loaders for your UI components directly from the browser. Instead of manually creating placeholder components, Skullmaster analyzes the rendered component and generates a matching skeleton that you can customize further with data attributes.

## Getting started

### Step 1: Install Skullmaster

```bash
npm install skullmaster@next --save-dev
```

### Step 2: Start the Development Server

Start the Skullmaster development server:

```bash
npm skullmaster serve
```

On the first run, Skullmaster will guide you through a short setup.

You'll be asked to choose:

- **Output directory** (default: `src/skeletons`)
- **Project type**
  - `react`
  - `react-ts`

After setup, the following file will be created:

```
## <outDir>/skeletons/DefaultBone.tsx
```

`DefaultBone.tsx` is the fallback skeleton that is rendered whenever a generated skeleton does not exist.

The development server will then be available at:

```text
http://localhost:8080
```

### Step 3: Mark a Component

Register any element you want to generate a skeleton for using the `markAsSkull` helper from `@skullmaster/react`. Spread the returned props onto the element:

```jsx
import { markAsSkull } from "@skullmaster/react";

<div {...markAsSkull("ProfileCard")}>...</div>;
```

The `name` argument becomes the skeleton name.

You can also fine-tune an element without registering it as a named component using `tweakForSkull`:

```jsx
import { tweakForSkull } from "@skullmaster/react";

<fieldset {...tweakForSkull({ hideSubTree: true })}>...</fieldset>;
```

Both helpers accept a `tweaks` object: `hideSubTree` (sets `data-skip-skull`), `isTransparent` (sets `data-depth="-1"`). If you prefer, you can still set these `data-*` attributes manually instead.

### Step 4: Render the Skeleton

Render the skeleton anywhere in your application using the generated registry.

```
<Skeleton name="ProfileCard" />
```

Import the `Skeleton` component from:

```
<outDir>/registry.tsx
```

Until the skeleton is generated, `DefaultBone` will be rendered.

### Step 5: Install the React Runtime

```bash
npm install @skullmaster/react@next
```

This package sends component information from your React application to the running Skullmaster development server.

### Step 6: Add the Provider

In your application's entry file (`App.tsx`, `main.tsx`, or `layout.tsx`), add the skullmaster component:

```jsx
import { Skullmaster } from "@skullmaster/react";

<Skullmaster />;
```

### Step 7: Generate Your First Skeleton

Start both:

- The Skullmaster development server
- Your React development server

Then:

1. Enable Skullmaster using the skull icon.
2. Hover over a component marked with `data-skullmaster`.
3. Click the download button.

Skullmaster will analyze the rendered component and generate its skeleton automatically.

The generated file will be saved to:

```text
<outDir>/skeletons/ProfileCard.tsx
```

### Step 8: Use the Generated Skeleton

Once generated, rendering:

```jsx
<Skeleton name="ProfileCard" />
```

will display the generated skeleton instead of `DefaultBone`.

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

You can also control these attributes yourself instead of writing them by hand. The `<outDir>/registry.{tsx, jsx}` package exports two helpers that apply the attributes as type-safe props:

- `markAsSkull(name, tweaks?)` — registers an component for skeleton generation. It also accepts the tweaks for the top level element:
  ```tsx
  <section {...markAsSkull("Hero", { isTransparent: true })}>...</section>
  ```
- `tweakForSkull(tweaks?)` — applies tweaks to a child element of a registered parent
  ```tsx
  <fieldset {...tweakForSkull({ hideSubTree: true })}>...</fieldset>
  ```

Both accept a `SkullTweaks` object:

- `hideSubTree` — exclude the element and its entire subtree from generation (sets `data-skip-skull`).
- `isTransparent` — render the element as transparent while preserving its layout (sets `data-depth="-1"`).

If you prefer to set the attributes manually, you can still do so:

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
