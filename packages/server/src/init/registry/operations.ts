import { Project, SyntaxKind } from "ts-morph";
import { ensureLazyImport } from "../ensure-lazy-imports";
import { toPascalCase } from "../../utils/to-pascal-case";
import { getExtension } from "./extension";
import type { Preferences } from "../collect-preferences";

export type RegistryOperation =
  | { type: "init"; components: string[] }
  | { type: "add"; components: string[] };

export async function generateRegistry(
  operation: RegistryOperation,
  project: Preferences["project"],
  registryPath: string,
) {
  const isTs = getExtension(project) === "tsx";

  const tsMorphProject = isTs
    ? new Project({
        tsConfigFilePath: "tsconfig.json",
      })
    : new Project();

  const sourceFile = tsMorphProject.addSourceFileAtPath(registryPath);

  ensureLazyImport(sourceFile, project);

  const registry =
    sourceFile
      .getVariableDeclaration("registry")
      ?.getInitializerIfKind(SyntaxKind.AsExpression)
      ?.getExpressionIfKind(SyntaxKind.ObjectLiteralExpression) ??
    sourceFile
      .getVariableDeclaration("registry")
      ?.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);

  if (!registry) {
    throw new Error("Unable to locate registry object, have you ran skullmaster init??");
  }

  const existingComponents = new Set(
    registry
      .getProperties()
      .filter((property) => property.getKind() === SyntaxKind.PropertyAssignment)
      .map((property) => property.asKindOrThrow(SyntaxKind.PropertyAssignment))
      .map((property) => property.getName().replace(/['"]/g, "")),
  );

  for (let component of operation.components) {
    component = toPascalCase(component);

    if (existingComponents.has(component)) {
      continue;
    }

    registry.addPropertyAssignment({
      name: `"${component}"`,
      initializer: `lazy(() => import("./skeletons/${component}"))`,
    });
  }

  if (isTs) {
    const declaration = sourceFile.getVariableDeclarationOrThrow("registry");

    const initializer = declaration.getInitializer();

    if (initializer && !initializer.isKind(SyntaxKind.AsExpression)) {
      declaration.setInitializer(`${initializer.getText()} as const`);
    }
  }

  sourceFile.formatText();

  await sourceFile.save();

  tsMorphProject.saveSync();
}
