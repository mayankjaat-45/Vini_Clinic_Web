"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  HeartHandshake,
  MessageCircle,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const processSteps = [
  {
    id: 1,
    icon: MessageCircle,
    shortTitle: "Share Your Concern",
    title: "Start by telling us what you are noticing.",
    description:
      "Parents do not need to know the exact diagnosis or service name. Share the changes, difficulties or behaviours that are concerning you.",
    details: [
      "Tell us about the current concern",
      "Share your child’s age and history",
      "Choose online or offline consultation",
    ],
    result: "You receive guidance about the most suitable first step.",
  },
  {
    id: 2,
    icon: Search,
    shortTitle: "Initial Consultation",
    title: "We understand the child beyond the visible concern.",
    description:
      "Dr. Vini discusses the child’s developmental, emotional, behavioural, academic and family background to understand the complete situation.",
    details: [
      "Detailed parent discussion",
      "Developmental and behavioural history",
      "Review of school and home concerns",
    ],
    result:
      "The underlying possibilities become clearer before intervention begins.",
  },
  {
    id: 3,
    icon: ClipboardCheck,
    shortTitle: "Assessment",
    title: "Assessment is recommended only when it is genuinely needed.",
    description:
      "Depending on the concern, structured psychological or developmental assessment may be used to understand strengths, difficulties and support needs.",
    details: [
      "Age-appropriate standardised tools",
      "Behavioural and clinical observations",
      "School or teacher input when required",
    ],
    result:
      "Parents receive evidence-based clarity rather than assumptions or labels.",
  },
  {
    id: 4,
    icon: FileText,
    shortTitle: "Personalised Plan",
    title: "A practical support plan is created for the child.",
    description:
      "The plan may include counselling, developmental intervention, remedial support, parent guidance, school recommendations or a combination of services.",
    details: [
      "Clear support priorities",
      "Individual therapy recommendations",
      "Practical strategies for home and school",
    ],
    result:
      "The family knows what to do, why it matters and what to expect next.",
  },
  {
    id: 5,
    icon: TrendingUp,
    shortTitle: "Review Progress",
    title: "Progress is supported and reviewed step by step.",
    description:
      "Support does not end after a report or one consultation. Progress is reviewed and strategies are adjusted according to the child’s response.",
    details: [
      "Regular progress discussions",
      "Parent guidance and home strategies",
      "Plan adjustments when required",
    ],
    result: "Small, meaningful changes are encouraged and monitored over time.",
  },
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);

  const selectedStep = processSteps[activeStep];
  const SelectedIcon = selectedStep.icon;

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#0F3D5E]/8 blur-3xl" />

        <div className="absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F4B183]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#168F87] shadow-sm sm:text-sm">
            <Sparkles size={16} />
            How support works
          </div>

          <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em] text-[#102A43] sm:text-4xl lg:text-5xl">
            A clear journey from concern to{" "}
            <span className="text-[#168F87]">confident next steps.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            The process is designed to help parents understand what is
            happening, whether assessment is needed and which support will be
            most useful.
          </p>
        </div>

        {/* Mobile progress line */}
        <div className="mt-10 lg:hidden">
          <div className="mb-3 flex items-center justify-between text-xs font-black text-slate-500">
            <span>
              Step {activeStep + 1} of {processSteps.length}
            </span>

            <span>{selectedStep.shortTitle}</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white">
            <motion.div
              animate={{
                width: `${((activeStep + 1) / processSteps.length) * 100}%`,
              }}
              transition={{ duration: 0.35 }}
              className="h-full rounded-full bg-[#2CB1A6]"
            />
          </div>
        </div>

        {/* Interactive process */}
        <div className="mt-8 grid gap-6 lg:mt-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Step navigator */}
          <div className="rounded-4xl border border-[#0F3D5E]/10 bg-white p-3 shadow-[0_20px_60px_rgba(15,61,94,0.07)] sm:p-4">
            <div className="mb-3 px-3 py-2">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#168F87]">
                Your support journey
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-500">
                Select a step to understand the process.
              </p>
            </div>

            <div className="space-y-2">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                const isCompleted = index < activeStep;

                return (
                  <motion.button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                    onFocus={() => setActiveStep(index)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    aria-pressed={isActive}
                    className={`relative flex w-full items-center gap-4 overflow-hidden rounded-[1.4rem] p-4 text-left transition duration-300 ${
                      isActive
                        ? "bg-[#0F3D5E] text-white shadow-xl shadow-[#0F3D5E]/15"
                        : "bg-[#F7FBFC] text-[#102A43] hover:bg-[#E9F8F6]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-process-step"
                        className="absolute inset-y-0 left-0 w-1.5 bg-[#2CB1A6]"
                      />
                    )}

                    <div
                      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition ${
                        isActive
                          ? "bg-white/12 text-[#7DE0D6]"
                          : isCompleted
                            ? "bg-[#2CB1A6] text-white"
                            : "bg-white text-[#168F87] shadow-sm"
                      }`}
                    >
                      {isCompleted && !isActive ? (
                        <CheckCircle2 size={22} />
                      ) : (
                        <Icon size={22} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-[11px] font-black uppercase tracking-[0.15em] ${
                          isActive ? "text-[#7DE0D6]" : "text-slate-400"
                        }`}
                      >
                        Step {String(step.id).padStart(2, "0")}
                      </p>

                      <p
                        className={`mt-1 text-sm font-black sm:text-base ${
                          isActive ? "text-white" : "text-[#102A43]"
                        }`}
                      >
                        {step.shortTitle}
                      </p>
                    </div>

                    <ArrowRight
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

          {/* Dynamic detail panel */}
          <div className="relative min-h-142.5 overflow-hidden rounded-[2.5rem] bg-[#0F3D5E] shadow-[0_30px_80px_rgba(15,61,94,0.2)]">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#2CB1A6]/25 blur-3xl" />

            <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#F4B183]/15 blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStep.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="relative flex min-h-142.5 flex-col p-7 text-white sm:p-9 lg:p-11"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <motion.div
                    initial={{ rotate: -8, scale: 0.9 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white/12 text-[#7DE0D6]"
                  >
                    <SelectedIcon size={29} />
                  </motion.div>

                  <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#7DE0D6]">
                    Step {String(selectedStep.id).padStart(2, "0")}
                  </span>
                </div>

                {/* Main content */}
                <div className="mt-12 max-w-2xl">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#F4B183]">
                    {selectedStep.shortTitle}
                  </p>

                  <h3 className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                    {selectedStep.title}
                  </h3>

                  <p className="mt-5 text-sm font-semibold leading-7 text-white/72 sm:text-base sm:leading-8">
                    {selectedStep.description}
                  </p>

                  <div className="mt-8 grid gap-3">
                    {selectedStep.details.map((detail, index) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.12 + index * 0.08,
                        }}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#168F87]">
                          <CheckCircle2 size={17} />
                        </span>

                        <p className="text-sm font-bold text-white/88">
                          {detail}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div className="mt-auto pt-10">
                  <div className="rounded-3xl border border-[#7DE0D6]/20 bg-[#2CB1A6]/15 p-5 backdrop-blur">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#168F87]">
                        <BadgeCheck size={21} />
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.17em] text-[#7DE0D6]">
                          What parents receive
                        </p>

                        <p className="mt-2 text-sm font-bold leading-7 text-white/88">
                          {selectedStep.result}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStep((current) =>
                          current === 0 ? processSteps.length - 1 : current - 1,
                        )
                      }
                      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/8 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15"
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setActiveStep((current) =>
                          current === processSteps.length - 1 ? 0 : current + 1,
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                    >
                      {activeStep === processSteps.length - 1
                        ? "Start Again"
                        : "Next Step"}

                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 grid items-center gap-6 rounded-4xl border border-[#2CB1A6]/15 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87]">
              <HeartHandshake size={25} />
            </div>

            <div>
              <h3 className="text-xl font-black text-[#102A43]">
                You do not need to know the diagnosis before reaching out.
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                Start by sharing what you are noticing. The right consultation,
                assessment or support path can be decided together.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#0F3D5E]/15 transition hover:-translate-y-1 hover:bg-[#102A43]"
            >
              <CalendarCheck size={18} />
              Book Consultation
            </Link>

            <a
              href="https://wa.me/917999215093?text=Hello%20Dr.%20Vini%2C%20I%20would%20like%20guidance%20for%20my%20child."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
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
