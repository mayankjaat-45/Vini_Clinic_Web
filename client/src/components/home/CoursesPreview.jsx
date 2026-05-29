"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function CoursesPreview() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/courses");

      setCourses(data?.data || []);
    } catch (error) {
      console.log("HOME COURSES ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const previewCourses = useMemo(() => {
    const featured = courses.filter((course) => course.isFeatured);

    if (featured.length) {
      return featured.slice(0, 3);
    }

    return courses.slice(0, 3);
  }, [courses]);

  return (
    <section className="relative overflow-hidden bg-white px-5 py-20">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Courses & Training
            </div>

            <h2 className="max-w-4xl text-4xl font-black leading-tight text-[#102A43] md:text-6xl">
              Learn psychology, counselling and intervention skills.
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Explore courses, workshops, parent training, teacher training and
              internship programs by Dr. Vini Jhariya and Urjasvini CDC.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
          >
            View All Courses
            <ArrowRight size={17} />
          </Link>
        </div>

        {loading ? (
          <div className="rounded-4xl bg-[#F7FBFC] p-10 text-center shadow-xl">
            <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
            <p className="font-bold text-slate-600">Loading courses...</p>
          </div>
        ) : previewCourses.length === 0 ? (
          <div className="rounded-4xl bg-[#F7FBFC] p-10 text-center shadow-xl">
            <GraduationCap className="mx-auto mb-4 text-[#0F3D5E]" size={42} />
            <h3 className="text-2xl font-black text-[#102A43]">
              No courses available
            </h3>
            <p className="mt-2 text-slate-600">
              Add active courses from admin dashboard.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {previewCourses.map((course) => (
              <Link
                key={course._id}
                href={`/courses/${course.slug}`}
                className="group overflow-hidden rounded-4xl bg-[#F7FBFC] shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="h-56 bg-[#102A43]">
                  {course.image?.url ? (
                    <img
                      src={course.image.url}
                      alt={course.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/30">
                      <BookOpen size={58} />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                      {course.category}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0F3D5E]">
                      {course.mode}
                    </span>

                    {course.isFeatured && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-700">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="line-clamp-2 text-2xl font-black leading-tight text-[#102A43]">
                    {course.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                    {course.shortDescription}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-400">
                    {course.duration && <span>{course.duration}</span>}

                    {course.startDate && (
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays size={14} />
                        {new Date(course.startDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    )}
                  </div>

                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]">
                    View Details
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
