"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  HeartHandshake,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: Award,
    value: 2013,
    prefix: "",
    suffix: "",
    label: "Trusted Since",
    description: "Supporting children and families for over a decade",
  },
  {
    icon: Users,
    value: 5000,
    prefix: "",
    suffix: "+",
    label: "Families Supported",
    description: "Children, adolescents, parents and caregivers",
  },
  {
    icon: Star,
    value: 4.9,
    prefix: "",
    suffix: "★",
    decimals: 1,
    label: "Google Rating",
    description: "Based on parent and family experiences",
  },
  {
    icon: HeartHandshake,
    value: 237,
    prefix: "",
    suffix: "+",
    label: "Parent Reviews",
    description: "Real experiences shared by families",
  },
];

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  start,
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!start) return;

    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, start, reduceMotion]);

  const formattedValue =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString("en-IN");

  return (
    <>
      {prefix}
      {formattedValue}
      {suffix}
    </>
  );
}

export default function StatsStrip() {
  const sectionRef = useRef(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-36 top-10 h-80 w-80 rounded-full bg-[#2CB1A6]/8 blur-3xl" />

        <div className="absolute -right-36 bottom-0 h-96 w-96 rounded-full bg-[#F4B183]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#0F3D5E] shadow-[0_30px_90px_rgba(15,61,94,0.2)]">
          <div className="relative">
            {/* Decorative shapes */}
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#2CB1A6]/20 blur-3xl" />

            <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#F4B183]/12 blur-3xl" />

            <ShieldCheck
              aria-hidden="true"
              size={360}
              strokeWidth={0.55}
              className="absolute -bottom-20 -right-12 text-white/[0.035]"
            />

            <div className="relative grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* Left content */}
              <div className="flex flex-col justify-center border-b border-white/10 p-7 text-white sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-[#7DE0D6] backdrop-blur sm:text-sm">
                  <BadgeCheck size={16} />
                  Trusted psychological support
                </div>

                <h2 className="mt-6 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                  Experience that helps families move from worry to clarity.
                </h2>

                <p className="mt-5 max-w-xl text-sm font-semibold leading-7 text-white/70 sm:text-base sm:leading-8">
                  Families receive professional assessment, counselling,
                  developmental support and practical parent guidance in a calm,
                  respectful and child-centred environment.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {[
                    "RCI Registered",
                    "Assessment-led approach",
                    "Parent involvement",
                  ].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-bold text-white/85"
                    >
                      <BadgeCheck size={14} className="text-[#7DE0D6]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="grid sm:grid-cols-2">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;

                  return (
                    <motion.article
                      key={stat.label}
                      initial={{ opacity: 0, y: 24 }}
                      animate={
                        hasEnteredView
                          ? {
                              opacity: 1,
                              y: 0,
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                      }}
                      whileHover={{
                        backgroundColor: "rgba(255,255,255,0.12)",
                      }}
                      className={`group relative min-h-60 overflow-hidden p-7 text-white transition sm:p-8 ${
                        index === 0
                          ? "border-b border-white/10 sm:border-r"
                          : ""
                      } ${index === 1 ? "border-b border-white/10" : ""} ${
                        index === 2
                          ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                          : ""
                      }`}
                    >
                      <div className="absolute right-5 top-5 text-6xl font-black text-white/[0.035] transition duration-300 group-hover:text-white/6">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="relative flex h-full flex-col">
                        <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white/10 text-[#7DE0D6] transition duration-300 group-hover:scale-105 group-hover:bg-white">
                          <Icon
                            size={23}
                            className="transition group-hover:text-[#168F87]"
                          />
                        </div>

                        <div className="mt-auto pt-10">
                          <p className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                            <AnimatedNumber
                              value={stat.value}
                              prefix={stat.prefix}
                              suffix={stat.suffix}
                              decimals={stat.decimals}
                              start={hasEnteredView}
                            />
                          </p>

                          <h3 className="mt-3 text-base font-black text-[#7DE0D6]">
                            {stat.label}
                          </h3>

                          <p className="mt-2 max-w-xs text-sm font-semibold leading-6 text-white/60">
                            {stat.description}
                          </p>
                        </div>
                      </div>

                      <span className="absolute bottom-0 left-0 h-1 w-0 bg-[#2CB1A6] transition-all duration-500 group-hover:w-full" />
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Supporting trust line */}
        <div className="mx-auto -mt-5 grid max-w-5xl gap-3 px-4 sm:grid-cols-3 sm:px-8">
          {[
            {
              title: "Professional clarity",
              description: "Understand what may be behind the concern",
            },
            {
              title: "Practical direction",
              description: "Know the most suitable next support step",
            },
            {
              title: "Family involvement",
              description: "Parents remain part of the complete process",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={
                hasEnteredView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.45,
                delay: 0.25 + index * 0.08,
              }}
              className="rounded-2xl border border-[#0F3D5E]/10 bg-white p-4 text-center shadow-[0_16px_40px_rgba(15,61,94,0.09)]"
            >
              <p className="text-sm font-black text-[#102A43]">{item.title}</p>

              <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
