"use ";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createPortal } from "react-dom";
import useShadowRoot from "./hooks/use-shadow-root";
import { useOSlash } from "./o-slash-provider";

export default function FloatingGenerateButton() {
  const { getSkeletons } = useOSlash();

  const [enabled, setEnabled] = useState(false);
  const [healthOk] = useState<boolean | null>(true);

  const shadowRoot = useShadowRoot();

  useQuery({
    queryKey: ["polling-data"],
    enabled: enabled && healthOk === true,
    queryFn: async () => {
      const response = await fetch("http://localhost:4000/skeletons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getSkeletons()),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      return response.json();
    },
    refetchInterval: 10500,
  });

  const handleClick = () => {
    console.log(getSkeletons());
  };

  if (!shadowRoot) return null;

  return createPortal(
    <>
      <style>
        {`
          .floating-generate-btn-wrapper {
            position: fixed;
            right: 20px;
            bottom: 20px;
            z-index: 2147483647;
            display: flex;
            flex-direction: column;
            gap: 12px;
            font-family: Inter, sans-serif;
          }

          .floating-generate-btn {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 999px;
            padding: 12px 18px;
            background: #0f172a;
            color: white;
            font-size: 14px;
            font-weight: 500;
            box-shadow:
              0 10px 25px rgba(0,0,0,0.25),
              0 4px 10px rgba(0,0,0,0.15);
            transition:
              transform 0.2s ease,
              opacity 0.2s ease;
          }

          .floating-generate-btn:hover {
            transform: translateY(-1px);
          }

          .floating-generate-btn__dot {
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: ${healthOk ? "#22c55e" : "#ef4444"};
            box-shadow: 0 0 10px ${healthOk ? "rgba(34,197,94,0.8)" : "rgba(239,68,68,0.8)"};
          }

          .floating-toggle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            background: #1e293b;
            color: white;
            border-radius: 16px;
            padding: 10px 14px;
            box-shadow:
              0 10px 25px rgba(0,0,0,0.25),
              0 4px 10px rgba(0,0,0,0.15);
          }

          .floating-toggle-label {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .floating-toggle-title {
            font-size: 13px;
            font-weight: 600;
          }

          .floating-toggle-status {
            font-size: 11px;
            opacity: 0.7;
          }

          .floating-switch {
            position: relative;
            width: 42px;
            height: 24px;
            border-radius: 999px;
            border: none;
            cursor: pointer;
            background: ${enabled ? "#06b6d4" : "#475569"};
            transition: background 0.2s ease;
          }

          .floating-switch::after {
            content: "";
            position: absolute;
            top: 3px;
            left: ${enabled ? "21px" : "3px"};
            width: 18px;
            height: 18px;
            border-radius: 999px;
            background: white;
            transition: left 0.2s ease;
          }

          .floating-health-error {
            background: #7f1d1d;
            color: #fecaca;
            border-radius: 12px;
            padding: 10px 12px;
            font-size: 12px;
            line-height: 1.4;
            box-shadow:
              0 10px 25px rgba(0,0,0,0.25),
              0 4px 10px rgba(0,0,0,0.15);
          }
        `}
      </style>

      <div className="floating-generate-btn-wrapper">
        <div className="floating-toggle">
          <div className="floating-toggle-label">
            <span className="floating-toggle-title">Skeleton polling</span>

            <span className="floating-toggle-status">
              {healthOk ? (enabled ? "Polling enabled" : "Polling disabled") : "Server offline"}
            </span>
          </div>

          <button
            className="floating-switch"
            onClick={() => setEnabled((prev) => !prev)}
            disabled={!healthOk}
          />
        </div>

        {!healthOk && (
          <div className="floating-health-error">
            Cannot connect to http://localhost:4000/health
          </div>
        )}

        <button className="floating-generate-btn" onClick={handleClick}>
          Generate skeletons
          <span className="floating-generate-btn__dot" />
        </button>
      </div>
    </>,
    shadowRoot,
  );
}
