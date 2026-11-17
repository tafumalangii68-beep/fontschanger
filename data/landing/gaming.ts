import type { LandingSection } from "@/data/landing/types";

const TEST_TIP =
  "Every game decides which characters it accepts, and the rules change with updates. Before you spend a rename card or in-game currency, paste the name into the name box and check that the preview shows it correctly.";

export const GAMING_SECTION: LandingSection = {
  id: "gaming",
  basePath: "/gaming-names",
  name: "Gaming Names",
  hubTitle: "Stylish Gaming Names",
  hubMetaTitle: "Stylish Gaming Names: Free Fire, PUBG, Roblox and More",
  hubDescription:
    "Make stylish gaming names with symbols and fancy letters for Free Fire, PUBG, BGMI, Roblox, Fortnite, Minecraft, COD and Valorant. Type your name and copy.",
  hubIntro:
    "Type your gamer tag once and get it in dozens of stylish versions with wings, crowns and fancy letters. Pick your game for tips on what works where.",
  hubSections: [
    {
      heading: "How stylish gaming names work",
      paragraphs: [
        "Stylish names use special Unicode characters: letters that look bold, cursive or Old English, plus symbols such as ꧁ ꧂, 亗 and ツ. They are characters, not a font setting, so they stay styled when you paste them into a game.",
        "Not every game accepts every character. Some only allow plain letters and numbers in usernames but are more relaxed with display names, clan names or chat. Each guide below explains what to try first.",
      ],
    },
    {
      heading: "Tips for a name people remember",
      paragraphs: [],
      list: [
        "Keep the core name short and easy to read. Decorate the edges, not every letter.",
        "Use the same name across games so friends and teammates can find you.",
        "Avoid names that copy another player, team or brand.",
        TEST_TIP,
      ],
    },
  ],
  pages: [
    {
      slug: "free-fire",
      name: "Free Fire Stylish Name",
      metaTitle: "Free Fire Stylish Name Generator: Copy and Paste Names",
      metaDescription: "Create a stylish Free Fire name with symbols like 亗, ꧁꧂ and ツ. Type your name, get many styles and copy the one you like.",
      h1: "Free Fire Stylish Name Generator",
      intro: "Type your name and get it in stylish Free Fire versions with symbols and fancy letters, ready to copy and paste.",
      tool: { type: "names", recipeSet: "gaming", examples: ["Shadow", "Killer", "Rider", "Hunter", "Ghost", "Blaze", "Viper", "Storm", "Legend", "Raja", "Toxic", "Sniper"], label: "Type your Free Fire name" },
      sections: [
        {
          heading: "How to change your Free Fire name",
          paragraphs: [
            "Open your profile in Free Fire, tap the edit icon next to your name, paste the stylish name and confirm. Changing a name usually costs a name change card or diamonds, so check the name first.",
            TEST_TIP,
          ],
        },
        {
          heading: "Popular symbols for Free Fire names",
          paragraphs: ["These symbols are common in Free Fire names because they look sharp in the lobby and on the kill feed:"],
          list: [
            "亗 and 彡 for a bold, aggressive look.",
            "꧁ ꧂ and ༺ ༻ as wings around the name.",
            "ツ and ×͜× for a casual or cheeky style.",
            "ᴹᴿ᭄ as a short prefix, often used for “Mr”.",
          ],
        },
      ],
      faqs: [
        { question: "Why does my Free Fire name show boxes?", answer: "The game or your phone has no font for one of the characters. Remove that symbol or pick a style that uses more common characters, such as bold or small caps." },
        { question: "Can I use the same name as someone else?", answer: "Usually not exactly. If a name is taken, add a symbol or swap one letter style to make it unique." },
      ],
      related: ["pubg-bgmi", "cod-valorant", "fortnite"],
      seeAlso: [{ label: "Text Decorator", href: "/text-decorator" }],
    },
    {
      slug: "pubg-bgmi",
      name: "PUBG / BGMI Names",
      metaTitle: "PUBG and BGMI Stylish Names: Copy and Paste Name Styles",
      metaDescription: "Make stylish PUBG Mobile and BGMI names with symbols and fancy letters. Type your name, see many styles and copy for your profile or clan.",
      h1: "PUBG and BGMI Stylish Name Generator",
      intro: "Turn your PUBG Mobile or BGMI name into a stylish one with symbols and fancy letters. Type it once and copy your favourite.",
      tool: { type: "names", recipeSet: "gaming", examples: ["Sniper", "Scout", "Mortal", "Jonny", "Ghost", "Dynamo", "Panther", "Phantom", "Rush", "Ace", "Hydra", "Titan"], label: "Type your PUBG or BGMI name" },
      sections: [
        {
          heading: "How to rename in PUBG Mobile or BGMI",
          paragraphs: [
            "Renaming usually needs a rename card from your inventory or the shop. Open the inventory, use the rename card, paste your stylish name and confirm.",
            TEST_TIP,
          ],
        },
        {
          heading: "Name ideas that work well in squads",
          paragraphs: [],
          list: [
            "Short names are easier for teammates to call out in voice chat.",
            "Clan tags look neat in brackets, for example 『 TAG 』 before your name.",
            "Snipers often use ▄︻デ ══━一 around their name; it is long, so keep the name short.",
          ],
        },
      ],
      faqs: [
        { question: "Do the same names work in PUBG Mobile and BGMI?", answer: "The games are closely related, so most styles behave the same, but always check the preview in the game you are renaming in." },
        { question: "Can I use symbols in my clan name?", answer: "Often yes, but clan names can have their own length and character rules. Test the name before you confirm." },
      ],
      related: ["free-fire", "cod-valorant", "fortnite"],
    },
    {
      slug: "roblox",
      name: "Roblox Stylish Names",
      metaTitle: "Roblox Stylish Names: Display Name Ideas and Symbols",
      metaDescription: "Roblox stylish name ideas for display names, groups and bios. Learn which names need plain letters and copy styled versions for where they work.",
      h1: "Roblox Stylish Names",
      intro: "Get stylish name ideas for Roblox, and learn where fancy text works and where Roblox needs plain letters.",
      tool: { type: "names", recipeSet: "minimal", examples: ["Pixel", "Nova", "Blox", "Sunny", "Echo", "Comet"], label: "Type your Roblox name" },
      sections: [
        {
          heading: "Username vs display name",
          paragraphs: [
            "A Roblox username can only contain letters, numbers and one underscore, so fancy letters and symbols will not work there. Display names are separate and are shown above your avatar, but Roblox also filters them, so many styled characters are rejected.",
            "The safest way to stand out is a short, memorable plain name. Use the styled versions below in places that accept them, such as your profile description, group posts or chats outside the game.",
          ],
        },
        { heading: "Testing a name", paragraphs: [TEST_TIP] },
      ],
      faqs: [
        { question: "Why does Roblox say my name is invalid?", answer: "Usernames only allow letters, numbers and an underscore. Display names are filtered too. Try plain letters for the name itself." },
        { question: "Where can I use fancy text on Roblox?", answer: "Profile descriptions and some group text accept more characters than names do. Paste and check the preview before saving." },
      ],
      related: ["minecraft", "fortnite", "free-fire"],
      seeAlso: [{ label: "Aesthetic usernames", href: "/names/aesthetic-usernames" }],
    },
    {
      slug: "fortnite",
      name: "Fortnite Usernames",
      metaTitle: "Fortnite Username Ideas: Stylish Names to Copy",
      metaDescription: "Fortnite username ideas with stylish letters and symbols. See which characters to try in your Epic display name and copy name styles.",
      h1: "Fortnite Username Ideas",
      intro: "Find a stylish Fortnite name. Type your idea and see it in different letter styles and with symbols.",
      tool: { type: "names", recipeSet: "attitude", examples: ["Raven", "Midas", "Jonesy", "Drift", "Frost", "Volt", "Nova", "Blitz"], label: "Type your Fortnite name" },
      sections: [
        {
          heading: "Where your Fortnite name comes from",
          paragraphs: [
            "Fortnite shows your Epic Games display name. You change it in your Epic account settings, and there is a waiting period between changes, so choose carefully.",
            "Epic filters some characters, and a name that looks fine here may be rejected or shown differently in the game. Start with simple styles like bold or small caps, which use the most widely supported characters.",
          ],
        },
        { heading: "Testing a name", paragraphs: [TEST_TIP] },
      ],
      faqs: [
        { question: "How often can I change my Fortnite name?", answer: "Epic only lets you change your display name after a waiting period. Check your Epic account settings for the current rule." },
        { question: "Will friends still find me after a name change?", answer: "Friends you already have stay on your list, but people searching for your old name will not find you." },
      ],
      related: ["free-fire", "pubg-bgmi", "cod-valorant"],
    },
    {
      slug: "minecraft",
      name: "Minecraft Name Generator",
      metaTitle: "Minecraft Name Generator: Username Ideas and Styled Text",
      metaDescription: "Minecraft username ideas plus styled text for servers, books and Discord. Learn why usernames need plain letters and where fancy text works.",
      h1: "Minecraft Name Generator",
      intro: "Get Minecraft name ideas and styled versions for the places that accept them, such as books, signs on some servers and your Discord.",
      tool: { type: "names", recipeSet: "minimal", examples: ["Creeper", "Redstone", "Ender", "Blaze", "Pickaxe", "Nether"], label: "Type your Minecraft name" },
      sections: [
        {
          heading: "Minecraft usernames need plain letters",
          paragraphs: [
            "A Minecraft Java username can only use letters, numbers and underscores, and it has a short length limit. Fancy letters and symbols cannot be part of the username itself.",
            "Many servers let you set a nickname, write in books or put text on signs, and some of these accept Unicode characters. Whether styled letters display depends on the server and the game's fonts, so test them in game.",
          ],
        },
        {
          heading: "Ideas for a good Minecraft name",
          paragraphs: [],
          list: ["Combine a game word with something personal, like Redstone and your name.", "Use an underscore instead of a space.", "Keep it short so it fits above your character."],
        },
      ],
      faqs: [
        { question: "Can I put symbols in my Minecraft username?", answer: "No. Usernames only accept letters, numbers and underscores. Use the styled versions on servers or in chats that support them." },
        { question: "Where does styled text work in Minecraft?", answer: "It depends on the server. Nicknames, books and signs sometimes accept it. Try it, and if you see boxes, the game font does not include those characters." },
      ],
      related: ["roblox", "fortnite", "free-fire"],
    },
    {
      slug: "cod-valorant",
      name: "COD & Valorant Names",
      metaTitle: "COD and Valorant Name Ideas: Stylish Gamer Tags",
      metaDescription: "Stylish name ideas for Call of Duty and Valorant. Type your gamer tag and copy versions with symbols and fancy letters to test in game.",
      h1: "COD and Valorant Name Ideas",
      intro: "Create a sharp gamer tag for Call of Duty or Valorant. Type your name and copy a stylish version to try in game.",
      tool: { type: "names", recipeSet: "attitude", examples: ["Ghost", "Reaper", "Phantom", "Vandal", "Spectre", "Havoc", "Omen", "Jett"], label: "Type your gamer tag" },
      sections: [
        {
          heading: "Before you change your tag",
          paragraphs: [
            "Call of Duty uses your Activision or platform name, and Valorant uses your Riot ID. Both have their own rules for which characters they accept and how often you can change them.",
            TEST_TIP,
          ],
        },
        {
          heading: "Tag ideas that look clean",
          paragraphs: [],
          list: ["Small caps and bold sans styles look tidy on scoreboards.", "One symbol is enough; too many make the tag hard to read.", "Avoid names that look like another player or a pro."],
        },
      ],
      faqs: [
        { question: "Why are my fancy letters replaced or rejected?", answer: "These games filter characters they do not support. Try a simpler style or plain letters with one symbol." },
        { question: "Can I use the same tag in COD and Valorant?", answer: "Yes, if both accept the characters you used. Keeping one tag across games helps friends find you." },
      ],
      related: ["pubg-bgmi", "free-fire", "fortnite"],
    },
  ],
};
