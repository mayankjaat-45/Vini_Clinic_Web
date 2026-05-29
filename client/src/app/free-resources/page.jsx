"use client";

import { useEffect, useMemo, useState } from "react";
import { API } from "@/lib/api";
import {
  ArrowRight,
  Download,
  FileText,
  ImageIcon,
  Loader2,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const categories = [
  "All",
  "Autism",
  "ADHD",
  "Dyslexia",
  "Parenting",
  "Child Development",
  "Mental Health",
  "Worksheet",
  "Guide",
  "Other",
];

const formatBytes = (bytes) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  const mb = kb / 1024;

  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${kb.toFixed(0)} KB`;
};

export default function FreeResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchResources = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/resources");

      setResources(data?.data || []);
    } catch (error) {
      console.log("RESOURCES FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const text =
        `${item.title} ${item.category} ${item.description}`.toLowerCase();

      return matchesCategory && text.includes(search.toLowerCase());
    });
  }, [resources, activeCategory, search]);

  const featuredResource =
    resources.find((item) => item.isFeatured) || resources[0];

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-5 py-24">
        <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
            <Sparkles size={16} className="text-[#2CB1A6]" />
            Free Resources
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-tight text-[#102A43] md:text-7xl">
            Helpful guides, worksheets and parent resources.
          </h1>

          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
            Download free resources on child development, autism, ADHD,
            dyslexia, parenting and emotional wellbeing.
          </p>
        </div>
      </section>

      {featuredResource && (
        <section className="-mt-10 px-5 pb-16">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[3rem] bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="min-h-80 bg-[#102A43]">
              {featuredResource.coverImage?.url ? (
                <img
                  src={featuredResource.coverImage.url}
                  alt={featuredResource.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-80 items-center justify-center text-white/30">
                  <FileText size={84} />
                </div>
              )}
            </div>

            <div className="p-8 md:p-12">
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black text-[#0F766E]">
                  Featured Resource
                </span>

                <span className="rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E]">
                  {featuredResource.category}
                </span>
              </div>

              <h2 className="text-4xl font-black leading-tight text-[#102A43] md:text-5xl">
                {featuredResource.title}
              </h2>

              <p className="mt-5 text-base font-semibold leading-8 text-slate-600">
                {featuredResource.description}
              </p>

              <Link
                href={`/free-resources/${item.slug}`}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E9F8F6] px-5 py-3 text-sm font-black text-[#0F766E]"
              >
                View Details
                <ArrowRight size={15} />
              </Link>

              <a
                href={featuredResource.file?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white"
              >
                <Download size={17} />
                Download Resource
              </a>
            </div>
          </div>
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
                  placeholder="Search resources..."
                  className="w-full rounded-full border border-slate-200 bg-[#F7FBFC] py-4 pl-12 pr-5 text-sm font-semibold outline-none focus:border-[#2CB1A6]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
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
              <p className="font-bold text-slate-500">Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="rounded-4xl bg-white p-16 text-center shadow-xl">
              <ImageIcon className="mx-auto mb-4 text-[#0F3D5E]" size={46} />
              <h3 className="text-2xl font-black text-[#102A43]">
                No resources found
              </h3>
              <p className="mt-2 font-semibold text-slate-500">
                Try another category or search term.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredResources.map((item) => (
                <article
                  key={item._id}
                  className="overflow-hidden rounded-4xl bg-white shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="h-52 bg-[#102A43]">
                    {item.coverImage?.url ? (
                      <img
                        src={item.coverImage.url}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/30">
                        <FileText size={58} />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                        {item.category}
                      </span>

                      {item.isFeatured && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-700">
                          Featured
                        </span>
                      )}

                      {item.file?.format && (
                        <span className="rounded-full bg-[#F7FBFC] px-3 py-1 text-xs font-black text-[#0F3D5E]">
                          {item.file.format?.toUpperCase()}
                        </span>
                      )}
                    </div>

                    <Link href={`/free-resources/${item.slug}`}>
                      <h2 className="line-clamp-2 text-2xl font-black leading-tight text-[#102A43] transition hover:text-[#0F766E]">
                        {item.title}
                      </h2>
                    </Link>

                    <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-5 text-xs font-bold text-slate-400">
                      {formatBytes(item.file?.bytes)}
                    </div>

                    <Link
                      href={`/free-resources/${item.slug}`}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E9F8F6] px-5 py-3 text-sm font-black text-[#0F766E]"
                    >
                      View Details
                      <ArrowRight size={15} />
                    </Link>

                    <a
                      href={item.file?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white"
                    >
                      <Download size={16} />
                      Download
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-[#E9F8F6] p-10 text-center md:p-16">
          <h2 className="text-4xl font-black text-[#102A43] md:text-6xl">
            Need personalised guidance?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
            These resources are helpful, but they are not a replacement for a
            professional assessment or consultation.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/contact-us"
              className="rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white"
            >
              Book Consultation
            </a>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
