import { lazy, type PropsWithChildren, type LazyExoticComponent, type ComponentType } from "react";
import { Skeleton as SMSkeleton } from "@skullmaster/react";
// eslint-disable-next-line
const registry: Record<string, LazyExoticComponent<ComponentType<any>>> = {
  Projects: lazy(() => import("./Projects")),
  Pricing: lazy(() => import("./Pricing")),
  Contact7: lazy(() => import("./Contact7")),
  Testimonial10: lazy(() => import("./Testimonial10")),
  Download2: lazy(() => import("./Download2")),
  Team1: lazy(() => import("./Team1")),
  BookADemo1: lazy(() => import("./BookADemo1")),
};

type SkeletonProps = PropsWithChildren<{
  loading: boolean;
  name: keyof typeof registry;
}>;

export default function Skeleton({ loading, name, children }: SkeletonProps) {
  if (!loading) {
    return (
      <SMSkeleton name={name}>
        {/* @ts-expect-error sample */}
        {children}
      </SMSkeleton>
    );
  }

  const Component = registry[name];

  if (!Component) {
    return <>loading...</>;
  }

  return <Component />;
}
