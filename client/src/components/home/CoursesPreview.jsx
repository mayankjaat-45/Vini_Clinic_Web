"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  GraduationCap,
  Laptop,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

const fallbackCourses = [
  {
    title: "Child Psychology Internship",
    category: "Students",
    mode: "Online / Offline",
    duration: "Structured program",
    shortDescription:
      "Practical learning for psychology students through case discussions, observation, assessments and supervised activities.",
    highlights: [
      "Direct professional supervision",
      "Real clinical exposure",
      "Structured learning modules",
    ],
  },
  {
    title: "Parent Training Program",
    category: "Parents",
    mode: "Online / Offline",
    duration: "Short-term program",
    shortDescription:
      "Practical guidance for parents managing behaviour, emotions, routines, communication and developmental concerns.",
    highlights: [
      "Home-based strategies",
      "Behaviour guidance",
      "Parent-child communication",
    ],
  },
  {
    title: "Teacher Training Workshop",
    category: "Educators",
    mode: "School / Online",
    duration: "Workshop",
    shortDescription:
      "Training for teachers to identify learning, behavioural, emotional and developmental concerns in the classroom.",
    highlights: [
      "Early identification",
      "Classroom accommodations",
      "Child-sensitive communication",
    ],
  },
];

const categoryVisuals = [
  {
    keywords: ["internship", "student", "psychology"],
    icon: GraduationCap,
    label: "Psychology Students",
  },
  {
    keywords: ["parent"],
    icon: Users,
    label: "Parents & Caregivers",
  },
  {
    keywords: ["teacher", "school", "educator"],
    icon: BookOpenCheck,
    label: "Teachers & Schools",
  },
  {
    keywords: ["workshop", "course", "training"],
    icon: Award,
    label: "Professional Learning",
  },
];

const defaultVisual = {
  icon: GraduationCap,
  label: "Learning Program",
};

const getCourseVisual = (course = {}) => {
  const searchableText = [
    course.title,
    course.category,
    course.programType,
    course.shortDescription,
    course.description,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return (
    categoryVisuals.find((visual) =>
      visual.keywords.some((keyword) => searchableText.includes(keyword)),
    ) || defaultVisual
  );
};

const getCourseImage = (course = {}) => {
  if (typeof course.image === "string") {
    return course.image;
  }

  return (
    course.image?.url ||
    course.image?.secure_url ||
    course.thumbnail?.url ||
    course.thumbnail ||
    ""
  );
};

const getCourseDescription = (course = {}) => {
  return (
    course.shortDescription ||
    course.description ||
    course.metaDescription ||
    "A structured learning experience designed around practical understanding, professional guidance and real-world application."
  );
};

const getCourseMode = (course = {}) => {
  if (Array.isArray(course.mode)) {
    return course.mode.join(" / ");
  }

  if (Array.isArray(course.modes)) {
    return course.modes.join(" / ");
  }

  return (
    course.mode ||
    course.deliveryMode ||
    course.preferredMode ||
    "Online / Offline"
  );
};

const getCourseDuration = (course = {}) => {
  return (
    course.duration ||
    course.courseDuration ||
    course.programDuration ||
    "Structured program"
  );
};

const normalizeHighlights = (course = {}) => {
  const source =
    course.highlights ||
    course.learningOutcomes ||
    course.features ||
    course.benefits ||
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
    "Structured professional guidance",
    "Practical learning activities",
    "Clear learning outcomes",
  ];
};

const prepareCourses = (courses = []) => {
  const source =
    Array.isArray(courses) && courses.length ? courses : fallbackCourses;

  return source
    .filter((course) => course?.isActive !== false)
    .sort((first, second) => {
      if (first?.isFeatured && !second?.isFeatured) return -1;
      if (!first?.isFeatured && second?.isFeatured) return 1;

      return (
        Number(first?.displayOrder ?? 999) - Number(second?.displayOrder ?? 999)
      );
    })
    .slice(0, 5);
};

export default function CoursesPreview({ initialCourses = [] }) {
  const courses = useMemo(
    () => prepareCourses(initialCourses),
    [initialCourses],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= courses.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, courses.length]);

  if (!courses.length) {
    return null;
  }

  const activeCourse = courses[activeIndex];
  const activeVisual = getCourseVisual(activeCourse);
  const ActiveIcon = activeVisual.icon;
  const activeImage = getCourseImage(activeCourse);
  const highlights = normalizeHighlights(activeCourse);

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/8 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F4B183]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-bold text-[#168F87] sm:text-sm">
              <Sparkles size={16} />
              Courses, training and internships
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em] text-[#102A43] sm:text-4xl lg:text-5xl">
              Learn child psychology through{" "}
              <span className="text-[#168F87]">
                structured practical guidance.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Explore professional programs for psychology students, parents,
              teachers and individuals interested in child development and
              mental health.
            </p>
          </div>

          <Link
            href="/workshops-and-courses"
            className="group inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition duration-300 hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
          >
            Explore All Programs
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Interactive course explorer */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          {/* Program selection */}
          <div className="rounded-4xl border border-[#0F3D5E]/10 bg-[#F7FBFC] p-3 sm:p-4">
            <div className="flex items-center justify-between gap-4 px-3 py-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#168F87]">
                  Select a program
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Tap any option to explore
                </p>
              </div>

              <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#0F3D5E] shadow-sm">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(courses.length).padStart(2, "0")}
              </span>
            </div>

            <div className="space-y-2">
              {courses.map((course, index) => {
                const visual = getCourseVisual(course);
                const Icon = visual.icon;
                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={course._id || course.slug || course.title}
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
                        : "bg-white text-[#102A43] hover:shadow-md"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-course-line"
                        className="absolute inset-y-0 left-0 w-1.5 bg-[#2CB1A6]"
                      />
                    )}

                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        isActive
                          ? "bg-white/12 text-[#7DE0D6]"
                          : "bg-[#E9F8F6] text-[#168F87]"
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
                        {course.title}
                      </p>

                      <p
                        className={`mt-1 truncate text-xs font-semibold ${
                          isActive ? "text-white/60" : "text-slate-500"
                        }`}
                      >
                        {course.category || visual.label}
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

          {/* Dynamic program panel */}
          <div className="relative min-h-147.5 overflow-hidden rounded-[2.5rem] bg-[#0F3D5E] shadow-[0_30px_80px_rgba(15,61,94,0.2)]">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeCourse._id || activeCourse.slug || activeIndex}
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
                      alt={activeCourse.title || "Psychology learning program"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 760px"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#071F33] via-[#071F33]/85 to-[#071F33]/20" />
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

                <div className="relative flex min-h-147.5 h-full flex-col p-7 text-white sm:p-9 lg:p-11">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white/12 text-[#7DE0D6] backdrop-blur">
                      <ActiveIcon size={29} />
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#7DE0D6] backdrop-blur">
                      {activeCourse.category || activeVisual.label}
                    </span>
                  </div>

                  <div className="mt-10 max-w-2xl">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B183]">
                      Featured learning program
                    </p>

                    <h3 className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                      {activeCourse.title}
                    </h3>

                    <p className="mt-5 text-sm font-semibold leading-7 text-white/74 sm:text-base sm:leading-8">
                      {getCourseDescription(activeCourse)}
                    </p>

                    {/* Program details */}
                    <div className="mt-7 flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-bold text-white/85 backdrop-blur">
                        <Laptop size={15} className="text-[#7DE0D6]" />
                        {getCourseMode(activeCourse)}
                      </span>

                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-bold text-white/85 backdrop-blur">
                        <Clock3 size={15} className="text-[#7DE0D6]" />
                        {getCourseDuration(activeCourse)}
                      </span>

                      {activeCourse.location && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-bold text-white/85 backdrop-blur">
                          <MapPin size={15} className="text-[#7DE0D6]" />
                          {activeCourse.location}
                        </span>
                      )}
                    </div>

                    {/* Highlights */}
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {highlights.map((item, index) => (
                        <motion.div
                          key={`${activeCourse.title}-${item}`}
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

                  <div className="mt-auto flex flex-col gap-3 pt-9 sm:flex-row">
                    <Link
                      href="/workshops-and-courses"
                      className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                    >
                      View Program Details
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
                      Enquire Now
                    </Link>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>

            {/* Progress indicators */}
            <div className="absolute bottom-5 right-5 z-20 hidden items-center gap-2 sm:flex">
              {courses.map((course, index) => (
                <button
                  key={`course-dot-${course._id || course.slug || index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${course.title}`}
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

        {/* Program assurance strip */}
        <div className="mt-10 grid overflow-hidden rounded-4xl border border-[#0F3D5E]/10 bg-[#F7FBFC] sm:grid-cols-3">
          {[
            {
              icon: BadgeCheck,
              title: "Professional guidance",
              description: "Learn directly under experienced supervision",
            },
            {
              icon: BookOpenCheck,
              title: "Structured learning",
              description: "Clear modules, activities and learning outcomes",
            },
            {
              icon: Award,
              title: "Practical exposure",
              description: "Connect psychological concepts with real practice",
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
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#168F87] shadow-sm">
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
