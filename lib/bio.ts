/** Builds styled social media bios from a few plain inputs. Pure and testable. */
import { FONT_STYLES, type Transform } from "./fonts.ts";

export type Vibe = "aesthetic" | "gaming" | "cute" | "minimal";
export type Platform = "instagram" | "tiktok" | "discord";

export const VIBES: { id: Vibe; label: string }[] = [
  { id: "aesthetic", label: "Aesthetic" },
  { id: "cute", label: "Cute" },
  { id: "gaming", label: "Gaming" },
  { id: "minimal", label: "Minimal" },
];

/** Published bio/about-me limits, used only to warn when a bio is too long. */
export const PLATFORMS: { id: Platform; label: string; limit: number; field: string }[] = [
  { id: "instagram", label: "Instagram", limit: 150, field: "bio" },
  { id: "tiktok", label: "TikTok", limit: 80, field: "bio" },
  { id: "discord", label: "Discord", limit: 190, field: "About Me" },
];

type VibeDef = { name: string[]; line: string[]; frames: [string, string][]; bullets: string[]; arrows: string[] };

const DEFS: Record<Vibe, VibeDef> = {
  aesthetic: {
    name: ["cursive-script", "aesthetic-wide", "bold-cursive", "spaced-small-caps"],
    line: ["small-caps", "plain", "sans-italic"],
    frames: [["⋆｡°✩ ", " ✩°｡⋆"], ["☾ ", " ☽"], ["✧ ", " ✧"], ["【 ", " 】"]],
    bullets: ["☁", "✧", "⋆", "☾"],
    arrows: ["↳", "⇢", "✉"],
  },
  cute: {
    name: ["bold-cursive", "bubbles", "small-caps", "cursive-script"],
    line: ["plain", "small-caps", "tiny-superscript"],
    frames: [["♡ ", " ♡"], ["✿ ", " ✿"], ["୨ ", " ୧"], ["🌸 ", " 🌸"]],
    bullets: ["♡", "✿", "🌷", "🍓"],
    arrows: ["↳", "➺", "💌"],
  },
  gaming: {
    name: ["old-english-bold", "double-struck", "black-squares", "bold-sans"],
    line: ["small-caps", "monospace", "plain"],
    frames: [["꧁༺ ", " ༻꧂"], ["▄︻デ ", " ══━一"], ["⚔ ", " ⚔"], ["『 ", " 』"]],
    bullets: ["⚡", "🎮", "☠", "⚔"],
    arrows: ["➤", "»", "▶"],
  },
  minimal: {
    name: ["bold-sans", "small-caps", "bold-serif", "sans-serif"],
    line: ["plain", "sans-serif", "small-caps"],
    frames: [["", ""], ["— ", " —"], ["| ", " |"], ["[ ", " ]"]],
    bullets: ["·", "—", "•", "/"],
    arrows: ["→", "↳", "—"],
  },
};

const identity: Transform = (t) => t;

function style(id: string): Transform {
  if (id === "plain") return identity;
  return FONT_STYLES.find((s) => s.id === id)?.transform ?? identity;
}

/** Splits "photographer, traveler · coffee" into tidy parts. */
export function splitAbout(about: string): string[] {
  return about
    .split(/\s*[,·|•\n]\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);
}

export type BioInput = { name: string; about: string; cta: string; vibe: Vibe; seed: number };

export function generateBios({ name, about, cta, vibe, seed }: BioInput, count = 6): string[] {
  const d = DEFS[vibe];
  const parts = splitAbout(about);
  const out: string[] = [];
  for (let i = 0; out.length < count && i < count * 3; i++) {
    const k = seed * count + i;
    const nameStyle = style(d.name[k % d.name.length]);
    const lineStyle = style(d.line[(k + 1) % d.line.length]);
    const [left, right] = d.frames[(k * 3 + seed) % d.frames.length];
    const bullet = d.bullets[(k + 2) % d.bullets.length];
    const arrow = d.arrows[(k + seed) % d.arrows.length];

    const lines = [left + nameStyle(name.trim() || "Your Name") + right];
    if (parts.length) {
      // Alternate between one joined line and one line per part.
      lines.push(
        ...(k % 2 === 0
          ? [`${bullet} ${parts.map((p) => lineStyle(p)).join(` ${bullet} `)}`]
          : parts.map((p) => `${bullet} ${lineStyle(p)}`)),
      );
    }
    if (cta.trim()) lines.push(`${arrow} ${cta.trim()}`);
    const bio = lines.join("\n");
    if (!out.includes(bio)) out.push(bio);
  }
  return out;
}

/** Counts characters the way most apps display them (code points, not UTF-16 units). */
export function charCount(text: string): number {
  return Array.from(text).length;
}
