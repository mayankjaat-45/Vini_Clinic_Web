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
} from "lucide-react";

const stats = [
  {
    icon: CalendarDays,
    value: 2013,
    suffix: "",
    label: "Trusted since",
    displayValue: "2013",
    description: "Consistent care for children, teens, and parents",
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
  "RCI Registered",
  "TEDx Speaker",
  "Published Researcher",
  "Parent-first approach",
];

const formatNumber = (value) => {
  return Number(value).toLocaleString("en-IN");
};

const CountUp = ({
  end,
  suffix = "",
  prefix = "",
  decimal = false,
  start = false,
  fallback,
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
        setCount(
          fallback === "2013"
            ? String(Math.floor(currentValue))
            : formatNumber(Math.floor(currentValue))
        );
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(
          decimal ? end.toFixed(1) : fallback ? fallback : formatNumber(end)
        );
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [start, end, decimal, fallback]);

  return (
    <span>
      {prefix}
      {start ? count : fallback || count}
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
      <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl border border-white/80 bg-white/90 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-4 md:rounded-[2.5rem]">
        {/* Creative Top Intro */}
        <div className="grid gap-4 rounded-[1.7rem] bg-[#0F3D5E] p-5 text-white sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-[#F4B183]">
              <Sparkles size={15} />
              Why parents feel safe here
            </p>

            <h2 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
              Care that begins with listening, not labelling.
            </h2>
          </div>

          <p className="text-sm font-semibold leading-7 text-white/75 sm:text-base">
            Every child’s concern is different. Some families come for therapy,
            some for assessments, and some simply need clarity about what their
            child is going through.
          </p>
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
                        fallback={item.displayValue}
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
          {trustNotes.map((note) => (
            <div
              key={note}
              className="flex items-center justify-center gap-2 rounded-2xl border border-[#2CB1A6]/15 bg-white px-4 py-3 text-sm font-black text-[#0F3D5E]"
            >
              <ShieldCheck size={17} className="text-[#2CB1A6]" />
              {note}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
