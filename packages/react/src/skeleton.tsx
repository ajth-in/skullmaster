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

function hasVisibleBackground(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  const bg = style.backgroundColor;
  const hasColor =
    bg !== "" && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)";
  return hasColor;
}

function markTransparentContainers(root: HTMLElement): void {
  const containers = root.querySelectorAll<HTMLElement>(
    Array.from(CONTAINER_TAGS).join(","),
  );
  for (const el of containers) {
    if (!hasVisibleBackground(el)) {
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
