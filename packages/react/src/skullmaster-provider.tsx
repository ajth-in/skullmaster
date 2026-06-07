"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { DEFAULT_PORT } from "@skullmaster/shared";
import PostSkeletons, { type PostSkeletonsProps } from "./control-panel";

type SkullMasterValue = {
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
};

const SkullMasterContext = createContext<SkullMasterValue | null>(null);

const STORAGE_KEY = "skullmaster-enabled";

export function SkullMaster({
  children,
  port,
}: PropsWithChildren<PostSkeletonsProps>) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== null) {
      setIsEnabled(stored === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isEnabled));
  }, [isEnabled]);

  const value = useMemo(
    () => ({
      isEnabled,
      setIsEnabled,
    }),
    [isEnabled],
  );

  return (
    <SkullMasterContext.Provider value={value}>
      {children}
      <PostSkeletons />
    </SkullMasterContext.Provider>
  );
}

export function useSkullMaster() {
  const context = useContext(SkullMasterContext);

  if (!context) {
    throw new Error("useSkullMaster must be used within SkullMaster");
  }

  return context;
}
