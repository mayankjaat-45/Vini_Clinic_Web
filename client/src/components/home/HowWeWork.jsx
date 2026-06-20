"use client";

import { motion } from "framer-motion";
import {
  MessageCircleHeart,
  ClipboardCheck,
  Route,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell us what you are noticing",
    description:
      "Share your child’s behaviour, emotional concern, learning difficulty, developmental issue, or family situation through the form, WhatsApp, or consultation request.",
    icon: MessageCircleHeart,
  },
  {
    number: "02",
    title: "We understand the full picture",
    description:
      "The concern is explored with care through history, observations, symptoms, school context, family patterns, and the child’s emotional needs.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "A clear care plan is suggested",
    description:
      "Based on the concern, we guide you toward counselling, therapy, psychological assessment, parent guidance, or an intervention plan.",
    icon: Route,
  },
  {
    number: "04",
    title: "Support continues with follow-up",
    description:
      "Progress is reviewed with follow-up sessions, home strategies, parent guidance, and practical support for everyday challenges.",
    icon: HeartHandshake,
  },
];

const carePoints = [
  "No pressure to know the diagnosis before reaching out",
  "Parent-friendly explanation of the concern",
  "Practical home strategies wherever needed",
];

const HowWeWork = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-5 py-16">
      <div className="absolute -left-30 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-30 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-28"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D5E] shadow-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              How We Work
            </div>

            <h2 className="text-4xl font-black tracking-tight text-[#102A43] md:text-6xl">
              From worry to clarity,{" "}
              <span className="bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
                step by step.
              </span>
            </h2>

            <p className="mt-6 text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              Parents often come with confusion: is it behaviour, attention,
              anxiety, learning difficulty, speech delay, or something else? Our
              process helps you understand the concern and choose the right next
              step with confidence.
            </p>

            <div className="mt-8 rounded-4xl border border-white bg-white/85 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
              <p className="text-lg font-bold leading-8 text-[#0F3D5E]">
                “Every child deserves to be understood before being corrected.”
              </p>

              <p className="mt-3 text-sm font-semibold text-slate-500">
                — Dr. Vini Jhariya
              </p>

              <div className="mt-5 space-y-3">
                {carePoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-2 text-sm font-bold leading-6 text-slate-600"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-1 shrink-0 text-[#2CB1A6]"
                    />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-8 hidden h-[calc(100%-64px)] w-px bg-linear-to-b from-[#2CB1A6] via-[#0F3D5E] to-transparent md:block" />

            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className="group relative rounded-4xl border border-white bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10 md:ml-14"
                  >
                    <div className="absolute -left-14 top-8 hidden h-16 w-16 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white shadow-xl shadow-blue-950/20 md:flex">
                      <Icon size={24} />
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2">
                          <span className="text-sm font-black text-[#2CB1A6]">
                            {step.number}
                          </span>

                          <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                            Step
                          </span>
                        </div>

                        <h3 className="text-2xl font-black text-[#102A43]">
                          {step.title}
                        </h3>

                        <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-slate-600">
                          {step.description}
                        </p>
                      </div>

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7FBFC] text-[#0F3D5E] md:hidden">
                        <Icon size={22} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mt-8 rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#2CB1A6] p-8 text-white shadow-2xl shadow-blue-950/20 md:ml-14"
            >
              <h3 className="text-2xl font-black">Not sure where to begin?</h3>

              <p className="mt-3 text-sm font-semibold leading-6 text-white/75">
                You do not need to know the exact service or diagnosis first.
                Share your concern, and we will help you understand the right
                starting point.
              </p>

              <a
                href="/contact-us"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
              >
                Book Consultation
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
