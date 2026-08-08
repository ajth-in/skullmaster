# @skullmaster/exacarnate-client

## 0.2.0-next.2

### Minor Changes

- 1db051e: Minor Changes
  - Skeleton elements are now scored on visual significance and tagged with `data-visual-significance`; elements with no visual presence are flagged with `data-depth="-1"`.
  - Elements rendered with square corners (zero border radius) are now flagged so the skeleton layer can round them.

  - Skeletons now apply the new `--skeleton-border-radius` token to elements that render with sharp corners.
  - Removed the semi-transparent background overlay that previously showed through around text placeholders.
  - Added the `--skeleton-border-radius` CSS variable.

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
