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
  Star,
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
    transition: { staggerChildren: 0.08 },
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

const normalizeText = (value = "") => String(value).toLowerCase().trim();

const isImportantNote = (item = {}) => {
  const title = normalizeText(item.title || "");
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

const isProcessSection = (section = {}) => {
  const title = normalizeText(section.title);
  const type = normalizeText(section.type);

  return (
    type === "steps" ||
    title.includes("process") ||
    title.includes("how it works") ||
    title.includes("approach") ||
    title.includes("journey") ||
    title.includes("what happens")
  );
};

const isSignsSection = (section = {}) => {
  const title = normalizeText(section.title);
  const type = normalizeText(section.type);

  return (
    title.includes("sign") ||
    title.includes("symptom") ||
    title.includes("look for") ||
    title.includes("red flag") ||
    title.includes("may need") ||
    title.includes("when to seek") ||
    type === "signs"
  );
};

const isStorySection = (section = {}) => {
  const title = normalizeText(section.title);
  const type = normalizeText(section.type);

  return (
    type === "story" ||
    title.includes("story") ||
    title.includes("success") ||
    title.includes("family") ||
    title.includes("parent experience")
  );
};

const getSectionEyebrow = (section = {}) => {
  if (isProcessSection(section)) return "How it works";
  if (isSignsSection(section)) return "Signs to look for";
  if (isStorySection(section)) return "A family story";

  const type = normalizeText(section.type);

  const labels = {
    text: "Details",
    cards: "Key points",
    tools: "Tools & support",
    badges: "Highlights",
    quote: "Expert note",
    cta: "Next step",
    "two-column": "Comparison",
    faq: "Questions",
  };

  return labels[type] || "Service details";
};

const getSectionIcon = (section = {}) => {
  if (isProcessSection(section)) return Route;
  if (isSignsSection(section)) return AlertTriangle;
  if (isStorySection(section)) return Quote;

  const icons = {
    text: ClipboardCheck,
    cards: CheckCircle2,
    tools: Brain,
    badges: ShieldCheck,
    quote: Quote,
    cta: CalendarCheck,
    "two-column": ClipboardCheck,
    faq: HelpCircle,
  };

  return icons[section.type] || ClipboardCheck;
};

function SmartButton({ href, children, variant = "primary", className = "" }) {
  const classes =
    variant === "secondary"
      ? `inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:-translate-y-1 hover:border-[#2CB1A6] hover:bg-[#E9F8F6] hover:text-[#0F766E] ${className}`
      : `inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:bg-[#102A43] ${className}`;

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

function ReadMoreText({ text, limit = 260, className = "" }) {
  const [open, setOpen] = useState(false);

  const lines = getTextLines(text);
  if (lines.length === 0) return null;

  const fullText = lines.join("\n");
  const shouldShorten = fullText.length > limit || lines.length > 2;

  const previewText =
    fullText.length > limit
      ? `${fullText.slice(0, limit).trim()}...`
      : fullText;

  const visibleLines = open || !shouldShorten ? lines : [previewText];

  return (
    <div className={className}>
      <div className="space-y-3">
        {visibleLines.map((line, index) => (
          <p key={index} className="whitespace-pre-line">
            {line}
          </p>
        ))}
      </div>

      {shouldShorten && (
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
  const hero = service?.hero || {};

  const sortedSections = useMemo(() => {
    return Array.isArray(service?.sections)
      ? [...service.sections].sort((a, b) => (a.order || 0) - (b.order || 0))
      : [];
  }, [service?.sections]);

  const fallbackPoints = useMemo(() => {
    return Array.isArray(service?.points) ? service.points : [];
  }, [service?.points]);

  const fallbackProcess = useMemo(() => {
    return Array.isArray(service?.process) ? service.process : [];
  }, [service?.process]);

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
        title: "How it works",
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
      <Breadcrumb title={service.title} />

      <HeroSection
        service={service}
        heroTitle={heroTitle}
        heroSubtitle={heroSubtitle}
        heroParagraph={heroParagraph}
        heroButtons={heroButtons}
        hero={hero}
      />

      {sections.length > 0 && (
        <section id="service-details" className="px-4 py-10 sm:px-5 md:py-14">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Complete Guide"
              title="Everything you need to know"
              subtitle="Important information is now visible directly on the page, so users do not miss key service details."
            />

            <div className="mt-10 space-y-10 md:space-y-14">
              {sections.map((section, index) => (
                <VisibleServiceSection
                  key={`${section.title || "section"}-${index}`}
                  section={section}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && <FaqSection faqs={faqs} />}

      <BottomCTA service={service} />
    </main>
  );
}

function Breadcrumb({ title }) {
  return (
    <div className="border-b border-[#DDEDEA] bg-white/80 px-4 py-4 backdrop-blur sm:px-5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
        <Link
          href="/"
          className="text-[#0F766E] transition hover:text-[#0F3D5E]"
        >
          Home
        </Link>
        <span>›</span>
        <Link
          href="/services"
          className="text-[#0F766E] transition hover:text-[#0F3D5E]"
        >
          Services
        </Link>
        <span>›</span>
        <span className="text-[#102A43]">{title}</span>
      </div>
    </div>
  );
}

function HeroSection({
  service,
  heroTitle,
  heroSubtitle,
  heroParagraph,
  heroButtons,
  hero,
}) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-[#08384D] via-[#10616A] to-[#168A83] px-4 py-14 text-white sm:px-5 md:py-20">
      <div className="absolute -right-20 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#F4B183]/15 blur-3xl" />
      <div className="absolute right-8 top-10 hidden h-72 w-72 rounded-full border border-white/10 bg-white/5 lg:block" />

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_390px] lg:items-center">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-5 py-2.5 text-xs font-black uppercase tracking-[0.13em] text-white shadow-sm backdrop-blur sm:text-sm"
          >
            <Sparkles size={16} className="text-[#F4B183]" />
            {service.category || "Therapy & Counselling Service"}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-4xl whitespace-pre-line text-4xl font-black leading-[1.05] text-white sm:text-6xl md:text-7xl"
          >
            {heroTitle}
          </motion.h1>

          {heroSubtitle && (
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-3xl text-lg font-black leading-8 text-white/90 sm:text-2xl sm:leading-9"
            >
              {heroSubtitle}
            </motion.p>
          )}

          {heroParagraph && (
            <motion.div
              variants={fadeUp}
              className="mt-5 max-w-3xl text-base font-semibold leading-8 text-white/78 sm:text-lg"
            >
              <ReadMoreText text={heroParagraph} limit={330} />
            </motion.div>
          )}

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap gap-3 text-sm font-bold text-white/88"
          >
            <span className="inline-flex items-center gap-2">
              <Star size={17} className="fill-white text-white" />
              4.9 Google Rating
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Families across India & worldwide</span>
            <span className="hidden sm:inline">•</span>
            <span>Trusted since 2013</span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-3">
            {[
              "Clear guidance",
              "Personalised plan",
              "Online + Indore support",
            ].map((point) => (
              <span
                key={point}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-xs font-black text-white backdrop-blur sm:text-sm"
              >
                <CheckCircle2 size={16} className="text-[#F4B183]" />
                {point}
              </span>
            ))}
          </motion.div>

          {hero.trustLine && (
            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-3xl rounded-3xl border border-white/15 bg-white/10 px-5 py-4 text-sm font-black leading-6 text-white/85 backdrop-blur"
            >
              {hero.trustLine}
            </motion.p>
          )}

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            {heroButtons.map((button, index) => (
              <SmartButton
                key={`${button.text}-${index}`}
                href={getButtonHref(button.link)}
                variant={index === 0 ? "secondary" : "primary"}
                className={
                  index === 0
                    ? "border-white bg-white text-[#102A43] hover:bg-[#F4B183] hover:text-[#102A43]"
                    : "bg-[#F4B183] text-[#102A43] hover:bg-white"
                }
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
          <div className="relative overflow-hidden rounded-4xl border border-white/15 bg-white/12 p-5 text-white shadow-2xl shadow-blue-950/25 backdrop-blur sm:p-6 md:rounded-[2.6rem]">
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
                      <span className="text-sm font-black">{item.title}</span>
                    </div>
                  );
                })}
              </div>

              <a
                href="#service-details"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#102A43] transition hover:-translate-y-1 hover:bg-[#F4B183]"
              >
                View Service Details
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
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
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#0F766E] shadow-sm">
        <Sparkles size={15} className="text-[#2CB1A6]" />
        {eyebrow}
      </div>

      <h2 className="text-3xl font-black leading-tight text-[#102A43] sm:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function VisibleServiceSection({ section, index }) {
  const type = section.type || "text";

  if (type === "cta") {
    return <CTASection section={section} index={index} />;
  }

  if (isStorySection(section)) {
    return <StorySection section={section} index={index} />;
  }

  if (isProcessSection(section)) {
    return <ProcessSection section={section} index={index} />;
  }

  if (isSignsSection(section)) {
    return <SignsSection section={section} index={index} />;
  }

  if (type === "quote") {
    return <QuoteSection section={section} index={index} />;
  }

  return <GenericSection section={section} index={index} />;
}

function SectionTitleRow({ section, index, align = "left" }) {
  const Icon = getSectionIcon(section);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"
      }
    >
      <div
        className={`mb-4 inline-flex items-center gap-2 rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#0F766E] ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        <Icon size={15} />
        {getSectionEyebrow(section)}
      </div>

      <h2 className="text-3xl font-black leading-tight text-[#102A43] sm:text-5xl">
        {section.title || `Section ${index + 1}`}
      </h2>

      {section.subtitle && (
        <div className="mt-4 text-base font-semibold leading-8 text-slate-600 sm:text-lg">
          <ReadMoreText text={section.subtitle} limit={280} />
        </div>
      )}

      {section.content &&
        !isStorySection(section) &&
        section.type !== "quote" && (
          <div className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base sm:leading-8">
            <ReadMoreText text={section.content} limit={360} />
          </div>
        )}
    </motion.div>
  );
}

function ProcessSection({ section, index }) {
  const items = Array.isArray(section.items) ? section.items : [];

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="rounded-[2rem] bg-white px-5 py-8 shadow-[0_18px_45px_rgba(15,61,94,0.08)] sm:px-7 md:rounded-[3rem] md:px-9 md:py-11"
    >
      <SectionTitleRow section={section} index={index} />

      {items.length > 0 && (
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {items.map((item, itemIndex) => (
            <ProcessCard key={itemIndex} item={item} index={itemIndex} />
          ))}
        </div>
      )}
    </motion.section>
  );
}

function ProcessCard({ item, index }) {
  const title =
    typeof item === "string"
      ? `Step ${index + 1}`
      : item?.title || `Step ${index + 1}`;

  const description =
    typeof item === "string" ? item : getItemDescription(item);
  const nestedItems = Array.isArray(item?.items) ? item.items : [];

  return (
    <div className="relative rounded-[1.7rem] border border-[#DDEDEA] bg-[#F7FBFC] p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#13756F] text-2xl font-black text-white shadow-lg shadow-teal-900/15">
        {index + 1}
      </div>

      <h3 className="text-xl font-black leading-tight text-[#102A43]">
        {title}
      </h3>

      {description && (
        <div className="mt-3 text-sm font-semibold leading-7 text-slate-600">
          <ReadMoreText text={description} limit={210} />
        </div>
      )}

      <ExpandablePointList items={nestedItems} limit={3} />
    </div>
  );
}

function SignsSection({ section, index }) {
  const items = Array.isArray(section.items) ? section.items : [];

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="rounded-[2rem] bg-[#E9F8F6] px-5 py-8 sm:px-7 md:rounded-[3rem] md:px-9 md:py-11"
    >
      <SectionTitleRow section={section} index={index} />

      {items.length > 0 && (
        <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, itemIndex) => {
            const title = getItemTitle(item, `Point ${itemIndex + 1}`);
            const description = getItemDescription(item);
            const nestedItems = Array.isArray(item?.items) ? item.items : [];

            return (
              <div
                key={itemIndex}
                className="rounded-[1.4rem] border-l-4 border-[#2CB1A6] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-[#2CB1A6]" />
                  <div>
                    <h3 className="text-base font-black leading-7 text-[#102A43]">
                      {title}
                    </h3>

                    {description && (
                      <div className="mt-2 text-sm font-semibold leading-7 text-slate-600">
                        <ReadMoreText text={description} limit={170} />
                      </div>
                    )}

                    <ExpandablePointList items={nestedItems} limit={3} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}

function StorySection({ section, index }) {
  const items = Array.isArray(section.items) ? section.items : [];

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="grid gap-7 rounded-[2rem] bg-white px-5 py-8 shadow-[0_18px_45px_rgba(15,61,94,0.08)] sm:px-7 md:rounded-[3rem] md:px-9 md:py-11 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
    >
      <SectionTitleRow section={section} index={index} />

      <div className="rounded-[1.8rem] border border-[#CFEDEA] bg-[#E9F8F6]/70 p-6 sm:p-8">
        <Quote size={42} className="mb-5 text-[#A7DCD7]" />

        {section.content && (
          <div className="text-lg font-semibold italic leading-9 text-[#102A43]">
            <ReadMoreText text={section.content} limit={520} />
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-6 grid gap-3">
            {items.map((item, itemIndex) => (
              <ContentCard key={itemIndex} item={item} compact />
            ))}
          </div>
        )}

        <SectionButtons items={items} />
      </div>
    </motion.section>
  );
}

function QuoteSection({ section, index }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="rounded-[2rem] border border-[#DDEDEA] bg-white p-6 shadow-[0_18px_45px_rgba(15,61,94,0.08)] sm:p-8 md:rounded-[3rem]"
    >
      <SectionTitleRow section={section} index={index} />

      {section.content && (
        <div className="mt-7 rounded-[1.8rem] bg-[#F7FBFC] p-6">
          <Quote size={38} className="mb-4 text-[#2CB1A6]" />
          <div className="text-base font-semibold leading-8 text-slate-600">
            <ReadMoreText text={section.content} limit={440} />
          </div>
        </div>
      )}
    </motion.section>
  );
}

function GenericSection({ section, index }) {
  const items = Array.isArray(section.items) ? section.items : [];
  const type = section.type || "text";

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="rounded-[2rem] bg-white px-5 py-8 shadow-[0_18px_45px_rgba(15,61,94,0.08)] sm:px-7 md:rounded-[3rem] md:px-9 md:py-11"
    >
      <SectionTitleRow section={section} index={index} />

      {items.length > 0 && (
        <div
          className={
            type === "badges"
              ? "mt-8 flex flex-wrap gap-3"
              : "mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          }
        >
          {items.map((item, itemIndex) =>
            type === "badges" ? (
              <BadgeItem key={itemIndex} item={item} />
            ) : (
              <ContentCard key={itemIndex} item={item} />
            ),
          )}
        </div>
      )}

      {items.length === 0 && !section.content && (
        <div className="mt-6 rounded-3xl bg-[#F7FBFC] p-5 text-sm font-semibold leading-7 text-slate-600">
          Details for this section will be available soon.
        </div>
      )}
    </motion.section>
  );
}

function CTASection({ section, index }) {
  const items = Array.isArray(section.items) ? section.items : [];

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-[#0F3D5E] to-[#168A83] px-5 py-9 text-center text-white shadow-2xl shadow-slate-900/15 sm:px-7 md:rounded-[3rem] md:px-9 md:py-12"
    >
      <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#F4B183]/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/15 text-[#F4B183]">
          <CalendarCheck size={28} />
        </div>

        <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-white/65">
          {getSectionEyebrow(section)}
        </p>

        <h2 className="text-3xl font-black leading-tight sm:text-5xl">
          {section.title || `Section ${index + 1}`}
        </h2>

        {section.content && (
          <div className="mx-auto mt-5 max-w-2xl text-sm font-semibold leading-7 text-white/80 sm:text-base">
            <ReadMoreText text={section.content} limit={340} />
          </div>
        )}

        <SectionButtons items={items} />
      </div>
    </motion.section>
  );
}

function ContentCard({ item, compact = false }) {
  const important = isImportantNote(item);
  const title = getItemTitle(item);
  const subtitle = typeof item === "string" ? "" : item?.subtitle;
  const description = getItemDescription(item);
  const nestedItems = Array.isArray(item?.items) ? item.items : [];

  return (
    <div
      className={`rounded-[1.5rem] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        compact ? "sm:p-5" : "sm:p-6"
      } ${
        important
          ? "border border-[#F4B183]/35 bg-[#FFF8ED]"
          : "border border-[#DDEDEA] bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            important
              ? "bg-[#F4B183]/20 text-[#B7791F]"
              : "bg-[#E9F8F6] text-[#0F766E]"
          }`}
        >
          {important ? <AlertTriangle size={21} /> : <CheckCircle2 size={21} />}
        </div>

        <div className="min-w-0 flex-1">
          {title && (
            <h3 className="text-lg font-black leading-snug text-[#102A43] sm:text-xl">
              {important ? "Important Note" : title}
            </h3>
          )}

          {subtitle && !important && (
            <p className="mt-1 text-sm font-black text-[#2CB1A6]">{subtitle}</p>
          )}
        </div>
      </div>

      {description && (
        <div className="mt-4 text-sm font-semibold leading-7 text-slate-600">
          <ReadMoreText text={description} limit={220} />
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
    <div className="rounded-[1.4rem] border border-[#0F3D5E]/10 bg-[#F7FBFC] px-5 py-4 text-sm font-black leading-6 text-[#0F3D5E] shadow-sm">
      <div className="flex items-start gap-2">
        <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#2CB1A6]" />
        <span>{title}</span>
      </div>

      {description && (
        <div className="mt-3 text-xs font-semibold leading-6 text-slate-600">
          <ReadMoreText text={description} limit={150} />
        </div>
      )}

      <ExpandablePointList items={nestedItems} limit={3} />
    </div>
  );
}

function SectionButtons({ items = [] }) {
  const buttons = items.filter((item) => item?.buttonText && item?.buttonLink);

  if (buttons.length === 0) return null;

  return (
    <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
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
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white/65 px-4 py-10 sm:px-5 md:py-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          subtitle="These answers stay clean, readable and openable on all screen sizes."
        />

        <div className="mt-9 space-y-4">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                className={`overflow-hidden rounded-[1.5rem] border bg-white shadow-sm transition ${
                  open
                    ? "border-[#2CB1A6]/25 shadow-lg shadow-slate-900/5"
                    : "border-[#DDEDEA]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-7"
                  aria-expanded={open}
                >
                  <span className="flex gap-3">
                    <HelpCircle
                      size={22}
                      className="mt-0.5 shrink-0 text-[#2CB1A6]"
                    />
                    <span className="text-base font-black leading-6 text-[#102A43] sm:text-lg">
                      {faq.question}
                    </span>
                  </span>

                  <ChevronDown
                    size={22}
                    className={`shrink-0 text-[#0F3D5E] transition ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-1 sm:px-7 sm:pb-6">
                    <div className="pl-9 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                      <ReadMoreText text={faq.answer} limit={360} />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
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
