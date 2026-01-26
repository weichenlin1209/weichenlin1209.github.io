import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: string }) {
  const posts = await getCollection("posts");

  return rss({
    title: "Windson's Blog",
    description: "Demo Site",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.published,
      // 將文章全文放進 content
      content: post.body, // <--- 這裡
      link: `/posts/${post.data.slug ?? post.id}`,
    })),
  });
}
