import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { Button } from "../src/ui/button";

test("button", async () => {
  const screen = await render(<Button className="primary">Click me</Button>);
  const buttonElement = screen.getByRole("button");

  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent("Click me");
  expect(buttonElement).toHaveClass("btn");
  expect(buttonElement).toHaveClass("primary");
});
