import type { FontCategory } from "@/lib/fonts";

export type Faq = { question: string; answer: string };

export type ContentSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type Example = { label: string; plain: string; styleId: string };

export type FontPage = {
  slug: string;
  /** Short name used in navigation and cards. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  /** Generator filter pre-selected on this page. */
  category: FontCategory;
  sample: string;
  examples: Example[];
  sections: ContentSection[];
  faqs: Faq[];
  related: string[];
  /** Optional blog guide linked below the generator. */
  guide?: { label: string; href: string };
};
