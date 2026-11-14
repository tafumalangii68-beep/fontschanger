/**
 * Animated typography behind the homepage hero: horizontal lanes of styled words
 * that drift in opposite directions at different speeds. Pure HTML text and CSS
 * (see .fc-type-* in globals.css), hidden from assistive tech and never clickable.
 * Each lane renders its words twice and moves by exactly half its width, so the
 * loop is seamless. Motion stops when the visitor prefers reduced motion.
 */
import type { CSSProperties } from "react";
import PauseWhenOffscreen from "@/components/PauseWhenOffscreen";

const WORDS = [
  "Fonts",
  "Aa",
  "FONTS",
  "Fancy Text",
  "Stylish",
  "𝓕𝓸𝓷𝓽𝓼",
  "𝔉𝔬𝔫𝔱𝔰",
  "𝙁𝙤𝙣𝙩𝙨",
  "𝙵𝚘𝚗𝚝𝚜",
  "Ｆｏｎｔｓ",
];

type Variant = "solid" | "outline" | "gradient" | "glow";

type Lane = {
  top: string;
  /** Seconds for one full loop: larger is slower. */
  duration: number;
  direction: "left" | "right";
  size: string;
  opacity: number;
  /** Layer label only: back lanes are smaller and fainter, front lanes larger. */
  depth: "back" | "front";
  variants: Variant[];
  /** Rotates the word list so neighbouring lanes start differently. */
  offset: number;
  /** Hidden on small screens to keep the hero calm. */
  desktopOnly?: boolean;
};

const LANES: Lane[] = [
  { top: "3%", duration: 70, direction: "left", size: "1.9rem", opacity: 0.26, depth: "back", variants: ["solid", "outline"], offset: 0 },
  { top: "19%", duration: 95, direction: "right", size: "4.6rem", opacity: 0.22, depth: "front", variants: ["outline", "gradient", "outline", "glow"], offset: 3, desktopOnly: true },
  { top: "46%", duration: 55, direction: "left", size: "1.5rem", opacity: 0.3, depth: "back", variants: ["gradient", "solid", "glow"], offset: 6 },
  { top: "60%", duration: 85, direction: "right", size: "3.4rem", opacity: 0.22, depth: "front", variants: ["glow", "outline", "solid", "gradient"], offset: 2 },
  { top: "80%", duration: 62, direction: "left", size: "2.3rem", opacity: 0.26, depth: "back", variants: ["outline", "solid", "gradient"], offset: 8, desktopOnly: true },
];

function laneWords(offset: number): string[] {
  return WORDS.map((_, i) => WORDS[(i + offset) % WORDS.length]);
}

function Group({ lane, copy }: { lane: Lane; copy: number }) {
  return (
    <>
      {laneWords(lane.offset).map((word, i) => {
        const variant = lane.variants[i % lane.variants.length];
        // A small fixed tilt per word. It is static on purpose: animating 100 words
        // separately made low-end phones drop to about 10 fps. The lane floats instead.
        const style = { "--fc-rot": `${((i * 7) % 9) - 4}deg` } as CSSProperties;
        return (
          <span key={`${copy}-${i}`} className={`fc-type-item fc-type-${variant}`} style={style}>
            {word}
          </span>
        );
      })}
    </>
  );
}

export default function TypographyBackground() {
  return (
    <div aria-hidden="true" id="fc-type-bg" className="fc-type-bg">
      {/* Static curves: animating their dashes repainted the whole hero every frame. */}
      <svg className="fc-type-lines" viewBox="0 0 1440 760" preserveAspectRatio="none">
        <path d="M-20 170C240 90 460 260 720 190S1180 60 1460 150" />
        <path d="M-20 470C300 380 520 560 820 470S1220 360 1460 440" />
        <path d="M-20 640C260 600 560 700 860 630S1260 560 1460 610" className="fc-type-line-faint" />
      </svg>
      {LANES.map((lane, i) => (
        <div
          key={i}
          className={`fc-type-lane ${lane.desktopOnly ? "fc-type-desktop" : ""}`}
          style={{ top: lane.top, opacity: lane.opacity, "--fc-lane-size": lane.size } as CSSProperties}
        >
          {/* One gentle float per lane (cheap) instead of one per word. */}
          <div className="fc-type-float" style={{ animationDuration: `${7 + i * 1.5}s`, animationDelay: `${-i * 1.7}s` }}>
            <div
              className={`fc-type-track ${lane.direction === "right" ? "fc-type-right" : ""}`}
              style={{ animationDuration: `${lane.duration}s` }}
            >
              <Group lane={lane} copy={0} />
              <Group lane={lane} copy={1} />
            </div>
          </div>
        </div>
      ))}
      {/* Soft light patch behind the heading so it always reads clearly. */}
      <div className="fc-type-veil" />
      {/* Fades the lanes out at the bottom (cheaper than a CSS mask). */}
      <div className="fc-type-fade" />
      <PauseWhenOffscreen targetId="fc-type-bg" />
    </div>
  );
}
