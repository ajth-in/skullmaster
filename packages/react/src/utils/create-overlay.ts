export interface OverlayElements {
  overlay: HTMLDivElement;
  downloadBtn: HTMLDivElement;
  btnText: HTMLSpanElement;
}

export function createOverlay(): OverlayElements {
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

  return { overlay, downloadBtn, btnText };
}
