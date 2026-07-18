"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  Award,
  ChevronDown,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

const footerGroups = [
  {
    id: "explore",
    title: "Explore",
    links: [
      {
        name: "Home",
        href: "/",
      },
      {
        name: "About Dr. Vini",
        href: "/about-dr-vini",
      },
      {
        name: "Success Stories",
        href: "/success-stories",
      },
      {
        name: "Gallery",
        href: "/gallery",
      },
      {
        name: "Parent Resources",
        href: "/free-resources",
      },
      {
        name: "Blog",
        href: "/blog",
      },
      {
        name: "Contact",
        href: "/contact-us",
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    links: [
      {
        name: "Autism Therapy",
        href: "/services/autism-therapy-indore",
      },
      {
        name: "ADHD Assessment & Therapy",
        href: "/services/adhd-assessment-therapy-indore",
      },
      {
        name: "Dyslexia Support",
        href: "/services/dyslexia-specialist-indore",
      },
      {
        name: "Psychological Assessments",
        href: "/services/psychological-assessments-indore",
      },
      {
        name: "Child Counselling",
        href: "/services/child-counselling-indore",
      },
      {
        name: "Adolescent Counselling",
        href: "/services/adolescent-counselling-indore",
      },
      {
        name: "Early Intervention",
        href: "/services/early-intervention",
      },
    ],
  },
  {
    id: "programs",
    title: "Programs",
    links: [
      {
        name: "Online Consultation",
        href: "/online-consultation",
      },
      {
        name: "Psychology Internship",
        href: "/psychology-internship-indore",
      },
      {
        name: "Workshops & Courses",
        href: "/workshops-and-courses",
      },
      {
        name: "Free Resources",
        href: "/free-resources",
      },
      {
        name: "Book Consultation",
        href: "/contact-us",
      },
    ],
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "RCI Registered",
    description: "Clinical & Child Psychologist",
  },
  {
    icon: Award,
    title: "Trusted Since 2013",
    description: "Over a decade of professional care",
  },
  {
    icon: Star,
    title: "4.9 Google Rating",
    description: "Trusted by children and families",
  },
];

const contactItems = [
  {
    icon: Phone,
    label: "Call the clinic",
    value: "+91 79992 15093",
    href: "tel:+917999215093",
  },
  {
    icon: Mail,
    label: "Email Dr. Vini",
    value: "dr.vinijhariya@gmail.com",
    href: "mailto:dr.vinijhariya@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Start a conversation",
    href: "https://wa.me/917999215093",
    external: true,
  },
];

function FooterLink({ link }) {
  const isExternal =
    link.href.startsWith("http") ||
    link.href.startsWith("tel:") ||
    link.href.startsWith("mailto:");

  const className =
    "group inline-flex items-center gap-2 py-1.5 text-sm font-semibold text-white/58 transition duration-300 hover:translate-x-1 hover:text-white";

  if (isExternal) {
    return (
      <a
        href={link.href}
        target={link.href.startsWith("http") ? "_blank" : undefined}
        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={className}
      >
        <ArrowRight
          size={13}
          className="shrink-0 text-[#7DE0D6] opacity-55 transition group-hover:opacity-100"
        />

        {link.name}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      <ArrowRight
        size={13}
        className="shrink-0 text-[#7DE0D6] opacity-55 transition group-hover:opacity-100"
      />

      {link.name}
    </Link>
  );
}

export default function Footer() {
  const [openGroups, setOpenGroups] = useState(["explore"]);

  const toggleGroup = (groupId) => {
    setOpenGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId],
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#071F33] text-white">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#2CB1A6]/14 blur-3xl" />

        <div className="absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full bg-[#F4B183]/9 blur-3xl" />

        <HeartHandshake
          size={420}
          strokeWidth={0.45}
          className="absolute -bottom-24 -right-16 text-white/[0.025]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        {/* Main footer */}
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1.25fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <p className="text-2xl font-black tracking-[-0.02em] sm:text-3xl">
                Dr. Vini Jhariya
              </p>

              <p className="mt-2 text-sm font-semibold text-[#7DE0D6]">
                Clinical & Child Psychologist
              </p>
            </Link>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/62 sm:text-base">
              Urjasvini Child Development Centre supports children, adolescents
              and families through psychological assessment, counselling,
              developmental intervention and parent guidance.
            </p>

            {/* Contact details */}
            <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#7DE0D6]/25 hover:bg-white/[0.08]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#7DE0D6] transition group-hover:bg-white group-hover:text-[#168F87]">
                      <Icon size={18} />
                    </div>

                    <p className="mt-4 text-xs font-bold text-white/45">
                      {item.label}
                    </p>

                    <p className="mt-1 break-words text-sm font-black text-white/85">
                      {item.value}
                    </p>
                  </a>
                );
              })}
            </div>

            {/* Address */}
            <div className="mt-4 flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#F4B183]">
                <MapPin size={19} />
              </div>

              <div>
                <p className="text-xs font-bold text-white/45">
                  Clinic address
                </p>

                <address className="mt-1 not-italic text-sm font-semibold leading-6 text-white/70">
                  100-A, Baikunth Dham Colony, Old Palasia, Saket, Indore,
                  Madhya Pradesh — 452018
                </address>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid gap-3 md:grid-cols-3 md:gap-8">
            {footerGroups.map((group) => {
              const isOpen = openGroups.includes(group.id);

              return (
                <div
                  key={group.id}
                  className="border-b border-white/10 pb-3 md:border-b-0 md:pb-0"
                >
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-2 text-left md:pointer-events-none"
                  >
                    <span className="text-base font-black text-white">
                      {group.title}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`text-[#7DE0D6] transition duration-300 md:hidden ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 md:max-h-none md:opacity-100 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col pb-3 pt-2 md:pb-0 md:pt-4">
                      {group.links.map((link) => (
                        <FooterLink
                          key={`${group.id}-${link.name}`}
                          link={link}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-12 grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] sm:grid-cols-3">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center gap-4 p-5 sm:p-6 ${
                  index !== trustItems.length - 1
                    ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#7DE0D6]">
                  <Icon
                    size={22}
                    className={
                      item.title.includes("4.9")
                        ? "fill-[#F4B183] text-[#F4B183]"
                        : ""
                    }
                  />
                </div>

                <div>
                  <p className="text-sm font-black text-white">{item.title}</p>

                  <p className="mt-1 text-xs font-semibold leading-5 text-white/48">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clinic identity */}
        <div className="mt-8 flex flex-col gap-5 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-black text-white">
              Urjasvini Child Development Centre
            </p>

            <p className="mt-1 text-sm font-semibold text-white/48">
              Child psychology, counselling, assessment and developmental
              support in Indore.
            </p>
          </div>

          <p className="max-w-xl text-sm font-semibold leading-7 text-white/58 md:text-right">
            बच्चों के व्यवहार, पढ़ाई, भावनाओं और विकास से जुड़ी सहायता के लिए
            डॉ. विनी झारिया से संपर्क करें।
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center text-xs font-semibold leading-6 text-white/40 sm:text-left">
            <p>
              © {new Date().getFullYear()} Dr. Vini Jhariya. All rights
              reserved.
            </p>

            <p className="mt-1">
              Designed and developed by{" "}
              <a
                href="https://maytech-solutions.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-[#7DE0D6] transition hover:text-white"
              >
                Maytech Solution
              </a>
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <a
              href="https://wa.me/917999215093?text=Hello%20Dr.%20Vini%2C%20I%20would%20like%20guidance%20for%20my%20child."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-xs font-black text-white transition hover:-translate-y-1 hover:bg-[#20BD5A]"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to the top"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#0F3D5E]"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
