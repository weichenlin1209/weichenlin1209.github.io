import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const posts_en = await getCollection("posts_en", ({ data }) => {
    return !data.draft && data.title && data.published;
  });

  return rss({
    title: "Windson's Blog",
    description: "Windson's weekly diary and tech notes (English)",
    site: context.site!,
    customData: `<language>en-us</language>`,

    items: posts_en
      .sort(
        (a, b) =>
          new Date(b.data.published).getTime() -
          new Date(a.data.published).getTime()
      )
      .map((post) => {
        const html = post.rendered?.html ?? "";

        const summary = html
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .slice(0, 200);

        return {
          title: post.data.title,
          pubDate: post.data.published,
          link: `/en/posts/${post.data.slug ?? post.id}`,

          description: summary,
          content: html,
        };
      }),
  });
};