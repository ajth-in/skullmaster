import { Fragment, isValidElement, useCallback, useEffect, useRef } from "react";

import { useOSlash } from "./o-slash-provider";

type SkeletonProps = {
  name: string;
  children: React.ReactNode;
};

export default function Skeleton(props: SkeletonProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { registerSkeleton } = useOSlash();

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    registerSkeleton(props.name, ref.current.innerHTML);
  }, [props.name, registerSkeleton]);

  if (!isValidElement(props.children)) {
    return <Fragment>{props.children}</Fragment>;
  }

  return (
    <div ref={refCallback} data-o-slash={props.name} style={{ display: "contents" }}>
      {props.children}
    </div>
  );
}
