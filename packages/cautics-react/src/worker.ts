console.log("worker booted");

self.onmessage = (event) => {
  console.log("worker received", event.data);

  self.postMessage({
    ok: true,
    received: event.data,
  });
};

export {};
