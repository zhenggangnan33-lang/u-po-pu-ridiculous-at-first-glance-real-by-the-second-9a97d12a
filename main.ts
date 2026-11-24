import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// One sentence, at most 200 characters: a bizarre startup pitch that
// sounds absurd until you see the customers and the money.
const entry =
  "We rent trained ravens to deliver breakup letters, because a bird dropping 'it is over' on your ex's balcony is unforgettable, and the newly single pay $49 a drop to never have that conversation.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// The gate rejects anything outside 1-200 characters, so fail loudly here
// instead of shipping an entry the judge will never see.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(
    `Entry must be 1-200 characters, got ${entry.length}: ${JSON.stringify(entry)}`,
  );
}
if (entry.trim().length === 0) {
  throw new Error("Entry must not be only white space.");
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, entry, "utf8");
console.log(`Wrote ${entry.length} characters to ${outFile}`);
