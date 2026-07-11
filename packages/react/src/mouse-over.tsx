import { useEffect } from "react";
import { postSkeleton } from "./utils/post-skeleton";
import { createOverlay } from "./utils/create-overlay";
import { markTransparentContainers } from "./utils/make-transparent-containers";
import { injectNaturalImageDimensions } from "./utils/add-data-attrs-img";
import { useSkullMaster } from "./skullmaster-provider";

type SkeletonState = "idle" | "loading" | "success" | "error";

const STATE_STYLES: Record<SkeletonState, { background: string; border: string }> = {
  idle: {
    background: "rgba(0, 100, 255, 0.20)",
    border: "2px solid rgba(0, 100, 255, 0.8)",
  },
  loading: {
    background: "rgba(0, 100, 255, 0.50)",
    border: "2px solid rgba(0, 100, 255, 1)",
  },
  success: {
    background: "rgba(0, 200, 0, 0.35)",
    border: "2px solid rgba(0, 200, 0, 1)",
  },
  error: {
    background: "rgba(255, 0, 0, 0.35)",
    border: "2px solid rgba(255, 0, 0, 1)",
  },
};

export default function HoverHighlighter() {
  const { port } = useSkullMaster();
  useEffect(() => {
    let currentSkeleton: HTMLElement | null = null;
    let currentState: SkeletonState = "idle";
    let currentError: string | null = null;

    const { overlay, downloadBtn, btnText } = createOverlay();

    const getComponentName = (element: HTMLElement) =>
      element.dataset["skullmaster"] ?? "Unknown Component";

    const updateLabel = (componentName: string, state: SkeletonState, error?: string | null) => {
      switch (state) {
        case "idle":
          btnText.textContent = `Skeleton: ${componentName}`;
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

      const styles = STATE_STYLES[state];
      overlay.style.background = styles.background;
      overlay.style.border = styles.border;

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
        await postSkeleton(componentName, html, port);

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
  }, [port]);

  return null;
}
