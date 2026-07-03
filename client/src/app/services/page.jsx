"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { API } from "@/lib/api";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Brain,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileSearch,
  Globe2,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  Loader2,
  MessageCircle,
  Puzzle,
  Route,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Volume2,
  Zap,
} from "lucide-react";

const categoryIcons = {
  Children: Baby,
  Adults: Users,
  "Online Consultation": Globe2,
};

const categoryColors = {
  Children: "bg-[#E9F8F6] text-[#0F766E]",
  Adults: "bg-[#FFF1EA] text-[#C05621]",
  "Online Consultation": "bg-[#EEF4FF] text-[#3158D4]",
};

const concernCards = [
  {
    icon: Zap,
    title: "Hyperactivity",
    text: "Restless, distracted, impulsive or not listening",
    href: "/services/adhd-assessment-therapy-indore",
  },
  {
    icon: Volume2,
    title: "Speech Delay",
    text: "Delayed words, milestones, play or social response",
    href: "/services/early-intervention",
  },
  {
    icon: GraduationCap,
    title: "Learning Issues",
    text: "Reading, writing, spelling or school difficulty",
    href: "/services/dyslexia-support-indore",
  },
  {
    icon: Eye,
    title: "Autism Signs",
    text: "Eye contact, social play, sensory or communication concerns",
    href: "/services/autism-therapy-indore",
  },
];

const processSteps = [
  {
    icon: MessageCircle,
    title: "Share Concern",
    text: "Tell us what you are noticing.",
  },
  {
    icon: FileSearch,
    title: "Understand",
    text: "We explore the full picture.",
  },
  {
    icon: ClipboardCheck,
    title: "Care Plan",
    text: "You get the right direction.",
  },
  {
    icon: Target,
    title: "Progress",
    text: "Support continues step by step.",
  },
];

const supportTypes = [
  {
    icon: Brain,
    title: "Assessment-led",
    text: "We understand the reason behind the concern before suggesting support.",
  },
  {
    icon: HeartHandshake,
    title: "Parent-guided",
    text: "Parents receive simple, practical strategies for daily situations.",
  },
  {
    icon: Route,
    title: "Step-by-step",
    text: "The process is explained clearly, so families know what to expect.",
  },
];

const serviceFallbacks = [
  {
    keywords: ["autism", "asd"],
    icon: Puzzle,
    signs: ["Eye contact", "Social play", "Sensory needs"],
    visualLabel: "Development Support",
  },
  {
    keywords: ["adhd", "attention", "hyper"],
    icon: Zap,
    signs: ["Attention", "Restlessness", "Impulsivity"],
    visualLabel: "Attention Support",
  },
  {
    keywords: ["dyslexia", "learning", "school"],
    icon: GraduationCap,
    signs: ["Reading", "Writing", "Spelling"],
    visualLabel: "Learning Support",
  },
  {
    keywords: ["assessment", "psychological"],
    icon: ClipboardCheck,
    signs: ["Testing", "Report", "Clear guidance"],
    visualLabel: "Assessment",
  },
  {
    keywords: ["early", "speech", "intervention", "milestone"],
    icon: Baby,
    signs: ["Speech", "Milestones", "Play skills"],
    visualLabel: "Early Years",
  },
  {
    keywords: ["online"],
    icon: Globe2,
    signs: ["Video consult", "Parent guidance", "Follow-up"],
    visualLabel: "Online Support",
  },
  {
    keywords: ["counselling", "counseling", "teen", "adolescent"],
    icon: HeartHandshake,
    signs: ["Emotions", "Confidence", "Guidance"],
    visualLabel: "Counselling",
  },
];

const defaultServiceVisual = {
  icon: HeartHandshake,
  signs: ["Counselling", "Guidance", "Care plan"],
  visualLabel: "Therapy Support",
};

const getServiceVisual = (service) => {
  const searchableText = `${service?.title || ""} ${service?.slug || ""} ${
    service?.category || ""
  } ${service?.shortDescription || ""}`.toLowerCase();

  return (
    serviceFallbacks.find((item) =>
      item.keywords.some((keyword) => searchableText.includes(keyword)),
    ) || defaultServiceVisual
  );
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchServices = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/services");

      setServices(data?.data || []);
    } catch (error) {
      console.log("SERVICES FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const activeServices = useMemo(() => {
    return services.filter((service) => service?.isActive !== false);
  }, [services]);

  const categories = useMemo(() => {
    const uniqueCategories = activeServices
      .map((service) => service?.category)
      .filter(Boolean);

    return ["All", ...new Set(uniqueCategories)];
  }, [activeServices]);

  const filteredServices = useMemo(() => {
    if (activeCategory === "All") return activeServices;

    return activeServices.filter(
      (service) => service?.category === activeCategory,
    );
  }, [activeServices, activeCategory]);

  return (
    <main className="overflow-hidden bg-[#F7FBFC] text-[#102A43]">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-16 pt-24 md:pb-20">
        <div className="absolute -left-30 -top-30 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-30 top-20 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F4B183]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm backdrop-blur">
                <Sparkles size={16} className="text-[#2CB1A6]" />
                Services
              </div>

              <h1 className="max-w-5xl text-5xl font-black leading-[1.04] tracking-tight text-[#102A43] md:text-7xl">
                Find support by{" "}
                <span className="bg-gradient-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
                  looking at the concern.
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
                Parents do not always know the service name. Start with what you
                are noticing — behaviour, learning, speech, attention, emotions,
                development or parenting stress.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white shadow-xl shadow-[#0F3D5E]/20 transition hover:-translate-y-1"
                >
                  <CalendarCheck size={18} />
                  Book Consultation
                </a>

                <a
                  href="https://wa.me/917999215093"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-8 py-4 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>

            {/* Right Visual Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="rounded-[2.5rem] border border-white/80 bg-white/80 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur"
            >
              <div className="rounded-[2rem] bg-[#0F3D5E] p-6 text-white">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-[#F4B183]">
                  <HelpCircle size={14} />
                  Not sure where to start?
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight">
                  Share the concern. We guide the next step.
                </h2>

                <p className="mt-3 text-sm font-semibold leading-7 text-white/70">
                  The process usually begins with understanding, not labelling.
                </p>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {supportTypes.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-3xl bg-white p-4 shadow-sm"
                    >
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#2CB1A6]">
                        <Icon size={21} />
                      </div>

                      <p className="text-sm font-black text-[#102A43]">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Concern Cards */}
      <section className="px-5 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2.5rem] border border-white bg-white/85 p-5 shadow-xl shadow-slate-900/5 backdrop-blur md:p-7">
            <div className="mb-6 flex flex-col gap-3 text-center md:flex-row md:items-end md:justify-between md:text-left">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2CB1A6]">
                  Start here
                </p>
                <h2 className="mt-2 text-3xl font-black md:text-5xl">
                  What are you noticing?
                </h2>
              </div>

              <p className="mx-auto max-w-xl text-sm font-semibold leading-7 text-slate-500 md:mx-0">
                Tap a concern to view the most relevant support page.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {concernCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    className="group rounded-[1.75rem] border border-[#0F3D5E]/10 bg-[#F7FBFC] p-5 transition hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-white hover:shadow-xl hover:shadow-slate-900/10"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2CB1A6] shadow-sm transition group-hover:bg-[#2CB1A6] group-hover:text-white">
                      <Icon size={22} />
                    </div>

                    <h3 className="text-base font-black leading-6 text-[#102A43]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                      {item.text}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 text-xs font-black text-[#0F3D5E]">
                      View related service
                      <ArrowRight
                        size={14}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Journey */}
      <section className="px-5 pb-12">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#0F3D5E] p-5 text-white shadow-2xl shadow-[#0F3D5E]/15 md:p-8">
            <div className="mb-7 flex flex-col gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-[#F4B183]">
                  <Sparkles size={14} />
                  Visual care pathway
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                  How support usually begins
                </h2>
              </div>

              <p className="mx-auto max-w-xl text-sm font-semibold leading-7 text-white/70 lg:mx-0">
                A simple process so parents know what to expect before booking.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="relative">
                    {index !== processSteps.length - 1 && (
                      <ArrowRight
                        size={18}
                        className="absolute -right-3 top-10 z-10 hidden text-white/45 lg:block"
                      />
                    )}

                    <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0F3D5E]">
                        <Icon size={24} />
                      </div>

                      <p className="mt-3 text-sm font-black">
                        {String(index + 1).padStart(2, "0")}. {item.title}
                      </p>

                      <p className="mt-1 text-xs font-semibold leading-5 text-white/65">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative z-10 px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
                <HeartHandshake size={16} className="text-[#2CB1A6]" />
                Choose support
              </div>

              <h2 className="text-3xl font-black md:text-5xl">
                Services for children, adults and families
              </h2>

              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600 md:text-base">
                Filter by category or explore all available support options.
              </p>
            </div>

            {!loading && activeServices.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1 md:justify-end">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full px-5 py-3 text-sm font-black transition ${
                      activeCategory === category
                        ? "bg-[#0F3D5E] text-white shadow-lg shadow-[#0F3D5E]/15"
                        : "border border-[#0F3D5E]/10 bg-white text-[#0F3D5E] hover:bg-[#E9F8F6]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="rounded-[2.5rem] bg-white p-10 text-center shadow-xl">
              <Loader2
                className="mx-auto mb-4 animate-spin text-[#0F3D5E]"
                size={34}
              />
              <p className="font-bold text-slate-600">
                Preparing services for you...
              </p>
            </div>
          ) : activeServices.length === 0 ? (
            <div className="rounded-[2.5rem] bg-white p-10 text-center shadow-xl">
              <Brain className="mx-auto mb-4 text-[#0F3D5E]" size={36} />
              <h2 className="text-2xl font-black text-[#102A43]">
                Support is available
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-slate-600">
                Please contact us to understand the right counselling,
                assessment, or therapy support.
              </p>

              <a
                href="/contact-us"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white"
              >
                Contact Us
                <ArrowRight size={16} />
              </a>
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filteredServices.map((service, index) => {
                const visual = getServiceVisual(service);
                const Icon =
                  visual.icon ||
                  categoryIcons[service.category] ||
                  HeartHandshake;

                const color =
                  categoryColors[service.category] ||
                  "bg-[#E9F8F6] text-[#0F766E]";

                const signs =
                  service.primaryKeywords?.length > 0
                    ? service.primaryKeywords.slice(0, 3)
                    : service.points?.length > 0
                      ? service.points.slice(0, 3)
                      : visual.signs;

                return (
                  <motion.a
                    key={service._id || service.slug || service.title}
                    href={`/services/${service.slug}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.04 }}
                    className="group relative overflow-hidden rounded-[2rem] border border-white bg-white p-4 shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10 sm:p-5"
                  >
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-[#2CB1A6]/10 transition group-hover:bg-[#2CB1A6]/15" />
                    <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#F4B183]/10" />

                    <div className="relative">
                      <div className="relative mb-5 overflow-hidden rounded-[1.5rem] bg-[#E9F8F6]">
                        {service.image?.url ? (
                          <div className="relative h-52 w-full">
                            <Image
                              src={service.image.url}
                              alt={service.title || "Therapy service"}
                              fill
                              sizes="(max-width: 768px) 100vw, 420px"
                              className="object-cover transition duration-500 group-hover:scale-105"
                            />
                          </div>
                        ) : (
                          <div className="flex h-52 items-center justify-center bg-gradient-to-br from-[#E9F8F6] to-[#FFF3E8]">
                            <div className="text-center">
                              <div
                                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-[1.7rem] shadow-lg shadow-slate-900/10 ${color}`}
                              >
                                <Icon size={34} />
                              </div>

                              <p className="mt-4 text-sm font-black text-[#0F3D5E]">
                                {visual.visualLabel}
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="absolute left-4 top-4 inline-flex rounded-full bg-white/92 px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm backdrop-blur">
                          {service.category || visual.visualLabel}
                        </div>
                      </div>

                      <h3 className="text-2xl font-black leading-tight text-[#102A43]">
                        {service.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                        {service.shortDescription ||
                          service.metaDescription ||
                          "Personalised counselling, assessment and therapy guidance for children, teens, adults and families."}
                      </p>

                      <div className="mt-5 rounded-3xl bg-[#F7FBFC] p-4">
                        <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                          Common signs / support areas
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {signs.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-bold text-[#0F766E] shadow-sm"
                            >
                              <CheckCircle2 size={12} />
                              <span className="line-clamp-1">{item}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                        <span className="text-sm font-black text-[#0F3D5E]">
                          See process
                        </span>

                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F3D5E] text-white transition group-hover:translate-x-1 group-hover:bg-[#2CB1A6]">
                          <ArrowRight size={16} />
                        </span>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          )}

          {/* Bottom CTA */}
          {!loading && (
            <div className="mt-12 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0F3D5E] to-[#2CB1A6] p-6 text-center text-white shadow-2xl shadow-[#0F3D5E]/20 md:p-10">
              <div className="mx-auto max-w-3xl">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0F3D5E]">
                  <ShieldCheck size={26} />
                </div>

                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B183]">
                  First step
                </p>

                <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                  You do not need to know the exact service first.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/75 md:text-base">
                  Share what you are noticing. We will help you understand
                  whether counselling, assessment, therapy or parent guidance is
                  the right next step.
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <a
                    href="/contact-us"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                  >
                    <CalendarCheck size={18} />
                    Book Consultation
                  </a>

                  <a
                    href="https://wa.me/917999215093"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/15"
                  >
                    <MessageCircle size={18} />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
