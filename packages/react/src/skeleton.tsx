import {
  Fragment,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactElement,
} from "react";

import { useOSlash } from "./o-slash-provider";

type SkeletonProps = {
  name: string;
  children: ReactElement<HTMLAttributes<HTMLElement>>;
};

export default function Skeleton(props: SkeletonProps) {
  const ref = useRef<HTMLElement | null>(null);

  const { registerSkeleton } = useOSlash();

  const refCallback = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    registerSkeleton(props.name, ref.current.outerHTML);
  }, [props.name, registerSkeleton]);

  if (!isValidElement(props.children)) {
    return <Fragment>{props.children}</Fragment>;
  }

  if (typeof props.children.type !== "string") {
    console.warn(
      `[Skeleton] "${props.name}" received a non-DOM child. ` +
        `Wrap an intrinsic element instead.`,
    );

    return props.children;
  }

  return cloneElement(props.children, {
    //@ts-ignore
    ref: refCallback,
  });
}
