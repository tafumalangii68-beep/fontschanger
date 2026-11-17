import type { LandingSection } from "@/data/landing/types";

const LIMITS =
  "Styled letters are Unicode characters, so they can be hard for screen readers and are not matched by search. Use them for a short line, like a name or heading, and keep important details in plain text.";

export const SOCIAL_SECTION: LandingSection = {
  id: "social",
  basePath: "/social-media",
  name: "Social Media Fonts",
  hubTitle: "Fonts for Social Media",
  hubMetaTitle: "Social Media Fonts: WhatsApp, Facebook, YouTube, X and More",
  hubDescription:
    "Stylish fonts for WhatsApp, Facebook, YouTube, X, Snapchat, Telegram and LinkedIn. Learn each app's built-in formatting and copy fancy text that works.",
  hubIntro: "Every app handles text differently. Pick yours to see its built-in formatting, and copy stylish text that works where formatting does not.",
  hubSections: [
    {
      heading: "Built-in formatting vs fancy text",
      paragraphs: [
        "Some apps, like WhatsApp and Telegram, have their own bold and italic formatting for messages. Others, like Facebook posts and LinkedIn, have none. Fancy text fills that gap: the letters themselves are styled Unicode characters, so the look survives copy and paste in almost any app.",
        LIMITS,
      ],
    },
  ],
  pages: [
    {
      slug: "whatsapp",
      name: "WhatsApp Stylish Text",
      metaTitle: "WhatsApp Stylish Text: Bold, Italic and Fancy Fonts",
      metaDescription: "Write bold, italic and strikethrough text in WhatsApp, and copy fancy fonts for your name, about and status. Simple steps with examples.",
      h1: "WhatsApp Stylish Text and Fonts",
      intro: "Use WhatsApp's own formatting for messages, or copy fancy text for your name, about line and status.",
      tool: { type: "generator", sample: "Good morning", collection: "social" },
      sections: [
        {
          heading: "WhatsApp's built-in formatting",
          paragraphs: ["WhatsApp formats messages when you wrap words in these symbols. It only works in chats, not in your name or about."],
          list: [
            "*bold* gives bold text.",
            "_italic_ gives italic text.",
            "~strikethrough~ draws a line through text.",
            "```monospace``` (three backticks on each side) gives a typewriter look.",
          ],
        },
        {
          heading: "Fancy text for your name, about and status",
          paragraphs: [
            "Your WhatsApp name, about line and status do not support the symbols above, but they do accept Unicode characters. Copy a style from the generator and paste it in Settings, under your profile.",
            LIMITS,
          ],
        },
      ],
      faqs: [
        { question: "Why don't the * and _ symbols work in my WhatsApp name?", answer: "That formatting only works in chat messages. For your name or about, paste styled Unicode text instead." },
        { question: "Can the other person see my fancy text?", answer: "Yes, as long as their phone has a font for those characters. Bold, italic and cursive styles are the most widely supported." },
      ],
      related: ["snapchat-telegram", "facebook", "linkedin"],
      seeAlso: [{ label: "Bold text generator", href: "/fonts/bold-text" }],
    },
    {
      slug: "facebook",
      name: "Facebook Fonts & Bio",
      metaTitle: "Facebook Fonts: Stylish Text for Posts, Bio and Comments",
      metaDescription: "Copy stylish fonts for Facebook posts, comments and your bio. Learn where Facebook accepts fancy text and why profile names have stricter rules.",
      h1: "Facebook Fonts and Stylish Bio Text",
      intro: "Facebook has no bold or italic button for normal posts. Copy styled text for posts, comments and your bio instead.",
      tool: { type: "generator", sample: "Weekend vibes", collection: "social" },
      sections: [
        {
          heading: "Where fancy text works on Facebook",
          paragraphs: [
            "Posts, comments, your intro (bio) and Page descriptions accept Unicode characters, so styled text keeps its look there.",
            "Profile names follow Facebook's name rules, which do not allow symbols or unusual characters. Keep your name plain and use styled text in your intro instead.",
          ],
        },
        { heading: "Use it in moderation", paragraphs: [LIMITS] },
      ],
      faqs: [
        { question: "Can I make my Facebook name bold or cursive?", answer: "Facebook's name rules do not allow unusual characters in profile names, so a styled name will usually be rejected. Use it in your intro instead." },
        { question: "Does fancy text affect my post reach?", answer: "Facebook does not publish a rule about it, but styled words are not matched by search, so people may not find your post by those words." },
      ],
      related: ["whatsapp", "youtube", "twitter-x"],
      seeAlso: [{ label: "Bio generator", href: "/#bio-generator" }],
    },
    {
      slug: "youtube",
      name: "YouTube Channel Fonts",
      metaTitle: "YouTube Fonts: Stylish Text for Channel Names and Comments",
      metaDescription: "Make stylish text for your YouTube channel description and comments. Learn YouTube's own bold and italic formatting for comments.",
      h1: "YouTube Channel Fonts and Comment Styles",
      intro: "Style your YouTube comments with built-in formatting, or copy fancy text for your channel description.",
      tool: { type: "generator", sample: "New video every Friday", collection: "social" },
      sections: [
        {
          heading: "Formatting in YouTube comments",
          paragraphs: ["YouTube comments support simple formatting:"],
          list: ["*bold* for bold", "_italic_ for italic", "-strikethrough- for crossed-out text"],
        },
        {
          heading: "Fancy text for your channel",
          paragraphs: [
            "Your channel description and video descriptions accept Unicode characters, so a styled heading or tagline keeps its look. Channel names are reviewed more strictly, so test a styled name before relying on it.",
            LIMITS,
          ],
        },
      ],
      faqs: [
        { question: "Will a fancy channel name hurt search?", answer: "People usually search with normal letters, which do not match styled characters. Keep your channel name searchable and style your description instead." },
        { question: "Can I use fancy text in video titles?", answer: "Titles accept many Unicode characters, but styled words are harder to find in search. Use them sparingly." },
      ],
      related: ["twitter-x", "facebook", "whatsapp"],
    },
    {
      slug: "twitter-x",
      name: "Twitter (X) Fonts",
      metaTitle: "Twitter (X) Fonts: Bold and Stylish Text for Posts and Bio",
      metaDescription: "Copy bold, italic and stylish fonts for X (Twitter) posts, display names and bios. Tips to keep your posts readable and searchable.",
      h1: "Twitter (X) Fonts for Posts and Bio",
      intro: "Standard X posts have no bold button. Copy styled text for your bio, display name or one line of a post.",
      tool: { type: "generator", sample: "Big news today", collection: "social" },
      sections: [
        {
          heading: "Where styled text works on X",
          paragraphs: [
            "Your display name, bio and posts accept Unicode characters, so bold or cursive styles keep their look. Your @handle only allows letters, numbers and underscores, so it cannot be styled.",
            "Styled characters may count as two characters toward the post limit, because many of them need extra storage.",
          ],
        },
        { heading: "Keep it readable", paragraphs: [LIMITS] },
      ],
      faqs: [
        { question: "Can I style my @handle?", answer: "No. Handles only accept letters, numbers and underscores. Style your display name instead." },
        { question: "Why did my post hit the limit sooner?", answer: "Many styled letters take more storage than normal letters, so they can count as two characters." },
      ],
      related: ["youtube", "linkedin", "facebook"],
    },
    {
      slug: "snapchat-telegram",
      name: "Snapchat & Telegram Fonts",
      metaTitle: "Snapchat and Telegram Fonts: Stylish Names and Text",
      metaDescription: "Stylish fonts for Snapchat display names and Telegram names, bios and messages. Learn Telegram's built-in formatting and copy fancy text.",
      h1: "Snapchat and Telegram Fonts",
      intro: "Style your Snapchat display name or your Telegram name and bio. Telegram also has its own formatting for messages.",
      tool: { type: "generator", sample: "Stay wild", collection: "social" },
      sections: [
        {
          heading: "Snapchat",
          paragraphs: [
            "Your Snapchat display name accepts emoji and many Unicode characters, so styled letters often work there. Your username is fixed to basic letters, numbers and a few punctuation marks, so it cannot be styled.",
          ],
        },
        {
          heading: "Telegram",
          paragraphs: [
            "In Telegram chats you can select text and choose Format (or right-click on desktop) to make it bold, italic, underlined, crossed out or monospace. Your name and bio accept styled Unicode text from the generator.",
            LIMITS,
          ],
        },
      ],
      faqs: [
        { question: "Why can't I style my Snapchat username?", answer: "Usernames only allow basic characters. Use styled text in your display name, which is what friends see." },
        { question: "How do I make bold text in Telegram?", answer: "Select the text in the message box, open the formatting menu and choose Bold. No copy and paste needed." },
      ],
      related: ["whatsapp", "twitter-x", "facebook"],
    },
    {
      slug: "linkedin",
      name: "LinkedIn Bold & Italic Text",
      metaTitle: "LinkedIn Bold and Italic Text Generator for Posts",
      metaDescription: "LinkedIn posts have no bold button. Copy bold and italic text for your posts and headline, and learn the accessibility trade-offs first.",
      h1: "LinkedIn Bold and Italic Text",
      intro: "LinkedIn posts have no bold or italic formatting. Copy styled text for a headline or one key line, and keep the rest plain.",
      tool: { type: "generator", sample: "Key takeaway", filter: "bold" },
      sections: [
        {
          heading: "Using bold text on LinkedIn",
          paragraphs: [
            "Paste bold or italic Unicode text into a post, comment or your headline to highlight one line, such as a heading or key result.",
            "Recruiters and LinkedIn search look for normal words. Styled words are not matched, so never style your job title, skills or company names.",
          ],
        },
        { heading: "Accessibility", paragraphs: [LIMITS] },
      ],
      faqs: [
        { question: "Is bold text allowed on LinkedIn?", answer: "Yes, Unicode characters are allowed. Use them sparingly so your post stays readable and searchable." },
        { question: "Why does my bold text look different on another device?", answer: "Each device draws the characters with its own fonts, so the exact look can vary slightly." },
      ],
      related: ["twitter-x", "facebook", "whatsapp"],
      seeAlso: [{ label: "Bold text generator", href: "/fonts/bold-text" }],
    },
  ],
};
