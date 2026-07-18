"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  HelpCircle,
  Info,
  Link2,
  List,
  MessageCircle,
  Minus,
  Plus,
  Quote,
  Search,
  Share2,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const SECTION_START_PATTERN =
  /^(how|understanding|what|reading|why|when|after|before|if you|the report|frequently asked|common questions|questions and answers|next steps|summary|conclusion|final thoughts)\b/i;

const FAQ_TITLE_PATTERN =
  /faq|frequently asked|common questions|questions and answers/i;

const CALLOUT_PATTERN =
  /^(tip|note|important|key takeaway|critical misunderstanding)\s*:?(.*)$/i;

const formatDate = (date) => {
  if (!date) return "Recent";

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }).format(new Date(date));
  } catch {
    return "Recent";
  }
};

const getReadingTime = (blog) => {
  if (blog?.readingTime) {
    const value = String(blog.readingTime);
    return value.includes("min") ? value : `${value} min read`;
  }

  const text = [blog?.title, blog?.excerpt, blog?.content]
    .filter(Boolean)
    .join(" ")
    .replace(/<[^>]*>/g, " ");

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.ceil(words / 190))} min read`;
};

const slugify = (text) =>
  String(text || "")
    .replace(/^#{1,6}\s+/, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const getBlogImage = (blog = {}) => {
  if (typeof blog.image === "string") return blog.image;

  return (
    blog.image?.url ||
    blog.image?.secure_url ||
    blog.featuredImage?.url ||
    blog.featuredImage ||
    blog.thumbnail?.url ||
    blog.thumbnail ||
    ""
  );
};

const optimizeCloudinaryImage = (url, width = 1800) => {
  if (!url || !url.includes("res.cloudinary.com")) return url;

  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
};

const decodeHtmlEntities = (value) =>
  String(value || "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

const normalizeContent = (content) => {
  if (!content) return [];

  return decodeHtmlEntities(content)
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<h2[^>]*>/gi, "\n## ")
    .replace(/<\/h2>/gi, "\n")
    .replace(/<h3[^>]*>/gi, "\n### ")
    .replace(/<\/h3>/gi, "\n")
    .replace(/<h4[^>]*>/gi, "\n#### ")
    .replace(/<\/h4>/gi, "\n")
    .replace(/<blockquote[^>]*>/gi, "\n> ")
    .replace(/<\/blockquote>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
};

const isFaqSection = (title) => FAQ_TITLE_PATTERN.test(String(title || ""));

const getTitleCaseRatio = (value) => {
  const ignoredWords = new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "by",
    "for",
    "from",
    "in",
    "is",
    "of",
    "on",
    "or",
    "the",
    "to",
    "with",
    "your",
  ]);

  const words = String(value || "")
    .replace(/[—–:()]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !ignoredWords.has(word.toLowerCase()));

  if (!words.length) return 0;

  const titleWords = words.filter(
    (word) => /^[A-Z0-9]/.test(word) || /^[A-Z]{2,}$/.test(word),
  );

  return titleWords.length / words.length;
};

const isPlainSectionHeading = (line) => {
  const value = String(line || "").trim();

  if (!value || value.startsWith("#")) return false;
  if (isFaqSection(value)) return true;
  if (value.length < 5 || value.length > 120) return false;
  if (/^(q|question|faq)\s*\d*\s*[:.)-]/i.test(value)) return false;
  if (/^[-•*\d]/.test(value)) return false;
  if (/[.!]$/.test(value)) return false;

  return (
    SECTION_START_PATTERN.test(value) &&
    (getTitleCaseRatio(value) >= 0.35 || value.includes("—"))
  );
};

const isPlainSubheading = (line) => {
  const value = String(line || "").trim();
  const withoutColon = value.replace(/:\s*$/, "");

  if (!value || value.startsWith("#")) return false;
  if (isPlainSectionHeading(value) || isFaqSection(value)) return false;
  if (value.length < 3 || value.length > 95) return false;
  if (/^(q|question|faq)\s*\d*\s*[:.)-]/i.test(value)) return false;
  if (/^[-•*\d]/.test(value)) return false;
  if (/[.!?]$/.test(value)) return false;
  if (CALLOUT_PATTERN.test(value)) return false;

  const words = withoutColon.split(/\s+/).filter(Boolean);
  if (words.length > 13) return false;

  return getTitleCaseRatio(withoutColon) >= 0.5;
};

const createSections = (lines) => {
  const sections = [];

  let current = {
    id: "introduction",
    title: "Introduction",
    lines: [],
  };

  const pushCurrentSection = () => {
    if (current.lines.length) sections.push(current);
  };

  lines.forEach((line, index) => {
    const explicitHeading = line.startsWith("## ");
    const plainHeading = isPlainSectionHeading(line);

    if (explicitHeading || plainHeading) {
      pushCurrentSection();

      const title = explicitHeading ? line.replace(/^##\s+/, "").trim() : line;

      current = {
        id: `${slugify(title) || "section"}-${index}`,
        title,
        lines: [],
      };

      return;
    }

    current.lines.push({
      id: `line-${index}`,
      text: line,
    });
  });

  pushCurrentSection();
  return sections;
};

const cleanQuestion = (value) =>
  decodeHtmlEntities(value)
    .replace(/^[-*•]\s+/, "")
    .replace(/^#{3,6}\s+/, "")
    .replace(/^\*\*(.+)\*\*$/, "$1")
    .replace(/^(?:q|question|faq)\s*\d*\s*[:.)-]\s*/i, "")
    .replace(/<[^>]+>/g, "")
    .trim();

const cleanAnswer = (value) =>
  decodeHtmlEntities(value)
    .replace(/^[-*•]\s+/, "")
    .replace(/^\d+\.\s+/, "")
    .replace(/^(?:a|answer)\s*\d*\s*[:.)-]\s*/i, "")
    .replace(/^\*\*(.+)\*\*$/, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();

const extractFaqs = (blog, allSections) => {
  const directFaqs = [
    ...(Array.isArray(blog?.faqs) ? blog.faqs : []),
    ...(Array.isArray(blog?.faq) ? blog.faq : []),
  ]
    .map((faq, index) => {
      if (typeof faq === "string") {
        const separator = faq.includes("|") ? "|" : "::";
        const [question, ...answer] = faq.split(separator);

        return {
          id: `faq-${index}`,
          question: cleanQuestion(question),
          answer: cleanAnswer(answer.join(separator)),
        };
      }

      return {
        id: String(faq?._id || `faq-${index}`),
        question: cleanQuestion(
          faq?.question || faq?.q || faq?.title || faq?.heading,
        ),
        answer: cleanAnswer(
          faq?.answer || faq?.a || faq?.description || faq?.content,
        ),
      };
    })
    .filter((faq) => faq.question && faq.answer);

  if (directFaqs.length) return directFaqs;

  const extracted = [];

  allSections
    .filter((section) => isFaqSection(section.title))
    .forEach((section) => {
      let currentFaq = null;

      const flushFaq = () => {
        if (currentFaq?.question && currentFaq.answer.length) {
          extracted.push({
            ...currentFaq,
            answer: currentFaq.answer.join(" ").trim(),
          });
        }
      };

      section.lines.forEach((item, index) => {
        const raw = String(item.text || "").trim();
        if (!raw) return;

        const cleaned = raw
          .replace(/^[-*•]\s+/, "")
          .replace(/^#{3,6}\s+/, "")
          .replace(/^\*\*(.+)\*\*$/, "$1")
          .trim();

        const looksLikeQuestion =
          raw.startsWith("### ") ||
          raw.startsWith("#### ") ||
          /^(?:q|question|faq)\s*\d*\s*[:.)-]\s*/i.test(cleaned) ||
          (cleaned.endsWith("?") && cleaned.length < 240);

        if (looksLikeQuestion) {
          flushFaq();

          currentFaq = {
            id: `${section.id}-faq-${index}`,
            question: cleanQuestion(cleaned),
            answer: [],
          };

          return;
        }

        if (currentFaq) {
          const answer = cleanAnswer(raw);
          if (answer) currentFaq.answer.push(answer);
        }
      });

      flushFaq();
    });

  const seen = new Set();

  return extracted.filter((faq) => {
    const key = faq.question.toLowerCase();

    if (!faq.answer || seen.has(key)) return false;

    seen.add(key);
    return true;
  });
};

const getTopics = (blog) => {
  const values = [
    ...(Array.isArray(blog?.topics) ? blog.topics : []),
    ...(Array.isArray(blog?.tags) ? blog.tags : []),
    blog?.topic,
  ]
    .map((item) => String(item || "").trim())
    .filter(Boolean);

  const unique = [...new Set(values)];
  return unique.length ? unique : blog?.category ? [blog.category] : [];
};

const renderInline = (value) => {
  const parts = String(value || "").split(
    /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g,
  );

  return parts.map((part, index) => {
    const bold = part.match(/^\*\*(.+)\*\*$/);

    if (bold) {
      return (
        <strong
          key={`${part}-${index}`}
          className="font-extrabold text-[#102A43]"
        >
          {bold[1]}
        </strong>
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (link) {
      const [, label, href] = link;
      const external = href.startsWith("http");

      return (
        <a
          key={`${href}-${index}`}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="font-bold text-[#168F87] underline decoration-[#2CB1A6]/35 underline-offset-4 transition hover:text-[#0F3D5E]"
        >
          {label}
        </a>
      );
    }

    return part;
  });
};

export default function BlogDetailClient({
  blog,
  recentBlogs = [],
  categories = [],
  previousBlog = null,
  nextBlog = null,
}) {
  const articleRef = useRef(null);

  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState("");
  const [tocOpen, setTocOpen] = useState(true);
  const [openFaqIds, setOpenFaqIds] = useState([]);
  const [copied, setCopied] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const lines = useMemo(() => normalizeContent(blog?.content), [blog?.content]);
  const allSections = useMemo(() => createSections(lines), [lines]);

  const articleSections = useMemo(
    () => allSections.filter((section) => !isFaqSection(section.title)),
    [allSections],
  );

  const tocSections = useMemo(
    () => articleSections.filter((section) => section.title !== "Introduction"),
    [articleSections],
  );

  const faqItems = useMemo(
    () => extractFaqs(blog, allSections),
    [blog, allSections],
  );

  const topics = useMemo(() => getTopics(blog), [blog]);

  const featuredImage = useMemo(
    () => optimizeCloudinaryImage(getBlogImage(blog)),
    [blog],
  );

  const filteredTocSections = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return tocSections;

    return tocSections.filter((section) =>
      section.title.toLowerCase().includes(query),
    );
  }, [searchValue, tocSections]);

  const filteredRecentBlogs = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    const source = Array.isArray(recentBlogs) ? recentBlogs : [];

    if (!query) return source.slice(0, 5);

    return source
      .filter((item) =>
        String(item?.title || "")
          .toLowerCase()
          .includes(query),
      )
      .slice(0, 5);
  }, [recentBlogs, searchValue]);

  const sidebarCategories = useMemo(() => {
    const supplied = Array.isArray(categories) ? categories : [];

    if (supplied.length) {
      return supplied
        .map((item) =>
          typeof item === "string"
            ? { name: item, href: `/blog?category=${encodeURIComponent(item)}` }
            : {
                name: item?.name || item?.title || item?.category || "",
                href:
                  item?.href ||
                  `/blog?category=${encodeURIComponent(
                    item?.name || item?.title || item?.category || "",
                  )}`,
              },
        )
        .filter((item) => item.name);
    }

    const fallback = [
      blog?.category,
      ...recentBlogs.map((item) => item?.category),
    ].filter(Boolean);

    return [...new Set(fallback)].map((name) => ({
      name,
      href: `/blog?category=${encodeURIComponent(name)}`,
    }));
  }, [blog?.category, categories, recentBlogs]);

  useEffect(() => {
    setOpenFaqIds([]);
  }, [faqItems]);

  useEffect(() => {
    const updateProgress = () => {
      const article = articleRef.current;
      if (!article) return;

      const top = article.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(1, article.offsetHeight - window.innerHeight);
      const value = Math.min(
        100,
        Math.max(0, ((window.scrollY - top) / distance) * 100),
      );

      setReadingProgress(value);
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!tocSections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          );

        if (visible.length) setActiveSectionId(visible[0].target.id);
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.2, 0.5],
      },
    );

    tocSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocSections]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleFaq = (id) => {
    setOpenFaqIds((current) =>
      current.includes(id)
        ? current.filter((faqId) => faqId !== id)
        : [...current, id],
    );
  };

  const allFaqsOpen =
    faqItems.length > 0 && openFaqIds.length === faqItems.length;

  const toggleAllFaqs = () => {
    setOpenFaqIds(allFaqsOpen ? [] : faqItems.map((faq) => faq.id));
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    try {
      if (navigator.share) {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt || blog?.title,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Unable to share article:", error);
      }
    }
  };

  const renderContentLine = (item) => {
    const line = item.text.trim();

    if (line.startsWith("##### Tags:") || line === "Tags:") return null;

    if (line === "---") {
      return <div key={item.id} className="my-10 h-px bg-[#DCEBED]" />;
    }

    if (line.startsWith("### ")) {
      return (
        <h3
          key={item.id}
          className="mb-4 mt-10 text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[#102A43] sm:text-3xl"
        >
          {renderInline(line.replace(/^###\s+/, ""))}
        </h3>
      );
    }

    if (line.startsWith("#### ")) {
      return (
        <h4
          key={item.id}
          className="mb-3 mt-8 text-xl font-extrabold leading-tight text-[#102A43] sm:text-2xl"
        >
          {renderInline(line.replace(/^####\s+/, ""))}
        </h4>
      );
    }

    if (isPlainSubheading(line)) {
      return (
        <h3
          key={item.id}
          className="mb-4 mt-10 text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[#102A43] sm:text-[1.75rem]"
        >
          {renderInline(line.replace(/:\s*$/, ""))}
        </h3>
      );
    }

    if (line.startsWith("> ")) {
      return (
        <blockquote
          key={item.id}
          className="relative my-9 overflow-hidden border-l-4 border-[#2CB1A6] bg-[#F1F9F8] px-6 py-7 sm:px-8"
        >
          <Quote
            size={88}
            className="absolute -right-2 -top-4 text-[#168F87]/[0.06]"
          />

          <p className="relative text-lg font-bold italic leading-8 text-[#24465D] sm:text-xl sm:leading-9">
            {renderInline(line.replace(/^>\s+/, ""))}
          </p>
        </blockquote>
      );
    }

    const callout = line.match(CALLOUT_PATTERN);

    if (callout && callout[2]?.trim()) {
      return (
        <div
          key={item.id}
          className="my-8 flex items-start gap-4 rounded-[1.25rem] border border-[#F4B183]/35 bg-[#FFF8F0] p-5 sm:p-6"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#B96A24] shadow-sm">
            <Info size={19} />
          </span>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#B96A24]">
              {callout[1]}
            </p>

            <p className="mt-2 text-base font-medium leading-8 text-slate-700 sm:text-[17px] sm:leading-9">
              {renderInline(callout[2].trim())}
            </p>
          </div>
        </div>
      );
    }

    if (line.startsWith("- ") || line.startsWith("• ")) {
      return (
        <div key={item.id} className="my-3 flex items-start gap-3">
          <span className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-[#168F87]">
            <CheckCircle2 size={15} />
          </span>

          <p className="text-base font-medium leading-8 text-slate-700 sm:text-[17px] sm:leading-9">
            {renderInline(line.replace(/^[-•]\s+/, ""))}
          </p>
        </div>
      );
    }

    if (/^\d+\.\s/.test(line)) {
      const number = line.match(/^\d+/)?.[0] || "";
      const text = line.replace(/^\d+\.\s/, "");

      return (
        <div
          key={item.id}
          className="my-5 grid grid-cols-[40px_1fr] gap-4 rounded-[1.25rem] border border-[#DCEBED] bg-[#FBFEFE] p-5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F3D5E] text-sm font-black text-white">
            {number}
          </span>

          <p className="text-base font-medium leading-8 text-slate-700 sm:text-[17px] sm:leading-9">
            {renderInline(text)}
          </p>
        </div>
      );
    }

    if (/^(Page|Pages)\s+\d/i.test(line)) {
      return (
        <div
          key={item.id}
          className="my-3 border-l-2 border-[#2CB1A6] py-1 pl-4 text-base font-medium leading-8 text-slate-700 sm:text-[17px]"
        >
          {renderInline(line)}
        </div>
      );
    }

    return (
      <p
        key={item.id}
        className="my-5 text-base font-medium leading-8 text-slate-700 sm:text-[17px] sm:leading-9"
      >
        {renderInline(line)}
      </p>
    );
  };

  const renderSectionLines = (sectionLines) => {
    const output = [];

    for (let index = 0; index < sectionLines.length; index += 1) {
      const item = sectionLines[index];
      const line = item.text.trim();
      const callout = line.match(CALLOUT_PATTERN);

      if (callout && !callout[2]?.trim() && sectionLines[index + 1]) {
        const nextItem = sectionLines[index + 1];

        output.push(
          <div
            key={`${item.id}-${nextItem.id}`}
            className="my-8 flex items-start gap-4 rounded-[1.25rem] border border-[#F4B183]/35 bg-[#FFF8F0] p-5 sm:p-6"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#B96A24] shadow-sm">
              <Info size={19} />
            </span>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#B96A24]">
                {callout[1]}
              </p>

              <p className="mt-2 text-base font-medium leading-8 text-slate-700 sm:text-[17px] sm:leading-9">
                {renderInline(nextItem.text)}
              </p>
            </div>
          </div>,
        );

        index += 1;
        continue;
      }

      output.push(renderContentLine(item));
    }

    return output;
  };

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FBFC] px-5">
        <div className="max-w-lg rounded-[1.5rem] border border-[#0F3D5E]/10 bg-white p-8 text-center shadow-xl">
          <BookOpen className="mx-auto text-[#168F87]" size={40} />

          <h1 className="mt-5 text-3xl font-black text-[#102A43]">
            Article not found
          </h1>

          <Link
            href="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3.5 text-sm font-black text-white"
          >
            <ArrowLeft size={17} />
            Return to Blog
          </Link>
        </div>
      </main>
    );
  }

  const publishedDate = blog.publishedAt || blog.createdAt;

  return (
    <main className="overflow-hidden bg-white text-[#102A43]">
      <div className="fixed inset-x-0 top-0 z-[100] h-1 bg-white/80">
        <motion.div
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.12 }}
          className="h-full bg-[#2CB1A6]"
        />
      </div>

      <div className="border-b border-[#0F3D5E]/8 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 text-xs font-bold text-slate-500 sm:text-sm">
            <Link href="/" className="transition hover:text-[#168F87]">
              Home
            </Link>

            <ChevronRight size={14} />

            <Link href="/blog" className="transition hover:text-[#168F87]">
              Blog
            </Link>

            <ChevronRight size={14} />

            <span className="truncate text-[#102A43]">
              {blog.category || "Article"}
            </span>
          </div>

          <Link
            href="/blog"
            className="hidden items-center gap-2 text-sm font-black text-[#0F3D5E] transition hover:text-[#168F87] sm:inline-flex"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </div>
      </div>

      <section className="bg-[#F7FBFC] px-5 pb-12 pt-14 text-center sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-slate-500">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} className="text-[#168F87]" />
              {formatDate(publishedDate)}
            </span>

            <span className="h-1 w-1 rounded-full bg-slate-300" />

            <span className="inline-flex items-center gap-2">
              <Clock3 size={16} className="text-[#168F87]" />
              {getReadingTime(blog)}
            </span>

            {blog.category && (
              <>
                <span className="h-1 w-1 rounded-full bg-slate-300" />

                <span className="inline-flex items-center gap-2 text-[#168F87]">
                  <Tag size={15} />
                  {blog.category}
                </span>
              </>
            )}
          </div>

          <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-black leading-[1.08] tracking-[-0.04em] text-[#102A43] sm:text-5xl lg:text-[4.25rem]">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-lg sm:leading-9">
              {blog.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full bg-[#E9F8F6]">
                <Image
                  src="/images/vini-pic.jpeg"
                  alt="Dr. Vini Jhariya"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>

              <div className="text-left">
                <p className="text-sm font-black text-[#102A43]">
                  Dr. Vini Jhariya
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Clinical & Child Psychologist
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-full border border-[#0F3D5E]/12 bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
            >
              {copied ? <Link2 size={17} /> : <Share2 size={17} />}
              {copied ? "Link Copied" : "Share Article"}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#F7FBFC] to-white px-5 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] bg-[#ECF4F5] shadow-[0_24px_70px_rgba(15,61,94,0.13)] sm:rounded-[2rem]">
          <div className="relative aspect-[16/9]">
            {featuredImage ? (
              <Image
                src={featuredImage}
                alt={`${blog.title} by Dr. Vini Jhariya`}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1150px"
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[#E9F8F6] text-[#168F87]/30">
                <BookOpen size={90} />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <article ref={articleRef} className="min-w-0">
            {(tocSections.length > 0 || faqItems.length > 0) && (
              <div className="mb-12 overflow-hidden border-y border-[#DCEBED] bg-[#F8FCFC]">
                <button
                  type="button"
                  onClick={() => setTocOpen((current) => !current)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#168F87] shadow-sm">
                      <List size={20} />
                    </span>

                    <div>
                      <h2 className="text-lg font-black text-[#102A43]">
                        Table of Contents
                      </h2>
                      <p className="mt-1 text-xs font-semibold text-slate-500">
                        Tap any topic to jump directly
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    size={20}
                    className={`text-[#168F87] transition ${
                      tocOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {tocOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-2 border-t border-[#DCEBED] px-5 py-5 sm:grid-cols-2 sm:px-6">
                        {tocSections.map((section, index) => (
                          <button
                            key={section.id}
                            type="button"
                            onClick={() => scrollToSection(section.id)}
                            className="group flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-left transition hover:bg-[#E9F8F6]"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-xs font-black text-[#168F87] transition group-hover:bg-[#0F3D5E] group-hover:text-white">
                              {index + 1}
                            </span>

                            <span className="text-sm font-bold leading-6 text-[#102A43]">
                              {section.title}
                            </span>
                          </button>
                        ))}

                        {faqItems.length > 0 && (
                          <button
                            type="button"
                            onClick={() => scrollToSection("faqs")}
                            className="group flex items-start gap-3 rounded-xl bg-white px-4 py-3 text-left transition hover:bg-[#E9F8F6]"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-xs font-black text-[#168F87] transition group-hover:bg-[#0F3D5E] group-hover:text-white">
                              ?
                            </span>

                            <span className="text-sm font-bold leading-6 text-[#102A43]">
                              Frequently Asked Questions
                            </span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className="mx-auto max-w-[790px]">
              {articleSections.map((section, sectionIndex) => {
                const introduction = section.title === "Introduction";

                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className={`scroll-mt-28 py-9 sm:py-11 ${
                      sectionIndex !== 0 ? "border-t border-[#E4EEEE]" : ""
                    }`}
                  >
                    {!introduction && (
                      <header className="mb-7">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#168F87]">
                          Section {String(sectionIndex).padStart(2, "0")}
                        </p>

                        <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-[#102A43] sm:text-4xl">
                          {section.title}
                        </h2>

                        <div className="mt-5 h-1 w-14 rounded-full bg-[#2CB1A6]" />
                      </header>
                    )}

                    <div>{renderSectionLines(section.lines)}</div>
                  </section>
                );
              })}

              <div className="my-10 flex items-start gap-4 rounded-[1.25rem] border border-[#DCEBED] bg-[#F8FCFC] p-5 sm:p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#168F87] shadow-sm">
                  <Info size={19} />
                </span>

                <div>
                  <h3 className="font-black text-[#102A43]">
                    A note for parents
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                    This article is educational guidance and does not replace an
                    individual psychological consultation or assessment.
                  </p>
                </div>
              </div>

              {faqItems.length > 0 && (
                <section id="faqs" className="scroll-mt-28 py-12">
                  <div className="mb-8 flex flex-col gap-5 border-b border-[#DCEBED] pb-7 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#168F87]">
                        Questions and answers
                      </p>

                      <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#102A43] sm:text-4xl">
                        Frequently Asked Questions
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={toggleAllFaqs}
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0F3D5E]/12 bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] transition hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
                    >
                      {allFaqsOpen ? <Minus size={16} /> : <Plus size={16} />}
                      {allFaqsOpen ? "Collapse All" : "Expand All"}
                    </button>
                  </div>

                  <div className="divide-y divide-[#DCEBED] border-y border-[#DCEBED]">
                    {faqItems.map((faq, index) => {
                      const open = openFaqIds.includes(faq.id);
                      const buttonId = `${faq.id}-button`;
                      const panelId = `${faq.id}-panel`;

                      return (
                        <div key={faq.id}>
                          <button
                            id={buttonId}
                            type="button"
                            aria-expanded={open}
                            aria-controls={panelId}
                            onClick={() => toggleFaq(faq.id)}
                            className="flex w-full items-start justify-between gap-5 py-6 text-left"
                          >
                            <div className="flex gap-4">
                              <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black transition ${
                                  open
                                    ? "bg-[#0F3D5E] text-white"
                                    : "bg-[#E9F8F6] text-[#168F87]"
                                }`}
                              >
                                {index + 1}
                              </span>

                              <h3 className="pt-1 text-base font-black leading-7 text-[#102A43] sm:text-lg">
                                {faq.question}
                              </h3>
                            </div>

                            <ChevronDown
                              size={20}
                              className={`mt-2 shrink-0 text-[#168F87] transition duration-300 ${
                                open ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {open && (
                              <motion.div
                                id={panelId}
                                role="region"
                                aria-labelledby={buttonId}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.28 }}
                                className="overflow-hidden"
                              >
                                <div className="pb-6 pl-[3.25rem] pr-4">
                                  <p className="text-base font-medium leading-8 text-slate-700">
                                    {renderInline(faq.answer)}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {topics.length > 0 && (
                <div className="border-t border-[#DCEBED] py-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag size={17} className="mr-1 text-[#168F87]" />

                    {topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-bold text-slate-600"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(previousBlog || nextBlog) && (
                <div className="grid gap-4 border-t border-[#DCEBED] py-8 sm:grid-cols-2">
                  {previousBlog ? (
                    <Link
                      href={`/blog/${previousBlog.slug}`}
                      className="group rounded-[1.25rem] border border-[#DCEBED] p-5 transition hover:border-[#2CB1A6]/40 hover:bg-[#F7FBFC]"
                    >
                      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#168F87]">
                        <ArrowLeft size={14} /> Previous Post
                      </span>

                      <p className="mt-3 line-clamp-2 font-black leading-6 text-[#102A43]">
                        {previousBlog.title}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextBlog && (
                    <Link
                      href={`/blog/${nextBlog.slug}`}
                      className="group rounded-[1.25rem] border border-[#DCEBED] p-5 text-right transition hover:border-[#2CB1A6]/40 hover:bg-[#F7FBFC]"
                    >
                      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#168F87]">
                        Next Post <ArrowRight size={14} />
                      </span>

                      <p className="mt-3 line-clamp-2 font-black leading-6 text-[#102A43]">
                        {nextBlog.title}
                      </p>
                    </Link>
                  )}
                </div>
              )}

              <div className="flex flex-col items-center justify-between gap-5 border-t border-[#DCEBED] py-8 sm:flex-row">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E] transition hover:text-[#168F87]"
                >
                  <ArrowLeft size={17} />
                  Explore more articles
                </Link>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0F3D5E]/12 bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] transition hover:bg-[#E9F8F6]"
                >
                  {copied ? <Link2 size={17} /> : <Share2 size={17} />}
                  {copied ? "Link Copied" : "Share Article"}
                </button>
              </div>
            </div>
          </article>

          <aside className="space-y-7 lg:sticky lg:top-24">
            <div className="border-b border-[#DCEBED] pb-7">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search article topics"
                  className="w-full rounded-full border border-[#DCEBED] bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2CB1A6]"
                />
              </div>
            </div>

            {tocSections.length > 0 && (
              <div className="border-b border-[#DCEBED] pb-7">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="text-lg font-black text-[#102A43]">
                    In this article
                  </h2>

                  <span className="text-xs font-bold text-[#168F87]">
                    {Math.round(readingProgress)}%
                  </span>
                </div>

                <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-[#E9F8F6]">
                  <motion.div
                    animate={{ width: `${readingProgress}%` }}
                    className="h-full rounded-full bg-[#2CB1A6]"
                  />
                </div>

                <div className="space-y-1">
                  {filteredTocSections.length > 0 ? (
                    filteredTocSections.map((section, index) => {
                      const active = activeSectionId === section.id;

                      return (
                        <button
                          key={section.id}
                          type="button"
                          onClick={() => scrollToSection(section.id)}
                          className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                            active
                              ? "bg-[#E9F8F6] text-[#0F3D5E]"
                              : "text-slate-600 hover:bg-[#F7FBFC] hover:text-[#0F3D5E]"
                          }`}
                        >
                          <span className="text-xs font-black text-[#168F87]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="text-sm font-bold leading-5">
                            {section.title}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <p className="rounded-lg bg-[#F7FBFC] px-4 py-3 text-sm text-slate-500">
                      No matching topic found.
                    </p>
                  )}
                </div>
              </div>
            )}

            {recentBlogs.length > 0 && (
              <div className="border-b border-[#DCEBED] pb-7">
                <h2 className="text-lg font-black text-[#102A43]">
                  Recent Posts
                </h2>

                <div className="mt-5 space-y-4">
                  {filteredRecentBlogs.length > 0 ? (
                    filteredRecentBlogs.map((item) => (
                      <Link
                        key={item._id || item.slug || item.title}
                        href={`/blog/${item.slug}`}
                        className="group block border-b border-[#E8EFEF] pb-4 last:border-0 last:pb-0"
                      >
                        <p className="line-clamp-2 text-sm font-black leading-6 text-[#102A43] transition group-hover:text-[#168F87]">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-400">
                          {formatDate(item.publishedAt || item.createdAt)}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">
                      No matching recent posts.
                    </p>
                  )}
                </div>
              </div>
            )}

            {sidebarCategories.length > 0 && (
              <div className="border-b border-[#DCEBED] pb-7">
                <h2 className="text-lg font-black text-[#102A43]">
                  Categories
                </h2>

                <div className="mt-4 space-y-2">
                  {sidebarCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-[#F7FBFC] hover:text-[#168F87]"
                    >
                      {category.name}
                      <ChevronRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {topics.length > 0 && (
              <div className="border-b border-[#DCEBED] pb-7">
                <h2 className="text-lg font-black text-[#102A43]">
                  Popular Tags
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Link
                      key={topic}
                      href={`/blog?tag=${encodeURIComponent(topic)}`}
                      className="rounded-full border border-[#DCEBED] bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6] hover:text-[#0F3D5E]"
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-[1.5rem] bg-[#0F3D5E] p-6 text-white">
              <ShieldCheck size={23} className="text-[#7DE0D6]" />

              <h2 className="mt-4 text-xl font-black leading-tight">
                Need help understanding your child’s report?
              </h2>

              <p className="mt-3 text-sm font-semibold leading-7 text-white/65">
                Book a consultation and receive clear guidance about scores,
                recommendations and the next steps.
              </p>

              <Link
                href="/contact-us"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
              >
                Book Consultation
                <ArrowRight size={16} />
              </Link>

              <a
                href={`https://wa.me/917999215093?text=${encodeURIComponent(
                  `Hello Dr. Vini, I read the article "${blog.title}" and would like guidance.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#20BD5A]"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
