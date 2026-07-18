"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  HeartHandshake,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

const fallbackResources = [
  {
    title: "Child Development Milestone Guide",
    slug: "child-development-milestone-guide",
    category: "Development",
    shortDescription:
      "A practical guide to understanding early speech, play, social, emotional and developmental milestones.",
    resourceType: "PDF Guide",
    fileSize: "2.4 MB",
    highlights: [
      "Age-wise developmental milestones",
      "Signs that may need attention",
      "When to seek professional guidance",
    ],
  },
  {
    title: "ADHD Parent Checklist",
    slug: "adhd-parent-checklist",
    category: "Attention & Behaviour",
    shortDescription:
      "A simple parent checklist covering attention, hyperactivity, impulsivity and everyday behaviour.",
    resourceType: "Printable Checklist",
    fileSize: "1.2 MB",
    highlights: [
      "Home and school observations",
      "Attention and impulse-control signs",
      "Questions to discuss during consultation",
    ],
  },
  {
    title: "Learning Difficulty Observation Sheet",
    slug: "learning-difficulty-observation-sheet",
    category: "Learning",
    shortDescription:
      "A structured observation sheet for reading, writing, spelling, memory and classroom difficulties.",
    resourceType: "Worksheet",
    fileSize: "1.8 MB",
    highlights: [
      "Reading and writing observations",
      "School performance indicators",
      "Useful notes for assessment",
    ],
  },
];

const resourceVisuals = [
  {
    keywords: ["development", "milestone", "speech", "early"],
    icon: HeartHandshake,
    label: "Development Guide",
  },
  {
    keywords: ["adhd", "attention", "behaviour", "hyperactivity"],
    icon: Brain,
    label: "Behaviour Checklist",
  },
  {
    keywords: ["learning", "dyslexia", "reading", "writing", "school"],
    icon: BookOpen,
    label: "Learning Resource",
  },
  {
    keywords: ["assessment", "checklist", "worksheet"],
    icon: FileText,
    label: "Assessment Resource",
  },
];

const defaultVisual = {
  icon: FileText,
  label: "Parent Resource",
};

const getResourceVisual = (resource = {}) => {
  const searchableText = [
    resource.title,
    resource.slug,
    resource.category,
    resource.shortDescription,
    resource.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    resourceVisuals.find((visual) =>
      visual.keywords.some((keyword) => searchableText.includes(keyword)),
    ) || defaultVisual
  );
};

const getResourceImage = (resource = {}) => {
  if (typeof resource.image === "string") {
    return resource.image;
  }

  return (
    resource.image?.url ||
    resource.image?.secure_url ||
    resource.thumbnail?.url ||
    resource.thumbnail ||
    resource.coverImage?.url ||
    resource.coverImage ||
    ""
  );
};

const getResourceDescription = (resource = {}) => {
  return (
    resource.shortDescription ||
    resource.description ||
    resource.metaDescription ||
    "A practical resource designed to help parents understand concerns and prepare for the right support."
  );
};

const getResourceType = (resource = {}) => {
  return (
    resource.resourceType ||
    resource.type ||
    resource.fileType ||
    resource.format ||
    "PDF Resource"
  );
};

const getFileSize = (resource = {}) => {
  return resource.fileSize || resource.size || "Downloadable guide";
};

const getHighlights = (resource = {}) => {
  const source =
    resource.highlights ||
    resource.features ||
    resource.benefits ||
    resource.learningPoints ||
    [];

  if (Array.isArray(source) && source.length) {
    return source
      .map((item) => {
        if (typeof item === "string") return item;

        return item?.title || item?.text || item?.name || "";
      })
      .filter(Boolean)
      .slice(0, 4);
  }

  return [
    "Easy-to-understand parent guidance",
    "Practical observations and next steps",
    "Useful before consultation or assessment",
  ];
};

const getResourceUrl = (resource = {}) => {
  return (
    resource.downloadUrl ||
    resource.fileUrl ||
    resource.file?.url ||
    resource.pdf?.url ||
    resource.externalUrl ||
    ""
  );
};

const getResourcePageHref = (resource = {}) => {
  if (resource.slug) {
    return `/free-resources/${resource.slug}`;
  }

  return "/free-resources";
};

const prepareResources = (resources = []) => {
  const source =
    Array.isArray(resources) && resources.length
      ? resources
      : fallbackResources;

  return source
    .filter((resource) => resource?.isActive !== false)
    .sort((first, second) => {
      if (first?.isFeatured && !second?.isFeatured) return -1;
      if (!first?.isFeatured && second?.isFeatured) return 1;

      return (
        Number(first?.displayOrder ?? 999) - Number(second?.displayOrder ?? 999)
      );
    })
    .slice(0, 5);
};

export default function ResourcesPreview({ initialResources = [] }) {
  const resources = useMemo(
    () => prepareResources(initialResources),
    [initialResources],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= resources.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, resources.length]);

  if (!resources.length) {
    return null;
  }

  const activeResource = resources[activeIndex];
  const activeVisual = getResourceVisual(activeResource);
  const ActiveIcon = activeVisual.icon;
  const activeImage = getResourceImage(activeResource);
  const highlights = getHighlights(activeResource);
  const resourceUrl = getResourceUrl(activeResource);

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F4B183]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#168F87] shadow-sm sm:text-sm">
              <Sparkles size={16} />
              Free parent resources
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em] text-[#102A43] sm:text-4xl lg:text-5xl">
              Practical guides to help you understand{" "}
              <span className="text-[#168F87]">what you are noticing.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Explore checklists, guides and observation tools designed to help
              parents understand developmental, behavioural, emotional and
              learning concerns.
            </p>
          </div>

          <Link
            href="/free-resources"
            className="group inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition duration-300 hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
          >
            Browse All Resources
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Interactive resource explorer */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          {/* Resource navigator */}
          <div className="rounded-4xl border border-[#0F3D5E]/10 bg-white p-3 shadow-[0_20px_60px_rgba(15,61,94,0.07)] sm:p-4">
            <div className="flex items-center justify-between gap-4 px-3 py-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#168F87]">
                  Select a resource
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Preview before opening
                </p>
              </div>

              <span className="rounded-full bg-[#F7FBFC] px-3 py-1.5 text-xs font-black text-[#0F3D5E]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(resources.length).padStart(2, "0")}
              </span>
            </div>

            <div className="space-y-2">
              {resources.map((resource, index) => {
                const visual = getResourceVisual(resource);
                const Icon = visual.icon;
                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={resource._id || resource.slug || resource.title}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    aria-pressed={isActive}
                    className={`relative flex w-full items-center gap-4 overflow-hidden rounded-[1.4rem] p-4 text-left transition duration-300 ${
                      isActive
                        ? "bg-[#0F3D5E] text-white shadow-xl shadow-[#0F3D5E]/15"
                        : "bg-[#F7FBFC] text-[#102A43] hover:bg-white hover:shadow-md"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-resource-line"
                        className="absolute inset-y-0 left-0 w-1.5 bg-[#2CB1A6]"
                      />
                    )}

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        isActive
                          ? "bg-white/12 text-[#7DE0D6]"
                          : "bg-white text-[#168F87] shadow-sm"
                      }`}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`line-clamp-2 text-sm font-black leading-5 sm:text-base ${
                          isActive ? "text-white" : "text-[#102A43]"
                        }`}
                      >
                        {resource.title}
                      </p>

                      <p
                        className={`mt-1 truncate text-xs font-semibold ${
                          isActive ? "text-white/60" : "text-slate-500"
                        }`}
                      >
                        {resource.category || visual.label}
                      </p>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`shrink-0 transition ${
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
          <div className="relative min-h-150 overflow-hidden rounded-[2.5rem] bg-[#0F3D5E] shadow-[0_30px_80px_rgba(15,61,94,0.2)]">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeResource._id || activeResource.slug || activeIndex}
                initial={{
                  opacity: 0,
                  scale: 0.985,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.015,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="absolute inset-0"
              >
                {activeImage ? (
                  <>
                    <Image
                      src={activeImage}
                      alt={activeResource.title || "Free parent resource"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 760px"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#071F33] via-[#071F33]/88 to-[#071F33]/35" />
                  </>
                ) : (
                  <>
                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#2CB1A6]/25 blur-3xl" />

                    <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#F4B183]/15 blur-3xl" />

                    <motion.div
                      initial={{
                        rotate: -8,
                        scale: 0.9,
                      }}
                      animate={{
                        rotate: 0,
                        scale: 1,
                      }}
                      className="absolute -bottom-12 -right-8 text-white/4.5"
                    >
                      <ActiveIcon size={360} strokeWidth={0.65} />
                    </motion.div>
                  </>
                )}

                <div className="relative flex min-h-150 h-full flex-col p-7 text-white sm:p-9 lg:p-11">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white/12 text-[#7DE0D6] backdrop-blur">
                      <ActiveIcon size={29} />
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#7DE0D6] backdrop-blur">
                      {activeResource.category || activeVisual.label}
                    </span>
                  </div>

                  <div className="mt-10 max-w-2xl">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B183]">
                      Free downloadable resource
                    </p>

                    <h3 className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                      {activeResource.title}
                    </h3>

                    <p className="mt-5 text-sm font-semibold leading-7 text-white/74 sm:text-base sm:leading-8">
                      {getResourceDescription(activeResource)}
                    </p>

                    {/* File information */}
                    <div className="mt-7 flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-bold text-white/85 backdrop-blur">
                        <FileText size={15} className="text-[#7DE0D6]" />
                        {getResourceType(activeResource)}
                      </span>

                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-bold text-white/85 backdrop-blur">
                        <Download size={15} className="text-[#7DE0D6]" />
                        {getFileSize(activeResource)}
                      </span>

                      {activeResource.requiresForm && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-bold text-white/85 backdrop-blur">
                          <LockKeyhole size={15} className="text-[#7DE0D6]" />
                          Details required
                        </span>
                      )}
                    </div>

                    {/* Highlights */}
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {highlights.map((item, index) => (
                        <motion.div
                          key={`${activeResource.title}-${item}`}
                          initial={{
                            opacity: 0,
                            x: -12,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: 0.1 + index * 0.07,
                          }}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#168F87]">
                            <CheckCircle2 size={16} />
                          </span>

                          <p className="text-sm font-bold leading-6 text-white/88">
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex flex-col gap-3 pt-9 sm:flex-row">
                    {resourceUrl ? (
                      <a
                        href={resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                      >
                        <Download size={17} />
                        Open Resource
                        <ExternalLink
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </a>
                    ) : (
                      <Link
                        href={getResourcePageHref(activeResource)}
                        className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                      >
                        View Resource
                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    )}

                    <Link
                      href="/free-resources"
                      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
                    >
                      Browse Library
                    </Link>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Progress indicators */}
            <div className="absolute bottom-5 right-5 z-20 hidden items-center gap-2 sm:flex">
              {resources.map((resource, index) => (
                <button
                  key={`resource-dot-${resource._id || resource.slug || index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${resource.title}`}
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

        {/* Resource trust strip */}
        <div className="mt-10 grid overflow-hidden rounded-4xl border border-[#0F3D5E]/10 bg-white sm:grid-cols-3">
          {[
            {
              icon: BadgeCheck,
              title: "Professionally prepared",
              description: "Resources created around common parent concerns",
            },
            {
              icon: BookOpen,
              title: "Simple to understand",
              description:
                "Clear language without unnecessary clinical complexity",
            },
            {
              icon: HeartHandshake,
              title: "Guidance, not diagnosis",
              description: "Resources help parents decide when to seek support",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-start gap-4 p-5 sm:p-6 ${
                  index !== 2
                    ? "border-b border-[#0F3D5E]/10 sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87]">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-black text-[#102A43]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
