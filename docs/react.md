# Getting Started

## Step 1: Install Skullmaster

Run:

```bash
npm install skullmaster@next --save-dev
```

## Step 2: Start the Development Server

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

## Step 3: Mark a Component

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

## Step 4: Render the Skeleton

Render the skeleton anywhere in your application using the generated registry.

## <Skeleton name="ProfileCard" />

Import the `Skeleton` component from:

```
<outDir>/registry.tsx
```

Until the skeleton is generated, `DefaultBone` will be rendered.

## Step 5: Install the React Runtime

Install the React integration.

```bash
npm install @skullmaster/react@next
```

This package sends component information from your React application to the running Skullmaster development server.

## Step 6: Add the Provider

In your application's entry file (`App.tsx`, `main.tsx`, or `layout.tsx`), add the skullmaster compinent.

```jsx
import { Skullmaster } from "@skullmaster/react";

<Skullmaster />;
```

## Step 8: Generate Your First Skeleton

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

## Step 9: Use the Generated Skeleton

Once generated, rendering:

```jsx
<Skeleton name="ProfileCard" />
```

will display the generated skeleton instead of `DefaultBone`.
