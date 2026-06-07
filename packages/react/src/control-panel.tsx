"use client";

import { useEffect, useRef, useState } from "react";
import SkullIcon from "./icons/skull";
import { Button } from "./ui/button";
import ShadowRoot from "./shadow-root";
import { css } from "lit";
import { useSkullMaster } from "./skullmaster-provider";
import HoverHighlighter from "./mouse-over";

const BUTTON_SIZE = 48;
const MARGIN = 16;

export default function PostSkeletons() {
  const { isEnabled, setIsEnabled } = useSkullMaster();

  const [position, setPosition] = useState({
    x: MARGIN,
    y: MARGIN,
  });

  const dragging = useRef(false);
  const moved = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: window.innerWidth - BUTTON_SIZE - MARGIN,
      y: window.innerHeight - BUTTON_SIZE - MARGIN,
    });
  }, []);

  const snapToNearestCorner = (x: number, y: number) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const corners = [
      { x: MARGIN, y: MARGIN },
      { x: width - BUTTON_SIZE - MARGIN, y: MARGIN },
      { x: MARGIN, y: height - BUTTON_SIZE - MARGIN },
      {
        x: width - BUTTON_SIZE - MARGIN,
        y: height - BUTTON_SIZE - MARGIN,
      },
    ];

    const nearest = corners.reduce((best, corner) => {
      const bestDistance = Math.hypot(best.x - x, best.y - y);
      const cornerDistance = Math.hypot(corner.x - x, corner.y - y);

      return cornerDistance < bestDistance ? corner : best;
    });

    setPosition(nearest);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragging.current = true;
    moved.current = false;

    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;

    moved.current = true;

    setPosition({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  const onPointerUp = () => {
    if (!dragging.current) return;

    dragging.current = false;

    snapToNearestCorner(position.x, position.y);
  };

  const onClick = () => {
    if (!moved.current) {
      setIsEnabled(!isEnabled);
    }
  };

  return (
    <ShadowRoot>
      <style>
        {
          css`
            .control-panel-button {
              position: fixed;
              z-index: 2147483647;
              transition: all 200ms ease;
              touch-action: none;
            }
          `.cssText
        }
      </style>

      <Button
        aria-label={isEnabled ? "Disable SkullMaster" : "Enable SkullMaster"}
        data-selected={isEnabled}
        className="control-panel-button"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={onClick}
      >
        <SkullIcon furious={isEnabled} size={27} />
      </Button>

      {isEnabled && <HoverHighlighter />}
    </ShadowRoot>
  );
}
