"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Globe2,
  HeartHandshake,
  MapPin,
  MessageCircle,
  PhoneCall,
  Sparkles,
  Users,
} from "lucide-react";

const consultationOptions = [
  {
    id: "clinic",
    icon: MapPin,
    tabTitle: "Clinic Visit",
    eyebrow: "In-clinic consultation",
    title: "Meet Dr. Vini at the Indore clinic.",
    description:
      "Choose an in-person consultation when you want to discuss your child’s concern, understand whether assessment is needed and receive clear guidance about the next steps.",
    benefits: [
      "Detailed parent consultation",
      "Child observation when required",
      "Assessment and therapy guidance",
      "Clear recommendations for home and school",
    ],
    availability: "Appointment-based consultation",
    location: "Old Palasia, Indore",
    buttonText: "Book Clinic Consultation",
    whatsappMessage:
      "Hello Dr. Vini, I would like to book an in-clinic consultation for my child.",
  },
  {
    id: "online",
    icon: Globe2,
    tabTitle: "Online Consultation",
    eyebrow: "Consult from anywhere",
    title: "Get professional guidance through an online consultation.",
    description:
      "Online consultations are suitable for parents, adolescents and families who live outside Indore or prefer to begin with a video consultation.",
    benefits: [
      "Consult from anywhere in India",
      "Parent guidance through video call",
      "Discussion of reports and school concerns",
      "Follow-up support without travelling",
    ],
    availability: "Online appointments available",
    location: "Video consultation",
    buttonText: "Book Online Consultation",
    whatsappMessage:
      "Hello Dr. Vini, I would like to book an online consultation for my child.",
  },
  {
    id: "guidance",
    icon: HeartHandshake,
    tabTitle: "Not Sure",
    eyebrow: "Start with simple guidance",
    title: "Not sure which consultation or service to choose?",
    description:
      "You do not need to know the diagnosis or service name before reaching out. Start by sharing what you are noticing, and the clinic will help you identify the right first step.",
    benefits: [
      "Explain what you are observing",
      "Understand whether assessment is needed",
      "Choose the correct service",
      "Receive practical next-step guidance",
    ],
    availability: "Start with a conversation",
    location: "WhatsApp or consultation",
    buttonText: "Ask for Guidance",
    whatsappMessage:
      "Hello Dr. Vini, I am not sure which service is suitable. I would like guidance for my child.",
  },
];

const trustItems = [
  {
    icon: BadgeCheck,
    title: "RCI Registered",
    text: "Professional psychological care",
  },
  {
    icon: Users,
    title: "5,000+ Families",
    text: "Supported since 2013",
  },
  {
    icon: Clock3,
    title: "Clear Next Steps",
    text: "Practical guidance for parents",
  },
];

export default function CTASection() {
  const [activeOptionId, setActiveOptionId] = useState("clinic");

  const activeOption = useMemo(
    () =>
      consultationOptions.find((option) => option.id === activeOptionId) ||
      consultationOptions[0],
    [activeOptionId],
  );

  const ActiveIcon = activeOption.icon;

  const whatsappUrl = `https://wa.me/917999215093?text=${encodeURIComponent(
    activeOption.whatsappMessage,
  )}`;

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] py-16 sm:py-20 lg:py-24">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#2CB1A6]/12 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#F4B183]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#0F3D5E] shadow-[0_35px_100px_rgba(15,61,94,0.24)]">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#2CB1A6]/25 blur-3xl" />

            <div className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-[#F4B183]/15 blur-3xl" />

            <HeartHandshake
              aria-hidden="true"
              size={420}
              strokeWidth={0.45}
              className="absolute -bottom-24 -right-16 text-white/[0.035]"
            />

            <div className="relative p-6 sm:p-8 lg:p-12">
              {/* Heading */}
              <div className="mx-auto max-w-4xl text-center text-white">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#7DE0D6] backdrop-blur sm:text-sm">
                  <Sparkles size={16} />
                  Take the first step
                </div>

                <h2 className="mt-6 text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl lg:text-6xl">
                  The right support begins with understanding your child.
                </h2>

                <p className="mx-auto mt-5 max-w-3xl text-sm font-semibold leading-7 text-white/70 sm:text-base sm:leading-8">
                  Choose how you would like to begin. You can visit the clinic,
                  consult online or simply ask for guidance about the most
                  suitable next step.
                </p>
              </div>

              {/* Consultation selector */}
              <div className="mx-auto mt-10 grid max-w-3xl gap-3 rounded-[1.75rem] border border-white/10 bg-white/10 p-2 backdrop-blur sm:grid-cols-3">
                {consultationOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = activeOptionId === option.id;

                  return (
                    <motion.button
                      key={option.id}
                      type="button"
                      onClick={() => setActiveOptionId(option.id)}
                      whileTap={{ scale: 0.98 }}
                      aria-pressed={isActive}
                      className={`relative flex items-center justify-center gap-3 rounded-[1.3rem] px-4 py-4 text-sm font-black transition duration-300 ${
                        isActive
                          ? "bg-white text-[#0F3D5E] shadow-xl"
                          : "text-white/75 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-consultation-option"
                          className="absolute inset-0 rounded-[1.3rem] ring-2 ring-[#7DE0D6]/30"
                        />
                      )}

                      <Icon
                        size={19}
                        className={
                          isActive ? "text-[#168F87]" : "text-[#7DE0D6]"
                        }
                      />

                      <span className="relative">{option.tabTitle}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Dynamic consultation content */}
              <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[510px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white backdrop-blur sm:p-8 lg:p-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeOption.id}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -15,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="flex h-full flex-col"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <motion.div
                          initial={{
                            rotate: -8,
                            scale: 0.9,
                          }}
                          animate={{
                            rotate: 0,
                            scale: 1,
                          }}
                          className="flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-white text-[#168F87]"
                        >
                          <ActiveIcon size={28} />
                        </motion.div>

                        <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black text-[#7DE0D6]">
                          {activeOption.eyebrow}
                        </span>
                      </div>

                      <h3 className="mt-8 text-3xl font-black leading-tight sm:text-4xl">
                        {activeOption.title}
                      </h3>

                      <p className="mt-5 text-sm font-semibold leading-7 text-white/70 sm:text-base sm:leading-8">
                        {activeOption.description}
                      </p>

                      <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        {activeOption.benefits.map((benefit, index) => (
                          <motion.div
                            key={benefit}
                            initial={{
                              opacity: 0,
                              x: -12,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay: 0.08 + index * 0.06,
                            }}
                            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-4"
                          >
                            <CheckCircle2
                              size={18}
                              className="mt-0.5 shrink-0 text-[#7DE0D6]"
                            />

                            <p className="text-sm font-bold leading-6 text-white/85">
                              {benefit}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-auto flex flex-wrap gap-3 pt-8">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-bold text-white/75">
                          <Clock3 size={15} className="text-[#7DE0D6]" />
                          {activeOption.availability}
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-bold text-white/75">
                          <MapPin size={15} className="text-[#F4B183]" />
                          {activeOption.location}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Booking card */}
                <div className="flex flex-col rounded-[2rem] bg-white p-6 text-[#102A43] shadow-2xl sm:p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87]">
                    <CalendarCheck size={25} />
                  </div>

                  <h3 className="mt-6 text-2xl font-black leading-tight sm:text-3xl">
                    Begin with a simple conversation
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Share your child’s age, the concern you are observing and
                    whether you prefer an online or clinic consultation.
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      "No diagnosis required before booking",
                      "Online and offline consultations",
                      "Guidance about assessment and therapy",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl bg-[#F7FBFC] p-4"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-[#168F87]">
                          <BadgeCheck size={16} />
                        </span>

                        <p className="text-sm font-black text-slate-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto grid gap-3 pt-8">
                    <Link
                      href="/contact-us"
                      className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#0F3D5E]/15 transition hover:-translate-y-1 hover:bg-[#102A43]"
                    >
                      <CalendarCheck size={18} />
                      {activeOption.buttonText}

                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </Link>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#25D366]/20 transition hover:-translate-y-1 hover:bg-[#20BD5A]"
                    >
                      <MessageCircle size={18} />
                      WhatsApp the Clinic
                    </a>

                    <a
                      href="tel:+917999215093"
                      className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
                    >
                      <PhoneCall size={18} />
                      Call +91 79992 15093
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust strip */}
              <div className="mt-8 grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur sm:grid-cols-3">
                {trustItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className={`flex items-center gap-4 p-5 text-white sm:p-6 ${
                        index !== trustItems.length - 1
                          ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                          : ""
                      }`}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#168F87]">
                        <Icon size={22} />
                      </div>

                      <div>
                        <p className="text-sm font-black">{item.title}</p>

                        <p className="mt-1 text-xs font-semibold text-white/55">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
