import type { SymbolGroup } from "@/components/landing/SymbolGrid";
import type { Filter } from "@/components/CategoryFilters";
import type { CollectionId } from "@/lib/collections";
import type { RecipeSet } from "@/lib/name-recipes";
import type { ContentSection, Faq } from "@/types/content";

/** The interactive part at the top of a landing page. */
export type LandingTool =
  | { type: "generator"; sample: string; filter?: Filter; collection?: CollectionId }
  | { type: "names"; recipeSet: RecipeSet; examples: string[]; couple?: boolean; label?: string }
  | { type: "symbols"; groups: SymbolGroup[] };

export type LandingPage = {
  slug: string;
  /** Short name used in menus and cards. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  tool: LandingTool;
  sections: ContentSection[];
  faqs: Faq[];
  /** Slugs of other pages in the same section. */
  related: string[];
  /** Extra links to tools and pages elsewhere on the site. */
  seeAlso?: { label: string; href: string }[];
};

export type LandingSection = {
  id: string;
  /** URL prefix, e.g. "/gaming-names". */
  basePath: string;
  /** Breadcrumb and card label, e.g. "Gaming Names". */
  name: string;
  hubTitle: string;
  hubMetaTitle: string;
  hubDescription: string;
  hubIntro: string;
  hubSections: ContentSection[];
  pages: LandingPage[];
};
