# László Tuss — Portfolio

Personal portfolio and app showcase for László Tuss, indie iOS developer. Built with Next.js 15 App Router.

Live at [laszlotuss.com](https://laszlotuss.com)

## What's inside

- **Timeline** — chronological list of apps grouped by year, with ratings, roles, and platform icons
- **App pages** — per-app detail pages with screenshots (grouped by platform), App Store metadata fetched from the iTunes API, description link detection, and affiliate App Store links
- **Support** — `/support` browser with app filtering (indie apps only), animated card list, and URL-persisted selection (`?app=`); `/support/[appid]` for deep-linking; all resolvable via `?app=`, `?appid=`, or `?id=` query params; card logic shared via `src/app/supportLinks.ts`
- **Privacy Policy / Terms** — shared policy page at `/privacy-policy/[app]` and `/privacy-policy?app=`, covering all indie apps
- **Favicons** — per-app rounded tab icons generated server-side via `next/og`; root icon from profile photo; gap-free swap on navigation
- **About** — `/about` page

## Data

Apps are defined in `src/app/apps.json`. Each entry can be:

- **App Store app** — provide an `appid`; name, icon, description, screenshots, rating and metadata are fetched from the iTunes Lookup API (cached 24 h, memoized per request via React `cache`)
- **Local/delisted app** — omit `appid`; supply `name`, `icon`, and `releaseDate` directly

Optional flags per app:

| Flag | Effect |
|---|---|
| `sticker` | Shows iMessage sticker support articles |
| `subscription` | Shows subscription management article + purchase history |
| `purchase` | Shows purchase history articles |
| `watch` | Shows Apple Watch setup article (also auto-shown when watchOS screenshots exist) |
| `pip` | Shows Picture in Picture article |
| `website` | Adds a Website button next to the App Store button |
| `role` | `"indie"` (default) / `"co-owner"` / `"contract"` |

Screenshots are discovered automatically from `public/screens/<appid|id>/` and grouped by filename prefix (`iPhone_`, `iPad_`, `macOS_`, `tvOS_`, `watchOS_`).

## Development

```bash
yarn dev
```

Build (requires the NVM node path on Apple Silicon):

```bash
PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH" node node_modules/next/dist/bin/next build
```

## SEO

- `robots.ts` — allows all crawlers, points to the sitemap
- `sitemap.ts` — dynamically lists `/`, `/about`, `/support`, and every app page
- Per-app `generateMetadata` — title, description (first 160 chars of App Store copy), `og:image` (app icon), Twitter card
- JSON-LD `SoftwareApplication` schema on every app page — enables Google rich results (name, rating, price, platform)
- Google Search Console verified via meta tag + HTML file

## Tech

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS
- `next/og` (Satori) for server-rendered favicon images
- iTunes Search/Lookup API for App Store metadata
- Vercel (hosting), Vercel Web Analytics + Speed Insights
