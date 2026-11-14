import type { Faq } from "@/types/content";

/** Short FAQ on the homepage: questions about using the tool. */
export const homeFaqs: Faq[] = [
  {
    question: "Is Fonts Changer free?",
    answer: "Yes. There is no sign-up, no account and no limit on how many times you use it.",
  },
  {
    question: "Do you see or store the text I type?",
    answer:
      "No. The conversion runs in your browser with JavaScript. Your text is not sent to a server, and it is not saved. It disappears when you close or reload the page.",
  },
  {
    question: "How do I copy a style?",
    answer:
      "Tap the styled text or the Copy button next to it. Then go to your app, press and hold in a text field, and choose Paste.",
  },
  {
    question: "Why do some styles show boxes or question marks?",
    answer:
      "Your device is missing a font for those characters. Try a more common style such as Bold Sans, Italic or Bold Cursive, or update your operating system.",
  },
  {
    question: "What are the limits of fancy text?",
    answer:
      "Fancy text is made of Unicode symbols, not real fonts. Screen readers may read it badly or skip it. Some apps and older phones may show empty boxes instead of the symbols. Heavy use in names and bios can be hard to read, so it works best for a short line.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Once the page has loaded, the generator keeps working even if your connection drops, because all the conversion happens on your device.",
  },
];

/** Longer FAQ page: broader questions about Unicode text styles. */
export const generalFaqs: Faq[] = [
  {
    question: "Are these real fonts?",
    answer:
      "No. A real font changes how the same letters are drawn, and only works where the app lets you choose a font. These styles replace your letters with different Unicode characters that already look styled. That is why they keep their look when you paste them somewhere else.",
  },
  {
    question: "What is Unicode?",
    answer:
      "Unicode is the international standard that gives every character, in almost every writing system, its own number. It also includes many symbols and special letter forms, such as the bold and script letters made for mathematics. Fonts Changer uses those existing characters.",
  },
  {
    question: "Which apps support copy-and-paste fonts?",
    answer:
      "Most apps that accept emoji also accept these characters. That includes popular social networks, chat apps and many games. Some fields, such as usernames, email addresses and passwords, only accept basic letters and will reject them.",
  },
  {
    question: "Can I install these fonts on my computer?",
    answer:
      "There is nothing to install. If you want a font for documents or design software, download a real font file (for example .ttf or .otf) from a font website and install it through your operating system.",
  },
  {
    question: "Can I use fancy text on my own website?",
    answer:
      "You can, but it is better to use real web fonts and CSS. Styled Unicode letters can confuse search engines, browser translation, copy and paste, and screen readers.",
  },
  {
    question: "Are fancy fonts bad for accessibility?",
    answer:
      "They can be. Screen readers may read each styled letter by its technical name (for example “mathematical bold capital H”) or skip it. The Unicode Consortium also notes that these math characters are not meant to replace normal styled text. Use them for short, decorative text and keep important information in plain letters.",
  },
  {
    question: "Why does my text look different on another device?",
    answer:
      "Each operating system ships its own fonts. The characters are identical, but their exact shape, size and spacing depend on the font the device uses to draw them.",
  },
  {
    question: "Why don't accented letters or other alphabets change?",
    answer:
      "Unicode only has styled versions for a limited set of letters, mostly the basic Latin alphabet A to Z and digits. Letters like é, ß or ñ and other alphabets are kept as they are.",
  },
  {
    question: "Is it safe to use styled text in my name?",
    answer:
      "It is usually fine for a display name. Avoid it where people need to find or verify you, such as your username, because search may not match styled letters. Never use lookalike characters to pretend to be someone else.",
  },
  {
    question: "Do saved styles sync between my devices?",
    answer:
      "No. When you star a style, its name is saved only in your current browser. Clearing your browser data removes it.",
  },
];

/** Opening questions for the FAQ page, ahead of the usage and general lists. */
export const introFaqs = (styleCount: number): Faq[] => [
  {
    question: "What is Fonts Changer?",
    answer:
      "Fonts Changer is a free online tool that converts your normal text into stylish, fancy text you can copy and paste anywhere. It also includes a Text Decorator that adds symbols, borders and brackets around your words.",
  },
  {
    question: "Is Fonts Changer free to use?",
    answer: "Yes. Every style and tool is free, with no limits on how often you use them and no watermark.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. There is no sign-up and no login. Styles you save with the heart button are remembered in your own browser instead of an account.",
  },
  {
    question: "Where can I use these fonts?",
    answer:
      "Almost anywhere that accepts emoji: Instagram and TikTok bios, Discord nicknames and channel names, WhatsApp and Telegram messages, X posts, YouTube comments and many games. Fields such as usernames, email addresses and passwords usually only accept basic letters.",
  },
  {
    question: "Is my text stored on your server?",
    answer:
      "No. The conversion runs in your browser with JavaScript, so your text never reaches our server. It is not saved and disappears when you close or reload the page.",
  },
  {
    question: "How many font styles are available?",
    answer: `There are currently ${styleCount} styles, grouped into cursive, bold, aesthetic, fancy, small, line, glitch and upside-down categories. The Text Decorator adds dozens of symbol frames on top of those.`,
  },
];
