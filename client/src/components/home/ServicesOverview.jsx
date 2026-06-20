"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Brain,
  CheckCircle2,
  Globe2,
  HeartHandshake,
  HelpCircle,
  MessageCircle,
  SearchCheck,
  Sparkles,
  Users,
} from "lucide-react";

const categoryIcons = {
  Children: Baby,
  Adults: Users,
  "Online Consultation": Globe2,
};

const parentConcerns = [
  {
    icon: Brain,
    text: "Behaviour, attention or hyperactivity concerns",
  },
  {
    icon: Baby,
    text: "Speech delay, learning difficulty or developmental concerns",
  },
  {
    icon: HeartHandshake,
    text: "Anxiety, low confidence or emotional struggles",
  },
  {
    icon: Users,
    text: "Parenting stress, family guidance or relationship concerns",
  },
];

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
    <section className="relative overflow-hidden bg-[#F7FBFC] px-5 py-16">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
              <HeartHandshake size={16} className="text-[#2CB1A6]" />
              Support Designed Around Your Child
            </div>

            <h2 className="max-w-4xl text-4xl font-black leading-tight text-[#102A43] md:text-6xl">
              Not just services. The right support for what your family is
              facing.
            </h2>

            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              Every child’s concern has a reason behind it. We help parents
              understand whether the concern is related to behaviour, emotions,
              learning, development, attention, or family stress.
            </p>
          </div>

          {/* Creative Help Box */}
          <div className="rounded-4xl border border-[#2CB1A6]/15 bg-white p-5 shadow-xl shadow-slate-900/5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#2CB1A6]">
                <HelpCircle size={24} />
              </div>

              <div>
                <h3 className="text-lg font-black text-[#102A43]">
                  Not sure which service to choose?
                </h3>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  Share what you are noticing in your child. We will guide you
                  toward the right next step.
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

        {/* Parent Concern Strip */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {parentConcerns.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-3xl border border-white bg-white/85 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white">
                  <Icon size={21} />
                </div>

                <p className="text-sm font-black leading-6 text-[#102A43]">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {featuredServices.length === 0 ? (
          <div className="rounded-4xl bg-white p-10 text-center shadow-xl">
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
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredServices.map((service, index) => {
                const Icon = categoryIcons[service.category] || HeartHandshake;

                return (
                  <motion.a
                    key={service._id || service.slug || service.title}
                    href={`/services/${service.slug}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                    className="group relative overflow-hidden rounded-4xl border border-white bg-white p-5 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
                  >
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-[#2CB1A6]/10 transition group-hover:bg-[#2CB1A6]/15" />
                    <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#F4B183]/10" />

                    <div className="relative">
                      {service.image?.url ? (
                        <div className="relative mb-5 h-48 w-full overflow-hidden rounded-3xl bg-[#E9F8F6]">
                          <Image
                            src={service.image.url}
                            alt={service.title || "Therapy service"}
                            fill
                            sizes="(max-width: 768px) 100vw, 420px"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
                          <Icon size={26} />
                        </div>
                      )}

                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E]">
                          {service.category || "Therapy Support"}
                        </span>

                        {service.isFeatured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF4EA] px-3 py-2 text-xs font-black text-[#9A5A22]">
                            <Sparkles size={12} />
                            Parent Choice
                          </span>
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

                      {service.primaryKeywords?.length > 0 ? (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {service.primaryKeywords
                            .slice(0, 2)
                            .map((keyword) => (
                              <span
                                key={keyword}
                                className="inline-flex items-center gap-1 rounded-full bg-[#E9F8F6] px-3 py-2 text-xs font-bold text-[#0F766E]"
                              >
                                <CheckCircle2 size={12} />
                                {keyword}
                              </span>
                            ))}
                        </div>
                      ) : (
                        <div className="mt-6 flex flex-wrap gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#E9F8F6] px-3 py-2 text-xs font-bold text-[#0F766E]">
                            <SearchCheck size={12} />
                            Assessment-led support
                          </span>

                          <span className="inline-flex items-center gap-1 rounded-full bg-[#E9F8F6] px-3 py-2 text-xs font-bold text-[#0F766E]">
                            <MessageCircle size={12} />
                            Parent guidance
                          </span>
                        </div>
                      )}

                      <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-5">
                        <span className="text-sm font-black text-[#0F3D5E]">
                          See how we help
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

            {/* View All Services Button */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
              <a
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-7 py-4 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:-translate-y-1 hover:border-[#2CB1A6] hover:bg-[#E9F8F6]"
              >
                View All Services
                <ArrowRight size={17} />
              </a>

              {activeServicesCount > featuredServices.length && (
                <p className="text-xs font-bold text-slate-500">
                  Explore all {activeServicesCount} services for children,
                  teens, adults, and families.
                </p>
              )}
            </div>
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 rounded-4xl bg-[#0F3D5E] p-6 text-center text-white shadow-2xl shadow-blue-950/15 md:p-8">
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
