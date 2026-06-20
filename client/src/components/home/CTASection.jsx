"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Video,
} from "lucide-react";

const careHighlights = [
  {
    icon: ShieldCheck,
    title: "Safe & confidential",
    text: "Share your concern in a respectful, private and non-judgmental space.",
  },
  {
    icon: Video,
    title: "Online + in-clinic care",
    text: "Consultation support is available in Indore and online for families across India.",
  },
];

const reassurancePoints = [
  "You do not need to know the exact diagnosis first",
  "Guidance is available for children, teens, parents and families",
  "The first step can simply be sharing what you are noticing",
];

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-5 py-16">
      <div className="absolute -left-35 -top-30 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
      <div className="absolute -right-35 -bottom-30 h-96 w-96 rounded-full bg-[#0F3D5E]/15 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-[#0F3D5E] p-7 text-white shadow-2xl shadow-blue-950/25 sm:p-8 md:rounded-[3rem] md:p-14"
      >
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-25 left-[35%] h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white">
              <Sparkles size={16} className="text-[#F4B183]" />
              Begin with the right guidance
            </div>

            <h2 className="max-w-4xl text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              Not sure what your child needs? Start by sharing your concern.
            </h2>

            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/75 sm:text-lg">
              Whether you are worried about behaviour, attention, learning,
              speech, anxiety, emotional outbursts or parenting stress, the
              first step is a calm conversation.
            </p>

            <div className="mt-7 grid gap-3">
              {reassurancePoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 text-sm font-bold leading-6 text-white/80"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#F4B183]"
                  />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
              >
                <CalendarCheck size={18} />
                Book Consultation
                <ArrowRight size={17} />
              </a>

              <a
                href="https://wa.me/917999215093"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/15"
              >
                <MessageCircle size={18} />
                WhatsApp Now
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {careHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-4xl bg-white/10 p-6 backdrop-blur-xl"
                >
                  <Icon className="mb-4 text-[#F4B183]" size={28} />

                  <h3 className="text-xl font-black">{item.title}</h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-white/70">
                    {item.text}
                  </p>
                </div>
              );
            })}

            <div className="rounded-4xl border border-white/10 bg-white p-6 text-[#102A43] shadow-xl shadow-blue-950/10">
              <HeartHandshake className="mb-4 text-[#2CB1A6]" size={28} />

              <h3 className="text-xl font-black">Parent-first support</h3>

              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                Parents are guided with practical next steps, not confusing
                labels or fear-based advice.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
