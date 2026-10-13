import type { ComponentProps } from "preact/compat";
import { buttonStyles } from "./button.styles";

export function Button({ className, children, ...props }: ComponentProps<"button">) {
  return (
    <>
      <style>{buttonStyles}</style>
      <button {...props} className={`btn ${className ?? ""}`} type="button">
        {children}
      </button>
    </>
  );
}
