import { DEFAULT_PORT } from "@skullmaster/shared";

export type GenerateSkeletonResponse = {
  success: true;
};

export async function postSkeleton(
  componentName: string,
  html: string,
): Promise<GenerateSkeletonResponse> {
  const payload = {
    [componentName]: {
      component: componentName,
      html,
    },
  };

  try {
    const response = await fetch(`http://localhost:${DEFAULT_PORT}/skeletons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let message = `Request failed with status ${response.status}`;

      try {
        const error = await response.json();
        message = error?.message ?? error?.error ?? error?.detail ?? message;
      } catch {}

      throw new Error(message);
    }

    return {
      success: true,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate skeleton from supplied markup";

    throw new Error(message);
  }
}
