"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Camera,
  CalendarCheck,
  GraduationCap,
  ImageIcon,
  MessageCircle,
  Sparkles,
  Users,
  HeartHandshake,
  MapPin,
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

const optimizeCloudinaryImage = (url, width = 900) => {
  if (!url || !url.includes("res.cloudinary.com")) return url;

  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
};

export default function GalleryPreview({ initialGallery = [] }) {
  const previewImages = useMemo(() => {
    const activeImages = initialGallery.filter(
      (item) => item?.isActive !== false && item?.image?.url,
    );

    const featured = activeImages.filter((item) => item?.isFeatured);

    if (featured.length) return featured.slice(0, 6);
    if (activeImages.length) return activeImages.slice(0, 6);

    return fallbackGallery;
  }, [initialGallery]);

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-4 py-14 sm:px-5 sm:py-18 md:py-22">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Clinic Moments
            </div>

            <h2 className="max-w-4xl text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-6xl">
              A glimpse of our clinic, learning spaces and milestones.
            </h2>

            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              Explore moments from Urjasvini Child Development Centre —
              consultation spaces, workshops, awareness events, awards, TEDx
              stage and training programs.
            </p>
          </div>

          <div className="rounded-4xl border border-[#2CB1A6]/15 bg-white p-5 shadow-xl shadow-slate-900/5">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#2CB1A6]">
                <HeartHandshake size={24} />
              </div>

              <div>
                <h3 className="text-lg font-black text-[#102A43]">
                  A space designed for care
                </h3>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  The clinic environment is calm, child-friendly and supportive
                  for children, teens, parents and families.
                </p>

                <Link
                  href="/gallery"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]"
                >
                  View Full Gallery
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {previewImages.map((item, index) => {
            const hasImage = Boolean(item?.image?.url);
            const Icon = item.icon || ImageIcon;
            const imageUrl = optimizeCloudinaryImage(
              item?.image?.url,
              index === 0 ? 1000 : 600,
            );

            return (
              <Link
                href="/gallery"
                key={item._id || item.slug || item.title}
                className={`group relative overflow-hidden rounded-4xl bg-[#102A43] shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/10 ${
                  index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                {hasImage ? (
                  <div
                    className={`relative w-full overflow-hidden ${
                      index === 0 ? "h-90 sm:h-115" : "h-56"
                    }`}
                  >
                    <Image
                      src={imageUrl}
                      alt={
                        item.alt ||
                        `${item.title}, Urjasvini Child Development Centre gallery`
                      }
                      fill
                      sizes={
                        index === 0
                          ? "(max-width: 768px) 100vw, 600px"
                          : "(max-width: 768px) 100vw, 320px"
                      }
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div
                    className={`flex w-full items-center justify-center bg-linear-to-br ${
                      index === 0 ? "h-90 sm:h-115" : "h-56"
                    } ${item.gradient || "from-[#0F3D5E] to-[#2CB1A6]"}`}
                  >
                    <Icon size={46} className="text-white/90" />
                  </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-[#102A43]/92 via-[#102A43]/25 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="mb-3 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#0F3D5E]">
                    {item.category || "Gallery"}
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

        <div className="mt-10 overflow-hidden rounded-4xl bg-white p-6 text-center shadow-xl shadow-slate-900/5 sm:p-8 md:rounded-[3rem]">
          <Camera className="mx-auto mb-4 text-[#0F766E]" size={38} />

          <h3 className="text-2xl font-black text-[#102A43] sm:text-3xl">
            Want to visit the clinic?
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600 sm:text-base">
            Consultations are appointment-based. Reach out to schedule an
            in-clinic or online consultation.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm font-bold text-slate-500">
            <MapPin size={16} className="text-[#F4B183]" />
            <span>Old Palasia, Indore</span>
          </div>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#102A43]"
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
