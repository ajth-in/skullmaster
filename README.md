# Skullmaster

> For full documentation, visit **https://skullmaster.ajth.in**.

Skullmaster is a CLI tool that lets you generate customizable skeleton loaders for your UI components directly from the browser. Instead of manually creating placeholder components, Skullmaster analyzes the rendered component and generates a matching skeleton.

> [!WARNING]
> **Experimental:** This package is under active development. APIs and generated output may change between releases.

## Getting started

### 1. Install Skullmaster

```bash
npm install -D skullmaster@beta
npm install @skullmaster/react@beta
# or, for Preact:
npm install @skullmaster/preact@beta
```

> Using Preact? Swap `@skullmaster/react` for `@skullmaster/preact` in the steps below — same API. For framework-specific setup, see the [getting started guide](https://skullmaster.ajth.in/getting-started/).

### 2. Start the development server

```bash
npx skullmaster serve
```

The development server will then be available at:

```text
http://localhost:8080
```

### 3. Mark a component

Register any element you want to generate a skeleton for using the `markAsSkull` helper from `@skullmaster/react` (or `@skullmaster/preact`). Spread the returned props onto the element:

```jsx
import { markAsSkull } from "@skullmaster/react";

<div {...markAsSkull("ProfileCard")}>...</div>;
```

The `name` argument becomes the skeleton name. See [Marking components](https://skullmaster.ajth.in/guides/marking-components/) for the full API including `tweakForSkull`.

### 4. Add the provider

In your application's entry file (`App.tsx`, `main.tsx`, or `layout.tsx`), add the Skullmaster component:

```jsx
import { Skullmaster } from "@skullmaster/react"; // or "@skullmaster/preact"

<Skullmaster />;
```

This development-only helper collects runtime information and sends it to the CLI.

### 5. Generate your first skeleton

Load your application in the browser, hover over the marked component and click:

![Hovering over a marked component and clicking to generate its skeleton](https://skullmaster.ajth.in/comp-select-optimized.gif)

### 6. Use the generated skeleton

Once generated, `<Skeleton name="UserCard" />` displays the generated skeleton instead of [DefaultBone](https://skullmaster.ajth.in/guides/default-bone/):

```tsx
import { Skeleton } from "../skeletons/registry";

function ProfileCardPage({ user, isLoading }) {
  if (isLoading) {
    return <Skeleton name="ProfileCard" />;
  }
  return <ProfileCard user={user} />;
}
```

Next: learn how to [customize output](https://skullmaster.ajth.in/guides/customization/) and [how generation works](https://skullmaster.ajth.in/concepts/how-it-works/).
