# Plain Sense

A small Astro site that translates classical and historical writing into plain language and simple decision frameworks for modern public discourse.

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Output goes to `./dist/`. Deploy to Netlify, Vercel, or any static host.

## Structure

- `src/pages/index.astro` — homepage with hero, search, tag filter, and post grid
- `src/pages/posts/*.astro` — full post pages, each self-contained with its own styles
- `src/content/posts/*.json` — post metadata (drives the homepage card grid and tag list)
- `src/content/config.ts` — content collection schema (Zod)
- `src/layouts/BaseLayout.astro` — wrapper with sticky utility bar + footer
- `src/components/UtilityBar.astro` — sticky bar with home link, slotted right side
- `src/components/Footer.astro` — site purpose + attribution
- `src/components/PostCard.astro` — homepage card with `data-tags` and `data-searchable` attributes used by client-side filter
- `src/styles/global.css` — design tokens (Nike-inspired palette) + shared hero styles

## Adding a new post

1. Drop a metadata JSON file in `src/content/posts/your-slug.json` matching the schema in `src/content/config.ts`.
2. Create the corresponding page at `src/pages/posts/your-slug.astro` using `BaseLayout`.

The homepage will pick it up automatically and add any new tags to the filter chips.

## Search

Client-side filter on the homepage. As you type, post cards hide/show based on title, excerpt, tags, and source author. No build-time indexer needed at this scale; if the library grows past ~50 posts, consider Pagefind.

## Renaming the site

The site name "Plain Sense" appears in:
- `src/components/UtilityBar.astro` — default `siteName` prop
- `src/components/Footer.astro` — copy + copyright line
- `src/layouts/BaseLayout.astro` — meta description
- `src/pages/index.astro` — page title, hero eyebrow

A find-and-replace on "Plain Sense" covers it.
