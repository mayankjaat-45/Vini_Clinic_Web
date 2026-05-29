"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  HelpCircle,
  MessageCircle,
  Quote,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 35 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const getTextLines = (text = "") => {
  return String(text)
    .split("\n")
    .filter((line) => line.trim());
};

const getButtonHref = (buttonLink) => {
  if (!buttonLink) return "/contact";
  return buttonLink;
};

const isExternalLink = (link = "") => {
  return link.startsWith("http") || link.startsWith("https://wa.me");
};

function SmartButton({ href, children, variant = "primary" }) {
  const classes =
    variant === "secondary"
      ? "inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-6 py-3 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:-translate-y-1 hover:border-[#2CB1A6] hover:text-[#2CB1A6]"
      : "inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:bg-[#102A43]";

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
          <h1 className="text-3xl font-black text-[#102A43]">
            Service not found
          </h1>

          <p className="mt-3 text-slate-600">
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

  const faqs = Array.isArray(service.faqs) ? service.faqs : [];
  const fallbackPoints = Array.isArray(service.points) ? service.points : [];
  const fallbackProcess = Array.isArray(service.process) ? service.process : [];

  const heroTitle = hero.headline || service.title;
  const heroSubtitle = hero.subHeadline || service.shortDescription;
  const heroParagraph = hero.paragraph || service.description;

  const whatsappMessage = encodeURIComponent(
    `Hello, I want to know more about ${service.title}`,
  );

  const primaryHeroButton = hero.buttons?.[0];
  const secondaryHeroButton = hero.buttons?.[1];

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-4 py-20 sm:px-5 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl md:h-96 md:w-96"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
          className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl md:h-96 md:w-96"
        />

        <div className="relative mx-auto max-w-7xl">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <Link
              href="/services"
              className="mb-8 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E] transition hover:text-[#2CB1A6]"
            >
              <ArrowLeft size={16} />
              Back to Services
            </Link>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1fr_430px] lg:items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={fadeUp}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm"
              >
                <Sparkles size={16} className="text-[#2CB1A6]" />
                {service.category || "Therapy & Counselling Service"}
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="whitespace-pre-line text-4xl font-black leading-tight text-[#102A43] sm:text-5xl md:text-6xl"
              >
                {heroTitle}
              </motion.h1>

              {heroSubtitle && (
                <motion.p
                  variants={fadeUp}
                  className="mt-6 text-lg font-black leading-8 text-[#0F3D5E] sm:text-xl md:leading-9"
                >
                  {heroSubtitle}
                </motion.p>
              )}

              {heroParagraph && (
                <motion.div
                  variants={fadeUp}
                  className="mt-5 space-y-4 text-base font-semibold leading-8 text-slate-600 sm:text-lg"
                >
                  {getTextLines(heroParagraph).map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </motion.div>
              )}

              {hero.trustLine && (
                <motion.p
                  variants={fadeUp}
                  className="mt-6 rounded-2xl bg-white px-5 py-4 text-sm font-black leading-6 text-[#0F3D5E] shadow-sm"
                >
                  {hero.trustLine}
                </motion.p>
              )}

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-4 sm:flex-row"
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

            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="show"
              className="rounded-4xl bg-white p-5 shadow-2xl shadow-slate-900/10 md:rounded-[3rem]"
            >
              <div className="relative overflow-hidden rounded-[1.6rem] bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-8 text-white md:rounded-[2.4rem]">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15"
                >
                  <Sparkles size={34} className="text-[#F4B183]" />
                </motion.div>

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/60">
                  Dr. Vini Jhariya
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                  Listen. Assess. Understand. Plan.
                </h2>

                <p className="mt-5 text-sm font-semibold leading-7 text-white/75 sm:text-base">
                  The right support begins with understanding the real reason
                  behind behaviour, emotions, learning or developmental
                  concerns.
                </p>

                <div className="mt-8 rounded-3xl bg-white/10 p-5">
                  <p className="text-sm font-black text-[#F4B183]">
                    Available in Indore & Online
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Clinical support for children, adolescents, adults, couples
                    and families.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {sections.length > 0 ? (
        sections.map((section, index) => (
          <ServiceSection
            key={`${section.title}-${index}`}
            section={section}
            index={index}
          />
        ))
      ) : (
        <FallbackSections points={fallbackPoints} process={fallbackProcess} />
      )}

      {faqs.length > 0 && <FaqSection faqs={faqs} />}

      <BottomCTA service={service} />
    </main>
  );
}

function SectionWrapper({ children, className = "" }) {
  return (
    <section className={`px-4 py-14 sm:px-5 md:py-18 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function SectionHeading({ section, center = false }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}
    >
      <p className="mb-3 inline-flex rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0F766E]">
        {section.type || "section"}
      </p>

      <h2 className="whitespace-pre-line text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-5xl">
        {section.title}
      </h2>

      {section.subtitle && (
        <p className="mt-5 text-base font-semibold leading-8 text-slate-600 sm:text-lg">
          {section.subtitle}
        </p>
      )}

      {section.content &&
        section.type !== "story" &&
        section.type !== "quote" && (
          <div className="mt-5 space-y-4 text-base font-semibold leading-8 text-slate-600">
            {getTextLines(section.content).map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
    </motion.div>
  );
}

function ServiceSection({ section, index }) {
  const type = section.type || "text";

  if (type === "cards") return <CardsSection section={section} index={index} />;
  if (type === "steps") return <StepsSection section={section} index={index} />;
  if (type === "tools") return <ToolsSection section={section} index={index} />;
  if (type === "badges")
    return <BadgesSection section={section} index={index} />;
  if (type === "story") return <StorySection section={section} index={index} />;
  if (type === "quote") return <QuoteSection section={section} index={index} />;
  if (type === "cta") return <CTASection section={section} index={index} />;
  if (type === "two-column")
    return <TwoColumnSection section={section} index={index} />;
  if (type === "faq") return null;

  return <TextSection section={section} index={index} />;
}

function TextSection({ section, index }) {
  return (
    <SectionWrapper className={index % 2 === 0 ? "bg-white/40" : ""}>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading section={{ ...section, content: "" }} />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8"
        >
          {section.content && (
            <div className="space-y-4 text-base font-semibold leading-8 text-slate-600">
              {getTextLines(section.content).map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          )}

          {Array.isArray(section.items) && section.items.length > 0 && (
            <div className="mt-7 space-y-4">
              {section.items.map((item, idx) => (
                <ContentItem key={idx} item={item} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

function CardsSection({ section, index }) {
  return (
    <SectionWrapper className={index % 2 === 0 ? "bg-white/40" : ""}>
      <SectionHeading section={section} center />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {(section.items || []).map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
              <CheckCircle2 size={24} />
            </div>

            <h3 className="text-xl font-black leading-snug text-[#102A43]">
              {item.title}
            </h3>

            {item.subtitle && (
              <p className="mt-2 text-sm font-black text-[#2CB1A6]">
                {item.subtitle}
              </p>
            )}

            {item.description && (
              <p className="mt-4 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">
                {item.description}
              </p>
            )}

            {item.content && (
              <p className="mt-4 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">
                {item.content}
              </p>
            )}

            {Array.isArray(item.items) && item.items.length > 0 && (
              <ul className="mt-5 space-y-3">
                {item.items.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex gap-3 text-sm font-semibold leading-6 text-slate-600"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-1 shrink-0 text-[#2CB1A6]"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {item.buttonText && item.buttonLink && (
              <div className="mt-6">
                <SmartButton href={item.buttonLink} variant="secondary">
                  {item.buttonText}
                  <ArrowRight size={16} />
                </SmartButton>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

function StepsSection({ section, index }) {
  return (
    <SectionWrapper className={index % 2 === 0 ? "bg-white/40" : ""}>
      <SectionHeading section={section} center />

      <div className="mx-auto mt-12 max-w-5xl space-y-5">
        {(section.items || []).map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-5 rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:grid-cols-[80px_1fr] sm:p-7"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#0F3D5E] text-2xl font-black text-white">
              {idx + 1}
            </div>

            <div>
              <h3 className="text-xl font-black text-[#102A43]">
                {item.title}
              </h3>

              {item.description && (
                <p className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                  {item.description}
                </p>
              )}

              {Array.isArray(item.items) && item.items.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {item.items.map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="flex gap-3 text-sm font-semibold text-slate-600"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#2CB1A6]"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function ToolsSection({ section, index }) {
  return (
    <SectionWrapper className={index % 2 === 0 ? "bg-white/40" : ""}>
      <SectionHeading section={section} center />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {(section.items || []).map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="flex gap-4 rounded-3xl bg-white p-5 shadow-lg shadow-slate-900/5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
              <ClipboardCheck size={22} />
            </div>

            <p className="text-sm font-black leading-6 text-[#102A43]">
              {item.title}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

function BadgesSection({ section, index }) {
  return (
    <SectionWrapper className={index % 2 === 0 ? "bg-white/40" : ""}>
      <SectionHeading section={section} center />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-3"
      >
        {(section.items || []).map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            className="rounded-full border border-[#0F3D5E]/10 bg-white px-5 py-3 text-sm font-black leading-6 text-[#0F3D5E] shadow-sm"
          >
            {item.title}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

function StorySection({ section, index }) {
  return (
    <SectionWrapper className={index % 2 === 0 ? "bg-white/40" : ""}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-5xl overflow-hidden rounded-4xl bg-[#0F3D5E] p-7 text-white shadow-2xl shadow-blue-950/20 sm:p-10 md:rounded-[3rem]"
      >
        <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white/15">
          <Quote size={28} className="text-[#F4B183]" />
        </div>

        <h2 className="whitespace-pre-line text-3xl font-black leading-tight sm:text-4xl">
          {section.title}
        </h2>

        {section.subtitle && (
          <p className="mt-4 text-base font-semibold leading-7 text-white/70">
            {section.subtitle}
          </p>
        )}

        {section.content && (
          <div className="mt-7 space-y-4 text-base font-semibold leading-8 text-white/80">
            {getTextLines(section.content).map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}

        {Array.isArray(section.items) &&
          section.items.map((item, idx) =>
            item.buttonText && item.buttonLink ? (
              <div key={idx} className="mt-8">
                <SmartButton href={item.buttonLink} variant="secondary">
                  {item.buttonText}
                  <ArrowRight size={16} />
                </SmartButton>
              </div>
            ) : null,
          )}
      </motion.div>
    </SectionWrapper>
  );
}

function QuoteSection({ section, index }) {
  return (
    <SectionWrapper className={index % 2 === 0 ? "bg-white/40" : ""}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="mx-auto max-w-5xl rounded-4xl border border-[#0F3D5E]/10 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-10 md:rounded-[3rem]"
      >
        <Quote size={42} className="text-[#2CB1A6]" />

        <h2 className="mt-5 whitespace-pre-line text-3xl font-black leading-tight text-[#102A43] sm:text-4xl">
          {section.title}
        </h2>

        {section.content && (
          <div className="mt-7 space-y-4 text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            {getTextLines(section.content).map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        )}
      </motion.div>
    </SectionWrapper>
  );
}

function CTASection({ section, index }) {
  return (
    <SectionWrapper className={index % 2 === 0 ? "bg-white/40" : ""}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        className="relative overflow-hidden rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-7 text-center text-white shadow-2xl shadow-blue-950/20 sm:p-10 md:rounded-[3rem]"
      >
        <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#F4B183]/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <h2 className="whitespace-pre-line text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {section.title}
          </h2>

          {section.content && (
            <div className="mt-6 space-y-4 text-base font-semibold leading-8 text-white/80 sm:text-lg">
              {getTextLines(section.content).map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          )}

          {Array.isArray(section.items) && section.items.length > 0 && (
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              {section.items.map((item, idx) =>
                item.buttonText && item.buttonLink ? (
                  <SmartButton
                    key={idx}
                    href={item.buttonLink}
                    variant={idx === 0 ? "secondary" : "primary"}
                  >
                    {item.buttonText}
                    <ArrowRight size={16} />
                  </SmartButton>
                ) : null,
              )}
            </div>
          )}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

function TwoColumnSection({ section, index }) {
  return (
    <SectionWrapper className={index % 2 === 0 ? "bg-white/40" : ""}>
      <SectionHeading section={section} center />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {(section.items || []).map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="rounded-4xl bg-white p-7 shadow-xl shadow-slate-900/5"
          >
            <h3 className="text-2xl font-black text-[#102A43]">{item.title}</h3>

            {item.description && (
              <div className="mt-4 space-y-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                {getTextLines(item.description).map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            )}

            {Array.isArray(item.items) && item.items.length > 0 && (
              <ul className="mt-5 space-y-3">
                {item.items.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex gap-3 text-sm font-semibold leading-6 text-slate-600"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-1 shrink-0 text-[#2CB1A6]"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function ContentItem({ item }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-[#F7FBFC] p-5">
      {item.title && (
        <h3 className="text-lg font-black text-[#102A43]">{item.title}</h3>
      )}

      {item.subtitle && (
        <p className="mt-1 text-sm font-black text-[#2CB1A6]">
          {item.subtitle}
        </p>
      )}

      {item.description && (
        <p className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">
          {item.description}
        </p>
      )}

      {item.content && (
        <p className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600">
          {item.content}
        </p>
      )}

      {Array.isArray(item.items) && item.items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {item.items.map((point, idx) => (
            <li
              key={idx}
              className="flex gap-3 text-sm font-semibold leading-6 text-slate-600"
            >
              <CheckCircle2
                size={17}
                className="mt-1 shrink-0 text-[#2CB1A6]"
              />
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FallbackSections({ points, process }) {
  return (
    <>
      {points.length > 0 && (
        <SectionWrapper>
          <SectionHeading
            center
            section={{
              type: "highlights",
              title: "How this service can help",
              subtitle:
                "Support designed around the real needs of the child, adult, couple or family.",
            }}
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {points.map((point, idx) => (
              <div
                key={idx}
                className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5"
              >
                <CheckCircle2 className="text-[#2CB1A6]" size={26} />
                <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {process.length > 0 && (
        <SectionWrapper className="bg-white/40">
          <SectionHeading
            center
            section={{
              type: "process",
              title: "Our process",
              subtitle:
                "A clear, supportive and clinically grounded process from the first consultation.",
            }}
          />

          <div className="mx-auto mt-10 max-w-5xl space-y-5">
            {process.map((step, idx) => (
              <div
                key={idx}
                className="grid gap-5 rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:grid-cols-[70px_1fr]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#0F3D5E] text-xl font-black text-white">
                  {idx + 1}
                </div>
                <p className="text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}

function FaqSection({ faqs }) {
  return (
    <section className="bg-white px-4 py-16 sm:px-5 md:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          center
          section={{
            type: "faq",
            title: "Frequently Asked Questions",
            subtitle:
              "Clear answers to common questions families ask before booking.",
          }}
        />

        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-4xl bg-[#F7FBFC] p-6 shadow-sm"
            >
              <div className="flex gap-4">
                <HelpCircle
                  size={24}
                  className="mt-1 shrink-0 text-[#2CB1A6]"
                />

                <div>
                  <h3 className="text-lg font-black text-[#102A43]">
                    {faq.question}
                  </h3>

                  <p className="mt-3 whitespace-pre-line text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
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
    <section className="px-4 py-16 sm:px-5 md:py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl rounded-4xl bg-[#102A43] p-7 text-center text-white shadow-2xl shadow-slate-900/20 sm:p-10 md:rounded-[3rem]"
      >
        <h2 className="text-3xl font-black leading-tight sm:text-4xl">
          Ready to take the first step?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base font-semibold leading-8 text-white/75">
          Book a consultation with Dr. Vini Jhariya and get clear guidance for
          your next step.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[#102A43] transition hover:-translate-y-1"
          >
            Book Consultation
            <ArrowRight size={18} />
          </Link>

          <a
            href={`https://wa.me/917999215093?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </a>
        </div>
      </motion.div>
    </section>
  );
}
