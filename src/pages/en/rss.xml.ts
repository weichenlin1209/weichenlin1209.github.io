import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { GetCoverURLForUnspecifiedEntry } from "../../utils/cover";
import { IdToSlug } from "../../utils/hash";

function GetCoverMimeType(url: string): string {
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase() ?? "";
  switch (ext) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "avif":
      return "image/avif";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    default:
      return "image/jpeg";
  }
}

function GetCoverURL(post: any): string {
  return post.data.cover ?? GetCoverURLForUnspecifiedEntry(IdToSlug(post.id));
}

export const GET: APIRoute = async (context) => {
  const posts_en = await getCollection("posts_en", ({ data }) => {
    return !data.draft && data.title && data.published;
  });

  return rss({
    title: "Windson's Blog",
    description: "Windson's weekly diary and tech notes (English)",
    site: context.site!,
    customData: `<language>en-us</language>`,
    xmlns: { media: "http://search.yahoo.com/mrss/" },

    items: posts_en
      .sort(
        (a, b) =>
          new Date(b.data.published).getTime() -
          new Date(a.data.published).getTime()
      )
      .map((post) => {
        const html = post.rendered?.html ?? "";
        const cover = GetCoverURL(post);

        const summary = html
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .slice(0, 200);

        return {
          title: post.data.title,
          pubDate: post.data.published,
          link: `/en/posts/${IdToSlug(post.id)}`,

          description: summary,
          content: `<img src="${cover}" alt="" />${html}`,
          enclosure: {
            url: cover,
            length: 0,
            type: GetCoverMimeType(cover),
          },
          customData: `<media:content url="${cover}" medium="image" /><media:thumbnail url="${cover}" />`,
        };
      }),
  });
};