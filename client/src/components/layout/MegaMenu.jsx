"use client";

import { useEffect, useState } from "react";
import { API } from "@/lib/api";
import {
  Baby,
  Users,
  Globe2,
  ArrowRight,
  HeartHandshake,
  Loader2,
} from "lucide-react";

const categoryConfig = {
  Children: {
    title: "Children 2–18",
    icon: Baby,
    color: "bg-[#E9F8F6] text-[#0F766E]",
  },
  Adults: {
    title: "Adults",
    icon: Users,
    color: "bg-[#FFF1EA] text-[#C05621]",
  },
  "Online Consultation": {
    title: "Online Consultation",
    icon: Globe2,
    color: "bg-[#EEF4FF] text-[#3158D4]",
  },
};

const MegaMenu = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/services");

      setServices(data?.data || []);
    } catch (error) {
      console.log("MEGA MENU SERVICES ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const groupedServices = services.reduce((acc, service) => {
    const category = service.category || "Children";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(service);
    return acc;
  }, {});

  const categories = ["Children", "Adults", "Online Consultation"];

  return (
    <div className="absolute left-1/2 top-full z-999 w-245 -translate-x-2/5 pt-8">
      <div className="overflow-hidden rounded-4xl border border-[#D8F0EE] bg-white shadow-2xl shadow-slate-900/15">
        <div className="grid grid-cols-[280px_1fr]">
          {/* Left Branding Panel */}
          <div className="relative overflow-hidden bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-7 text-white">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-[#F4B183]/20 blur-2xl" />

            <div className="relative">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <HeartHandshake size={24} />
              </div>

              <h3 className="text-2xl font-black leading-tight">
                Services for every stage
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/75">
                Therapy, counselling, assessments and online consultations for
                children, adults and families.
              </p>

              <a
                href="/services"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-0.5"
              >
                View all services
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Service Columns */}
          <div className="bg-[#F8FEFD] p-5">
            {loading ? (
              <div className="flex min-h-65 items-center justify-center">
                <div className="text-center">
                  <Loader2 className="mx-auto mb-3 animate-spin text-[#0F3D5E]" />
                  <p className="text-sm font-bold text-slate-500">
                    Loading services...
                  </p>
                </div>
              </div>
            ) : services.length === 0 ? (
              <div className="flex min-h-65 items-center justify-center rounded-3xl bg-white p-8 text-center">
                <div>
                  <HeartHandshake className="mx-auto mb-3 text-[#0F3D5E]" />
                  <h4 className="text-lg font-black text-[#102A43]">
                    No services added
                  </h4>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    Add active services from admin dashboard.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {categories.map((category) => {
                  const config = categoryConfig[category];
                  const Icon = config.icon;
                  const categoryServices = groupedServices[category] || [];

                  return (
                    <div
                      key={category}
                      className="rounded-3xl border border-[#E5F3F1] bg-white p-5"
                    >
                      <div
                        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${config.color}`}
                      >
                        <Icon size={21} />
                      </div>

                      <h4 className="mb-3 text-base font-black text-[#102A43]">
                        {config.title}
                      </h4>

                      {categoryServices.length === 0 ? (
                        <p className="rounded-xl bg-[#F7FBFC] px-3 py-3 text-xs font-bold text-slate-400">
                          No active service
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          {categoryServices.slice(0, 6).map((service) => (
                            <a
                              key={service._id}
                              href={`/services/${service.slug}`}
                              className="group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-[#52677A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                            >
                              <span className="line-clamp-1">
                                {service.title}
                              </span>
                              <ArrowRight
                                size={13}
                                className="shrink-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                              />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
