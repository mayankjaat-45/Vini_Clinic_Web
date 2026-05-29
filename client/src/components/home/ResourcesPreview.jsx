"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import {
  ArrowRight,
  Download,
  FileText,
  Loader2,
  Sparkles,
} from "lucide-react";

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

      setResources(data?.data || []);
    } catch (error) {
      console.log("HOME RESOURCES ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const previewResources = useMemo(() => {
    const featured = resources.filter((item) => item.isFeatured);

    if (featured.length) {
      return featured.slice(0, 3);
    }

    return resources.slice(0, 3);
  }, [resources]);

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-5 py-20">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Free Resources
            </div>

            <h2 className="max-w-4xl text-4xl font-black leading-tight text-[#102A43] md:text-6xl">
              Download helpful guides and worksheets.
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Explore parent guides, worksheets and resources for autism, ADHD,
              dyslexia, child development and emotional wellbeing.
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
        ) : previewResources.length === 0 ? (
          <div className="rounded-4xl bg-white p-10 text-center shadow-xl">
            <FileText className="mx-auto mb-4 text-[#0F3D5E]" size={42} />
            <h3 className="text-2xl font-black text-[#102A43]">
              No resources available
            </h3>
            <p className="mt-2 text-slate-600">
              Upload active resources from admin dashboard.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {previewResources.map((item) => (
              <article
                key={item._id}
                className="group overflow-hidden rounded-4xl bg-white shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="h-52 bg-[#102A43]">
                  {item.coverImage?.url ? (
                    <img
                      src={item.coverImage.url}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
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

                  <h3 className="line-clamp-2 text-2xl font-black leading-tight text-[#102A43]">
                    {item.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-5 text-xs font-bold text-slate-400">
                    {formatBytes(item.file?.bytes)}
                  </div>

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
  );
}
