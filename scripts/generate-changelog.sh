#!/usr/bin/env bash

set -euo pipefail

for cmd in git opencode wl-copy; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Error: '$cmd' is not installed or not in PATH." >&2
    exit 1
  fi
done


LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || true)

if [[ -z "$LAST_TAG" ]]; then
  echo "Error: no previous tag found." >&2
  exit 1
fi

echo "Generating changelog from $LAST_TAG to HEAD..." >&2

COMMITS=$(git log \
  "${LAST_TAG}..HEAD" \
  --no-merges \
  --format=$'===== COMMIT =====\n%h %s\n%b')

if [[ -z "$COMMITS" ]]; then
  echo "No commits since $LAST_TAG." >&2
  exit 0
fi

DIFF=$(git diff "$LAST_TAG"..HEAD)

PROMPT=$(cat <<'EOF'
Generate a changelog for this release based on the provided commit history
and final Git diff.

Determine the appropriate semantic version bump:

- Major: breaking changes
- Minor: new user-facing features or meaningful improvements
- Patch: bug fixes or small user-facing improvements

Use exactly this format:

<Major|Minor|Patch> Changes

### <affected subpackage>
- change 1
- change 2

### <another affected subpackage>
- change 1
- change 2

Rules:

- Only include changes relevant to users of the packages.
- Skip internal implementation details.
- Skip internal refactors unless they change user-facing behavior.
- Skip tests and test infrastructure changes.
- Skip CI/CD changes.
- Skip formatting and linting changes.
- Skip comments.
- Skip documentation-only changes.
- Skip repository maintenance and housekeeping.
- Skip dependency updates unless they affect package users.
- Skip build tooling changes unless they affect the published package or its users.
- Skip changes that only improve the development experience of repository maintainers.
- Do not blindly convert every commit into a changelog entry.
- Use the final diff to understand what actually changed.
- Use commit messages only as additional context.
- Describe the resulting user-facing behavior, not the implementation.
- Group changes by affected subpackage.
- Use the actual package/subpackage name when it can be determined.
- Keep each changelog bullet concise.
- Do not mention commit hashes.
- Do not mention files unless the filename itself is relevant to users.
- Do not include explanations before or after the changelog.
- If multiple semantic version levels apply, use the highest required level.


EOF
)
{
  printf '%s\n\n' "$PROMPT"

  printf '%s\n' "## Commit History"
  printf '%s\n\n' "$COMMITS"

  printf '%s\n' "## Final Diff"
  printf '%s\n' "$DIFF"
} |
  opencode run |
  tee >(wl-copy)

echo >&2
echo "Changelog copied to clipboard." >&2
