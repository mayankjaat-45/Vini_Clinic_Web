"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  HeartHandshake,
  MessageCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

const testimonials = [
  {
    name: "Parent of a young child",
    role: "Child behaviour support",
    text: "The consultation helped us understand that our child was not being difficult intentionally. We received clear guidance, practical home strategies and a calmer way to support our child.",
    rating: 5,
  },
  {
    name: "Parent consultation",
    role: "Learning & attention concerns",
    text: "The assessment process gave us clarity about our child’s learning needs. Dr. Vini explained everything patiently and helped us understand the next steps without fear or confusion.",
    rating: 5,
  },
  {
    name: "Adolescent counselling",
    role: "Emotional support",
    text: "The counselling space felt safe, respectful and non-judgmental. It helped in better communication, emotional regulation and confidence during a difficult phase.",
    rating: 5,
  },
];

const successStories = [
  {
    title: "From confusion to clarity",
    text: "A family came in worried about behaviour issues. After assessment and parent guidance, they understood the real triggers and started responding with structure instead of stress.",
  },
  {
    title: "Support beyond labels",
    text: "A child struggling with attention and learning began receiving targeted support after clinical assessment, helping parents and teachers work with the child more effectively.",
  },
  {
    title: "A calmer family journey",
    text: "With counselling and parent sessions, a family learned how to handle emotional outbursts with patience, consistency and better communication.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-5 sm:py-18 md:py-22">
      <div className="absolute -left-30 top-20 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" />
      <div className="absolute bottom-20 -right-30 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
            <HeartHandshake size={16} className="text-[#2CB1A6]" />
            Trusted by families
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#102A43] sm:text-4xl md:text-6xl">
            Real support for children,{" "}
            <span className="bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
              parents and families.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            Families come to Urjasvini Child Development Centre when they need
            clarity, clinical understanding and a supportive plan for the next
            step.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0F3D5E]/10 bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
              <Star size={16} className="fill-[#F4B183] text-[#F4B183]" />
              4.9★ Google Rating
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#0F3D5E]/10 bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
              <ShieldCheck size={16} className="text-[#2CB1A6]" />
              RCI Registered
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#0F3D5E]/10 bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Since 2013
            </span>
          </div>
        </motion.div>

        {/* Reviews */}
        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-4xl border border-slate-100 bg-white p-5 shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10 sm:p-7"
            >
              <div className="absolute right-5 top-5 text-[#2CB1A6]/10">
                <Quote size={80} />
              </div>

              <div className="relative">
                <div className="mb-5 flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#F4B183] text-[#F4B183]"
                    />
                  ))}
                </div>

                <p className="min-h-auto text-sm font-semibold leading-7 text-slate-600 sm:min-h-44 sm:text-base sm:leading-8">
                  “{item.text}”
                </p>

                <div className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#0F3D5E] to-[#2CB1A6] text-lg font-black text-white sm:h-13 sm:w-13">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-black text-[#102A43]">{item.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories Preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-14 overflow-hidden rounded-4xl bg-[#F7FBFC] p-5 shadow-xl shadow-slate-900/5 sm:mt-16 sm:p-7 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
                <Sparkles size={16} className="text-[#2CB1A6]" />
                Success stories
              </div>

              <h3 className="text-3xl font-black leading-tight text-[#102A43] sm:text-4xl">
                Small changes can create meaningful progress.
              </h3>

              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                Every child and family journey is different. These stories show
                how the right assessment, counselling and parent guidance can
                bring clarity and confidence.
              </p>

              <a
                href="/success-stories"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
              >
                View Success Stories
                <ArrowRight size={17} />
              </a>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-[1.6rem] bg-white p-5 shadow-sm"
                >
                  <p className="mb-4 flex h-9 w-9 items-center justify-center rounded-2xl bg-[#E9F8F6] text-sm font-black text-[#0F766E]">
                    {index + 1}
                  </p>

                  <h4 className="text-lg font-black leading-snug text-[#102A43]">
                    {story.title}
                  </h4>

                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                    {story.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-12 overflow-hidden rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-6 text-white shadow-2xl shadow-blue-950/20 sm:p-8 md:rounded-[2.5rem] md:p-10"
        >
          <div className="grid gap-7 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h3 className="text-2xl font-black leading-tight sm:text-3xl">
                Ready to speak with Dr. Vini Jhariya?
              </h3>

              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-white/70 sm:text-base">
                Book a consultation or send a WhatsApp message to understand the
                right next step for your child or family.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1"
              >
                <CalendarCheck size={18} />
                Book Consultation
              </a>

              <a
                href="https://wa.me/917999215093"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/15"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
