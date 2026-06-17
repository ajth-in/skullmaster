import { useEffect, useState } from "react";
import { DEFAULT_PORT } from "@skullmaster/shared";

const BASE_URL = `http://localhost:${DEFAULT_PORT}`;

export default function useFetch() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkHealth() {
      try {
        const res = await fetch(`${BASE_URL}/health`);
        const data = await res.json();
        if (!cancelled && data?.ok === true) {
          setIsReady(true);
        }
      } catch {
        if (!cancelled) {
          setIsReady(false);
        }
      }
    }

    checkHealth();

    return () => {
      cancelled = true;
    };
  }, []);

  return { isReady };
}
