"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  BookOpenCheck,
  CheckCircle2,
  Download,
  FileText,
  Mail,
  PlayCircle,
  Sparkles,
  Video,
} from "lucide-react";

const resources = [
  {
    title: "Autism Signs Checklist",
    type: "Checklist",
    description:
      "A parent-friendly checklist to notice early social, communication and behavioural signs.",
    icon: Baby,
    tag: "Autism",
  },
  {
    title: "ADHD Signs Checklist",
    type: "Checklist",
    description:
      "Simple signs to understand attention, hyperactivity and impulsivity concerns in children.",
    icon: CheckCircle2,
    tag: "ADHD",
  },
  {
    title: "Positive Parenting Guide",
    type: "PDF Guide",
    description:
      "Helpful parenting tips for routines, discipline, communication and emotional connection.",
    icon: BookOpenCheck,
    tag: "Parents",
  },
  {
    title: "Child Activity Sheets",
    type: "Activity PDF",
    description:
      "Printable activity sheets for emotional expression, focus building and child engagement.",
    icon: FileText,
    tag: "Children",
  },
];

const videos = [
  {
    title: "Understanding Child Behaviour",
    duration: "8 min",
  },
  {
    title: "How Parents Can Support ADHD",
    duration: "10 min",
  },
  {
    title: "Autism Awareness for Families",
    duration: "12 min",
  },
];

export default function ResourcesPage() {
  return (
    <main className="bg-[#F7FBFC]">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-24">
        <div className="absolute -left-30 -top-30 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl" />
        <div className="absolute -right-30 top-20 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D5E] shadow-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Free Resources
            </div>

            <h1 className="mx-auto max-w-5xl text-5xl font-black tracking-tight text-[#102A43] md:text-7xl">
              Helpful tools for{" "}
              <span className="bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
                parents, children & families.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Download checklists, parenting guides, activity sheets and watch
              helpful videos to understand child development and emotional
              wellbeing better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="relative z-10 -mt-10 px-5">
        <div className="mx-auto max-w-7xl rounded-4xl border border-white bg-white/90 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {resources.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group rounded-3xl bg-[#F7FBFC] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5"
                >
                  <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white">
                    <Icon size={24} />
                  </div>

                  <div className="mb-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-[#2CB1A6]">
                    {item.tag}
                  </div>

                  <h3 className="text-xl font-black text-[#102A43]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] transition group-hover:bg-[#0F3D5E] group-hover:text-white"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Resources Section */}
      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-12">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D5E] shadow-sm">
                <FileText size={16} className="text-[#2CB1A6]" />
                Resource Library
              </div>

              <h2 className="max-w-3xl text-4xl font-black tracking-tight text-[#102A43] md:text-6xl">
                Free downloads for everyday guidance.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Later these resources can be managed from backend/admin panel.
                Abhi ye static UI demo hai.
              </p>
            </div>

            <div className="grid gap-7 md:grid-cols-2">
              {resources.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className="group overflow-hidden rounded-4xl border border-white bg-white p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
                  >
                    <div className="relative mb-6 min-h-55 overflow-hidden rounded-3xl bg-linear-to-br from-[#0F3D5E] via-[#2CB1A6] to-[#F4B183] p-6 text-white">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_35%)]" />

                      <div className="relative flex h-full min-h-42.5 flex-col justify-between">
                        <span className="w-fit rounded-full bg-white/20 px-4 py-2 text-xs font-black backdrop-blur-xl">
                          {item.type}
                        </span>

                        <Icon size={52} className="text-white/90" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-[#102A43]">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-base leading-7 text-slate-600">
                      {item.description}
                    </p>

                    <button
                      type="button"
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1"
                    >
                      <Download size={16} />
                      Download PDF
                      <ArrowRight size={16} />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-4xl bg-[#0F3D5E] p-7 text-white shadow-2xl shadow-blue-950/20">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <Mail size={26} className="text-[#F4B183]" />
              </div>

              <h3 className="text-2xl font-black">Get resources by email</h3>

              <p className="mt-4 text-sm leading-7 text-white/75">
                Visitors can enter email to receive parenting guides, checklists
                and activity sheets.
              </p>

              <input
                type="email"
                placeholder="Email address"
                className="mt-6 w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#F4B183]"
              />

              <button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-black text-[#0F3D5E]"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="rounded-4xl border border-white bg-white p-7 shadow-xl shadow-slate-900/5">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7FBFC] text-[#0F3D5E]">
                <PlayCircle size={26} />
              </div>

              <h3 className="text-2xl font-black text-[#102A43]">
                Video Library
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                YouTube videos can be embedded here later.
              </p>

              <div className="mt-6 space-y-4">
                {videos.map((video) => (
                  <div
                    key={video.title}
                    className="rounded-2xl bg-[#F7FBFC] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0F3D5E] shadow-sm">
                        <Video size={18} />
                      </div>

                      <div>
                        <h4 className="text-sm font-black text-[#102A43]">
                          {video.title}
                        </h4>
                        <p className="mt-1 text-xs font-semibold text-slate-500">
                          {video.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-5 py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#0F3D5E] p-8 text-white shadow-2xl shadow-blue-950/20 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h2 className="text-4xl font-black md:text-5xl">
                Need personalised guidance?
              </h2>

              <p className="mt-5 max-w-2xl text-white/70">
                Free resources can help you understand signs, but consultation
                gives personalised direction for your child or family.
              </p>
            </div>

            <div className="flex md:justify-end">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1"
              >
                Book Consultation
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
