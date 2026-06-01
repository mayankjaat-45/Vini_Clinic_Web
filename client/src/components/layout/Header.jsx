"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  CalendarCheck,
  PhoneCall,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

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

const serviceLinks = [
  { name: "Autism Therapy", href: "/services/autism-therapy-indore" },
  {
    name: "ADHD Assessment & Therapy",
    href: "/services/adhd-assessment-therapy-indore",
  },
  { name: "Dyslexia Support", href: "/services/dyslexia-therapy-indore" },
  {
    name: "Psychological Assessments",
    href: "/services/psychological-assessments-indore",
  },
  { name: "Child Counselling", href: "/services/child-counselling-indore" },
  {
    name: "Adolescent Counselling",
    href: "/services/adolescent-counselling-indore",
  },
  { name: "Early Intervention", href: "/services/early-intervention-indore" },
  { name: "Adult Counselling", href: "/services/adult-counselling-indore" },
  { name: "Couple Counselling", href: "/services/couple-counselling-indore" },
  { name: "Family Therapy", href: "/services/family-therapy-indore" },
  { name: "Online Consultation", href: "/online-consultation" },
  { name: "Psychology Internship", href: "/psychology-internship-indore" },
  { name: "Workshops & Courses", href: "/workshops-and-courses" },
  { name: "Success Stories", href: "/success-stories" },
];

const navItemClass =
  "rounded-full px-3 py-2 text-sm font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E] xl:px-4";

const Header = () => {
  const [openMega, setOpenMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#D8F0EE] bg-[#F8FEFD]/92 shadow-sm shadow-teal-900/5 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-5">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNavLinks.slice(0, 2).map((link) => (
              <a key={link.name} href={link.href} className={navItemClass}>
                {link.name}
              </a>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMega(true)}
              onMouseLeave={() => setOpenMega(false)}
            >
              <button
                type="button"
                onClick={() => setOpenMega((prev) => !prev)}
                className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E] xl:px-4"
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition ${openMega ? "rotate-180" : ""}`}
                />
              </button>

              {openMega && (
                <div className="absolute left-1/2 top-full z-50 mt-3 w-190 -translate-x-1/2 rounded-[28px] border border-[#D8F0EE] bg-white p-4 shadow-2xl shadow-slate-900/12">
                  <div className="grid grid-cols-2 gap-2">
                    {serviceLinks.map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className="group rounded-2xl border border-transparent px-4 py-3 transition hover:border-[#D8F0EE] hover:bg-[#F7FBFC]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-black text-[#0F3D5E] group-hover:text-[#0F766E]">
                              {service.name}
                            </p>
                            <p className="mt-1 text-xs font-medium text-slate-500">
                              View service details
                            </p>
                          </div>

                          <ArrowRight
                            size={16}
                            className="shrink-0 text-[#2CB1A6] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {mainNavLinks.slice(2, 6).map((link) => (
              <a key={link.name} href={link.href} className={navItemClass}>
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
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

          {/* Mobile Menu Button */}
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

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-100 bg-slate-950/40 backdrop-blur-sm lg:hidden">
          <div className="ml-auto flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-[#F8FEFD] shadow-2xl">
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

                {/* Mobile Services Accordion */}
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
                  <div className="space-y-1 rounded-3xl border border-[#D8F0EE] bg-white p-2">
                    {serviceLinks.map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        onClick={closeMobileMenu}
                        className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                      >
                        {service.name}
                      </a>
                    ))}
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
