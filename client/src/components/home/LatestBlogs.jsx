"use client";

import { API } from "@/lib/api";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/blogs");

      setBlogs(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.log("Latest blogs error:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const latestBlogs = useMemo(() => {
    return blogs.filter((blog) => blog?.isPublished !== false).slice(0, 3);
  }, [blogs]);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:py-18 md:py-22">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-28 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Latest Blogs
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-6xl">
              Helpful psychology insights for parents and families.
            </h2>

            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              Read expert articles on autism, ADHD, dyslexia, parenting, child
              behaviour and emotional wellbeing.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
          >
            View All Blogs
            <ArrowRight size={17} />
          </Link>
        </div>

        {loading ? (
          <div className="rounded-4xl bg-[#F7FBFC] p-10 text-center shadow-xl">
            <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
            <p className="font-bold text-slate-600">Loading blogs...</p>
          </div>
        ) : latestBlogs.length === 0 ? (
          <div className="rounded-4xl bg-[#F7FBFC] p-8 text-center shadow-xl sm:p-10">
            <FileText className="mx-auto mb-4 text-[#0F3D5E]" size={38} />

            <h3 className="text-2xl font-black text-[#102A43]">
              Articles are coming soon
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm font-semibold leading-7 text-slate-600">
              Helpful articles on autism, ADHD, dyslexia, parenting, child
              behaviour and emotional wellbeing will be published here soon.
            </p>

            <Link
              href="/contact-us"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1"
            >
              Ask for Guidance
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {latestBlogs.map((blog) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog._id || blog.slug}
                className="group overflow-hidden rounded-4xl bg-[#F7FBFC] shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="h-56 overflow-hidden bg-[#102A43]">
                  {blog.image?.url ? (
                    <img
                      src={blog.image.url}
                      alt={`${blog.title} by Dr. Vini Jhariya`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/30">
                      <BookOpen size={56} />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {blog.category && (
                      <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                        {blog.category}
                      </span>
                    )}

                    {blog.isFeatured && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-700">
                        Featured
                      </span>
                    )}

                    {blog.language && (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0F3D5E]">
                        {blog.language}
                      </span>
                    )}
                  </div>

                  <h3 className="line-clamp-2 text-2xl font-black leading-tight text-[#102A43]">
                    {blog.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                    {blog.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
                      <CalendarDays size={14} />
                      {blog.publishedAt
                        ? new Date(blog.publishedAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "Recent"}
                    </span>

                    <span className="inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]">
                      Read
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBlogs;
