"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import { Loader2, X } from "lucide-react";

const menuGroups = [
  {
    title: "CHILDREN & TEENS",
    services: [
      {
        label: "Autism Therapy",
        keywords: ["autism"],
        fallbackSlug: "autism-therapy",
      },
      {
        label: "ADHD Assessment",
        keywords: ["adhd"],
        fallbackSlug: "adhd-assessment",
      },
      {
        label: "Dyslexia & Remedial",
        keywords: ["dyslexia", "remedial"],
        fallbackSlug: "dyslexia-remedial",
      },
      {
        label: "Child Counselling",
        keywords: ["child counselling", "child-counselling"],
        fallbackSlug: "child-counselling",
      },
      {
        label: "Adolescent Counselling",
        keywords: ["adolescent", "teen"],
        fallbackSlug: "adolescent-counselling",
      },
      {
        label: "Early Intervention",
        keywords: ["early intervention", "early-intervention"],
        fallbackSlug: "early-intervention",
      },
      {
        label: "Psychological Assessments",
        keywords: ["psychological assessment", "psychological-assessments"],
        fallbackSlug: "psychological-assessments",
      },
    ],
  },
  {
    title: "ADULTS & FAMILIES",
    services: [
      {
        label: "Adult Counselling",
        keywords: ["adult counselling", "adult-counselling"],
        fallbackSlug: "adult-counselling",
      },
      {
        label: "Couple Counselling",
        keywords: ["couple counselling", "couple-counselling"],
        fallbackSlug: "couple-counselling",
      },
      {
        label: "Premarital Counselling",
        keywords: ["premarital", "pre marital"],
        fallbackSlug: "premarital-counselling",
      },
      {
        label: "Family Therapy",
        keywords: ["family therapy", "family-therapy"],
        fallbackSlug: "family-therapy",
      },
      {
        label: "Online Consultation",
        keywords: ["online consultation", "online-consultation"],
        fallbackSlug: "online-consultation",
        customHref: "/online-consultation",
      },
    ],
  },
];

const normalizeText = (value = "") =>
  value.toString().toLowerCase().replace(/-/g, " ").trim();

const getServiceHref = (item, services = []) => {
  if (item.customHref) return item.customHref;

  const matchedService = services.find((service) => {
    const text = normalizeText(
      `${service?.title || ""} ${service?.slug || ""} ${service?.category || ""}`,
    );

    return item.keywords.some((keyword) =>
      text.includes(normalizeText(keyword)),
    );
  });

  const slug = matchedService?.slug || item.fallbackSlug;

  return `/services/${slug}`;
};

export default function MegaMenu({ onNavigate }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/services");

      setServices(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.log("MEGA MENU SERVICES ERROR:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const activeServices = useMemo(() => {
    return services.filter((service) => service?.isActive !== false);
  }, [services]);

  return (
    <div className="pointer-events-auto fixed left-1/2 top-24 z-9999 hidden w-[min(920px,calc(100vw-32px))] -translate-x-1/2 lg:block">
      <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-100">
        <button
          type="button"
          onClick={onNavigate}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-50"
          aria-label="Close services menu"
        >
          <X size={17} />
        </button>

        <div className="max-h-[calc(100vh-140px)] overflow-y-auto p-8 pr-12 [scrollbar-color:#0F766E_#E9F8F6] [scrollbar-width:thin]">
          {loading ? (
            <div className="flex min-h-48 items-center justify-center">
              <div className="text-center">
                <Loader2 className="mx-auto mb-3 animate-spin text-[#0F3D5E]" />
                <p className="text-sm font-bold text-slate-500">
                  Loading services...
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-16">
              {menuGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-5 text-[15px] font-black uppercase tracking-[0.28em] text-slate-800">
                    {group.title}
                  </h3>

                  <div className="mb-6 h-px w-full bg-slate-300" />

                  <div className="space-y-4">
                    {group.services.map((item) => (
                      <Link
                        key={item.label}
                        href={getServiceHref(item, activeServices)}
                        onClick={onNavigate}
                        className="block text-[21px] font-semibold leading-tight tracking-[0.08em] text-slate-800 transition hover:translate-x-1 hover:text-[#0F766E]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
