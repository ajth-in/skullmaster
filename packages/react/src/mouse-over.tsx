import { useEffect } from "react";
import { postSkeleton } from "./utils/post-skeleton";
import { markTransparentContainers } from "./utils/make-transparent-containers";
import { injectNaturalImageDimensions } from "./utils/add-data-attrs-img";

type SkeletonState = "idle" | "loading" | "success" | "error";

export default function HoverHighlighter() {
  useEffect(() => {
    let currentSkeleton: HTMLElement | null = null;
    let currentState: SkeletonState = "idle";
    let currentError: string | null = null;

    const overlay = document.createElement("div");
    const downloadBtn = document.createElement("div");
    const btnText = document.createElement("span");

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "14");
    svg.setAttribute("height", "14");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4");
    svg.appendChild(path1);

    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", "7 10 12 15 17 10");
    svg.appendChild(polyline);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "12");
    line.setAttribute("y1", "15");
    line.setAttribute("x2", "12");
    line.setAttribute("y2", "3");
    svg.appendChild(line);

    Object.assign(overlay.style, {
      position: "fixed",
      pointerEvents: "none",
      boxSizing: "border-box",
      zIndex: "2147483647",
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 150ms ease",
    });

    Object.assign(downloadBtn.style, {
      position: "absolute",
      top: "8px",
      right: "8px",
      pointerEvents: "auto",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 10px",
      borderRadius: "6px",
      background: "rgba(0,0,0,0.85)",
      color: "white",
      fontSize: "12px",
      fontWeight: "600",
      fontFamily: "system-ui, sans-serif",
      lineHeight: "1",
    });

    downloadBtn.addEventListener("mouseenter", () => {
      downloadBtn.style.background = "rgba(50,50,50,0.9)";
    });
    downloadBtn.addEventListener("mouseleave", () => {
      downloadBtn.style.background = "rgba(0,0,0,0.85)";
    });

    downloadBtn.appendChild(btnText);
    downloadBtn.appendChild(svg);
    overlay.appendChild(downloadBtn);
    document.body.appendChild(overlay);

    const getComponentName = (element: HTMLElement) =>
      element.dataset["skullmaster"] ?? "Unknown Component";

    const updateLabel = (componentName: string, state: SkeletonState, error?: string | null) => {
      switch (state) {
        case "idle":
          btnText.textContent = `Download ${componentName}`;
          break;

        case "loading":
          btnText.textContent = "Defleshing...";
          break;

        case "success":
          btnText.textContent = `${componentName} saved! Check your project directory.`;
          break;

        case "error":
          btnText.textContent = `${error ?? "Generation failed"}`;
          break;
      }
    };

    const applyState = (state: SkeletonState, componentName?: string, error?: string | null) => {
      currentState = state;
      currentError = error ?? null;

      switch (state) {
        case "idle":
          overlay.style.background = "rgba(0, 100, 255, 0.20)";
          overlay.style.border = "2px solid rgba(0, 100, 255, 0.8)";
          break;

        case "loading":
          overlay.style.background = "rgba(0, 100, 255, 0.50)";
          overlay.style.border = "2px solid rgba(0, 100, 255, 1)";
          break;

        case "success":
          overlay.style.background = "rgba(0, 200, 0, 0.35)";
          overlay.style.border = "2px solid rgba(0, 200, 0, 1)";
          break;

        case "error":
          overlay.style.background = "rgba(255, 0, 0, 0.35)";
          overlay.style.border = "2px solid rgba(255, 0, 0, 1)";
          break;
      }

      if (componentName) {
        updateLabel(componentName, state, error);
      }
    };

    const updateOverlay = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();

      overlay.style.display = "flex";
      overlay.style.left = `${rect.left}px`;
      overlay.style.top = `${rect.top}px`;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) return;

      if (overlay.contains(target)) return;

      const skeleton = target.closest<HTMLElement>("[data-skullmaster]");

      if (!skeleton) {
        if (currentState === "loading") return;

        currentSkeleton = null;
        overlay.style.display = "none";
        return;
      }

      if (
        currentSkeleton === skeleton &&
        (currentState === "loading" || currentState === "success" || currentState === "error")
      ) {
        return;
      }

      currentSkeleton = skeleton;

      const componentName = getComponentName(skeleton);

      updateOverlay(skeleton);
      applyState("idle", componentName);
    };

    const handleClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) return;

      if (!downloadBtn.contains(target)) return;

      if (!currentSkeleton) return;

      event.preventDefault();
      event.stopPropagation();

      const componentName = getComponentName(currentSkeleton);
      markTransparentContainers(currentSkeleton);
      await injectNaturalImageDimensions(currentSkeleton);
      const html = currentSkeleton.outerHTML;

      updateOverlay(currentSkeleton);
      applyState("loading", componentName);

      try {
        await postSkeleton(componentName, html);

        applyState("success", componentName);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error occurred";

        applyState("error", componentName, message);

        console.error("Skeleton generation failed", {
          componentName,
          error,
        });
      }
    };

    const reposition = () => {
      if (!currentSkeleton) return;

      updateOverlay(currentSkeleton);

      const componentName = getComponentName(currentSkeleton);

      updateLabel(componentName, currentState, currentError);
    };

    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("click", handleClick, true);

    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("click", handleClick, true);

      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);

      overlay.remove();
    };
  }, []);

  return null;
}
