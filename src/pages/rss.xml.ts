import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts", ({ data }) => {
    return !data.draft && data.title && data.published;
  });

  return rss({
    title: "Windson's Blog",
    description: "Windson's weekly diary and tech notes",
    site: context.site,

    items: posts
      .sort(
        (a, b) =>
          new Date(b.data.published).getTime() -
          new Date(a.data.published).getTime()
      )
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.published,
        link: `/posts/${post.data.slug ?? post.id}`,
        content: `<![CDATA[\n${post.body}\n]]>`,
      })),
  });
}
