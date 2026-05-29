"use client";

import { useEffect, useState } from "react";
import { API } from "@/lib/api";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Baby,
  Brain,
  CheckCircle2,
  Globe2,
  HeartHandshake,
  Loader2,
  Sparkles,
  Users,
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

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="bg-[#F7FBFC]">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 py-24">
        <div className="absolute -left-30 -top-30 h-96 w-96 rounded-full bg-teal-200/50 blur-3xl" />
        <div className="absolute -right-30 top-20 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D5E] shadow-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Services
            </div>

            <h1 className="mx-auto max-w-5xl text-5xl font-black tracking-tight text-[#102A43] md:text-7xl">
              Care pathways for{" "}
              <span className="bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
                children, adults and families.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Explore therapy, counselling, assessments and online consultation
              services managed directly from the admin dashboard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="relative z-10 -mt-10 px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="rounded-4xl bg-white p-10 text-center shadow-xl">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-600">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="rounded-4xl bg-white p-10 text-center shadow-xl">
              <Brain className="mx-auto mb-4 text-[#0F3D5E]" size={36} />
              <h2 className="text-2xl font-black text-[#102A43]">
                No services available
              </h2>
              <p className="mt-2 text-slate-600">
                Please add active services from admin dashboard.
              </p>
            </div>
          ) : (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => {
                const Icon = categoryIcons[service.category] || HeartHandshake;
                const color =
                  categoryColors[service.category] ||
                  "bg-[#E9F8F6] text-[#0F766E]";

                return (
                  <motion.a
                    key={service._id}
                    href={`/services/${service.slug}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    className="group relative overflow-hidden rounded-4xl border border-white bg-white p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10"
                  >
                    <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#2CB1A6]/10" />

                    <div className="relative">
                      <div
                        className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
                      >
                        <Icon size={26} />
                      </div>

                      <div className="mb-4 inline-flex rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E]">
                        {service.category}
                      </div>

                      <h2 className="text-2xl font-black leading-tight text-[#102A43]">
                        {service.title}
                      </h2>

                      <p className="mt-4 line-clamp-3 text-sm font-semibold leading-6 text-slate-600">
                        {service.shortDescription}
                      </p>

                      {service.points?.length > 0 && (
                        <div className="mt-6 space-y-3">
                          {service.points.slice(0, 3).map((point) => (
                            <div
                              key={point}
                              className="flex items-center gap-3 rounded-2xl bg-[#F7FBFC] px-4 py-3 text-sm font-bold text-slate-600"
                            >
                              <CheckCircle2
                                size={17}
                                className="shrink-0 text-[#2CB1A6]"
                              />
                              <span className="line-clamp-1">{point}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]">
                        View Details
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
    </main>
  );
}
