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
  PhoneCall,
  FileSearch,
  FileText,
  Home,
  HelpCircle,
  ShieldCheck,
  SmilePlus,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Share Concern",
    short: "Tell us what you are noticing.",
    description:
      "Behaviour, emotions, learning, attention, speech, development or family concern.",
    icon: MessageCircleHeart,
  },
  {
    number: "02",
    title: "Understand Child",
    short: "We look at the full picture.",
    description:
      "History, observation, symptoms, school context, family patterns and emotional needs.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Clear Care Plan",
    short: "You get the right next step.",
    description:
      "Counselling, therapy, assessment, parent guidance or intervention planning.",
    icon: Route,
  },
  {
    number: "04",
    title: "Follow-up Support",
    short: "Progress is reviewed gently.",
    description:
      "Home strategies, parent guidance and practical support for daily challenges.",
    icon: HeartHandshake,
  },
];

const visitFlow = [
  {
    icon: PhoneCall,
    title: "Contact",
    text: "Form, call or WhatsApp",
  },
  {
    icon: FileSearch,
    title: "Consultation",
    text: "Concern is understood",
  },
  {
    icon: FileText,
    title: "Plan",
    text: "Clear roadmap is shared",
  },
  {
    icon: Home,
    title: "Home Support",
    text: "Simple strategies for parents",
  },
];

const carePoints = [
  "No need to know the diagnosis before reaching out",
  "Parent-friendly explanation, not confusing medical language",
  "Practical strategies for home, school and daily routines",
];

const visualCards = [
  {
    icon: HelpCircle,
    title: "Confused?",
    text: "You may not know whether it is behaviour, attention, anxiety, speech or learning.",
  },
  {
    icon: ShieldCheck,
    title: "Guided Safely",
    text: "We help you understand the concern before choosing therapy or assessment.",
  },
  {
    icon: SmilePlus,
    title: "More Clarity",
    text: "Parents leave with a clearer direction and next steps.",
  },
];

const HowWeWork = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-5 py-16 sm:py-20">
      <div className="absolute -left-30 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-30 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D5E] shadow-sm">
            <Sparkles size={16} className="text-[#2CB1A6]" />
            How We Work
          </div>

          <h2 className="text-4xl font-black tracking-tight text-[#102A43] md:text-6xl">
            From worry to clarity,{" "}
            <span className="bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
              visually step by step.
            </span>
          </h2>

          <p className="mt-5 text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            Parents do not need to read a long explanation or know the exact
            diagnosis. This simple journey shows how support begins.
          </p>
        </motion.div>

        {/* Main Visual Journey */}
        <div className="mt-12 rounded-[2rem] border border-white bg-white/85 p-4 shadow-2xl shadow-slate-900/5 backdrop-blur-xl sm:p-6 lg:rounded-[3rem] lg:p-8">
          <div className="mb-8 flex flex-col gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2CB1A6]">
                Parent Journey
              </p>
              <h3 className="mt-2 text-2xl font-black text-[#102A43] sm:text-3xl">
                What happens after you reach out?
              </h3>
            </div>

            <p className="mx-auto max-w-xl text-sm font-semibold leading-6 text-slate-500 lg:mx-0">
              A clear process helps parents understand what to expect before
              booking a consultation.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group relative"
                >
                  {/* Desktop connector line */}
                  {index !== steps.length - 1 && (
                    <div className="absolute left-[calc(50%+34px)] top-14 hidden h-px w-[calc(100%-68px)] bg-[#2CB1A6]/25 lg:block" />
                  )}

                  <div className="relative h-full rounded-[1.75rem] border border-[#0F3D5E]/10 bg-[#F7FBFC] p-5 text-center transition hover:-translate-y-1 hover:border-[#2CB1A6]/35 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-white text-[#2CB1A6] shadow-sm transition group-hover:bg-[#E9F8F6]">
                      <Icon size={28} />
                    </div>

                    <div className="mt-4 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-[#2CB1A6] shadow-sm">
                      STEP {step.number}
                    </div>

                    <h4 className="mt-4 text-xl font-black text-[#102A43]">
                      {step.title}
                    </h4>

                    <p className="mt-2 text-sm font-black leading-6 text-[#0F3D5E]">
                      {step.short}
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Lower Visual Blocks */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* First Visit Infographic */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-white bg-white/90 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#2CB1A6]">
                <ClipboardCheck size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#102A43]">
                  First visit flow
                </h3>
                <p className="text-sm font-semibold text-slate-500">
                  Simple, clear and parent-friendly.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {visitFlow.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="relative">
                    {index !== visitFlow.length - 1 && (
                      <ArrowRight
                        size={18}
                        className="absolute -right-3 top-9 z-10 hidden text-[#2CB1A6] sm:block"
                      />
                    )}

                    <div className="rounded-3xl bg-[#F7FBFC] p-4 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0F3D5E] shadow-sm">
                        <Icon size={22} />
                      </div>

                      <p className="mt-3 text-sm font-black text-[#102A43]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl bg-[#FFF3E8] p-5">
              <p className="text-sm font-black leading-6 text-[#8A4A16]">
                Parent-friendly promise:
              </p>
              <p className="mt-1 text-sm font-semibold leading-6 text-[#9A5C25]">
                We explain the concern in simple language so parents can
                understand what is happening and what to do next.
              </p>
            </div>
          </motion.div>

          {/* Why This Helps */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] bg-linear-to-br from-[#0F3D5E] to-[#2CB1A6] p-6 text-white shadow-2xl shadow-blue-950/20"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-black text-white">
              <HeartHandshake size={17} />
              Why this process helps
            </div>

            <div className="grid gap-3">
              {visualCards.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                  >
                    <div className="flex gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0F3D5E]">
                        <Icon size={22} />
                      </div>

                      <div>
                        <h4 className="font-black">{item.title}</h4>
                        <p className="mt-1 text-sm font-semibold leading-6 text-white/75">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-3 rounded-3xl bg-white p-5 text-[#102A43]">
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
    </section>
  );
};

export default HowWeWork;
