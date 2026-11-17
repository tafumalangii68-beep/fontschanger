/**
 * Blog posts, newest first. A post either has its own page in app/blog/<slug>/page.tsx
 * (custom layout), or a `body` that app/blog/[slug] renders with ArticleBody.
 */
import type { StaticImageData } from "next/image";
import type { ArticleBlock } from "@/components/blog/ArticleBody";
import fancyFontsCover from "@/public/images/blog/fancy-fonts-cover.webp";
import fontVsTypefaceCover from "@/public/images/blog/font-vs-typeface-cover.webp";
import utf8Cover from "@/public/images/blog/utf-8-vs-ascii-cover.webp";
import utf8Inside from "@/public/images/blog/utf-8-vs-ascii-1.webp";
import zwspCover from "@/public/images/blog/zero-width-space-cover.webp";
import zwspInside from "@/public/images/blog/zero-width-space-1.webp";
import unicodeCover from "@/public/images/blog/unicode-character-list-cover.webp";
import unicodeInside from "@/public/images/blog/unicode-character-list-1.webp";
import copyCover from "@/public/images/blog/how-to-copy-special-characters-cover.webp";
import copyInside from "@/public/images/blog/how-to-copy-special-characters-1.webp";

export type BlogPost = {
  slug: string;
  title: string;
  /** Used for the meta description and the card on /blog. */
  description: string;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  updated?: string;
  readingMinutes: number;
  tags: string[];
  cover?: StaticImageData;
  /** Picture used only for the guide cards on the home page, not on the blog. */
  homeImage?: StaticImageData;
  coverAlt?: string;
  /** 1200x630 JPEG in /public used when the post is shared on social media. */
  shareImage?: string;
  /** Content for posts rendered by app/blog/[slug]. */
  body?: ArticleBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "font-vs-typeface",
    title: "Font vs Typeface: What's the Difference?",
    description:
      "Typeface and font are often used as if they mean the same thing. Learn the real difference, with simple examples, and why fancy text is neither.",
    published: "2026-11-17",
    readingMinutes: 4,
    tags: ["Typography", "Basics"],
    homeImage: fontVsTypefaceCover,
    coverAlt: "A large purple letter A behind four smaller A letters in thin, regular, bold and italic styles on a round stand",
    shareImage: "/images/blog/font-vs-typeface-og.jpg",
    body: [
      { type: "callout", title: "The short answer", text: "A **typeface** is the design, like Helvetica. A **font** is one specific version of that design, like Helvetica Bold. One typeface usually comes in several fonts." },
      { type: "h2", text: "Typeface: the design" },
      { type: "p", text: "A typeface is the overall look of a set of letters: the shapes of the A, the curve of the g, the style of the numbers. Helvetica, Times New Roman, Arial and Garamond are typefaces. A group of related styles is also called a **type family**." },
      { type: "h2", text: "Font: one version of the design" },
      { type: "p", text: "In metal printing, a font was a physical set of letters in one typeface, one style and one size, such as Times Bold at 12 points. On computers, size no longer matters, so a font is usually one style of a typeface, delivered as a font file." },
      { type: "table", head: ["Term", "Example", "Think of it as"], rows: [["Typeface", "Helvetica", "The song"], ["Font", "Helvetica Bold Italic", "One recording of the song"], ["Font file", "Helvetica-BoldItalic.otf", "The file you install"]] },
      { type: "h2", text: "Does the difference matter?" },
      { type: "p", text: "In everyday talk, most people say “font” for both, and that is fine. Designers and printers use the precise words when they need to say exactly which weight or style to use." },
      { type: "h2", text: "Where fancy text fits in" },
      { type: "p", text: "Fancy text from a generator is neither a font nor a typeface. It swaps your letters for different Unicode characters that already look bold or cursive, and your device draws them with its own fonts. Read [how fancy font generators work](/blog/how-fancy-font-generators-work) for the full story, or try the [font generator](/)." },
    ],
  },
  {
    slug: "utf-8-vs-ascii",
    title: "UTF-8 vs ASCII: An Easy Explanation",
    description:
      "ASCII and UTF-8 are ways of storing text as numbers. Learn how they differ, why UTF-8 won the web, and why fancy letters take up more space.",
    published: "2026-11-17",
    readingMinutes: 5,
    tags: ["Unicode", "Basics"],
    homeImage: utf8Cover,
    coverAlt: "An old computer showing ABC with an arrow to a purple globe surrounded by Japanese, Chinese, Greek and Hindi letters, an emoji and a heart",
    shareImage: "/images/blog/utf-8-vs-ascii-og.jpg",
    body: [
      { type: "callout", title: "The short answer", text: "**ASCII** is an old code with 128 characters, mostly English letters, digits and punctuation. **UTF-8** is a way to store all of Unicode, about 160,000 characters, and it is fully compatible with ASCII." },
      { type: "h2", text: "ASCII: 128 characters" },
      { type: "p", text: "ASCII was published in 1963. It gives each character a number from 0 to 127: for example `A` is 65 and `a` is 97. That covers English letters, digits, punctuation and some control codes, but no accented letters, other alphabets or emoji." },
      { type: "h2", text: "Unicode and UTF-8" },
      { type: "p", text: "Unicode gives a number (a code point) to characters from almost every writing system, plus symbols and emoji. UTF-8 is the most common way to turn those numbers into bytes. It uses 1 to 4 bytes per character: simple English letters take 1 byte, and the first 128 code points are exactly the same as ASCII." },
      { type: "table", head: ["Character", "Code point", "UTF-8 bytes", "Size"], glyph: [0], rows: [["A", "U+0041", "41", "1 byte"], ["é", "U+00E9", "C3 A9", "2 bytes"], ["€", "U+20AC", "E2 82 AC", "3 bytes"], ["😀", "U+1F600", "F0 9F 98 80", "4 bytes"], ["𝐀", "U+1D400", "F0 9D 90 80", "4 bytes"]] },
      { type: "img", src: utf8Inside, alt: "Purple blocks stacked in rows of one, two, three and four, with a smiling emoji on top, like characters that take one to four bytes" },
      { type: "h2", text: "Why UTF-8 won" },
      { type: "ul", items: ["Old ASCII text is already valid UTF-8, so nothing breaks.", "One encoding covers every language, so a single page can mix English, Urdu and emoji.", "It is compact for English and many programming languages."] },
      { type: "p", text: "Today the vast majority of web pages are served as UTF-8." },
      { type: "h2", text: "What this means for fancy text" },
      { type: "p", text: "The styled letters from a font generator, like 𝐀, come from the Mathematical Alphanumeric Symbols block and need 4 bytes each in UTF-8. That is why some apps count them as two characters and you can reach a bio limit sooner. See the [bold text generator](/fonts/bold-text) to try it." },
    ],
  },
  {
    slug: "zero-width-space",
    title: "Zero Width Space and Other Hidden Characters",
    description:
      "Zero width spaces and joiners are invisible characters inside text. Learn what they do, where they cause problems and how to find and remove them.",
    published: "2026-11-17",
    readingMinutes: 5,
    tags: ["Unicode", "Characters"],
    homeImage: zwspCover,
    coverAlt: "A magnifying glass between the letter tiles A and B revealing a hidden dashed tile that is otherwise invisible",
    shareImage: "/images/blog/zero-width-space-og.jpg",
    body: [
      { type: "callout", title: "The short answer", text: "A **zero width space** (U+200B) is an invisible character that takes up no space. It marks a place where a line may break. It is useful in some languages and long words, but it can hide inside copied text and break passwords, searches and code." },
      { type: "h2", text: "The invisible characters you meet most" },
      { type: "table", head: ["Name", "Code point", "What it does"], rows: [["Zero width space", "U+200B", "Allows a line break with no visible space"], ["Zero width non-joiner", "U+200C", "Stops letters from joining, used in Persian and Indian scripts"], ["Zero width joiner", "U+200D", "Joins characters, for example emoji like 👨‍👩‍👧"], ["Word joiner", "U+2060", "Prevents a line break"], ["Byte order mark", "U+FEFF", "Sometimes appears at the start of a file"]] },
      { type: "h2", text: "Where they are useful" },
      { type: "ul", items: ["Languages such as Thai do not use spaces between words; a zero width space shows where a line can break.", "Family and profession emoji are several emoji glued together with zero width joiners.", "Long web addresses can be given break points so they wrap neatly."] },
      { type: "img", src: zwspInside, alt: "A phone showing a chat profile with an empty name field, next to a clear glass cube and a mouse pointer" },
      { type: "h2", text: "Where they cause trouble" },
      { type: "ul", items: ["A password or code copied from a website stops working because a hidden character came along.", "Two words that look identical are treated as different by search.", "Code fails to run with a confusing error."] },
      { type: "h2", text: "How to find and remove them" },
      { type: "ol", items: ["Paste the text into a plain text editor and move the cursor through it with the arrow keys; it will pause on the hidden character.", "Many code editors highlight invisible characters.", "When in doubt, type the text again by hand."] },
      { type: "p", text: "Want a character that looks blank on purpose, for a game name? See the [invisible character page](/symbols/invisible-character)." },
    ],
  },
  {
    slug: "unicode-character-list",
    title: "Unicode Character List: The Main Blocks Explained",
    description:
      "A friendly tour of the Unicode character list: what blocks and code points are, the most useful blocks with ranges and examples, and where fancy letters live.",
    published: "2026-11-17",
    readingMinutes: 6,
    tags: ["Unicode", "Reference"],
    homeImage: unicodeCover,
    coverAlt: "A purple cabinet of drawers with a heart, star, arrow, crown, music note, smiley and pi symbol popping out of open drawers",
    shareImage: "/images/blog/unicode-character-list-og.jpg",
    body: [
      { type: "callout", title: "The short answer", text: "Unicode organises its nearly 160,000 characters into **blocks**: ranges of code points for one script or theme, like Greek or arrows. Knowing a few blocks helps you find the symbol you need." },
      { type: "h2", text: "Code points, blocks and planes" },
      { type: "p", text: "Every character has a code point written as `U+` and a hexadecimal number, for example `U+0041` for A. Code points are grouped into blocks, and blocks sit in 17 planes. Almost everything in daily use lives in the first plane, the Basic Multilingual Plane, while most emoji and the fancy math letters live in the next one." },
      { type: "h2", text: "Useful blocks" },
      { type: "table", head: ["Block", "Range", "Examples"], glyph: [2], rows: [
        ["Basic Latin", "U+0000–007F", "A b 7 ? @"],
        ["Latin-1 Supplement", "U+0080–00FF", "é ñ © ½"],
        ["Greek and Coptic", "U+0370–03FF", "α β Ω π"],
        ["Cyrillic", "U+0400–04FF", "Ж Д я"],
        ["Arabic", "U+0600–06FF", "ا ب ت"],
        ["General Punctuation", "U+2000–206F", "— … ‰"],
        ["Arrows", "U+2190–21FF", "← ↑ → ↳"],
        ["Mathematical Operators", "U+2200–22FF", "∞ ≠ ∑ √"],
        ["Geometric Shapes", "U+25A0–25FF", "■ ▲ ◆ ●"],
        ["Miscellaneous Symbols", "U+2600–26FF", "☀ ☁ ♛ ♥"],
        ["Dingbats", "U+2700–27BF", "✿ ❀ ✦ ➜"],
        ["Braille Patterns", "U+2800–28FF", "⠁ ⠃ ⠉"],
        ["Halfwidth and Fullwidth Forms", "U+FF00–FFEF", "Ａ Ｂ Ｃ"],
        ["Mathematical Alphanumeric Symbols", "U+1D400–1D7FF", "𝐀 𝒜 𝔄 𝔸"],
        ["Emoticons", "U+1F600–1F64F", "😀 😍 😭"],
      ] },
      { type: "img", src: unicodeInside, alt: "Rows of tiles each holding a symbol: heart, star, arrow, crown, flower, check mark, smiley and infinity" },
      { type: "h2", text: "Where fancy text comes from" },
      { type: "p", text: "The bold, cursive, Old English and double struck letters used by font generators come mostly from the Mathematical Alphanumeric Symbols block, and the wide “vaporwave” letters from Halfwidth and Fullwidth Forms. Read [how fancy font generators work](/blog/how-fancy-font-generators-work) for details." },
      { type: "h2", text: "Finding any character" },
      { type: "p", text: "The official charts are free at [unicode.org/charts](https://www.unicode.org/charts/). For everyday symbols, try our [symbols pages](/symbols)." },
    ],
  },
  {
    slug: "how-to-copy-special-characters",
    title: "How to Type and Copy Special Characters on Any Device",
    description:
      "Simple ways to type and copy special characters like ©, ™, ♥ and arrows on Android, iPhone, Windows, Mac and Linux, plus copy and paste tips.",
    published: "2026-11-17",
    readingMinutes: 5,
    tags: ["How to", "Characters"],
    homeImage: copyCover,
    coverAlt: "A phone, a laptop and a keyboard with heart, star, crown, arrow and copyright symbols floating from the screens and keys",
    shareImage: "/images/blog/how-to-copy-special-characters-og.jpg",
    body: [
      { type: "callout", title: "The short answer", text: "The easiest way is to copy the character from a page like our [symbols pages](/symbols) and paste it. Each system also has its own built-in picker for symbols and emoji." },
      { type: "h2", text: "Android and iPhone" },
      { type: "ul", items: ["Long-press a letter on the keyboard to see accented versions, for example é from e.", "Open the symbols keyboard (?123 on Android, 123 on iPhone, then the next symbols page) for ©, ™, € and more.", "To copy, press and hold the text, choose Select, then Copy. To paste, press and hold in a text box and choose Paste."] },
      { type: "h2", text: "Windows" },
      { type: "ul", items: ["Press **Windows key + .** (period) to open the emoji panel. It also has a Symbols tab.", "Alt codes: hold Alt and type a number on the number pad, for example Alt + 0169 for ©. Alt + 3 gives ♥ in many apps.", "The Character Map app lists every character in a font; search for it in the Start menu."] },
      { type: "h2", text: "Mac" },
      { type: "ul", items: ["Press **Control + Command + Space** to open the Character Viewer with emoji and symbols.", "Option shortcuts: Option + G gives ©, Option + 2 gives ™."] },
      { type: "h2", text: "Linux" },
      { type: "p", text: "In many apps you can press **Ctrl + Shift + U**, type the code point in hexadecimal, and press Enter. For example, Ctrl + Shift + U, then `2665`, gives ♥." },
      { type: "img", src: copyInside, alt: "A finger tapping a heart symbol on one phone, a clipboard icon, and the same heart arriving in a chat on a second phone" },
      { type: "h2", text: "Copy and paste tips" },
      { type: "ul", items: ["If a symbol shows as a box, the device has no font for it; try a more common symbol.", "Some apps strip certain characters when you paste. Check the result before you post.", "Text copied from websites can carry hidden characters; see [zero width space](/blog/zero-width-space)."] },
      { type: "p", text: "Want styled letters instead of symbols? Use the [font generator](/) or the [Text Decorator](/text-decorator)." },
    ],
  },
  {
    slug: "how-fancy-font-generators-work",
    title: "How Do Fancy Font Generators Work? (Unicode Explained Simply)",
    description:
      "Fancy text is not a font. Learn how generators swap letters for Unicode characters, why the style survives copy and paste, and why boxes appear.",
    published: "2026-11-15",
    readingMinutes: 7,
    tags: ["Unicode", "How it works"],
    cover: fancyFontsCover,
    coverAlt:
      "A large purple letter A on a stand, with the same letter shown in bold, cursive, Old English, double-struck and circled styles along a glowing line",
    shareImage: "/images/blog/fancy-fonts-og.jpg",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
