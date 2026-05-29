"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, CalendarDays, HeartHandshake, Star } from "lucide-react";

const stats = [
  {
    icon: CalendarDays,
    number: 2013,
    suffix: "",
    label: "Trusted since",
  },
  {
    icon: HeartHandshake,
    number: 5000,
    suffix: "+",
    label: "Children & families supported",
  },
  {
    icon: Award,
    number: 15,
    suffix: "+",
    label: "Years of experience",
  },
  {
    icon: Star,
    number: 4.9,
    suffix: "★",
    label: "Google rating",
    decimal: true,
  },
];

const CountUp = ({ end, suffix = "", prefix = "", decimal = false }) => {
  const [count, setCount] = useState(decimal ? "0.0" : 0);
  const ref = useRef(null);
  const frameRef = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1600;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = end * easedProgress;

      if (decimal) {
        setCount(currentValue.toFixed(1));
      } else {
        setCount(Math.floor(currentValue));
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(decimal ? end.toFixed(1) : end);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isInView, end, decimal]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const StatsStrip = () => {
  return (
    <section className="relative z-20 -mt-8 px-4 sm:px-5 md:-mt-12">
      <div className="mx-auto max-w-7xl rounded-4xl border border-white/70 bg-white/90 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-5 md:rounded-[2.5rem]">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="group rounded-3xl bg-[#F7FBFC] p-4 transition duration-300 hover:-translate-y-1 hover:bg-[#E9F8F6] hover:shadow-xl hover:shadow-slate-900/10 sm:p-5 md:p-6"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white shadow-lg shadow-[#0F3D5E]/20 transition duration-300 group-hover:bg-[#2CB1A6] sm:h-12 sm:w-12">
                  <Icon size={21} />
                </div>

                <h3 className="text-2xl font-black leading-none text-[#102A43] sm:text-3xl md:text-4xl">
                  <CountUp
                    end={item.number}
                    suffix={item.suffix}
                    decimal={item.decimal}
                  />
                </h3>

                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500 sm:text-sm">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;
