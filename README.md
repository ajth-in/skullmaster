# SkullMaster

**Deflesh your UI. Generate production-ready skeleton screens automatically.**

<p align="center">
  <img
    src="docs/images/Skull_Master.webp"
    alt="SkullMaster Logo"
    width="120"
  />
</p>

<p align="center">
  Automatically generate realistic skeleton screens directly from your UI components.
</p>

> 🚧 Work in Progress

---

## What is SkullMaster?

SkullMaster helps you generate production-ready skeleton screens with minimal effort.

Instead of manually building loading states for every component, SkullMaster analyzes your UI and generates matching skeleton components automatically.

## Installation

```bash
pnpm add skullmaster
```

## Initialization

Run the initialization command:

```bash
pnpm skullmaster init
```

The setup wizard will guide you through:

- Installing required dependencies
- Configuring source directories
- Choosing an output directory for generated skeletons
- Creating the required project configuration

Once setup is complete, SkullMaster generates skeleton components inside your configured output directory.

---

## Setup React Integration

Wrap your application with `SkullMaster`.

```tsx
import { SkullMaster } from "@skullmaster/react";

export default function App() {
  return (
    <SkullMaster>
      <YourApplication />
    </SkullMaster>
  );
}
```

---

## Using Generated Skeletons

Import the generated registry from your configured output directory.

```tsx
import Skeleton from "<output-directory>/registry";
```

Wrap any component that should support automatic skeleton generation:

```tsx
<Skeleton name="Projects">
  {" "}
  <Projects5 />{" "}
</Skeleton>
```

The `name` prop is used as the identifier for the generated skeleton component.

---

## Generating Skeletons

Start your application normally:

```bash
pnpm dev
```

You will notice a small SkullMaster icon in the bottom corner of the application.

1. Enable SkullMaster from the floating control.
2. Click on the UI elements you want included in the skeleton.
3. Generate the skeleton.
4. SkullMaster creates production-ready skeleton components automatically.

No manual skeleton markup required.

---

## Example

```tsx
import Skeleton from "./generated/registry";

export default function Page() {
  // this will pick up the skeleton or the default skeleton as fallback
  return <Skeleton name="Projects" />;
}
```

Generated skeletons will be available from the configured output directory and can be used immediately throughout your application.

---

## Features

- Automatic skeleton generation
- Interactive visual element selection
- React integration
- Production-ready skeleton output
- Configurable generation directories
- Generated component registry
- Minimal setup

---

## License

MIT
