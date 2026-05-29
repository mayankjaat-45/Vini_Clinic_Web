"use client";

import { motion } from "framer-motion";
import {
  MessageCircleHeart,
  ClipboardCheck,
  Route,
  HeartHandshake,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Share your concern",
    description:
      "Parents or clients share their concern through the booking form, WhatsApp or direct consultation request.",
    icon: MessageCircleHeart,
  },
  {
    number: "02",
    title: "Initial understanding",
    description:
      "The concern is understood carefully through history, symptoms, behaviour patterns and family context.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Personalised care plan",
    description:
      "A therapy, counselling, assessment or intervention pathway is suggested based on the client’s needs.",
    icon: Route,
  },
  {
    number: "04",
    title: "Ongoing support",
    description:
      "Progress is reviewed with follow-ups, parent guidance, home strategies and continued emotional support.",
    icon: HeartHandshake,
  },
];

const HowWeWork = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-5 py-18">
      <div className="absolute -left-30 top-20 h-80 w-80 rounded-full bg-blue-100 blur-3xl" />
      <div className="absolute -right-30 bottom-20 h-80 w-80 rounded-full bg-teal-100 blur-3xl" />

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
              How we work
            </div>

            <h2 className="text-4xl font-black tracking-tight text-[#102A43] md:text-6xl">
              A calm, clear &{" "}
              <span className="bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
                guided journey.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              The website should make parents feel supported from the first
              click. This section explains the process in a simple and premium
              way.
            </p>

            <div className="mt-8 rounded-4xl border border-white bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl">
              <p className="text-lg font-bold leading-8 text-[#0F3D5E]">
                “Every child deserves to be understood before being corrected.”
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-500">
                — Dr. Vini Jhariya
              </p>
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

                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
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
              <h3 className="text-2xl font-black">
                Ready to begin the right care journey?
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/75">
                Visitors can book a consultation, send a WhatsApp message or
                explore services before deciding.
              </p>

              <a
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1"
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
