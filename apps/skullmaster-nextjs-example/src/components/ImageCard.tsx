"use client";

import { useLoading } from "@/components/LoadingProvider";
import Skeleton from "@/skeletons/registry";

export function ImageCard() {
  const { isLoading } = useLoading();

  if (isLoading) return <Skeleton name="ImageCard" />;

  return (
    <div
      data-skullmaster="ImageCard"
      className="overflow-hidden border-[3px] border-black bg-white"
    >
      <img
        className="h-40 w-full object-cover"
        src="https://picsum.photos/seed/skullmaster/400/300"
        alt="Random placeholder photo"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-black">Sample Image Card</h3>
        <p className="text-sm text-black/70">
          A random placeholder photo inside a card, for demo purposes.
        </p>
      </div>
    </div>
  );
}
