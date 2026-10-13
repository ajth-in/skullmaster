import { SourceFile } from "ts-morph";
import type { Preferences } from "./collect-preferences";

export function ensureLazyImport(sourceFile: SourceFile, project: Preferences["project"]) {
  let moduleSpecifier: string;
  switch (project) {
    case "preact-ts":
    case "preact-js":
      moduleSpecifier = "preact/compat";
      break;
    case "react-ts":
    case "react-js":
      moduleSpecifier = "react";
      break;
  }

  const runtimeImport = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === moduleSpecifier,
  );

  if (!runtimeImport) {
    sourceFile.addImportDeclaration({
      moduleSpecifier,
      namedImports: ["lazy"],
    });

    return;
  }

  const hasLazy = runtimeImport.getNamedImports().some((i) => i.getName() === "lazy");

  if (!hasLazy) {
    runtimeImport.addNamedImport("lazy");
  }
}
