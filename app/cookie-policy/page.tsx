import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import InfoPage from "@/components/InfoPage";
import { CONSENT_KEY } from "@/lib/consent";
import { buildMetadata } from "@/lib/seo";

const title = "Cookie Policy";
const description =
  "Which cookies and browser storage Fonts Changer uses, why, and how to change your cookie settings at any time.";

export const metadata = buildMetadata({ title, description, path: "/cookie-policy" });

export default function CookiePolicyPage() {
  return (
    <InfoPage title={title} description={description} path="/cookie-policy" showUpdated>
      <p>
        This page explains how Fonts Changer uses cookies and similar browser storage. We keep this to a minimum: the site
        does not set any tracking, analytics or advertising cookies.
      </p>

      <h2>What we store</h2>
      <div className="not-prose overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="bg-sand text-muted">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-medium">Name</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Type</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Purpose</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Kept for</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            <tr>
              <td className="px-4 py-3 font-mono text-xs">{CONSENT_KEY}</td>
              <td className="px-4 py-3">Local storage, necessary</td>
              <td className="px-4 py-3">Remembers your cookie choice</td>
              <td className="px-4 py-3">Until you change it or clear browser data</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">fc-saved-styles</td>
              <td className="px-4 py-3">Local storage, functional</td>
              <td className="px-4 py-3">Remembers styles you saved. Only created when you tap a heart.</td>
              <td className="px-4 py-3">Until you remove the hearts or clear browser data</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">fc-theme</td>
              <td className="px-4 py-3">Local storage, functional</td>
              <td className="px-4 py-3">Remembers whether you chose light or dark mode. Only created when you use the theme button.</td>
              <td className="px-4 py-3">Until you change it or clear browser data</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Both items stay in your browser and are never sent to us. Storage used to remember a consent choice may itself be
        covered by privacy laws in some regions. We keep it because it is needed to respect your choice.
      </p>

      <h2>Optional categories</h2>
      <p>
        The cookie settings include <strong>Analytics</strong> and <strong>Marketing</strong> categories. Both are off by
        default. No analytics or marketing service is currently installed, so turning them on has no effect today. If we
        add such a service, it will only run after you have allowed the matching category, and we will update this page.
      </p>

      <h2>Change your settings</h2>
      <p>
        You can review or change your choice at any time:{" "}
        <CookieSettingsButton className="font-medium text-accent-strong underline underline-offset-2" />. You can also delete
        all stored data for this site in your browser&apos;s settings.
      </p>

      <p>
        For more details, read the <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </InfoPage>
  );
}
