import type { HTMLProps } from "react";
import { buttonStyles } from "./button.styles";

export function Button({
  className,
  children,
  ...props
}: HTMLProps<HTMLButtonElement>) {
  return (
    <>
      <style>{buttonStyles}</style>
      <button {...props} className={`btn ${className ?? ""}`} type="button">
        {children}
      </button>
    </>
  );
}
