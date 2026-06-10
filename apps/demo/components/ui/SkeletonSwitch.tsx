"use client";

import { PropsWithChildren, useState } from "react";
import { Switch } from "./switch";
import { Label } from "./label";
import Skeleton from "../../skullmaster/bones/registry";
export default function SkeletonSwitch({ children, name }: PropsWithChildren<{ name: string }>) {
  const [skeletonMode, setSkeletonMode] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-neutral-700 bg-neutral-800/50 p-4">
        <div>
          <Label htmlFor="skeleton-mode" className="text-sm font-medium text-neutral-50">
            Skeleton Mode
          </Label>
          <p className="mt-1 text-xs text-neutral-400">
            Preview the generated skeleton version of this component.
          </p>
        </div>

        <Switch id="skeleton-mode" checked={skeletonMode} onCheckedChange={setSkeletonMode} />
      </div>

      <div className={`rounded-xl border p-6 transition-all duration-300`}>
        <Skeleton loading={skeletonMode} name={name}>
          {children}
        </Skeleton>
      </div>
    </div>
  );
}
