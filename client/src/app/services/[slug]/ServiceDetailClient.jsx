"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  HeartHandshake,
  HelpCircle,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const getTextLines = (text = "") => {
  return String(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

const truncateText = (text = "", limit = 180) => {
  const cleanText = getTextLines(text).join(" ");
  if (cleanText.length <= limit) return cleanText;
  return `${cleanText.slice(0, limit).trim()}...`;
};

const getButtonHref = (buttonLink) => {
  if (!buttonLink) return "/contact-us";
  return buttonLink === "/contact" ? "/contact-us" : buttonLink;
};

const isExternalLink = (link = "") => {
  return link.startsWith("http") || link.startsWith("https://wa.me");
};

const isImportantNote = (item = {}) => {
  const title = String(item.title || "")
    .toLowerCase()
    .trim();
  return title.includes("important note") || title.startsWith("important:");
};

const normalizeItem = (item) => {
  if (typeof item === "string") {
    return {
      title: item,
      description: "",
    };
  }

  return {
    title:
      item?.title || item?.subtitle || item?.description || "Support point",
    description:
      item?.description ||
      item?.content ||
      (Array.isArray(item?.items) ? item.items.slice(0, 2).join(" • ") : ""),
  };
};

const getCompactHighlights = (sections = [], fallbackPoints = []) => {
  const highlightTypes = ["cards", "tools", "badges", "two-column", "text"];

  const sectionItems = sections
    .filter((section) => highlightTypes.includes(section?.type || "text"))
    .flatMap((section) => {
      const items = Array.isArray(section?.items) ? section.items : [];
      const contentItem = section?.content
        ? [
            {
              title: section.title,
              description: section.content,
            },
          ]
        : [];

      return [...contentItem, ...items];
    })
    .filter((item) => !isImportantNote(item))
    .map(normalizeItem)
    .filter((item) => item.title);

  const fallbackItems = fallbackPoints.map(normalizeItem);

  const allItems = [...sectionItems, ...fallbackItems];

  if (allItems.length > 0) return allItems.slice(0, 6);

  return [
    {
      title: "Understand the concern clearly",
      description:
        "A calm first conversation to understand symptoms, behaviour, emotions and family concerns.",
    },
    {
      title: "Personalised guidance plan",
      description:
        "Support is planned according to the child, adult, couple or family need.",
    },
    {
      title: "Follow-up support",
      description:
        "Clear next steps after consultation so families know what to do next.",
    },
  ];
};

const getCompactSteps = (sections = [], fallbackProcess = []) => {
  const stepSection = sections.find((section) => section?.type === "steps");
  const sectionSteps = Array.isArray(stepSection?.items)
    ? stepSection.items
    : [];

  const steps = sectionSteps.length > 0 ? sectionSteps : fallbackProcess;

  if (steps.length > 0) {
    return steps.slice(0, 4).map((step, index) => {
      if (typeof step === "string") {
        return {
          title: `Step ${index + 1}`,
          description: step,
        };
      }

      return {
        title: step?.title || `Step ${index + 1}`,
        description:
          step?.description ||
          step?.content ||
          (Array.isArray(step?.items)
            ? step.items.slice(0, 2).join(" • ")
            : ""),
      };
    });
  }

  return [
    {
      title: "Book consultation",
      description: "Share your concern through the contact form or WhatsApp.",
    },
    {
      title: "Understand the concern",
      description:
        "The issue is discussed carefully before suggesting the right support.",
    },
    {
      title: "Plan the next step",
      description:
        "You receive practical guidance, therapy direction or assessment advice.",
    },
  ];
};

const getImportantNote = (sections = []) => {
  const importantItem = sections
    .flatMap((section) => (Array.isArray(section?.items) ? section.items : []))
    .find((item) => isImportantNote(item));

  if (!importantItem) return "";

  return (
    importantItem.description ||
    importantItem.content ||
    importantItem.subtitle ||
    "Please read this important note carefully."
  );
};

function SmartButton({ href, children, variant = "primary" }) {
  const classes =
    variant === "secondary"
      ? "inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:-translate-y-1 hover:border-[#2CB1A6] hover:bg-[#E9F8F6] hover:text-[#0F766E]"
      : "inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:bg-[#102A43]";

  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export default function ServiceDetailClient({ service }) {
  if (!service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FBFC] px-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-xl rounded-4xl bg-white p-8 text-center shadow-xl sm:p-10 md:rounded-[3rem]"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-500">
            <AlertTriangle size={32} />
          </div>

          <h1 className="text-3xl font-black text-[#102A43]">
            Service not found
          </h1>

          <p className="mt-3 font-semibold leading-7 text-slate-600">
            This service may have been removed or hidden.
          </p>

          <Link
            href="/services"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>
        </motion.div>
      </main>
    );
  }

  const hero = service.hero || {};

  const sections = Array.isArray(service.sections)
    ? [...service.sections].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];

  const faqs = Array.isArray(service.faqs) ? service.faqs.slice(0, 5) : [];
  const fallbackPoints = Array.isArray(service.points) ? service.points : [];
  const fallbackProcess = Array.isArray(service.process) ? service.process : [];

  const heroTitle = hero.headline || service.title;
  const heroSubtitle = hero.subHeadline || service.shortDescription;
  const heroParagraph = hero.paragraph || service.description;

  const highlights = getCompactHighlights(sections, fallbackPoints);
  const steps = getCompactSteps(sections, fallbackProcess);
  const importantNote = getImportantNote(sections);

  const whatsappMessage = encodeURIComponent(
    `Hello, I want to know more about ${service.title}`,
  );

  const primaryHeroButton = hero.buttons?.[0];
  const secondaryHeroButton = hero.buttons?.[1];

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-4 pb-10 pt-16 sm:px-5 md:pb-14 md:pt-20">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <Link
              href="/services"
              className="mb-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:text-[#2CB1A6]"
            >
              <ArrowLeft size={16} />
              Back to Services
            </Link>
          </motion.div>

          <div className="grid gap-7 lg:grid-cols-[1fr_390px] lg:items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm"
              >
                <Sparkles size={16} className="text-[#2CB1A6]" />
                {service.category || "Therapy & Counselling Service"}
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="max-w-4xl whitespace-pre-line text-3xl font-black leading-tight text-[#102A43] sm:text-5xl md:text-6xl"
              >
                {heroTitle}
              </motion.h1>

              {heroSubtitle && (
                <motion.p
                  variants={fadeUp}
                  className="mt-5 max-w-3xl text-base font-black leading-7 text-[#0F3D5E] sm:text-xl sm:leading-8"
                >
                  {heroSubtitle}
                </motion.p>
              )}

              {heroParagraph && (
                <motion.p
                  variants={fadeUp}
                  className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8"
                >
                  {truncateText(heroParagraph, 260)}
                </motion.p>
              )}

              <motion.div
                variants={fadeUp}
                className="mt-6 flex flex-wrap gap-3"
              >
                {[
                  "Clear guidance",
                  "Personalised plan",
                  "Online + Indore support",
                ].map((point) => (
                  <span
                    key={point}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm"
                  >
                    <CheckCircle2 size={16} className="text-[#2CB1A6]" />
                    {point}
                  </span>
                ))}
              </motion.div>

              {hero.trustLine && (
                <motion.p
                  variants={fadeUp}
                  className="mt-5 max-w-3xl rounded-2xl border border-[#2CB1A6]/15 bg-white px-5 py-4 text-sm font-black leading-6 text-[#0F3D5E] shadow-sm"
                >
                  {hero.trustLine}
                </motion.p>
              )}

              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                <SmartButton href={getButtonHref(primaryHeroButton?.link)}>
                  {primaryHeroButton?.text || "Book Consultation"}
                  <ArrowRight size={18} />
                </SmartButton>

                <SmartButton
                  href={
                    secondaryHeroButton?.link ||
                    `https://wa.me/917999215093?text=${whatsappMessage}`
                  }
                  variant="secondary"
                >
                  <MessageCircle size={18} />
                  {secondaryHeroButton?.text || "WhatsApp Us"}
                </SmartButton>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" animate="show">
              <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-6 text-white shadow-2xl shadow-blue-950/20 md:rounded-[3rem] md:p-7">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-[#F4B183]/20 blur-3xl" />

                <div className="relative">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/15 text-[#F4B183]">
                    <HeartHandshake size={30} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
                    Quick support path
                  </p>

                  <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                    Less reading. More clarity.
                  </h2>

                  <div className="mt-6 space-y-3">
                    {[
                      {
                        icon: CalendarCheck,
                        title: "Book a consultation",
                      },
                      {
                        icon: Route,
                        title: "Get the right next step",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Safe, confidential support",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3"
                        >
                          <Icon size={18} className="text-[#F4B183]" />
                          <span className="text-sm font-black">
                            {item.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-3xl bg-white/10 p-4">
                    <p className="text-sm font-black text-[#F4B183]">
                      Available in Indore & Online
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
                      Suitable for children, adults, couples and families based
                      on the concern.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-5 md:py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Quick overview"
            title="What you get in this service"
            subtitle="Only the most useful points are shown here so visitors can decide quickly."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                variants={fadeUp}
                className="group rounded-3xl border border-white bg-white p-5 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E] transition group-hover:bg-[#0F3D5E] group-hover:text-white">
                  <CheckCircle2 size={22} />
                </div>

                <h3 className="text-lg font-black leading-snug text-[#102A43]">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {truncateText(item.description, 135)}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {importantNote && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-5 rounded-3xl border border-[#F4B183]/30 bg-[#FFF8ED] p-4 shadow-sm sm:flex sm:items-start sm:gap-3"
            >
              <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#F4B183]/20 text-[#B7791F] sm:mb-0">
                <AlertTriangle size={18} strokeWidth={2.6} />
              </div>

              <p className="text-sm font-bold leading-7 text-[#102A43]">
                <span className="font-black text-[#B7791F]">
                  Important Note:{" "}
                </span>
                {truncateText(importantNote, 230)}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="bg-white/55 px-4 py-10 sm:px-5 md:py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Simple process"
            title="How it works"
            subtitle="A short, clear flow from first contact to the right support plan."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={`${step.title}-${index}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.18 }}
                className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-900/5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F3D5E] text-sm font-black text-white">
                  {index + 1}
                </div>

                <h3 className="text-lg font-black text-[#102A43]">
                  {step.title}
                </h3>

                {step.description && (
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {truncateText(step.description, 125)}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {faqs.length > 0 && <FaqSection faqs={faqs} />}

      <BottomCTA service={service} />
    </main>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto max-w-3xl text-center"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm">
        <Sparkles size={15} className="text-[#2CB1A6]" />
        {eyebrow}
      </div>

      <h2 className="text-2xl font-black leading-tight text-[#102A43] sm:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function FaqSection({ faqs }) {
  return (
    <section className="px-4 py-10 sm:px-5 md:py-14">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Questions" title="Common questions" />

        <div className="mt-8 space-y-3">
          {faqs.map((faq, index) => (
            <motion.details
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="group rounded-3xl bg-white p-5 shadow-sm open:shadow-lg open:shadow-slate-900/5"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <span className="flex gap-3">
                  <HelpCircle
                    size={21}
                    className="mt-0.5 shrink-0 text-[#2CB1A6]"
                  />
                  <span className="text-base font-black leading-6 text-[#102A43]">
                    {faq.question}
                  </span>
                </span>

                <ChevronDown
                  size={20}
                  className="shrink-0 text-[#0F3D5E] transition group-open:rotate-180"
                />
              </summary>

              <p className="mt-4 pl-9 text-sm font-semibold leading-7 text-slate-600">
                {faq.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCTA({ service }) {
  const whatsappMessage = encodeURIComponent(
    `Hello, I want to book consultation for ${service.title}`,
  );

  return (
    <section className="px-4 pb-14 pt-6 sm:px-5 md:pb-18">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-4xl bg-linear-to-br from-[#102A43] to-[#168A83] p-7 text-center text-white shadow-2xl shadow-slate-900/20 sm:p-9 md:rounded-[3rem]"
      >
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#F4B183]/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/15 text-[#F4B183]">
            <CalendarCheck size={28} />
          </div>

          <h2 className="text-2xl font-black leading-tight sm:text-4xl">
            Not sure if this is the right service?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/75 sm:text-base">
            Share what you are noticing. We will help you choose the right next
            step.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#102A43] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
            >
              Book Consultation
              <ArrowRight size={18} />
            </Link>

            <a
              href={`https://wa.me/917999215093?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
