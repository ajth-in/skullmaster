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

export function CausticsProvider({ children }: PropsWithChildren) {
  const skeletonsRef = useRef<SkeletonPayload>({});

  const registerSkeleton = useCallback((name: string, html: string) => {
    skeletonsRef.current[name] = html;
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
