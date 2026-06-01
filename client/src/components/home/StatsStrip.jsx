"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Award,
  CalendarDays,
  HeartHandshake,
  ShieldCheck,
  Star,
} from "lucide-react";

const stats = [
  {
    icon: CalendarDays,
    value: 2013,
    suffix: "",
    label: "Trusted since",
    displayValue: "2013",
    description: "Serving families with care",
  },
  {
    icon: HeartHandshake,
    value: 5000,
    suffix: "+",
    label: "Children & Families",
    displayValue: "5,000+",
    description: "Supported through counselling & therapy",
  },
  {
    icon: Award,
    value: 10,
    suffix: "+",
    label: "Over a decade",
    displayValue: "10+",
    description: "Clinical experience & guidance",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "★",
    label: "Google rating",
    displayValue: "4.9★",
    description: "Trusted by parents in Indore",
    decimal: true,
  },
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
        setCount(formatNumber(Math.floor(currentValue)));
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(decimal ? end.toFixed(1) : formatNumber(end));
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [start, end, decimal]);

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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white shadow-lg shadow-[#0F3D5E]/20 transition duration-300 group-hover:bg-[#2CB1A6] sm:mb-5">
                    <Icon
                      size={22}
                      className={isRating ? "fill-white text-white" : ""}
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

        <div className="mt-3 rounded-3xl bg-[#0F3D5E] px-5 py-4 text-center text-sm font-bold leading-6 text-white sm:text-base">
          <span className="inline-flex items-center justify-center gap-2">
            <ShieldCheck size={18} className="text-[#F4B183]" />
            RCI Registered • TEDx Speaker • Published Researcher • Parent-first
            clinical support
          </span>
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
