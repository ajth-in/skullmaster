---
"@skullmaster/exacarnate-client": minor
"@skullmaster/excarnate": minor
"skullmaster": minor
"@skullmaster/react": minor
---

Minor Changes

- Skeleton elements are now scored on visual significance and tagged with `data-visual-significance`; elements with no visual presence are flagged with `data-depth="-1"`.
- Elements rendered with square corners (zero border radius) are now flagged so the skeleton layer can round them.

- Skeletons now apply the new `--skeleton-border-radius` token to elements that render with sharp corners.
- Removed the semi-transparent background overlay that previously showed through around text placeholders.
- Added the `--skeleton-border-radius` CSS variable.
