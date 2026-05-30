
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
    "Pricing": lazy(() => import("./Pricing"))
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
