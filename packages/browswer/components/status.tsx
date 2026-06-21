import { Badge } from "reshaped";
import { useEffect, useState } from "react";

export default function ServerStatus() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    async function checkServer() {
      try {
        const response = await fetch("http://localhost:4000");
        const data = await response.json();

        setConnected(data.ok === true);
      } catch (error) {
        setConnected(false);
      }
    }

    checkServer();
  }, []);

  return (
    <Badge size="large" color={connected ? "positive" : "critical"}>
      {connected ? "Connected" : "Disconnected"}
    </Badge>
  );
}
