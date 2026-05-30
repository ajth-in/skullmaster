import {
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useOSlash } from "./o-slash-provider";

type SkeletonProps = {
  name: string;
  children: React.ReactNode;
};

const CONTAINER_TAGS = new Set([
  "div",
  "section",
  "article",
  "aside",
  "main",
  "nav",
  "header",
  "footer",
  "form",
  "fieldset",
]);

function hasVisibleBackgroundOrBorder(element: HTMLElement): boolean {
  const style = getComputedStyle(element);

  const isVisibleColor = (color: string) =>
    color && color !== "transparent" && color !== "rgba(0, 0, 0, 0)";

  const hasBackground = isVisibleColor(style.backgroundColor);

  const sides = ["Top", "Right", "Bottom", "Left"] as const;

  const hasFullBorder = sides.every((side) => {
    const width = parseFloat(style[`border${side}Width`]);
    const borderStyle = style[`border${side}Style`];
    const color = style[`border${side}Color`];

    return (
      width > 0 &&
      borderStyle !== "none" &&
      borderStyle !== "hidden" &&
      isVisibleColor(color)
    );
  });

  return hasBackground || hasFullBorder;
}

function markTransparentContainers(root: HTMLElement): void {
  const containers = root.querySelectorAll<HTMLElement>(
    Array.from(CONTAINER_TAGS).join(","),
  );
  for (const el of containers) {
    if (!hasVisibleBackgroundOrBorder(el)) {
      el.setAttribute("data-depth", "-1");
    }
  }
}

export default function Skeleton(props: SkeletonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { registerSkeleton } = useOSlash();

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    markTransparentContainers(ref.current);
    registerSkeleton(props.name, ref.current.innerHTML);
  }, [props.name, registerSkeleton]);

  if (!isValidElement(props.children)) {
    return <Fragment>{props.children}</Fragment>;
  }

  return (
    <div
      ref={refCallback}
      data-o-slash={props.name}
      style={{ display: "contents" }}
    >
      {props.children}
    </div>
  );
}
