const isZeroRadius = (value: string) =>
  value.split(/\s+/).every((part) => Number.parseFloat(part) === 0);

const CORNER_ATTRIBUTES: ReadonlyArray<
  readonly [
    (
      | "borderTopLeftRadius"
      | "borderTopRightRadius"
      | "borderBottomRightRadius"
      | "borderBottomLeftRadius"
    ),
    string,
  ]
> = [
  ["borderTopLeftRadius", "data-skull-btlr"],
  ["borderTopRightRadius", "data-skull-btrr"],
  ["borderBottomRightRadius", "data-skull-bbrr"],
  ["borderBottomLeftRadius", "data-skull-bblr"],
] as const;

export const applyComputedBd = (element: HTMLElement) => {
  const style = getComputedStyle(element);

  for (const [prop, attribute] of CORNER_ATTRIBUTES) {
    if (isZeroRadius(style[prop])) {
      element.setAttribute(attribute, "0");
    }
  }
};
