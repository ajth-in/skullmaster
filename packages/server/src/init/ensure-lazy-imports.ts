import { SourceFile } from "ts-morph";

export function ensureLazyImport(sourceFile: SourceFile) {
  const reactImport = sourceFile.getImportDeclaration(
    (d) => d.getModuleSpecifierValue() === "react",
  );

  if (!reactImport) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: "react",
      namedImports: ["lazy"],
    });

    return;
  }

  const hasLazy = reactImport
    .getNamedImports()
    .some((i) => i.getName() === "lazy");

  if (!hasLazy) {
    reactImport.addNamedImport("lazy");
  }
}
