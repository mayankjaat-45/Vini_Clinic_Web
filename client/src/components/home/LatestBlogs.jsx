"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  FileText,
  Pause,
  Play,
  SearchCheck,
  Sparkles,
} from "lucide-react";

const fallbackBlogs = [
  {
    _id: "understanding-child-behaviour",
    slug: "understanding-child-behaviour",
    title: "Understanding the Reason Behind Your Child’s Behaviour",
    category: "Child Behaviour",
    excerpt:
      "Learn why behaviour is often a form of communication and how parents can respond with greater clarity.",
    publishedAt: "2026-07-01T00:00:00.000Z",
    readTime: "6 min read",
  },
  {
    _id: "when-to-seek-assessment",
    slug: "when-to-seek-assessment",
    title: "When Should Parents Consider a Psychological Assessment?",
    category: "Assessment",
    excerpt:
      "Understand when an assessment may help with learning, attention, behaviour, emotional or developmental concerns.",
    publishedAt: "2026-06-20T00:00:00.000Z",
    readTime: "7 min read",
  },
  {
    _id: "support-child-learning",
    slug: "support-child-learning",
    title: "How Parents Can Support a Child Facing Learning Difficulties",
    category: "Learning Support",
    excerpt:
      "Practical ways to reduce pressure, build confidence and provide the right academic support at home.",
    publishedAt: "2026-06-10T00:00:00.000Z",
    readTime: "5 min read",
  },
];

const optimizeCloudinaryImage = (url, width = 1200) => {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }

  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
};

const getBlogImage = (blog = {}) => {
  if (typeof blog.image === "string") {
    return blog.image;
  }

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

const getBlogDescription = (blog = {}) => {
  return (
    blog.excerpt ||
    blog.shortDescription ||
    blog.metaDescription ||
    blog.description ||
    "Helpful psychology insights for parents, children and families."
  );
};

const getBlogDate = (blog = {}) => {
  return (
    blog.publishedAt ||
    blog.publishDate ||
    blog.createdAt ||
    blog.updatedAt ||
    null
  );
};

const formatBlogDate = (date) => {
  if (!date) {
    return "Recent";
  }

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

const getReadTime = (blog = {}) => {
  if (blog.readTime) {
    return blog.readTime;
  }

  if (blog.readingTime) {
    const value = String(blog.readingTime);

    return value.includes("min") ? value : `${value} min read`;
  }

  const content =
    blog.content ||
    blog.description ||
    blog.excerpt ||
    blog.metaDescription ||
    "";

  if (!content) {
    return "5 min read";
  }

  const words = content
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const prepareBlogs = (blogs = []) => {
  const activeBlogs = Array.isArray(blogs)
    ? blogs.filter(
        (blog) =>
          blog?.isPublished !== false && blog?.isActive !== false && blog?.slug,
      )
    : [];

  const source = activeBlogs.length ? activeBlogs : fallbackBlogs;

  return [...source]
    .sort((first, second) => {
      if (first?.isFeatured && !second?.isFeatured) return -1;
      if (!first?.isFeatured && second?.isFeatured) return 1;

      const firstDate = new Date(getBlogDate(first) || 0).getTime();
      const secondDate = new Date(getBlogDate(second) || 0).getTime();

      return secondDate - firstDate;
    })
    .slice(0, 8);
};

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 90 : -90,
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -90 : 90,
    scale: 0.98,
  }),
};

export default function LatestBlogs({ initialBlogs = [] }) {
  const allBlogs = useMemo(() => prepareBlogs(initialBlogs), [initialBlogs]);

  const categories = useMemo(() => {
    const values = allBlogs.map((blog) => blog.category).filter(Boolean);

    return ["All", ...new Set(values)];
  }, [allBlogs]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const blogs = useMemo(() => {
    if (activeCategory === "All") {
      return allBlogs;
    }

    return allBlogs.filter((blog) => blog.category === activeCategory);
  }, [activeCategory, allBlogs]);

  const changeArticle = useCallback(
    (nextIndex, nextDirection = 1) => {
      if (!blogs.length) return;

      const normalizedIndex = (nextIndex + blogs.length) % blogs.length;

      setDirection(nextDirection);
      setActiveIndex(normalizedIndex);
    },
    [blogs.length],
  );

  const showNext = useCallback(() => {
    changeArticle(activeIndex + 1, 1);
  }, [activeIndex, changeArticle]);

  const showPrevious = useCallback(() => {
    changeArticle(activeIndex - 1, -1);
  }, [activeIndex, changeArticle]);

  useEffect(() => {
    setActiveIndex(0);
    setDirection(1);
  }, [activeCategory]);

  useEffect(() => {
    if (activeIndex >= blogs.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, blogs.length]);

  useEffect(() => {
    if (isPaused || blogs.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % blogs.length);
    }, 5500);

    return () => window.clearInterval(interval);
  }, [blogs.length, isPaused]);

  if (!blogs.length) {
    return (
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-[#F7FBFC] p-8 text-center sm:p-10">
            <FileText size={40} className="mx-auto text-[#168F87]" />

            <h2 className="mt-5 text-2xl font-black text-[#102A43]">
              Parent learning articles are coming soon
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
              Helpful articles on child behaviour, learning, autism, ADHD,
              emotional wellbeing and parenting will appear here.
            </p>

            <Link
              href="/contact-us"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3.5 text-sm font-black text-white"
            >
              Ask for Guidance
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const activeBlog = blogs[activeIndex];
  const activeImage = optimizeCloudinaryImage(getBlogImage(activeBlog), 1400);

  const progress =
    blogs.length > 0 ? ((activeIndex + 1) / blogs.length) * 100 : 0;

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/8 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F4B183]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-bold text-[#168F87] sm:text-sm">
              <Sparkles size={16} />
              Parent learning corner
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em] text-[#102A43] sm:text-4xl lg:text-5xl">
              Psychology insights for everyday{" "}
              <span className="text-[#168F87]">parenting questions.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Swipe, browse and explore practical articles about behaviour,
              learning, emotions, development and parenting.
            </p>
          </div>

          <Link
            href="/blog"
            className="group inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition duration-300 hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
          >
            View All Articles
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Category controls */}
        <div className="mt-9 flex items-center gap-3 overflow-x-auto pb-2">
          {categories.map((category) => {
            const count =
              category === "All"
                ? allBlogs.length
                : allBlogs.filter((blog) => blog.category === category).length;

            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-black transition duration-300 ${
                  isActive
                    ? "bg-[#0F3D5E] text-white shadow-lg shadow-[#0F3D5E]/15"
                    : "border border-[#0F3D5E]/10 bg-[#F7FBFC] text-[#0F3D5E] hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
                }`}
              >
                {category}

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-white text-[#168F87]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main interactive slider */}
        <div
          className="relative mt-7 overflow-hidden rounded-[2.5rem] bg-[#0F3D5E] shadow-[0_30px_90px_rgba(15,61,94,0.22)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.article
              key={
                activeBlog._id ||
                activeBlog.slug ||
                `${activeCategory}-${activeIndex}`
              }
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              drag={blogs.length > 1 ? "x" : false}
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) {
                  showNext();
                } else if (info.offset.x > 80) {
                  showPrevious();
                }
              }}
              className="grid min-h-[610px] cursor-grab active:cursor-grabbing lg:grid-cols-[0.92fr_1.08fr]"
            >
              {/* Article content */}
              <div className="relative z-10 flex flex-col p-7 text-white sm:p-9 lg:p-11">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#7DE0D6]">
                    <BookOpen size={25} />
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#7DE0D6]">
                    Article {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#2CB1A6] px-4 py-2 text-xs font-black text-white">
                      {activeBlog.category || "Parent Guidance"}
                    </span>

                    {activeBlog.isFeatured && (
                      <span className="rounded-full bg-[#F4B183] px-4 py-2 text-xs font-black text-[#713F12]">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="mt-6 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                    {activeBlog.title}
                  </h3>

                  <p className="mt-5 max-w-xl text-sm font-semibold leading-7 text-white/72 sm:text-base sm:leading-8">
                    {getBlogDescription(activeBlog)}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-white/60">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={15} className="text-[#7DE0D6]" />
                      {formatBlogDate(getBlogDate(activeBlog))}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={15} className="text-[#7DE0D6]" />
                      {getReadTime(activeBlog)}
                    </span>

                    {activeBlog.language && <span>{activeBlog.language}</span>}
                  </div>
                </div>

                <div className="mt-auto flex flex-col gap-4 pt-10">
                  <Link
                    href={`/blog/${activeBlog.slug}`}
                    className="group inline-flex min-h-14 w-fit items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                  >
                    Read Full Article
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <p className="text-xs font-semibold text-white/45">
                    Drag or swipe left and right to change article
                  </p>
                </div>
              </div>

              {/* Article image */}
              <div className="relative min-h-[350px] overflow-hidden lg:min-h-[610px]">
                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={`${activeBlog.title} by Dr. Vini Jhariya`}
                    fill
                    priority={activeIndex === 0}
                    sizes="(max-width: 1024px) 100vw, 680px"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#168F87] to-[#071F33]">
                    <BookOpen
                      size={110}
                      strokeWidth={1}
                      className="text-white/30"
                    />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#071F33]/65 via-transparent to-[#071F33]/10 lg:bg-gradient-to-r lg:from-[#0F3D5E] lg:via-[#0F3D5E]/15 lg:to-transparent" />

                <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full border border-white/15 bg-[#071F33]/45 px-4 py-2 text-xs font-black text-white backdrop-blur">
                  <SearchCheck size={15} className="text-[#7DE0D6]" />
                  Parent-friendly insight
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Slider controls */}
          {blogs.length > 1 && (
            <div className="absolute bottom-5 right-5 z-30 flex items-center gap-2">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Show previous article"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#071F33]/55 text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-[#0F3D5E]"
              >
                <ArrowLeft size={19} />
              </button>

              <button
                type="button"
                onClick={() => setIsPaused((current) => !current)}
                aria-label={
                  isPaused
                    ? "Resume automatic article rotation"
                    : "Pause automatic article rotation"
                }
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#071F33]/55 text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white hover:text-[#0F3D5E]"
              >
                {isPaused ? <Play size={18} /> : <Pause size={18} />}
              </button>

              <button
                type="button"
                onClick={showNext}
                aria-label="Show next article"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
              >
                <ArrowRight size={19} />
              </button>
            </div>
          )}

          {/* Animated progress */}
          <div className="absolute inset-x-0 bottom-0 z-30 h-1.5 bg-white/10">
            <motion.div
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.4,
              }}
              className="h-full bg-[#2CB1A6]"
            />
          </div>
        </div>

        {/* Interactive article cards */}
        <div className="mt-6 flex gap-4 overflow-x-auto pb-5 pt-2">
          {blogs.map((blog, index) => {
            const imageUrl = optimizeCloudinaryImage(getBlogImage(blog), 500);

            const isActive = activeIndex === index;

            return (
              <motion.button
                layout
                key={blog._id || blog.slug || blog.title}
                type="button"
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                whileHover={{
                  y: -8,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                animate={{
                  opacity: isActive ? 1 : 0.72,
                  scale: isActive ? 1 : 0.96,
                }}
                aria-pressed={isActive}
                className={`group relative min-w-[270px] overflow-hidden rounded-[1.8rem] border text-left transition sm:min-w-[310px] ${
                  isActive
                    ? "border-[#2CB1A6] bg-white shadow-[0_22px_55px_rgba(15,61,94,0.14)]"
                    : "border-[#0F3D5E]/10 bg-[#F7FBFC]"
                }`}
              >
                <div className="relative h-44 overflow-hidden bg-[#0F3D5E]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={blog.title || "Psychology article"}
                      fill
                      sizes="320px"
                      className="object-cover transition duration-500 group-hover:scale-108"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/35">
                      <BookOpen size={48} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071F33]/75 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black text-[#0F3D5E] backdrop-blur">
                    {blog.category || "Parent Guidance"}
                  </span>

                  <span className="absolute bottom-4 right-4 rounded-full bg-[#071F33]/60 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur">
                    {getReadTime(blog)}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-2 text-lg font-black leading-snug text-[#102A43]">
                    {blog.title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
                      <CalendarDays size={14} />
                      {formatBlogDate(getBlogDate(blog))}
                    </span>

                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                        isActive
                          ? "bg-[#0F3D5E] text-white"
                          : "bg-[#E9F8F6] text-[#168F87]"
                      }`}
                    >
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>

                {isActive && (
                  <motion.span
                    layoutId="active-blog-card"
                    className="absolute bottom-0 left-0 h-1.5 w-full bg-[#2CB1A6]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-5 flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-[#2CB1A6]/15 bg-[#E9F8F6]/65 p-6 text-center sm:p-8 lg:flex-row lg:text-left">
          <div>
            <h3 className="text-xl font-black text-[#102A43] sm:text-2xl">
              Articles provide guidance, but every child is different.
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              A professional consultation can help you understand whether
              counselling, assessment or intervention is needed.
            </p>
          </div>

          <Link
            href="/contact-us"
            className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-[#0F3D5E]/15 transition hover:-translate-y-1 hover:bg-[#102A43]"
          >
            Ask for Guidance
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
