"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Baby,
  BookOpen,
  Brain,
  CalendarCheck,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  Loader2,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  PhoneCall,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { API } from "@/lib/api";

const mainNavLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-dr-vini" },
  { name: "Online Consultation", href: "/online-consultation" },
  { name: "Success Stories", href: "/success-stories" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Resources", href: "/free-resources" },
  { name: "Contact", href: "/contact-us" },
];

const navItemClass =
  "rounded-full px-3 py-2 text-sm font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E] xl:px-4";

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
  Assessment: {
    title: "Assessments",
    subtitle: "Clinical, learning and behavioural assessments",
    icon: ClipboardCheck,
    color: "bg-[#F4F0FF] text-[#6B46C1]",
  },
  "Online Consultation": {
    title: "Online Consultation",
    subtitle: "Consult from anywhere",
    icon: MonitorSmartphone,
    color: "bg-[#EEF4FF] text-[#3158D4]",
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

const categoryOrder = [
  "Children",
  "Adults",
  "Assessment",
  "Online Consultation",
  "Training",
  "Other",
];

const normalizeCategory = (service = {}) => {
  const text = `${service.category || ""} ${service.title || ""} ${
    service.slug || ""
  }`.toLowerCase();

  if (text.includes("online")) return "Online Consultation";

  if (text.includes("assessment")) return "Assessment";

  if (
    text.includes("internship") ||
    text.includes("workshop") ||
    text.includes("course") ||
    text.includes("training")
  ) {
    return "Training";
  }

  if (
    text.includes("adult") ||
    text.includes("couple") ||
    text.includes("family")
  ) {
    return "Adults";
  }

  return service.category || "Children";
};

const getServiceIcon = (service = {}) => {
  const text = `${service.title || ""} ${service.slug || ""} ${
    service.category || ""
  }`.toLowerCase();

  if (text.includes("autism")) return Brain;
  if (text.includes("adhd")) return Activity;
  if (text.includes("dyslexia")) return BookOpen;
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

const getServiceDescription = (service = {}) => {
  if (service.shortDescription) return service.shortDescription;

  const text = `${service.title || ""} ${service.slug || ""}`.toLowerCase();

  if (text.includes("autism")) return "Therapy, support and parent guidance";
  if (text.includes("adhd")) return "Attention, behaviour and focus support";
  if (text.includes("dyslexia"))
    return "Reading and learning difficulty support";
  if (text.includes("assessment"))
    return "Clinical and psychological assessment";
  if (text.includes("online")) return "Consult Dr. Vini from anywhere";

  return "View service details";
};

const getServiceHref = (service = {}) => {
  if (!service.slug) return "/services";

  if (service.slug === "online-consultation") return "/online-consultation";
  if (service.slug === "psychology-internship-indore") {
    return "/psychology-internship-indore";
  }
  if (service.slug === "workshops-and-courses") return "/workshops-and-courses";
  if (service.slug === "success-stories") return "/success-stories";

  return `/services/${service.slug}`;
};

const Header = () => {
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [openMega, setOpenMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMega = () => setOpenMega(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setOpenMega(false);
  };

  const fetchServices = async () => {
    try {
      setServicesLoading(true);

      const { data } = await API.get("/api/services");

      setServices(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.log("HEADER SERVICES ERROR:", error);
      setServices([]);
    } finally {
      setServicesLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") closeMega();
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
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
    <>
      <header className="sticky top-0 z-50 border-b border-[#D8F0EE] bg-[#F8FEFD]/95 shadow-sm shadow-teal-900/5 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-5">
          <a href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/urjasvini-logo.png"
              alt="Urjasvini Child Development Centre logo"
              width={250}
              height={100}
              priority
              className="h-12 w-auto object-contain sm:h-14 lg:h-16"
            />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {mainNavLinks.slice(0, 2).map((link) => (
              <a key={link.name} href={link.href} className={navItemClass}>
                {link.name}
              </a>
            ))}

            {/* Services Button */}
            <div className="relative">
              <button
                type="button"
                onMouseOver={() => setOpenMega((prev) => !prev)}
                className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E] xl:px-4"
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition ${openMega ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            {mainNavLinks.slice(2, 6).map((link) => (
              <a key={link.name} href={link.href} className={navItemClass}>
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href="tel:+917999215093"
              aria-label="Call Urjasvini Child Development Centre"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#BFE6E2] bg-white text-[#0F766E] shadow-sm transition hover:-translate-y-0.5 hover:border-[#168A83] hover:bg-[#E9F8F6]"
            >
              <PhoneCall size={18} />
            </a>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Urjasvini Child Development Centre"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#BFE6E2] bg-white text-[#0F766E] shadow-sm transition hover:-translate-y-0.5 hover:border-[#168A83] hover:bg-[#E9F8F6]"
            >
              <MessageCircle size={18} />
            </a>

            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#0F3D5E] to-[#168A83] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-teal-900/20 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-teal-900/25"
            >
              <CalendarCheck size={18} />
              Book Session
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#BFE6E2] bg-white text-[#0F766E] lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Desktop Mega Menu - fixed to viewport, not inside navbar */}
      {openMega && (
        <div className="fixed inset-0 z-9999 hidden lg:block">
          <button
            type="button"
            aria-label="Close services menu"
            onClick={closeMega}
            className="absolute inset-0 cursor-default bg-transparent"
          />

          <div
            className="
        absolute left-1/2 top-24 bottom-5
        w-[min(980px,calc(100vw-40px))]
        -translate-x-1/2
      "
          >
            <div
              className="
          relative h-full overflow-hidden rounded-[26px]
          border border-[#D8F0EE] bg-white
          shadow-2xl shadow-slate-900/20 ring-1 ring-slate-100
        "
            >
              <button
                type="button"
                onClick={closeMega}
                className="
            absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center
            rounded-full bg-white text-[#0F3D5E] shadow-lg transition
            hover:bg-[#E9F8F6]
          "
                aria-label="Close services menu"
              >
                <X size={17} />
              </button>

              <div className="grid h-full min-h-0 grid-cols-[250px_1fr] overflow-hidden">
                {/* Left Panel */}
                <div
                  className="
              relative h-full min-h-0 overflow-y-auto
              bg-linear-to-br from-[#0F3D5E] via-[#126B73] to-[#2CB1A6]
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
                      Therapy, counselling, assessments and online consultation
                      by Dr. Vini Jhariya.
                    </p>

                    <div className="mt-6 grid gap-3">
                      <a
                        href="/services"
                        onClick={closeMega}
                        className="
                    inline-flex items-center justify-center gap-2 rounded-full
                    bg-white px-5 py-3 text-sm font-black text-[#0F3D5E]
                    transition hover:-translate-y-1
                  "
                      >
                        View All
                        <ArrowRight size={16} />
                      </a>

                      <a
                        href="/contact-us"
                        onClick={closeMega}
                        className="
                    inline-flex items-center justify-center gap-2 rounded-full
                    border border-white/20 bg-white/10 px-5 py-3
                    text-sm font-black text-white transition
                    hover:-translate-y-1 hover:bg-white/15
                  "
                      >
                        Book
                        <CalendarCheck size={16} />
                      </a>
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

                {/* Backend Services - REAL SCROLL AREA */}
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
                    }}
                    onWheel={(e) => e.stopPropagation()}
                  >
                    {servicesLoading ? (
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
                          const categoryServices =
                            groupedServices[category] || [];

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
                                    <a
                                      key={service._id || service.slug}
                                      href={getServiceHref(service)}
                                      onClick={closeMega}
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
                                          {getServiceDescription(service)}
                                        </span>
                                      </span>
                                    </a>
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
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-9999 bg-slate-950/40 backdrop-blur-sm lg:hidden">
          <div className="ml-auto flex h-full w-[90%] max-w-sm flex-col overflow-y-auto bg-[#F8FEFD] shadow-2xl">
            <div className="sticky top-0 z-10 border-b border-[#D8F0EE] bg-[#F8FEFD]/95 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <a href="/" onClick={closeMobileMenu}>
                  <Image
                    src="/images/urjasvini-logo.png"
                    alt="Urjasvini Child Development Centre logo"
                    width={220}
                    height={90}
                    priority
                    className="h-12 w-auto object-contain"
                  />
                </a>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-[#0F766E]"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-5">
              <div className="space-y-2">
                {mainNavLinks.slice(0, 2).map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block rounded-2xl px-4 py-3 text-base font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                  >
                    {link.name}
                  </a>
                ))}

                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                >
                  Services
                  <ChevronDown
                    size={18}
                    className={`transition ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="space-y-4 rounded-3xl border border-[#D8F0EE] bg-white p-3">
                    {servicesLoading ? (
                      <div className="py-6 text-center">
                        <Loader2 className="mx-auto mb-3 animate-spin text-[#0F3D5E]" />
                        <p className="text-sm font-bold text-slate-500">
                          Loading services...
                        </p>
                      </div>
                    ) : activeServices.length === 0 ? (
                      <div className="rounded-2xl bg-[#F7FBFC] p-4 text-center">
                        <HeartHandshake className="mx-auto mb-2 text-[#0F3D5E]" />
                        <p className="text-sm font-black text-[#102A43]">
                          Services are coming soon
                        </p>
                      </div>
                    ) : (
                      availableCategories.map((category) => {
                        const categoryServices =
                          groupedServices[category] || [];

                        return (
                          <div key={category}>
                            <p className="mb-2 px-2 text-xs font-black uppercase tracking-[0.14em] text-[#0F766E]">
                              {categoryConfig[category]?.title || category}
                            </p>

                            <div className="space-y-2">
                              {categoryServices.map((service) => {
                                const ServiceIcon = getServiceIcon(service);

                                return (
                                  <a
                                    key={service._id || service.slug}
                                    href={getServiceHref(service)}
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 rounded-2xl bg-[#F7FBFC] p-3"
                                  >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E9F8F6] text-[#0F766E]">
                                      <ServiceIcon size={18} />
                                    </span>

                                    <span>
                                      <span className="block text-sm font-black text-[#102A43]">
                                        {service.title}
                                      </span>
                                      <span className="line-clamp-1 text-xs font-semibold text-slate-500">
                                        {getServiceDescription(service)}
                                      </span>
                                    </span>
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {mainNavLinks.slice(2).map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block rounded-2xl px-4 py-3 text-base font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <a
                  href="tel:+917999215093"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#BFE6E2] bg-white px-4 py-3 text-sm font-bold text-[#0F766E]"
                >
                  <PhoneCall size={17} />
                  Call
                </a>

                <a
                  href="https://wa.me/917999215093"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#BFE6E2] bg-white px-4 py-3 text-sm font-bold text-[#0F766E]"
                >
                  <MessageCircle size={17} />
                  WhatsApp
                </a>
              </div>

              <a
                href="/contact-us"
                onClick={closeMobileMenu}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0F3D5E] to-[#168A83] px-5 py-4 text-sm font-bold text-white shadow-xl shadow-teal-900/20"
              >
                <CalendarCheck size={18} />
                Book Consultation
              </a>

              <p className="mt-5 text-center text-xs font-semibold leading-5 text-slate-500">
                100-A, Baikunth Dham Colony, Old Palasia, Saket, Indore, Madhya
                Pradesh — 452018
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
