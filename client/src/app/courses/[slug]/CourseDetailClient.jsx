"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  IndianRupee,
  MapPin,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";

export default function CourseDetailClient({ course }) {
  const descriptionLines = useMemo(() => {
    if (!course?.description) return [];

    return course.description
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }, [course]);

  if (!course) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FBFC] px-5">
        <div className="max-w-xl rounded-4xl bg-white p-10 text-center shadow-xl">
          <GraduationCap className="mx-auto mb-4 text-[#0F3D5E]" size={46} />
          <h1 className="text-3xl font-black text-[#102A43]">
            Course not found
          </h1>
          <p className="mt-3 text-slate-600">
            This course may have been removed or hidden.
          </p>
          <Link
            href="/courses"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white"
          >
            <ArrowLeft size={16} />
            Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-5 py-20">
        <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/courses"
            className="mb-8 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]"
          >
            <ArrowLeft size={16} />
            Back to Courses
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
                <Sparkles size={16} className="text-[#2CB1A6]" />
                {course.category}
              </div>

              <h1 className="text-4xl font-black leading-tight text-[#102A43] md:text-6xl">
                {course.title}
              </h1>

              <p className="mt-6 text-xl font-semibold leading-9 text-slate-600">
                {course.shortDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-slate-500">
                {course.duration && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
                    <Clock size={16} />
                    {course.duration}
                  </span>
                )}

                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
                  <MapPin size={16} />
                  {course.mode}
                </span>

                {course.startDate && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
                    <CalendarDays size={16} />
                    {new Date(course.startDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-[3rem] bg-white p-4 shadow-2xl shadow-slate-900/10">
              {course.image?.url ? (
                <img
                  src={course.image.url}
                  alt={course.title}
                  className="h-80 w-full rounded-[2.4rem] object-cover"
                />
              ) : (
                <div className="flex h-80 items-center justify-center rounded-[2.4rem] bg-[#102A43] text-white/30">
                  <BookOpen size={70} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_340px]">
          <article className="rounded-[3rem] bg-white p-7 shadow-xl shadow-slate-900/5 md:p-12">
            <h2 className="mb-6 text-3xl font-black text-[#102A43]">
              Course Overview
            </h2>

            <div className="space-y-5">
              {descriptionLines.map((line, index) => {
                if (line.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="pt-5 text-3xl font-black text-[#102A43]"
                    >
                      {line.replace("## ", "")}
                    </h2>
                  );
                }

                if (line.startsWith("- ")) {
                  return (
                    <p
                      key={index}
                      className="rounded-2xl bg-[#F7FBFC] px-5 py-4 text-base font-semibold leading-8 text-slate-600"
                    >
                      {line.replace("- ", "• ")}
                    </p>
                  );
                }

                return (
                  <p
                    key={index}
                    className="text-lg font-semibold leading-9 text-slate-600"
                  >
                    {line}
                  </p>
                );
              })}
            </div>

            {course.modules?.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 text-3xl font-black text-[#102A43]">
                  What you will learn
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {course.modules.map((module, index) => (
                    <div
                      key={`${module.title}-${index}`}
                      className="rounded-2xl bg-[#F7FBFC] p-5"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F8F6] text-[#0F766E]">
                        <CheckCircle2 size={20} />
                      </div>

                      <h3 className="text-lg font-black text-[#102A43]">
                        {module.title}
                      </h3>

                      {module.description && (
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                          {module.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-4xl bg-[#0F3D5E] p-7 text-white shadow-xl shadow-blue-950/15">
              <GraduationCap className="mb-5 text-[#F4B183]" size={34} />

              <h3 className="text-2xl font-black">
                Interested in this course?
              </h3>

              <p className="mt-3 text-sm font-semibold leading-6 text-white/75">
                Send an enquiry and our team will share details, availability
                and next steps.
              </p>

              <a
                href={`https://wa.me/917999215093?text=${encodeURIComponent(
                  `Hello, I want to know more about the course: ${course.title}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white"
              >
                <MessageCircle size={17} />
                Enquire on WhatsApp
              </a>

              <Link
                href="/contact-us"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F3D5E]"
              >
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="rounded-4xl bg-white p-7 shadow-xl shadow-slate-900/5">
              <h3 className="mb-5 text-xl font-black text-[#102A43]">
                Course Details
              </h3>

              <div className="space-y-4">
                {course.duration && (
                  <InfoRow
                    icon={<Clock size={18} />}
                    label="Duration"
                    value={course.duration}
                  />
                )}

                <InfoRow
                  icon={<MapPin size={18} />}
                  label="Mode"
                  value={course.mode}
                />

                {course.eligibility && (
                  <InfoRow
                    icon={<Users size={18} />}
                    label="Eligibility"
                    value={course.eligibility}
                  />
                )}

                {course.fees && (
                  <InfoRow
                    icon={<IndianRupee size={18} />}
                    label="Fees"
                    value={course.fees}
                  />
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

const InfoRow = ({ icon, label, value }) => {
  return (
    <div className="flex gap-3 rounded-2xl bg-[#F7FBFC] p-4">
      <div className="text-[#0F766E]">{icon}</div>
      <div>
        <p className="text-xs font-black uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 text-sm font-black text-[#102A43]">{value}</p>
      </div>
    </div>
  );
};
