import type { SymbolItem } from "@/components/landing/SymbolGrid";
import type { LandingSection } from "@/data/landing/types";

/** Builds symbol items from "char name" pairs. */
const S = (pairs: [string, string][]): SymbolItem[] => pairs.map(([char, name]) => ({ char, name }));

const EMOJI_NOTE =
  "Some symbols, like ❤ and ⭐, can appear as colourful emoji on one device and as plain black symbols on another. Each system decides how to draw them.";

export const SYMBOLS_SECTION: LandingSection = {
  id: "symbols",
  basePath: "/symbols",
  name: "Symbols & Characters",
  hubTitle: "Symbols to Copy and Paste",
  hubMetaTitle: "Symbols Copy and Paste: Hearts, Crowns, Stars, Kaomoji and More",
  hubDescription:
    "Copy and paste symbols for names, bios and chats: hearts, crowns, stars, arrows, butterflies, flowers, kaomoji text faces and invisible characters.",
  hubIntro: "Tap any symbol to copy it. Use them to decorate names, bios, captions and messages.",
  hubSections: [
    {
      heading: "How symbols work",
      paragraphs: [
        "Every symbol here is a Unicode character, so it can be pasted almost anywhere you can type. Your device draws it with its own fonts, which is why the same symbol can look a little different on another phone.",
        EMOJI_NOTE,
      ],
    },
  ],
  pages: [
    {
      slug: "hearts",
      name: "Heart Symbols",
      metaTitle: "Heart Symbols Copy and Paste: ♡ ♥ ❤ ❥ and More",
      metaDescription: "Copy and paste heart symbols like ♡ ♥ ❤ ❥ ❣ and decorative hearts for names, bios and messages. Tap any heart to copy it.",
      h1: "Heart Symbols to Copy and Paste",
      intro: "Tap any heart to copy it. Plain text hearts, decorative hearts and heart combinations for names and bios.",
      tool: {
        type: "symbols",
        groups: [
          { title: "Text hearts", symbols: S([["♡", "White heart"], ["♥", "Black heart"], ["❤", "Heavy heart"], ["❥", "Rotated heart"], ["❣", "Heart exclamation"], ["❦", "Floral heart"], ["❧", "Rotated floral heart"], ["ღ", "Georgian heart"], ["۵", "Heart-like digit"], ["დ", "Georgian letter"], ["Ꮚ", "Cherokee heart-like"], ["♥︎", "Heart (text style)"]]) },
          { title: "Heart emoji", symbols: S([["💜", "Purple heart"], ["🩷", "Pink heart"], ["💖", "Sparkling heart"], ["💕", "Two hearts"], ["💞", "Revolving hearts"], ["💗", "Growing heart"], ["💓", "Beating heart"], ["💘", "Heart with arrow"], ["🤍", "White heart emoji"], ["🖤", "Black heart emoji"], ["❤️‍🔥", "Heart on fire"], ["💔", "Broken heart"]]) },
          { title: "Heart combos", symbols: S([["♡ ⋆｡˚", "Soft sparkle"], ["꒰♡꒱", "Framed heart"], ["⸜(♡)⸝", "Cheering heart"], ["♡゙", "Heart with mark"], ["❤︎ ⋆", "Heart and star"], ["(っ◔◡◔)っ ♥", "Hug with heart"]]) },
        ],
      },
      sections: [
        { heading: "Using heart symbols", paragraphs: ["Put a heart on each side of a name, like ♡ Sara ♡, or use one at the end of a bio line. Text hearts (♡ ♥) look the same as your text colour; emoji hearts are coloured.", EMOJI_NOTE] },
      ],
      faqs: [
        { question: "What is the difference between ♡ and ❤?", answer: "♡ is an outline heart and ♥ is a solid one; both follow your text colour. ❤ often turns into a red emoji, depending on the app." },
        { question: "Can I add hearts to my name in games?", answer: "Many games accept ♡ and ♥ in display names. Check the preview before you confirm." },
      ],
      related: ["crowns", "butterflies-flowers", "kaomoji"],
      seeAlso: [{ label: "Stylish names for girls", href: "/names/girls" }],
    },
    {
      slug: "crowns",
      name: "Crown Symbols",
      metaTitle: "Crown Symbols Copy and Paste: ♛ ♚ ♔ 👑 and More",
      metaDescription: "Copy crown symbols ♛ ♚ ♔ ♕ 👑 and royal symbols like ⚜ for stylish names and bios. Tap any symbol to copy.",
      h1: "Crown Symbols to Copy and Paste",
      intro: "Crowns and royal symbols for king and queen names. Tap any symbol to copy it.",
      tool: {
        type: "symbols",
        groups: [
          { title: "Crowns", symbols: S([["♛", "Black queen"], ["♚", "Black king"], ["♕", "White queen"], ["♔", "White king"], ["👑", "Crown emoji"], ["ᥫ᭡", "Crown-like mark"]]) },
          { title: "Royal symbols", symbols: S([["⚜", "Fleur-de-lis"], ["✠", "Maltese cross"], ["♜", "Rook"], ["♞", "Knight"], ["✦", "Four-point star"], ["❂", "Sun"]]) },
          { title: "Crown combos", symbols: S([["♛ ♛", "Twin crowns"], ["꧁♛꧂", "Winged crown"], ["『♚』", "Framed king"], ["★彡♛彡★", "Star crown"], ["⚜ ♕ ⚜", "Royal queen"], ["👑⃝", "Circled crown"]]) },
        ],
      },
      sections: [{ heading: "King and queen symbols", paragraphs: ["The chess symbols ♔ ♕ ♚ ♛ are the most widely supported crowns and look consistent across phones. 👑 is an emoji, so its look depends on your device.", EMOJI_NOTE] }],
      faqs: [
        { question: "Which crown is for a king and which for a queen?", answer: "♔ and ♚ are kings; ♕ and ♛ are queens. Most people use them interchangeably as crowns." },
        { question: "Will crowns work in Free Fire or PUBG names?", answer: "Often yes. Test the name preview in the game before confirming." },
      ],
      related: ["hearts", "stars-arrows", "kaomoji"],
      seeAlso: [{ label: "Royal names", href: "/names/royal" }],
    },
    {
      slug: "stars-arrows",
      name: "Star & Arrow Symbols",
      metaTitle: "Star and Arrow Symbols Copy and Paste: ★ ✦ ➜ ⇢ and More",
      metaDescription: "Copy star symbols ★ ☆ ✦ ✧ and arrow symbols ➜ ⇢ ↳ ➤ for bios, lists and names. Tap any symbol to copy it.",
      h1: "Star and Arrow Symbols",
      intro: "Stars for decoration and arrows for bios and lists. Tap any symbol to copy it.",
      tool: {
        type: "symbols",
        groups: [
          { title: "Stars", symbols: S([["★", "Black star"], ["☆", "White star"], ["✦", "Four-point star"], ["✧", "White four-point star"], ["✩", "Outlined star"], ["✪", "Circled star"], ["✯", "Pinwheel star"], ["✰", "Shadowed star"], ["⋆", "Small star"], ["⭐", "Star emoji"], ["🌟", "Glowing star"], ["✨", "Sparkles"]]) },
          { title: "Arrows", symbols: S([["➜", "Heavy arrow"], ["➤", "Arrowhead"], ["➳", "Feathered arrow"], ["⇢", "Dashed arrow"], ["↳", "Down then right"], ["→", "Right arrow"], ["←", "Left arrow"], ["↑", "Up arrow"], ["↓", "Down arrow"], ["⟶", "Long arrow"], ["⇨", "White arrow"], ["↻", "Clockwise arrow"]]) },
        ],
      },
      sections: [{ heading: "Ideas", paragraphs: ["Use ↳ or ➜ at the start of bio lines, and ✦ or ⋆ as dividers. A row like ⋆ ✦ ⋆ makes a neat section break in captions."] }],
      faqs: [
        { question: "Why does ⭐ look different from ★?", answer: "⭐ is an emoji with colour; ★ is a text symbol that follows your text colour." },
        { question: "Which arrow is best for bios?", answer: "↳ and ➜ are popular because they are clear and widely supported." },
      ],
      related: ["hearts", "crowns", "butterflies-flowers"],
    },
    {
      slug: "butterflies-flowers",
      name: "Butterfly & Flower Symbols",
      metaTitle: "Butterfly and Flower Symbols Copy and Paste: 🦋 ✿ ❀ and More",
      metaDescription: "Copy butterfly and flower symbols like 🦋 ✿ ❀ ❁ 🌸 for aesthetic names, bios and captions. Tap any symbol to copy.",
      h1: "Butterfly and Flower Symbols",
      intro: "Soft flower and butterfly symbols for aesthetic names and bios. Tap any symbol to copy it.",
      tool: {
        type: "symbols",
        groups: [
          { title: "Flowers", symbols: S([["✿", "Black florette"], ["❀", "White florette"], ["❁", "Eight-petal flower"], ["✾", "Six-petal flower"], ["❃", "Teardrop flower"], ["✽", "Teardrop asterisk"], ["🌸", "Cherry blossom"], ["🌷", "Tulip"], ["🌼", "Blossom"], ["🌹", "Rose"], ["💐", "Bouquet"], ["🌺", "Hibiscus"]]) },
          { title: "Butterflies and nature", symbols: S([["🦋", "Butterfly"], ["Ƹ̵̡Ӝ̵̨̄Ʒ", "Text butterfly"], ["☘", "Shamrock"], ["🍃", "Leaves"], ["☁", "Cloud"], ["☾", "Moon"]]) },
        ],
      },
      sections: [{ heading: "Ideas", paragraphs: ["Pair ✿ or ❀ with small caps or cursive letters for a soft look, for example ✿ sara ✿.", EMOJI_NOTE] }],
      faqs: [
        { question: "Is there a butterfly that is not an emoji?", answer: "Unicode has no plain butterfly symbol, so people build one from letters and marks, like Ƹ̵̡Ӝ̵̨̄Ʒ. Some apps may display it unevenly." },
        { question: "Which flowers look the same on every phone?", answer: "Text flowers like ✿ ❀ ❁ follow your text colour and look more consistent than emoji flowers." },
      ],
      related: ["hearts", "stars-arrows", "kaomoji"],
      seeAlso: [{ label: "Aesthetic usernames", href: "/names/aesthetic-usernames" }],
    },
    {
      slug: "kaomoji",
      name: "Kaomoji (Text Faces)",
      metaTitle: "Kaomoji Copy and Paste: Cute Text Faces ( ◕‿◕ )",
      metaDescription: "Copy and paste kaomoji text faces: happy, love, sad, shrug and more. Japanese-style emoticons made from characters. Tap any face to copy it.",
      h1: "Kaomoji: Cute Text Faces",
      intro: "Kaomoji are Japanese-style faces made from characters. Tap any face to copy it.",
      tool: {
        type: "symbols",
        groups: [
          { title: "Happy", symbols: S([["(◕‿◕)", "Happy"], ["(｡◕‿◕｡)", "Sweet smile"], ["(✿◠‿◠)", "Flower smile"], ["٩(◕‿◕)۶", "Cheering"], ["(＾▽＾)", "Grin"], ["ヽ(•‿•)ノ", "Yay"]]) },
          { title: "Love", symbols: S([["(♡‿♡)", "Heart eyes"], ["(っ◔◡◔)っ ♥", "Hug"], ["(˘³˘)♥", "Kiss"], ["♡(ӦｖӦ｡)", "Smitten"], ["(づ｡◕‿‿◕｡)づ", "Big hug"], ["( ˘ ³˘)♥", "Blowing a kiss"]]) },
          { title: "Other moods", symbols: S([["¯\\_(ツ)_/¯", "Shrug"], ["(╥﹏╥)", "Crying"], ["(ಠ_ಠ)", "Disapproval"], ["(╯°□°)╯︵ ┻━┻", "Table flip"], ["(⌐■_■)", "Cool"], ["(・_・;)", "Nervous"]]) },
        ],
      },
      sections: [{ heading: "About kaomoji", paragraphs: ["Kaomoji (顔文字, “face characters”) come from Japan and are read upright, unlike Western smileys such as :) that are read sideways. They are made from ordinary Unicode characters, so they work wherever you can type."] }],
      faqs: [
        { question: "Why do some kaomoji look broken?", answer: "They use characters from different alphabets. If your device or font is missing one, part of the face may show as a box." },
        { question: "How do I type the shrug?", answer: "Tap it above to copy ¯\\_(ツ)_/¯. In some chat apps the backslash disappears; add a second backslash if that happens." },
      ],
      related: ["hearts", "stars-arrows", "invisible-character"],
    },
    {
      slug: "invisible-character",
      name: "Invisible Character (Blank Name)",
      metaTitle: "Invisible Character Copy and Paste: Blank Name and Empty Text",
      metaDescription: "Copy invisible characters for a blank name or empty message, such as the Hangul filler (U+3164) and braille blank (U+2800). Learn where they work.",
      h1: "Invisible Character (Blank Name)",
      intro: "Copy a character that looks empty, for blank names or spacing. Tap a button to copy it; the character itself is invisible.",
      tool: {
        type: "symbols",
        groups: [
          {
            title: "Invisible and blank characters",
            symbols: [
              { char: "ㅤ", name: "Hangul filler", display: "U+3164" },
              { char: "⠀", name: "Braille blank", display: "U+2800" },
              { char: "ᅟ", name: "Hangul choseong filler", display: "U+115F" },
              { char: " ", name: "Em space", display: "U+2003" },
              { char: " ", name: "No-break space", display: "U+00A0" },
              { char: "​", name: "Zero width space", display: "U+200B" },
            ],
          },
        ],
      },
      sections: [
        {
          heading: "Which one should I use?",
          paragraphs: [
            "Apps often trim normal spaces, so a name made only of spaces is rejected. Characters such as the Hangul filler (U+3164) and the braille blank (U+2800) are real letters or symbols that simply have no visible shape, so some apps and games accept them where a space is not allowed.",
            "Zero width characters take up no space at all and are often removed by apps. Results vary by app and change with updates, so try one character at a time.",
          ],
        },
        { heading: "Use them fairly", paragraphs: ["Blank names can confuse other players and are not allowed in every game or app. Never use invisible characters to pretend to be someone else or to hide links."] },
      ],
      faqs: [
        { question: "Why was my blank name rejected?", answer: "The app removes or blocks that character. Try a different one from the list, for example U+2800 instead of U+3164." },
        { question: "Can I send an empty WhatsApp message?", answer: "Some people paste a braille blank (U+2800) to do this. Whether it sends depends on the app version." },
      ],
      related: ["kaomoji", "hearts", "stars-arrows"],
      seeAlso: [{ label: "Zero width space explained", href: "/blog/zero-width-space" }],
    },
  ],
};
