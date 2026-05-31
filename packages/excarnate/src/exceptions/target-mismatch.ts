export class TargetElementMismatchError extends Error {
  constructor(expected: string, actual: string) {
    super(`Expected target element to be ${expected}, but got ${actual}`);

    this.name = "TargetElementMismatchError";
  }
}
