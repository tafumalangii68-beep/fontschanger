/**
 * Illustrations used across the site, with their alt text. Static imports let
 * next/image know each size up front (no layout shift) and serve resized WebP/AVIF.
 * `framed` artwork has its own background, so it is shown inside a rounded card;
 * the rest has a transparent background and floats on the page.
 */
import type { StaticImageData } from "next/image";
import about from "@/public/images/about.webp";
import aestheticFonts from "@/public/images/aesthetic-fonts.webp";
import bioGenerator from "@/public/images/bio-generator.webp";
import boldText from "@/public/images/bold-text.webp";
import collectionAesthetic from "@/public/images/collection-aesthetic.webp";
import collectionCreative from "@/public/images/collection-creative.webp";
import collectionGaming from "@/public/images/collection-gaming.webp";
import collectionSocial from "@/public/images/collection-social.webp";
import ctaBanner from "@/public/images/cta-banner.webp";
import cursiveFonts from "@/public/images/cursive-fonts.webp";
import faq from "@/public/images/faq.webp";
import fontOfDayBg from "@/public/images/font-of-day-bg.webp";
import fontStyles from "@/public/images/font-styles.webp";
import glitchText from "@/public/images/glitch-text.webp";
import instagramFonts from "@/public/images/instagram-fonts.webp";
import notFound from "@/public/images/not-found.webp";
import platforms from "@/public/images/platforms.webp";
import smallText from "@/public/images/small-text.webp";
import step1 from "@/public/images/step-1.webp";
import step2 from "@/public/images/step-2.webp";
import step3 from "@/public/images/step-3.webp";
import step4 from "@/public/images/step-4.webp";
import textDecorator from "@/public/images/text-decorator.webp";
import upsideDownText from "@/public/images/upside-down-text.webp";
import type { CollectionId } from "@/lib/collections";

export type Art = { src: StaticImageData; alt: string; framed?: boolean };

export const ART = {
  fontStyles: { src: fontStyles, alt: "Two glossy tiles showing the letters Aa in a bold serif and a flowing cursive style" },
  textDecorator: { src: textDecorator, alt: "Browser window with the letters Aa framed by wings, brackets, stars and a small heart" },
  faq: { src: faq, alt: "Purple speech bubble with a question mark next to a white reply bubble with three dots" },
  about: { src: about, alt: "App window showing a large purple Aa beside a small potted plant and a sparkle" },
  notFound: {
    src: notFound,
    alt: "Confused purple Aa character scratching its head while reading a map",
    framed: true,
  },
  platforms: {
    src: platforms,
    alt: "Three app layouts with styled names: a social profile, a gaming chat window and a short video caption",
    framed: true,
  },
  bioGenerator: {
    src: bioGenerator,
    alt: "Profile card being assembled from an avatar, a stylish name and emoji tiles while a magic wand adds sparkles",
    framed: true,
  },
  ctaBanner: { src: ctaBanner, alt: "", framed: true },
  fontOfDayBg: { src: fontOfDayBg, alt: "", framed: true },
} satisfies Record<string, Art>;

/** Hero artwork for each font category page, keyed by slug. */
export const CATEGORY_ART: Record<string, Art> = {
  "instagram-fonts": {
    src: instagramFonts,
    alt: "Phone showing a profile page with a cursive name, surrounded by glossy hearts and sparkles",
  },
  "cursive-fonts": { src: cursiveFonts, alt: "Purple fountain pen writing the letters Aa in flowing glossy cursive" },
  "bold-text": { src: boldText, alt: "Chunky purple letter B on a stand next to a navy weight with a dumbbell icon" },
  "aesthetic-fonts": {
    src: aestheticFonts,
    alt: "Pastel window with a crescent moon, soft clouds and the letters a, e and s floating in a dreamy sky",
  },
  "small-text": {
    src: smallText,
    alt: "Purple magnifying glass enlarging tiny letters aa on a lavender card",
    framed: true,
  },
  "glitch-text": {
    src: glitchText,
    alt: "Letters Aa split into glitchy slices with pink and cyan offsets on a dark neon card",
    framed: true,
  },
  "upside-down-text": {
    src: upsideDownText,
    alt: "Purple letters Aa flipped upside down inside circular arrows, next to an upside-down smiling face",
    framed: true,
  },
};

export const COLLECTION_ART: Record<CollectionId, Art> = {
  gaming: { src: collectionGaming, alt: "Game controller wearing a golden crown on a neon stage", framed: true },
  social: { src: collectionSocial, alt: "Phone with a photo post, chat bubbles, hearts and a camera", framed: true },
  aesthetic: { src: collectionAesthetic, alt: "Crescent moon, pastel clouds and cherry blossoms in a lavender sky", framed: true },
  creative: { src: collectionCreative, alt: "Paint palette and brush with bubbles and confetti", framed: true },
};

/** How-to steps on the homepage, in order. */
export const STEP_ART: Art[] = [
  { src: step1, alt: "Keyboard key labelled Aa with a text cursor above it", framed: true },
  { src: step2, alt: "Three cards showing Aa in different styles, the cursive one highlighted", framed: true },
  { src: step3, alt: "Finger tapping a Copy button with a check mark popping up", framed: true },
  { src: step4, alt: "Phone text field with Aa typed in and a Paste bubble above it", framed: true },
];
