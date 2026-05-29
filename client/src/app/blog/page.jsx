"use client";

import { useEffect, useMemo, useState } from "react";
import { API } from "@/lib/api";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  FileText,
  Loader2,
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

      setBlogs(data?.data || []);
    } catch (error) {
      console.log("BLOG FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" || blog.category === activeCategory;

      const text =
        `${blog.title} ${blog.excerpt} ${blog.category} ${blog.tags?.join(
          " ",
        )}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [blogs, search, activeCategory]);

  const featuredBlog = blogs.find((blog) => blog.isFeatured) || blogs[0];

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-5 py-24">
        <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
            <Sparkles size={16} className="text-[#2CB1A6]" />
            Blog & Resources
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-tight text-[#102A43] md:text-7xl">
            Child psychology insights for parents, families and professionals.
          </h1>

          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
            Read expert articles on autism, ADHD, dyslexia, parenting, teen
            mental health, school concerns and emotional wellbeing.
          </p>
        </div>
      </section>

      {featuredBlog && (
        <section className="-mt-10 px-5 pb-16">
          <a
            href={`/blog/${featuredBlog.slug}`}
            className="mx-auto grid max-w-7xl overflow-hidden rounded-[3rem] bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="min-h-80 bg-[#102A43]">
              {featuredBlog.image?.url ? (
                <img
                  src={featuredBlog.image.url}
                  alt={featuredBlog.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-80 items-center justify-center text-white/30">
                  <BookOpen size={80} />
                </div>
              )}
            </div>

            <div className="p-8 md:p-12">
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black text-[#0F766E]">
                  Featured
                </span>

                <span className="rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E]">
                  {featuredBlog.category}
                </span>
              </div>

              <h2 className="text-4xl font-black leading-tight text-[#102A43] md:text-5xl">
                {featuredBlog.title}
              </h2>

              <p className="mt-5 line-clamp-4 text-base font-semibold leading-8 text-slate-600">
                {featuredBlog.excerpt}
              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white">
                Read Article
                <ArrowRight size={17} />
              </div>
            </div>
          </a>
        </section>
      )}

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-4xl bg-white p-5 shadow-xl shadow-slate-900/5">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
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

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-3 text-xs font-black transition ${
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
            <div className="rounded-4xl bg-white p-16 text-center shadow-xl">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-500">Loading blogs...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="rounded-4xl bg-white p-16 text-center shadow-xl">
              <FileText className="mx-auto mb-4 text-[#0F3D5E]" size={42} />
              <h3 className="text-2xl font-black text-[#102A43]">
                No blogs found
              </h3>
              <p className="mt-2 font-semibold text-slate-500">
                Try another category or search term.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <a
                  key={blog._id}
                  href={`/blog/${blog.slug}`}
                  className="group overflow-hidden rounded-4xl bg-white shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="h-56 bg-[#102A43]">
                    {blog.image?.url ? (
                      <img
                        src={blog.image.url}
                        alt={blog.title}
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
                      <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                        {blog.category}
                      </span>

                      <span className="rounded-full bg-[#F7FBFC] px-3 py-1 text-xs font-black text-[#0F3D5E]">
                        {blog.language}
                      </span>
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
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
