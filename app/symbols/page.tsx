import { HubView } from "@/components/landing/LandingView";
import { SYMBOLS_SECTION as section } from "@/data/landing/symbols";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: section.hubMetaTitle,
  description: section.hubDescription,
  path: section.basePath,
  absoluteTitle: true,
});

export default function SectionHubPage() {
  return <HubView section={section} />;
}
