import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";
import FloatingGenerateButton from "./control-panel";

export type SkeletonPayload = Record<string, string>;

type CausticsContextValue = {
  registerSkeleton: (name: string, html: string) => void;
  getSkeletons: () => SkeletonPayload;
};

const CausticsContext = createContext<CausticsContextValue | null>(null);

const processHTML = (html: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const element = doc.body.firstElementChild;
  if (!element) return html;

  const process = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent) {
        node.textContent = "*".repeat(node.textContent.length);
      }
      return;
    }

    if (!(node instanceof Element)) return;

    // Remove all event handlers (on* attributes)
    Array.from(node.attributes).forEach((attr) => {
      if (attr.name.startsWith("on")) {
        node.removeAttribute(attr.name);
      }
    });

    // Convert img tags to divs, removing src, alt, and event handlers
    if (node.tagName.toLowerCase() === "img") {
      const div = doc.createElement("div");
      Array.from(node.attributes).forEach((attr) => {
        if (
          attr.name !== "src" &&
          attr.name !== "alt" &&
          !attr.name.startsWith("on")
        ) {
          div.setAttribute(attr.name, attr.value);
        }
      });
      node.replaceWith(div);
      return;
    }

    Array.from(node.childNodes).forEach(process);
  };

  process(element);
  return element.outerHTML;
};

export function CausticsProvider({ children }: PropsWithChildren) {
  const skeletonsRef = useRef<SkeletonPayload>({});

  const registerSkeleton = useCallback((name: string, html: string) => {
    skeletonsRef.current[name] = processHTML(html);
  }, []);

  const getSkeletons = useCallback(() => {
    return skeletonsRef.current;
  }, []);

  const value = useMemo(
    () => ({
      registerSkeleton,
      getSkeletons,
    }),
    [registerSkeleton, getSkeletons],
  );

  return (
    <CausticsContext.Provider value={value}>
      {children}
      <FloatingGenerateButton />
    </CausticsContext.Provider>
  );
}

export function useCaustics() {
  const context = useContext(CausticsContext);
  if (!context) {
    throw new Error("useCaustics must be used within CausticsProvider");
  }
  return context;
}
