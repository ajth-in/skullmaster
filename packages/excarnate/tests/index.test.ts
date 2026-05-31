import { expect, test } from "vitest";
import { html } from "lit";
import { normalize, transform } from "./utils";

test("adds skeleton class to root", () => {
  console.log(
    transform(
      normalize(
        html`<div>
          <p>Hello></p>
        </div>`,
      ),
    ),
  );
  expect(
    normalize(
      transform(
        html`<div>
          <p>Hello></p>
        </div>`,
      ),
    ),
  ).toBe(
    normalize(
      html`<div
        className="empty-set__skeleton"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <p><span className="empty-set__text" data-depth="1">......</span></p>
      </div>`,
    ),
  );
});
