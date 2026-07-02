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
  Search,
  Share2,
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

const blogCategories = [
  "Autism",
  "ADHD",
  "Dyslexia",
  "Parenting",
  "Teen Mental Health",
  "Child Behaviour",
  "School & Exams",
  "Adult Mental Health",
];

const usefulLinks = [
  { name: "Home", href: "/" },
  { name: "About Dr. Vini", href: "/about-dr-vini" },
  { name: "Online Consultation", href: "/online-consultation" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function BlogDetailClient({ blog }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [tocOpen, setTocOpen] = useState(true);

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

  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
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

    if (line.startsWith("##### Tags:")) {
      return null;
    }

    if (line.startsWith("### ")) {
      return (
        <h3
          key={item.id}
          className="mt-8 text-2xl font-bold leading-tight text-[#17324D]"
        >
          {line.replace("### ", "")}
        </h3>
      );
    }

    if (line.startsWith("#### ")) {
      return (
        <h4
          key={item.id}
          className="mt-7 text-xl font-bold leading-tight text-[#17324D]"
        >
          {line.replace("#### ", "")}
        </h4>
      );
    }

    if (line.startsWith("- ")) {
      return (
        <div key={item.id} className="my-4 flex gap-3">
          <CheckCircle2 size={19} className="mt-1 shrink-0 text-[#35AFA4]" />

          <p className="text-[16px] font-medium leading-8 text-slate-700">
            {line.replace("- ", "")}
          </p>
        </div>
      );
    }

    if (/^\d+\.\s/.test(line)) {
      const number = line.match(/^\d+/)?.[0];
      const text = line.replace(/^\d+\.\s/, "");

      return (
        <div key={item.id} className="my-5 flex gap-4">
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-sm font-bold text-[#0F766E]">
            {number}
          </span>

          <p className="text-[16px] font-medium leading-8 text-slate-700">
            {text}
          </p>
        </div>
      );
    }

    return (
      <p
        key={item.id}
        className="my-5 text-[16px] font-medium leading-8 text-slate-700 sm:text-[17px] sm:leading-9"
      >
        {line}
      </p>
    );
  };

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4 sm:px-5">
        <div className="max-w-xl rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-xl shadow-slate-900/5 sm:p-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E9F8F6]">
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
    <main className="bg-white text-[#17324D]">
      <div className="sticky top-0 z-50 h-1 bg-white">
        <div
          className="h-full bg-[#35AFA4] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <section className="border-b border-slate-100 bg-white px-4 py-5 sm:px-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500">
            <Link href="/" className="transition hover:text-[#35AFA4]">
              Home
            </Link>

            <ChevronRight size={15} />

            <Link href="/blog" className="transition hover:text-[#35AFA4]">
              Blogs
            </Link>

            <ChevronRight size={15} />

            <span className="text-[#17324D]">Article</span>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-[#17324D] transition hover:border-[#35AFA4] hover:text-[#35AFA4]"
          >
            <ArrowLeft size={15} />
            Back to Blog
          </Link>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-5 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,850px)_330px] lg:items-start">
          <article className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#35AFA4]">
                <CalendarDays size={17} />
                {formatDate(blog.publishedAt)}
              </span>

              <span className="h-1 w-1 rounded-full bg-slate-300" />

              <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-500">
                <Clock size={17} />
                {getReadingTime(blog)}
              </span>

              {blog.category && (
                <>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />

                  <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-500">
                    <Tag size={16} />
                    {blog.category}
                  </span>
                </>
              )}
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.04em] text-[#17324D] sm:text-5xl lg:text-[56px]">
              {blog.title}
            </h1>

            {blog.excerpt && (
              <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-slate-600">
                {blog.excerpt}
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#35AFA4] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#35AFA4]/20 transition hover:-translate-y-1 hover:bg-[#17324D]"
              >
                <MessageCircle size={17} />
                Book Consultation
              </Link>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-[#17324D] transition hover:-translate-y-1 hover:border-[#35AFA4] hover:text-[#35AFA4]"
              >
                {copied ? <Link2 size={17} /> : <Share2 size={17} />}
                {copied ? "Link Copied" : "Share Article"}
              </button>
            </div>

            <div className="mt-9 overflow-hidden rounded-sm border border-slate-100 bg-[#F7FBFC]">
              {blog.image?.url ? (
                <img
                  src={blog.image.url}
                  alt={`${blog.title} by Dr. Vini Jhariya, Clinical & Child Psychologist in Indore`}
                  className="h-auto max-h-140 w-full object-contain"
                />
              ) : (
                <div className="flex h-72 items-center justify-center bg-[#F7FBFC] text-[#35AFA4]/40 sm:h-96">
                  <BookOpen size={80} />
                </div>
              )}
            </div>

            <div className="my-8 overflow-hidden rounded-sm border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setTocOpen((prev) => !prev)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[#F7FBFC] sm:px-6"
              >
                <h2 className="text-xl font-bold text-[#17324D]">
                  Table of Contents
                </h2>

                <span className="inline-flex items-center gap-2 text-sm font-bold text-[#35AFA4]">
                  Toggle
                  <ChevronDown
                    size={18}
                    className={`transition ${tocOpen ? "rotate-180" : ""}`}
                  />
                </span>
              </button>

              {tocOpen && (
                <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
                  <ul className="space-y-3">
                    {articleSections.map((section) => {
                      const subHeadings = section.lines
                        .filter((item) => item.text.startsWith("### "))
                        .slice(0, 5);

                      return (
                        <li key={section.id}>
                          <button
                            type="button"
                            onClick={() => scrollToSection(section.id)}
                            className="group block w-full text-left"
                          >
                            <span className="block text-[15px] font-bold leading-7 text-slate-700 transition group-hover:text-[#35AFA4]">
                              {section.title}
                            </span>

                            {subHeadings.length > 0 && (
                              <span className="mt-1 block space-y-1 pl-5">
                                {subHeadings.map((item) => (
                                  <span
                                    key={item.id}
                                    className="block text-sm font-medium leading-6 text-slate-500 transition before:mr-2 before:content-['•'] group-hover:text-slate-700"
                                  >
                                    {item.text.replace("### ", "")}
                                  </span>
                                ))}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <div className="article-content">
              {articleSections.length > 0 ? (
                articleSections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24 border-b border-slate-100 py-7 last:border-b-0"
                  >
                    {section.title !== "Introduction" && (
                      <h2 className="mb-5 text-3xl font-black leading-tight tracking-[-0.02em] text-[#17324D] sm:text-4xl">
                        {section.title}
                      </h2>
                    )}

                    <div>{section.lines.map(renderContentLine)}</div>
                  </section>
                ))
              ) : (
                <p className="my-5 text-[17px] font-medium leading-9 text-slate-700">
                  {blog.excerpt || "Content will be updated soon."}
                </p>
              )}
            </div>

            {blogTopics.length > 0 && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="mb-4 text-lg font-black text-[#17324D]">
                  Tags:
                </h3>

                <div className="flex flex-wrap gap-2">
                  {blogTopics.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-600 transition hover:border-[#35AFA4] hover:text-[#35AFA4]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-slate-100 py-6">
              <div>
                <p className="text-sm font-bold text-slate-500">Share:</p>
                <p className="mt-1 text-lg font-black text-[#17324D]">
                  Help another parent read this
                </p>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17324D] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#35AFA4]"
              >
                {copied ? <Link2 size={17} /> : <Share2 size={17} />}
                {copied ? "Link Copied" : "Share Article"}
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Link
                href="/blog"
                className="rounded-sm border border-slate-200 bg-white p-5 transition hover:border-[#35AFA4] hover:bg-[#F7FBFC]"
              >
                <p className="text-sm font-bold text-slate-500">
                  « Previous Post
                </p>
                <p className="mt-2 font-black text-[#17324D]">
                  Explore more articles
                </p>
              </Link>

              <Link
                href="/blog"
                className="rounded-sm border border-slate-200 bg-white p-5 text-left transition hover:border-[#35AFA4] hover:bg-[#F7FBFC] sm:text-right"
              >
                <p className="text-sm font-bold text-slate-500">Next Post »</p>
                <p className="mt-2 font-black text-[#17324D]">
                  Read latest guidance
                </p>
              </Link>
            </div>
          </article>

          <aside className="space-y-8 lg:sticky lg:top-20 lg:h-fit">
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <h3 className="text-xl font-black text-[#17324D]">Search</h3>

              <div className="relative mt-4">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search"
                  className="h-12 w-full rounded-sm border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#35AFA4]"
                />
              </div>
            </div>

            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <h3 className="text-xl font-black text-[#17324D]">
                Article Sections
              </h3>

              <div className="mt-4 space-y-3">
                {articleSections.slice(0, 6).map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className="block w-full border-b border-slate-100 pb-3 text-left text-sm font-bold leading-6 text-slate-600 transition last:border-b-0 last:pb-0 hover:text-[#35AFA4]"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <h3 className="text-xl font-black text-[#17324D]">Categories</h3>

              <div className="mt-4 space-y-3">
                {blogCategories.map((category) => (
                  <Link
                    key={category}
                    href={`/blog?category=${encodeURIComponent(category)}`}
                    className="block border-b border-slate-100 pb-3 text-sm font-bold text-slate-600 transition last:border-b-0 last:pb-0 hover:text-[#35AFA4]"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <h3 className="text-xl font-black text-[#17324D]">
                Popular Tags
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {(blogTopics.length > 0 ? blogTopics : blogCategories)
                  .slice(0, 12)
                  .map((tag) => (
                    <Link
                      key={tag}
                      href="/blog"
                      className="rounded-full border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#35AFA4] hover:text-[#35AFA4]"
                    >
                      {tag}
                    </Link>
                  ))}
              </div>
            </div>

            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <h3 className="text-xl font-black text-[#17324D]">
                Useful Links
              </h3>

              <div className="mt-4 space-y-3">
                {usefulLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block border-b border-slate-100 pb-3 text-sm font-bold text-slate-600 transition last:border-b-0 last:pb-0 hover:text-[#35AFA4]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-sm bg-[#17324D] text-white">
              <div className="p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <MessageCircle className="text-[#35AFA4]" size={25} />
                </div>

                <h3 className="text-2xl font-black">Get in Touch</h3>

                <p className="mt-3 text-sm font-medium leading-7 text-white/75">
                  Questions? Concerns? We are here to listen and guide your
                  family with the right support.
                </p>

                <Link
                  href="/contact-us"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-black text-[#17324D] transition hover:-translate-y-1"
                >
                  Book Consultation
                </Link>

                <a
                  href={`https://wa.me/917999215093?text=${encodeURIComponent(
                    `Hello, I read this article: ${blog.title}. I want guidance.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#35AFA4] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
