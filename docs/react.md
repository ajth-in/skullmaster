# Getting Started

## Step 1: Install Skullmaster

Run:

```bash
npm install skullmaster --save-dev
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

Add the `data-skullmaster` attribute to any component you want to generate a skeleton for.

```jsx
<div data-skullmaster="ProfileCard">...</div>
```

The attribute value becomes the skeleton name.

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
npm install @skullmaster/react
```

This package sends component information from your React application to the running Skullmaster development server.

## Step 6: Add the Provider

In your application's entry file (`App.tsx`, `main.tsx`, or `layout.tsx`), add the provider.

```jsx
import { Skullmaster } from "@skullmaster/react";

<Skullmaster isEnabled={process.env.NODE_ENV === "development"} />;
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
