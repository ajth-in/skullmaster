import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { EMPTY_SET_DEFAULT_DIR } from "../constants";

export async function initialize(isTs: boolean): Promise<void> {
  try {
    await mkdir(EMPTY_SET_DEFAULT_DIR);
  } catch (error) {
    throw new Error(`Failed to create "${EMPTY_SET_DEFAULT_DIR}". Directory may already exist.`, {
      cause: error,
    });
  }

  try {
    await writeFile(join(EMPTY_SET_DEFAULT_DIR, "cache.json"), JSON.stringify({}, null, 2), {
      flag: "wx",
    });
  } catch (error) {
    throw new Error("Failed to create initialization files.", {
      cause: error,
    });
  }

  try {
    await mkdir(join(EMPTY_SET_DEFAULT_DIR, "bones"));
  } catch (error) {
    throw new Error(
      `Failed to create "${EMPTY_SET_DEFAULT_DIR}/bones". Directory may already exist.`,
      { cause: error },
    );
  }
}
