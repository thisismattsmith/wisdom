import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    sourceAuthor: z.string().optional(),
    sourceYear: z.string().optional(),
  }),
});

export const collections = { posts };
