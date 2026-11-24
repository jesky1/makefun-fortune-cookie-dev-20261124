import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MIN_LENGTH = 1;
const MAX_LENGTH = 120;

const ENTRY =
  "Your future self is already debugging the code you are about to write.";

function validateEntry(entry) {
  if (typeof entry !== "string") {
    throw new Error("entry must be a string");
  }
  if (entry.length < MIN_LENGTH || entry.length > MAX_LENGTH) {
    throw new Error(
      `entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${entry.length}`,
    );
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (entry.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  return entry;
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
validateEntry(ENTRY);
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
