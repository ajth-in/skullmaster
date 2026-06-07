import { useEffect, useRef, type ReactElement } from "react";
import { useSkullMaster } from "./skullmaster-provider";

type SkeletonProps = {
  name: string;
  children: ReactElement;
};

export default function Skeleton({ name, children }: SkeletonProps) {
  const { isEnabled } = useSkullMaster();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEnabled || !wrapperRef.current) return;

    const firstElement = wrapperRef.current.firstElementChild;

    if (firstElement instanceof HTMLElement) {
      firstElement.setAttribute("data-skullmaster", name);
    }
    return () => {
      firstElement?.removeAttribute("data-skullmaster");
    };
  }, [isEnabled, name]);

  if (!isEnabled) return children;

  return (
    <div ref={wrapperRef} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
