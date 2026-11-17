/**
 * "Recipes" that turn a plain name into a stylish one: a letter style from
 * FONT_STYLES plus optional symbols on each side. Used by the name pages.
 */
export type NameRecipe = { style?: string; left?: string; right?: string };

export type RecipeSet = "gaming" | "attitude" | "cute" | "aesthetic" | "royal" | "couple" | "minimal";

export const RECIPES: Record<RecipeSet, NameRecipe[]> = {
  gaming: [
    { style: "bold-cursive", left: "꧁༺ ", right: " ༻꧂" },
    { style: "old-english-bold", left: "亗 ", right: " 亗" },
    { style: "bold-sans", left: "×͜× ", right: "" },
    { style: "small-caps", left: "ᴹᴿ᭄ ", right: "" },
    { style: "double-struck", left: "⚡ ", right: " ⚡" },
    { style: "monospace", left: "『 ", right: " 』" },
    { style: "bold-italic", left: "彡 ", right: " 彡" },
    { style: "bold-sans", left: "▄︻デ ", right: " ══━一" },
    { style: "small-caps", left: "ツ ", right: " ツ" },
    { style: "black-squares", left: "", right: "" },
    { style: "old-english", left: "☠ ", right: " ☠" },
    { style: "sans-bold-italic", left: "⚔ ", right: " ⚔" },
  ],
  attitude: [
    { style: "bold-sans", left: "ꪜ ", right: "" },
    { style: "old-english-bold", left: "", right: " ✗" },
    { style: "bold-italic", left: "『", right: "』" },
    { style: "small-caps", left: "ᴷᴵᴺᴳ ", right: "" },
    { style: "double-struck", left: "⚡", right: "⚡" },
    { style: "monospace", left: "【", right: "】" },
    { style: "bold-cursive", left: "♛ ", right: " ♛" },
    { style: "sans-bold-italic", left: "☠ ", right: "" },
  ],
  cute: [
    { style: "cursive-script", left: "♡ ", right: " ♡" },
    { style: "small-caps", left: "✿ ", right: " ✿" },
    { style: "bubbles", left: "", right: " ♡" },
    { style: "bold-cursive", left: "୨ ", right: " ୧" },
    { style: "spaced-small-caps", left: "🌸 ", right: " 🌸" },
    { style: "cursive-script", left: "⋆｡°✩ ", right: " ✩°｡⋆" },
    { style: "tiny-superscript", left: "♡ ", right: "" },
    { style: "sans-italic", left: "☁ ", right: " ☁" },
  ],
  aesthetic: [
    { style: "aesthetic-wide", left: "", right: "" },
    { style: "spaced-small-caps", left: "☾ ", right: " ☽" },
    { style: "cursive-script", left: "✧ ", right: " ✧" },
    { style: "small-caps", left: "⋆ ", right: " ⋆" },
    { style: "monospace", left: "", right: " ☁" },
    { style: "sans-italic", left: "˚₊‧ ", right: " ‧₊˚" },
    { style: "tiny-superscript", left: "", right: "" },
    { style: "cursive-script", left: "♡ ", right: "" },
  ],
  royal: [
    { style: "bold-cursive", left: "♛ ", right: " ♛" },
    { style: "old-english-bold", left: "👑 ", right: "" },
    { style: "double-struck", left: "♔ ", right: " ♔" },
    { style: "bold-cursive", left: "꧁༺ ", right: " ༻꧂" },
    { style: "old-english", left: "⚜ ", right: " ⚜" },
    { style: "bold-serif", left: "『 ", right: " 』" },
    { style: "small-caps", left: "♚ ", right: "" },
    { style: "cursive-script", left: "✦ ", right: " ✦" },
  ],
  couple: [
    { style: "bold-cursive", left: "", right: "" },
    { style: "cursive-script", left: "♡ ", right: " ♡" },
    { style: "small-caps", left: "", right: "" },
    { style: "double-struck", left: "", right: "" },
    { style: "bold-italic", left: "✦ ", right: " ✦" },
    { style: "aesthetic-wide", left: "", right: "" },
  ],
  minimal: [
    { style: "bold-sans" },
    { style: "small-caps" },
    { style: "monospace" },
    { style: "sans-italic" },
    { style: "bold-serif" },
    { style: "double-struck" },
  ],
};

/** Joiners used between two names on the couple page. */
export const COUPLE_JOINERS = [" ♡ ", " ❤ ", " ∞ ", " & ", " ⚭ ", " ✦ "];
