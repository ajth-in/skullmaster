---
"skullmaster": minor
"@skullmaster/react": minor
---

**Description:** Minor release focused on improving generated skeleton fidelity and fixing classname parsing edge cases.

- Removed text obfuscation and replaced incoming text with the Unicode full block character (`U+2588`) for more consistent text placeholders.
- Sanitized generated class names by escaping invalid escape sequences to prevent JavaScript parsing errors, particularly when working with PandaCSS.
