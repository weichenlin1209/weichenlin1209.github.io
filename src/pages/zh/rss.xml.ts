import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getCollection, render } from 'astro:content';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { site } from '../../site.config';

function CoverMimeType(url: string): string {
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
  switch (ext) {
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'avif':
      return 'image/avif';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'image/jpeg';
  }
}

export const GET: APIRoute = async (context) => {
  const container = await AstroContainer.create();
  const posts = (await getCollection('blog_zh', ({ data }) => !data.draft))
    .filter((post) => !Number.isNaN(new Date(post.data.pubDate).getTime()))
    .sort((a, b) => b.data.pubDate.localeCompare(a.data.pubDate));

  const siteUrl = (context.site ?? new URL(site.url)).toString().replace(/\/$/, '');

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      let html = await container.renderToString(Content);
      // 相对链接转绝对链接：RSS 阅读器里图片/链接才能正常加载
      html = html.replace(/(src|href)="\/(?!\/)/g, `$1="${siteUrl}/`);

      // 封面图：优先用 frontmatter 的 cover（相对路径转绝对）
      const rawCover: string | undefined = post.data.cover;
      const cover = rawCover
        ? rawCover.startsWith('http')
          ? rawCover
          : `${siteUrl}${rawCover}`
        : undefined;

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: new Date(post.data.pubDate),
        link: `/zh/posts/${post.id}/`,
        content: html,
        ...(cover
          ? {
              enclosure: { url: cover, length: 0, type: CoverMimeType(cover) },
              customData: `<media:content url="${cover}" medium="image" /><media:thumbnail url="${cover}" />`,
            }
          : {}),
      };
    }),
  );

  return rss({
    title: site.name,
    description: site.locales.zh.description,
    site: context.site ?? site.url,
    items,
    customData: '<language>zh-tw</language>',
    xmlns: { media: 'http://search.yahoo.com/mrss/' },
  });
};
