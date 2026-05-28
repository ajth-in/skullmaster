import { CausticsProvider, Skeleton } from "@o-slash/react";
export default function Page() {
  return (
    <CausticsProvider>
      <Skeleton name="Title">
        <div>
          <p>Hello world</p>
          <img src="https://via.placeholder.com/150" alt="placeholder" />
        </div>
      </Skeleton>
    </CausticsProvider>
  );
}
