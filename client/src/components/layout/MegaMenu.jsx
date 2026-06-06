"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import {
  Activity,
  Baby,
  BookOpen,
  Brain,
  ChevronRight,
  ClipboardCheck,
  HeartHandshake,
  Loader2,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const menuGroups = [
  {
    title: "Children & Teens",
    tag: "Child-focused care",
    icon: Baby,
    accent: "from-[#E9F8F6] to-[#F8FEFD]",
    iconClass: "bg-[#DFF5F2] text-[#0F766E]",
    services: [
      {
        label: "Autism Therapy",
        keywords: ["autism"],
        fallbackSlug: "autism-therapy",
        icon: Brain,
      },
      {
        label: "ADHD Assessment",
        keywords: ["adhd"],
        fallbackSlug: "adhd-assessment",
        icon: Activity,
      },
      {
        label: "Dyslexia & Remedial",
        keywords: ["dyslexia", "remedial"],
        fallbackSlug: "dyslexia-remedial",
        icon: BookOpen,
      },
      {
        label: "Child Counselling",
        keywords: ["child counselling", "child-counselling"],
        fallbackSlug: "child-counselling",
        icon: Baby,
      },
      {
        label: "Adolescent Counselling",
        keywords: ["adolescent", "teen"],
        fallbackSlug: "adolescent-counselling",
        icon: Users,
      },
      {
        label: "Early Intervention",
        keywords: ["early intervention", "early-intervention"],
        fallbackSlug: "early-intervention",
        icon: Sparkles,
      },
      {
        label: "Psychological Assessments",
        keywords: ["psychological assessment", "psychological-assessments"],
        fallbackSlug: "psychological-assessments",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    title: "Adults & Families",
    tag: "Counselling support",
    icon: HeartHandshake,
    accent: "from-[#FFF6EF] to-[#F8FEFD]",
    iconClass: "bg-[#FFF0E4] text-[#B85C24]",
    services: [
      {
        label: "Adult Counselling",
        keywords: ["adult counselling", "adult-counselling"],
        fallbackSlug: "adult-counselling",
        icon: Users,
      },
      {
        label: "Couple Counselling",
        keywords: ["couple counselling", "couple-counselling"],
        fallbackSlug: "couple-counselling",
        icon: HeartHandshake,
      },
      {
        label: "Premarital Counselling",
        keywords: ["premarital", "pre marital"],
        fallbackSlug: "premarital-counselling",
        icon: ShieldCheck,
      },
      {
        label: "Family Therapy",
        keywords: ["family therapy", "family-therapy"],
        fallbackSlug: "family-therapy",
        icon: Users,
      },
      {
        label: "Online Consultation",
        keywords: ["online consultation", "online-consultation"],
        fallbackSlug: "online-consultation",
        customHref: "/online-consultation",
        icon: MonitorSmartphone,
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
      `${service?.title || ""} ${service?.slug || ""} ${
        service?.category || ""
      }`,
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
    <div className="pointer-events-auto fixed left-1/2 top-20 z-9999 w-[calc(100vw-24px)] -translate-x-1/2 lg:top-24 lg:w-[min(980px,calc(100vw-40px))]">
      <div className="relative overflow-hidden rounded-[28px] border border-[#D8F0EE] bg-white/95 shadow-2xl shadow-slate-900/20 ring-1 ring-white/70 backdrop-blur-2xl">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#E9F8F6] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#FFF0E4] blur-3xl" />

        <button
          type="button"
          onClick={onNavigate}
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-[#E9F8F6] hover:text-[#0F766E]"
          aria-label="Close services menu"
        >
          <X size={18} />
        </button>

        <div className="relative max-h-[calc(100vh-120px)] overflow-y-auto p-4 sm:p-5 lg:p-6 [scrollbar-color:#0F766E_#E9F8F6] [scrollbar-width:thin]">
          <div className="mb-5 pr-12">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.24em] text-[#0F766E]">
              Services
            </p>

            <h3 className="text-2xl font-black leading-tight text-[#102A43] sm:text-3xl">
              Choose the right support
            </h3>

            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
              Dr. Vini’s therapy, counselling and assessment services.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-56 items-center justify-center rounded-3xl bg-white/80 ring-1 ring-slate-100">
              <div className="text-center">
                <Loader2 className="mx-auto mb-3 animate-spin text-[#0F3D5E]" />
                <p className="text-sm font-bold text-slate-500">
                  Loading services...
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
              {menuGroups.map((group) => {
                const GroupIcon = group.icon;

                return (
                  <div
                    key={group.title}
                    className={`overflow-hidden rounded-3xl border border-slate-100 bg-linear-to-br ${group.accent} p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 sm:p-5`}
                  >
                    <div className="mb-5 flex items-center gap-3 border-b border-slate-200/80 pb-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${group.iconClass}`}
                      >
                        <GroupIcon size={23} />
                      </div>

                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
                          {group.tag}
                        </p>

                        <h4 className="mt-1 text-xl font-black text-[#102A43]">
                          {group.title}
                        </h4>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      {group.services.map((item) => {
                        const ServiceIcon = item.icon;

                        return (
                          <Link
                            key={item.label}
                            href={getServiceHref(item, activeServices)}
                            onClick={onNavigate}
                            className="group flex items-center gap-3 rounded-2xl bg-white/70 p-3 text-[#24415A] ring-1 ring-white/80 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0F766E] hover:shadow-lg hover:shadow-slate-900/10"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E9F8F6] text-[#0F766E] transition group-hover:bg-[#0F3D5E] group-hover:text-white">
                              <ServiceIcon size={18} />
                            </span>

                            <span className="min-w-0 flex-1 text-[15px] font-black leading-tight sm:text-base">
                              {item.label}
                            </span>

                            <ChevronRight
                              size={17}
                              className="shrink-0 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3 rounded-3xl border border-[#D8F0EE] bg-white/80 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black text-[#102A43]">
                Need help choosing the right service?
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Book a consultation and get guided by the clinic team.
              </p>
            </div>

            <Link
              href="/contact-us"
              onClick={onNavigate}
              className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#0F3D5E] to-[#168A83] px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-900/20 transition hover:-translate-y-0.5"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
