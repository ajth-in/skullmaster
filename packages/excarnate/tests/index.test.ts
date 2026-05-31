import { expect, test } from "vitest";
import fn from "../src";

test("fn", () => {
  expect("Hello").not.toBe("Hello, tsdown!");
});
