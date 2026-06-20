"use client";

import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  FileText,
  HelpCircle,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const optimizeCloudinaryImage = (url, width = 700) => {
  if (!url || !url.includes("res.cloudinary.com")) return url;

  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
};

const formatBlogDate = (date) => {
  if (!date) return "Recent";

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(new Date(date));
  } catch {
    return "Recent";
  }
};

const blogHelpPoints = [
  {
    icon: SearchCheck,
    title: "Understand signs",
    text: "Simple explanations of behaviour, attention, learning and emotional concerns.",
  },
  {
    icon: HelpCircle,
    title: "Know when to seek help",
    text: "Parent-friendly guidance on when consultation or assessment may be useful.",
  },
  {
    icon: BookOpen,
    title: "Learn practical support",
    text: "Helpful ideas for parenting, school support and emotional wellbeing.",
  },
];

const LatestBlogs = ({ initialBlogs = [] }) => {
  const latestBlogs = useMemo(() => {
    return initialBlogs
      .filter((blog) => blog?.isPublished !== false && blog?.isActive !== false)
      .slice(0, 3);
  }, [initialBlogs]);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:py-18 md:py-22">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-28 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Parent Learning Corner
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-6xl">
              Helpful psychology insights for everyday parenting questions.
            </h2>

            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              Read parent-friendly articles on autism, ADHD, dyslexia, child
              behaviour, emotional wellbeing, learning concerns and when to seek
              professional support.
            </p>
          </div>

          <div className="rounded-4xl border border-[#2CB1A6]/15 bg-[#F7FBFC] p-5 shadow-xl shadow-slate-900/5">
            <h3 className="text-lg font-black text-[#102A43]">
              Not sure what your child’s behaviour means?
            </h3>

            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              These blogs are written to help parents understand concerns with
              more clarity, not fear.
            </p>

            <Link
              href="/blog"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:bg-[#102A43]"
            >
              View All Blogs
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Blog Help Points */}
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {blogHelpPoints.map((point) => {
            const Icon = point.icon;

            return (
              <div
                key={point.title}
                className="rounded-3xl border border-slate-100 bg-[#F7FBFC] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white">
                  <Icon size={21} />
                </div>

                <h3 className="text-lg font-black text-[#102A43]">
                  {point.title}
                </h3>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {point.text}
                </p>
              </div>
            );
          })}
        </div>

        {latestBlogs.length === 0 ? (
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
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#102A43]"
            >
              Ask for Guidance
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {latestBlogs.map((blog) => {
              const imageUrl = optimizeCloudinaryImage(blog?.image?.url, 700);

              return (
                <Link
                  href={`/blog/${blog.slug}`}
                  key={blog._id || blog.slug || blog.title}
                  className="group overflow-hidden rounded-4xl bg-[#F7FBFC] shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
                >
                  <div className="relative h-56 overflow-hidden bg-[#102A43]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={`${blog.title} by Dr. Vini Jhariya`}
                        fill
                        sizes="(max-width: 768px) 100vw, 420px"
                        className="object-cover transition duration-500 group-hover:scale-105"
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
                        <span className="rounded-full bg-[#FFF4EA] px-3 py-1 text-xs font-black text-[#9A5A22]">
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
                      {blog.excerpt ||
                        blog.metaDescription ||
                        "Helpful psychology insights for parents, children and families."}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
                        <CalendarDays size={14} />
                        {formatBlogDate(blog.publishedAt)}
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBlogs;
