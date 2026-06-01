import CourseDetailClient from "./CourseDetailClient";
import { API } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const defaultOgImage = `${siteUrl}/images/dr-vini-og.jpg`;

async function getCourse(slug) {
  try {
    if (!slug) return null;

    const { data } = await API.get(`/api/courses/${slug}`);

    return data?.data || data?.course || data || null;
  } catch (error) {
    console.log(
      "COURSE DETAIL FETCH ERROR:",
      error.response?.data || error.message,
    );
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return {
      title: "Course Not Found | Dr. Vini Jhariya",
      description: "The requested course could not be found.",
      alternates: {
        canonical: `${siteUrl}/courses/${slug}`,
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title =
    course.pageTitle ||
    `${course.title} | Dr. Vini Jhariya | Psychology Training in Indore`;

  const description =
    course.metaDescription ||
    course.shortDescription ||
    "Explore psychology courses, workshops and training programs by Dr. Vini Jhariya at Urjasvini Child Development Centre.";

  const canonicalUrl = `${siteUrl}/courses/${course.slug || slug}`;
  const ogImage = course.image?.url || defaultOgImage;

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
      siteName: "Dr. Vini Jhariya | Urjasvini Child Development Centre",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${course.title} by Dr. Vini Jhariya`,
        },
      ],
      type: "article",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = await getCourse(slug);

  return <CourseDetailClient course={course} />;
}
