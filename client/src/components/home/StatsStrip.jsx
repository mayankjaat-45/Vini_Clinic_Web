"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  CalendarDays,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Brain,
  ClipboardCheck,
  MessageCircleHeart,
  SmilePlus,
} from "lucide-react";

const stats = [
  {
    icon: CalendarDays,
    value: 2013,
    suffix: "",
    label: "Trusted since",
    displayValue: "2013",
    description: "Consistent care for children, teens, and parents",
    noFormat: true,
  },
  {
    icon: HeartHandshake,
    value: 5000,
    suffix: "+",
    label: "Families supported",
    displayValue: "5,000+",
    description: "Through counselling, therapy, and guidance",
  },
  {
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Years of experience",
    displayValue: "10+",
    description: "Clinical experience with child development concerns",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "★",
    label: "Google rating",
    displayValue: "4.9★",
    description: "Trusted by parents looking for clear guidance",
    decimal: true,
  },
];

const trustNotes = [
  {
    icon: ShieldCheck,
    title: "RCI Registered",
    text: "Qualified clinical guidance",
  },
  {
    icon: Sparkles,
    title: "TEDx Speaker",
    text: "Trusted public voice",
  },
  {
    icon: ClipboardCheck,
    title: "Published Researcher",
    text: "Evidence-informed care",
  },
  {
    icon: HeartHandshake,
    title: "Parent-first Approach",
    text: "Simple and supportive",
  },
];

const visualTrustFlow = [
  {
    icon: MessageCircleHeart,
    title: "Parents share concern",
    text: "Behaviour, emotions, speech, attention or learning",
  },
  {
    icon: Brain,
    title: "Child is understood",
    text: "The reason behind the concern is explored",
  },
  {
    icon: ClipboardCheck,
    title: "Clear plan is made",
    text: "Assessment, therapy or parent guidance",
  },
  {
    icon: SmilePlus,
    title: "Support continues",
    text: "Progress is reviewed step by step",
  },
];

const formatNumber = (value, noFormat = false) => {
  if (noFormat) return String(value);
  return Number(value).toLocaleString("en-IN");
};

const CountUp = ({
  end,
  suffix = "",
  decimal = false,
  start = false,
  displayValue,
  noFormat = false,
}) => {
  const [count, setCount] = useState(decimal ? "0.0" : "0");
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start) {
      setCount(decimal ? "0.0" : "0");
      return;
    }

    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = end * easedProgress;

      if (decimal) {
        setCount(currentValue.toFixed(1));
      } else {
        setCount(formatNumber(Math.floor(currentValue), noFormat));
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(decimal ? end.toFixed(1) : formatNumber(end, noFormat));
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [start, end, decimal, noFormat]);

  if (!start && displayValue) {
    return <span>{displayValue}</span>;
  }

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const StatsStrip = () => {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      className="relative z-20 -mt-8 px-4 sm:px-5 md:-mt-12"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-4 md:rounded-[2.5rem]">
        {/* Top Visual Intro */}
        <div className="grid gap-6 rounded-[1.7rem] bg-[#0F3D5E] p-5 text-white sm:p-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-[#F4B183]">
              <Sparkles size={15} />
              Why parents feel safe here
            </p>

            <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
              Care that begins with listening, not labelling.
            </h2>

            <p className="mt-3 text-sm font-semibold leading-6 text-white/70">
              A simple process helps parents move from confusion to clarity.
            </p>
          </div>

          {/* Visual Flow */}
          <div className="grid gap-3 sm:grid-cols-4">
            {visualTrustFlow.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="relative">
                  {index !== visualTrustFlow.length - 1 && (
                    <div className="absolute -right-2 top-8 hidden h-px w-4 bg-white/30 sm:block" />
                  )}

                  <div className="h-full rounded-3xl border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0F3D5E]">
                      <Icon size={22} />
                    </div>

                    <p className="mt-3 text-sm font-black">{item.title}</p>

                    <p className="mt-1 text-xs font-semibold leading-5 text-white/65">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            const isRating = item.label.toLowerCase().includes("rating");

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="group relative overflow-hidden rounded-[1.6rem] border border-[#0F3D5E]/5 bg-[#F7FBFC] p-5 transition duration-300 hover:-translate-y-1 hover:bg-[#E9F8F6] hover:shadow-xl hover:shadow-slate-900/10 sm:p-6"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#2CB1A6]/10 transition group-hover:bg-[#2CB1A6]/20" />

                <div className="relative flex items-start gap-4 sm:block">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#0F3D5E] shadow-lg shadow-slate-900/5 ring-1 ring-[#0F3D5E]/10 transition duration-300 group-hover:bg-[#2CB1A6] group-hover:text-white sm:mb-5">
                    <Icon
                      size={22}
                      className={isRating ? "fill-current" : ""}
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-black leading-none text-[#102A43] sm:text-4xl">
                      <CountUp
                        start={isInView}
                        end={item.value}
                        suffix={item.suffix}
                        decimal={item.decimal}
                        displayValue={item.displayValue}
                        noFormat={item.noFormat}
                      />
                    </h3>

                    <p className="mt-2 text-sm font-black leading-5 text-[#0F3D5E]">
                      {item.label}
                    </p>

                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-500 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Notes */}
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustNotes.map((note) => {
            const Icon = note.icon;

            return (
              <div
                key={note.title}
                className="group rounded-2xl border border-[#2CB1A6]/15 bg-white px-4 py-4 text-center transition hover:-translate-y-1 hover:bg-[#F7FBFC] hover:shadow-lg hover:shadow-slate-900/5 sm:text-left"
              >
                <div className="flex flex-col items-center gap-3 sm:flex-row">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#2CB1A6] transition group-hover:bg-[#2CB1A6] group-hover:text-white">
                    <Icon size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#0F3D5E]">
                      {note.title}
                    </p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                      {note.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
