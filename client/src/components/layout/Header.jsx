"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, CalendarCheck, PhoneCall } from "lucide-react";
import MegaMenu from "./MegaMenu";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-dr-vini" },
  { name: "Courses", href: "/courses" },
  { name: "Internship", href: "/psychology-internship-indore" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Free Resources", href: "/free-resources" },
  { name: "Contact", href: "/contact-us" },
];

const navItemClass =
  "rounded-full px-4 py-2 text-sm font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E]";

const Header = () => {
  const [openMega, setOpenMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#D8F0EE] bg-[#F8FEFD]/90 shadow-sm shadow-teal-900/5 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-2 sm:px-5">
          <a href="/" className="flex items-center shrink-0">
            <Image
              src="/images/urjasvini-logo.png"
              alt="Urjasvini Special School & Child Development Center"
              width={260}
              height={110}
              priority
              className="h-14.5 w-auto object-contain sm:h-16 lg:h-18"
            />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.slice(0, 2).map((link) => (
              <a key={link.name} href={link.href} className={navItemClass}>
                {link.name}
              </a>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setOpenMega(true)}
              onMouseLeave={() => setOpenMega(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition ${openMega ? "rotate-180" : ""}`}
                />
              </button>

              {openMega && <MegaMenu />}
            </div>

            {navLinks.slice(2).map((link) => (
              <a key={link.name} href={link.href} className={navItemClass}>
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+917999215093"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#BFE6E2] bg-white text-[#0F766E] shadow-sm transition hover:-translate-y-0.5 hover:border-[#168A83] hover:bg-[#E9F8F6]"
            >
              <PhoneCall size={18} />
            </a>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#0F3D5E] to-[#168A83] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-teal-900/20 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-teal-900/25"
            >
              <CalendarCheck size={18} />
              Book Session
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#BFE6E2] bg-white text-[#0F766E] lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-100 bg-slate-950/40 backdrop-blur-sm lg:hidden">
          <div className="ml-auto h-full w-[86%] max-w-sm overflow-y-auto bg-[#F8FEFD] p-6 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <Image
                src="/images/urjasvini-logo.png"
                alt="Urjasvini Special School & Child Development Center"
                width={220}
                height={95}
                priority
                className="h-15 w-auto object-contain"
              />

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#E9F8F6] text-[#0F766E]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                >
                  {link.name}
                </a>
              ))}

              <a
                href="/services"
                onClick={() => setMobileOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
              >
                Services
              </a>
            </div>

            <a
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0F3D5E] to-[#168A83] px-5 py-4 text-sm font-bold text-white shadow-xl shadow-teal-900/20"
            >
              <CalendarCheck size={18} />
              Book Consultation
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
