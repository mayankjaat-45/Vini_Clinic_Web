"use client";

import { useEffect, useMemo, useState } from "react";
import { API } from "@/lib/api";
import {
  ArrowRight,
  Brain,
  CalendarCheck,
  Download,
  FileText,
  HeartHandshake,
  ImageIcon,
  Loader2,
  Mail,
  MessageCircle,
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

const fallbackResources = [
  {
    _id: "10-signs-child-support",
    title: "10 signs your child may need professional support",
    slug: "10-signs-your-child-may-need-professional-support",
    category: "Guide",
    description:
      "A parent-friendly guide to understand when behaviour, emotions, learning or development may need professional attention.",
    file: {
      format: "PDF",
      bytes: 1200000,
    },
    isFeatured: true,
    isFallback: true,
  },
  {
    _id: "parent-observation-checklist",
    title: "Parent observation checklist",
    slug: "parent-observation-checklist",
    category: "Worksheet",
    description:
      "A simple worksheet to help parents observe patterns in behaviour, attention, routines and emotional responses.",
    file: {
      format: "PDF",
      bytes: 900000,
    },
    isFallback: true,
  },
  {
    _id: "child-development-support-guide",
    title: "Child development support guide",
    slug: "child-development-support-guide",
    category: "Child Development",
    description:
      "A quick guide to understand developmental concerns and when to seek professional assessment or counselling support.",
    file: {
      format: "PDF",
      bytes: 1000000,
    },
    isFallback: true,
  },
];

const formatBytes = (bytes) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  const mb = kb / 1024;

  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${kb.toFixed(0)} KB`;
};

const getResourceIcon = (category = "") => {
  if (category === "Guide") return Brain;
  if (category === "Worksheet") return FileText;
  if (category === "Child Development") return HeartHandshake;
  return FileText;
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

      setResources(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.log("RESOURCES FETCH ERROR:", error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const displayResources = resources.length > 0 ? resources : fallbackResources;

  const filteredResources = useMemo(() => {
    return displayResources.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const text = `${item.title || ""} ${item.category || ""} ${
        item.description || ""
      }`.toLowerCase();

      return matchesCategory && text.includes(search.toLowerCase());
    });
  }, [displayResources, activeCategory, search]);

  const featuredResource =
    displayResources.find((item) => item.isFeatured) || displayResources[0];

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      {/* Hero */}
      <section className="relative px-4 py-18 sm:px-5 sm:py-22 md:py-24">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl md:h-96 md:w-96" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
            <Sparkles size={16} className="text-[#2CB1A6]" />
            Free Resources
          </div>

          <h1 className="max-w-5xl text-4xl font-black leading-tight text-[#102A43] sm:text-5xl md:text-7xl">
            Helpful guides, worksheets and parent resources.
          </h1>

          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            Download free resources on child development, autism, ADHD,
            dyslexia, parenting and emotional wellbeing.
          </p>
        </div>
      </section>

      {/* Featured Resource */}
      {featuredResource && (
        <section className="-mt-8 px-4 pb-14 sm:px-5 md:pb-16">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-4xl bg-white shadow-2xl shadow-slate-900/10 md:rounded-[3rem] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-72 overflow-hidden bg-linear-to-br from-[#0F3D5E] to-[#168A83] sm:min-h-80">
              {featuredResource.coverImage?.url ? (
                <img
                  src={featuredResource.coverImage.url}
                  alt={`${featuredResource.title}, free resource by Dr. Vini Jhariya`}
                  className="h-full min-h-72 w-full object-cover sm:min-h-80"
                />
              ) : (
                <div className="flex h-full min-h-72 items-center justify-center text-white/80 sm:min-h-80">
                  {(() => {
                    const Icon = getResourceIcon(featuredResource.category);
                    return <Icon size={92} />;
                  })()}
                </div>
              )}

              <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#0F3D5E]">
                Lead Magnet
              </div>
            </div>

            <div className="p-6 sm:p-8 md:p-12">
              <div className="mb-5 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black text-[#0F766E]">
                  Featured Resource
                </span>

                <span className="rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E]">
                  {featuredResource.category}
                </span>

                <span className="rounded-full bg-[#FFF1EA] px-4 py-2 text-xs font-black text-[#C05621]">
                  {featuredResource.file?.format?.toUpperCase() || "PDF"}
                </span>
              </div>

              <h2 className="text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-5xl">
                {featuredResource.title}
              </h2>

              <p className="mt-5 text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8">
                {featuredResource.description}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {featuredResource.file?.url ? (
                  <a
                    href={featuredResource.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1"
                  >
                    <Download size={17} />
                    Download Resource
                  </a>
                ) : (
                  <a
                    href="mailto:dr.vinijhariya@gmail.com?subject=Free%20Resource%20Request%20-%2010%20Signs"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1"
                  >
                    <Mail size={17} />
                    Request PDF
                  </a>
                )}

                <Link
                  href={
                    featuredResource.isFallback
                      ? "/contact-us"
                      : `/free-resources/${featuredResource.slug}`
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E9F8F6] px-6 py-4 text-sm font-black text-[#0F766E] transition hover:-translate-y-1"
                >
                  {featuredResource.isFallback
                    ? "Ask for Guidance"
                    : "View Details"}
                  <ArrowRight size={15} />
                </Link>
              </div>

              <p className="mt-5 text-xs font-bold leading-5 text-slate-400">
                {formatBytes(featuredResource.file?.bytes)}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Resources List */}
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
                  placeholder="Search resources..."
                  className="w-full rounded-full border border-slate-200 bg-[#F7FBFC] py-4 pl-12 pr-5 text-sm font-semibold outline-none focus:border-[#2CB1A6]"
                />
              </div>

              <div className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:max-w-180 lg:flex-wrap lg:overflow-visible">
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
            <div className="rounded-4xl bg-white p-12 text-center shadow-xl sm:p-16">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-500">Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="rounded-4xl bg-white p-12 text-center shadow-xl sm:p-16">
              <ImageIcon className="mx-auto mb-4 text-[#0F3D5E]" size={46} />
              <h3 className="text-2xl font-black text-[#102A43]">
                No resources found
              </h3>
              <p className="mt-2 font-semibold text-slate-500">
                Try another category or search term.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredResources.map((item) => {
                const Icon = getResourceIcon(item.category);

                return (
                  <article
                    key={item._id}
                    className="overflow-hidden rounded-4xl bg-white shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <div className="h-52 overflow-hidden bg-linear-to-br from-[#0F3D5E] to-[#168A83]">
                      {item.coverImage?.url ? (
                        <img
                          src={item.coverImage.url}
                          alt={`${item.title}, free child psychology resource by Dr. Vini Jhariya`}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/80">
                          <Icon size={58} />
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

                        <span className="rounded-full bg-[#F7FBFC] px-3 py-1 text-xs font-black text-[#0F3D5E]">
                          {item.file?.format?.toUpperCase() || "PDF"}
                        </span>
                      </div>

                      {item.isFallback ? (
                        <h2 className="line-clamp-2 text-2xl font-black leading-tight text-[#102A43]">
                          {item.title}
                        </h2>
                      ) : (
                        <Link href={`/free-resources/${item.slug}`}>
                          <h2 className="line-clamp-2 text-2xl font-black leading-tight text-[#102A43] transition hover:text-[#0F766E]">
                            {item.title}
                          </h2>
                        </Link>
                      )}

                      <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                        {item.description}
                      </p>

                      <div className="mt-5 text-xs font-bold text-slate-400">
                        {formatBytes(item.file?.bytes)}
                      </div>

                      {item.isFallback ? (
                        <a
                          href="mailto:dr.vinijhariya@gmail.com?subject=Free%20Resource%20Request"
                          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white"
                        >
                          <Mail size={16} />
                          Request PDF
                          <ArrowRight size={15} />
                        </a>
                      ) : (
                        <>
                          <Link
                            href={`/free-resources/${item.slug}`}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E9F8F6] px-5 py-3 text-sm font-black text-[#0F766E]"
                          >
                            View Details
                            <ArrowRight size={15} />
                          </Link>

                          {item.file?.url && (
                            <a
                              href={item.file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white"
                            >
                              <Download size={16} />
                              Download
                              <ArrowRight size={15} />
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl bg-[#E9F8F6] p-6 text-center shadow-xl shadow-slate-900/5 sm:p-10 md:rounded-[3rem] md:p-16">
          <h2 className="text-3xl font-black text-[#102A43] sm:text-4xl md:text-6xl">
            Need personalised guidance?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            These resources are helpful for awareness, but they are not a
            replacement for professional assessment, diagnosis or consultation.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white transition hover:-translate-y-1"
            >
              <CalendarCheck size={17} />
              Book Consultation
            </Link>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white transition hover:-translate-y-1"
            >
              <MessageCircle size={17} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
