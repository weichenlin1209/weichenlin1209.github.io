import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("posts", ({ data }) => {
    return !data.draft && data.title && data.published;
  });

  return rss({
    title: "Windson's Blog",
    description: "Windson's weekly diary and tech notes",
    site: context.site!,

    items: posts
      .sort(
        (a, b) =>
          new Date(b.data.published).getTime() -
          new Date(a.data.published).getTime()
      )
      .map((post) => {
        // ✅ Astro v4 正確取得 HTML 的方式
        const html = post.rendered?.html ?? "";

        // 純文字摘要（給 description）
        const summary = html
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .slice(0, 200);

        return {
          title: post.data.title,
          pubDate: post.data.published,
          link: `/posts/${post.data.slug ?? post.id}`,

          description: summary, // ⭐ reader 一定會顯示
          content: html,        // ⭐ 全文 RSS
        };
      }),
  });
};
