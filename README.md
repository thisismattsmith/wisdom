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

Client-side filter on the homepage. As you type, post cards hide/show based on title, excerpt, tags, and source author. Tag chips do the same. At this scale it's the right tool — if the library grows past ~50 posts, swap in Pagefind for full-text indexed search.

## Renaming the site

The site name "Plain Sense" appears in:
- `src/components/UtilityBar.astro` — `siteName` prop default
- `src/components/Footer.astro` — copy + © line
- `src/layouts/BaseLayout.astro` — meta description default
- `src/pages/index.astro` — page `<title>` and hero eyebrow

Find-and-replace covers it.
