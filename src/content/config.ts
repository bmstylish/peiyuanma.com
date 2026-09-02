import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { BLOG_CATEGORY_KEYS } from '@/utils/routes';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(BLOG_CATEGORY_KEYS),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

const labs = defineCollection({
  type: 'content',
  schema: z.object({
    source: z.string().min(1),
    title: z.string(),
    description: z.string(),
    date: z.date(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    tags: z.array(z.string()).default([]),
    status: z.enum(['planned', 'in-progress', 'complete']),
    draft: z.boolean().default(false),
  }),
});

const writeupSources = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writeup-sources' }),
  schema: z.object({
    name: z.string(),
    type: z.enum(['platform', 'event', 'independent']),
    website: z.union([z.string().url(), z.literal('')]).optional(),
    order: z.number().int().default(0),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    github: z.union([z.string().url(), z.literal('')]).optional(),
    demo: z.union([z.string().url(), z.literal('')]).optional(),
    status: z.enum(['planned', 'active', 'complete', 'archived']),
    lessons: z.string().optional(),
    writeup: z.boolean().default(false),
    journal: z.string().optional(),
    order: z.number().int().default(0),
    draft: z.boolean().default(false),
  }),
});

const ctfDays = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ctf-days' }),
  schema: z.object({
    project: z.string(),
    day: z.number().int().min(1),
    week: z.number().int().min(1),
    title: z.string(),
    description: z.string(),
    status: z.enum(['planned', 'in-progress', 'complete']).default('planned'),
    date: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, labs, writeupSources, projects, ctfDays };
