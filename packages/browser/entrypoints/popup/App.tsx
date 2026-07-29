import { useState, useEffect, useCallback } from "react";
import { Container, Reshaped, NumberField, FormControl, Alert, Switch } from "reshaped";
import "./App.css";

const activateStorage = storage.defineItem<boolean>("local:isActivate", {
  fallback: false,
});
const portStorage = storage.defineItem<number>("local:port", {
  fallback: 8008,
});

function useStorageItem<T>(item: WxtStorageItem<T, any>): [T, (val: T) => void] {
  const [value, setValue] = useState<T>(item.fallback);

  useEffect(() => {
    item.getValue().then(setValue).catch(console.error);
  }, [item]);

  const setPersistedValue = useCallback(
    (val: T) => {
      setValue(val);
      item.setValue(val).catch(console.error);
    },
    [item],
  );

  return [value, setPersistedValue];
}

function App() {
  const [isActivate, setIsActivate] = useStorageItem(activateStorage);
  const [port, setPort] = useStorageItem(portStorage);
  const [healthStatus, setHealthStatus] = useState<{
    type: "loading" | "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setHealthStatus({ type: "loading", message: "Checking..." });

    fetch(`http://localhost:${port}/health`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setHealthStatus({
          type: "success",
          message: JSON.stringify(data, null, 2),
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setHealthStatus({
          type: "error",
          message: `Failed to connect. Make sure to run:\n\nskullmaster serve -p ${port}\n\n${err.message}`,
        });
      });

    return () => controller.abort();
  }, [port]);

  return (
    <Reshaped colorMode="dark" theme="slate">
      <Container width="300px" className="popup">
        <Switch
          size={"large"}
          name="switch"
          checked={isActivate}
          onChange={({ checked }) => setIsActivate(checked)}
        >
          Activate skullmaster client
        </Switch>

        <FormControl>
          <FormControl.Label>Listening port</FormControl.Label>
          <NumberField
            name="port"
            value={port}
            onChange={({ value }) => setPort(value)}
            increaseAriaLabel="Increase value"
            decreaseAriaLabel="Decrease value"
          />
          <FormControl.Helper>Run skullmaster serve locally in port 8008</FormControl.Helper>
        </FormControl>

        {healthStatus && (
          <Alert
            color={
              healthStatus.type === "success"
                ? "positive"
                : healthStatus.type === "error"
                  ? "critical"
                  : "neutral"
            }
          >
            {healthStatus.type === "loading" ? (
              "Checking health endpoint..."
            ) : healthStatus.type === "success" ? (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  margin: 0,
                  fontFamily: "monospace",
                }}
              >
                {healthStatus.message}
              </pre>
            ) : (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  margin: 0,
                  fontFamily: "monospace",
                }}
              >
                {healthStatus.message}
              </pre>
            )}
          </Alert>
        )}
      </Container>
    </Reshaped>
  );
}

export default App;
