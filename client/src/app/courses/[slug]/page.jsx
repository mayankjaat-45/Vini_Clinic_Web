import axios from "axios";
import CourseDetailClient from "./CourseDetailClient";
import { API } from "@/lib/api";

async function getCourse(slug) {
  try {
    const { data } = await API.get(`/api/courses/${slug}`);

    return data?.data || null;
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
      title: "Course Not Found",
      description: "The requested course could not be found.",
    };
  }

  return {
    title: course.pageTitle || course.title,
    description:
      course.metaDescription ||
      course.shortDescription ||
      "Explore psychology courses and training programs by Dr. Vini Jhariya.",
    openGraph: {
      title: course.pageTitle || course.title,
      description:
        course.metaDescription ||
        course.shortDescription ||
        "Explore psychology courses and training programs by Dr. Vini Jhariya.",
      images: course.image?.url ? [course.image.url] : [],
      type: "article",
    },
  };
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;

  const course = await getCourse(slug);

  return <CourseDetailClient course={course} />;
}
