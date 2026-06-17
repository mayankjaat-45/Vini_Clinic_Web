"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Loader2, Menu, X } from "lucide-react";
import { API } from "@/lib/api";

const mainNavLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-dr-vini" },
  { name: "Courses", href: "/courses" },
  { name: "Internship", href: "/internship" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Free Resources", href: "/free-resources" },
  { name: "Contact", href: "/contact-us" },
];

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
      if (event.key === "Escape") {
        closeMega();
        closeMobileMenu();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const activeServices = useMemo(() => {
    return services.filter((service) => service?.isActive !== false);
  }, [services]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#D8F0EE] bg-white/95 shadow-sm shadow-teal-900/5 backdrop-blur-2xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo / Brand */}
          <a
            href="/"
            className="group flex min-w-0 shrink-0 items-center gap-3 rounded-2xl transition"
          >
            {/* If you have image logo, replace this V box with img */}
            {/* <img src="/logo.png" alt="Dr. Vini Jhariya" className="h-12 w-auto" /> */}

            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#0F3D5E] via-[#168A83] to-[#54C6B8] text-xl font-black text-white shadow-lg shadow-teal-900/20 transition group-hover:-rotate-3 group-hover:scale-105">
              V
            </span>

            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[19px] font-black tracking-tight text-[#0F3D5E] transition group-hover:text-[#0F766E] sm:text-[21px]">
                Dr. Vini Jhariya
              </span>

              <span className="mt-1 truncate text-[9px] font-black uppercase tracking-[0.16em] text-[#168A83] sm:text-[10px]">
                Clinical & Child Psychologist
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center justify-end gap-1 xl:flex">
            <a href="/" className="nav-link">
              Home
            </a>

            <a href="/about-dr-vini" className="nav-link">
              About
            </a>

            <div
              className="relative"
              onMouseEnter={() => setOpenMega(true)}
              onMouseLeave={closeMega}
            >
              <button
                type="button"
                onClick={() => setOpenMega((prev) => !prev)}
                className="nav-link inline-flex items-center gap-1"
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition ${openMega ? "rotate-180" : ""}`}
                />
              </button>

              {openMega && (
                <div className="absolute left-1/2 top-full z-50 mt-4 w-[760px] -translate-x-1/2 rounded-[28px] border border-[#D8F0EE] bg-white p-7 shadow-2xl shadow-slate-900/15">
                  <button
                    type="button"
                    onClick={closeMega}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#F8FEFD] text-slate-600 transition hover:bg-[#E9F8F6]"
                    aria-label="Close services menu"
                  >
                    <X size={16} />
                  </button>

                  {servicesLoading ? (
                    <div className="flex min-h-40 items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="mx-auto mb-3 animate-spin text-[#0F766E]" />
                        <p className="text-sm font-bold text-slate-500">
                          Loading services...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-10 pr-8">
                      {menuGroups.map((group) => (
                        <div key={group.title}>
                          <h3 className="mb-4 text-[12px] font-black uppercase tracking-[0.22em] text-[#0F766E]">
                            {group.title}
                          </h3>

                          <div className="space-y-2">
                            {group.services.map((item) => (
                              <a
                                key={item.label}
                                href={getServiceHref(item, activeServices)}
                                onClick={closeMega}
                                className="block rounded-xl px-3 py-2 text-[15px] font-bold text-[#213D56] transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
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
            </div>

            <a href="/courses" className="nav-link">
              Courses
            </a>

            <a href="/internship" className="nav-link">
              Internship
            </a>

            <a href="/gallery" className="nav-link">
              Gallery
            </a>

            <a href="/blog" className="nav-link">
              Blog
            </a>

            <a href="/free-resources" className="nav-link">
              Free Resources
            </a>

            <a href="/contact-us" className="nav-link">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#BFE6E2] bg-white text-[#0F766E] shadow-sm xl:hidden"
          >
            <Menu size={23} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-9999 bg-slate-950/45 backdrop-blur-sm xl:hidden">
          <button
            type="button"
            aria-label="Close mobile menu overlay"
            onClick={closeMobileMenu}
            className="absolute inset-0 cursor-default"
          />

          <div className="relative ml-auto flex h-full w-[88%] max-w-sm flex-col overflow-hidden bg-white shadow-2xl">
            <div className="shrink-0 border-b border-[#D8F0EE] px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <a
                  href="/"
                  onClick={closeMobileMenu}
                  className="flex min-w-0 flex-1 items-center gap-3"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#0F3D5E] via-[#168A83] to-[#54C6B8] text-lg font-black text-white shadow-md shadow-teal-900/20">
                    V
                  </span>

                  <span className="flex min-w-0 flex-col leading-tight">
                    <span className="truncate text-[16px] font-black tracking-tight text-[#0F3D5E]">
                      Dr. Vini Jhariya
                    </span>

                    <span className="mt-1 truncate text-[9px] font-black uppercase tracking-[0.12em] text-[#168A83]">
                      Clinical & Child Psychologist
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

            <div className="flex-1 overflow-y-auto px-3 py-5">
              <div className="space-y-1">
                <a
                  href="/"
                  onClick={closeMobileMenu}
                  className="mobile-nav-link"
                >
                  Home
                </a>

                <a
                  href="/about-dr-vini"
                  onClick={closeMobileMenu}
                  className="mobile-nav-link"
                >
                  About
                </a>

                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                >
                  <span>Services</span>

                  <ChevronDown
                    size={18}
                    className={`shrink-0 transition ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="my-2 max-h-[45vh] overflow-y-auto rounded-3xl border border-[#D8F0EE] bg-[#F8FEFD] p-4">
                    {servicesLoading ? (
                      <div className="py-6 text-center">
                        <Loader2 className="mx-auto mb-3 animate-spin text-[#0F766E]" />
                        <p className="text-sm font-bold text-slate-500">
                          Loading services...
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {menuGroups.map((group) => (
                          <div key={group.title}>
                            <p className="mb-3 px-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#0F766E]">
                              {group.title}
                            </p>

                            <div className="space-y-1">
                              {group.services.map((item) => (
                                <a
                                  key={item.label}
                                  href={getServiceHref(item, activeServices)}
                                  onClick={closeMobileMenu}
                                  className="block rounded-2xl px-3 py-2.5 text-sm font-bold leading-5 text-[#24415A] transition hover:bg-white hover:text-[#0F766E]"
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
                    className="mobile-nav-link"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-link {
          display: inline-flex;
          height: 42px;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          border-radius: 9999px;
          padding: 0 10px;
          font-size: 13.5px;
          font-weight: 800;
          color: #213d56;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          background: #e9f8f6;
          color: #0f766e;
        }

        .mobile-nav-link {
          display: block;
          border-radius: 16px;
          padding: 12px 16px;
          font-size: 16px;
          font-weight: 700;
          color: #24415a;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover {
          background: #e9f8f6;
          color: #0f766e;
        }

        @media (min-width: 1536px) {
          .nav-link {
            padding: 0 14px;
            font-size: 14.5px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
