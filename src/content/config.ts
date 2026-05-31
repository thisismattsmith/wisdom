import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    sourceAuthor: z.string().optional(),
    sourceYear: z.string().optional(),
    // Optional thematic concept shown in the utility bar alongside the author.
    // For Spencer's post this is "Negative Beneficence". Most posts can omit.
    concept: z.string().optional(),
  }),
});

export const collections = { posts };
