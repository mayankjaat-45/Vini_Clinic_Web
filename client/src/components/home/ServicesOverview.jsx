"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileSearch,
  Globe2,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  MessageCircle,
  Puzzle,
  Route,
  SearchCheck,
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

const parentConcerns = [
  {
    icon: Zap,
    title: "Hyperactive / Not Listening",
    text: "Restless, distracted, impulsive or difficult to manage",
    href: "/services/adhd-assessment-therapy-indore",
  },
  {
    icon: Volume2,
    title: "Speech or Milestone Delay",
    text: "Delayed speech, play, social response or early development",
    href: "/services/early-intervention",
  },
  {
    icon: GraduationCap,
    title: "Learning Difficulty",
    text: "Reading, writing, spelling, school or exam struggle",
    href: "/services/dyslexia-support-indore",
  },
  {
    icon: Eye,
    title: "Autism Signs",
    text: "Eye contact, social play, routine, sensory or communication concerns",
    href: "/services/autism-therapy-indore",
  },
];

const supportJourney = [
  {
    icon: MessageCircle,
    title: "You share concern",
    text: "Tell us what you notice",
  },
  {
    icon: FileSearch,
    title: "We understand",
    text: "History, behaviour and needs",
  },
  {
    icon: ClipboardCheck,
    title: "Plan is created",
    text: "Assessment, therapy or guidance",
  },
  {
    icon: Target,
    title: "Progress begins",
    text: "Follow-up and home support",
  },
];

const supportTypes = [
  {
    icon: Brain,
    title: "Assessment-led",
    text: "We first understand the reason behind the concern.",
  },
  {
    icon: HeartHandshake,
    title: "Parent-guided",
    text: "Parents receive simple strategies for daily situations.",
  },
  {
    icon: Route,
    title: "Step-by-step",
    text: "Support is planned clearly instead of confusing families.",
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
    keywords: ["early", "speech", "intervention"],
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
];

const defaultServiceVisual = {
  icon: HeartHandshake,
  signs: ["Counselling", "Guidance", "Care plan"],
  visualLabel: "Therapy Support",
};

const getServiceVisual = (service) => {
  const searchableText = `${service?.title || ""} ${
    service?.slug || ""
  } ${service?.category || ""} ${service?.shortDescription || ""}`.toLowerCase();

  return (
    serviceFallbacks.find((item) =>
      item.keywords.some((keyword) => searchableText.includes(keyword)),
    ) || defaultServiceVisual
  );
};

const ServicesOverview = ({ initialServices = [] }) => {
  const featuredServices = useMemo(() => {
    const activeServices = initialServices.filter(
      (service) => service?.isActive !== false,
    );

    const featured = activeServices.filter((service) => service?.isFeatured);

    if (featured.length) {
      return featured.slice(0, 6);
    }

    return activeServices.slice(0, 6);
  }, [initialServices]);

  const activeServicesCount = useMemo(() => {
    return initialServices.filter((service) => service?.isActive !== false)
      .length;
  }, [initialServices]);

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-5 py-16 sm:py-20">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
              <HeartHandshake size={16} className="text-[#2CB1A6]" />
              Visual Support Guide
            </div>

            <h2 className="max-w-4xl text-4xl font-black leading-tight text-[#102A43] md:text-6xl">
              Find the right support by{" "}
              <span className="bg-gradient-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
                looking at the concern.
              </span>
            </h2>

            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              Parents do not always know the service name. This section helps
              them visually understand the concern first, then choose the right
              next step.
            </p>
          </div>

          {/* Help Box */}
          <div className="rounded-[2rem] border border-[#2CB1A6]/15 bg-white p-5 shadow-xl shadow-slate-900/5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#2CB1A6]">
                <HelpCircle size={24} />
              </div>

              <div>
                <h3 className="text-lg font-black text-[#102A43]">
                  Not sure which service to choose?
                </h3>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  Start with what you are noticing. We will guide you toward
                  counselling, assessment, therapy or parent guidance.
                </p>

                <a
                  href="/contact-us"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]"
                >
                  Ask for guidance
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Concern Cards */}
        <div className="mb-8 rounded-[2rem] border border-white bg-white/85 p-4 shadow-2xl shadow-slate-900/5 backdrop-blur-xl sm:p-6">
          <div className="mb-6 flex flex-col gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2CB1A6]">
                Start here
              </p>
              <h3 className="mt-2 text-2xl font-black text-[#102A43] sm:text-3xl">
                What are you noticing?
              </h3>
            </div>

            <p className="mx-auto max-w-xl text-sm font-semibold leading-6 text-slate-500 sm:mx-0">
              Click a concern to explore the most relevant support page.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {parentConcerns.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.title}
                  href={item.href}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group rounded-[1.75rem] border border-[#0F3D5E]/10 bg-[#F7FBFC] p-5 text-left transition hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-white hover:shadow-xl hover:shadow-slate-900/8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2CB1A6] shadow-sm transition group-hover:bg-[#2CB1A6] group-hover:text-white">
                    <Icon size={22} />
                  </div>

                  <h4 className="text-base font-black leading-6 text-[#102A43]">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                    {item.text}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-black text-[#0F3D5E]">
                    View related support
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

        {/* Visual Journey */}
        <div className="mb-12 rounded-[2rem] bg-[#0F3D5E] p-5 text-white shadow-2xl shadow-blue-950/15 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-3 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-[#F4B183]">
                <Sparkles size={14} />
                Simple process
              </p>

              <h3 className="mt-4 text-2xl font-black sm:text-3xl">
                How support usually begins
              </h3>
            </div>

            <p className="mx-auto max-w-xl text-sm font-semibold leading-6 text-white/70 lg:mx-0">
              This visual flow helps parents understand the process before they
              book a consultation.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {supportJourney.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="relative">
                  {index !== supportJourney.length - 1 && (
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

        {featuredServices.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-xl">
            <Brain className="mx-auto mb-4 text-[#0F3D5E]" size={38} />

            <h3 className="text-2xl font-black text-[#102A43]">
              Support is available
            </h3>

            <p className="mx-auto mt-2 max-w-xl text-slate-600">
              Please contact us to understand the right counselling, assessment,
              or therapy support for your child.
            </p>

            <a
              href="/contact-us"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1"
            >
              Contact Us
              <ArrowRight size={16} />
            </a>
          </div>
        ) : (
          <>
            {/* Services */}
            <div className="mb-6 flex flex-col gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#2CB1A6]">
                  Services
                </p>
                <h3 className="mt-2 text-3xl font-black text-[#102A43] sm:text-4xl">
                  Choose support by need
                </h3>
              </div>

              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:-translate-y-1 hover:border-[#2CB1A6] hover:bg-[#E9F8F6]"
              >
                View All Services
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredServices.map((service, index) => {
                const visual = getServiceVisual(service);
                const Icon =
                  visual.icon ||
                  categoryIcons[service.category] ||
                  HeartHandshake;

                const signs =
                  service.primaryKeywords?.length > 0
                    ? service.primaryKeywords.slice(0, 3)
                    : visual.signs;

                return (
                  <motion.a
                    key={service._id || service.slug || service.title}
                    href={`/services/${service.slug}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    className="group relative overflow-hidden rounded-[2rem] border border-white bg-white p-4 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10 sm:p-5"
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
                              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-white text-[#2CB1A6] shadow-lg shadow-slate-900/10">
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

                        {service.isFeatured && (
                          <div className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-[#FFF4EA]/95 px-3 py-2 text-xs font-black text-[#9A5A22] shadow-sm backdrop-blur">
                            <Sparkles size={12} />
                            Parent Choice
                          </div>
                        )}
                      </div>

                      <h3 className="text-2xl font-black leading-tight text-[#102A43]">
                        {service.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                        {service.shortDescription ||
                          service.metaDescription ||
                          "Personalised counselling, assessment, and therapy guidance for children, teens, adults, and families."}
                      </p>

                      <div className="mt-5 rounded-3xl bg-[#F7FBFC] p-4">
                        <p className="mb-3 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                          Common signs
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {signs.map((keyword) => (
                            <span
                              key={keyword}
                              className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-xs font-bold text-[#0F766E] shadow-sm"
                            >
                              <CheckCircle2 size={12} />
                              {keyword}
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

            {activeServicesCount > featuredServices.length && (
              <p className="mt-5 text-center text-xs font-bold text-slate-500">
                Explore all {activeServicesCount} services for children, teens,
                adults, and families.
              </p>
            )}
          </>
        )}

        {/* Support Type Cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {supportTypes.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-[1.75rem] border border-white bg-white/85 p-5 shadow-sm backdrop-blur"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#2CB1A6]">
                  <Icon size={23} />
                </div>

                <h4 className="text-lg font-black text-[#102A43]">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-[2rem] bg-gradient-to-br from-[#0F3D5E] to-[#2CB1A6] p-6 text-center text-white shadow-2xl shadow-blue-950/15 md:p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#F4B183]">
            First step
          </p>

          <h3 className="mx-auto mt-3 max-w-3xl text-2xl font-black leading-tight md:text-4xl">
            You do not need to know the exact diagnosis before reaching out.
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/75 md:text-base">
            Tell us what you are noticing. We will help you understand whether
            counselling, assessment, therapy, or parent guidance is the right
            next step.
          </p>

          <a
            href="/contact-us"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
          >
            Start with a consultation
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
