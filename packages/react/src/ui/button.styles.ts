import { css } from "lit";

export const buttonStyles = css`
  .btn {
    border: 2px solid black;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 1rem;
    padding: 0.5rem;
    background: #18181b;
    opacity: 0.5;
    color: #fafafa;
    border-radius: 999px;
    font: inherit;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.01em;
    cursor: pointer;
    user-select: none;
    transition:
      background 120ms ease,
      transform 100ms ease,
      box-shadow 120ms ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }
  .btn:hover:not(:disabled) {
    background: #27272a;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  }
  .btn:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: none;
  }
  .btn:focus-visible {
    outline: 2px solid blue;
    outline-offset: 2px;
  }
  .btn[data-selected="true"] {
    background: black;
    opacity: 1;
    border: 2px solid yellow;
  }
  .btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`.cssText;
