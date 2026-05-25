import { CausticsProvider } from "@caustics/react";
export default function Page() {
  return (
    <CausticsProvider config={{ name: "My App" }}>
      <p>Hello world</p>
    </CausticsProvider>
  );
}
