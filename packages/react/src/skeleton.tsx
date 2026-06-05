import { Fragment, isValidElement, useCallback, useEffect, useRef } from "react";
import { useSkullMaster } from "./skullmaster-provider";
import { injectNaturalImageDimensions } from "./utils/add-data-attrs-img";
import { markTransparentContainers } from "./utils/make-transparent-containers";

type SkeletonProps = {
  name: string;
  children: React.ReactNode;
  waitFor?: number;
};

export default function Skeleton({ name, children, waitFor = 4000 }: SkeletonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { registerSkeleton } = useSkullMaster();

  const refCallback = useCallback((node: HTMLDivElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(async () => {
      if (!ref.current) return;

      markTransparentContainers(ref.current);
      await injectNaturalImageDimensions(ref.current);
      registerSkeleton(name, ref.current.innerHTML);
    }, waitFor);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [name, registerSkeleton, waitFor]);

  if (!isValidElement(children)) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <div ref={refCallback} data-skullmaster={name} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
