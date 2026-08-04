import { describe, expect, it } from "vitest";
import { JSDOM } from "jsdom";
import { setComputedBd } from "./get-computed-bd";

const mount = (style: string) => {
  const dom = new JSDOM(`<div id="root" style="${style}"></div>`);
  return dom.window.document.getElementById("root")!;
};

describe("setComputedBd", () => {
  it("flags no corner when every corner radius is non-zero", () => {
    const root = mount(
      "border-top-left-radius: 8px; border-top-right-radius: 8px; " +
        "border-bottom-right-radius: 8px; border-bottom-left-radius: 8px;",
    );

    setComputedBd(root);

    expect(root.getAttribute("data-skull-btlr")).toBeNull();
    expect(root.getAttribute("data-skull-btrr")).toBeNull();
    expect(root.getAttribute("data-skull-bbrr")).toBeNull();
    expect(root.getAttribute("data-skull-bblr")).toBeNull();
  });

  it("flags every corner when the whole shape is square", () => {
    const root = mount("border-radius: 0");

    setComputedBd(root);

    expect(root.getAttribute("data-skull-btlr")).toBe("0");
    expect(root.getAttribute("data-skull-btrr")).toBe("0");
    expect(root.getAttribute("data-skull-bbrr")).toBe("0");
    expect(root.getAttribute("data-skull-bblr")).toBe("0");
  });

  it("flags only the square corners of a partially rounded shape", () => {
    const root = mount(
      "border-top-left-radius: 8px; border-top-right-radius: 0; " +
        "border-bottom-right-radius: 8px; border-bottom-left-radius: 0;",
    );

    setComputedBd(root);

    expect(root.getAttribute("data-skull-btlr")).toBeNull();
    expect(root.getAttribute("data-skull-btrr")).toBe("0");
    expect(root.getAttribute("data-skull-bbrr")).toBeNull();
    expect(root.getAttribute("data-skull-bblr")).toBe("0");
  });

  it("flags every corner of a square shape that has no explicit radius", () => {
    const root = mount("");

    setComputedBd(root);

    expect(root.getAttribute("data-skull-btlr")).toBe("0");
    expect(root.getAttribute("data-skull-btrr")).toBe("0");
    expect(root.getAttribute("data-skull-bbrr")).toBe("0");
    expect(root.getAttribute("data-skull-bblr")).toBe("0");
  });
});
