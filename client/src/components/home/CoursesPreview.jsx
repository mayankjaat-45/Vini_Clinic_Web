"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Brain,
  CalendarCheck,
  GraduationCap,
  HeartHandshake,
  MessageCircle,
  School,
  Sparkles,
  Users,
} from "lucide-react";

const fallbackCourses = [
  {
    _id: "parent-training",
    title: "Parent Training Workshops",
    slug: "parent-training-workshops",
    category: "Parent Training",
    mode: "Hybrid",
    shortDescription:
      "Practical guidance for parents to understand behaviour, routines, emotions and communication at home.",
    duration: "Coming soon",
    icon: Users,
  },
  {
    _id: "teacher-training",
    title: "Teacher Training Programs",
    slug: "teacher-training-programs",
    category: "Teacher Training",
    mode: "Offline",
    shortDescription:
      "Training for educators to support children with learning, attention, behaviour and emotional needs.",
    duration: "Coming soon",
    icon: School,
  },
  {
    _id: "child-psychology-workshop",
    title: "Child Psychology Workshops",
    slug: "child-psychology-workshops",
    category: "Workshop",
    mode: "Online / Offline",
    shortDescription:
      "Awareness-based workshops on child development, emotional wellbeing and early intervention.",
    duration: "Coming soon",
    icon: Brain,
  },
];

const learningTracks = [
  {
    icon: Users,
    title: "For Parents",
    text: "Understand behaviour, routines, emotions and communication at home.",
  },
  {
    icon: School,
    title: "For Teachers",
    text: "Learn how to support children with learning, attention and classroom concerns.",
  },
  {
    icon: Baby,
    title: "For Psychology Learners",
    text: "Build practical understanding of child psychology and intervention support.",
  },
];

export default function CoursesPreview({ initialCourses = [] }) {
  const previewCourses = useMemo(() => {
    const activeCourses = initialCourses.filter(
      (course) => course?.isActive !== false,
    );

    const featured = activeCourses.filter((course) => course?.isFeatured);

    if (featured.length) return featured.slice(0, 3);
    if (activeCourses.length) return activeCourses.slice(0, 3);

    return fallbackCourses;
  }, [initialCourses]);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-5 sm:py-18 md:py-22">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Workshops, Courses & Training
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-6xl">
              Learn how to support children with more confidence.
            </h2>

            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              Practical learning programs for parents, teachers and psychology
              learners who want to understand child behaviour, emotions,
              learning needs and intervention support.
            </p>
          </div>

          <div className="rounded-4xl border border-[#2CB1A6]/15 bg-[#F7FBFC] p-5 shadow-xl shadow-slate-900/5">
            <h3 className="text-lg font-black text-[#102A43]">
              Upcoming batches
            </h3>

            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              Join the waitlist to receive updates when new workshops, parent
              training or teacher training sessions open.
            </p>

            <Link
              href="/workshops-and-courses"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
            >
              Join Waitlist
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Learning Track Strip */}
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {learningTracks.map((track) => {
            const Icon = track.icon;

            return (
              <div
                key={track.title}
                className="rounded-3xl border border-slate-100 bg-[#F7FBFC] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white">
                  <Icon size={21} />
                </div>

                <h3 className="text-lg font-black text-[#102A43]">
                  {track.title}
                </h3>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {track.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {previewCourses.map((course) => {
            const Icon = course.icon || GraduationCap;
            const hasRealCourse = Boolean(course._id && !course.icon);

            return (
              <Link
                key={course._id || course.slug || course.title}
                href={
                  hasRealCourse && course.slug
                    ? `/workshops-and-courses/${course.slug}`
                    : "/workshops-and-courses"
                }
                className="group overflow-hidden rounded-4xl bg-[#F7FBFC] shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="relative h-56 overflow-hidden bg-linear-to-br from-[#0F3D5E] to-[#168A83]">
                  {course.image?.url ? (
                    <Image
                      src={course.image.url}
                      alt={`${course.title} by Dr. Vini Jhariya`}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/80">
                      <Icon size={62} />
                    </div>
                  )}

                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black text-[#0F3D5E]">
                    {course.duration || "Coming soon"}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                      {course.category || "Workshop"}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0F3D5E]">
                      {course.mode || "Online / Offline"}
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-2xl font-black leading-tight text-[#102A43]">
                    {course.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                    {course.shortDescription ||
                      course.description ||
                      "Learn practical child psychology, counselling and intervention skills through guided workshops."}
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]">
                    {hasRealCourse ? "View Details" : "Join Waitlist"}
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-6 text-white shadow-2xl shadow-blue-950/20 sm:p-8 md:rounded-[2.5rem]">
          <div className="grid gap-7 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white">
                <HeartHandshake size={16} className="text-[#F4B183]" />
                Learn with guidance
              </div>

              <h3 className="text-2xl font-black leading-tight sm:text-3xl">
                Want updates when workshops open?
              </h3>

              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/70 sm:text-base">
                Join the waitlist and our team will share details about upcoming
                parent workshops, teacher training and psychology programs.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                href="/workshops-and-courses"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
              >
                <CalendarCheck size={18} />
                Join Waitlist
              </Link>

              <a
                href="https://wa.me/917999215093"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/15"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
