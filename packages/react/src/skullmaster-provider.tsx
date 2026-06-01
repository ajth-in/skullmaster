"use client";
import { DEFAULT_PORT, type SkeletonPayloadInput } from "@skullmaster/shared";
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

type SkullMasterValue = {
  registerSkeleton: (name: string, html: string) => void;
  getSkeletons: () => SkeletonPayloadInput;
};

const SkullMasterContext = createContext<SkullMasterValue | null>(null);

export function SkullMaster({
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
      <SkullMasterContext.Provider value={value}>
        {children}
        <PostSkeletons isEnabled={isEnabled} port={port ?? DEFAULT_PORT} />
      </SkullMasterContext.Provider>
    </QueryClientProvider>
  );
}

export function useSkullMaster() {
  const context = useContext(SkullMasterContext);
  if (!context) {
    throw new Error("useSkullMaster must be used within SkullMaster Provider");
  }
  return context;
}
