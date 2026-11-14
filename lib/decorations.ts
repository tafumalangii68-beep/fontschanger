/** Symbol frames placed around text by the Text Decorator. */
export type DecorationGroup = "borders" | "symbols" | "separators" | "brackets";
export type Decoration = { id: string; name: string; group: DecorationGroup; left: string; right: string };

export const DECORATION_GROUPS: { id: DecorationGroup; label: string; hint: string }[] = [
  { id: "borders", label: "Borders", hint: "Wide frames that wrap your text on both sides" },
  { id: "symbols", label: "Symbols", hint: "A single symbol or emoji on each side" },
  { id: "separators", label: "Separators", hint: "Lines that work as headings and dividers" },
  { id: "brackets", label: "Brackets", hint: "Clean brackets and quote marks" },
];

const RAW: [string, DecorationGroup, string, string][] = [
  // Borders
  ["Royal", "borders", "꧁༺ ", " ༻꧂"],
  ["Wings", "borders", "꧁ ", " ꧂"],
  ["Sparkle Frame", "borders", "⊹ ", " ⊹"],
  ["Waves", "borders", "˜”*°•.˜”*°• ", " •°*”˜.•°*”˜"],
  ["Dots", "borders", "•´¯`•. ", " .•´¯`•"],
  ["Arrows", "borders", "»-(¯`·.·´¯)-> ", " <-(¯`·.·´¯)-«"],
  ["Sniper", "borders", "▄︻デ ", " ══━一"],
  ["Hug", "borders", "(っ◔◡◔)っ ♥ ", " ♥"],
  ["Shooting Stars", "borders", "★彡 ", " 彡★"],
  // Symbols
  ["Stars", "symbols", "★ ", " ★"],
  ["Hearts", "symbols", "♡ ", " ♡"],
  ["Sparkles", "symbols", "⋆｡°✩ ", " ✩°｡⋆"],
  ["Flowers", "symbols", "✿ ", " ✿"],
  ["Cherry Blossom", "symbols", "🌸 ", " 🌸"],
  ["Ribbon", "symbols", "୨ ", " ୧"],
  ["Crown", "symbols", "♛ ", " ♛"],
  ["Swords", "symbols", "⚔ ", " ⚔"],
  ["Music", "symbols", "♪♫ ", " ♫♪"],
  ["Moon", "symbols", "☾ ", " ☽"],
  ["Lightning", "symbols", "⚡ ", " ⚡"],
  ["Fire", "symbols", "🔥 ", " 🔥"],
  ["Diamonds", "symbols", "◆ ", " ◆"],
  ["Clouds", "symbols", "☁ ", " ☁"],
  // Separators
  ["Dash Line", "separators", "— ", " —"],
  ["Long Line", "separators", "─── ", " ───"],
  ["Star Line", "separators", "─── ⋆⋅☆⋅⋆ ", " ⋆⋅☆⋅⋆ ───"],
  ["Double Line", "separators", "═══ ", " ═══"],
  ["Dotted Line", "separators", "•────• ", " •────•"],
  ["Diamond Line", "separators", "✦ ─── ", " ─── ✦"],
  ["Tilde", "separators", "~ ", " ~"],
  ["Flower Line", "separators", "❀ ⋆ ", " ⋆ ❀"],
  // Brackets
  ["Square", "brackets", "[ ", " ]"],
  ["Lenticular", "brackets", "【 ", " 】"],
  ["Corner Quotes", "brackets", "『 ", " 』"],
  ["Corner Brackets", "brackets", "「 ", " 」"],
  ["White Brackets", "brackets", "〖 ", " 〗"],
  ["Double Angle", "brackets", "《 ", " 》"],
  ["Tortoise Shell", "brackets", "〔 ", " 〕"],
  ["White Square", "brackets", "⟦ ", " ⟧"],
];

export const DECORATIONS: Decoration[] = RAW.map(([name, group, left, right]) => ({
  id: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  group,
  left,
  right,
}));

export function decorate(text: string, d: Decoration): string {
  return d.left + text + d.right;
}
