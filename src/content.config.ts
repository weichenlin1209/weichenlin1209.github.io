import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts_zh = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/contents/zh/posts",
  }),
  schema: z.object({
    title: z.string(),
    published: z.date(),
    draft: z.boolean().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    sourceLink: z.string().optional(),
    licenseName: z.string().optional(),
    licenseUrl: z.string().optional(),
  }),
});

const posts_en = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/contents/en/posts",
  }),
  schema: z.object({
    title: z.string(),
    published: z.date(),
    draft: z.boolean().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    sourceLink: z.string().optional(),
    licenseName: z.string().optional(),
    licenseUrl: z.string().optional(),
  }),
});

const specs_zh = defineCollection({
  loader: glob({
    pattern: "**/*",
    base: "src/contents/zh/specs",
  }),
});

const specs_en = defineCollection({
  loader: glob({
    pattern: "**/*",
    base: "src/contents/en/specs",
  }),
});

export const collections = { posts_zh, posts_en, specs_zh, specs_en };