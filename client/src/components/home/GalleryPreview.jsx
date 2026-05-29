"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import { ArrowRight, Camera, ImageIcon, Loader2, Sparkles } from "lucide-react";

export default function GalleryPreview() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/gallery");

      setGallery(data?.data || []);
    } catch (error) {
      console.log("HOME GALLERY ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const previewImages = useMemo(() => {
    const featured = gallery.filter((item) => item.isFeatured);

    if (featured.length) {
      return featured.slice(0, 6);
    }

    return gallery.slice(0, 6);
  }, [gallery]);

  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] px-5 py-20">
      <div className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Gallery
            </div>

            <h2 className="max-w-4xl text-4xl font-black leading-tight text-[#102A43] md:text-6xl">
              A glimpse into our clinic, events and milestones.
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Explore moments from therapy spaces, workshops, training programs,
              awards and team activities.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
          >
            View Gallery
            <ArrowRight size={17} />
          </Link>
        </div>

        {loading ? (
          <div className="rounded-4xl bg-white p-10 text-center shadow-xl">
            <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
            <p className="font-bold text-slate-600">Loading gallery...</p>
          </div>
        ) : previewImages.length === 0 ? (
          <div className="rounded-4xl bg-white p-10 text-center shadow-xl">
            <ImageIcon className="mx-auto mb-4 text-[#0F3D5E]" size={40} />
            <h3 className="text-2xl font-black text-[#102A43]">
              No gallery images available
            </h3>
            <p className="mt-2 text-slate-600">
              Add active images from admin dashboard.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {previewImages.map((item, index) => (
              <Link
                href="/gallery"
                key={item._id}
                className={`group relative overflow-hidden rounded-4xl bg-[#102A43] shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <img
                  src={item.image?.url}
                  alt={item.title}
                  className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                    index === 0 ? "h-105" : "h-52"
                  }`}
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#102A43]/90 via-[#102A43]/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="mb-3 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#0F3D5E]">
                    {item.category}
                  </span>

                  <h3 className="line-clamp-2 text-xl font-black leading-tight text-white">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-[3rem] bg-white p-8 text-center shadow-xl shadow-slate-900/5">
          <Camera className="mx-auto mb-4 text-[#0F766E]" size={38} />

          <h3 className="text-3xl font-black text-[#102A43]">
            Want to visit the clinic?
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
            Consultations are appointment-based. Reach out to schedule an
            in-clinic or online consultation.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/contact-us"
              className="rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white"
            >
              Book Consultation
            </Link>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-7 py-4 text-sm font-black text-white"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
