"use client";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Link2,
  MessageCircle,
  Share2,
  Sparkles,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const formatDate = (date) => {
  if (!date) return "Recent";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getReadingTime = (blog) => {
  const text = `${blog?.title || ""} ${blog?.excerpt || ""} ${
    blog?.content || ""
  }`;

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 180));

  return `${minutes} min read`;
};

const slugify = (text) => {
  return String(text || "")
    .replace(/^##\s+/, "")
    .replace(/^###\s+/, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const getBlogTopics = (blog) => {
  const topics = [
    ...(Array.isArray(blog?.topics) ? blog.topics : []),
    ...(Array.isArray(blog?.tags) ? blog.tags : []),
    blog?.topic,
  ]
    .map((topic) => String(topic || "").trim())
    .filter(Boolean);

  const uniqueTopics = [...new Set(topics)];

  if (uniqueTopics.length > 0) return uniqueTopics;

  return blog?.category ? [blog.category] : [];
};

const createArticleSections = (lines) => {
  const sections = [];
  let currentSection = {
    id: "introduction",
    title: "Introduction",
    lines: [],
  };

  lines.forEach((line, index) => {
    if (line.startsWith("## ")) {
      if (currentSection.lines.length > 0) {
        sections.push(currentSection);
      }

      const title = line.replace("## ", "");

      currentSection = {
        id: `${slugify(title)}-${index}`,
        title,
        lines: [],
      };

      return;
    }

    currentSection.lines.push({
      id: `line-${index}`,
      text: line,
    });
  });

  if (currentSection.lines.length > 0) {
    sections.push(currentSection);
  }

  return sections;
};

export default function BlogDetailClient({ blog }) {
  const [openSections, setOpenSections] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const formattedContent = useMemo(() => {
    if (!blog?.content) return [];

    return String(blog.content)
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }, [blog]);

  const blogTopics = useMemo(() => getBlogTopics(blog), [blog]);

  const articleSections = useMemo(() => {
    return createArticleSections(formattedContent);
  }, [formattedContent]);

  const totalPoints = useMemo(() => {
    return articleSections.reduce(
      (total, section) => total + section.lines.length,
      0,
    );
  }, [articleSections]);

  useEffect(() => {
    if (articleSections.length > 0) {
      setOpenSections(articleSections.slice(0, 2).map((section) => section.id));
    }
  }, [articleSections]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        setReadingProgress(0);
        return;
      }

      setReadingProgress(
        Math.min(100, Math.round((scrollTop / docHeight) * 100)),
      );
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (sectionId) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  const openAllSections = () => {
    setOpenSections(articleSections.map((section) => section.id));
  };

  const closeAllSections = () => {
    setOpenSections(articleSections[0]?.id ? [articleSections[0].id] : []);
  };

  const scrollToSection = (sectionId) => {
    setOpenSections((prev) =>
      prev.includes(sectionId) ? prev : [...prev, sectionId],
    );

    setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    try {
      if (navigator.share) {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt || blog?.title,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);

        setTimeout(() => setCopied(false), 1800);
      }
    } catch (error) {
      console.log("SHARE ERROR:", error);
    }
  };

  const renderContentLine = (item) => {
    const line = item.text;

    if (line.startsWith("### ")) {
      return (
        <h3
          key={item.id}
          className="pt-2 text-xl font-black leading-tight text-[#0F3D5E] sm:text-2xl"
        >
          {line.replace("### ", "")}
        </h3>
      );
    }

    if (line.startsWith("- ")) {
      return (
        <div
          key={item.id}
          className="flex gap-3 rounded-2xl bg-[#F7FBFC] px-5 py-4"
        >
          <CheckCircle2 size={18} className="mt-1 shrink-0 text-[#2CB1A6]" />

          <p className="text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8">
            {line.replace("- ", "")}
          </p>
        </div>
      );
    }

    if (/^\d+\.\s/.test(line)) {
      const number = line.match(/^\d+/)?.[0];
      const text = line.replace(/^\d+\.\s/, "");

      return (
        <div
          key={item.id}
          className="flex gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-xs font-black text-[#0F766E]">
            {number}
          </span>

          <p className="text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8">
            {text}
          </p>
        </div>
      );
    }

    return (
      <p
        key={item.id}
        className="text-base font-semibold leading-8 text-slate-600 sm:text-lg sm:leading-9"
      >
        {line}
      </p>
    );
  };

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FBFC] px-4 sm:px-5">
        <div className="max-w-xl rounded-4xl bg-white p-8 text-center shadow-xl shadow-slate-900/5 sm:p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#E9F8F6]">
            <BookOpen className="text-[#0F3D5E]" size={34} />
          </div>

          <h1 className="text-3xl font-black text-[#102A43]">Blog not found</h1>

          <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
            This article may have been removed or unpublished.
          </p>

          <Link
            href="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#2CB1A6]"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-[#F7FBFC] text-[#102A43]">
      <div className="sticky top-0 z-50 h-1 bg-white">
        <div
          className="h-full bg-[#2CB1A6] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <section className="relative overflow-hidden border-b border-slate-200/70 bg-linear-to-br from-white via-[#F7FBFC] to-[#E9F8F6] px-4 py-8 sm:px-5 lg:py-10">
        <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="transition hover:text-[#0F3D5E]">
              Home
            </Link>
            <ChevronRight size={15} />
            <Link href="/blog" className="transition hover:text-[#0F3D5E]">
              Blogs
            </Link>
            <ChevronRight size={15} />
            <span className="text-[#0F3D5E]">Article</span>
          </div>

          <div className="grid gap-7 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <Link
                href="/blog"
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm transition hover:-translate-x-1"
              >
                <ArrowLeft size={15} />
                Back to Blog
              </Link>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#2CB1A6]/20 bg-white/90 px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm">
                  <Sparkles size={15} className="text-[#2CB1A6]" />
                  {blog.category || "Article"}
                </span>

                {blogTopics.slice(0, 2).map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black text-[#0F766E] shadow-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-[-0.04em] text-[#102A43] sm:text-4xl lg:text-5xl">
                {blog.title}
              </h1>

              {blog.excerpt && (
                <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {blog.excerpt}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-500 shadow-sm">
                  <CalendarDays size={16} />
                  {formatDate(blog.publishedAt)}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-500 shadow-sm">
                  <Clock size={16} />
                  {getReadingTime(blog)}
                </span>

                {blog.language && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-500 shadow-sm">
                    <BookOpen size={16} />
                    {blog.language}
                  </span>
                )}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white shadow-xl shadow-[#0F3D5E]/20 transition hover:-translate-y-1 hover:bg-[#2CB1A6]"
                >
                  <MessageCircle size={17} />
                  Book Consultation
                </Link>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#0F3D5E] shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                >
                  {copied ? <Link2 size={17} /> : <Share2 size={17} />}
                  {copied ? "Link Copied" : "Share Article"}
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -bottom-5 -right-5 hidden h-28 w-28 rounded-full bg-[#2CB1A6]/20 blur-2xl sm:block" />

              <div className="relative overflow-hidden rounded-4xl border border-white bg-white p-3 shadow-2xl shadow-slate-900/10">
                {blog.image?.url ? (
                  <img
                    src={blog.image.url}
                    alt={`${blog.title} by Dr. Vini Jhariya, Clinical & Child Psychologist in Indore`}
                    className="h-60 w-full rounded-3xl object-cover sm:h-80 lg:h-105"
                  />
                ) : (
                  <div className="flex h-60 items-center justify-center rounded-3xl bg-[#102A43] text-white/30 sm:h-80 lg:h-105">
                    <BookOpen size={76} />
                  </div>
                )}

                <div className="absolute bottom-6 left-6 right-6 rounded-3xl bg-white/95 p-4 shadow-xl backdrop-blur">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2CB1A6]">
                    Quick View
                  </p>

                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xl font-black text-[#102A43]">
                        {articleSections.length || 1}
                      </p>
                      <p className="text-[11px] font-bold text-slate-500">
                        Sections
                      </p>
                    </div>

                    <div>
                      <p className="text-xl font-black text-[#102A43]">
                        {totalPoints || formattedContent.length}
                      </p>
                      <p className="text-[11px] font-bold text-slate-500">
                        Points
                      </p>
                    </div>

                    <div>
                      <p className="text-xl font-black text-[#102A43]">
                        {readingProgress}%
                      </p>
                      <p className="text-[11px] font-bold text-slate-500">
                        Read
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-5 lg:py-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_330px]">
          <article className="rounded-4xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-6 lg:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#2CB1A6]">
                  Interactive Guide
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#102A43] sm:text-3xl">
                  Read by section
                </h2>

                <p className="mt-2 text-sm font-semibold text-slate-500">
                  Tap any section to expand or collapse the article content.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={openAllSections}
                  className="rounded-full bg-[#0F3D5E] px-4 py-2 text-xs font-black text-white transition hover:bg-[#2CB1A6]"
                >
                  Open All
                </button>

                <button
                  type="button"
                  onClick={closeAllSections}
                  className="rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-slate-600 transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                >
                  Collapse
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {articleSections.map((section, sectionIndex) => {
                const isOpen = openSections.includes(section.id);

                return (
                  <div
                    key={section.id}
                    id={section.id}
                    className={`overflow-hidden rounded-[1.75rem] border transition ${
                      isOpen
                        ? "border-[#2CB1A6]/30 bg-white shadow-lg shadow-slate-900/5"
                        : "border-slate-100 bg-[#F7FBFC]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-[#E9F8F6]"
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black shadow-sm ${
                            isOpen
                              ? "bg-[#0F3D5E] text-white"
                              : "bg-white text-[#0F766E]"
                          }`}
                        >
                          {sectionIndex + 1}
                        </span>

                        <div>
                          <h3 className="text-lg font-black leading-tight text-[#102A43] sm:text-xl">
                            {section.title}
                          </h3>

                          <p className="mt-1 text-xs font-bold text-slate-500">
                            {section.lines.length} points inside
                          </p>
                        </div>
                      </div>

                      <ChevronDown
                        size={22}
                        className={`shrink-0 text-[#0F3D5E] transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="space-y-5 border-t border-slate-100 bg-white p-5 sm:p-6">
                        {section.lines.map(renderContentLine)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-20 lg:h-fit">
            <div className="overflow-hidden rounded-4xl bg-[#0F3D5E] text-white shadow-xl shadow-blue-950/15">
              <div className="bg-white/10 p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <MessageCircle className="text-[#F4B183]" size={26} />
                </div>

                <h3 className="text-2xl font-black">Need personal guidance?</h3>

                <p className="mt-3 text-sm font-semibold leading-6 text-white/75">
                  If this article feels close to what your child or family is
                  facing, you can book a consultation with Dr. Vini Jhariya.
                </p>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/contact-us"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1"
                >
                  Book Consultation
                </Link>

                <a
                  href={`https://wa.me/917999215093?text=${encodeURIComponent(
                    `Hello, I read this article: ${blog.title}. I want guidance.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="rounded-4xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5">
              <h3 className="mb-4 text-xl font-black text-[#102A43]">
                Jump to section
              </h3>

              <div className="space-y-2">
                {articleSections.slice(0, 7).map((section, index) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className="flex w-full items-center gap-3 rounded-2xl bg-[#F7FBFC] px-4 py-3 text-left text-sm font-bold text-slate-600 transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-black text-[#0F766E]">
                      {index + 1}
                    </span>
                    <span className="line-clamp-2">{section.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {blogTopics.length > 0 && (
              <div className="rounded-4xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-black text-[#102A43]">
                  <Tag size={20} className="text-[#2CB1A6]" />
                  Topics
                </h3>

                <div className="flex flex-wrap gap-2">
                  {blogTopics.map((tag) => (
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

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#0F3D5E] shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
            >
              {copied ? <Link2 size={17} /> : <Share2 size={17} />}
              {copied ? "Link Copied" : "Share Article"}
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}
