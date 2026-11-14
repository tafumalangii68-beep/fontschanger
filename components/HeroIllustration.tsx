/**
 * Decorative hero artwork drawn as inline SVG: no image request, sharp at any
 * size, and themed through CSS variables so it follows dark mode.
 */
export default function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 440"
      role="img"
      aria-label="Laptop showing the word Fonts in cursive inside a selection box, surrounded by floating cards with letter styles and a heart"
      className={className}
    >
      <defs>
        <filter id="hero-shadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#6425e8" floodOpacity="0.18" />
        </filter>
        <linearGradient id="hero-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--color-surface)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-accent-soft)" }} />
        </linearGradient>
      </defs>

      {/* Soft backdrop */}
      <path
        className="fill-accent-soft"
        d="M92 300C40 250 52 150 128 104 196 62 252 92 322 58c86-42 196-28 246 46 46 68 34 170-28 222-70 58-180 72-286 64-80-6-128-52-162-90Z"
      />
      <ellipse cx="340" cy="378" rx="250" ry="22" className="fill-line" opacity="0.7" />

      {/* Plant */}
      <g>
        <path d="M128 282c-26-40-30-92-8-132 18 40 22 88 8 132Z" fill="#3f9e6b" />
        <path d="M136 284c-4-52 18-100 58-122-6 48-24 92-58 122Z" fill="#57b583" />
        <path d="M124 286c-30-22-54-56-56-96 30 20 50 54 56 96Z" fill="#2f8458" />
        <path d="M132 284c10-40 4-86-20-118 34 24 44 72 20 118Z" fill="#6cc493" />
        <path d="M100 280h64l-8 64a14 14 0 0 1-14 12h-20a14 14 0 0 1-14-12Z" className="fill-surface stroke-line-strong" strokeWidth="2" />
      </g>

      {/* Laptop screen */}
      <g filter="url(#hero-shadow)">
        <rect x="176" y="62" width="320" height="252" rx="20" fill="#17143b" />
        <rect x="190" y="76" width="292" height="224" rx="10" fill="url(#hero-screen)" />
      </g>

      {/* Selection box with handles */}
      <rect
        x="214"
        y="124"
        width="244"
        height="124"
        rx="4"
        fill="none"
        className="stroke-accent"
        strokeWidth="2"
        strokeDasharray="8 6"
        opacity="0.75"
      />
      {[
        [214, 124],
        [336, 124],
        [458, 124],
        [214, 248],
        [336, 248],
        [458, 248],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" className="fill-accent stroke-surface" strokeWidth="2" />
      ))}
      <text
        x="336"
        y="208"
        textAnchor="middle"
        fontSize="68"
        className="glyph fill-ink"
        style={{ fontFamily: "var(--font-glyph)" }}
      >
        𝓕𝓸𝓷𝓽𝓼
      </text>

      {/* Cursor */}
      <path
        d="M438 236l0 44 11-11 9 20 9-4-9-20 16 0Z"
        className="fill-surface"
        stroke="#17143b"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Laptop base */}
      <path d="M150 314h372l34 40a8 8 0 0 1-6 13H122a8 8 0 0 1-6-13Z" className="fill-surface stroke-line-strong" strokeWidth="2" />
      <path d="M296 314h80l-6 9h-68Z" className="fill-line-strong" />
      <path d="M190 330h292M184 342h304" className="stroke-line" strokeWidth="3" strokeLinecap="round" />

      {/* Floating cards */}
      <g filter="url(#hero-shadow)">
        <rect x="74" y="34" width="104" height="88" rx="20" className="fill-surface" />
        <rect x="64" y="170" width="92" height="78" rx="18" className="fill-surface" />
        <rect x="514" y="96" width="112" height="88" rx="20" className="fill-surface" />
        <rect x="522" y="226" width="88" height="82" rx="20" className="fill-surface" />
      </g>
      <text x="126" y="94" textAnchor="middle" fontSize="44" fontWeight="800" className="fill-ink" fontFamily="Georgia, 'Times New Roman', serif">
        Aa
      </text>
      <text
        x="110"
        y="223"
        textAnchor="middle"
        fontSize="38"
        className="fill-accent"
        style={{ fontFamily: "var(--font-glyph)" }}
      >
        𝒜𝒶
      </text>
      <g fontSize="44" fontWeight="800" textAnchor="middle" style={{ fontFamily: "var(--font-glyph)" }}>
        <text x="567" y="157" fill="#22d3ee" opacity="0.85">
          𝔸𝕒
        </text>
        <text x="573" y="153" fill="#ec4899" opacity="0.85">
          𝔸𝕒
        </text>
        <text x="570" y="155" className="fill-ink">
          𝔸𝕒
        </text>
      </g>
      <path
        d="M566 292c-18-12-28-22-28-35 0-9 7-16 16-16 6 0 10 3 12 7 2-4 6-7 12-7 9 0 16 7 16 16 0 13-10 23-28 35Z"
        fill="none"
        stroke="#e11d74"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Sparkle strokes */}
      <g className="stroke-accent" strokeWidth="5" strokeLinecap="round">
        <path d="M206 30l14 14M190 52l18 4M214 66l10-6" />
        <path d="M600 330l-16-8M612 312l-18 0M598 350l-14-14" opacity="0.8" />
      </g>
      <path d="M470 40l6 14 14 6-14 6-6 14-6-14-14-6 14-6Z" className="fill-accent" opacity="0.55" />
    </svg>
  );
}
