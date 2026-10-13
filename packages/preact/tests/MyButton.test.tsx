import { expect, test } from "vitest";
import { render } from "preact";
import { Button } from "../src/ui/button";

test("button", async () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  render(<Button className="primary">Click me</Button>, container);
  const buttonElement = container.querySelector("button");

  expect(buttonElement?.textContent).toBe("Click me");
  expect(buttonElement?.classList.contains("btn")).toBe(true);
  expect(buttonElement?.classList.contains("primary")).toBe(true);
});
