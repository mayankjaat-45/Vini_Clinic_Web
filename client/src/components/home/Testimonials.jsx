"use client";

import { motion } from "framer-motion";
import { Quote, Star, HeartHandshake, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Parent of 7-year-old child",
    role: "Child therapy support",
    text: "The sessions helped us understand our child better. The guidance was practical, gentle and very useful for home routines.",
    rating: 5,
  },
  {
    name: "Teen counselling client",
    role: "Exam anxiety support",
    text: "The counselling process felt safe and comfortable. It helped me manage pressure and communicate better with my parents.",
    rating: 5,
  },
  {
    name: "Parent consultation",
    role: "Behaviour guidance",
    text: "We received clear steps and parent strategies. The approach was very professional and emotionally supportive.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-18">
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-teal-100/70 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2 text-sm font-bold text-[#0F3D5E]">
            <HeartHandshake size={16} className="text-[#2CB1A6]" />
            Trusted by families
          </div>

          <h2 className="text-4xl font-black tracking-tight text-[#102A43] md:text-6xl">
            Gentle support,{" "}
            <span className="bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
              real progress.
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            A premium reviews section builds trust and gives visitors confidence
            before they book a consultation.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-4xl border border-slate-100 bg-white p-7 shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
            >
              <div className="absolute right-5 top-5 text-[#2CB1A6]/10">
                <Quote size={80} />
              </div>

              <div className="relative">
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#F4B183] text-[#F4B183]"
                    />
                  ))}
                </div>

                <p className="min-h-37.5 text-base leading-8 text-slate-600">
                  “{item.text}”
                </p>

                <div className="mt-7 flex items-center gap-4 border-t border-slate-100 pt-6">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-linear-to-br from-[#0F3D5E] to-[#2CB1A6] text-lg font-black text-white">
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-16 rounded-4xl border border-slate-100 bg-[#F7FBFC] p-8 md:p-10"
        >
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <h3 className="text-3xl font-black text-[#102A43]">
                4.9 star review experience
              </h3>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                This section can later be connected with real Google reviews,
                parent feedback or manually added testimonials from the admin
                panel.
              </p>
            </div>

            <div className="flex md:justify-end">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
              >
                Book Consultation
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
