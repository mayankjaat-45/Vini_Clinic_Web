"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Brain,
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  Home,
  Lightbulb,
  MessageCircle,
  Quote,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

const testimonials = [
  {
    name: "Parent of a young child",
    role: "Child behaviour support",
    text: "The consultation helped us understand that our child was not being difficult intentionally. We received clear guidance, practical home strategies and a calmer way to support our child.",
    rating: 5,
    tag: "Behaviour",
  },
  {
    name: "Parent consultation",
    role: "Learning & attention concerns",
    text: "The assessment process gave us clarity about our child’s learning needs. Dr. Vini explained everything patiently and helped us understand the next steps without fear or confusion.",
    rating: 5,
    tag: "Assessment",
  },
  {
    name: "Adolescent counselling",
    role: "Emotional support",
    text: "The counselling space felt safe, respectful and non-judgmental. It helped in better communication, emotional regulation and confidence during a difficult phase.",
    rating: 5,
    tag: "Counselling",
  },
];

const visualStories = [
  {
    icon: Brain,
    title: "Behaviour concern",
    before: "Parents felt the child was not listening.",
    helped: "Triggers and patterns were understood.",
    progress: "Home responses became calmer and more structured.",
  },
  {
    icon: BookOpenCheck,
    title: "Learning difficulty",
    before: "The child avoided reading, writing and homework.",
    helped: "Assessment helped identify learning needs clearly.",
    progress: "Parents and school got a practical support direction.",
  },
  {
    icon: HeartHandshake,
    title: "Emotional struggle",
    before: "The child had outbursts and low confidence.",
    helped: "Counselling created a safe space to express feelings.",
    progress: "Communication and emotional regulation improved gradually.",
  },
];

const progressFlow = [
  {
    icon: MessageCircle,
    title: "Concern shared",
    text: "Parents explain what they are noticing.",
  },
  {
    icon: Lightbulb,
    title: "Reason understood",
    text: "Behaviour is understood before correction.",
  },
  {
    icon: Home,
    title: "Home strategies",
    text: "Parents get practical guidance.",
  },
  {
    icon: TrendingUp,
    title: "Small progress",
    text: "Changes are reviewed step by step.",
  },
];

const trustBadges = [
  {
    icon: Star,
    text: "4.9★ Google Rating",
    rating: true,
  },
  {
    icon: ShieldCheck,
    text: "RCI Registered",
  },
  {
    icon: Sparkles,
    text: "Trusted Since 2013",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-5 sm:py-18 md:py-22">
      <div className="absolute -left-30 top-20 h-72 w-72 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-30 bottom-20 h-72 w-72 rounded-full bg-[#F4B183]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
            <HeartHandshake size={16} className="text-[#2CB1A6]" />
            Trusted by Families
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl md:text-6xl">
            Parents come with worry.{" "}
            <span className="bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
              They leave with clarity.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            Instead of long stories, here is a simple visual view of what often
            changes: the concern is understood, a plan is created, and small
            progress begins.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;

              return (
                <span
                  key={badge.text}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0F3D5E]/10 bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm"
                >
                  <Icon
                    size={16}
                    className={
                      badge.rating
                        ? "fill-[#F4B183] text-[#F4B183]"
                        : "text-[#2CB1A6]"
                    }
                  />
                  {badge.text}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* Visual Progress Flow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-12 rounded-[2rem] bg-[#0F3D5E] p-5 text-white shadow-2xl shadow-blue-950/15 sm:mt-16 sm:p-6 md:rounded-[2.5rem] md:p-8"
        >
          <div className="mb-6 flex flex-col gap-3 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-[#F4B183]">
                <Sparkles size={14} />
                Visual progress journey
              </p>

              <h3 className="mt-4 text-2xl font-black sm:text-3xl">
                How clarity usually begins
              </h3>
            </div>

            <p className="mx-auto max-w-xl text-sm font-semibold leading-6 text-white/70 lg:mx-0">
              This flow helps parents understand the support journey quickly,
              without reading a long explanation.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {progressFlow.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="relative">
                  {index !== progressFlow.length - 1 && (
                    <ArrowRight
                      size={18}
                      className="absolute -right-3 top-10 z-10 hidden text-white/45 lg:block"
                    />
                  )}

                  <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0F3D5E]">
                      <Icon size={24} />
                    </div>

                    <p className="mt-3 text-sm font-black">
                      {String(index + 1).padStart(2, "0")}. {item.title}
                    </p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-white/65">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Before / Helped / Progress Cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {visualStories.map((story, index) => {
            const Icon = story.icon;

            return (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#2CB1A6] transition group-hover:bg-[#2CB1A6] group-hover:text-white">
                    <Icon size={26} />
                  </div>

                  <span className="rounded-full bg-[#F7FBFC] px-3 py-1 text-xs font-black text-[#0F3D5E]">
                    Story {index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#102A43]">
                  {story.title}
                </h3>

                <div className="mt-5 space-y-3">
                  <div className="rounded-3xl bg-[#FFF3E8] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#B96A24]">
                      Before
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#8A4A16]">
                      {story.before}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-[#F7FBFC] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                      What helped
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {story.helped}
                    </p>
                  </div>

                  <div className="rounded-3xl bg-[#E9F8F6] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F766E]">
                      Progress
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#0F766E]">
                      {story.progress}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reviews */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10 sm:p-6"
            >
              <div className="absolute right-5 top-5 text-[#2CB1A6]/10">
                <Quote size={76} />
              </div>

              <div className="relative">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={17}
                        className="fill-[#F4B183] text-[#F4B183]"
                      />
                    ))}
                  </div>

                  <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                    {item.tag}
                  </span>
                </div>

                <p className="text-sm font-semibold leading-7 text-slate-600 sm:min-h-38 sm:text-base">
                  “{item.text}”
                </p>

                <div className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#0F3D5E] to-[#2CB1A6] text-lg font-black text-white">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-black text-[#102A43]">{item.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-14 overflow-hidden rounded-[2rem] bg-[#F7FBFC] p-5 shadow-xl shadow-slate-900/5 sm:mt-16 sm:p-7 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
                <SmilePlus size={16} className="text-[#2CB1A6]" />
                Progress Stories
              </div>

              <h3 className="text-3xl font-black leading-tight text-[#102A43] sm:text-4xl">
                Progress can be small, but meaningful.
              </h3>

              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                Many families first come with confusion. The first change is
                often clarity — understanding why the child is struggling and
                what support can help.
              </p>

              <a
                href="/success-stories"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:bg-[#102A43]"
              >
                View Success Stories
                <ArrowRight size={17} />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {["Clarity", "Guidance", "Progress"].map((item, index) => (
                <div
                  key={item}
                  className="rounded-[1.6rem] bg-white p-5 text-center shadow-sm"
                >
                  <p className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F8F6] text-sm font-black text-[#0F766E]">
                    <CheckCircle2 size={22} />
                  </p>

                  <h4 className="text-lg font-black text-[#102A43]">
                    {item}
                  </h4>

                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                    {index === 0 &&
                      "Parents understand what may be happening."}
                    {index === 1 &&
                      "A practical support direction is discussed."}
                    {index === 2 &&
                      "Small changes are reviewed step by step."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-12 overflow-hidden rounded-[2rem] bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-6 text-white shadow-2xl shadow-blue-950/20 sm:p-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-7 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h3 className="text-2xl font-black leading-tight sm:text-3xl">
                Not sure what your child needs?
              </h3>

              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/70 sm:text-base">
                Book a consultation or send a WhatsApp message. Share what you
                are noticing, and we will help you understand the right next
                step.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
              >
                <CalendarCheck size={18} />
                Book Consultation
              </a>

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
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;