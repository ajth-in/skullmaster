import { expect, test } from "vitest";
import { html } from "lit";
import { normalize, transform } from "./utils";

test("adds skeleton class to root", () => {
  expect(
    normalize(
      transform(
        html`<div>
          <p>Hello></p>
          <script>
            alert("Hello");
          </script>
        </div>`,
      ),
    ),
  ).toBe(
    normalize(
      html`<div
        data-depth="0"
        className="empty-set__skeleton"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <p data-depth="1">
          <span className="empty-set__text" data-text-node="true" data-depth="1"
            >......</span
          >
        </p>
      </div>`,
    ),
  );
});
