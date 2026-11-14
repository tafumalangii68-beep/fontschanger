/** Hand-picked sets of styles for common uses. Ids refer to FONT_STYLES. */
export type CollectionId = "gaming" | "social" | "aesthetic" | "creative";

export type Collection = {
  id: CollectionId;
  name: string;
  description: string;
  styleIds: string[];
};

export const COLLECTIONS: Collection[] = [
  {
    id: "gaming",
    name: "Gaming",
    description: "Bold, sharp and edgy styles for gamertags, clan names and Discord servers.",
    styleIds: [
      "old-english-bold",
      "glitch-bold",
      "sniper",
      "double-struck",
      "black-squares",
      "crown",
      "faux-cyrillic",
      "currency",
      "squares",
      "glitch",
    ],
  },
  {
    id: "social",
    name: "Social Media",
    description: "Readable styles that look polished in bios, display names and captions.",
    styleIds: [
      "bold-cursive",
      "bold-sans",
      "small-caps",
      "royal-wings",
      "bold-italic",
      "hearts",
      "sparkles",
      "corner-brackets",
      "sans-bold-italic",
    ],
  },
  {
    id: "aesthetic",
    name: "Aesthetic",
    description: "Soft, airy and dreamy looks for moodboards and lifestyle accounts.",
    styleIds: [
      "aesthetic-wide",
      "vaporwave-brackets",
      "flowers",
      "sparkles",
      "spaced-small-caps",
      "asian-wings",
      "tiny-superscript",
      "cursive-script",
      "heart-between",
    ],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Playful and unusual styles for jokes, puzzles and standing out.",
    styleIds: [
      "bubbles",
      "upside-down",
      "backwards",
      "dotted",
      "yi-script",
      "thai-style",
      "parentheses",
      "star-between",
      "waves",
      "strikethrough",
    ],
  },
];

export function getCollection(id: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}
