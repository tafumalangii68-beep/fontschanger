/** Combines a letter style with themed symbols in different patterns. Pure and testable. */
import { FONT_STYLES, type Transform } from "./fonts.ts";

export type SymbolTheme = "stars" | "hearts" | "flowers" | "sparkles" | "gaming" | "music" | "arrows";

export const SYMBOL_THEMES: { id: SymbolTheme; label: string; symbols: [string, string, string] }[] = [
  { id: "stars", label: "★ Stars", symbols: ["★", "☆", "✦"] },
  { id: "hearts", label: "♡ Hearts", symbols: ["♡", "♥", "❥"] },
  { id: "flowers", label: "✿ Flowers", symbols: ["✿", "❀", "❁"] },
  { id: "sparkles", label: "✧ Sparkles", symbols: ["✧", "⋆", "˚"] },
  { id: "gaming", label: "⚔ Gaming", symbols: ["⚔", "☠", "⚡"] },
  { id: "music", label: "♫ Music", symbols: ["♪", "♫", "♬"] },
  { id: "arrows", label: "➳ Arrows", symbols: ["➳", "➵", "➸"] },
];

const STYLE_IDS = [
  "bold-cursive",
  "bold-sans",
  "small-caps",
  "old-english-bold",
  "double-struck",
  "cursive-script",
  "bold-italic",
  "monospace",
];

type Pattern = { name: string; build: (t: string, s: [string, string, string]) => string };

const PATTERNS: Pattern[] = [
  { name: "Simple frame", build: (t, [a]) => `${a} ${t} ${a}` },
  { name: "Double frame", build: (t, [a, b]) => `${a}${b} ${t} ${b}${a}` },
  { name: "Between letters", build: (t, [, b]) => Array.from(t).filter((c) => c !== " ").join(b) },
  { name: "Trail", build: (t, [a, b, c]) => `${t} ${a}${b}${c}` },
  { name: "Lead", build: (t, [a, b, c]) => `${c}${b}${a} ${t}` },
  { name: "Line frame", build: (t, [a]) => `${a}━━ ${t} ━━${a}` },
  { name: "Dotted frame", build: (t, [a]) => `⋆${a}⋆ ${t} ⋆${a}⋆` },
  { name: "Comet", build: (t, [a]) => `${a}彡 ${t} 彡${a}` },
  { name: "Bracket", build: (t, [a]) => `[${a}] ${t} [${a}]` },
  { name: "Wave", build: (t, [a, , c]) => `${a}·.¸¸.·${c} ${t} ${c}·.¸¸.·${a}` },
];

function styleFor(id: string): { name: string; transform: Transform } {
  const s = FONT_STYLES.find((x) => x.id === id);
  return s ?? { name: "Plain", transform: (t) => t };
}

export type Combo = { id: string; label: string; value: string };

/** Returns `count` combinations. Changing `seed` rotates which style goes with which pattern. */
export function generateCombos(text: string, theme: SymbolTheme, seed: number, count = 9): Combo[] {
  const symbols = (SYMBOL_THEMES.find((t) => t.id === theme) ?? SYMBOL_THEMES[0]).symbols;
  const source = text.trim() || "Fonts Changer";
  return Array.from({ length: count }, (_, i) => {
    const pattern = PATTERNS[(i + seed) % PATTERNS.length];
    const style = styleFor(STYLE_IDS[(i * 3 + seed) % STYLE_IDS.length]);
    return {
      id: `${pattern.name}-${style.name}`,
      label: `${pattern.name} · ${style.name}`,
      value: pattern.build(style.transform(source), symbols),
    };
  });
}
