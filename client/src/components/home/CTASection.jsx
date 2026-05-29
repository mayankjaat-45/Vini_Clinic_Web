"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  MessageCircle,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-5 py-18">
      <div className="absolute -left-35 -top-30 h-96 w-96 rounded-full bg-teal-200/60 blur-3xl" />
      <div className="absolute -right-35 -bottom-30 h-96 w-96 rounded-full bg-blue-200/60 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#0F3D5E] p-8 text-white shadow-2xl shadow-blue-950/25 md:p-14"
      >
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-25 left-[35%] h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white">
              <Sparkles size={16} className="text-[#F4B183]" />
              Begin with the right guidance
            </div>

            <h2 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
              Ready to help families feel understood, supported and guided?
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              A clean booking journey helps parents, students and adults reach
              out comfortably for consultation, therapy, assessment or online
              support.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1"
              >
                <CalendarCheck size={18} />
                Book Consultation
                <ArrowRight size={17} />
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/15"
              >
                <MessageCircle size={18} />
                WhatsApp Now
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-4xl bg-white/10 p-6 backdrop-blur-xl">
              <ShieldCheck className="mb-4 text-[#F4B183]" size={28} />
              <h3 className="text-xl font-black">Safe & confidential</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">
                UI messaging should make visitors feel secure before sharing
                their concern.
              </p>
            </div>

            <div className="rounded-4xl bg-white/10 p-6 backdrop-blur-xl">
              <CalendarCheck className="mb-4 text-[#F4B183]" size={28} />
              <h3 className="text-xl font-black">Online + offline care</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">
                The website can highlight clinic visits, online sessions and NRI
                consultations clearly.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
