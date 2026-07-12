---
"@skullmaster/excarnate": minor
"skullmaster": minor
"@skullmaster/react": minor
---

This release focuses on improving customization, generated output quality, developer experience, and documentation. It also includes several fixes to React generation and theme styling.

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
