import { DEFAULT_PORT } from "@skullmaster/shared";

export default function WaitingForServer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        padding: 20,
        textAlign: "center",
      }}
    >
      <h2>Waiting for server...</h2>
      <p>
        Please run <code>skullmaster serve</code> on port {DEFAULT_PORT} to continue.
      </p>
      <p>
        <a href="https://skullmaster.ajth.in" target="_blank" rel="noreferrer">
          skullmaster.ajth.in
        </a>
      </p>
    </div>
  );
}
