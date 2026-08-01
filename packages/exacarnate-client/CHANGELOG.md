# @skullmaster/exacarnate-client

## 0.2.0-next.1

### Patch Changes

- 45a516b: test excarnate-client deployment

## 0.2.0-next.0

### Minor Changes

- e2e497e: - This release introduces new APIs for fine tuning generated skeletons, improves the generated output, and adds several quality of life improvements for the development workflow.
  - Added `markAsSkull` support to generated files, making it easier to annotate elements for skeleton generation.

  - Added `tweakForSkull` support to generated files, allowing generated skeleton output to be customized programmatically.

  - Added the `excarnate-client` package and integrated it with the browser tooling.

  - Added a `reset` command to restore the project to its initial generated state.

  - Skeleton components can now receive and forward component props.

  - Added autocomplete support for the skeleton name field.

  - Added utilities for marking skeletons and tweaking generated output.

  - Improved generated placeholder images by introducing an intermediate color for smoother visual appearance.

  - Fixed an issue where the download highlight did not initialize correctly when the selected content was displayed over a modal.

  - Removed redundant packages to reduce project overhead.

  - Regenerated bundled skeletons to reflect the latest generation improvements.
