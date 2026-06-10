"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  ChevronDown,
  Loader2,
  Menu,
  MessageCircle,
  PhoneCall,
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

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#D8F0EE] bg-[#F8FEFD]/95 shadow-sm shadow-teal-900/5 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-5">
          <a
            href="/"
            className="group flex shrink-0 items-center gap-3 rounded-2xl px-2 py-1.5 transition hover:bg-[#E9F8F6]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#0F3D5E] via-[#168A83] to-[#54C6B8] text-lg font-black text-white shadow-lg shadow-teal-900/20 transition group-hover:-rotate-3 group-hover:scale-105">
              V
            </span>

            <span className="flex flex-col leading-tight">
              <span className="text-[17px] font-black tracking-tight text-[#0F3D5E] transition group-hover:text-[#0F766E] sm:text-xl">
                Dr. Vini Jhariya
              </span>

              <span className="mt-0.5 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#168A83] sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#54C6B8]" />
                Clinic and Child Psychologist
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNavLinks.slice(0, 2).map((link) => (
              <a key={link.name} href={link.href} className={navItemClass}>
                {link.name}
              </a>
            ))}

            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setOpenMega(true)}
                onClick={() => setOpenMega((prev) => !prev)}
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
              aria-label="Call Dr. Vini Jhariya"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#BFE6E2] bg-white text-[#0F766E] shadow-sm transition hover:-translate-y-0.5 hover:border-[#168A83] hover:bg-[#E9F8F6]"
            >
              <PhoneCall size={18} />
            </a>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Dr. Vini Jhariya"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#BFE6E2] bg-white text-[#0F766E] shadow-sm transition hover:-translate-y-0.5 hover:border-[#168A83] hover:bg-[#E9F8F6]"
            >
              <MessageCircle size={18} />
            </a>

            <a
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#0F3D5E] to-[#168A83] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-teal-900/20 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-teal-900/25"
            >
              <CalendarCheck size={18} />
              Book Consultation
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

      {openMega && (
        <div className="fixed inset-0 z-9999 hidden lg:block">
          <button
            type="button"
            aria-label="Close services menu"
            onClick={closeMega}
            className="absolute inset-0 cursor-default bg-transparent"
          />

          <div className="absolute left-1/2 top-24 w-[min(920px,calc(100vw-40px))] -translate-x-1/2">
            <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-100">
              <button
                type="button"
                onClick={closeMega}
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-50"
                aria-label="Close services menu"
              >
                <X size={17} />
              </button>

              <div className="max-h-[calc(100vh-140px)] overflow-y-auto p-8 pr-12 [scrollbar-color:#0F766E_#E9F8F6] [scrollbar-width:thin]">
                {servicesLoading ? (
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
                            <a
                              key={item.label}
                              href={getServiceHref(item, activeServices)}
                              onClick={closeMega}
                              className="block text-[21px] font-semibold leading-tight tracking-[0.08em] text-slate-800 transition hover:translate-x-1 hover:text-[#0F766E]"
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="fixed inset-0 z-9999 bg-slate-950/40 backdrop-blur-sm lg:hidden">
          <div className="ml-auto flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-[#F8FEFD] shadow-2xl">
            <div className="sticky top-0 z-10 border-b border-[#D8F0EE] bg-[#F8FEFD]/95 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <a
                  href="/"
                  onClick={closeMobileMenu}
                  className="group flex shrink-0 items-center gap-2.5 rounded-2xl px-1.5 py-1 transition hover:bg-[#E9F8F6]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#0F3D5E] via-[#168A83] to-[#54C6B8] text-base font-black text-white shadow-md shadow-teal-900/20 transition group-hover:-rotate-3 group-hover:scale-105">
                    V
                  </span>

                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate text-[16px] font-black tracking-tight text-[#0F3D5E] transition group-hover:text-[#0F766E]">
                      Dr. Vini Jhariya
                    </span>

                    <span className="mt-0.5 flex items-center gap-1.5 text-[5px] font-black uppercase tracking-[0.18em] text-[#168A83]">
                      {/* <span className="h-1 w-1 rounded-full bg-[#54C6B8]" /> */}
                      Clinic and Child Psychologist
                    </span>
                  </span>
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
                  <div className="rounded-3xl border border-[#D8F0EE] bg-white p-4">
                    {servicesLoading ? (
                      <div className="py-6 text-center">
                        <Loader2 className="mx-auto mb-3 animate-spin text-[#0F3D5E]" />
                        <p className="text-sm font-bold text-slate-500">
                          Loading services...
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {menuGroups.map((group) => (
                          <div key={group.title}>
                            <p className="mb-3 px-1 text-xs font-black uppercase tracking-[0.18em] text-[#0F766E]">
                              {group.title}
                            </p>

                            <div className="space-y-1">
                              {group.services.map((item) => (
                                <a
                                  key={item.label}
                                  href={getServiceHref(item, activeServices)}
                                  onClick={closeMobileMenu}
                                  className="block rounded-2xl px-3 py-2.5 text-sm font-bold text-[#24415A] transition hover:bg-[#F7FBFC] hover:text-[#0F766E]"
                                >
                                  {item.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
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
