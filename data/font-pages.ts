import type { FontPage } from "@/types/content";

/**
 * Dedicated landing pages. Each page targets one search intent:
 *  - instagram-fonts   → "instagram fonts", "fonts for instagram bio"
 *  - cursive-fonts     → "cursive font generator", "cursive text"
 *  - bold-text         → "bold text generator", "bold font copy and paste"
 *  - aesthetic-fonts   → "aesthetic fonts", "vaporwave text"
 *  - small-text        → "small text generator", "tiny text", "small caps"
 *  - glitch-text       → "glitch text generator", "zalgo text"
 *  - upside-down-text  → "upside down text", "flip text"
 * The homepage targets "fonts changer" / "font changer" / "fancy text generator".
 */
export const fontPages: FontPage[] = [
  {
    slug: "instagram-fonts",
    name: "Instagram Fonts",
    metaTitle: "Instagram Fonts: Copy and Paste Fonts for Your Bio and Captions",
    metaDescription:
      "Make Instagram fonts for your bio, name and captions. Type once, see 50+ styles, and copy the one you like. Free, no sign-up, works in your browser.",
    h1: "Instagram Fonts for Your Bio, Name and Captions",
    intro:
      "Instagram does not let you pick a font for your bio or captions. You can still stand out by pasting text made from special Unicode characters. Type below, then copy a style.",
    category: "popular",
    sample: "your bio here",
    examples: [
      { label: "Display name", plain: "Maya Lens", styleId: "bold-cursive" },
      { label: "Bio heading", plain: "Travel and Coffee", styleId: "small-caps" },
      { label: "Caption hook", plain: "New post", styleId: "old-english-bold" },
    ],
    sections: [
      {
        heading: "Where fancy fonts work on Instagram",
        paragraphs: [
          "Most text fields on Instagram accept these characters, because to the app they are ordinary text, just like an emoji. In practice they display in these places:",
        ],
        list: [
          "Bio: the most common place. A styled first line works well as a short heading.",
          "Name field: the bold name shown above your bio. This is different from your @username.",
          "Captions and comments: good for one short hook line, not for whole paragraphs.",
          "Story text: paste into the text tool. Instagram's own story fonts still apply on top, so results vary.",
        ],
      },
      {
        heading: "Where they do not work",
        paragraphs: [
          "Your @username only accepts letters, numbers, periods and underscores, so fancy characters will be rejected there. Hashtags written in styled letters are also different characters from the normal hashtag, so they are unlikely to group with posts using the plain version. Keep hashtags in plain text.",
        ],
      },
      {
        heading: "Tips for a bio that people can still read",
        paragraphs: [
          "Styled text grabs attention, but too much of it makes a profile harder to read and harder to find.",
        ],
        list: [
          "Style one line, such as your name or a short title, and keep the rest plain.",
          "Bold Sans and Small Caps are usually the easiest to read on small phone screens.",
          "Keep the words people search for, like your name or business type, in plain text. Search treats styled letters as different characters.",
          "Some styles use characters that count as more than one character, so a styled bio may hit the length limit sooner.",
          "Screen readers can read styled letters badly or skip them. Avoid styling information people need, like contact details.",
        ],
      },
      {
        heading: "Why a style might show as boxes",
        paragraphs: [
          "If a follower's phone has no font that contains a character, it shows an empty box (often called tofu) or a question mark. The bold, italic and cursive styles near the top of the generator are the most widely supported. Decorative alphabets borrowed from other writing systems are less predictable on older devices.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will Instagram ban me for using fancy fonts?",
        answer:
          "Using Unicode characters in your bio or captions is a normal part of the app, and many accounts do it. Instagram's rules are about what you post, not which characters you use. Do not use lookalike letters to impersonate another account or to slip past content filters.",
      },
      {
        question: "Why does my styled bio look different on another phone?",
        answer:
          "Each device draws these characters with its own fonts. The letters are the same, but their shape and spacing change between Android, iPhone and desktop browsers.",
      },
      {
        question: "Can I change the font for my whole profile?",
        answer:
          "No. You can only paste styled characters into text fields. The rest of the app's interface always uses Instagram's own font.",
      },
    ],
    related: ["bold-text", "cursive-fonts", "aesthetic-fonts"],
  },
  {
    slug: "cursive-fonts",
    name: "Cursive Fonts",
    metaTitle: "Cursive Font Generator: Copy and Paste Cursive Text",
    metaDescription:
      "Turn your words into cursive and script text you can copy and paste. Compare regular and bold cursive, plus italic styles. Free and runs in your browser.",
    h1: "Cursive Font Generator",
    intro:
      "Write your text once and see it in script, bold script and italic styles. Copy the cursive version you like and paste it into a post, a message or a profile.",
    category: "cursive",
    sample: "Beautiful moments",
    examples: [
      { label: "Script", plain: "Elegant", styleId: "cursive-script" },
      { label: "Bold script", plain: "Elegant", styleId: "bold-cursive" },
      { label: "Italic", plain: "Elegant", styleId: "italic" },
    ],
    sections: [
      {
        heading: "Script, bold script and italic: which one to choose",
        paragraphs: [
          "The generator offers several cursive-looking styles. They look different because they come from different sets of characters:",
        ],
        list: [
          "Cursive Script is thin and decorative. It looks elegant at large sizes but can be hard to read on small screens.",
          "Bold Cursive has heavier strokes, so it stays readable in profile names and short captions. It is the most popular choice.",
          "Italic and Sans Italic are only slanted, not looped. Use them when you want emphasis without a handwritten look.",
        ],
      },
      {
        heading: "Why some cursive letters look slightly different",
        paragraphs: [
          "In the regular script style, a few letters (such as ℬ, ℰ, ℋ, ℛ and the lowercase ℯ, ℊ and ℴ) come from an older Unicode block called Letterlike Symbols. Those letters were encoded there before the rest of the script alphabet was added, so Unicode left gaps for them in the newer block. Your device may draw them from a different font, which is why they can look a bit out of place next to the other letters.",
          "The bold script style has no such gaps, so it usually looks more consistent.",
        ],
      },
      {
        heading: "This is not joined-up handwriting",
        paragraphs: [
          "Real cursive handwriting links each letter to the next. Unicode text cannot do that: every character is separate, so the letters sit side by side with small gaps. If you need truly joined script for a printed design, use a script font in a design app instead of copy-and-paste text.",
        ],
      },
      {
        heading: "Good places to use cursive text",
        paragraphs: [],
        list: [
          "A name or short title in a social media bio.",
          "One line of a quote or caption that you want to stand out.",
          "Greetings in chat apps, such as a birthday wish.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does cursive text work in WhatsApp and Messenger?",
        answer:
          "Yes, in most cases. Both apps send Unicode text as-is, so the person you message will see cursive letters if their phone has a font for them, which modern phones usually do.",
      },
      {
        question: "Can I make numbers cursive?",
        answer:
          "Unicode has no cursive digits, so numbers stay in their normal form. If you want styled numbers, try the bold, double-struck or bubble styles instead.",
      },
      {
        question: "Why do capital letters look bigger than in a normal font?",
        answer:
          "Script capitals are designed with large swashes. They take up more width, which is normal for this style.",
      },
    ],
    related: ["bold-text", "instagram-fonts", "aesthetic-fonts"],
  },
  {
    slug: "bold-text",
    name: "Bold Text",
    metaTitle: "Bold Text Generator: Copy and Paste Bold Fonts",
    metaDescription:
      "Make bold text for places that have no bold button, such as social media posts, bios and comments. Bold serif, bold sans and bold italic styles.",
    h1: "Bold Text Generator",
    intro:
      "Many apps have no bold button. This generator converts your words into bold Unicode letters that keep their weight wherever you paste them.",
    category: "bold",
    sample: "Important update",
    examples: [
      { label: "Bold serif", plain: "Hiring now", styleId: "bold-serif" },
      { label: "Bold sans", plain: "Hiring now", styleId: "bold-sans" },
      { label: "Bold italic", plain: "Hiring now", styleId: "bold-italic" },
    ],
    sections: [
      {
        heading: "Bold serif or bold sans?",
        paragraphs: [
          "Bold Serif has small strokes at the end of each letter, which looks traditional and a bit formal. Bold Sans is clean and modern, and it tends to match the default fonts used by most apps. If you are not sure, start with Bold Sans. It blends in best with the text around it.",
        ],
      },
      {
        heading: "Where bold text helps",
        paragraphs: [],
        list: [
          "A headline at the top of a longer social media post.",
          "Section labels inside a long caption, such as the name of each step.",
          "A short call to action at the end of a post.",
        ],
      },
      {
        heading: "When to avoid bold Unicode text",
        paragraphs: [
          "Bold Unicode letters are different characters from normal letters. That has real side effects:",
        ],
        list: [
          "Screen readers may read each letter as a math symbol, or skip it. Keep important information in plain text.",
          "Search inside apps and websites often cannot match styled letters to the normal word. Do not bold your name or keywords if you want people to find them.",
          "Hashtags and @mentions written in bold characters will not link correctly.",
          "Resumes, forms and job application systems may reject or garble these characters. Use real formatting in a document editor instead.",
        ],
      },
      {
        heading: "How the bold letters are made",
        paragraphs: [
          "Unicode includes a block called Mathematical Alphanumeric Symbols, created so mathematicians can write bold or italic variables in plain text. The generator swaps each letter for its counterpart in that block. For example, the letter A becomes U+1D400, Mathematical Bold Capital A. Digits have bold versions too, so numbers change as well.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I make text bold on X (Twitter) or LinkedIn without a generator?",
        answer:
          "Neither offers bold formatting for normal posts at the time of writing, which is why people paste Unicode bold text. Check the platform, as features change.",
      },
      {
        question: "Does bold text work with letters like é or ñ?",
        answer:
          "No. Unicode only has bold versions of the basic Latin letters A to Z, Greek letters and digits. Accented letters and other alphabets stay unchanged.",
      },
      {
        question: "Is bold Unicode text bad for SEO on my website?",
        answer:
          "On your own website, use the HTML strong element or CSS for bold instead. Styled Unicode letters are not read as the normal word by search engines or assistive technology.",
      },
    ],
    related: ["instagram-fonts", "cursive-fonts", "glitch-text"],
  },
  {
    slug: "aesthetic-fonts",
    name: "Aesthetic Fonts",
    metaTitle: "Aesthetic Fonts: Vaporwave, Small Caps and Cute Text Styles",
    metaDescription:
      "Copy and paste aesthetic fonts: wide vaporwave text, soft small caps, sparkles, flowers and hearts. Make a calm, stylish look for bios and captions.",
    h1: "Aesthetic Fonts and Text Styles",
    intro:
      "Aesthetic text is about mood: wide spacing, soft lowercase letters and small decorations. Type your words below to see vaporwave, small caps and decorated styles.",
    category: "aesthetic",
    sample: "soft mornings",
    examples: [
      { label: "Vaporwave", plain: "dream state", styleId: "aesthetic-wide" },
      { label: "Spaced small caps", plain: "slow days", styleId: "spaced-small-caps" },
      { label: "Sparkles", plain: "stay golden", styleId: "sparkles" },
    ],
    sections: [
      {
        heading: "What makes text look aesthetic",
        paragraphs: [
          "There is no official aesthetic font. The word usually describes a few visual habits that give text a calm or dreamy feel:",
        ],
        list: [
          "Extra spacing between letters, as in vaporwave text.",
          "Small capitals or all lowercase letters for a softer look.",
          "Small symbols around the text, such as ✿, ♡ or ⋆｡°✩.",
          "Thin, simple shapes like the Sans Serif and Monospace styles.",
        ],
      },
      {
        heading: "How vaporwave text works",
        paragraphs: [
          "Vaporwave text uses fullwidth forms. These characters were created for East Asian typography, where Latin letters are sometimes set at the same width as Chinese, Japanese or Korean characters. Each fullwidth letter takes up a square space, which gives the wide, retro look. Because the characters are wide, a short phrase works better than a full sentence.",
        ],
      },
      {
        heading: "A note on styles borrowed from other writing systems",
        paragraphs: [
          "Styles such as Asian Style, Yi Script and Thai Style use real letters from other alphabets that happen to look like Latin letters. People who read those languages will see random letters, not your words, and screen readers may try to read them in that language. Use them for short decorative text, and keep anything important in plain letters.",
        ],
      },
      {
        heading: "Ideas for using aesthetic text",
        paragraphs: [],
        list: [
          "A one-line mood or motto at the top of your bio.",
          "Section titles in a highlight cover or playlist name.",
          "Short captions for photos with a calm or vintage feel.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which aesthetic style is easiest to read?",
        answer:
          "Small Caps and Sans Serif stay closest to normal letter shapes, so they are the easiest to read. Vaporwave is readable but takes a lot of space.",
      },
      {
        question: "Can I combine aesthetic styles with emoji?",
        answer:
          "Yes. Emoji and symbols you type are kept as they are, so you can add them before or after the styled text.",
      },
      {
        question: "Why do the decorations look different on my phone?",
        answer:
          "Symbols such as ✿ or ★ are drawn by your device's fonts. Some phones show them as colorful emoji and others as plain black symbols.",
      },
    ],
    related: ["small-text", "instagram-fonts", "cursive-fonts"],
  },
  {
    slug: "small-text",
    name: "Small Text",
    metaTitle: "Small Text Generator: Tiny Text and Small Caps to Copy",
    metaDescription:
      "Create tiny superscript text and small caps you can copy and paste. Learn which letters have small versions and why some stay the same.",
    h1: "Small Text Generator: Tiny Text and Small Caps",
    intro:
      "Make your text look smaller with small capitals or raised tiny letters. Type below, then copy the version that fits.",
    category: "small",
    sample: "tiny but mighty",
    examples: [
      { label: "Small caps", plain: "Read more", styleId: "small-caps" },
      { label: "Tiny superscript", plain: "Read more", styleId: "tiny-superscript" },
      { label: "Spaced small caps", plain: "Read more", styleId: "spaced-small-caps" },
    ],
    sections: [
      {
        heading: "Small caps and tiny text are different",
        paragraphs: [
          "Small Caps uses capital-shaped letters at roughly the height of lowercase letters (ʜᴇʟʟᴏ). It sits on the normal line, so it reads like regular text with a quieter, refined feel.",
          "Tiny Superscript uses raised letters (ʰᵉˡˡᵒ). These sit near the top of the line, like the ² in a footnote or a math power. They look smaller, but they are also harder to read.",
        ],
      },
      {
        heading: "Why some letters do not shrink",
        paragraphs: [
          "Unicode does not include a complete small alphabet. The small capitals come from phonetic letters used by linguists, and the tiny letters come from modifier letters used in phonetic notation. Neither set was designed as a complete alphabet, so a few letters are missing:",
        ],
        list: [
          "There is no small capital X, so a regular x is used.",
          "There is no superscript lowercase q, so the generator uses a similar character (ᑫ) from another script.",
          "Several capitals, such as C, F, Q, S, X, Y and Z, have no superscript form. The generator uses the closest lowercase superscript or leaves the letter as it is.",
        ],
      },
      {
        heading: "Where small text is useful",
        paragraphs: [],
        list: [
          "Quiet labels or credits, such as “ᵖʰᵒᵗᵒ ᵇʸ” under a caption.",
          "A subtle subtitle under a bold name in your bio.",
          "Playful “whisper” text in chats.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is small text accessible?",
        answer:
          "Not very. Tiny letters are hard to read for many people, and screen readers may spell them out one by one. Use it for decoration, not for information people need.",
      },
      {
        question: "Can I make numbers small?",
        answer: "Yes. The Tiny Superscript style converts digits 0 to 9 into superscript numbers such as ¹²³.",
      },
      {
        question: "Does small text change the font size?",
        answer:
          "No. Plain text has no size. These are different characters that are drawn smaller, so they look small anywhere you paste them.",
      },
    ],
    related: ["aesthetic-fonts", "upside-down-text", "instagram-fonts"],
  },
  {
    slug: "glitch-text",
    name: "Glitch Text",
    metaTitle: "Glitch Text Generator: Creepy Zalgo Text to Copy and Paste",
    metaDescription:
      "Make glitch text (also called zalgo text) with light, medium or heavy distortion. See how combining marks create the effect and where it may be blocked.",
    h1: "Glitch Text Generator",
    intro:
      "Glitch text, also called zalgo text, looks broken and spooky. Pick a light, medium or heavy level, then copy it for a game name, a meme or a Halloween post.",
    category: "glitch",
    sample: "something is wrong",
    examples: [
      { label: "Light", plain: "error", styleId: "light-glitch" },
      { label: "Medium", plain: "error", styleId: "glitch" },
      { label: "Heavy", plain: "error", styleId: "heavy-glitch" },
    ],
    sections: [
      {
        heading: "How glitch text works",
        paragraphs: [
          "Unicode has combining marks: small accents, lines and dots that attach to the character before them. They are normally used for things like the accent in é. Glitch text stacks many of these marks on every letter, above and below, so the text seems to smear across the lines around it.",
          "This generator picks the marks in a fixed pattern, so the same words always produce the same glitch. You can edit your text without the effect jumping around.",
        ],
      },
      {
        heading: "Choosing an intensity",
        paragraphs: [],
        list: [
          "Light Glitch adds two marks per letter. It looks unsettled but stays readable.",
          "Glitch adds four marks per letter. This is a balanced, clearly distorted look.",
          "Heavy Glitch adds nine marks per letter. It covers nearby lines and is best for one or two words.",
          "Glitch Bold combines bold letters with light distortion for game names and titles.",
        ],
      },
      {
        heading: "Where glitch text may not work",
        paragraphs: [
          "Because heavy glitch text can spill over other content, some platforms limit how many combining marks a character can have, or remove them. Usernames on many games and services also reject them. If your glitch text gets cut off or cleaned up, try the Light Glitch style.",
          "Glitch text is very hard to read for people using screen readers, which may read out every mark. Please keep it to short, decorative uses.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does zalgo mean?",
        answer:
          "Zalgo is the internet name for text covered in combining marks. It comes from an early 2000s internet meme about a creepy character, and the name stuck for this style of text.",
      },
      {
        question: "Can glitch text crash my phone?",
        answer:
          "The amounts used here are small and display normally on modern devices. Very large amounts of combining marks can slow down some apps, so the generator keeps the levels moderate.",
      },
      {
        question: "Can I remove the glitch later?",
        answer:
          "Copy your original words instead. Inside the generator, the plain text you typed is always kept, so you can switch to another style at any time.",
      },
    ],
    related: ["upside-down-text", "bold-text", "aesthetic-fonts"],
  },
  {
    slug: "upside-down-text",
    name: "Upside Down Text",
    metaTitle: "Upside Down Text Generator: Flip Your Text and Copy It",
    metaDescription:
      "Flip text upside down or write it backwards, then copy and paste it. Learn which characters are used and why some letters only look almost flipped.",
    h1: "Upside Down Text Generator",
    intro:
      "Type a message and see it flipped upside down (ʇxǝʇ uʍop ǝpᴉsdn) or written backwards. Copy it to confuse a friend or add a playful twist to a post.",
    category: "flip",
    sample: "hello world",
    examples: [
      { label: "Upside down", plain: "turn me over", styleId: "upside-down" },
      { label: "Backwards", plain: "turn me over", styleId: "backwards" },
      { label: "Upside down lowercase", plain: "Turn Me Over", styleId: "upside-down-lowercase" },
    ],
    sections: [
      {
        heading: "How text is flipped",
        paragraphs: [
          "There is no way to rotate plain text. The generator does two things instead. First, it replaces each letter with a character that looks like that letter turned upside down, such as ǝ for e or ɐ for a. Then it reverses the order of the characters, so the message reads correctly when you turn your screen around.",
          "Many of these replacement characters come from the International Phonetic Alphabet, which already contains rotated letter shapes for writing sounds.",
        ],
      },
      {
        heading: "Why some letters look a little off",
        paragraphs: [
          "Not every letter has a true upside-down twin in Unicode. Some are filled with the closest lookalike, and some letters look the same either way (like o, s, x and z). Capital letters have fewer good matches than lowercase letters, so the Upside Down Lowercase style often gives the cleanest result.",
        ],
      },
      {
        heading: "Backwards text",
        paragraphs: [
          "The Backwards style only reverses the order of the characters without changing them, so “hello” becomes “olleh”. It is useful for puzzles and secret messages. It does not mirror letter shapes.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I flip emoji?",
        answer:
          "Emoji are kept as they are, but their position is reversed along with the rest of the text. They will not appear rotated.",
      },
      {
        question: "Can I flip upside-down text back?",
        answer:
          "Paste the flipped text into the box and use the Upside Down style again. Most letters will return to normal, though a few lookalike characters may not reverse perfectly.",
      },
      {
        question: "Does upside-down text work with numbers?",
        answer: "Yes. Digits are flipped using similar-looking characters, for example 7 becomes ㄥ and 6 becomes 9.",
      },
    ],
    related: ["glitch-text", "small-text", "bold-text"],
  },
  {
    slug: "strikethrough-text",
    name: "Strikethrough Text",
    metaTitle: "Strikethrough Text Generator: Cross Out Text to Copy",
    metaDescription:
      "Make strikethrough, underline and crossed-out text you can copy and paste anywhere. See how combining marks draw the line through your letters.",
    h1: "Strikethrough Text Generator",
    intro:
      "Draw a line through your text, underline it or cross it out, then copy and paste it into posts, bios and chats that have no formatting buttons.",
    category: "lines",
    sample: "old price",
    examples: [
      { label: "Strikethrough", plain: "old price", styleId: "strikethrough" },
      { label: "Underline", plain: "important", styleId: "underline" },
      { label: "Crossed out", plain: "mistake", styleId: "crossed-out" },
    ],
    sections: [
      {
        heading: "How strikethrough text works",
        paragraphs: [
          "Unicode has combining marks that draw on top of the character before them. The generator adds a long stroke (U+0336) after every letter, so the line runs through the whole word. Underline and overline styles use other combining marks in the same way.",
          "Because the line is part of the text, it stays when you copy and paste, even in apps that have no strikethrough option.",
        ],
      },
      {
        heading: "Where to use it",
        paragraphs: [],
        list: [
          "Show a price change: s̶a̶l̶e̶ ̶p̶r̶i̶c̶e̶ next to the new one.",
          "Make a joke by crossing out what you “almost” said.",
          "Mark a task as done in a plain-text list.",
        ],
      },
      {
        heading: "Apps with their own strikethrough",
        paragraphs: [
          "WhatsApp chats use ~text~ and YouTube comments use -text- for strikethrough. Use those in chats, and this generator everywhere else.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is the line broken between letters on my phone?",
        answer:
          "Each letter gets its own line segment. Some fonts leave tiny gaps between them. The look varies by device and app.",
      },
      {
        question: "Do spaces get a line too?",
        answer: "No. The generator skips spaces, so words stay separated and easy to read.",
      },
    ],
    related: ["glitch-text", "small-text", "bold-text"],
  },
  {
    slug: "old-english-font",
    name: "Old English Font",
    metaTitle: "Old English Font Generator: Gothic Text to Copy and Paste",
    metaDescription:
      "Turn text into Old English (gothic, blackletter) letters you can copy and paste. Regular and bold Fraktur styles for names, captions and titles.",
    h1: "Old English (Gothic) Font Generator",
    intro:
      "Write in Old English, also called gothic or blackletter, and copy it for names, captions and titles. Choose regular or bold.",
    category: "fancy",
    sample: "Old English",
    examples: [
      { label: "Old English", plain: "Gothic", styleId: "old-english" },
      { label: "Old English bold", plain: "Gothic", styleId: "old-english-bold" },
      { label: "With stars", plain: "Gothic", styleId: "stars" },
    ],
    sections: [
      {
        heading: "Where gothic letters come from",
        paragraphs: [
          "Blackletter, or Fraktur, was the main European writing style for centuries. Unicode includes complete Fraktur alphabets in its Mathematical Alphanumeric Symbols block, because mathematicians use them as variable names. The generator swaps your letters for those characters.",
          "A few capitals, such as ℭ and ℌ, come from an older Unicode block, so they can look slightly different from the rest of the word on some devices.",
        ],
      },
      {
        heading: "Ideas",
        paragraphs: [],
        list: [
          "Gaming names with a dark or medieval feel.",
          "Headings for music, metal or streetwear captions.",
          "Previewing lettering ideas before a design or tattoo artist creates the final version.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this a real Old English font?",
        answer:
          "No. These are Unicode characters that look like blackletter. For print or tattoos, ask a designer to use a real blackletter font.",
      },
      {
        question: "Can I read Old English text easily?",
        answer: "Blackletter is harder to read, especially bold. Keep it to a word or two.",
      },
    ],
    related: ["bold-text", "cursive-fonts", "glitch-text"],
  },
  {
    slug: "bubble-letters",
    name: "Bubble Letters",
    metaTitle: "Bubble Letters Generator: Circle Text to Copy and Paste",
    metaDescription:
      "Make bubble letters and circled text like Ⓑⓤⓑⓑⓛⓔ you can copy and paste. Also try black bubbles, squares and parentheses styles.",
    h1: "Bubble Letters Generator",
    intro: "Put every letter in a bubble, a filled circle or a square, then copy it for names, bios and fun messages.",
    category: "enclosed",
    sample: "Bubble",
    examples: [
      { label: "Bubbles", plain: "Bubble", styleId: "bubbles" },
      { label: "Black bubbles", plain: "Bubble", styleId: "black-bubbles" },
      { label: "Squares", plain: "Bubble", styleId: "squares" },
    ],
    sections: [
      {
        heading: "Where circled letters come from",
        paragraphs: [
          "Unicode's Enclosed Alphanumerics blocks contain letters and numbers inside circles, squares and parentheses. They were made for lists and labels, and they work well as playful text.",
          "Black bubble and square letters only exist as capitals, so the generator turns small letters into capitals for those styles.",
        ],
      },
      {
        heading: "Tips",
        paragraphs: [],
        list: [
          "Bubbles are easy to read for short words, like a name.",
          "Some systems show certain enclosed letters as colourful emoji, especially squared ones.",
          "Numbers have bubble versions too, for example ①②③.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why do some bubble letters look like emoji?",
        answer: "A few enclosed letters double as emoji on some systems, so they appear coloured. That depends on your device.",
      },
      {
        question: "Can I make bubble numbers?",
        answer: "Yes. Type numbers and the Bubbles style converts digits as well.",
      },
    ],
    related: ["aesthetic-fonts", "small-text", "upside-down-text"],
  },
  {
    slug: "double-struck",
    name: "Double Struck Letters",
    metaTitle: "Double Struck Text Generator: 𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜 Letters",
    metaDescription:
      "Make double struck (blackboard bold) letters like 𝔻𝕠𝕦𝕓𝕝𝕖 you can copy and paste. Learn where the style comes from and where it works best.",
    h1: "Double Struck Letters Generator",
    intro: "Turn your text into double struck letters, also called blackboard bold, and copy them for names, titles and bios.",
    category: "fancy",
    sample: "Double Struck",
    examples: [
      { label: "Name", plain: "Nova", styleId: "double-struck" },
      { label: "Numbers", plain: "2026", styleId: "double-struck" },
      { label: "Title", plain: "Gaming", styleId: "double-struck" },
    ],
    sections: [
      {
        heading: "What double struck letters are",
        paragraphs: [
          "Double struck letters have an extra line inside their thick strokes. Mathematicians use them for number sets, such as ℝ for real numbers and ℕ for natural numbers, which is why Unicode includes a full alphabet of them.",
          "Seven capitals (ℂ ℍ ℕ ℙ ℚ ℝ ℤ) existed in Unicode earlier, so they come from a different block and may look a little different from the rest of a word.",
        ],
      },
      {
        heading: "Where it looks good",
        paragraphs: [],
        list: ["Gaming names and clan tags.", "Short titles in a bio or caption.", "Numbers, such as a year or jersey number."],
      },
    ],
    faqs: [
      {
        question: "What is blackboard bold?",
        answer: "Another name for double struck letters. It comes from how teachers drew bold letters on a blackboard by doubling a line.",
      },
      {
        question: "Do numbers work?",
        answer: "Yes. Digits 0 to 9 have double struck versions too.",
      },
    ],
    related: ["bold-text", "old-english-font", "bubble-letters"],
  },
];

export function getFontPage(slug: string): FontPage | undefined {
  return fontPages.find((p) => p.slug === slug);
}
