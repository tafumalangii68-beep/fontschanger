/**
 * Font engine: converts plain text into Unicode lookalike "fonts".
 * Pure functions with no dependencies, so they run instantly in the browser
 * and can be unit-tested in Node.
 *
 * These are not real fonts. Each style swaps ordinary letters for other
 * Unicode characters (for example U+1D400 "MATHEMATICAL BOLD CAPITAL A").
 */

export type FontCategory =
  | "popular"
  | "cursive"
  | "bold"
  | "aesthetic"
  | "fancy"
  | "small"
  | "lines"
  | "glitch"
  | "flip";

export type Transform = (text: string) => string;

export type FontStyle = {
  id: string;
  name: string;
  categories: FontCategory[];
  transform: Transform;
};

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = LOWER.toUpperCase();
const cp = String.fromCodePoint;

function eachChar(fn: (ch: string) => string): Transform {
  return (t) => Array.from(t).map(fn).join("");
}

/** Mathematical Alphanumeric Symbols block: A–Z then a–z are contiguous. */
export function mathAlphabet(upperA: number, digitZero = 0, exceptions: Record<string, string> = {}): Transform {
  return eachChar((ch) => {
    if (exceptions[ch]) return exceptions[ch];
    const c = ch.charCodeAt(0);
    if (c >= 65 && c <= 90) return cp(upperA + c - 65);
    if (c >= 97 && c <= 122) return cp(upperA + 26 + c - 97);
    if (digitZero && c >= 48 && c <= 57) return cp(digitZero + c - 48);
    return ch;
  });
}

/** Enclosed alphanumerics (bubbles, squares). Lowercase falls back to uppercase. */
function enclosed(upperA: number, lowerA: number | null, zero?: string, one?: number): Transform {
  return eachChar((ch) => {
    const c = ch.charCodeAt(0);
    if (c >= 65 && c <= 90) return cp(upperA + c - 65);
    if (c >= 97 && c <= 122) return cp((lowerA ?? upperA) + c - 97);
    if (one && c === 48) return zero ?? ch;
    if (one && c >= 49 && c <= 57) return cp(one + c - 49);
    return ch;
  });
}

/** Letter-by-letter lookup alphabet (26 characters each). */
export function lookup(lower: string, upper?: string, extra: Record<string, string> = {}): Transform {
  const lo = Array.from(lower);
  const up = upper ? Array.from(upper) : lo;
  if (lo.length !== 26 || up.length !== 26) throw new Error("Lookup alphabets need 26 characters");
  const map: Record<string, string> = { ...extra };
  for (let i = 0; i < 26; i++) {
    map[LOWER[i]] = lo[i];
    map[UPPER[i]] = up[i];
  }
  return eachChar((ch) => map[ch] ?? ch);
}

/** Adds a combining mark after every visible character. */
function combining(mark: string): Transform {
  return eachChar((ch) => (/\s/.test(ch) ? ch : ch + mark));
}

function wrap(left: string, right: string, inner?: Transform): Transform {
  return (t) => left + (inner ? inner(t) : t) + right;
}

function joinWith(sep: string, inner?: Transform): Transform {
  return (t) =>
    Array.from(inner ? inner(t) : t)
      .filter((c) => c !== " ")
      .join(sep);
}

const fullwidth: Transform = eachChar((ch) => {
  const c = ch.charCodeAt(0);
  if (c === 32) return "　";
  if (c >= 33 && c <= 126) return cp(c + 0xfee0);
  return ch;
});

const GLITCH_MARKS = Array.from(
  "̖̗̘̙̜̝̞̟̠̤̥̦̩̪̫̬̭̮̯̰̱̹̺̻̼͇͈͉͍͎͓͔͕͖͙͚̣̍̎̄̅̿̑̆̐͒͗͑̇̈̊͂̓̈́͊͋͌̃̂̌͐̀́̋̏̒̓̔̽̉ͣͤͥͦͧͨͩͪͫͬͭͮͯ̾͛͆̚ͅ",
);

/** Deterministic "zalgo" text: same input always gives the same output. */
export function glitch(marksPerChar: number): Transform {
  return (t) => {
    let seed = 7;
    let out = "";
    for (const ch of Array.from(t)) {
      out += ch;
      if (/\s/.test(ch)) continue;
      for (let i = 0; i < marksPerChar; i++) {
        seed = (seed * 9301 + 49297) % 233280;
        out += GLITCH_MARKS[seed % GLITCH_MARKS.length];
      }
    }
    return out;
  };
}

const FLIP: Record<string, string> = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ",
  n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "ᗺ", C: "Ɔ", D: "ᗡ", E: "Ǝ", F: "Ⅎ", G: "⅁", H: "H", I: "I", J: "ſ", K: "ꓘ", L: "˥", M: "W",
  N: "N", O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "1": "Ɩ", "2": "ᄅ", "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "9", "7": "ㄥ", "8": "8", "9": "6", "0": "0",
  ".": "˙", ",": "'", "'": ",", "?": "¿", "!": "¡", "(": ")", ")": "(", "[": "]", "]": "[",
  "{": "}", "}": "{", "<": ">", ">": "<", _: "‾", "&": "⅋",
};

export const upsideDown: Transform = (t) =>
  Array.from(t)
    .map((c) => FLIP[c] ?? c)
    .reverse()
    .join("");

export const backwards: Transform = (t) => Array.from(t).reverse().join("");

export const bold = mathAlphabet(0x1d400, 0x1d7ce);
export const script = mathAlphabet(0x1d49c, 0, {
  B: "ℬ", E: "ℰ", F: "ℱ", H: "ℋ", I: "ℐ", L: "ℒ", M: "ℳ", R: "ℛ", e: "ℯ", g: "ℊ", o: "ℴ",
});
export const boldScript = mathAlphabet(0x1d4d0);
export const italic = mathAlphabet(0x1d434, 0, { h: "ℎ" });
export const boldItalic = mathAlphabet(0x1d468);
export const fraktur = mathAlphabet(0x1d504, 0, { C: "ℭ", H: "ℌ", I: "ℑ", R: "ℜ", Z: "ℨ" });
export const boldFraktur = mathAlphabet(0x1d56c);
export const doubleStruck = mathAlphabet(0x1d538, 0x1d7d8, {
  C: "ℂ", H: "ℍ", N: "ℕ", P: "ℙ", Q: "ℚ", R: "ℝ", Z: "ℤ",
});
export const sans = mathAlphabet(0x1d5a0, 0x1d7e2);
export const sansBold = mathAlphabet(0x1d5d4, 0x1d7ec);
export const sansItalic = mathAlphabet(0x1d608);
export const sansBoldItalic = mathAlphabet(0x1d63c);
export const monospace = mathAlphabet(0x1d670, 0x1d7f6);
export const smallCaps = lookup("ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ", "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ");
export const superscript = lookup("ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ", "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻ", {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
});
export const bubbles = enclosed(0x24b6, 0x24d0, "⓪", 0x2460);
export const vaporwave = fullwidth;
const asian = lookup("卂乃匚ᗪ乇千Ꮆ卄丨ﾌҜㄥ爪几ㄖ卩Ɋ尺丂ㄒㄩᐯ山乂ㄚ乙");

type StyleDef = [name: string, categories: string, transform: Transform];

const DEFS: StyleDef[] = [
  ["Bold Cursive", "popular cursive bold", boldScript],
  ["Cursive Script", "popular cursive", script],
  ["Bold Serif", "popular bold", bold],
  ["Bold Sans", "popular bold", sansBold],
  ["Bold Italic", "popular bold cursive", boldItalic],
  ["Italic", "cursive", italic],
  ["Old English Bold", "popular bold fancy", boldFraktur],
  ["Old English", "fancy", fraktur],
  ["Double Struck", "popular fancy", doubleStruck],
  ["Royal Wings", "popular fancy", wrap("꧁༺ ", " ༻꧂", boldScript)],
  ["Aesthetic Wide", "popular aesthetic", fullwidth],
  ["Small Caps", "popular small aesthetic", smallCaps],
  ["Bubbles", "popular fancy", bubbles],
  ["Asian Style", "popular aesthetic", asian],
  ["Stars", "popular fancy", wrap("★彡 ", " 彡★", boldFraktur)],
  ["Sans Serif", "aesthetic", sans],
  ["Sans Italic", "cursive aesthetic", sansItalic],
  ["Sans Bold Italic", "bold cursive", sansBoldItalic],
  ["Monospace", "aesthetic", monospace],
  ["Black Bubbles", "fancy", enclosed(0x1f150, null, "⓿", 0x2776)],
  ["Squares", "fancy", enclosed(0x1f130, null)],
  ["Black Squares", "fancy", enclosed(0x1f170, null)],
  ["Parentheses", "fancy", enclosed(0x1f110, 0x249c, undefined, 0x2474)],
  ["Tiny Superscript", "small", superscript],
  ["Spaced Small Caps", "small aesthetic", joinWith(" ", smallCaps)],
  ["Yi Script", "aesthetic", lookup("ꍏꌃꏳꀷꏂꎇꁅꀍꀤ꒻ꀘ꒒ꎭꈤꂦᖘꆰꋪꌚ꓄ꀎ꒦ꅐꉧꌩꁴ")],
  ["Thai Style", "aesthetic", lookup("ค๒ς๔єŦﻮђเןкɭ๓ภ๏קợгรՇยשฬאץչ")],
  ["Greek Style", "aesthetic", lookup("αႦƈԃҽϝɠԋιʝƙʅɱɳσρϙɾʂƚυʋɯxყȥ")],
  ["Faux Cyrillic", "fancy", lookup("ДБҀↁЄFБНІЈЌLМИФРQЯЅГЦVЩЖЧZ")],
  ["Dotted", "fancy", lookup("äḅċḋëḟġḧïjḳḷṁṅöṗqṛṡẗüṿẅẍÿż", "ÄḄĊḊЁḞĠḦЇJḲḶṀṄÖṖQṚṠṪÜṾẄẌŸŻ")],
  ["Currency", "fancy", lookup("₳฿₵ĐɆ₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾɎⱫ")],
  ["Asian Wings", "aesthetic", wrap("꧁ ", " ꧂", asian)],
  ["Vaporwave Brackets", "aesthetic", wrap("【 ", " 】", fullwidth)],
  ["Flowers", "aesthetic", wrap("✿ ", " ✿", script)],
  ["Hearts", "aesthetic", wrap("♡ ", " ♡", smallCaps)],
  ["Sparkles", "aesthetic", wrap("⋆｡°✩ ", " ✩°｡⋆", script)],
  ["Heart Between", "aesthetic", joinWith("♥")],
  ["Star Between", "fancy", joinWith("☆")],
  ["Sniper", "fancy", wrap("▄︻デ ", " ══━一", boldFraktur)],
  ["Crown", "fancy", wrap("♛ ", " ♛", boldItalic)],
  ["Waves", "fancy", wrap("˜”*°•.˜”*°• ", " •°*”˜.•°*”˜", boldScript)],
  ["Corner Brackets", "fancy", wrap("『 ", " 』", sansBold)],
  ["Strikethrough", "lines", combining("̶")],
  ["Underline", "lines", combining("̲")],
  ["Double Underline", "lines", combining("̳")],
  ["Overline", "lines", combining("̅")],
  ["Slashed", "lines", combining("̸")],
  ["Wavy Underline", "lines", combining("̰")],
  ["Crossed Out", "lines", combining("̽")],
  ["Light Glitch", "glitch", glitch(2)],
  ["Glitch", "glitch", glitch(4)],
  ["Heavy Glitch", "glitch", glitch(9)],
  ["Glitch Bold", "glitch bold", (t) => glitch(3)(sansBold(t))],
  ["Upside Down", "flip", upsideDown],
  ["Backwards", "flip", backwards],
  ["Upside Down Lowercase", "flip", (t) => upsideDown(t.toLowerCase())],
];

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export const FONT_STYLES: FontStyle[] = DEFS.map(([name, cats, transform]) => ({
  id: slugify(name),
  name,
  categories: cats.split(" ") as FontCategory[],
  transform,
}));

export const CATEGORY_LABELS: Record<FontCategory | "all" | "saved", string> = {
  all: "All",
  popular: "Popular",
  saved: "Saved",
  cursive: "Cursive",
  bold: "Bold",
  aesthetic: "Aesthetic",
  fancy: "Fancy",
  small: "Small",
  lines: "Lines",
  glitch: "Glitch",
  flip: "Upside down",
};

export const MAX_INPUT_LENGTH = 500;
