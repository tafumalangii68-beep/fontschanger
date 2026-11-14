/**
 * Small inline-SVG illustrations for page heroes. Colors come from theme
 * tokens so they follow dark mode, and nothing is downloaded.
 */
import type { ReactNode } from "react";

type IlloProps = { className?: string };

function Frame({ id, label, className = "", children }: { id: string; label: string; className?: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 260 200" role="img" aria-label={label} className={className}>
      <defs>
        <filter id={`${id}-sh`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#6425e8" floodOpacity="0.22" />
        </filter>
        <linearGradient id={`${id}-pg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#5b1fd6" />
        </linearGradient>
      </defs>
      <ellipse cx="130" cy="104" rx="112" ry="84" className="fill-accent-soft" opacity="0.8" />
      {children}
    </svg>
  );
}

function Sparkle({ x, y, s = 1, className = "fill-accent" }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0-12 3.2-3.2 12 0 3.2 3.2 0 12-3.2 3.2-12 0-3.2-3.2Z"
      className={className}
    />
  );
}

function Leaves({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d="M0 0c-6-26 2-50 22-64 2 26-6 48-22 64Z" fill="#57b583" />
      <path d="M2 2c-22-10-36-30-38-52 22 8 36 28 38 52Z" fill="#3f9e6b" />
      <path d="M4 4c8-22 26-34 48-36-8 20-26 34-48 36Z" fill="#6cc493" />
    </g>
  );
}

/** Font Styles: two stacked "Aa" tiles. */
export function StylesIllustration({ className }: IlloProps) {
  return (
    <Frame id="sty" label="Two stacked tiles showing the letters Aa in different styles" className={className}>
      <g filter="url(#sty-sh)">
        <rect x="112" y="28" width="96" height="96" rx="24" className="fill-line-strong" transform="rotate(10 160 76)" />
        <rect x="66" y="62" width="110" height="110" rx="26" fill="url(#sty-pg)" />
      </g>
      <text x="121" y="136" textAnchor="middle" fontSize="54" fontWeight="800" fill="#fff" fontFamily="Georgia, serif">
        Aa
      </text>
      <text x="170" y="86" textAnchor="middle" fontSize="30" className="fill-accent" style={{ fontFamily: "var(--font-glyph)" }} transform="rotate(10 170 76)">
        𝒜𝒶
      </text>
      <Sparkle x={44} y={52} s={0.8} />
      <Sparkle x={222} y={150} s={0.6} />
    </Frame>
  );
}

/** Text Decorator: browser window with a big decorated "Aa". */
export function DecoratorIllustration({ className }: IlloProps) {
  return (
    <Frame id="dec" label="Browser window showing decorated letters Aa with a sparkle" className={className}>
      <g filter="url(#dec-sh)">
        <rect x="40" y="40" width="170" height="128" rx="18" className="fill-surface" />
      </g>
      <path d="M40 58a18 18 0 0 1 18-18h134a18 18 0 0 1 18 18v6H40Z" fill="url(#dec-pg)" />
      <circle cx="58" cy="53" r="4" fill="#fff" opacity="0.9" />
      <circle cx="71" cy="53" r="4" fill="#fff" opacity="0.7" />
      <circle cx="84" cy="53" r="4" fill="#fff" opacity="0.5" />
      <rect x="62" y="80" width="126" height="70" rx="12" className="fill-accent-soft" />
      <text x="125" y="133" textAnchor="middle" fontSize="48" fontWeight="800" className="fill-accent" fontFamily="Georgia, serif">
        Aa
      </text>
      <Sparkle x={222} y={96} s={1.4} />
      <Sparkle x={30} y={150} s={0.6} className="fill-line-strong" />
    </Frame>
  );
}

/** FAQ: question-mark speech bubble with a reply bubble. */
export function FaqIllustration({ className }: IlloProps) {
  return (
    <Frame id="faq" label="Speech bubble with a question mark and a reply bubble" className={className}>
      <g filter="url(#faq-sh)">
        <path d="M92 30h110a22 22 0 0 1 22 22v58a22 22 0 0 1-22 22h-60l-28 24v-24H92a22 22 0 0 1-22-22V52a22 22 0 0 1 22-22Z" fill="url(#faq-pg)" />
        <path d="M44 112h70a16 16 0 0 1 16 16v26a16 16 0 0 1-16 16H70l-18 14v-14h-8a16 16 0 0 1-16-16v-26a16 16 0 0 1 16-16Z" className="fill-surface" />
      </g>
      <text x="147" y="104" textAnchor="middle" fontSize="64" fontWeight="800" fill="#fff">
        ?
      </text>
      <circle cx="60" cy="141" r="5" className="fill-accent" />
      <circle cx="79" cy="141" r="5" className="fill-accent" />
      <circle cx="98" cy="141" r="5" className="fill-accent" />
    </Frame>
  );
}

/** About: window with "Aa" and a plant. */
export function AboutIllustration({ className }: IlloProps) {
  return (
    <Frame id="abt" label="Window showing the letters Aa next to a plant" className={className}>
      <Leaves x={210} y={160} />
      <g filter="url(#abt-sh)">
        <rect x="52" y="36" width="160" height="124" rx="18" className="fill-surface" />
      </g>
      <path d="M52 54a18 18 0 0 1 18-18h124a18 18 0 0 1 18 18v4H52Z" fill="url(#abt-pg)" />
      <circle cx="70" cy="48" r="3.5" fill="#fff" />
      <circle cx="82" cy="48" r="3.5" fill="#fff" opacity="0.7" />
      <circle cx="94" cy="48" r="3.5" fill="#fff" opacity="0.5" />
      <text x="132" y="128" textAnchor="middle" fontSize="56" fontWeight="800" className="fill-accent" fontFamily="Georgia, serif">
        Aa
      </text>
      <Sparkle x={40} y={40} s={0.7} />
    </Frame>
  );
}

/** Contact: envelope and paper plane. */
export function ContactIllustration({ className }: IlloProps) {
  return (
    <Frame id="con" label="Envelope with a paper plane flying above it" className={className}>
      <g filter="url(#con-sh)">
        <rect x="46" y="84" width="140" height="92" rx="14" className="fill-surface" />
      </g>
      <path d="M46 98l70 46 70-46" fill="none" className="stroke-line-strong" strokeWidth="5" strokeLinejoin="round" />
      <path d="M50 172l52-40M182 172l-52-40" className="stroke-line" strokeWidth="4" strokeLinecap="round" />
      <path d="M150 64c20-8 34-20 44-36" fill="none" className="stroke-line-strong" strokeWidth="3" strokeDasharray="6 7" strokeLinecap="round" />
      <g filter="url(#con-sh)">
        <path d="M238 20 176 50l24 10 4 24 12-16 18 10Z" fill="url(#con-pg)" />
      </g>
      <path d="M200 60 238 20l-34 64" fill="#4511b8" opacity="0.5" />
    </Frame>
  );
}

/** Privacy: shield with a padlock between leaves. */
export function PrivacyIllustration({ className }: IlloProps) {
  return (
    <Frame id="prv" label="Shield with a padlock, framed by leaves" className={className}>
      <Leaves x={66} y={170} flip />
      <Leaves x={194} y={170} />
      <g filter="url(#prv-sh)">
        <path d="M130 22 192 44v46c0 42-26 72-62 88-36-16-62-46-62-88V44Z" fill="url(#prv-pg)" />
      </g>
      <path d="M130 38 178 55v35c0 33-20 57-48 70V38Z" fill="#fff" opacity="0.12" />
      <rect x="106" y="94" width="48" height="40" rx="8" fill="#fff" />
      <path d="M116 94v-10a14 14 0 0 1 28 0v10" fill="none" stroke="#fff" strokeWidth="7" />
      <circle cx="130" cy="111" r="5" fill="#5b1fd6" />
      <rect x="127.5" y="113" width="5" height="11" rx="2.5" fill="#5b1fd6" />
    </Frame>
  );
}

/** Terms: document with a check badge. */
export function TermsIllustration({ className }: IlloProps) {
  return (
    <Frame id="trm" label="Document with lines of text and a check mark badge" className={className}>
      <g filter="url(#trm-sh)">
        <rect x="72" y="22" width="118" height="152" rx="14" className="fill-surface" />
      </g>
      <rect x="90" y="44" width="56" height="10" rx="5" className="fill-accent" />
      {[70, 86, 102, 118, 134].map((y, i) => (
        <rect key={y} x="90" y={y} width={i % 2 ? 64 : 82} height="7" rx="3.5" className="fill-line-strong" />
      ))}
      <g filter="url(#trm-sh)">
        <circle cx="190" cy="150" r="28" fill="url(#trm-pg)" />
      </g>
      <path d="m177 150 9 9 17-18" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <Sparkle x={52} y={60} s={0.7} />
    </Frame>
  );
}
