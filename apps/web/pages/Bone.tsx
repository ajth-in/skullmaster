"use client";

import { lazy, Suspense } from "react";

const registry = {
  // @ts-ignore
  SignupForm: lazy(() => import("../.empty-set/bones/SignupForm")),
  // @ts-ignore

  ProfileCard: lazy(() => import("../.empty-set/bones/ProfileCard")),
  // @ts-ignore

  ProductCard: lazy(() => import("../.empty-set/bones/ProductCard")),
  // @ts-ignore

  DashboardWidget: lazy(() => import("../.empty-set/bones/DashboardWidget")),
  // @ts-ignore

  ChatCard: lazy(() => import("../.empty-set/bones/ChatCard")),
  // @ts-ignore

  PricingCard: lazy(() => import("../.empty-set/bones/PricingCard")),
  // @ts-ignore

  AnalyticsPanel: lazy(() => import("../.empty-set/bones/AnalyticsPanel")),
  // @ts-ignore

  BlogCard: lazy(() => import("../.empty-set/bones/BlogCard")),
  // @ts-ignore

  SettingsForm: lazy(() => import("../.empty-set/bones/SettingsForm")),
};

export function Bone({ name }: { name: keyof typeof registry }) {
  const Component = registry[name];

  return (
    <Suspense fallback={<div>Loading Skeleton...</div>}>
      <Component />
    </Suspense>
  );
}
