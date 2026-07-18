"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Baby,
  Brain,
  CalendarCheck,
  ChevronRight,
  ClipboardCheck,
  Globe2,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";

const serviceVisuals = [
  {
    keywords: ["autism", "asd"],
    icon: Brain,
    label: "Developmental Support",
  },
  {
    keywords: ["adhd", "attention", "hyperactivity"],
    icon: Activity,
    label: "Attention & Behaviour",
  },
  {
    keywords: ["dyslexia", "learning", "remedial"],
    icon: ClipboardCheck,
    label: "Learning Support",
  },
  {
    keywords: ["assessment", "psychological", "iq", "sld"],
    icon: ClipboardCheck,
    label: "Psychological Assessment",
  },
  {
    keywords: ["early", "speech", "milestone", "development"],
    icon: Baby,
    label: "Early Intervention",
  },
  {
    keywords: ["adolescent", "teen"],
    icon: Users,
    label: "Adolescent Support",
  },
  {
    keywords: ["online"],
    icon: Globe2,
    label: "Online Consultation",
  },
  {
    keywords: ["child counselling", "counselling"],
    icon: HeartHandshake,
    label: "Counselling",
  },
];

const defaultVisual = {
  icon: HeartHandshake,
  label: "Psychological Support",
};

const fallbackServices = [
  {
    title: "Autism Therapy",
    slug: "autism-therapy-indore",
    category: "Children",
    shortDescription:
      "Assessment-led developmental support designed around communication, behaviour, social interaction and sensory needs.",
  },
  {
    title: "ADHD Assessment & Therapy",
    slug: "adhd-assessment-therapy-indore",
    category: "Children",
    shortDescription:
      "Structured assessment and intervention for attention, restlessness, impulsivity, behaviour and emotional regulation.",
  },
  {
    title: "Dyslexia Support",
    slug: "dyslexia-specialist-indore",
    category: "Children",
    shortDescription:
      "Learning assessment and individualised remedial support for reading, writing, spelling and school difficulties.",
  },
  {
    title: "Psychological Assessments",
    slug: "psychological-assessments-indore",
    category: "Assessment",
    shortDescription:
      "Comprehensive assessments that provide clarity, documentation and practical recommendations for parents and schools.",
  },
  {
    title: "Child Counselling",
    slug: "child-counselling-indore",
    category: "Children",
    shortDescription:
      "A supportive space for emotional, behavioural, confidence, social and school-related concerns.",
  },
  {
    title: "Adolescent Counselling",
    slug: "adolescent-counselling-indore",
    category: "Adolescents",
    shortDescription:
      "Confidential counselling for anxiety, mood, confidence, relationships, academic pressure and career confusion.",
  },
];

const getVisual = (service = {}) => {
  const searchableText = [
    service.title,
    service.slug,
    service.category,
    service.shortDescription,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    serviceVisuals.find((visual) =>
      visual.keywords.some((keyword) => searchableText.includes(keyword)),
    ) || defaultVisual
  );
};

const getImageUrl = (service = {}) => {
  if (typeof service.image === "string") {
    return service.image;
  }

  return (
    service.image?.url ||
    service.image?.secure_url ||
    service.thumbnail?.url ||
    service.thumbnail ||
    ""
  );
};

const getDescription = (service = {}) => {
  return (
    service.shortDescription ||
    service.metaDescription ||
    service.description ||
    "Professional assessment, counselling and personalised psychological support for children, adolescents and families."
  );
};

const getServiceHref = (service = {}) => {
  return service.slug ? `/services/${service.slug}` : "/contact-us";
};

const prepareServices = (services = []) => {
  const source =
    Array.isArray(services) && services.length ? services : fallbackServices;

  return source
    .filter((service) => service?.isActive !== false)
    .sort((first, second) => {
      if (first?.isFeatured && !second?.isFeatured) return -1;
      if (!first?.isFeatured && second?.isFeatured) return 1;

      return (
        Number(first?.displayOrder ?? 999) - Number(second?.displayOrder ?? 999)
      );
    })
    .slice(0, 6);
};

export default function ServicesOverview({ initialServices = [] }) {
  const services = useMemo(
    () => prepareServices(initialServices),
    [initialServices],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= services.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, services.length]);

  if (!services.length) {
    return null;
  }

  const activeService = services[activeIndex];
  const activeVisual = getVisual(activeService);
  const ActiveIcon = activeVisual.icon;
  const activeImage = getImageUrl(activeService);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-28 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F4B183]/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#0F3D5E]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-bold text-[#168F87] sm:text-sm">
              <Sparkles size={16} />
              Explore our services
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em] text-[#102A43] sm:text-4xl lg:text-5xl">
              Select a concern to discover the{" "}
              <span className="text-[#168F87]">right support.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Hover over or tap a service to explore how Dr. Vini supports
              children, adolescents and families.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition duration-300 hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
          >
            View All Services
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Interactive explorer */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          {/* Service navigation */}
          <div className="rounded-4xl border border-[#0F3D5E]/10 bg-[#F7FBFC] p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between px-3 py-2">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#168F87]">
                  Choose a service
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Tap any option to explore
                </p>
              </div>

              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#0F3D5E] shadow-sm">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(services.length).padStart(2, "0")}
              </span>
            </div>

            <div className="space-y-2">
              {services.map((service, index) => {
                const visual = getVisual(service);
                const Icon = visual.icon;
                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={service._id || service.slug || service.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    aria-pressed={isActive}
                    className={`relative flex w-full items-center gap-4 overflow-hidden rounded-[1.4rem] p-4 text-left transition duration-300 ${
                      isActive
                        ? "bg-[#0F3D5E] text-white shadow-xl shadow-[#0F3D5E]/18"
                        : "bg-white text-[#102A43] hover:shadow-md"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-service-line"
                        className="absolute bottom-0 left-0 top-0 w-1.5 bg-[#2CB1A6]"
                      />
                    )}

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
                        isActive
                          ? "bg-white/12 text-[#7DE0D6]"
                          : "bg-[#E9F8F6] text-[#168F87]"
                      }`}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p
                          className={`truncate text-sm font-black sm:text-base ${
                            isActive ? "text-white" : "text-[#102A43]"
                          }`}
                        >
                          {service.title}
                        </p>

                        {service.isFeatured && (
                          <span
                            className={`hidden rounded-full px-2 py-1 text-[10px] font-black sm:inline-flex ${
                              isActive
                                ? "bg-white/10 text-[#F4B183]"
                                : "bg-[#FFF3E8] text-[#B96A24]"
                            }`}
                          >
                            Popular
                          </span>
                        )}
                      </div>

                      <p
                        className={`mt-1 truncate text-xs font-semibold ${
                          isActive ? "text-white/60" : "text-slate-500"
                        }`}
                      >
                        {service.category || visual.label}
                      </p>
                    </div>

                    <ChevronRight
                      size={19}
                      className={`shrink-0 transition duration-300 ${
                        isActive
                          ? "translate-x-1 text-[#7DE0D6]"
                          : "text-slate-400"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Dynamic preview */}
          <div className="relative min-h-137.5 overflow-hidden rounded-[2.5rem] bg-[#0F3D5E] shadow-[0_30px_80px_rgba(15,61,94,0.2)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService._id || activeService.slug || activeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                {activeImage ? (
                  <>
                    <Image
                      src={activeImage}
                      alt={activeService.title || "Psychological service"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 760px"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#071F33] via-[#071F33]/75 to-[#071F33]/15" />
                  </>
                ) : (
                  <>
                    <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#2CB1A6]/30 blur-3xl" />

                    <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-[#F4B183]/15 blur-3xl" />

                    <motion.div
                      initial={{ rotate: -8, scale: 0.9 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute right-8 top-20 text-white/5 sm:right-14"
                    >
                      <ActiveIcon size={300} strokeWidth={0.65} />
                    </motion.div>
                  </>
                )}

                <div className="relative flex min-h-137.5 h-full flex-col justify-between p-7 text-white sm:p-9 lg:p-11">
                  <div className="flex items-start justify-between gap-4">
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white/12 text-[#7DE0D6] backdrop-blur"
                    >
                      <ActiveIcon size={29} />
                    </motion.div>

                    <motion.span
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#7DE0D6] backdrop-blur"
                    >
                      {activeService.category || activeVisual.label}
                    </motion.span>
                  </div>

                  <div className="max-w-2xl">
                    <motion.p
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.05 }}
                      className="text-xs font-black uppercase tracking-[0.2em] text-[#7DE0D6]"
                    >
                      Service {String(activeIndex + 1).padStart(2, "0")}
                    </motion.p>

                    <motion.h3
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl"
                    >
                      {activeService.title}
                    </motion.h3>

                    <motion.p
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className="mt-5 max-w-xl text-sm font-semibold leading-7 text-white/75 sm:text-base sm:leading-8"
                    >
                      {getDescription(activeService)}
                    </motion.p>

                    <motion.div
                      initial={{ y: 18, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-8 flex flex-col gap-3 sm:flex-row"
                    >
                      <Link
                        href={getServiceHref(activeService)}
                        className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                      >
                        Explore Service
                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>

                      <Link
                        href="/contact-us"
                        className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
                      >
                        <CalendarCheck size={17} />
                        Book Consultation
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress indicators */}
            <div className="absolute bottom-5 right-5 z-20 hidden items-center gap-2 sm:flex">
              {services.map((service, index) => (
                <button
                  key={`indicator-${service._id || service.slug || index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${service.title}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "w-8 bg-[#7DE0D6]"
                      : "w-2 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile quick service links */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2 lg:hidden">
          {services.map((service, index) => {
            const visual = getVisual(service);
            const Icon = visual.icon;

            return (
              <button
                key={`mobile-${service._id || service.slug || index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`flex min-w-42.5 items-center gap-3 rounded-2xl border p-3 text-left transition ${
                  activeIndex === index
                    ? "border-[#2CB1A6] bg-[#E9F8F6]"
                    : "border-[#0F3D5E]/10 bg-white"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#168F87] shadow-sm">
                  <Icon size={19} />
                </div>

                <p className="line-clamp-2 text-xs font-black leading-5 text-[#102A43]">
                  {service.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Guidance CTA */}
        <div className="mt-10 grid items-center gap-6 rounded-4xl border border-[#2CB1A6]/15 bg-[#E9F8F6]/65 p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#168F87] shadow-sm">
              <HeartHandshake size={25} />
            </div>

            <div>
              <h3 className="text-xl font-black text-[#102A43]">
                Still unsure which service is suitable?
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                Share what you are noticing. The clinic will guide you toward
                consultation, assessment, counselling or therapy.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#0F3D5E]/15 transition hover:-translate-y-1 hover:bg-[#102A43]"
            >
              <CalendarCheck size={18} />
              Get Guidance
            </Link>

            <a
              href="https://wa.me/917999215093?text=Hello%20Dr.%20Vini%2C%20I%20am%20not%20sure%20which%20service%20is%20suitable."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:border-[#2CB1A6]/40"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
