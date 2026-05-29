import { API } from "@/lib/api";
import BlogDetailClient from "./BlogDetailClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://thechildpsychologist.in";

async function getBlog(slug) {
  try {
    const { data } = await API.get(`/api/blogs/${slug}`);
    return data?.data || null;
  } catch (error) {
    console.log(
      "BLOG DETAIL FETCH ERROR:",
      error.response?.data || error.message,
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

  const title = blog.pageTitle || blog.metaTitle || blog.seoTitle || blog.title;
  const description = blog.metaDescription || blog.excerpt;
  const canonicalUrl = `${siteUrl}/blog/${blog.slug}`;

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
      images: blog.image?.url ? [blog.image.url] : [],
      type: "article",
      publishedTime: blog.publishedAt,
      authors: [blog.author || "Dr. Vini Jhariya"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: blog.image?.url ? [blog.image.url] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  return (
    <>
      {blog?.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blog.faqSchema),
          }}
        />
      )}

      <BlogDetailClient blog={blog} />
    </>
  );
}
