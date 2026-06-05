export const DATA_NAT_H = "data-natural-h";
export const DATA_NAT_W = "data-natural-w";

export async function injectNaturalImageDimensions(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll("img"));

  await Promise.all(
    images.map(async (img) => {
      const src = img.currentSrc || img.getAttribute("src");

      if (!src) return;

      const probe = new Image();

      await new Promise<void>((resolve) => {
        probe.onload = () => {
          img.setAttribute(DATA_NAT_W, String(probe.naturalWidth));

          img.setAttribute(DATA_NAT_H, String(probe.naturalHeight));

          resolve();
        };

        probe.onerror = () => resolve();

        probe.src = src;
      });
    }),
  );
}
