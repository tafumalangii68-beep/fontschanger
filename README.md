# Fonts Changer

A free, browser-based fancy text generator built with Next.js (App Router), TypeScript and Tailwind CSS.
It converts plain text into 56 Unicode text styles (cursive, bold, aesthetic, small, glitch, upside down, and more) that people can copy and paste.

- No backend, database, API keys or `.env` files.
- Every page is statically prerendered.
- The generator runs fully in the browser and keeps working offline once the page has loaded.
- No analytics, ads or third-party scripts.

## Requirements

- Node.js 20 or newer (tested with Node 26)
- npm

## Commands

```bash
npm install        # install dependencies
npm run dev        # development server at http://localhost:3000
npm run build      # production build (also runs lint and type checks)
npm start          # serve the production build
npm run lint       # ESLint
npm run typecheck  # TypeScript only
npm test           # unit tests for the font engine (Node's built-in test runner)
```

## Deploy

This is a standard Next.js app. The easiest options:

- **Vercel:** import the project and deploy. No settings or environment variables are needed.
- **Netlify / Cloudflare Pages:** use the Next.js preset with build command `npm run build`.
- **Any Node host:** run `npm run build`, then `npm start`.

After deploying:

1. Point your domain at the host and make sure only one version is used (for example, redirect `www` to the bare domain).
2. Add the site to [Google Search Console](https://search.google.com/search-console) and Bing Webmaster Tools, and submit `https://<your-domain>/sitemap.xml`.

## Before launch (owner checklist)

| Item | Where | Status |
| --- | --- | --- |
| Real contact email | `lib/site-config.ts` → `contactEmail` | **Required.** Empty for now, so the contact page shows "coming soon". |
| Final domain | `lib/site-config.ts` → `url` | Set to `https://fontschanger.app`. Change it if you use another domain. Canonicals, sitemap, robots and OG tags all read this value. |
| Legal review | `app/privacy-policy`, `app/terms-and-conditions`, `app/cookie-policy`, `app/disclaimer` | Written to match the site's actual behavior. Have them reviewed for your jurisdiction, and add a governing-law clause if you need one. |
| Hosting logs | Privacy Policy, section 4 | Check what your hosting provider logs and update the wording if needed. |
| Legal date | `lib/site-config.ts` → `legalUpdated` | Update whenever the legal pages change. |

If you add analytics or ads later, load them only when `hasConsent("analytics")` or `hasConsent("marketing")` from `lib/consent.ts` returns true, listen for `CONSENT_CHANGE_EVENT`, and update the Privacy and Cookie policies.

## Project structure

```
app/                     Routes, layout, sitemap.ts, robots.ts, OG image, icon
  page.tsx               Homepage + generator (targets "fonts changer")
  fonts/page.tsx         Font styles hub
  fonts/[slug]/page.tsx  Category pages (statically generated from data/font-pages.ts)
  about, contact, faq, privacy-policy, terms-and-conditions, cookie-policy, disclaimer
  not-found.tsx          Custom 404 (noindex)
components/              FontGenerator, CookieConsent, SiteHeader/Nav/Footer, Breadcrumbs, FaqList, ...
data/                    Page content (font-pages.ts, faqs.ts)
lib/                     fonts.ts (font engine), site-config.ts, seo.ts, consent.ts
types/                   Shared content types
tests/                   Unit tests for the font engine
```

### Adding a new font style

Add one line to `DEFS` in `lib/fonts.ts`: a name, its categories, and a transform function. Then run `npm test`.

### Adding a new category page

Add an entry to `fontPages` in `data/font-pages.ts`, with unique content. The route, sitemap entry, footer link, homepage link and hub link are all created automatically.

## Keyword map

Search volumes are not included because no keyword tool data was available. Verify the targets with a keyword tool (for example Google Search Console after launch) before expanding.

| Page | Main intent / target query | Related variations |
| --- | --- | --- |
| `/` | fonts changer | font changer, fancy text generator, font generator copy and paste |
| `/fonts/instagram-fonts` | instagram fonts | fonts for instagram bio, instagram name fonts |
| `/fonts/cursive-fonts` | cursive font generator | cursive text, script font copy and paste |
| `/fonts/bold-text` | bold text generator | bold font copy and paste, bold text for social media |
| `/fonts/aesthetic-fonts` | aesthetic fonts | vaporwave text, cute fonts |
| `/fonts/small-text` | small text generator | tiny text, small caps generator |
| `/fonts/glitch-text` | glitch text generator | zalgo text, creepy text |
| `/fonts/upside-down-text` | upside down text | flip text, backwards text |
| `/faq` | questions about Unicode fonts | are fancy fonts accessible, why boxes appear |
| `/fonts` | hub page | font styles list |

Cannibalization notes: the homepage owns the generic "font changer / fancy text" intent. Category pages each own one style and preselect that filter. The Instagram page is platform-specific, so it does not compete with the style pages. The homepage FAQ covers using the tool, while `/faq` covers broader Unicode questions, so they don't overlap.

## Test results (run on 2026-11-14)

- `npm test`: 9/9 font engine tests passed.
- `npm run build`: compiled with no lint or type errors; 23 static routes.
- HTTP checks on the production server: every indexable page returns 200 with a unique title, meta description, canonical URL and exactly one H1. Unknown URLs return 404 with `noindex`. `robots.txt` and `sitemap.xml` (16 URLs) are valid. JSON-LD on the sampled pages (`/`, `/fonts/bold-text`, `/about`) parses as valid JSON. 19 internal links checked, none broken.
- Browser tests (headless Microsoft Edge, 20/20 passed): text conversion, clipboard copy, copy confirmation, filters, search empty state, saved styles persisting after reload, clear button, cookie banner on first visit, reject, persistence across pages, footer Cookie Settings dialog, saving preferences, contact page without a fake form, category preselection, no horizontal overflow at 360px, mobile menu, skip link, no external network requests, no console errors.
- Not run: Lighthouse / Core Web Vitals, and Google's Rich Results Test (it needs a public URL). Run both after deploying.
