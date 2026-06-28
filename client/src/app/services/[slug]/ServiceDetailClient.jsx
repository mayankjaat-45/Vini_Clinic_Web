"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Brain,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  HelpCircle,
  HeartHandshake,
  MessageCircle,
  Quote,
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

const getItemTitle = (item, fallback = "Support point") => {
  if (typeof item === "string") return item;

  return (
    item?.title ||
    item?.subtitle ||
    item?.description ||
    item?.content ||
    fallback
  );
};

const getItemDescription = (item) => {
  if (typeof item === "string") return "";

  return item?.description || item?.content || "";
};

const getPointText = (point) => {
  if (typeof point === "string") return point;

  return (
    point?.title ||
    point?.description ||
    point?.content ||
    point?.subtitle ||
    ""
  );
};

const getSectionLabel = (type = "text") => {
  const labels = {
    text: "Detailed Guide",
    cards: "Key Points",
    steps: "Process",
    tools: "Tools & Support",
    badges: "Highlights",
    story: "Story",
    quote: "Expert Note",
    cta: "Action",
    "two-column": "Comparison",
    faq: "Questions",
  };

  return labels[type] || "Details";
};

const getSectionIcon = (type = "text") => {
  const icons = {
    text: ClipboardCheck,
    cards: CheckCircle2,
    steps: Route,
    tools: Brain,
    badges: ShieldCheck,
    story: Quote,
    quote: Quote,
    cta: CalendarCheck,
    "two-column": ClipboardCheck,
    faq: HelpCircle,
  };

  return icons[type] || ClipboardCheck;
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

function ReadMoreText({ text, limit = 220, className = "" }) {
  const [open, setOpen] = useState(false);

  const lines = getTextLines(text);
  if (lines.length === 0) return null;

  const fullText = lines.join("\n");
  const previewText =
    fullText.length > limit
      ? `${fullText.slice(0, limit).trim()}...`
      : fullText;

  const hasMore = fullText.length > limit || lines.length > 2;
  const visibleLines = open || !hasMore ? lines : [previewText];

  return (
    <div className={className}>
      <div className="space-y-3">
        {visibleLines.map((line, index) => (
          <p key={index} className="whitespace-pre-line">
            {line}
          </p>
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black text-[#0F766E] transition hover:bg-[#0F3D5E] hover:text-white"
        >
          {open ? "Show less" : "Read more"}
          <ChevronDown
            size={15}
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
  );
}

function ExpandablePointList({ items = [], limit = 4 }) {
  const [open, setOpen] = useState(false);

  if (!Array.isArray(items) || items.length === 0) return null;

  const visibleItems = open ? items : items.slice(0, limit);
  const remaining = items.length - limit;

  return (
    <div className="mt-4">
      <ul className="space-y-2">
        {visibleItems.map((point, index) => {
          const text = getPointText(point);
          if (!text) return null;

          return (
            <li
              key={index}
              className="flex gap-3 text-sm font-semibold leading-6 text-slate-600"
            >
              <CheckCircle2
                size={16}
                className="mt-1 shrink-0 text-[#2CB1A6]"
              />
              <span>{text}</span>
            </li>
          );
        })}
      </ul>

      {items.length > limit && (
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
        >
          {open ? "Show less points" : `View ${remaining} more points`}
          <ChevronDown
            size={15}
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        </button>
      )}
    </div>
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

  const sortedSections = useMemo(() => {
    return Array.isArray(service.sections)
      ? [...service.sections].sort((a, b) => (a.order || 0) - (b.order || 0))
      : [];
  }, [service.sections]);

  const fallbackPoints = Array.isArray(service.points) ? service.points : [];
  const fallbackProcess = Array.isArray(service.process) ? service.process : [];

  const sections = useMemo(() => {
    if (sortedSections.length > 0) return sortedSections;

    const fallbackSections = [];

    if (fallbackPoints.length > 0) {
      fallbackSections.push({
        type: "cards",
        title: "How this service can help",
        subtitle:
          "Support designed around the real needs of the child, adult, couple or family.",
        items: fallbackPoints.map((point) => ({
          title: point,
        })),
      });
    }

    if (fallbackProcess.length > 0) {
      fallbackSections.push({
        type: "steps",
        title: "Our process",
        subtitle:
          "A clear, supportive and clinically grounded process from the first consultation.",
        items: fallbackProcess.map((step, index) => ({
          title: `Step ${index + 1}`,
          description: step,
        })),
      });
    }

    return fallbackSections;
  }, [sortedSections, fallbackPoints, fallbackProcess]);

  const faqs = Array.isArray(service.faqs) ? service.faqs : [];

  const heroTitle = hero.headline || service.title;
  const heroSubtitle = hero.subHeadline || service.shortDescription;
  const heroParagraph = hero.paragraph || service.description;

  const whatsappMessage = encodeURIComponent(
    `Hello, I want to know more about ${service.title}`,
  );

  const heroButtons =
    Array.isArray(hero.buttons) && hero.buttons.length > 0
      ? hero.buttons
      : [
          {
            text: "Book Consultation",
            link: "/contact-us",
          },
          {
            text: "WhatsApp Us",
            link: `https://wa.me/917999215093?text=${whatsappMessage}`,
          },
        ];

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
                <motion.div
                  variants={fadeUp}
                  className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8"
                >
                  <ReadMoreText text={heroParagraph} limit={280} />
                </motion.div>
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
                className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              >
                {heroButtons.map((button, index) => (
                  <SmartButton
                    key={`${button.text}-${index}`}
                    href={getButtonHref(button.link)}
                    variant={index === 0 ? "primary" : "secondary"}
                  >
                    {index !== 0 && <MessageCircle size={18} />}
                    {button.text ||
                      (index === 0 ? "Book Consultation" : "Learn More")}
                    {index === 0 && <ArrowRight size={18} />}
                  </SmartButton>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="show"
              className="mx-auto w-full max-w-md lg:max-w-none"
            >
              <div className="relative overflow-hidden rounded-4xl bg-linear-to-br from-[#0F3D5E] via-[#126071] to-[#168A83] p-5 text-white shadow-2xl shadow-blue-950/20 sm:p-6 md:rounded-[2.6rem]">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-[#F4B183]/20 blur-3xl" />

                <div className="relative">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/15 text-[#F4B183]">
                    <HeartHandshake size={30} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65">
                    Guided Support
                  </p>

                  <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                    Start with the right next step.
                  </h2>

                  <p className="mt-4 text-sm font-semibold leading-7 text-white/78">
                    Share your concern and get clear guidance for consultation,
                    assessment, therapy or parent support.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {[
                      {
                        icon: CalendarCheck,
                        title: "Book a consultation",
                      },
                      {
                        icon: Route,
                        title: "Understand the concern",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Get a clear support plan",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur"
                        >
                          <Icon size={18} className="text-[#F4B183]" />
                          <span className="text-sm font-black">
                            {item.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 rounded-3xl bg-white/10 p-4 backdrop-blur">
                    <p className="text-sm font-black text-[#F4B183]">
                      Available in Indore & Online
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white/75">
                      Support for children, adults, couples and families.
                    </p>
                  </div>

                  <a
                    href="#service-details"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#102A43] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                  >
                    View Service Details
                    <ArrowRight size={17} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="service-details" className="px-4 py-10 sm:px-5 md:py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Service Details"
            title="Explore the complete service guide"
          />

          <div className="mt-8 space-y-4">
            {sections.map((section, index) => (
              <ServiceAccordion
                key={`${section.title || "section"}-${index}`}
                section={section}
                index={index}
              />
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

function ServiceAccordion({ section, index }) {
  const type = section.type || "text";
  const Icon = getSectionIcon(type);
  const itemsCount = Array.isArray(section.items) ? section.items.length : 0;

  return (
    <motion.details
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="group overflow-hidden rounded-4xl border border-white bg-white shadow-lg shadow-slate-900/5 open:shadow-2xl open:shadow-slate-900/10"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 sm:p-6">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E] transition group-open:bg-[#0F3D5E] group-open:text-white">
            <Icon size={23} />
          </div>

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#F7FBFC] px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#0F3D5E]">
                {getSectionLabel(type)}
              </span>

              {itemsCount > 0 && (
                <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-[11px] font-black text-[#0F766E]">
                  {itemsCount} item{itemsCount > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <h3 className="text-lg font-black leading-snug text-[#102A43] sm:text-2xl">
              {section.title || `Section ${index + 1}`}
            </h3>

            {section.subtitle && (
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {section.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full bg-[#F7FBFC] px-3 py-2 text-xs font-black text-[#0F3D5E]">
          Learn more
          <ChevronDown size={18} className="transition group-open:rotate-180" />
        </div>
      </summary>

      <div className="border-t border-slate-100 px-5 pb-6 sm:px-6 sm:pb-7">
        <SectionContent section={section} />
      </div>
    </motion.details>
  );
}

function SectionContent({ section }) {
  const type = section.type || "text";
  const items = Array.isArray(section.items) ? section.items : [];

  return (
    <div className="pt-5">
      {section.content && (
        <div className="mb-6 rounded-3xl bg-[#F7FBFC] p-5 text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8">
          <ReadMoreText text={section.content} limit={320} />
        </div>
      )}

      {type === "story" && (
        <div className="rounded-4xl bg-[#0F3D5E] p-6 text-white">
          <Quote size={34} className="text-[#F4B183]" />

          {section.subtitle && (
            <p className="mt-4 text-sm font-black text-[#F4B183]">
              {section.subtitle}
            </p>
          )}

          {section.content && (
            <div className="mt-4 text-sm font-semibold leading-7 text-white/80 sm:text-base">
              <ReadMoreText text={section.content} limit={360} />
            </div>
          )}

          <SectionButtons items={items} />
        </div>
      )}

      {type === "quote" && (
        <div className="rounded-4xl border border-[#0F3D5E]/10 bg-[#F7FBFC] p-6">
          <Quote size={36} className="text-[#2CB1A6]" />

          {section.content && (
            <div className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
              <ReadMoreText text={section.content} limit={360} />
            </div>
          )}
        </div>
      )}

      {type === "steps" && items.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <StepCard key={index} item={item} index={index} />
          ))}
        </div>
      )}

      {(type === "cards" ||
        type === "text" ||
        type === "tools" ||
        type === "badges" ||
        type === "two-column" ||
        type === "faq" ||
        !type) &&
        items.length > 0 && (
          <div
            className={
              type === "badges"
                ? "flex flex-wrap gap-3"
                : "grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            }
          >
            {items.map((item, index) =>
              type === "badges" ? (
                <BadgeItem key={index} item={item} />
              ) : (
                <ContentCard key={index} item={item} />
              ),
            )}
          </div>
        )}

      {type === "cta" && (
        <div className="rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-6 text-center text-white">
          <h3 className="text-2xl font-black leading-tight">{section.title}</h3>

          {section.content && (
            <div className="mx-auto mt-4 max-w-3xl text-sm font-semibold leading-7 text-white/80 sm:text-base">
              <ReadMoreText text={section.content} limit={280} />
            </div>
          )}

          <SectionButtons items={items} />
        </div>
      )}

      {items.length === 0 &&
        !section.content &&
        type !== "story" &&
        type !== "quote" &&
        type !== "cta" && (
          <p className="rounded-3xl bg-[#F7FBFC] p-5 text-sm font-semibold leading-7 text-slate-600">
            Details for this section will be available soon.
          </p>
        )}
    </div>
  );
}

function StepCard({ item, index }) {
  const title =
    typeof item === "string"
      ? `Step ${index + 1}`
      : item?.title || `Step ${index + 1}`;
  const description =
    typeof item === "string" ? item : getItemDescription(item);
  const nestedItems = Array.isArray(item?.items) ? item.items : [];

  return (
    <div className="rounded-3xl bg-[#F7FBFC] p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F3D5E] text-sm font-black text-white">
        {index + 1}
      </div>

      <h4 className="text-lg font-black text-[#102A43]">{title}</h4>

      {description && (
        <div className="mt-3 text-sm font-semibold leading-7 text-slate-600">
          <ReadMoreText text={description} limit={170} />
        </div>
      )}

      <ExpandablePointList items={nestedItems} limit={3} />
    </div>
  );
}

function ContentCard({ item }) {
  const important = isImportantNote(item);
  const title = getItemTitle(item);
  const subtitle = typeof item === "string" ? "" : item?.subtitle;
  const description = getItemDescription(item);
  const nestedItems = Array.isArray(item?.items) ? item.items : [];

  return (
    <div
      className={`rounded-3xl p-5 shadow-sm ${
        important
          ? "border border-[#F4B183]/35 bg-[#FFF8ED]"
          : "border border-slate-100 bg-[#F7FBFC]"
      }`}
    >
      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${
          important
            ? "bg-[#F4B183]/20 text-[#B7791F]"
            : "bg-[#E9F8F6] text-[#0F766E]"
        }`}
      >
        {important ? <AlertTriangle size={21} /> : <CheckCircle2 size={21} />}
      </div>

      {title && (
        <h4 className="text-lg font-black leading-snug text-[#102A43]">
          {important ? "Important Note" : title}
        </h4>
      )}

      {subtitle && !important && (
        <p className="mt-2 text-sm font-black text-[#2CB1A6]">{subtitle}</p>
      )}

      {description && (
        <div className="mt-3 text-sm font-semibold leading-7 text-slate-600">
          <ReadMoreText text={description} limit={170} />
        </div>
      )}

      <ExpandablePointList items={nestedItems} limit={3} />

      {typeof item !== "string" && item?.buttonText && item?.buttonLink && (
        <div className="mt-5">
          <SmartButton href={item.buttonLink} variant="secondary">
            {item.buttonText}
            <ArrowRight size={16} />
          </SmartButton>
        </div>
      )}
    </div>
  );
}

function BadgeItem({ item }) {
  const title = getItemTitle(item);
  const description = getItemDescription(item);
  const nestedItems = Array.isArray(item?.items) ? item.items : [];

  return (
    <div className="rounded-full border border-[#0F3D5E]/10 bg-[#F7FBFC] px-5 py-3 text-sm font-black leading-6 text-[#0F3D5E] shadow-sm">
      {title}

      {(description || nestedItems.length > 0) && (
        <details className="group mt-2">
          <summary className="cursor-pointer list-none text-xs font-black text-[#0F766E]">
            Read more
          </summary>

          {description && (
            <p className="mt-2 max-w-sm text-xs font-semibold leading-6 text-slate-600">
              {description}
            </p>
          )}

          <ExpandablePointList items={nestedItems} limit={3} />
        </details>
      )}
    </div>
  );
}

function SectionButtons({ items = [] }) {
  const buttons = items.filter((item) => item?.buttonText && item?.buttonLink);

  if (buttons.length === 0) return null;

  return (
    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
      {buttons.map((item, index) => (
        <SmartButton
          key={`${item.buttonText}-${index}`}
          href={item.buttonLink}
          variant={index === 0 ? "secondary" : "primary"}
        >
          {item.buttonText}
          <ArrowRight size={16} />
        </SmartButton>
      ))}
    </div>
  );
}

function FaqSection({ faqs }) {
  return (
    <section className="bg-white/55 px-4 py-10 sm:px-5 md:py-14">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Questions" title="Frequently Asked Questions" />

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

              <div className="mt-4 pl-9 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                <ReadMoreText text={faq.answer} limit={260} />
              </div>
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
    <section className="px-4 pb-14 pt-6 sm:px-5 md:pb-20">
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
