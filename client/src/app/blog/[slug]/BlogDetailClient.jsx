"use client";

import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  HelpCircle,
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
    .replace(/^####\s+/, "")
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

const isFaqSection = (title) => {
  return /faq|frequently asked|common questions/i.test(String(title || ""));
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

const createFaqItems = (blog, sections) => {
  if (Array.isArray(blog?.faqs) && blog.faqs.length > 0) {
    return blog.faqs
      .map((faq, index) => ({
        id: `faq-${index}`,
        question: faq.question || faq.q || faq.title || "",
        answer: faq.answer || faq.a || faq.description || "",
      }))
      .filter((faq) => faq.question && faq.answer);
  }

  const faqSections = sections.filter((section) => isFaqSection(section.title));
  const faqs = [];

  faqSections.forEach((section) => {
    let currentFaq = null;

    section.lines.forEach((item, index) => {
      const line = item.text;
      const isHeadingQuestion =
        line.startsWith("### ") ||
        line.startsWith("#### ") ||
        /^q[:.)]\s/i.test(line) ||
        /^question[:.)]\s/i.test(line) ||
        line.endsWith("?");

      if (isHeadingQuestion) {
        if (currentFaq?.question && currentFaq?.answer?.length > 0) {
          faqs.push({
            ...currentFaq,
            answer: currentFaq.answer.join(" "),
          });
        }

        currentFaq = {
          id: `${section.id}-faq-${index}`,
          question: line
            .replace(/^###\s+/, "")
            .replace(/^####\s+/, "")
            .replace(/^q[:.)]\s/i, "")
            .replace(/^question[:.)]\s/i, "")
            .trim(),
          answer: [],
        };

        return;
      }

      if (currentFaq) {
        currentFaq.answer.push(
          line
            .replace(/^-\s+/, "")
            .replace(/^\d+\.\s+/, "")
            .replace(/^answer[:.)]\s/i, "")
            .trim(),
        );
      }
    });

    if (currentFaq?.question && currentFaq?.answer?.length > 0) {
      faqs.push({
        ...currentFaq,
        answer: currentFaq.answer.join(" "),
      });
    }
  });

  const uniqueFaqs = [];
  const seen = new Set();

  faqs.forEach((faq) => {
    const key = faq.question.toLowerCase();

    if (!seen.has(key)) {
      seen.add(key);
      uniqueFaqs.push(faq);
    }
  });

  return uniqueFaqs;
};

export default function BlogDetailClient({ blog }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [tocOpen, setTocOpen] = useState(true);
  const [openFaqs, setOpenFaqs] = useState([]);

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

  const faqItems = useMemo(() => {
    return createFaqItems(blog, articleSections);
  }, [blog, articleSections]);

  const readableSections = useMemo(() => {
    return articleSections.filter((section) => !isFaqSection(section.title));
  }, [articleSections]);

  useEffect(() => {
    if (faqItems.length > 0) {
      setOpenFaqs([faqItems[0].id]);
    }
  }, [faqItems]);

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

  const toggleFaq = (faqId) => {
    setOpenFaqs((prev) =>
      prev.includes(faqId)
        ? prev.filter((id) => id !== faqId)
        : [...prev, faqId],
    );
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
          className="mt-10 text-2xl font-black leading-tight text-[#14304A] sm:text-3xl"
        >
          {line.replace("### ", "")}
        </h3>
      );
    }

    if (line.startsWith("#### ")) {
      return (
        <h4
          key={item.id}
          className="mt-8 text-xl font-black leading-tight text-[#14304A] sm:text-2xl"
        >
          {line.replace("#### ", "")}
        </h4>
      );
    }

    if (line.startsWith("- ")) {
      return (
        <div
          key={item.id}
          className="my-4 flex gap-3 rounded-2xl border border-[#DDF5F2] bg-[#F7FBFC] px-5 py-4 transition hover:border-[#2CB1A6]/40 hover:bg-white"
        >
          <CheckCircle2 size={19} className="mt-1 shrink-0 text-[#2CB1A6]" />

          <p className="text-base font-medium leading-8 text-slate-700">
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
          className="my-5 flex gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-[#2CB1A6]/30 hover:shadow-md"
        >
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-sm font-black text-[#0F766E]">
            {number}
          </span>

          <p className="text-base font-medium leading-8 text-slate-700">
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
      <main className="flex min-h-screen items-center justify-center bg-[#F7FBFC] px-4">
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
    <main className="relative overflow-hidden bg-[#FBFEFE] text-[#14304A]">
      <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-[#14304A]/10 blur-3xl" />

      <div className="sticky top-0 z-50 h-1 bg-white">
        <div
          className="h-full bg-[#2CB1A6] transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <section className="relative border-b border-slate-100 bg-white/90 px-4 py-5 backdrop-blur sm:px-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="transition hover:text-[#2CB1A6]">
              Home
            </Link>

            <ChevronRight size={15} />

            <Link href="/blog" className="transition hover:text-[#2CB1A6]">
              Blogs
            </Link>

            <ChevronRight size={15} />

            <span className="text-[#14304A]">Article</span>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-black text-[#14304A] shadow-sm transition hover:-translate-y-0.5 hover:border-[#2CB1A6] hover:text-[#2CB1A6]"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </section>

      <section className="relative px-4 py-10 sm:px-5 lg:py-14">
        <article className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-4xl border border-white bg-white shadow-2xl shadow-slate-900/7">
            <div className="bg-linear-to-br from-[#F7FBFC] via-white to-[#E9F8F6] p-5 sm:p-8 lg:p-10">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#2CB1A6] shadow-sm">
                  <CalendarDays size={17} />
                  {formatDate(blog.publishedAt)}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-500 shadow-sm">
                  <Clock size={17} />
                  {getReadingTime(blog)}
                </span>

                {blog.category && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-500 shadow-sm">
                    <Tag size={16} />
                    {blog.category}
                  </span>
                )}
              </div>

              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2CB1A6]/20 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0F766E]">
                <Sparkles size={14} />
                Parent Friendly Guide
              </span>

              <h1 className="max-w-4xl text-3xl font-black leading-tight tracking-[-0.04em] text-[#14304A] sm:text-5xl lg:text-[58px]">
                {blog.title}
              </h1>

              {blog.excerpt && (
                <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg">
                  {blog.excerpt}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2CB1A6] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#2CB1A6]/25 transition hover:-translate-y-1 hover:bg-[#14304A]"
                >
                  <MessageCircle size={17} />
                  Book Consultation
                </Link>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-black text-[#14304A] shadow-sm transition hover:-translate-y-1 hover:border-[#2CB1A6] hover:text-[#2CB1A6]"
                >
                  {copied ? <Link2 size={17} /> : <Share2 size={17} />}
                  {copied ? "Link Copied" : "Share Article"}
                </button>
              </div>
            </div>

            <div className="p-5 sm:p-8 lg:p-10">
              <div className="overflow-hidden rounded-3xl border border-slate-100 bg-[#F7FBFC] shadow-inner">
                {blog.image?.url ? (
                  <img
                    src={blog.image.url}
                    alt={`${blog.title} by Dr. Vini Jhariya, Clinical & Child Psychologist in Indore`}
                    className="h-auto max-h-140 w-full object-contain"
                  />
                ) : (
                  <div className="flex h-72 items-center justify-center bg-[#F7FBFC] text-[#2CB1A6]/40 sm:h-96">
                    <BookOpen size={80} />
                  </div>
                )}
              </div>

              <div className="my-8 overflow-hidden rounded-3xl border border-[#DDF5F2] bg-white shadow-lg shadow-slate-900/5">
                <button
                  type="button"
                  onClick={() => setTocOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-[#F7FBFC] sm:px-6"
                >
                  <div>
                    <h2 className="text-xl font-black text-[#14304A]">
                      Table of Contents
                    </h2>

                    <p className="mt-1 text-xs font-bold text-slate-500">
                      Tap any topic to jump directly
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black text-[#0F766E]">
                    Toggle
                    <ChevronDown
                      size={17}
                      className={`transition ${tocOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>

                {tocOpen && (
                  <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {readableSections.map((section, index) => (
                        <li key={section.id}>
                          <button
                            type="button"
                            onClick={() => scrollToSection(section.id)}
                            className="group flex h-full w-full gap-3 rounded-2xl border border-slate-100 bg-[#FBFEFE] px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-[#2CB1A6]/40 hover:bg-white hover:shadow-md"
                          >
                            <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-xs font-black text-[#0F766E]">
                              {index + 1}
                            </span>

                            <span className="block text-[15px] font-black leading-7 text-slate-700 transition group-hover:text-[#2CB1A6]">
                              {section.title}
                            </span>
                          </button>
                        </li>
                      ))}

                      {faqItems.length > 0 && (
                        <li>
                          <button
                            type="button"
                            onClick={() => scrollToSection("faqs")}
                            className="group flex h-full w-full gap-3 rounded-2xl border border-slate-100 bg-[#FBFEFE] px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-[#2CB1A6]/40 hover:bg-white hover:shadow-md"
                          >
                            <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-xs font-black text-[#0F766E]">
                              ?
                            </span>

                            <span className="block text-[15px] font-black leading-7 text-slate-700 transition group-hover:text-[#2CB1A6]">
                              FAQs
                            </span>
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="article-content">
                {readableSections.length > 0 ? (
                  readableSections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-24 border-b border-slate-100 py-8 last:border-b-0"
                    >
                      {section.title !== "Introduction" && (
                        <div className="mb-6">
                          <span className="mb-3 inline-flex h-1 w-14 rounded-full bg-[#2CB1A6]" />

                          <h2 className="text-3xl font-black leading-tight tracking-[-0.02em] text-[#14304A] sm:text-4xl">
                            {section.title}
                          </h2>
                        </div>
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

              {faqItems.length > 0 && (
                <section
                  id="faqs"
                  className="scroll-mt-24 border-t border-slate-100 pt-10"
                >
                  <div className="mb-6 text-center">
                    <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
                      <HelpCircle size={28} />
                    </span>

                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2CB1A6]">
                      Questions & Answers
                    </p>

                    <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#14304A] sm:text-4xl">
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {faqItems.map((faq, index) => {
                      const isOpen = openFaqs.includes(faq.id);

                      return (
                        <div
                          key={faq.id}
                          className={`overflow-hidden rounded-2xl border transition ${
                            isOpen
                              ? "border-[#2CB1A6]/30 bg-white shadow-lg shadow-slate-900/5"
                              : "border-slate-100 bg-[#F7FBFC]"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleFaq(faq.id)}
                            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-white"
                          >
                            <div className="flex gap-4">
                              <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                                  isOpen
                                    ? "bg-[#2CB1A6] text-white"
                                    : "bg-white text-[#0F766E]"
                                }`}
                              >
                                {index + 1}
                              </span>

                              <h3 className="text-base font-black leading-7 text-[#14304A] sm:text-lg">
                                {faq.question}
                              </h3>
                            </div>

                            <ChevronDown
                              size={20}
                              className={`shrink-0 text-[#2CB1A6] transition ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="border-t border-slate-100 bg-white px-5 pb-5 pt-4 sm:pl-17">
                              <p className="text-base font-medium leading-8 text-slate-700">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {blogTopics.length > 0 && (
                <div className="mt-10 border-t border-slate-100 pt-6">
                  <h3 className="mb-4 text-lg font-black text-[#14304A]">
                    Tags
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {blogTopics.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-600 transition hover:border-[#2CB1A6] hover:text-[#2CB1A6]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 overflow-hidden rounded-[1.75rem] bg-linear-to-br from-[#14304A] to-[#0F3D5E] p-6 text-white shadow-xl shadow-[#14304A]/15 sm:p-8">
                <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-[#7FE1D8]">
                      Need guidance?
                    </p>

                    <h3 className="mt-2 text-2xl font-black sm:text-3xl">
                      Talk to Dr. Vini Jhariya
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-white/75">
                      If this article feels close to what your child or family
                      is facing, you can book a consultation and get clear next
                      steps.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-black text-[#14304A] transition hover:-translate-y-1"
                    >
                      Book Consultation
                    </Link>

                    <a
                      href={`https://wa.me/917999215093?text=${encodeURIComponent(
                        `Hello, I read this article: ${blog.title}. I want guidance.`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1"
                    >
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-slate-100 py-6">
                <div>
                  <p className="text-sm font-bold text-slate-500">Share</p>
                  <p className="mt-1 text-lg font-black text-[#14304A]">
                    Help another parent read this
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#14304A] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#2CB1A6]"
                >
                  {copied ? <Link2 size={17} /> : <Share2 size={17} />}
                  {copied ? "Link Copied" : "Share Article"}
                </button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/blog"
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#2CB1A6] hover:bg-[#F7FBFC] hover:shadow-lg hover:shadow-slate-900/5"
                >
                  <p className="text-sm font-bold text-slate-500">
                    « Previous Post
                  </p>
                  <p className="mt-2 font-black text-[#14304A]">
                    Explore more articles
                  </p>
                </Link>

                <Link
                  href="/blog"
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-[#2CB1A6] hover:bg-[#F7FBFC] hover:shadow-lg hover:shadow-slate-900/5 sm:text-right"
                >
                  <p className="text-sm font-bold text-slate-500">
                    Next Post »
                  </p>
                  <p className="mt-2 font-black text-[#14304A]">
                    Read latest guidance
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
