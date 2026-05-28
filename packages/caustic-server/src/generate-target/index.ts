import { Project, QuoteKind, ScriptKind } from "ts-morph";

type GenerateTargetOptions = {
  project: Project;
  filePath: string;
  componentName: string;
  body: string;
};

export default function generateTarget({
  project,
  filePath,
  componentName,
  body,
}: GenerateTargetOptions) {
  project.manipulationSettings.set({
    quoteKind: QuoteKind.Double,
  });

  const file = project.createSourceFile(filePath, "", {
    overwrite: true,
    scriptKind: ScriptKind.TSX,
  });

  file.addFunction({
    name: componentName,
    isDefaultExport: true,
    statements: [`return (${body});`],
  });
}
