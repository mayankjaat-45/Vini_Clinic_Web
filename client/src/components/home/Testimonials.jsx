"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  MessageCircle,
  Quote,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Parent of a 9-year-old",
    location: "Indore",
    concern: "Learning Difficulty",
    rating: 5,
    review:
      "We came with years of confusion about why our child was struggling in school. Dr. Vini explained everything calmly and helped us understand that our child was not lazy. The assessment and recommendations gave us a clear direction.",
    highlight: "We finally received answers, not just another label.",
  },
  {
    id: 2,
    name: "Mother of a 6-year-old",
    location: "Indore",
    concern: "Behaviour & Emotions",
    rating: 5,
    review:
      "Our child had frequent anger and meltdowns. Instead of only correcting the behaviour, Dr. Vini helped us understand what was happening emotionally. The parent guidance changed how we communicate at home.",
    highlight: "The changes began when we learned to understand the emotion.",
  },
  {
    id: 3,
    name: "Parents of a 4-year-old",
    location: "Madhya Pradesh",
    concern: "Developmental Delay",
    rating: 5,
    review:
      "We were worried about speech, eye contact and milestones but did not know where to begin. The consultation was detailed and reassuring. We received practical activities and a structured intervention plan.",
    highlight: "We stopped feeling lost and started taking the right steps.",
  },
  {
    id: 4,
    name: "Parent of a teenager",
    location: "Online Consultation",
    concern: "Adolescent Counselling",
    rating: 5,
    review:
      "Our teenager was under intense academic pressure and had stopped communicating with us. The counselling space helped them open up without judgment, and we also learned how to support them without increasing the pressure.",
    highlight: "Communication slowly returned to our family.",
  },
  {
    id: 5,
    name: "Mother of an 8-year-old",
    location: "Indore",
    concern: "ADHD Support",
    rating: 5,
    review:
      "Teachers described our son as careless and disruptive. The assessment helped us understand his attention and impulse-control difficulties. The home and classroom strategies were practical and easy to follow.",
    highlight: "He was trying—he simply needed different tools.",
  },
  {
    id: 6,
    name: "Parent of a 7-year-old",
    location: "Indore",
    concern: "Child Counselling",
    rating: 5,
    review:
      "My child was anxious, fearful and losing confidence. Dr. Vini created a comfortable space where my child felt safe to express emotions. We noticed gradual but meaningful changes in confidence and independence.",
    highlight: "My child now speaks about feelings instead of hiding them.",
  },
];

const reviewStats = [
  {
    value: "4.9★",
    label: "Google rating",
  },
  {
    value: "237+",
    label: "Parent reviews",
  },
  {
    value: "5,000+",
    label: "Families supported",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeTestimonial = testimonials[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = window.setInterval(() => {
      showNext();
    }, 6500);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F4B183]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#168F87] shadow-sm sm:text-sm">
            <Sparkles size={16} />
            Parent experiences
          </div>

          <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em] text-[#102A43] sm:text-4xl lg:text-5xl">
            What families say after finding{" "}
            <span className="text-[#168F87]">clarity and support.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Every family’s experience is different, but many begin with the same
            need—to understand the child and know what to do next.
          </p>
        </div>

        {/* Review statistics */}
        <div className="mx-auto mt-10 grid max-w-4xl overflow-hidden rounded-4xl border border-[#0F3D5E]/10 bg-white shadow-[0_18px_50px_rgba(15,61,94,0.07)] sm:grid-cols-3">
          {reviewStats.map((item, index) => (
            <div
              key={item.label}
              className={`p-5 text-center sm:p-6 ${
                index !== reviewStats.length - 1
                  ? "border-b border-[#0F3D5E]/10 sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              <p className="text-2xl font-black text-[#0F3D5E] sm:text-3xl">
                {item.value}
              </p>

              <p className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive testimonial area */}
        <div
          className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Featured testimonial */}
          <div className="relative min-h-135 overflow-hidden rounded-[2.5rem] bg-[#0F3D5E] shadow-[0_30px_80px_rgba(15,61,94,0.2)]">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#2CB1A6]/25 blur-3xl" />

            <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-[#F4B183]/15 blur-3xl" />

            <Quote
              aria-hidden="true"
              size={300}
              strokeWidth={0.7}
              className="absolute -bottom-16 -right-12 text-white/[0.035]"
            />

            <AnimatePresence mode="wait">
              <motion.article
                key={activeTestimonial.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="relative flex min-h-135 flex-col p-7 text-white sm:p-9 lg:p-11"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white/12 text-[#7DE0D6]">
                    <Quote size={29} />
                  </div>

                  <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-4 py-2">
                    {Array.from({ length: activeTestimonial.rating }).map(
                      (_, index) => (
                        <Star
                          key={`${activeTestimonial.id}-${index}`}
                          size={14}
                          className="fill-[#F4B183] text-[#F4B183]"
                        />
                      ),
                    )}
                  </div>
                </div>

                <div className="mt-12 max-w-3xl">
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.08,
                    }}
                    className="text-xs font-black uppercase tracking-[0.2em] text-[#7DE0D6]"
                  >
                    {activeTestimonial.concern}
                  </motion.p>

                  <motion.h3
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.12,
                    }}
                    className="mt-4 text-2xl font-black leading-snug sm:text-3xl lg:text-4xl"
                  >
                    “{activeTestimonial.highlight}”
                  </motion.h3>

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.16,
                    }}
                    className="mt-6 text-sm font-semibold leading-7 text-white/74 sm:text-base sm:leading-8"
                  >
                    {activeTestimonial.review}
                  </motion.p>
                </div>

                <div className="mt-auto flex flex-col gap-6 pt-10 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#168F87]">
                      <Users size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-black text-white">
                        {activeTestimonial.name}
                      </p>

                      <p className="mt-1 text-xs font-semibold text-white/55">
                        {activeTestimonial.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={showPrevious}
                      aria-label="Show previous testimonial"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:-translate-y-1 hover:bg-white/15"
                    >
                      <ArrowLeft size={19} />
                    </button>

                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Show next testimonial"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                    >
                      <ArrowRight size={19} />
                    </button>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Review navigator */}
          <div className="rounded-4xl border border-[#0F3D5E]/10 bg-white p-3 shadow-[0_20px_60px_rgba(15,61,94,0.07)] sm:p-4">
            <div className="flex items-center justify-between gap-4 px-3 py-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#168F87]">
                  More experiences
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  Select a review to read
                </p>
              </div>

              <span className="rounded-full bg-[#F7FBFC] px-3 py-1.5 text-xs font-black text-[#0F3D5E]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>

            <div className="space-y-2">
              {testimonials.map((testimonial, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={testimonial.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    whileHover={{
                      x: 4,
                    }}
                    whileTap={{
                      scale: 0.99,
                    }}
                    aria-pressed={isActive}
                    className={`relative flex w-full items-center gap-4 overflow-hidden rounded-[1.4rem] p-4 text-left transition duration-300 ${
                      isActive
                        ? "bg-[#E9F8F6]"
                        : "bg-[#F7FBFC] hover:bg-white hover:shadow-md"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="testimonial-active-line"
                        className="absolute inset-y-0 left-0 w-1.5 bg-[#2CB1A6]"
                      />
                    )}

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                        isActive
                          ? "bg-white text-[#168F87]"
                          : "bg-white text-[#0F3D5E]"
                      }`}
                    >
                      <Quote size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black text-[#102A43]">
                        {testimonial.concern}
                      </p>

                      <p className="mt-1 truncate text-xs font-semibold text-slate-500">
                        {testimonial.name}
                      </p>
                    </div>

                    <ArrowRight
                      size={17}
                      className={`shrink-0 transition ${
                        isActive
                          ? "translate-x-1 text-[#168F87]"
                          : "text-slate-400"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review progress indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={`testimonial-dot-${testimonial.id}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show testimonial ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-9 bg-[#2CB1A6]"
                  : "w-2 bg-[#0F3D5E]/15 hover:bg-[#0F3D5E]/30"
              }`}
            />
          ))}
        </div>

        {/* Trust CTA */}
        <div className="mt-10 grid items-center gap-6 rounded-4xl border border-[#2CB1A6]/15 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_auto]">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87]">
              <BadgeCheck size={25} />
            </div>

            <div>
              <h3 className="text-xl font-black text-[#102A43]">
                Your family’s first step can begin with one conversation.
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                Share your concern and receive guidance about consultation,
                assessment, counselling or developmental support.
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
