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
  Eye,
  EyeOff,
  HelpCircle,
  Info,
  Link2,
  List,
  MessageCircle,
  Minus,
  Plus,
  Quote,
  Share2,
  ShieldCheck,
  Sparkles,
  Tag,
  Type,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

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
    .map((line) => line.trim())
    .filter(Boolean);
};

const isFaqSection = (title) =>
  /faq|frequently asked|common questions|questions and answers/i.test(
    String(title || ""),
  );

const createSections = (lines) => {
  const sections = [];

  let current = {
    id: "introduction",
    title: "Introduction",
    lines: [],
  };

  lines.forEach((line, index) => {
    if (line.startsWith("## ")) {
      if (current.lines.length) {
        sections.push(current);
      }

      const title = line.replace(/^##\s+/, "").trim();

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

  if (current.lines.length) {
    sections.push(current);
  }

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

  if (directFaqs.length) {
    return directFaqs;
  }

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

          if (answer) {
            currentFaq.answer.push(answer);
          }
        }
      });

      flushFaq();
    });

  const seen = new Set();

  return extracted.filter((faq) => {
    const key = faq.question.toLowerCase();

    if (!faq.answer || seen.has(key)) {
      return false;
    }

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
        <strong key={`${part}-${index}`} className="font-black text-[#102A43]">
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

const fontSizeClasses = {
  compact: {
    paragraph: "text-[15px] leading-7 sm:text-base sm:leading-8",
    list: "text-[15px] leading-7 sm:text-base sm:leading-8",
  },

  comfortable: {
    paragraph: "text-base leading-8 sm:text-[17px] sm:leading-9",
    list: "text-base leading-8 sm:text-[17px] sm:leading-9",
  },

  large: {
    paragraph: "text-[17px] leading-9 sm:text-lg sm:leading-10",
    list: "text-[17px] leading-9 sm:text-lg sm:leading-10",
  },
};

export default function BlogDetailClient({ blog }) {
  const articleRef = useRef(null);

  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState("");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [openFaqIds, setOpenFaqIds] = useState([]);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState("comfortable");
  const [focusMode, setFocusMode] = useState(false);

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

  const readingStyles = fontSizeClasses[fontSize];

  useEffect(() => {
    setOpenFaqIds(faqItems.length ? [faqItems[0].id] : []);
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

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);

      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!tocSections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          );

        if (visible.length) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -68% 0px",

        threshold: [0, 0.2, 0.5],
      },
    );

    tocSections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tocSections]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMobileTocOpen(false);
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

  const cycleFontSize = () => {
    setFontSize((current) => {
      if (current === "compact") {
        return "comfortable";
      }

      if (current === "comfortable") {
        return "large";
      }

      return "compact";
    });
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

  const renderContentLine = (item, index) => {
    const line = item.text.trim();

    if (line.startsWith("##### Tags:") || line === "Tags:") {
      return null;
    }

    if (line === "---") {
      return <div key={item.id} className="my-10 h-px bg-[#DCEBED]" />;
    }

    if (line.startsWith("### ")) {
      return (
        <h3
          key={item.id}
          className="mb-4 mt-10 text-2xl font-black leading-tight tracking-[-0.025em] text-[#102A43] sm:text-3xl"
        >
          {renderInline(line.replace(/^###\s+/, ""))}
        </h3>
      );
    }

    if (line.startsWith("#### ")) {
      return (
        <h4
          key={item.id}
          className="mb-3 mt-8 text-xl font-black leading-tight text-[#102A43] sm:text-2xl"
        >
          {renderInline(line.replace(/^####\s+/, ""))}
        </h4>
      );
    }

    if (line.startsWith("> ")) {
      return (
        <motion.blockquote
          key={item.id}
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-70px",
          }}
          className="relative my-9 overflow-hidden rounded-[1.75rem] bg-[#0F3D5E] px-6 py-8 text-white shadow-[0_20px_60px_rgba(15,61,94,0.18)] sm:px-9"
        >
          <Quote
            size={130}
            className="absolute -right-4 -top-6 text-white/[0.055]"
          />

          <p className="relative text-lg font-bold italic leading-8 text-white/90 sm:text-xl sm:leading-9">
            {renderInline(line.replace(/^>\s+/, ""))}
          </p>
        </motion.blockquote>
      );
    }

    if (/^(tip|note|important|key takeaway):/i.test(line)) {
      const [label, ...text] = line.split(":");

      return (
        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-60px",
          }}
          className="my-8 flex items-start gap-4 rounded-[1.5rem] border border-[#F4B183]/35 bg-[#FFF8F0] p-5 sm:p-6"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#B96A24] shadow-sm">
            <Info size={20} />
          </span>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.17em] text-[#B96A24]">
              {label}
            </p>

            <p
              className={`mt-2 font-medium text-slate-700 ${readingStyles.paragraph}`}
            >
              {renderInline(text.join(":").trim())}
            </p>
          </div>
        </motion.div>
      );
    }

    if (line.startsWith("- ") || line.startsWith("• ")) {
      return (
        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            x: -12,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            margin: "-60px",
          }}
          transition={{
            delay: Math.min(index * 0.025, 0.14),
          }}
          className="group my-3 flex items-start gap-3 rounded-[1.25rem] border border-[#DDEBED] bg-[#FBFEFE] px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#2CB1A6]/35 hover:bg-white hover:shadow-md sm:px-5"
        >
          <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-[#168F87] transition group-hover:bg-[#0F3D5E] group-hover:text-white">
            <CheckCircle2 size={16} />
          </span>

          <p className={`font-medium text-slate-700 ${readingStyles.list}`}>
            {renderInline(line.replace(/^[-•]\s+/, ""))}
          </p>
        </motion.div>
      );
    }

    if (/^\d+\.\s/.test(line)) {
      const number = line.match(/^\d+/)?.[0] || "";

      const text = line.replace(/^\d+\.\s/, "");

      return (
        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-60px",
          }}
          className="my-5 grid grid-cols-[46px_1fr] gap-4 rounded-[1.5rem] border border-transparent bg-[#F3FAFA] p-5 transition duration-300 hover:border-[#2CB1A6]/25 hover:bg-white hover:shadow-lg sm:p-6"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F3D5E] text-sm font-black text-white shadow-lg shadow-[#0F3D5E]/15">
            {number}
          </span>

          <p
            className={`font-medium text-slate-700 ${readingStyles.paragraph}`}
          >
            {renderInline(text)}
          </p>
        </motion.div>
      );
    }

    return (
      <p
        key={item.id}
        className={`my-5 font-medium text-slate-700 ${readingStyles.paragraph} ${
          index === 0
            ? "first-letter:mr-1 first-letter:float-left first-letter:text-5xl first-letter:font-black first-letter:leading-[0.82] first-letter:text-[#168F87]"
            : ""
        }`}
      >
        {renderInline(line)}
      </p>
    );
  };

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FBFC] px-5">
        <div className="max-w-lg rounded-[2rem] border border-[#0F3D5E]/10 bg-white p-8 text-center shadow-xl sm:p-10">
          <BookOpen className="mx-auto text-[#168F87]" size={42} />

          <h1 className="mt-5 text-3xl font-black text-[#102A43]">
            Article not found
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            This article may have been removed, updated or unpublished.
          </p>

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
    <main className="overflow-hidden bg-[#F7FBFC] text-[#102A43]">
      {/* Reading progress */}
      <div className="fixed inset-x-0 top-0 z-[100] h-1 bg-white/80">
        <motion.div
          animate={{
            width: `${readingProgress}%`,
          }}
          transition={{
            duration: 0.12,
          }}
          className="h-full bg-[#2CB1A6]"
        />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071F33] px-5 pb-24 pt-8 text-white sm:px-6 lg:px-8 lg:pb-28">
        <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#2CB1A6]/20 blur-3xl" />

        <div className="absolute -bottom-40 right-0 h-[32rem] w-[32rem] rounded-full bg-[#F4B183]/12 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex min-w-0 items-center gap-2 text-xs font-bold text-white/55 sm:text-sm">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>

              <ChevronRight size={14} />

              <Link href="/blog" className="transition hover:text-white">
                Blog
              </Link>

              <ChevronRight size={14} />

              <span className="truncate text-[#7DE0D6]">
                {blog.category || "Article"}
              </span>
            </div>

            <Link
              href="/blog"
              className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2.5 text-xs font-black transition hover:bg-white hover:text-[#0F3D5E] sm:inline-flex"
            >
              <ArrowLeft size={15} />
              All Articles
            </Link>
          </div>

          <div className="grid items-center gap-12 pt-12 lg:grid-cols-[1fr_0.96fr] lg:gap-16 lg:pt-16">
            {/* Hero content */}
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
              }}
            >
              <div className="flex flex-wrap gap-2">
                {blog.category && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#2CB1A6] px-4 py-2 text-xs font-black">
                    <Tag size={14} />
                    {blog.category}
                  </span>
                )}

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-bold text-white/70">
                  <CalendarDays size={14} className="text-[#7DE0D6]" />

                  {formatDate(publishedDate)}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-bold text-white/70">
                  <Clock3 size={14} className="text-[#7DE0D6]" />

                  {getReadingTime(blog)}
                </span>
              </div>

              <p className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#7DE0D6]">
                <Sparkles size={15} />
                Parent-friendly psychology guide
              </p>

              <h1 className="mt-5 text-4xl font-black leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-[4rem]">
                {blog.title}
              </h1>

              {blog.excerpt && (
                <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/70 sm:text-lg sm:leading-9">
                  {blog.excerpt}
                </p>
              )}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/20 bg-white/10">
                    <Image
                      src="/images/vini-pic.jpeg"
                      alt="Dr. Vini Jhariya"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-black">Dr. Vini Jhariya</p>

                    <p className="mt-1 text-xs font-semibold text-white/50">
                      Clinical & Child Psychologist
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-5 py-3 text-sm font-black transition hover:-translate-y-1 hover:bg-white hover:text-[#0F3D5E]"
                >
                  {copied ? <Link2 size={17} /> : <Share2 size={17} />}

                  {copied ? "Link Copied" : "Share Article"}
                </button>
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.06,
              }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-[3rem] bg-[#2CB1A6]/15 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2.5rem] border-[8px] border-white/[0.08] bg-[#102A43] shadow-[0_35px_90px_rgba(0,0,0,0.3)]">
                <div className="relative aspect-[4/3]">
                  {featuredImage ? (
                    <>
                      <Image
                        src={featuredImage}
                        alt=""
                        fill
                        aria-hidden="true"
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="scale-110 object-cover opacity-25 blur-2xl"
                      />

                      <Image
                        src={featuredImage}
                        alt={blog.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-contain p-3"
                      />
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#168F87] to-[#071F33]">
                      <BookOpen size={90} className="text-white/20" />
                    </div>
                  )}
                </div>
              </div>

              <div className="relative z-10 -mt-9 ml-auto mr-5 max-w-[320px] rounded-[1.5rem] bg-white p-5 text-[#102A43] shadow-[0_20px_55px_rgba(0,0,0,0.2)] sm:mr-8">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87]">
                    <ShieldCheck size={21} />
                  </span>

                  <div>
                    <p className="text-sm font-black">
                      Evidence-informed guidance
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                      Practical information written for parents and families.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative z-10 -mt-10 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-[#0F3D5E]/10 bg-white shadow-[0_24px_70px_rgba(15,61,94,0.12)] sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Easy to understand",
              text: "Simple explanations for parents",
            },
            {
              icon: CheckCircle2,
              title: "Practical direction",
              text: "Clear everyday support ideas",
            },
            {
              icon: ShieldCheck,
              title: "Professional view",
              text: "Written by a child psychologist",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-start gap-4 p-5 sm:p-6 ${
                  index !== 2
                    ? "border-b border-[#0F3D5E]/10 sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87]">
                  <Icon size={20} />
                </span>

                <div>
                  <p className="text-sm font-black text-[#102A43]">
                    {item.title}
                  </p>

                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mobile TOC */}
      {(tocSections.length > 0 || faqItems.length > 0) && (
        <div className="mx-auto mt-10 max-w-3xl px-5 lg:hidden">
          <div className="overflow-hidden rounded-[1.75rem] border border-[#0F3D5E]/10 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setMobileTocOpen((current) => !current)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87]">
                  <List size={20} />
                </span>

                <div>
                  <p className="font-black">Explore this article</p>

                  <p className="text-xs text-slate-500">Jump to any section</p>
                </div>
              </div>

              <ChevronDown
                className={`text-[#168F87] transition ${
                  mobileTocOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {mobileTocOpen && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 border-t border-[#DCEBED] p-4">
                    {tocSections.map((section, index) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className="flex w-full gap-3 rounded-xl bg-[#F7FBFC] px-4 py-3 text-left"
                      >
                        <span className="font-black text-[#168F87]">
                          {index + 1}
                        </span>

                        <span className="text-sm font-bold">
                          {section.title}
                        </span>
                      </button>
                    ))}

                    {faqItems.length > 0 && (
                      <button
                        type="button"
                        onClick={() => scrollToSection("faqs")}
                        className="flex w-full gap-3 rounded-xl bg-[#F7FBFC] px-4 py-3 text-left"
                      >
                        <span className="font-black text-[#168F87]">?</span>

                        <span className="text-sm font-bold">FAQs</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Article layout */}
      <section className="px-5 pb-20 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div
          className={`mx-auto grid max-w-7xl gap-8 transition-all duration-300 ${
            focusMode
              ? "grid-cols-1"
              : "lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[230px_minmax(0,1fr)_280px]"
          }`}
        >
          {/* Desktop TOC */}
          {!focusMode && (
            <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
              <div className="overflow-hidden rounded-[1.75rem] border border-[#0F3D5E]/10 bg-white shadow-[0_18px_50px_rgba(15,61,94,0.07)]">
                <div className="border-b border-[#0F3D5E]/8 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F8F6] text-[#168F87]">
                      <List size={19} />
                    </span>

                    <div>
                      <p className="font-black">In this article</p>

                      <p className="mt-1 text-xs text-slate-500">
                        {Math.round(readingProgress)}% completed
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#E9F8F6]">
                    <motion.div
                      animate={{
                        width: `${readingProgress}%`,
                      }}
                      className="h-full bg-[#2CB1A6]"
                    />
                  </div>
                </div>

                <div className="max-h-[470px] space-y-1 overflow-y-auto p-3">
                  {tocSections.map((section, index) => {
                    const active = activeSectionId === section.id;

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition ${
                          active
                            ? "bg-[#0F3D5E] text-white"
                            : "text-[#102A43] hover:bg-[#E9F8F6]"
                        }`}
                      >
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${
                            active
                              ? "bg-white/15 text-[#7DE0D6]"
                              : "bg-[#E9F8F6] text-[#168F87]"
                          }`}
                        >
                          {index + 1}
                        </span>

                        <span className="text-xs font-bold leading-5">
                          {section.title}
                        </span>
                      </button>
                    );
                  })}

                  {faqItems.length > 0 && (
                    <button
                      type="button"
                      onClick={() => scrollToSection("faqs")}
                      className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#E9F8F6]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E9F8F6] text-xs font-black text-[#168F87]">
                        ?
                      </span>

                      <span className="text-xs font-bold leading-5">FAQs</span>
                    </button>
                  )}
                </div>
              </div>
            </aside>
          )}

          {/* Main article */}
          <article ref={articleRef} className="min-w-0">
            {/* Interactive toolbar */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[1.35rem] border border-[#0F3D5E]/10 bg-white p-3 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={cycleFontSize}
                  title="Change article text size"
                  className="inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2.5 text-xs font-black text-[#0F3D5E] transition hover:bg-[#E9F8F6]"
                >
                  <Type size={16} />
                  Text: {fontSize}
                </button>

                <button
                  type="button"
                  onClick={() => setFocusMode((current) => !current)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2.5 text-xs font-black text-[#0F3D5E] transition hover:bg-[#E9F8F6]"
                >
                  {focusMode ? <EyeOff size={16} /> : <Eye size={16} />}

                  {focusMode ? "Exit focus" : "Focus mode"}
                </button>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-4 py-2.5 text-xs font-black text-white"
              >
                {copied ? <Link2 size={16} /> : <Share2 size={16} />}

                {copied ? "Copied" : "Share"}
              </button>
            </div>

            {/* Article content */}
            <div className="overflow-hidden rounded-[2.4rem] border border-[#0F3D5E]/8 bg-white shadow-[0_25px_80px_rgba(15,61,94,0.08)]">
              {blog.excerpt && (
                <div className="relative overflow-hidden border-b border-[#DCEBED] bg-[#E9F8F6] p-6 sm:p-8 lg:p-10">
                  <Sparkles
                    size={140}
                    className="absolute -bottom-10 -right-8 text-[#168F87]/[0.07]"
                  />

                  <p className="relative text-xs font-black uppercase tracking-[0.2em] text-[#168F87]">
                    The key idea
                  </p>

                  <p className="relative mt-4 text-lg font-bold leading-8 text-[#24465D] sm:text-xl sm:leading-9">
                    {blog.excerpt}
                  </p>
                </div>
              )}

              <div className="px-6 sm:px-9 lg:px-12">
                {articleSections.length > 0 ? (
                  articleSections.map((section, sectionIndex) => {
                    const introduction = section.title === "Introduction";

                    const active = activeSectionId === section.id;

                    return (
                      <motion.section
                        key={section.id}
                        id={section.id}
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          margin: "-80px",
                        }}
                        className={`scroll-mt-28 py-10 sm:py-12 ${
                          sectionIndex !== 0 ? "border-t border-[#DCEBED]" : ""
                        }`}
                      >
                        {!introduction && (
                          <header className="mb-8 grid gap-5 sm:grid-cols-[68px_1fr] sm:items-start">
                            <span
                              className={`flex h-16 w-16 items-center justify-center rounded-[1.4rem] text-lg font-black transition ${
                                active
                                  ? "bg-[#0F3D5E] text-white shadow-lg shadow-[#0F3D5E]/20"
                                  : "bg-[#E9F8F6] text-[#168F87]"
                              }`}
                            >
                              {String(sectionIndex).padStart(2, "0")}
                            </span>

                            <div>
                              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#168F87]">
                                Parent guide
                              </p>

                              <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-[#102A43] sm:text-4xl">
                                {section.title}
                              </h2>
                            </div>
                          </header>
                        )}

                        <div>
                          {section.lines.map((item, index) =>
                            renderContentLine(item, index),
                          )}
                        </div>
                      </motion.section>
                    );
                  })
                ) : (
                  <div className="py-12 text-center">
                    <BookOpen className="mx-auto text-[#168F87]" size={36} />

                    <p className="mt-4 text-slate-600">
                      The article content will be updated soon.
                    </p>
                  </div>
                )}

                <div className="mb-10 flex items-start gap-4 rounded-[1.5rem] border border-[#DCEBED] bg-[#F7FBFC] p-5 sm:p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#168F87] shadow-sm">
                    <Info size={20} />
                  </span>

                  <div>
                    <h3 className="font-black text-[#102A43]">
                      A note for parents
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                      This article is educational guidance and does not replace
                      an individual psychological consultation or assessment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            {faqItems.length > 0 && (
              <section
                id="faqs"
                className="mt-8 scroll-mt-28 overflow-hidden rounded-[2.4rem] border border-[#0F3D5E]/8 bg-white shadow-[0_25px_80px_rgba(15,61,94,0.08)]"
              >
                <div className="relative overflow-hidden bg-[#0F3D5E] p-6 text-white sm:p-9 lg:p-10">
                  <HelpCircle
                    size={190}
                    className="absolute -bottom-20 -right-8 text-white/[0.04]"
                  />

                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7DE0D6]">
                        Questions and answers
                      </p>

                      <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                        Frequently Asked Questions
                      </h2>

                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
                        Select any question to open or close its answer.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={toggleAllFaqs}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                    >
                      {allFaqsOpen ? <Minus size={16} /> : <Plus size={16} />}

                      {allFaqsOpen ? "Collapse All" : "Expand All"}
                    </button>
                  </div>
                </div>

                <div className="space-y-3 p-4 sm:p-6">
                  {faqItems.map((faq, index) => {
                    const open = openFaqIds.includes(faq.id);

                    const buttonId = `${faq.id}-button`;
                    const panelId = `${faq.id}-panel`;

                    return (
                      <motion.div
                        key={faq.id}
                        layout
                        className={`overflow-hidden rounded-[1.4rem] border transition ${
                          open
                            ? "border-[#2CB1A6]/40 bg-white shadow-lg shadow-[#0F3D5E]/[0.07]"
                            : "border-[#DCEBED] bg-[#F7FBFC] hover:border-[#2CB1A6]/25"
                        }`}
                      >
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => toggleFaq(faq.id)}
                          className="flex w-full items-start justify-between gap-5 p-5 text-left sm:p-6"
                        >
                          <div className="flex gap-4">
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black transition ${
                                open
                                  ? "bg-[#0F3D5E] text-white"
                                  : "bg-white text-[#168F87]"
                              }`}
                            >
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <h3 className="pt-1.5 text-base font-black leading-7 text-[#102A43] sm:text-lg">
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
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.3,
                              }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-[#DCEBED] bg-white px-5 pb-6 pt-5 sm:pl-[4.75rem] sm:pr-8">
                                <p
                                  className={`font-medium text-slate-700 ${readingStyles.paragraph}`}
                                >
                                  {renderInline(faq.answer)}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Topics */}
            {topics.length > 0 && (
              <div className="mt-8 rounded-[1.5rem] border border-[#DCEBED] bg-white p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Tag size={17} className="text-[#168F87]" />

                  <span className="mr-1 text-sm font-black">Topics:</span>

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
          </article>

          {/* Right sidebar */}
          {!focusMode && (
            <aside className="hidden xl:sticky xl:top-24 xl:block xl:self-start">
              <div className="overflow-hidden rounded-[1.75rem] bg-[#0F3D5E] p-6 text-white shadow-[0_24px_65px_rgba(15,61,94,0.18)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#7DE0D6]">
                  <MessageCircle size={22} />
                </span>

                <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-[#7DE0D6]">
                  Need guidance?
                </p>

                <h3 className="mt-3 text-xl font-black leading-tight">
                  Every child’s situation is different.
                </h3>

                <p className="mt-3 text-sm font-semibold leading-7 text-white/65">
                  Discuss your concern with Dr. Vini and understand the right
                  next step.
                </p>

                <Link
                  href="/contact-us"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                >
                  Book Consultation
                  <ArrowRight size={16} />
                </Link>
              </div>

              <button
                type="button"
                onClick={handleShare}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/10 bg-white px-5 py-3.5 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
              >
                {copied ? <Link2 size={17} /> : <Share2 size={17} />}

                {copied ? "Link Copied" : "Share Article"}
              </button>
            </aside>
          )}
        </div>
      </section>

      {/* Author */}
      <section className="border-y border-[#DCEBED] bg-white px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-center gap-6 rounded-[2rem] bg-[#F7FBFC] p-6 sm:grid-cols-[auto_1fr_auto] sm:p-8">
          <div className="relative h-20 w-20 overflow-hidden rounded-[1.5rem] bg-[#0F3D5E]">
            <Image
              src="/images/vini-pic.jpeg"
              alt="Dr. Vini Jhariya"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#168F87]">
              Written by
            </p>

            <h2 className="mt-2 text-2xl font-black">Dr. Vini Jhariya</h2>

            <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-slate-600">
              Clinical and child psychologist supporting children, adolescents
              and families through assessment, counselling and parent guidance.
            </p>
          </div>

          <Link
            href="/about-dr-vini"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/12 bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] transition hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
          >
            <UserRound size={17} />
            About Dr. Vini
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#0F3D5E] px-5 py-16 text-white sm:px-6 lg:px-8">
        <div className="absolute -left-28 top-0 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-[#7DE0D6]">
              <ShieldCheck size={15} />
              Professional guidance
            </div>

            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
              Does this article feel close to what your child is experiencing?
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Book a consultation to understand the concern clearly and receive
              the right next steps.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/contact-us"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
            >
              Book Consultation
              <ArrowRight size={17} />
            </Link>

            <a
              href={`https://wa.me/917999215093?text=${encodeURIComponent(
                `Hello Dr. Vini, I read the article "${blog.title}" and would like guidance.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#20BD5A]"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
