import { getCollection } from "astro:content";
import { IdToSlug } from "./hash";

/**
 * Represents an archive item with a title, slug, date, and optional tags.
 */
export interface Archive {
  title: string;
  id: string;
  date: Date;
  tags?: string[];
}

/**
 * Represents a tag used to categorize content.
 */
export interface Tag {
  name: string;
  slug: string;
  posts: Archive[];
}

/**
 * Represents a category of content.
 */
export interface Category {
  name: string;
  slug: string;
  posts: Archive[];
}

/**
 * Retrieves and sorts blog posts by their published date.
 *
 * @param lang - Language code ("zh" or "en")
 * @returns A promise that resolves to an array of sorted blog posts with navigation properties.
 */
export async function GetSortedPosts(lang: "zh" | "en" = "zh") {
  const collectionName = lang === "zh" ? "posts_zh" : "posts_en";
  const allBlogPosts = await getCollection(collectionName, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  const sorted = allBlogPosts.sort((a, b) => {
    const dateA = new Date(a.data.published);
    const dateB = new Date(b.data.published);
    return dateA > dateB ? -1 : 1;
  });

  for (let i = 1; i < sorted.length; i++) {
    (sorted[i].data as any).nextSlug = (sorted[i - 1] as any).slug;
    (sorted[i].data as any).nextTitle = sorted[i - 1].data.title;
  }
  for (let i = 0; i < sorted.length - 1; i++) {
    (sorted[i].data as any).prevSlug = (sorted[i + 1] as any).slug;
    (sorted[i].data as any).prevTitle = sorted[i + 1].data.title;
  }

  return sorted;
}

/**
 * Retrieves and organizes blog post archives.
 *
 * @param lang - Language code ("zh" or "en")
 * @returns A promise that resolves to a map of archives grouped by year.
 */
export async function GetArchives(lang: "zh" | "en" = "zh") {
  const collectionName = lang === "zh" ? "posts_zh" : "posts_en";
  const allBlogPosts = await getCollection(collectionName, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const archives = new Map<number, Archive[]>();

  for (const post of allBlogPosts) {
    const date = new Date(post.data.published);
    const year = date.getFullYear();
    if (!archives.has(year)) {
      archives.set(year, []);
    }
    archives.get(year)!.push({
      title: post.data.title,
      id: `/${lang}/posts/${IdToSlug(post.id)}`,
      date: date,
      tags: post.data.tags,
    });
  }

  const sortedArchives = new Map(
    [...archives.entries()].sort((a, b) => b[0] - a[0]),
  );
  sortedArchives.forEach((value) => {
    value.sort((a, b) => (a.date > b.date ? -1 : 1));
  });

  return sortedArchives;
}

/**
 * Retrieves all tags from blog posts.
 *
 * @param lang - Language code ("zh" or "en")
 * @returns A promise that resolves to a map of tags.
 */
export async function GetTags(lang: "zh" | "en" = "zh") {
  const collectionName = lang === "zh" ? "posts_zh" : "posts_en";
  const allBlogPosts = await getCollection(collectionName, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const tags = new Map<string, Tag>();
  allBlogPosts.forEach((post) => {
    post.data.tags?.forEach((tag: string) => {
      const tagSlug = IdToSlug(tag);
      if (!tags.has(tagSlug)) {
        tags.set(tagSlug, {
          name: tag,
          slug: `/${lang}/tags/${tagSlug}`,
          posts: [],
        });
      }
      tags.get(tagSlug)!.posts.push({
        title: post.data.title,
        id: `/${lang}/posts/${IdToSlug(post.id)}`,
        date: new Date(post.data.published),
        tags: post.data.tags,
      });
    });
  });

  return tags;
}

/**
 * Retrieves all blog post categories and their associated posts.
 *
 * @param lang - Language code ("zh" or "en")
 * @returns A promise that resolves to a map of categories.
 */
export async function GetCategories(lang: "zh" | "en" = "zh") {
  const collectionName = lang === "zh" ? "posts_zh" : "posts_en";
  const allBlogPosts = await getCollection(collectionName, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  const categories = new Map<string, Category>();

  allBlogPosts.forEach((post) => {
    if (!post.data.category) return;
    const categorySlug = IdToSlug(post.data.category);

    if (!categories.has(categorySlug)) {
      categories.set(categorySlug, {
        name: post.data.category,
        slug: `/${lang}/categories/${categorySlug}`,
        posts: [],
      });
    }
    categories.get(categorySlug)!.posts.push({
      title: post.data.title,
      id: `/${lang}/posts/${IdToSlug(post.id)}`,
      date: new Date(post.data.published),
      tags: post.data.tags,
    });
  });

  return categories;
}