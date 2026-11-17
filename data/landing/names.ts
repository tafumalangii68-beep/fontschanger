import type { LandingSection } from "@/data/landing/types";

const WHERE =
  "Stylish names work best as display names in games and apps, in bios and in chats. Usernames, handles and email addresses usually only accept plain letters and numbers.";

export const NAMES_SECTION: LandingSection = {
  id: "names",
  basePath: "/names",
  name: "Stylish Name Ideas",
  hubTitle: "Stylish Name Ideas",
  hubMetaTitle: "Stylish Name Ideas: Boys, Girls, Attitude and Couple Names",
  hubDescription:
    "Stylish name ideas with symbols and fancy letters for boys, girls, attitude, aesthetic, royal and couple names. Type your name and copy.",
  hubIntro: "Browse ready-made stylish names or type your own and see it in many styles. Every page has a generator, so the ideas fit your real name.",
  hubSections: [
    {
      heading: "Make any name stylish",
      paragraphs: [
        "Each page here mixes fancy Unicode letters with symbols such as hearts, crowns and wings. Type your own name in the box at the top of any page and every style updates instantly.",
        WHERE,
      ],
    },
  ],
  pages: [
    {
      slug: "boys",
      name: "Stylish Names for Boys",
      metaTitle: "Stylish Names for Boys: Cool Name Styles to Copy",
      metaDescription: "Cool stylish names for boys with symbols and fancy letters. Type your own name to see it in every style and copy for games, Instagram or WhatsApp.",
      h1: "Stylish Names for Boys",
      intro: "Cool, bold name styles for boys. Type your own name to see it styled, or copy one of the examples.",
      tool: { type: "names", recipeSet: "gaming", examples: ["Ali", "Hamza", "Ayaan", "Zain", "Rehan", "Arham", "Rayan", "Saad", "Faris", "Danish", "Arjun", "Kabir"] },
      sections: [
        { heading: "Popular styles for boys' names", paragraphs: [], list: ["Old English letters with 亗 for a tough look.", "Wings ꧁ ꧂ around a bold cursive name.", "Small caps with ツ for something more relaxed.", "Double-struck letters with ⚡ for gaming names."] },
        { heading: "Where to use them", paragraphs: [WHERE] },
      ],
      faqs: [
        { question: "Can I use these names in Free Fire or PUBG?", answer: "Often yes, as display names. Games filter some characters, so check the name preview before you confirm." },
        { question: "How do I make my own name stylish?", answer: "Type it in the box at the top. Every style updates as you type, and you can copy any of them." },
      ],
      related: ["girls", "attitude", "royal"],
      seeAlso: [{ label: "Free Fire stylish name", href: "/gaming-names/free-fire" }],
    },
    {
      slug: "girls",
      name: "Stylish Names for Girls",
      metaTitle: "Stylish Names for Girls: Cute Name Styles to Copy",
      metaDescription: "Cute stylish names for girls with hearts, flowers and fancy letters. Type your name to see it in every style and copy for Instagram, WhatsApp or games.",
      h1: "Stylish Names for Girls",
      intro: "Cute name styles with hearts, flowers and soft letters. Type your own name or copy an example.",
      tool: { type: "names", recipeSet: "cute", examples: ["Ayesha", "Fatima", "Zara", "Anaya", "Hania", "Maryam", "Sara", "Inaya", "Aleena", "Diya", "Kiara", "Mehak"] },
      sections: [
        { heading: "Popular styles for girls' names", paragraphs: [], list: ["Cursive script between hearts ♡ for a soft look.", "Small caps with flowers ✿.", "Bubble letters for something playful.", "Sparkles ⋆｡°✩ around a cursive name for an aesthetic bio."] },
        { heading: "Where to use them", paragraphs: [WHERE] },
      ],
      faqs: [
        { question: "Will the hearts and flowers show on every phone?", answer: "Almost always. Some symbols appear as colourful emoji on one phone and as plain symbols on another, depending on the system." },
        { question: "Can I add my own symbols?", answer: "Yes. Copy a name, then add symbols from the symbols pages or the Text Decorator." },
      ],
      related: ["boys", "aesthetic-usernames", "couple"],
      seeAlso: [{ label: "Heart symbols", href: "/symbols/hearts" }],
    },
    {
      slug: "attitude",
      name: "Attitude Name Generator",
      metaTitle: "Attitude Name Generator: Stylish Attitude Names to Copy",
      metaDescription: "Attitude name generator with bold letters, crowns and sharp symbols. Type your name, get attitude styles and copy for games and social media.",
      h1: "Attitude Name Generator",
      intro: "Bold, confident name styles with crowns, brackets and sharp symbols. Type your name to generate them.",
      tool: { type: "names", recipeSet: "attitude", examples: ["Boss", "King", "Rebel", "Savage", "Alpha", "Legend", "Rider", "Royal"] },
      sections: [
        { heading: "What makes an attitude name", paragraphs: ["Attitude names use heavy letters, like bold sans or Old English, and strong symbols such as ♛, ☠ and ⚡. Keep the name itself short so the style stands out."] },
        { heading: "Where to use them", paragraphs: [WHERE] },
      ],
      faqs: [
        { question: "Are attitude names allowed in games?", answer: "Games filter offensive words and some characters. Keep the words friendly and test the name before confirming." },
        { question: "Can I combine two styles?", answer: "Copy one style, then add symbols from the Text Decorator to build your own mix." },
      ],
      related: ["boys", "royal", "aesthetic-usernames"],
    },
    {
      slug: "aesthetic-usernames",
      name: "Aesthetic Username Generator",
      metaTitle: "Aesthetic Username Generator: Soft Name Ideas to Copy",
      metaDescription: "Aesthetic username ideas with soft letters, moons and sparkles. Type your name for aesthetic display names, plus tips for plain handles.",
      h1: "Aesthetic Username Generator",
      intro: "Soft, dreamy name styles with moons, sparkles and airy letters. Type a word or name to generate them.",
      tool: { type: "names", recipeSet: "aesthetic", examples: ["moonlight", "softdreams", "cloudy", "stardust", "velvet", "honey", "luna", "ocean"] },
      sections: [
        {
          heading: "Display name vs handle",
          paragraphs: [
            "Aesthetic styles shine in display names and bios. Handles (the @ name) usually accept only plain letters, numbers, dots and underscores, so pick a plain version too, like moon.light or soft_dreams.",
          ],
        },
        { heading: "Aesthetic name ideas", paragraphs: [], list: ["Nature words: moon, ocean, petal, cloud.", "Soft feelings: dreamy, gentle, cozy.", "Combine two: moon + petal = moonpetal."] },
      ],
      faqs: [
        { question: "What is an aesthetic username?", answer: "A name with a calm, pretty feel, often using lowercase words, nature themes and soft symbols." },
        { question: "Can I use spaces in a username?", answer: "Most handles do not allow spaces. Use a dot or underscore instead." },
      ],
      related: ["girls", "royal", "couple"],
      seeAlso: [{ label: "Aesthetic fonts", href: "/fonts/aesthetic-fonts" }],
    },
    {
      slug: "royal",
      name: "Royal & Unique Names",
      metaTitle: "Royal Stylish Names: Unique Names with Crowns to Copy",
      metaDescription: "Royal and unique stylish names with crowns ♛, fleur-de-lis ⚜ and elegant letters. Type your name to generate royal styles and copy.",
      h1: "Royal and Unique Names",
      intro: "Elegant name styles with crowns and classic letters. Type your name for a royal look.",
      tool: { type: "names", recipeSet: "royal", examples: ["Shahzada", "Malika", "Sultan", "Rani", "Raja", "Nawab", "Begum", "Mirza"] },
      sections: [
        { heading: "Royal symbols to know", paragraphs: [], list: ["♛ ♚ ♔ ♕ chess crowns", "👑 the crown emoji", "⚜ fleur-de-lis", "꧁ ꧂ ornate wings"] },
        { heading: "Where to use them", paragraphs: [WHERE] },
      ],
      faqs: [
        { question: "Why does the crown look different on my friend's phone?", answer: "👑 is an emoji, so each system draws it in its own style. ♛ is a plain symbol and looks more consistent." },
        { question: "How do I make my name unique?", answer: "Combine a royal style with a symbol nobody else in your group uses, or add your favourite number." },
      ],
      related: ["attitude", "boys", "girls"],
      seeAlso: [{ label: "Crown symbols", href: "/symbols/crowns" }],
    },
    {
      slug: "couple",
      name: "Couple Name Generator",
      metaTitle: "Couple Name Generator: Stylish Couple Names with Hearts",
      metaDescription: "Couple name generator: type two names and get stylish couple names joined with hearts and symbols. Copy for bios, statuses and games.",
      h1: "Couple Name Generator",
      intro: "Type two names and get them joined with hearts and symbols in different styles.",
      tool: { type: "names", recipeSet: "couple", examples: [], couple: true },
      sections: [
        { heading: "Ideas for couple names", paragraphs: [], list: ["Use both first names with ♡ in the middle.", "Try the infinity sign ∞ for a forever theme.", "Put your anniversary date after the names."] },
        { heading: "Where to use them", paragraphs: [WHERE] },
      ],
      faqs: [
        { question: "Does it save the names I type?", answer: "No. Everything runs in your browser and nothing is stored." },
        { question: "Can I swap the order of the names?", answer: "The results already show both orders, so you can pick the one you like." },
      ],
      related: ["girls", "boys", "royal"],
      seeAlso: [{ label: "Heart symbols", href: "/symbols/hearts" }],
    },
  ],
};
