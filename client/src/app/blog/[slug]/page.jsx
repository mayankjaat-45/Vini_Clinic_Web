// src/app/blog/[slug]/page.jsx

import { cache } from "react";
import { notFound } from "next/navigation";
import { API } from "@/lib/api";
import BlogDetailClient from "./BlogDetailClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://thechildpsychologist.in";

const normalizeBlogCollection = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.blogs)) return payload.blogs;
  if (Array.isArray(payload?.items)) return payload.items;

  return [];
};

const getBlogImage = (blog) => {
  if (typeof blog?.image === "string") {
    return blog.image;
  }

  return (
    blog?.image?.url ||
    blog?.image?.secure_url ||
    blog?.featuredImage?.url ||
    blog?.featuredImage ||
    blog?.thumbnail?.url ||
    blog?.thumbnail ||
    ""
  );
};

const getBlogDate = (blog) => {
  return blog?.publishedAt || blog?.createdAt || blog?.updatedAt || null;
};

const sortBlogsByLatest = (blogs) => {
  return [...blogs].sort((first, second) => {
    const firstDate = new Date(getBlogDate(first) || 0).getTime();

    const secondDate = new Date(getBlogDate(second) || 0).getTime();

    return secondDate - firstDate;
  });
};

/**
 * Fetch the current blog.
 * cache() prevents repeated calls during the same server render.
 */
const getBlog = cache(async (slug) => {
  try {
    const response = await API.get(`/api/blogs/${encodeURIComponent(slug)}`);

    const payload = response?.data;

    return payload?.data || payload?.blog || null;
  } catch (error) {
    console.error(
      "BLOG DETAIL FETCH ERROR:",
      error?.response?.data || error?.message,
    );

    return null;
  }
});

/**
 * Fetch published blogs for:
 * - Recent Posts
 * - Categories
 * - Previous/Next navigation
 */
const getAllBlogs = cache(async () => {
  try {
    const response = await API.get("/api/blogs?limit=100");

    const blogs = normalizeBlogCollection(response?.data);

    return sortBlogsByLatest(
      blogs.filter(
        (blog) =>
          blog?.slug && blog?.isPublished !== false && blog?.isActive !== false,
      ),
    );
  } catch (error) {
    console.error(
      "BLOG LIST FETCH ERROR:",
      error?.response?.data || error?.message,
    );

    return [];
  }
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Dr. Vini Jhariya",
      description: "The requested blog article could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = blog.pageTitle || blog.metaTitle || blog.title;

  const description =
    blog.metaDescription ||
    blog.excerpt ||
    "Read child psychology insights and parent guidance from Dr. Vini Jhariya.";

  const imageUrl = getBlogImage(blog);
  const canonicalUrl = `${SITE_URL}/blog/${blog.slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Dr. Vini Jhariya",
      type: "article",
      publishedTime: blog.publishedAt || undefined,
      modifiedTime: blog.updatedAt || undefined,
      authors: ["Dr. Vini Jhariya"],
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: blog.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const [blog, allBlogs] = await Promise.all([getBlog(slug), getAllBlogs()]);

  if (!blog) {
    notFound();
  }

  const currentBlogIndex = allBlogs.findIndex(
    (item) =>
      item?.slug === blog.slug ||
      String(item?._id || "") === String(blog?._id || ""),
  );

  /**
   * Remove the current article from Recent Posts.
   */
  const recentBlogs = allBlogs
    .filter(
      (item) =>
        item?.slug !== blog.slug &&
        String(item?._id || "") !== String(blog?._id || ""),
    )
    .slice(0, 5)
    .map((item) => ({
      _id: item._id,
      slug: item.slug,
      title: item.title,
      category: item.category,
      publishedAt: item.publishedAt,
      createdAt: item.createdAt,
      image: item.image,
    }));

  /**
   * BlogDetailClient supports category strings,
   * so create a unique alphabetical list.
   */
  const categories = [
    ...new Set(
      allBlogs
        .map((item) => String(item?.category || "").trim())
        .filter(Boolean),
    ),
  ].sort((first, second) => first.localeCompare(second));

  /**
   * Since allBlogs is sorted newest first:
   * previousBlog = newer article
   * nextBlog = older article
   */
  const previousBlog =
    currentBlogIndex > 0 ? allBlogs[currentBlogIndex - 1] : null;

  const nextBlog =
    currentBlogIndex >= 0 && currentBlogIndex < allBlogs.length - 1
      ? allBlogs[currentBlogIndex + 1]
      : null;

  return (
    <BlogDetailClient
      blog={blog}
      recentBlogs={recentBlogs}
      categories={categories}
      previousBlog={
        previousBlog
          ? {
              slug: previousBlog.slug,
              title: previousBlog.title,
            }
          : null
      }
      nextBlog={
        nextBlog
          ? {
              slug: nextBlog.slug,
              title: nextBlog.title,
            }
          : null
      }
    />
  );
}
