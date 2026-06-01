"use client";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  MessageCircle,
  Sparkles,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function BlogDetailClient({ blog }) {
  const formattedContent = useMemo(() => {
    if (!blog?.content) return [];

    return blog.content
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }, [blog]);

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FBFC] px-4 sm:px-5">
        <div className="max-w-xl rounded-4xl bg-white p-8 text-center shadow-xl sm:p-10">
          <BookOpen className="mx-auto mb-4 text-[#0F3D5E]" size={46} />

          <h1 className="text-3xl font-black text-[#102A43]">Blog not found</h1>

          <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
            This article may have been removed or unpublished.
          </p>

          <Link
            href="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-4 py-12 sm:px-5 sm:py-14 md:py-16">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl md:h-96 md:w-96" />

        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
            <Sparkles size={16} className="text-[#2CB1A6]" />
            {blog.category || "Article"}
          </div>

          <h1 className="text-4xl font-black leading-tight text-[#102A43] sm:text-5xl md:text-6xl">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="mt-6 text-base font-semibold leading-8 text-slate-600 sm:text-lg md:text-xl md:leading-9">
              {blog.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
              <CalendarDays size={16} />
              {blog.publishedAt
                ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "Recent"}
            </span>

            {blog.language && (
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
                <BookOpen size={16} />
                {blog.language}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="-mt-4 px-4 pb-12 sm:px-5 md:pb-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-4xl bg-white p-3 shadow-2xl shadow-slate-900/10 md:rounded-[3rem] md:p-4">
          {blog.image?.url ? (
            <img
              src={blog.image.url}
              alt={`${blog.title} by Dr. Vini Jhariya, Clinical & Child Psychologist in Indore`}
              className="max-h-130 w-full rounded-[1.6rem] object-cover md:rounded-[2.4rem]"
            />
          ) : (
            <div className="flex h-72 items-center justify-center rounded-[1.6rem] bg-[#102A43] text-white/30 sm:h-90 md:rounded-[2.4rem]">
              <BookOpen size={76} />
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_320px]">
          <article className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-7 md:rounded-[3rem] md:p-12">
            <div className="space-y-6">
              {formattedContent.map((line, index) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="pt-6 text-2xl font-black leading-tight text-[#102A43] sm:text-3xl"
                    >
                      {line.replace("## ", "")}
                    </h2>
                  );
                }

                if (line.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="pt-4 text-xl font-black leading-tight text-[#0F3D5E] sm:text-2xl"
                    >
                      {line.replace("### ", "")}
                    </h3>
                  );
                }

                if (line.startsWith("- ")) {
                  return (
                    <p
                      key={index}
                      className="rounded-2xl bg-[#F7FBFC] px-5 py-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8"
                    >
                      {line.replace("- ", "• ")}
                    </p>
                  );
                }

                return (
                  <p
                    key={index}
                    className="text-base font-semibold leading-8 text-slate-600 sm:text-lg sm:leading-9"
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-4xl bg-[#0F3D5E] p-7 text-white shadow-xl shadow-blue-950/15">
              <MessageCircle className="mb-5 text-[#F4B183]" size={34} />

              <h3 className="text-2xl font-black">Need personal guidance?</h3>

              <p className="mt-3 text-sm font-semibold leading-6 text-white/75">
                If this article feels close to what your child or family is
                facing, you can book a consultation with Dr. Vini Jhariya.
              </p>

              <Link
                href="/contact-us"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F3D5E]"
              >
                Book Consultation
              </Link>

              <a
                href={`https://wa.me/917999215093?text=${encodeURIComponent(
                  `Hello, I read this article: ${blog.title}. I want guidance.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white"
              >
                WhatsApp Us
              </a>
            </div>

            {blog.tags?.length > 0 && (
              <div className="rounded-4xl bg-white p-7 shadow-xl shadow-slate-900/5">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-black text-[#102A43]">
                  <Tag size={20} className="text-[#2CB1A6]" />
                  Tags
                </h3>

                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#E9F8F6] px-3 py-2 text-xs font-black text-[#0F766E]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
