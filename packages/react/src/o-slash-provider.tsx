"use client";
import { DEFAULT_PORT, type SkeletonPayloadInput } from "@o-slash/shared";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";
import PostSkeletons, { type PostSkeletonsProps } from "./control-panel";

type EmptyContextValue = {
  registerSkeleton: (name: string, html: string) => void;
  getSkeletons: () => SkeletonPayloadInput;
};

const EmptySetContext = createContext<EmptyContextValue | null>(null);

export function OSlashProvider({
  children,
  isEnabled,
  port,
}: PropsWithChildren<PostSkeletonsProps>) {
  const skeletonsRef = useRef<SkeletonPayloadInput>({});

  const registerSkeleton = useCallback((name: string, html: string) => {
    skeletonsRef.current[name] = { component: name, html };
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
        <PostSkeletons isEnabled={isEnabled} port={port ?? DEFAULT_PORT} />
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
