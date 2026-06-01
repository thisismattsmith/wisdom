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

Output goes to `./dist/`. Static site, deploy anywhere (Netlify, Vercel, Cloudflare Pages).

## Adding a new post

1. Create a `.mdx` file in `src/content/posts/your-slug.mdx`.
2. Frontmatter goes at the top (see schema below). The filename becomes the URL.
3. Import the components you need and compose the post.

Minimal example:

```mdx
---
title: "Your Post Title"
excerpt: "One-sentence summary shown on the homepage card."
date: 2026-06-01
tags: [tag-one, tag-two]
sourceAuthor: "Author Name"
sourceYear: "1850"
---
import Hero from '../../components/post/Hero.astro'
import SourceQuote from '../../components/post/SourceQuote.astro'

<Hero eyebrow="Eyebrow text" title={"Title with line break\nallowed"}>
  Subhead copy.
</Hero>

<SourceQuote author="Author Name" work="Book Title" year="1850">
  Original text…
</SourceQuote>

Inline MDX prose, _italics_, **bold**, all works.
```

The homepage auto-discovers it. New tags appear in the filter chips automatically.

## Frontmatter schema

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Post title |
| `excerpt` | string | yes | Shown on homepage card |
| `date` | YYYY-MM-DD | yes | Used for sort order |
| `tags` | string[] | yes | Lowercase, hyphenated |
| `sourceAuthor` | string | no | Shown on card + in utility bar |
| `sourceYear` | string | no | Pairs with author |
| `concept` | string | no | Extra label in utility bar (e.g. "Negative Beneficence") |

Schema lives in `src/content/config.ts`.

## Component kit

Posts compose from a small set of reusable components. Use what fits, skip what doesn't, fall back to raw HTML inline whenever a post needs something the kit doesn't provide.

### Structural — `src/components/post/`

- **`<Hero>`** — eyebrow + title (use `\n` for line breaks) + sub copy via slot
- **`<SourceQuote>`** — quote block with author/work/year citation
- **`<MainPoints>`** — numbered list of titled paragraphs (HTML allowed in body)

### Diagrams — `src/components/diagrams/`

- **`<DecisionTree>`** — sequential vertical tree, N nodes with question/plain/original/branches, terminal outcome cards
- **`<TwoColumnFlowchart>`** — left/right weighing chart with start node, two columns of cards, weigh node, two result cards
- **`<Hierarchy>`** — three-tier taxonomy: root → branches → optional leaves. Use for "X breaks down into Y and Z" structures (taxonomies, classifications). Cap at 3 levels — deeper gets unreadable.

Each diagram takes structured data via props. See the existing posts (`spencer-correct-or-stay-silent.mdx`, `aristotle-two-kinds-of-excellence.mdx`) for full examples.

### When the kit doesn't fit

Inline raw HTML/SVG directly in the MDX body. MDX accepts it without complaint. If the same pattern appears in a second post, lift it into a new component in `src/components/diagrams/`.

## File structure

```
src/
├── content/
│   ├── config.ts                 # Zod schema for posts
│   └── posts/*.mdx                # one MDX file per post
├── layouts/
│   └── BaseLayout.astro           # utility bar + footer wrapper
├── components/
│   ├── PostCard.astro             # homepage card
│   ├── UtilityBar.astro           # sticky bar, home link, named slot for right side
│   ├── Footer.astro
│   ├── post/                      # structural components (Hero, SourceQuote, MainPoints)
│   └── diagrams/                  # diagram components (DecisionTree, TwoColumnFlowchart, Hierarchy)
├── pages/
│   ├── index.astro                # homepage with hero, search, tag filter, post grid
│   └── posts/[...slug].astro      # dynamic route for all MDX posts
└── styles/
    └── global.css                 # design tokens + reset
```

## Search

Full-text search powered by [Pagefind](https://pagefind.app). The index is generated at build time from every post's rendered HTML — every word in the source quote, decision tree, hierarchy, and main points is searchable, not just the title and excerpt.

Tag chips act as Pagefind filters; the search input does full-text matching. They compose: typing "ethics" while the `social-discourse` tag is active returns only posts in that tag containing "ethics".

### Dev-mode quirk

Pagefind generates its index at build time. In dev mode, `astro-pagefind` serves the index from the most recent `dist/` folder — so **you must run `npm run build` once before search works in `npm run dev`**.

If you haven't built yet, the search UI still renders and posts still display; queries just silently fail (the page logs a console warning). Build once and reload.

When you add new posts or edit existing ones, run `npm run build` again to refresh the index for dev mode. Production builds always rebuild the index automatically.

## Renaming the site

The site name "Plain Sense" appears in:
- `src/components/UtilityBar.astro` — `siteName` prop default
- `src/components/Footer.astro` — copy + © line
- `src/layouts/BaseLayout.astro` — meta description default
- `src/pages/index.astro` — page `<title>` and hero eyebrow

Find-and-replace covers it.
