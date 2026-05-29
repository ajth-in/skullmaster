import { useEffect, useState } from "react";

export default function useShadowRoot() {
  const [shadow, setShadow] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    const host = document.createElement("div");
    host.id = "o-slash-shadow-root";
    document.body.appendChild(host);

    const shadowRoot = host.attachShadow({ mode: "open" });
    setShadow(shadowRoot);

    return () => {
      host.remove();
    };
  }, []);

  return shadow;
}

