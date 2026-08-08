import { describe, expect, it } from "vitest";
import { JSDOM } from "jsdom";
import {
  applyVisualSignificance,
  computeVisualSignificance,
  DATA_VISUAL_SIGNIFICANCE,
} from "./get-visual-significance";

const mount = (style: string, parentStyle: string, inner = "") => {
  const dom = new JSDOM(
    `<div id="parent" style="${parentStyle}"><div id="target" style="${style}">${inner}</div></div>`,
  );
  return dom.window.document.getElementById("target")!;
};

describe("computeVisualSignificance", () => {
  it("returns the max background contribution for a black shape on white", () => {
    const element = mount("background-color: rgb(0, 0, 0)", "background-color: rgb(255, 255, 255)");

    expect(computeVisualSignificance(element)).toBeCloseTo(0.25);
  });

  it("returns a small background score for a low contrast color match", () => {
    const element = mount(
      "background-color: rgb(200, 200, 200)",
      "background-color: rgb(255, 255, 255)",
    );

    expect(computeVisualSignificance(element)).toBeLessThan(0.25);
  });

  it("gives zero background contribution when the element is transparent", () => {
    const element = mount("background-color: transparent", "background-color: rgb(0, 0, 0)");

    expect(computeVisualSignificance(element)).toBe(0);
  });

  it("adds full border weight when all four borders are present", () => {
    const element = mount(
      "background-color: rgb(0, 0, 0); border-top-width: 2px; " +
        "border-right-width: 2px; border-bottom-width: 2px; border-left-width: 2px; " +
        "border-style: solid",
      "background-color: rgb(255, 255, 255)",
    );

    expect(computeVisualSignificance(element)).toBeCloseTo(0.4);
  });

  it("adds a partial border weight for a single border", () => {
    const element = mount(
      "background-color: rgb(0, 0, 0); border-top-width: 2px; border-style: solid",
      "background-color: rgb(255, 255, 255)",
    );

    expect(computeVisualSignificance(element)).toBeCloseTo(0.2875);
  });

  it("adds outline weight when an outline is present", () => {
    const element = mount(
      "background-color: rgb(0, 0, 0); outline-width: 2px; outline-style: solid",
      "background-color: rgb(255, 255, 255)",
    );

    expect(computeVisualSignificance(element)).toBeCloseTo(0.35);
  });

  it("adds box shadow weight when a shadow is present", () => {
    const element = mount(
      "background-color: rgb(0, 0, 0); box-shadow: 0 0 10px rgba(0, 0, 0, 0.5)",
      "background-color: rgb(255, 255, 255)",
    );

    expect(computeVisualSignificance(element)).toBeCloseTo(0.35);
  });

  it("adds background image weight when one is present", () => {
    const element = mount(
      "background-color: rgb(0, 0, 0); background-image: url('bg.png')",
      "background-color: rgb(255, 255, 255)",
    );

    expect(computeVisualSignificance(element)).toBeCloseTo(0.45);
  });

  it("scales the score by the element opacity", () => {
    const element = mount(
      "background-color: rgb(0, 0, 0); opacity: 0.5",
      "background-color: rgb(255, 255, 255)",
    );

    expect(computeVisualSignificance(element)).toBeCloseTo(0.125);
  });

  it("returns zero when the element is fully transparent", () => {
    const element = mount(
      "background-color: rgb(0, 0, 0); opacity: 0",
      "background-color: rgb(255, 255, 255)",
    );

    expect(computeVisualSignificance(element)).toBe(0);
  });

  it("writes the normalized score as a data attribute", () => {
    const element = mount("background-color: rgb(0, 0, 0)", "background-color: rgb(255, 255, 255)");

    applyVisualSignificance(element);

    expect(element.getAttribute(DATA_VISUAL_SIGNIFICANCE)).toBe("0.25");
  });
});

describe("content significance", () => {
  it("awards content weight to an element containing text", () => {
    const element = mount(
      "background-color: rgb(0, 0, 0)",
      "background-color: rgb(255, 255, 255)",
      "Hello world",
    );

    expect(computeVisualSignificance(element)).toBeCloseTo(0.45);
  });

  it("awards content weight to an element containing an image", () => {
    const element = mount(
      "background-color: rgb(0, 0, 0)",
      "background-color: rgb(255, 255, 255)",
      '<img src="cat.png" />',
    );

    expect(computeVisualSignificance(element)).toBeCloseTo(0.45);
  });

  it("awards content weight to an element containing a meaningful tag", () => {
    const element = mount(
      "background-color: rgb(0, 0, 0)",
      "background-color: rgb(255, 255, 255)",
      "<button>Click</button>",
    );

    expect(computeVisualSignificance(element)).toBeCloseTo(0.45);
  });

  it("awards content weight to a meaningful element itself", () => {
    const dom = new JSDOM(
      '<div id="parent" style="background-color: rgb(255, 255, 255)"><h1 id="target" style="background-color: rgb(0, 0, 0)">Title</h1></div>',
    );
    const element = dom.window.document.getElementById("target")!;

    expect(computeVisualSignificance(element)).toBeCloseTo(0.45);
  });

  it("does not award content weight to an empty element", () => {
    const element = mount(
      "background-color: rgb(0, 0, 0)",
      "background-color: rgb(255, 255, 255)",
      "  \n  ",
    );

    expect(computeVisualSignificance(element)).toBeCloseTo(0.25);
  });
});

describe("data-depth", () => {
  it("sets data-depth to -1 when significance is zero", () => {
    const element = mount("background-color: transparent", "background-color: rgb(255, 255, 255)");

    applyVisualSignificance(element);

    expect(element.getAttribute("data-depth")).toBe("-1");
  });

  it("keeps an existing data-depth value", () => {
    const element = mount("background-color: transparent", "background-color: rgb(255, 255, 255)");
    element.setAttribute("data-depth", "3");

    applyVisualSignificance(element);

    expect(element.getAttribute("data-depth")).toBe("3");
  });

  it("does not set data-depth when significance is non-zero", () => {
    const element = mount("background-color: rgb(0, 0, 0)", "background-color: rgb(255, 255, 255)");

    applyVisualSignificance(element);

    expect(element.getAttribute("data-depth")).toBeNull();
  });
});
