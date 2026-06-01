"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import {
  ArrowRight,
  Brain,
  CalendarCheck,
  Download,
  FileText,
  HeartHandshake,
  Loader2,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const fallbackResources = [
  {
    _id: "10-signs-child-support",
    title: "10 signs your child may need professional support",
    slug: "10-signs-your-child-may-need-professional-support",
    category: "Guide",
    description:
      "A simple parent-friendly guide to understand when behaviour, emotions, learning or development may need professional attention.",
    file: {
      format: "PDF",
      bytes: 1200000,
    },
    icon: Brain,
  },
  {
    _id: "parenting-checklist",
    title: "Parent observation checklist",
    slug: "parent-observation-checklist",
    category: "Worksheet",
    description:
      "A helpful checklist for parents to notice patterns in behaviour, routine, attention and emotional responses.",
    file: {
      format: "PDF",
      bytes: 900000,
    },
    icon: FileText,
  },
  {
    _id: "child-development-guide",
    title: "Child development support guide",
    slug: "child-development-support-guide",
    category: "Child Development",
    description:
      "Understand early signs, developmental concerns and when to seek assessment or counselling support.",
    file: {
      format: "PDF",
      bytes: 1000000,
    },
    icon: HeartHandshake,
  },
];

const formatBytes = (bytes) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  const mb = kb / 1024;

  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${kb.toFixed(0)} KB`;
};

export default function ResourcesPreview() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/resources");

      setResources(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.log("HOME RESOURCES ERROR:", error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const previewResources = useMemo(() => {
    const activeResources = resources.filter(
      (item) => item?.isActive !== false,
    );
    const featured = activeResources.filter((item) => item.isFeatured);

    if (featured.length) return featured.slice(0, 3);
    if (activeResources.length) return activeResources.slice(0, 3);

    return fallbackResources;
  }, [resources]);

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-4 py-14 sm:px-5 sm:py-18 md:py-22">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Free Resources
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-6xl">
              Download helpful guides and parent resources.
            </h2>

            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              Explore parent guides, worksheets and resources for child
              development, autism, ADHD, dyslexia, emotional wellbeing and early
              support.
            </p>
          </div>

          <Link
            href="/free-resources"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
          >
            View All Resources
            <ArrowRight size={17} />
          </Link>
        </div>

        {loading ? (
          <div className="rounded-4xl bg-white p-10 text-center shadow-xl">
            <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
            <p className="font-bold text-slate-600">Loading resources...</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {previewResources.map((item) => {
              const hasRealFile = Boolean(item?.file?.url);
              const Icon = item.icon || FileText;

              return (
                <article
                  key={item._id}
                  className="group overflow-hidden rounded-4xl bg-white shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
                >
                  <div className="relative h-52 overflow-hidden bg-linear-to-br from-[#0F3D5E] to-[#168A83]">
                    {item.coverImage?.url ? (
                      <img
                        src={item.coverImage.url}
                        alt={`${item.title}, free child psychology resource by Dr. Vini Jhariya`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/80">
                        <Icon size={62} />
                      </div>
                    )}

                    <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#0F3D5E]">
                      {item.file?.format?.toUpperCase() || "PDF"}
                    </div>
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
                    </div>

                    <h3 className="line-clamp-2 text-2xl font-black leading-tight text-[#102A43]">
                      {item.title}
                    </h3>

                    <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-5 text-xs font-bold text-slate-400">
                      {formatBytes(item.file?.bytes)}
                    </div>

                    {hasRealFile ? (
                      <a
                        href={item.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white"
                      >
                        <Download size={16} />
                        Download
                        <ArrowRight size={15} />
                      </a>
                    ) : (
                      <Link
                        href="/free-resources"
                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white"
                      >
                        View Resource
                        <ArrowRight size={15} />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-10 overflow-hidden rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-6 text-white shadow-2xl shadow-blue-950/20 sm:p-8 md:rounded-[2.5rem]">
          <div className="grid gap-7 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h3 className="text-2xl font-black leading-tight sm:text-3xl">
                Need personalised guidance for your child?
              </h3>

              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/70 sm:text-base">
                Free resources are helpful for awareness, but they do not
                replace professional assessment or consultation.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1"
              >
                <CalendarCheck size={18} />
                Book Consultation
              </Link>

              <a
                href="https://wa.me/917999215093"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/15"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
