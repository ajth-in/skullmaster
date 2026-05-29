"use client";
import { log } from "@o-slash/shared";
import { useQuery } from "@tanstack/react-query";
import { useOSlash } from "./o-slash-provider";

export type PostSkeletonsProps = {
  isEnabled: boolean;
  port?: number;
};
export default function PostSkeletons({ isEnabled, port }: PostSkeletonsProps) {
  const { getSkeletons } = useOSlash();

  useQuery({
    queryKey: ["polling-data"],
    enabled: isEnabled,
    queryFn: async () => {
      const response = await fetch(`http://localhost:${port}/skeletons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getSkeletons()),
      });

      if (!response.ok) {
        log.error("Request failed");
        throw new Error("Request failed");
      }

      return response.json();
    },
    retry: 3,
    refetchInterval: 10500,
  });

  return null;
}
