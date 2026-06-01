"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import {
  ArrowRight,
  Award,
  Camera,
  CalendarCheck,
  GraduationCap,
  ImageIcon,
  Loader2,
  MessageCircle,
  Newspaper,
  Sparkles,
  Users,
} from "lucide-react";

const fallbackGallery = [
  {
    _id: "clinic-photos",
    title: "Clinic photos",
    category: "Clinic photos",
    description: "A calm and supportive space for children and families.",
    icon: Camera,
    gradient: "from-[#0F3D5E] to-[#2CB1A6]",
  },
  {
    _id: "team-photos",
    title: "Team photos",
    category: "Team photos",
    description: "Meet the professionals supporting children and parents.",
    icon: Users,
    gradient: "from-[#168A83] to-[#2CB1A6]",
  },
  {
    _id: "events-workshops",
    title: "Events & workshops",
    category: "Events & workshops",
    description: "Parent guidance sessions, workshops and awareness events.",
    icon: Sparkles,
    gradient: "from-[#0F3D5E] to-[#F4B183]",
  },
  {
    _id: "awards",
    title: "Awards & recognition",
    category: "Awards",
    description: "Milestones, honours and professional recognition.",
    icon: Award,
    gradient: "from-[#102A43] to-[#F4B183]",
  },
  {
    _id: "tedx-stage",
    title: "TEDx stage",
    category: "TEDx stage",
    description: "Talks, public awareness and professional contributions.",
    icon: Sparkles,
    gradient: "from-[#0F3D5E] to-[#168A83]",
  },
  {
    _id: "internship-training",
    title: "Internship & training",
    category: "Internship & training",
    description: "Learning, supervision and training moments.",
    icon: GraduationCap,
    gradient: "from-[#2CB1A6] to-[#0F3D5E]",
  },
];

export default function GalleryPreview() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/gallery");

      setGallery(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.log("HOME GALLERY ERROR:", error);
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const previewImages = useMemo(() => {
    const activeImages = gallery.filter((item) => item?.image?.url);
    const featured = activeImages.filter((item) => item.isFeatured);

    if (featured.length) return featured.slice(0, 6);
    if (activeImages.length) return activeImages.slice(0, 6);

    return fallbackGallery;
  }, [gallery]);

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-4 py-14 sm:px-5 sm:py-18 md:py-22">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Gallery
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-6xl">
              A glimpse into our clinic, events and milestones.
            </h2>

            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              Explore moments from Urjasvini Child Development Centre, therapy
              spaces, workshops, training programs, awards, TEDx stage and team
              activities.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
          >
            View Full Gallery
            <ArrowRight size={17} />
          </Link>
        </div>

        {loading ? (
          <div className="rounded-4xl bg-white p-10 text-center shadow-xl">
            <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
            <p className="font-bold text-slate-600">Loading gallery...</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {previewImages.map((item, index) => {
              const hasImage = Boolean(item?.image?.url);
              const Icon = item.icon || ImageIcon;

              return (
                <Link
                  href="/gallery"
                  key={item._id || item.title}
                  className={`group relative overflow-hidden rounded-4xl bg-[#102A43] shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                  }`}
                >
                  {hasImage ? (
                    <img
                      src={item.image.url}
                      alt={
                        item.alt ||
                        `${item.title}, Urjasvini Child Development Centre gallery`
                      }
                      className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                        index === 0 ? "h-90 sm:h-115" : "h-56"
                      }`}
                    />
                  ) : (
                    <div
                      className={`flex ${
                        index === 0 ? "h-90 sm:h-115" : "h-56"
                      } w-full items-center justify-center bg-linear-to-br ${
                        item.gradient || "from-[#0F3D5E] to-[#2CB1A6]"
                      }`}
                    >
                      <Icon size={46} className="text-white/90" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-[#102A43]/92 via-[#102A43]/25 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="mb-3 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#0F3D5E]">
                      {item.category}
                    </span>

                    <h3 className="line-clamp-2 text-xl font-black leading-tight text-white">
                      {item.title}
                    </h3>

                    {!hasImage && item.description && (
                      <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-white/70">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-10 overflow-hidden rounded-4xl bg-white p-6 text-center shadow-xl shadow-slate-900/5 sm:p-8 md:rounded-[3rem]">
          <Camera className="mx-auto mb-4 text-[#0F766E]" size={38} />

          <h3 className="text-2xl font-black text-[#102A43] sm:text-3xl">
            Want to visit the clinic?
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600 sm:text-base">
            Consultations are appointment-based. Reach out to schedule an
            in-clinic or online consultation.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1"
            >
              <CalendarCheck size={17} />
              Book Consultation
            </Link>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/10 bg-[#E9F8F6] px-7 py-4 text-sm font-black text-[#0F766E] transition hover:-translate-y-1"
            >
              <MessageCircle size={17} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
