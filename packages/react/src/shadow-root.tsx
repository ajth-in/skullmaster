import { useRef, useState, useLayoutEffect, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export default function ShadowRoot({ children }: PropsWithChildren) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useLayoutEffect(() => {
    if (hostRef.current && !shadowRoot) {
      setShadowRoot(hostRef.current.attachShadow({ mode: "open" }));
    }
  }, [shadowRoot]);

  return <div ref={hostRef}>{shadowRoot && createPortal(children, shadowRoot)}</div>;
}
