import { activateMouseOver } from "@skullmaster/exacarnate-client";

export default defineContentScript({
  matches: ["*://*/*"],
  main() {
    let cleanup: (() => void) | null = null;
    let currentPort = 8008;

    storage.getItem<number>("local:port").then((val) => {
      currentPort = val ?? 8008;
    });

    storage.watch<number>("local:port", (newPort) => {
      currentPort = newPort ?? 8008;
    });

    storage.getItem<boolean>("local:isActivate").then((val) => {
      if (val) start();
    });

    storage.watch<boolean>("local:isActivate", (isActivate) => {
      if (isActivate) start();
      else stop();
    });

    function start() {
      if (cleanup) return;
      cleanup = activateMouseOver(currentPort);
    }

    function stop() {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
    }
  },
});
