import useFetch from "~hooks/use-fetch";
import WaitingForServer from "~components/WaitingForServer";

function IndexPopup() {
  const { isReady } = useFetch();
  if (!isReady) return <WaitingForServer />;
  return "hello";
}

export default IndexPopup;
