import { CausticsProvider, Skeleton } from "@caustics/react";
export default function Page() {
  return (
    <CausticsProvider config={{ name: "My App" }}>
      <Skeleton name="Title">
        <p>Hello world</p>
      </Skeleton>
    </CausticsProvider>
  );
}
