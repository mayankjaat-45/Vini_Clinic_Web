"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ChevronRight,
  Clock,
  FileText,
  Loader2,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";

const defaultCategories = [
  "All",
  "Autism",
  "ADHD",
  "Dyslexia",
  "Parenting",
  "Teen Mental Health",
  "Child Behaviour",
  "School & Exams",
  "Adult Mental Health",
  "General",
];

const cardCategories = defaultCategories.filter(
  (category) => category !== "All",
);

const formatDate = (date) => {
  if (!date) return "Recent";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
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

const getBlogKey = (blog) => blog?._id || blog?.slug || blog?.title;

const getBlogCategoryTitle = (blog) => {
  const category = String(blog?.category || "").trim();

  const matchedCategory = cardCategories.find(
    (item) => item.toLowerCase() === category.toLowerCase(),
  );

  return matchedCategory || "General";
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/blogs");

      setBlogs(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.log("BLOG FETCH ERROR:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    setVisibleCount(9);
  }, [search, activeCategory]);

  const activeBlogs = useMemo(() => {
    return blogs.filter((blog) => blog?.isPublished !== false);
  }, [blogs]);

  const categories = useMemo(() => {
    return defaultCategories;
  }, []);

  const filteredBlogs = useMemo(() => {
    return activeBlogs.filter((blog) => {
      const blogCategoryTitle = getBlogCategoryTitle(blog);

      const matchesCategory =
        activeCategory === "All" || blogCategoryTitle === activeCategory;

      const text = `${blog?.title || ""} ${blog?.excerpt || ""} ${
        blogCategoryTitle || ""
      } ${blog?.language || ""} ${blog?.topic || ""} ${
        blog?.topics?.join(" ") || ""
      } ${blog?.tags?.join(" ") || ""}`.toLowerCase();

      const matchesSearch = text.includes(search.trim().toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeBlogs, search, activeCategory]);

  const visibleBlogs = useMemo(() => {
    return filteredBlogs.slice(0, visibleCount);
  }, [filteredBlogs, visibleCount]);

  const hasMoreBlogs = visibleCount < filteredBlogs.length;

  return (
    <main className="overflow-hidden bg-[#F7FBFC] text-[#102A43]">
      <section className="relative border-b border-slate-200/70 bg-linear-to-br from-white via-[#F7FBFC] to-[#E9F8F6] px-4 py-10 sm:px-5 lg:py-12">
        <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
            <Link href="/" className="transition hover:text-[#0F3D5E]">
              Home
            </Link>
            <ChevronRight size={15} />
            <span className="text-[#0F3D5E]">Blogs</span>
          </div>

          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2CB1A6]/20 bg-white/90 px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm">
              <Sparkles size={15} className="text-[#2CB1A6]" />
              Blog & Parent Resources
            </div>

            <h1 className="text-3xl font-black leading-tight tracking-[-0.04em] text-[#102A43] sm:text-5xl lg:text-6xl">
              Practical child psychology guidance for real family concerns.
            </h1>

            <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8">
              Helpful articles by Dr. Vini Jhariya on autism, ADHD, dyslexia,
              parenting, teen mental health, school concerns and emotional
              wellbeing.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-5 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-4xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-5">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by topic, concern or category..."
                  className="w-full rounded-full border border-slate-200 bg-[#F7FBFC] py-4 pl-12 pr-5 text-sm font-bold text-[#102A43] outline-none transition placeholder:text-slate-400 focus:border-[#2CB1A6] focus:bg-white"
                />
              </div>

              <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full px-4 py-3 text-xs font-black transition ${
                      activeCategory === category
                        ? "bg-[#0F3D5E] text-white shadow-lg shadow-[#0F3D5E]/20"
                        : "bg-[#F7FBFC] text-slate-600 hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="rounded-4xl bg-white p-12 text-center shadow-xl shadow-slate-900/5 sm:p-16">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-500">Loading blogs...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="rounded-4xl bg-white p-8 text-center shadow-xl shadow-slate-900/5 sm:p-16">
              <FileText className="mx-auto mb-4 text-[#0F3D5E]" size={42} />

              <h3 className="text-2xl font-black text-[#102A43]">
                No articles found
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-600">
                Try another topic or clear your search. Helpful articles on
                autism, ADHD, dyslexia, parenting, child behaviour and emotional
                wellbeing are available here.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1"
                >
                  Clear Filters
                </button>

                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E9F8F6] px-7 py-4 text-sm font-black text-[#0F766E] transition hover:-translate-y-1"
                >
                  <CalendarCheck size={17} />
                  Book Consultation
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#2CB1A6]">
                    Blog Articles
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-[#102A43] sm:text-3xl">
                    Latest Articles
                  </h2>
                </div>

                <p className="rounded-full bg-white px-4 py-2 text-xs font-black text-slate-500 shadow-sm">
                  {filteredBlogs.length}{" "}
                  {filteredBlogs.length === 1 ? "Article" : "Articles"} Found
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleBlogs.map((blog) => {
                  const blogCategoryTitle = getBlogCategoryTitle(blog);

                  return (
                    <Link
                      key={getBlogKey(blog)}
                      href={`/blog/${blog.slug}`}
                      className="group overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <article className="flex h-full flex-col">
                        <div className="relative h-56 overflow-hidden bg-[#102A43]">
                          {blog.image?.url ? (
                            <img
                              src={blog.image.url}
                              alt={`${blog.title} by Dr. Vini Jhariya`}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-white/25">
                              <BookOpen size={54} />
                            </div>
                          )}

                          <div className="absolute left-4 top-4">
                            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-[#0F3D5E] shadow-lg backdrop-blur">
                              {blogCategoryTitle}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-5 sm:p-6">
                          <div className="mb-4 flex flex-wrap gap-2">
                            {blog.language && (
                              <span className="rounded-full bg-[#F7FBFC] px-3 py-1 text-xs font-black text-[#0F3D5E]">
                                {blog.language}
                              </span>
                            )}

                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7FBFC] px-3 py-1 text-xs font-black text-slate-500">
                              <Clock size={13} />
                              {getReadingTime(blog)}
                            </span>
                          </div>

                          <h2 className="line-clamp-2 text-xl font-black leading-tight tracking-[-0.02em] text-[#102A43] sm:text-2xl">
                            {blog.title}
                          </h2>

                          <p className="mt-3 line-clamp-3 text-sm font-semibold leading-6 text-slate-600">
                            {blog.excerpt}
                          </p>

                          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                            <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
                              <CalendarDays size={14} />
                              {formatDate(blog.publishedAt)}
                            </span>

                            <span className="inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]">
                              Read More
                              <ArrowRight
                                size={16}
                                className="transition group-hover:translate-x-1"
                              />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>

              {hasMoreBlogs && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white shadow-xl shadow-[#0F3D5E]/20 transition hover:-translate-y-1 hover:bg-[#2CB1A6]"
                  >
                    Load More
                    <ArrowRight size={17} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-5 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-4xl bg-[#102A43] p-6 text-white shadow-2xl shadow-slate-900/10 sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <BookOpen size={24} />
                </div>

                <h2 className="text-2xl font-black leading-tight sm:text-3xl">
                  Need guidance before reading?
                </h2>

                <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-white/75">
                  Articles are helpful, but every child is different. For
                  specific concerns, connect directly with the clinic.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#102A43] transition hover:-translate-y-1"
                >
                  <CalendarCheck size={17} />
                  Book Consultation
                </Link>

                <a
                  href="https://wa.me/917999215093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1"
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
[]