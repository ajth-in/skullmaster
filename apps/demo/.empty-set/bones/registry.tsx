
import {
    lazy,
    type PropsWithChildren,
    type LazyExoticComponent,
    type ComponentType,
} from "react";
import { Skeleton as OSlashSkeleton } from "@o-slash/react";

const registry: Record<
    string,
    LazyExoticComponent<ComponentType<any>>
> = {
    "Pricing": lazy(() => import("./Pricing")),
    "Projects": lazy(() => import("./Projects")),
    "Contact7": lazy(() => import("./Contact7")),
    "Testimonial10": lazy(() => import("./Testimonial10")),
    "Download2": lazy(() => import("./Download2")),
    "Team1": lazy(() => import("./Team1"))
};


type SkeletonProps = PropsWithChildren<{
    loading: boolean;
    name: keyof typeof registry;
}>;


export default function Skeleton({
    loading,
    name,
    children,
}: SkeletonProps) {
    if (!loading) {
        return (
            <OSlashSkeleton name={name}>
                {children}
            </OSlashSkeleton>
        );
    }

    const Component = registry[name];

    if (!Component) {
        return <>loading...</>;
    }

    return <Component />;
}
