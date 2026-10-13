import type { Preferences } from "../collect-preferences";

export const getExtension = (project: Preferences["project"]): "tsx" | "jsx" => {
  switch (project) {
    case "react-ts":
    case "preact-ts":
      return "tsx";
    case "react-js":
    case "preact-js":
      return "jsx";
  }
};
