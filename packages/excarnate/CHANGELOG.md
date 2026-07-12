# @skullmaster/excarnate

## 0.2.0-next.1

### Minor Changes

- 61c14d0: This release focuses on improving customization, generated output quality, developer experience, and documentation. It also includes several fixes to React generation and theme styling.
  - Added support for the `data-skip-skull` attribute to exclude specific elements from skeleton generation.
  - Added default CSS styling for interactive input components in generated skeletons.
  - React components now accept a configurable `port` prop, allowing the development server port to be customized.
  - Generated React skeleton files now automatically include the required style imports.
  - Updated the documentation with new guides and improvements.
  - Updated the documentation file paths for improved project structure.
  - Upgraded the project to **pnpm 11**.
  - Added an image testing section to improve visual validation of generated skeletons.
  - Fixed React image skeleton generation by no longer automatically adding `width` and `height` props to `<img>` elements.
  - Fixed an issue where `toPascalCase` received an incorrect file path in Excarnate.
  - Improved dark theme colors for better visual consistency.
  - Reduced light mode contrast to improve skeleton appearance.

## 0.1.3-next.0

### Patch Changes

- 9c553a5: made excarnate package baked into server

## 0.1.2

### Patch Changes

- 37b4fd4: Remove the shared dependency package and bake it to the prod package

## 0.1.1

### Patch Changes

- 28aa74f: Minor release focused on improving the developer experience, introducing browser extension support, simplifying project setup, and enhancing the quality of generated skeletons.
  - Initialized the WXT project for browser extension support.
  - Added animation styles for skeletons with refined motion while removing unnecessary animations.
  - Improved generated HTML structure and overall consistency.
  - Enhanced text and image transformations for more accurate skeleton generation.
  - Added React CSS imports for easier integration.
  - Split CSS into multiple files for improved maintainability.
  - Added a Vite + React example project to help you get started.
  - Removed the initialization step. Project structure is now generated automatically when running the development server.
  - Added a Hero skeleton component.
  - Added a download button to the browser extension control panel.
  - Fixed duplicate image generation during skeleton creation.
  - Simplified the demo application build workflow.

- Updated dependencies [28aa74f]
  - @skullmaster/shared@0.2.1

## 0.1.0

### Minor Changes

- 7116287: Initial test release
