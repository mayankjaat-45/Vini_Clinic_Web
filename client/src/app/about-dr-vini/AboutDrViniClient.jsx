"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Brain,
  CalendarCheck,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Mic2,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";

const credentials = [
  "TEDx Speaker — TEDxMLNC, Delhi University, 2026",
  "Founder — Urjasvini Child Development Centre, Indore",
  "Founder — Urjasvini Special School, Indore",
  "Published Researcher — International Peer-Reviewed Journals",
  "RCI Registered Clinical Psychologist",
  "Free Press Ahilya Award",
  "iRise Women Conclave — Social Impact Award",
  "Lions Club Recognition Award",
  "Formerly — Clinical & Child Psychologist, Choithram Hospital and Research Center, Indore",
  "Trusted Since 2013 | 5,000+ Families Supported | 100+ Schools & Families across India",
];

const stats = [
  {
    icon: Award,
    value: "2013",
    label: "Trusted since",
  },
  {
    icon: Users,
    value: "5,000+",
    label: "Families supported",
  },
  {
    icon: ShieldCheck,
    value: "RCI",
    label: "Registered psychologist",
  },
  {
    icon: Star,
    value: "4.9★",
    label: "Google rating",
  },
];

const expertise = [
  {
    title: "Autism Spectrum Disorder",
    desc: "Assessment, early intervention, and developmental support for children across the spectrum.",
  },
  {
    title: "ADHD",
    desc: "Evidence-based assessment and behaviour management, including AIIMS-certified protocols.",
  },
  {
    title: "Dyslexia & Learning Disabilities",
    desc: "Specialist identification and intervention for specific learning disabilities in children.",
  },
  {
    title: "Child & Adolescent Mental Health",
    desc: "Counselling for anxiety, emotional regulation, school refusal and behavioural challenges.",
  },
  {
    title: "Psychological Assessments",
    desc: "Comprehensive cognitive, developmental and psychoeducational assessments.",
  },
  {
    title: "Early Intervention",
    desc: "Structured, play-based intervention for toddlers and young children with developmental concerns.",
  },
  {
    title: "Parent & Family Guidance",
    desc: "Practical guidance for parents to understand behaviour, emotions, school concerns and therapy planning.",
  },
  {
    title: "Research & Training",
    desc: "Published in international peer-reviewed journals and active in psychology student training.",
  },
];

const certifications = [
  "REBT / RECBT — Albert Ellis Institute, USA",
  "CBT — Beck Institute, USA",
  "Dyslexia Specialist — Internationally Certified",
  "ADHD Toolkit — AIIMS",
  "Feuerstein Instrumental Enrichment",
  "Play Therapy — Certified Practitioner",
  "Arts-Based Therapy",
  "Sand Therapy",
  "Music Therapy",
  "Trauma-Informed Therapist",
  "Bayley Scales of Infant Development",
  "Early Intervention Specialist",
  "Sensory Integration Therapy",
  "RCI Registered Clinical Psychologist — M.Phil in Clinical Psychology",
  "And much more.",
];

const reviews = [
  {
    quote:
      "We had tried everything. Every doctor, every therapy, every piece of advice from every relative. By the time we reached Dr. Vini, we had almost stopped believing anything would work. She did not give us false hope. She gave us a plan.",
    author: "Mother of a child with autism, Indore",
  },
  {
    quote:
      "Four years of being told our daughter was slow. One assessment with Dr. Vini and we finally had the truth — she was not slow, she had a learning disability that nobody had caught.",
    author: "Father of a child with SLD, Indore",
  },
  {
    quote:
      "Dr. Vini did not look at my son like he was a problem to be solved. She looked at him like he was a person to be understood. That was the moment I knew we were in the right place.",
    author: "Parent of a child with ADHD, Madhya Pradesh",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function AboutDrViniClient() {
  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      {/* Hero */}
      <section className="relative px-4 pb-16 pt-20 sm:px-5 md:pb-20 md:pt-24">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl md:h-96 md:w-96" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F4B183]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm"
            >
              <Sparkles size={16} className="text-[#2CB1A6]" />
              About Dr. Vini Jhariya
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-black leading-tight text-[#102A43] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Understanding children beyond{" "}
              <span className="bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
                labels.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg md:text-xl md:leading-9"
            >
              Dr. Vini Jhariya helps children, adolescents and families find
              clarity through clinical assessment, counselling, therapy planning
              and parent guidance.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 grid gap-3 sm:grid-cols-2"
            >
              {[
                "Clinical & Child Psychologist",
                "RCI Registered",
                "TEDx Speaker",
                "Founder of Urjasvini CDC",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#0F3D5E] shadow-sm"
                >
                  <CheckCircle2 size={17} className="text-[#2CB1A6]" />
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:bg-[#102A43]"
              >
                <CalendarCheck size={18} />
                Book Consultation
                <ArrowRight size={17} />
              </a>

              <a
                href="https://wa.me/917999215093"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-7 py-4 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div className="rounded-4xl bg-white p-4 shadow-2xl shadow-slate-900/10 md:rounded-[3rem] md:p-5">
              <div className="relative overflow-hidden rounded-[1.6rem] bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-7 text-white md:rounded-[2.4rem] md:p-8">
                <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-20 left-10 h-60 w-60 rounded-full bg-[#F4B183]/20 blur-3xl" />

                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15"
                  >
                    <HeartHandshake size={34} className="text-[#F4B183]" />
                  </motion.div>

                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-white/60">
                    Clinical approach
                  </p>

                  <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                    Listen first. Understand deeply. Plan clearly.
                  </h2>

                  <p className="mt-5 text-sm font-semibold leading-7 text-white/75 sm:text-base">
                    The goal is not to label a child. The goal is to understand
                    the reason behind behaviour, emotions, learning or
                    developmental concerns.
                  </p>

                  <div className="mt-8 space-y-3">
                    {[
                      "Child-first understanding",
                      "Parent-friendly explanations",
                      "Assessment-led planning",
                      "Online + Indore support",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3"
                      >
                        <CheckCircle2 size={18} className="text-[#F4B183]" />
                        <span className="text-sm font-black">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-2 rounded-3xl bg-white/10 p-5 text-sm font-bold text-white/80">
                    <MapPin size={18} className="text-[#F4B183]" />
                    Indore clinic consultations and online support available
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 -mt-4 px-4 sm:px-5">
        <div className="mx-auto max-w-7xl rounded-4xl border border-white/80 bg-white/90 p-3 shadow-2xl shadow-slate-900/10 backdrop-blur-xl md:rounded-[2.5rem]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="rounded-3xl bg-[#F7FBFC] p-5 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white">
                    <Icon size={22} />
                  </div>

                  <p className="text-3xl font-black text-[#102A43]">
                    {item.value}
                  </p>

                  <p className="mt-2 text-sm font-black text-[#0F3D5E]">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="px-4 py-16 sm:px-5 md:py-20">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-7xl rounded-4xl border border-white bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-6 md:rounded-[3rem]"
        >
          <div className="mb-6 flex items-center gap-3">
            <Award className="shrink-0 text-[#F4B183]" />
            <h2 className="text-xl font-black text-[#102A43] sm:text-2xl">
              Credentials at a glance
            </h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-3 md:grid-cols-2 xl:grid-cols-3"
          >
            {credentials.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                className="rounded-2xl bg-[#F7FBFC] px-4 py-4 text-sm font-bold leading-6 text-slate-700 transition hover:-translate-y-1 hover:bg-[#E9F8F6] sm:px-5"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Story */}
      <section className="px-4 pb-16 sm:px-5 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-7 text-white shadow-2xl shadow-blue-950/20 md:rounded-[3rem] md:p-8 lg:sticky lg:top-28"
          >
            <Quote className="mb-6 text-[#F4B183]" size={42} />

            <h2 className="text-3xl font-black leading-tight sm:text-4xl">
              The question that guides every session.
            </h2>

            <p className="mt-5 text-base font-semibold leading-8 text-white/75 sm:text-lg">
              What is this child trying to tell us?
            </p>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl border border-white bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 md:rounded-[3rem] md:p-10"
          >
            <div className="space-y-5">
              {[
                "Every child comes with a story, not just a symptom.",
                "Some children are called stubborn, lazy, aggressive, slow, difficult or too sensitive.",
                "Behind many of these labels is a parent who has already tried doctors, teachers, tutors, advice from relatives, and long nights of worry.",
                "In many cases, the child is not the problem. The missing piece is understanding what the behaviour is communicating.",
                "That question has shaped Dr. Vini Jhariya’s work since 2013.",
                "Her approach combines clinical assessment, therapy planning, counselling, school guidance and parent support so families receive clarity, not confusion.",
                "At Urjasvini Child Development Centre and Urjasvini Special School, the focus is simple: understand the child, support the family, and build a practical plan.",
              ].map((text, index) => (
                <p
                  key={index}
                  className={
                    index === 3
                      ? "text-xl font-black leading-8 text-[#0F3D5E] sm:text-2xl sm:leading-9"
                      : "text-base font-semibold leading-8 text-slate-600 sm:text-lg sm:leading-9"
                  }
                >
                  {text}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-4 pb-16 sm:px-5 md:pb-20">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-7xl rounded-4xl bg-[#102A43] p-7 text-center text-white shadow-2xl shadow-slate-900/20 sm:p-10 md:rounded-[3rem] md:p-16"
        >
          <Quote className="mx-auto mb-7 text-[#F4B183]" size={44} />

          <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
            Behaviour is not the problem.
            <span className="block text-[#F4B183]">
              Behaviour is communication.
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-4xl text-base font-semibold leading-8 text-white/75 sm:text-lg md:text-xl md:leading-9">
            Every child who has ever been called difficult may be trying to say
            something important. The work begins when adults learn how to
            listen.
          </p>
        </motion.div>
      </section>

      {/* Expertise */}
      <section className="px-4 pb-16 sm:px-5 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-10 text-center md:mb-12"
          >
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
              <Brain size={16} className="text-[#2CB1A6]" />
              Areas of Expertise
            </div>

            <h2 className="text-3xl font-black text-[#102A43] sm:text-4xl md:text-6xl">
              Clinical care for children, teens and families.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              A practice built at the intersection of clinical precision,
              evidence-based tools and human connection.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          >
            {expertise.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group rounded-4xl border border-white bg-white p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E] transition group-hover:bg-[#0F3D5E] group-hover:text-white">
                  <HeartHandshake size={22} />
                </div>

                <h3 className="text-lg font-black text-[#102A43] sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEDx & Recognition */}
      <section className="px-4 pb-16 sm:px-5 md:pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 md:rounded-[3rem] md:p-10"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white">
              <Video size={26} />
            </div>

            <h2 className="text-3xl font-black text-[#102A43] sm:text-4xl">
              The work, recognised.
            </h2>

            <p className="mt-5 text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              Dr. Vini Jhariya took to the TEDx stage at TEDxMLNC, Delhi
              University in 2026, bringing the conversation about child
              behaviour, misdiagnosis and the power of the right intervention to
              a wider audience.
            </p>

            <div className="mt-7 flex aspect-video items-center justify-center rounded-4xl bg-[#102A43] p-5 text-center text-white">
              <div>
                <Mic2 className="mx-auto mb-3 text-[#F4B183]" size={38} />
                <p className="font-black">TEDx Talk</p>
                <p className="mt-1 text-sm text-white/60">
                  Video link will be updated after official publication.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-6 text-white shadow-2xl shadow-blue-950/20 sm:p-8 md:rounded-[3rem] md:p-10"
          >
            <h2 className="text-3xl font-black">Recognition</h2>

            <div className="mt-7 space-y-4">
              {[
                "Free Press Ahilya Award — Excellence in Psychology",
                "iRise Women Conclave — Social Impact Award",
                "Lions Club Recognition Award",
                "Published in international peer-reviewed journals",
                "RCI Registered — M.Phil in Clinical Psychology",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-sm font-bold leading-6 text-white/85"
                >
                  <Star
                    size={18}
                    className="mt-0.5 shrink-0 fill-[#F4B183] text-[#F4B183]"
                  />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-4 pb-16 sm:px-5 md:pb-20">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-7xl rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 md:rounded-[3rem] md:p-10"
        >
          <div className="mb-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black text-[#0F766E] sm:text-sm">
              <GraduationCap size={16} />
              Training & Certifications
            </div>

            <h2 className="text-3xl font-black text-[#102A43] sm:text-4xl">
              Trained globally. Practising with purpose.
            </h2>

            <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              A practice built on evidence, international training and clinical
              work with children and families since 2013.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {certifications.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-[#F7FBFC] px-4 py-4 text-sm font-bold leading-6 text-slate-700 sm:items-center sm:px-5"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-[#2CB1A6] sm:mt-0"
                />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Reviews */}
      <section className="px-4 pb-16 sm:px-5 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
              <Users size={16} className="text-[#2CB1A6]" />
              Parent Reviews
            </div>

            <h2 className="text-3xl font-black text-[#102A43] sm:text-4xl md:text-6xl">
              Families who found clarity.
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <motion.div
                key={review.author}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10 sm:p-7"
              >
                <Quote className="mb-5 text-[#2CB1A6]" size={30} />

                <p className="text-sm font-semibold italic leading-7 text-slate-600 sm:text-base sm:leading-8">
                  “{review.quote}”
                </p>

                <p className="mt-6 text-sm font-black text-[#0F3D5E]">
                  — {review.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-7 text-center text-white shadow-2xl shadow-blue-950/20 sm:p-10 md:rounded-[3rem] md:p-16"
        >
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#F4B183]/20 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
              Worried about your child? Start with a conversation.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-8 text-white/75 sm:text-lg">
              You do not need to know the exact diagnosis before reaching out.
              Share what you are noticing, and our team will guide you toward
              the right next step.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black text-[#0F3D5E] shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
              >
                <CalendarCheck size={18} />
                Book Consultation
              </a>

              <a
                href="https://wa.me/917999215093"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#1fb85a]"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
