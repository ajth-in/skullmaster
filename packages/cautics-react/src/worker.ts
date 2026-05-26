console.log("worker booted");

self.onmessage = (event) => {
  // event.data: { id, html }
  const { id, html } = event.data || {};
  // Simulate heavy HTML processing (replace with real parser logic)
  let processed = html;
  // Example: processed = html.toUpperCase();
  // TODO: Replace with actual HTML parsing/processing
  self.postMessage({ id, processed });
};

export {};
