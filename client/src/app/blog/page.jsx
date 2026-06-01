"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  FileText,
  Loader2,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";

const categories = [
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

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

  const activeBlogs = useMemo(() => {
    return blogs.filter((blog) => blog?.isPublished !== false);
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return activeBlogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" || blog.category === activeCategory;

      const text = `${blog.title || ""} ${blog.excerpt || ""} ${
        blog.category || ""
      } ${blog.tags?.join(" ") || ""}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeBlogs, search, activeCategory]);

  const featuredBlog =
    activeBlogs.find((blog) => blog.isFeatured) || activeBlogs[0];

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-4 py-18 sm:px-5 sm:py-22 md:py-24">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl md:h-96 md:w-96" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
            <Sparkles size={16} className="text-[#2CB1A6]" />
            Blog & Resources
          </div>

          <h1 className="max-w-5xl text-4xl font-black leading-tight text-[#102A43] sm:text-5xl md:text-7xl">
            Child psychology insights for parents, families and professionals.
          </h1>

          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            Read expert articles on autism, ADHD, dyslexia, parenting, teen
            mental health, school concerns and emotional wellbeing.
          </p>
        </div>
      </section>

      {featuredBlog && (
        <section className="-mt-8 px-4 pb-14 sm:px-5 md:pb-16">
          <Link
            href={`/blog/${featuredBlog.slug}`}
            className="mx-auto grid max-w-7xl overflow-hidden rounded-4xl bg-white shadow-2xl shadow-slate-900/10 md:rounded-[3rem] lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="min-h-72 overflow-hidden bg-[#102A43] sm:min-h-80">
              {featuredBlog.image?.url ? (
                <img
                  src={featuredBlog.image.url}
                  alt={`${featuredBlog.title} by Dr. Vini Jhariya`}
                  className="h-full min-h-72 w-full object-cover transition duration-500 hover:scale-105 sm:min-h-80"
                />
              ) : (
                <div className="flex h-full min-h-72 items-center justify-center text-white/30 sm:min-h-80">
                  <BookOpen size={80} />
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 md:p-12">
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black text-[#0F766E]">
                  Featured
                </span>

                {featuredBlog.category && (
                  <span className="rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E]">
                    {featuredBlog.category}
                  </span>
                )}

                {featuredBlog.language && (
                  <span className="rounded-full bg-[#FFF1EA] px-4 py-2 text-xs font-black text-[#C05621]">
                    {featuredBlog.language}
                  </span>
                )}
              </div>

              <h2 className="text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-5xl">
                {featuredBlog.title}
              </h2>

              <p className="mt-5 line-clamp-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8">
                {featuredBlog.excerpt}
              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white">
                Read Article
                <ArrowRight size={17} />
              </div>
            </div>
          </Link>
        </section>
      )}

      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-4xl bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-5 md:rounded-[2.5rem]">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full rounded-full border border-slate-200 bg-[#F7FBFC] py-4 pl-12 pr-5 text-sm font-semibold outline-none focus:border-[#2CB1A6]"
                />
              </div>

              <div className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:max4xl lg:flex-wrap lg:overflow-visible">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full px-4 py-3 text-xs font-black transition ${
                      activeCategory === category
                        ? "bg-[#0F3D5E] text-white"
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
            <div className="rounded-4xxl bg-white p-12 text-center shadow-xl sm:p-16">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-500">Loading blogs...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="rounded-4xxl bg-white p-8 text-center shadow-xl sm:p-16">
              <FileText className="mx-auto mb-4 text-[#0F3D5E]" size={42} />

              <h3 className="text-2xl font-black text-[#102A43]">
                Articles are coming soon
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-slate-600">
                Helpful articles on autism, ADHD, dyslexia, parenting, child
                behaviour and emotional wellbeing will be published here soon.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1"
                >
                  <CalendarCheck size={17} />
                  Book Consultation
                </Link>

                <a
                  href="https://wa.me/917999215093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1"
                >
                  <MessageCircle size={17} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog._id || blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="group overflow-hidden rounded-4xl bg-white shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="h-56 overflow-hidden bg-[#102A43]">
                    {blog.image?.url ? (
                      <img
                        src={blog.image.url}
                        alt={`${blog.title} by Dr. Vini Jhariya`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/30">
                        <BookOpen size={54} />
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

                      {blog.language && (
                        <span className="rounded-full bg-[#F7FBFC] px-3 py-1 text-xs font-black text-[#0F3D5E]">
                          {blog.language}
                        </span>
                      )}
                    </div>

                    <h2 className="line-clamp-2 text-2xl font-black leading-tight text-[#102A43]">
                      {blog.title}
                    </h2>

                    <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                      {blog.excerpt}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-400">
                        <CalendarDays size={14} />
                        {blog.publishedAt
                          ? new Date(blog.publishedAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "Recent"}
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
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
