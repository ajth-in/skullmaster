import { createContext, useContext, type PropsWithChildren } from "react";
import FloatingWindow from "./control-panel";

export type CausticsConfig = {
  name: string;
};

const CausticsContext = createContext<CausticsConfig | null>(null);

type CausticsProviderProps = PropsWithChildren<{
  config: CausticsConfig;
}>;

export function CausticsProvider({ config, children }: CausticsProviderProps) {
  return (
    <CausticsContext.Provider value={config}>
      {children}
      <FloatingWindow />
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
