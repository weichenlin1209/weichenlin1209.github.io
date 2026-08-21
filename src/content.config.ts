import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  cover: z.string().optional(),
  draft: z.boolean().optional(),
  licenseName: z.string().optional(),
  licenseUrl: z.string().optional(),
});

// 文章檔案依 pubDate 存放在 <年>/<月>/ 子資料夾，
// 但 ID（=網址 slug）只取檔名，讓 /<slug> 網址 slug
const idFromFilename = ({ entry }: { entry: string }) =>
  entry.split('/').pop()!.replace(/\.(md|mdx)$/, '');

const blog_zh = defineCollection({
  loader: glob({
    base: './src/content/zh/posts',
    pattern: '**/*.{md,mdx}',
    generateId: idFromFilename,
  }),
  schema: blogSchema,
});

const blog_en = defineCollection({
  loader: glob({
    base: './src/content/en/posts',
    pattern: '**/*.{md,mdx}',
    generateId: idFromFilename,
  }),
  schema: blogSchema,
});

const specs_zh = defineCollection({
  loader: glob({ base: './src/content/zh/specs', pattern: '**/*' }),
});

const specs_en = defineCollection({
  loader: glob({ base: './src/content/en/specs', pattern: '**/*' }),
});

export const collections = { blog_zh, blog_en, specs_zh, specs_en };
