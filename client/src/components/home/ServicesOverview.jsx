"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Brain,
  CheckCircle2,
  Globe2,
  HeartHandshake,
  Users,
} from "lucide-react";

const categoryIcons = {
  Children: Baby,
  Adults: Users,
  "Online Consultation": Globe2,
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

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-5 py-18">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
              <HeartHandshake size={16} className="text-[#2CB1A6]" />
              Services
            </div>

            <h2 className="max-w-4xl text-4xl font-black leading-tight text-[#102A43] md:text-6xl">
              How can we help your child and your family?
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              We work with children, adolescents, and adults — because when a
              child struggles, the whole family feels it.
            </p>
          </div>

          <a
            href="/services"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
          >
            See All Services
            <ArrowRight size={17} />
          </a>
        </div>

        {featuredServices.length === 0 ? (
          <div className="rounded-4xl bg-white p-10 text-center shadow-xl">
            <Brain className="mx-auto mb-4 text-[#0F3D5E]" size={38} />
            <h3 className="text-2xl font-black text-[#102A43]">
              Services are available
            </h3>
            <p className="mt-2 text-slate-600">
              Please contact us to know the right support for your child.
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
                  className="group relative overflow-hidden rounded-4xl border border-white bg-white p-6 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
                >
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#2CB1A6]/10" />

                  <div className="relative">
                    {service.image?.url ? (
                      <img
                        src={service.image.url}
                        alt={service.title || "Service image"}
                        loading="lazy"
                        className="mb-5 h-44 w-full rounded-3xl object-cover"
                      />
                    ) : (
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
                        <Icon size={26} />
                      </div>
                    )}

                    <div className="mb-4 inline-flex rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E]">
                      {service.category || "Therapy Support"}
                    </div>

                    <h3 className="text-2xl font-black leading-tight text-[#102A43]">
                      {service.title}
                    </h3>

                    <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                      {service.shortDescription ||
                        service.metaDescription ||
                        "Personalised counselling, assessment and guidance support for children, teens and families."}
                    </p>

                    {service.primaryKeywords?.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {service.primaryKeywords.slice(0, 2).map((keyword) => (
                          <span
                            key={keyword}
                            className="inline-flex items-center gap-1 rounded-full bg-[#E9F8F6] px-3 py-2 text-xs font-bold text-[#0F766E]"
                          >
                            <CheckCircle2 size={12} />
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]">
                      Learn More
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesOverview;
