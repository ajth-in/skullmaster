import { useEffect } from "react";
import { activateMouseOver } from "@skullmaster/exacarnate-client";
import { useSkullMaster } from "./skullmaster-provider";

export default function HoverHighlighter() {
  const { port } = useSkullMaster();
  useEffect(() => activateMouseOver(port), [port]);
  return null;
}
