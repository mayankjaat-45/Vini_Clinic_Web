"use client";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  MessageCircle,
  Sparkles,
  Tag,
} from "lucide-react";
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
      <main className="flex min-h-screen items-center justify-center bg-[#F7FBFC] px-5">
        <div className="max-w-xl rounded-4xl bg-white p-10 text-center shadow-xl">
          <BookOpen className="mx-auto mb-4 text-[#0F3D5E]" size={46} />
          <h1 className="text-3xl font-black text-[#102A43]">Blog not found</h1>
          <p className="mt-3 text-slate-600">
            This article may have been removed or unpublished.
          </p>
          <a
            href="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-5 py-14">
        <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <a
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </a>

          <div className="mb-6 ml-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
            <Sparkles size={16} className="text-[#2CB1A6]" />
            {blog.category}
          </div>

          <h1 className="text-4xl font-black leading-tight text-[#102A43] md:text-6xl">
            {blog.title}
          </h1>

          <p className="mt-6 text-xl font-semibold leading-9 text-slate-600">
            {blog.excerpt}
          </p>

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

            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
              <BookOpen size={16} />
              {blog.language}
            </span>
          </div>
        </div>
      </section>

      <section className="-mt-6 px-5 pb-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[3rem] bg-white p-4 shadow-2xl shadow-slate-900/10">
          {blog.image?.url ? (
            <img
              src={blog.image.url}
              alt={blog.title}
              className="max-h-130 w-full rounded-[2.4rem] object-cover"
            />
          ) : (
            <div className="flex h-90 items-center justify-center rounded-[2.4rem] bg-[#102A43] text-white/30">
              <BookOpen size={76} />
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_320px]">
          <article className="rounded-[3rem] bg-white p-7 shadow-xl shadow-slate-900/5 md:p-12">
            <div className="space-y-6">
              {formattedContent.map((line, index) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="pt-6 text-3xl font-black leading-tight text-[#102A43]"
                    >
                      {line.replace("## ", "")}
                    </h2>
                  );
                }

                if (line.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="pt-4 text-2xl font-black leading-tight text-[#0F3D5E]"
                    >
                      {line.replace("### ", "")}
                    </h3>
                  );
                }

                if (line.startsWith("- ")) {
                  return (
                    <p
                      key={index}
                      className="rounded-2xl bg-[#F7FBFC] px-5 py-4 text-base font-semibold leading-8 text-slate-600"
                    >
                      {line.replace("- ", "• ")}
                    </p>
                  );
                }

                return (
                  <p
                    key={index}
                    className="text-lg font-semibold leading-9 text-slate-600"
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

              <a
                href="/contact-us"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F3D5E]"
              >
                Book Consultation
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
