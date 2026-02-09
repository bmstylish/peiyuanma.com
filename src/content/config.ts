import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

const labs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    tools: z.array(z.string()).default([]),
    status: z.enum(['planned', 'in-progress', 'complete']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, labs };
