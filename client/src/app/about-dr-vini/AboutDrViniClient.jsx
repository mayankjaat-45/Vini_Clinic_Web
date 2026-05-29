"use client";

import { motion } from "framer-motion";
import {
  Award,
  Brain,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Mic2,
  Quote,
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
  "Since 2013 | 5000+ Children | 100+ Schools & Families across India",
];

const expertise = [
  {
    title: "Autism Spectrum Disorder",
    desc: "Assessment, early intervention, and long-term developmental support for children across the spectrum.",
  },
  {
    title: "ADHD",
    desc: "Evidence-based assessment and behaviour management — including AIIMS-certified protocols.",
  },
  {
    title: "Dyslexia & Learning Disabilities",
    desc: "Specialist identification and intervention for specific learning disabilities in children of all ages.",
  },
  {
    title: "Child & Adolescent Mental Health",
    desc: "Counselling, emotional regulation, anxiety, school refusal, behavioural challenges, and more.",
  },
  {
    title: "Psychological Assessments",
    desc: "Comprehensive cognitive, developmental, and psychoeducational assessments.",
  },
  {
    title: "Early Intervention",
    desc: "Structured, play-based intervention for toddlers and young children showing developmental concerns.",
  },
  {
    title: "Adult Mental Health",
    desc: "Individual counselling, couple counselling, family therapy, grief support, and parenting guidance.",
  },
  {
    title: "Research & Professional Training",
    desc: "Published in international peer-reviewed journals and active in training psychology students.",
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
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -45,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 45,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
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
      <section className="relative px-4 py-20 text-center sm:px-5 md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl md:h-96 md:w-96"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
          className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl md:h-96 md:w-96"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-6xl"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm"
          >
            <Sparkles size={16} className="text-[#2CB1A6]" />
            About Dr. Vini
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-black leading-tight text-[#102A43] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            When the world had given up on them —
            <span className="block bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
              we were just getting started.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-4xl text-base font-semibold leading-8 text-slate-600 sm:text-lg md:text-xl md:leading-9"
          >
            Children others called difficult, slow, or broken have gone on to
            top their boards, get into mainstream schools, and become doctors,
            designers, and engineers.
          </motion.p>
        </motion.div>
      </section>

      {/* Credentials */}
      <section className="relative z-10 -mt-8 px-4 sm:px-5">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-7xl rounded-4xl border border-white bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-6 md:rounded-[3rem]"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-3"
          >
            <Award className="shrink-0 text-[#F4B183]" />
            <h2 className="text-xl font-black text-[#102A43] sm:text-2xl">
              Credentials at a glance
            </h2>
          </motion.div>

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
                whileHover={{ y: -5, scale: 1.02 }}
                className="rounded-2xl bg-[#F7FBFC] px-4 py-4 text-sm font-bold leading-6 text-slate-700 transition sm:px-5"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Story */}
      <section className="px-4 py-20 sm:px-5 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-7 text-white shadow-2xl shadow-blue-950/20 md:rounded-[3rem] md:p-8 lg:sticky lg:top-28"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Quote className="mb-6 text-[#F4B183]" size={42} />
            </motion.div>

            <h2 className="text-3xl font-black leading-tight sm:text-4xl">
              The question nobody was asking.
            </h2>

            <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
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
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-5"
            >
              {[
                "Every child I have ever worked with came to me carrying a label.",
                "Stubborn. Lazy. Aggressive. Slow. Difficult. Too much.",
                "And behind every label was a parent who had been everywhere — paediatricians, tutors, teachers, relatives with advice — and had come away with nothing but more confusion, more guilt, and a quiet fear that something was fundamentally wrong with their child.",
                "Nothing was fundamentally wrong. The wrong thing was that nobody had stopped long enough to ask the right question.",
                "What is this child trying to tell us?",
                "That question has been at the centre of my work for over a decade. It is the question I ask before every assessment, before every therapy session, before every conversation with a parent sitting across from me — exhausted, scared, and holding on.",
                "I am Dr. Vini Jhariya — Clinical and Child Psychologist, TEDx speaker, published researcher, and the founder of Urjasvini Child Development Centre and Urjasvini Special School. I work with children and families across India — in clinic in Indore, and online for families wherever they are.",
                "My practice is not built on giving parents hope. It is built on giving them answers. And then a plan. And then walking with them until they do not need me anymore.",
              ].map((text, index) => (
                <motion.p
                  key={index}
                  variants={fadeUp}
                  className={
                    index === 4
                      ? "text-xl font-black leading-8 text-[#0F3D5E] sm:text-2xl sm:leading-9"
                      : "text-base leading-8 text-slate-600 sm:text-lg sm:leading-9"
                  }
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-7xl rounded-4xl bg-[#102A43] p-7 text-center text-white shadow-2xl shadow-slate-900/20 sm:p-10 md:rounded-[3rem] md:p-16"
        >
          <motion.div
            animate={{ rotate: [0, -4, 4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Quote className="mx-auto mb-7 text-[#F4B183]" size={44} />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl"
          >
            Behaviour is not the problem.
            <span className="block text-[#F4B183]">
              Behaviour is communication.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mt-7 max-w-4xl text-base leading-8 text-white/75 sm:text-lg md:text-xl md:leading-9"
          >
            Every child who has ever been called difficult is trying to say
            something important. The question is whether the adults around them
            are truly listening.
          </motion.p>
        </motion.div>
      </section>

      {/* Expertise */}
      <section className="px-4 pb-20 sm:px-5 md:pb-24">
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
              Expertise
            </div>

            <h2 className="text-3xl font-black text-[#102A43] sm:text-4xl md:text-6xl">
              Where the expertise lies.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Trained by globally recognised institutions. Practising at the
              intersection of clinical precision and human connection.
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
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-4xl border border-white bg-white p-6 shadow-xl shadow-slate-900/5 transition hover:shadow-2xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
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
      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 md:rounded-[3rem] md:p-10"
          >
            <motion.div
              whileHover={{ rotate: 8, scale: 1.08 }}
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white"
            >
              <Video size={26} />
            </motion.div>

            <h2 className="text-3xl font-black text-[#102A43] sm:text-4xl">
              The work, recognised.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Dr. Vini Jhariya took to the TEDx stage at TEDxMLNC, Delhi
              University in 2026 — bringing the conversation about child
              behaviour, misdiagnosis, and the power of the right intervention
              to one of the world’s most respected platforms.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-7 flex aspect-video items-center justify-center rounded-4xl bg-[#102A43] p-5 text-center text-white"
            >
              <div>
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Mic2 className="mx-auto mb-3 text-[#F4B183]" size={38} />
                </motion.div>

                <p className="font-black">TEDx Video Placeholder</p>
                <p className="mt-1 text-sm text-white/60">
                  Add YouTube embed link when available
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-6 text-white shadow-2xl shadow-blue-950/20 sm:p-8 md:rounded-[3rem] md:p-10"
          >
            <h2 className="text-3xl font-black">Recognition</h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-7 space-y-4"
            >
              {[
                "Free Press Ahilya Award — Excellence in Psychology",
                "iRise Women Conclave — Social Impact Award",
                "Lions Club Recognition Award",
                "Published in international peer-reviewed journals",
                "RCI Registered — M.Phil in Clinical Psychology",
              ].map((item) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-sm font-bold leading-6 text-white/85"
                >
                  <Star
                    size={18}
                    className="mt-0.5 shrink-0 fill-[#F4B183] text-[#F4B183]"
                  />
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-7xl rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 md:rounded-[3rem] md:p-10"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black text-[#0F766E] sm:text-sm">
              <GraduationCap size={16} />
              Training & Certifications
            </div>

            <h2 className="text-3xl font-black text-[#102A43] sm:text-4xl">
              Trained globally. Practising with purpose.
            </h2>

            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              A practice built on evidence, sharpened by international training,
              and grounded in over a decade of real clinical work.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-3 md:grid-cols-2"
          >
            {certifications.map((item) => (
              <motion.div
                key={item}
                variants={fadeUp}
                whileHover={{ x: 5, scale: 1.01 }}
                className="flex items-start gap-3 rounded-2xl bg-[#F7FBFC] px-4 py-4 text-sm font-bold leading-6 text-slate-700 sm:items-center sm:px-5"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-[#2CB1A6] sm:mt-0"
                />
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Reviews */}
      <section className="px-4 pb-20 sm:px-5 md:pb-24">
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
              Families who found their way here.
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 lg:grid-cols-3"
          >
            {reviews.map((review) => (
              <motion.div
                key={review.author}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-7"
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
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-7xl rounded-4xl bg-[#E9F8F6] p-7 text-center sm:p-10 md:rounded-[3rem] md:p-16"
        >
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-6xl"
          >
            If you are worried about your child, you are in the right place.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg"
          >
            You do not need to have all the answers before you come. You just
            need to take the first step.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-9 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <motion.a
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="/contact"
              className="rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:bg-[#102A43]"
            >
              Book Consultation
            </motion.a>

            <motion.a
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white transition hover:bg-[#1fb85a]"
            >
              WhatsApp Us
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
