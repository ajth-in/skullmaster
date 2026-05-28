import {
  Fragment,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useCallback,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import { useOSlash } from "./o-slash-provider";

type RefableElement = ReactElement<HTMLAttributes<HTMLElement>>;

export default function Skeleton(props: {
  name: string;
  children: RefableElement;
}) {
  const ref = useRef<HTMLElement | null>(null);

  const refCallback = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);
  const { registerSkeleton } = useOSlash();

  useEffect(() => {
    if (!ref.current) return;

    registerSkeleton(props.name, ref.current.outerHTML);
  }, [props.name, registerSkeleton]);

  if (!isValidElement(props.children)) {
    return <Fragment>{props.children}</Fragment>;
  }

  return cloneElement(props.children, {
    ref: refCallback,
  } as any);
}
