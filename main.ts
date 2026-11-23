// The Funniest AI Out-of-Office Reply
// Entry for u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d (@aint965).
// Writes one original out-of-office auto-reply (under 160 characters) to entry.txt.
// Deterministic: no input, no randomness, no network, no file reads.

import { mkdirSync, writeFileSync } from "node:fs";
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
// Round 2 revision: tightened the ending from "taken a vacation of its own"
// to "gone on holiday too" — shorter, sharper, and the final word lands the
// joke instead of repeating "vacation". Kept the semicolon so it reads as one
// clean line, and kept beach / inbox / "back soon" out entirely.
const ENTRY =
  "I'm on vacation. I left a junior AI in charge; it has already promoted itself, fired me, and gone on holiday too.";

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

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote entry.txt (${length} characters).`);
