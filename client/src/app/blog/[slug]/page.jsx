// src/app/blog/[slug]/page.jsx

import { API } from "@/lib/api";
import BlogDetailClient from "./BlogDetailClient";

async function getBlog(slug) {
  try {
    const { data } = await API.get(`/api/blogs/${slug}`);

    return data?.data || null;
  } catch (error) {
    console.log(
      "BLOG DETAIL FETCH ERROR:",
      error?.response?.data || error?.message,
    );

    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Dr. Vini Jhariya",
      description: "The requested blog article could not be found.",
    };
  }

  return {
    title: blog.pageTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      title: blog.pageTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: blog.image?.url ? [blog.image.url] : [],
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  return <BlogDetailClient blog={blog} />;
}
