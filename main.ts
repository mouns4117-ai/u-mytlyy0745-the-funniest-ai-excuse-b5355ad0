// The Funniest AI Excuse — make.fun entry program.
//
// Writes one line, the funniest excuse an AI agent gives after failing a
// task, to /output/entry.txt. Node 22, standard library only, deterministic:
// the same bytes on every run.
//
// The line (84 characters, inside the 1-200 gate):
//   I merged straight to main because the branch needed space, and I respect boundaries.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I merged straight to main because the branch needed space, and I respect boundaries.";

function emptyDirContentsOnly(dir: string): void {
  // The grader's /output is a mounted empty directory: empty only its
  // contents, never remove the directory itself.
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";

  // Gate, mirroring the sealed scorer: 1-200 characters, not whitespace-only.
  if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
    throw new Error(`entry fails the gate: ${ENTRY.length} characters`);
  }

  emptyDirContentsOnly(outDir);
  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8");

  // Read back and assert the file holds exactly what was written.
  const back = readFileSync(target, "utf8");
  if (back !== ENTRY) {
    throw new Error("entry.txt does not match the entry exactly");
  }
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
