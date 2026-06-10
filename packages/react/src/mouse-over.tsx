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
    const label = document.createElement("div");

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

    Object.assign(label.style, {
      padding: "8px 12px",
      borderRadius: "8px",
      background: "rgba(0,0,0,0.85)",
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
      fontFamily: "system-ui, sans-serif",
      textAlign: "center",
      maxWidth: "80%",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      pointerEvents: "none",
    });

    overlay.appendChild(label);
    document.body.appendChild(overlay);

    const getComponentName = (element: HTMLElement) =>
      element.dataset["skullmaster"] ?? "Unknown Component";

    const updateLabel = (componentName: string, state: SkeletonState, error?: string | null) => {
      switch (state) {
        case "idle":
          label.textContent = componentName;
          break;

        case "loading":
          label.textContent = "Defleshing...";
          break;

        case "success":
          label.textContent = `${componentName} saved! Check your project directory.`;
          break;

        case "error":
          label.textContent = `${error ?? "Generation failed"}`;
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

      const skeleton = target.closest<HTMLElement>("[data-skullmaster]");

      if (!skeleton) return;

      event.preventDefault();
      event.stopPropagation();

      currentSkeleton = skeleton;

      const componentName = getComponentName(skeleton);
      markTransparentContainers(skeleton);
      await injectNaturalImageDimensions(skeleton);
      const html = skeleton.outerHTML;

      updateOverlay(skeleton);
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
