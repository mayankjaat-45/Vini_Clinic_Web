"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import {
  Activity,
  ArrowRight,
  Baby,
  Brain,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  Loader2,
  MessageCircle,
  MonitorSmartphone,
  PhoneCall,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const getServiceIcon = (service = {}) => {
  const text = `${service.title || ""} ${service.slug || ""} ${
    service.category || ""
  }`.toLowerCase();

  if (text.includes("autism")) return Brain;
  if (text.includes("adhd")) return Activity;
  if (text.includes("dyslexia")) return ClipboardCheck;
  if (text.includes("assessment")) return ClipboardCheck;
  if (text.includes("early")) return Baby;
  if (text.includes("child")) return Baby;
  if (text.includes("adolescent") || text.includes("teen")) return Users;
  if (text.includes("adult")) return MessageCircle;
  if (text.includes("couple")) return HeartHandshake;
  if (text.includes("family")) return Users;
  if (text.includes("online")) return MonitorSmartphone;
  if (text.includes("internship")) return GraduationCap;
  if (text.includes("workshop") || text.includes("course")) return Sparkles;

  return HeartHandshake;
};

const getServiceDesc = (service = {}) => {
  if (service.shortDescription) return service.shortDescription;

  const text = `${service.title || ""} ${service.slug || ""}`.toLowerCase();

  if (text.includes("autism")) return "Therapy, parent guidance and support";
  if (text.includes("adhd")) return "Attention, behaviour and focus support";
  if (text.includes("dyslexia"))
    return "Reading and learning difficulty support";
  if (text.includes("assessment"))
    return "Clinical and psychological assessment";
  if (text.includes("online")) return "Consult Dr. Vini from anywhere";

  return "View service details";
};

const categoryOrder = [
  "Children",
  "Adults",
  "Online Consultation",
  "Assessment",
  "Training",
  "Other",
];

const normalizeCategory = (service = {}) => {
  const text = `${service.category || ""} ${service.title || ""} ${
    service.slug || ""
  }`.toLowerCase();

  if (text.includes("online")) return "Online Consultation";

  if (
    text.includes("adult") ||
    text.includes("couple") ||
    text.includes("family")
  ) {
    return "Adults";
  }

  if (text.includes("assessment")) return "Assessment";

  if (
    text.includes("internship") ||
    text.includes("workshop") ||
    text.includes("course") ||
    text.includes("training")
  ) {
    return "Training";
  }

  return service.category || "Children";
};

const categoryConfig = {
  Children: {
    title: "Children & Teens",
    subtitle: "Therapy, counselling and developmental support",
    icon: Baby,
    color: "bg-[#E9F8F6] text-[#0F766E]",
  },
  Adults: {
    title: "Adults & Families",
    subtitle: "Counselling, relationship and family support",
    icon: Users,
    color: "bg-[#FFF1EA] text-[#C05621]",
  },
  "Online Consultation": {
    title: "Online Consultation",
    subtitle: "Consult from anywhere",
    icon: MonitorSmartphone,
    color: "bg-[#EEF4FF] text-[#3158D4]",
  },
  Assessment: {
    title: "Assessments",
    subtitle: "Clinical, learning and behavioural assessments",
    icon: ClipboardCheck,
    color: "bg-[#F4F0FF] text-[#6B46C1]",
  },
  Training: {
    title: "Training Programs",
    subtitle: "Internship, workshops and courses",
    icon: GraduationCap,
    color: "bg-[#FFF7E6] text-[#B7791F]",
  },
  Other: {
    title: "Other Services",
    subtitle: "Additional support services",
    icon: HeartHandshake,
    color: "bg-[#E9F8F6] text-[#0F766E]",
  },
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

  const groupedServices = useMemo(() => {
    return activeServices.reduce((acc, service) => {
      const category = normalizeCategory(service);

      if (!acc[category]) acc[category] = [];

      acc[category].push(service);
      return acc;
    }, {});
  }, [activeServices]);

  const availableCategories = useMemo(() => {
    return Object.keys(groupedServices).sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a);
      const bIndex = categoryOrder.indexOf(b);

      return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
    });
  }, [groupedServices]);

  return (
    <div
      className="
      fixed left-1/2 top-28 bottom-4 z-9999 hidden
      w-[min(980px,calc(100vw-32px))]
      -translate-x-1/2 lg:block
      pointer-events-auto
    "
    >
      <div
        className="
        relative h-full overflow-hidden
        rounded-[26px] border border-[#D8F0EE] bg-white
        shadow-2xl shadow-slate-900/20 ring-1 ring-slate-100
      "
      >
        <button
          type="button"
          onClick={onNavigate}
          className="
          absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center
          rounded-full bg-white text-[#0F3D5E] shadow-lg transition
          hover:bg-[#E9F8F6]
        "
          aria-label="Close services menu"
        >
          <X size={17} />
        </button>

        <div className="grid h-full min-h-0 grid-cols-[255px_1fr] overflow-hidden">
          {/* Left Premium Panel */}
          <div
            className="
            relative h-full min-h-0 overflow-y-auto bg-linear-to-br
            from-[#0F3D5E] via-[#126B73] to-[#2CB1A6]
            p-5 text-white
          "
          >
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#F4B183]/20 blur-3xl" />

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[11px] font-black text-white">
                <Sparkles size={14} className="text-[#F4B183]" />
                Urjasvini CDC
              </div>

              <h3 className="text-2xl font-black leading-tight">
                Clinical support for children and families.
              </h3>

              <p className="mt-4 text-sm font-semibold leading-7 text-white/75">
                Therapy, counselling, assessments and online consultation by Dr.
                Vini Jhariya.
              </p>

              <div className="mt-6 grid gap-3">
                <Link
                  href="/services"
                  onClick={onNavigate}
                  className="
                  inline-flex items-center justify-center gap-2 rounded-full
                  bg-white px-5 py-3 text-sm font-black text-[#0F3D5E]
                  transition hover:-translate-y-1
                "
                >
                  View All
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/contact-us"
                  onClick={onNavigate}
                  className="
                  inline-flex items-center justify-center gap-2 rounded-full
                  border border-white/20 bg-white/10 px-5 py-3
                  text-sm font-black text-white transition
                  hover:-translate-y-1 hover:bg-white/15
                "
                >
                  Book
                  <PhoneCall size={16} />
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-white/10 p-2 text-center">
                  <p className="text-sm font-black">2013</p>
                  <p className="mt-1 text-[9px] font-bold text-white/65">
                    Since
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-2 text-center">
                  <p className="text-sm font-black">5K+</p>
                  <p className="mt-1 text-[9px] font-bold text-white/65">
                    Families
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-2 text-center">
                  <p className="text-sm font-black">4.9★</p>
                  <p className="mt-1 text-[9px] font-bold text-white/65">
                    Rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Services Panel */}
          <div className="h-full min-h-0 overflow-hidden bg-[#F8FEFD]">
            <div
              className="
              h-full min-h-0 overflow-y-scroll overscroll-contain
              p-4 pr-5
              [scrollbar-width:thin]
              [scrollbar-color:#0F766E_#E9F8F6]
            "
              style={{
                WebkitOverflowScrolling: "touch",
                maxHeight: "100%",
              }}
              onWheel={(e) => e.stopPropagation()}
            >
              {loading ? (
                <div className="flex min-h-80 items-center justify-center rounded-3xl bg-white">
                  <div className="text-center">
                    <Loader2 className="mx-auto mb-3 animate-spin text-[#0F3D5E]" />
                    <p className="text-sm font-bold text-slate-500">
                      Loading services...
                    </p>
                  </div>
                </div>
              ) : activeServices.length === 0 ? (
                <div className="flex min-h-80 items-center justify-center rounded-3xl bg-white p-8 text-center">
                  <div>
                    <HeartHandshake className="mx-auto mb-4 text-[#0F3D5E]" />
                    <h4 className="text-xl font-black text-[#102A43]">
                      Services are coming soon
                    </h4>
                    <p className="mx-auto mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500">
                      Services will appear here automatically once active
                      services are added from the admin dashboard.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pb-10">
                  {availableCategories.map((category) => {
                    const config =
                      categoryConfig[category] || categoryConfig.Other;
                    const CategoryIcon = config.icon;
                    const categoryServices = groupedServices[category] || [];

                    return (
                      <div
                        key={category}
                        className="rounded-[22px] bg-white p-3 shadow-sm ring-1 ring-slate-100"
                      >
                        <div className="mb-3 flex items-start gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${config.color}`}
                          >
                            <CategoryIcon size={19} />
                          </div>

                          <div>
                            <h4 className="text-sm font-black text-[#102A43]">
                              {config.title || category}
                            </h4>
                            <p className="mt-1 line-clamp-2 text-xs font-semibold leading-5 text-slate-500">
                              {config.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          {categoryServices.map((service) => {
                            const ServiceIcon = getServiceIcon(service);

                            return (
                              <Link
                                key={service._id || service.slug}
                                href={`/services/${service.slug}`}
                                onClick={onNavigate}
                                className="
                                group flex gap-2 rounded-2xl p-2.5 transition
                                hover:bg-[#F7FBFC]
                              "
                              >
                                <span
                                  className="
                                  flex h-9 w-9 shrink-0 items-center justify-center
                                  rounded-xl bg-[#E9F8F6] text-[#0F766E]
                                  transition group-hover:bg-[#0F3D5E]
                                  group-hover:text-white
                                "
                                >
                                  <ServiceIcon size={17} />
                                </span>

                                <span className="min-w-0">
                                  <span
                                    className="
                                    line-clamp-1 block text-sm font-black
                                    leading-tight text-[#102A43]
                                    group-hover:text-[#0F766E]
                                  "
                                  >
                                    {service.title}
                                  </span>

                                  <span className="mt-1 line-clamp-1 block text-xs font-semibold leading-5 text-slate-500">
                                    {getServiceDesc(service)}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
