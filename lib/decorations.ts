/** Symbol frames placed around text by the Text Decorator. */
export type Decoration = { id: string; name: string; left: string; right: string };

const RAW: [string, string, string][] = [
  ["Royal", "꧁༺ ", " ༻꧂"],
  ["Wings", "꧁ ", " ꧂"],
  ["Shooting Stars", "★彡 ", " 彡★"],
  ["Sparkles", "⋆｡°✩ ", " ✩°｡⋆"],
  ["Flowers", "✿ ", " ✿"],
  ["Hearts", "♡ ", " ♡"],
  ["Cherry Blossom", "🌸 ", " 🌸"],
  ["Ribbon", "୨ ", " ୧"],
  ["Lenticular", "【 ", " 】"],
  ["Corner Quotes", "『 ", " 』"],
  ["White Brackets", "〖 ", " 〗"],
  ["Crown", "♛ ", " ♛"],
  ["Sniper", "▄︻デ ", " ══━一"],
  ["Swords", "⚔ ", " ⚔"],
  ["Waves", "˜”*°•.˜”*°• ", " •°*”˜.•°*”˜"],
  ["Dots", "•´¯`•. ", " .•´¯`•"],
  ["Arrows", "»-(¯`·.·´¯)-> ", " <-(¯`·.·´¯)-«"],
  ["Music", "♪♫ ", " ♫♪"],
  ["Moon", "☾ ", " ☽"],
  ["Lightning", "⚡ ", " ⚡"],
  ["Fire", "🔥 ", " 🔥"],
  ["Diamonds", "◆ ", " ◆"],
  ["Clouds", "☁ ", " ☁"],
  ["Hug", "(っ◔◡◔)っ ♥ ", " ♥"],
];

export const DECORATIONS: Decoration[] = RAW.map(([name, left, right]) => ({
  id: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  left,
  right,
}));

export function decorate(text: string, d: Decoration): string {
  return d.left + text + d.right;
}
