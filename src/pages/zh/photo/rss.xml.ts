import fs from 'node:fs';
import path from 'node:path';
import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import rss from '@astrojs/rss';
import { site } from '../../../site.config';

const imageExt = /\.(jpg|jpeg|png|webp|gif|avif)$/i;

function imageMimeType(url: string): string {
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
    default:
      return 'image/jpeg';
  }
}

const albumRoot = path.join(process.cwd(), 'src', 'assets', 'album');
const albumModules = import.meta.glob(
  '/src/assets/album/**/*.{jpg,jpeg,png,webp,gif,avif}',
  { eager: true, import: 'default' },
) as Record<string, ImageMetadata>;

export const GET: APIRoute = async (context) => {
  const siteUrl = (context.site ?? new URL(site.url)).toString().replace(/\/$/, '');
  const albums = fs.existsSync(albumRoot)
    ? fs.readdirSync(albumRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => {
          const albumPath = path.join(albumRoot, entry.name);
          const files = fs.readdirSync(albumPath)
            .filter((file) => imageExt.test(file))
            .sort();
          const images = files
            .map((file) => albumModules[`/src/assets/album/${entry.name}/${file}`])
            .filter((image): image is ImageMetadata => Boolean(image));
          const pubTimestamp = files.reduce((latest, file) => {
            const modified = fs.statSync(path.join(albumPath, file)).mtimeMs;
            return Math.max(latest, modified);
          }, 0);

          return {
            name: entry.name,
            images,
            pubTimestamp,
            coverSize: files.length > 0
              ? fs.statSync(path.join(albumPath, files[0])).size
              : 0,
          };
        })
        .filter((album) => album.images.length > 0)
        .sort((a, b) => b.pubTimestamp - a.pubTimestamp)
    : [];

  const items = await Promise.all(albums.map(async (album) => {
    const cover = await getImage({ src: album.images[0], width: 1200, format: 'webp' });
    const coverUrl = `${siteUrl}${cover.src}`;
    const albumUrl = `/zh/photo/${encodeURIComponent(album.name)}/`;

    return {
      title: album.name,
      description: `${album.images.length} 張照片`,
      pubDate: new Date(album.pubTimestamp),
      link: albumUrl,
      content: `<p>${album.images.length} 張照片</p><p><img src="${coverUrl}" alt="${album.name}" /></p>`,
      enclosure: { url: coverUrl, length: album.coverSize, type: imageMimeType(coverUrl) },
      customData: `<media:content url="${coverUrl}" medium="image" /><media:thumbnail url="${coverUrl}" />`,
    };
  }));

  return rss({
    title: `${site.name} - 相簿`,
    description: 'Windson 的相簿更新',
    site: new URL('/zh/photo/', siteUrl),
    items,
    customData: `<language>zh-tw</language><atom:link href="${siteUrl}/zh/photo/rss.xml" rel="self" type="application/rss+xml" />`,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      media: 'http://search.yahoo.com/mrss/',
    },
  });
};
