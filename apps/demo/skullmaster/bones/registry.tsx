
import {
    lazy,
    type PropsWithChildren,
    type LazyExoticComponent,
    type ComponentType,
} from "react";
import { Skeleton as SMSkeleton } from "@skullmaster/react";

const registry: Record<
    string,
    LazyExoticComponent<ComponentType<any>>
> = {

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
            <SMSkeleton name={name}>
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
