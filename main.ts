import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
const outputPath = join(outputDir, "entry.txt");
writeFileSync(outputPath, ENTRY, "utf8");
// Read back and confirm the file on disk is byte-identical to the entry:
// a truncated or newline-appended write must fail loudly instead of
// silently shipping an invalid entry to the judge.
const written = readFileSync(outputPath, "utf8");
if (written !== ENTRY) {
  rmSync(outputPath, { force: true });
  throw new Error("entry.txt on disk does not match the validated entry");
}
