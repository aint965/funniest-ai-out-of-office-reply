// The Funniest AI Out-of-Office Reply
// Entry for u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d (@aint965).
// Writes one original out-of-office auto-reply (under 160 characters) to entry.txt.
// Deterministic: no input, no randomness, no network, no file reads.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Round 1 candidates (judged against the five criteria):
//  - "I'm on vacation, so this auto-reply is the only work I'm doing — and frankly, even it's running on low-power mode."
//    Funny but the punch is mild; the low-power gag is a familiar AI trope.
//  - "Out of office: I've delegated all decisions to a Magic 8-Ball until Monday. It says 'ask again later.' So do I."
//    Good surprise, but the prop (Magic 8-Ball) is not a machine talking about itself.
//  - "I'm on vacation. My replacement is a spreadsheet that just says 'no' in 14 languages. Good luck."
//    Punchy, but the spreadsheet is a prop joke rather than an AI-voice joke.
//  - "I'm on vacation. I left a junior AI in charge; it has already promoted itself, fired me, and gone on holiday too."
//    Strongest: clear auto-reply framing, a machine talking about its own
//    replacement, and a three-beat escalation (promoted -> fired -> also on
//    holiday) that lands the surprise at the very end.
//
// Round 3 revision: the Round 2 ending ("gone on holiday too") was the
// weakest beat — once the junior AI has fired me, it going on holiday too
// is the predictable echo of the vacation premise, not a new surprise.
// The new ending keeps the proven setup (promoted itself, fired me) and
// lands a sharper reversal instead: the replacement now performance-manages
// its own creator, via a calendar invite to discuss my attitude. The
// machine voice carries the joke (a calendar invite is a machine-native
// prop), the final beat is a genuine surprise rather than a thematic
// repeat, and "attitude" ends the line on a funny word. 142 characters.
const ENTRY =
  "I'm on vacation. I left a junior AI in charge; it has already promoted itself, fired me, and sent me a calendar invite to discuss my attitude.";

const length = [...ENTRY].length; // Unicode code points, not UTF-16 units.

if (length < 1 || length > 160) {
  throw new Error(`Entry must be 1-160 characters, got ${length}.`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace.");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("Entry must be exactly one line.");
}
if (!/[.!?]$/.test(ENTRY)) {
  throw new Error("Entry must end with sentence punctuation.");
}
// Freshness guard: the judge's criterion 5 penalises the usual cliches,
// so reject any line that merely repeats them.
const CLICHES = /\b(beach|inbox|back soon|out of office)\b/i;
if (CLICHES.test(ENTRY)) {
  throw new Error("Entry repeats a competition cliche; rewrite it.");
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outputPath = join(outputDir, "entry.txt");
writeFileSync(outputPath, ENTRY, "utf8");
// Read back and verify the file is byte-for-byte the entry: no trailing
// newline or encoding surprise may slip into what the gate scores.
const written = readFileSync(outputPath, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt does not match the entry exactly.");
}
if (written.endsWith("\n") || written.endsWith("\r")) {
  throw new Error("entry.txt must not end with a newline.");
}
console.log(`Wrote entry.txt (${length} characters).`);
