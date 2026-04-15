import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    category: z.enum([
      'getting-started',
      'tips',
      'workflow',
      'comparison',
      'troubleshooting',
      'advanced',
    ]),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    readingTime: z.number(),
    affiliateLinks: z.array(z.object({
      service: z.string(),
      url: z.string(),
      label: z.string(),
    })).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
