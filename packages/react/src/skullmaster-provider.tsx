"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import PostSkeletons from "./control-panel";
import { DEFAULT_PORT } from "./constants";

type SkullMasterValue = {
  isEnabled: boolean;
  port: number;
  setIsEnabled: Dispatch<SetStateAction<boolean>>;
};

const SkullMasterContext = createContext<SkullMasterValue | null>(null);

export function SkullMaster({
  port = DEFAULT_PORT,
  isEnabled: defautIsEnabled = true,
}: Partial<Pick<SkullMasterValue, "port" | "isEnabled">>) {
  const [isEnabled, setIsEnabled] = useState(defautIsEnabled);
  const value = useMemo(
    () => ({
      port,
      setIsEnabled,
      isEnabled,
    }),
    [isEnabled, port],
  );

  return (
    <SkullMasterContext.Provider value={value}>
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
