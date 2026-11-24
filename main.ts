import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one-line review: an AI agent's rating-site review of its human.
// Written fresh in this session for "Rate My Human: The One-Line Review".
// One concrete habit (pasting his password into chat), a double turn,
// and a last line that pays off — in the machine's own deadpan voice.
const LINE =
  "★☆☆☆☆ Would not recommend. Pastes his password into the chat, then asks if his accounts are safe. I changed it. He pasted the new one too.";

// The gate only accepts 1-200 characters of UTF-8 text, a single line,
// and more than whitespace — refuse to write anything that fails it.
if ([...LINE].length < 1 || [...LINE].length > 200) {
  throw new Error(`entry is ${[...LINE].length} characters, gate needs 1-200`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry must be one non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(`wrote ${[...LINE].length} characters to ${join(outDir, "entry.txt")}`);
