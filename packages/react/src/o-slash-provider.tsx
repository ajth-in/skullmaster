import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";
import FloatingGenerateButton from "./control-panel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export type SkeletonPayload = Record<string, string>;

type EmptyContextValue = {
  registerSkeleton: (name: string, html: string) => void;
  getSkeletons: () => SkeletonPayload;
};

const EmptySetContext = createContext<EmptyContextValue | null>(null);

export function OSlashProvider({ children }: PropsWithChildren) {
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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <EmptySetContext.Provider value={value}>
        {children}
        <FloatingGenerateButton />
      </EmptySetContext.Provider>
    </QueryClientProvider>
  );
}

export function useOSlash() {
  const context = useContext(EmptySetContext);
  if (!context) {
    throw new Error("useOSlash must be used within OSlash Provider");
  }
  return context;
}
