import { useRef, useState, useLayoutEffect, type PropsWithChildren } from "preact/compat";
import { createPortal } from "preact/compat";

export default function ShadowRoot({ children }: PropsWithChildren) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useLayoutEffect(() => {
    if (hostRef.current && !hostRef.current.shadowRoot) {
      setShadowRoot(hostRef.current.attachShadow({ mode: "open" }));
    }
  }, []);

  return <div ref={hostRef}>{shadowRoot && createPortal(children, shadowRoot)}</div>;
}
