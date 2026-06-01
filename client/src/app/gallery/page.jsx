"use client";

import { useEffect, useMemo, useState } from "react";
import { API } from "@/lib/api";
import {
  Award,
  Baby,
  Camera,
  CalendarCheck,
  GraduationCap,
  ImageIcon,
  Loader2,
  MessageCircle,
  Newspaper,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const categories = [
  "All",
  "Clinic photos",
  "Team photos",
  "Children at centre",
  "Events & workshops",
  "Awards",
  "TEDx stage",
  "Media & press",
  "Internship & training",
];

const categoryDetails = {
  "Clinic photos": {
    icon: Camera,
    description: "Clinic spaces and consultation environment.",
    gradient: "from-[#0F3D5E] to-[#2CB1A6]",
  },
  "Team photos": {
    icon: Users,
    description: "Team members and professional moments.",
    gradient: "from-[#168A83] to-[#2CB1A6]",
  },
  "Children at centre": {
    icon: Baby,
    description: "Child-friendly learning and therapy environment.",
    gradient: "from-[#2CB1A6] to-[#0F3D5E]",
  },
  "Events & workshops": {
    icon: Sparkles,
    description: "Workshops, parent sessions and awareness events.",
    gradient: "from-[#0F3D5E] to-[#F4B183]",
  },
  Awards: {
    icon: Award,
    description: "Awards, honours and recognition.",
    gradient: "from-[#102A43] to-[#F4B183]",
  },
  "TEDx stage": {
    icon: Sparkles,
    description: "TEDx stage and public speaking moments.",
    gradient: "from-[#0F3D5E] to-[#168A83]",
  },
  "Media & press": {
    icon: Newspaper,
    description: "Media, press and public awareness coverage.",
    gradient: "from-[#168A83] to-[#102A43]",
  },
  "Internship & training": {
    icon: GraduationCap,
    description: "Internship, supervision and training programs.",
    gradient: "from-[#2CB1A6] to-[#0F3D5E]",
  },
};

const fallbackGallery = categories
  .filter((category) => category !== "All")
  .map((category) => ({
    _id: category,
    title: category,
    category,
    description: categoryDetails[category]?.description,
    isFallback: true,
  }));

const normalizeCategory = (category = "") => {
  const value = String(category).trim();

  const categoryMap = {
    Clinic: "Clinic photos",
    "Therapy Room": "Clinic photos",
    Events: "Events & workshops",
    Workshops: "Events & workshops",
    "TEDx & Awards": "TEDx stage",
    Training: "Internship & training",
    Team: "Team photos",
    Other: "Media & press",
  };

  return categoryMap[value] || value || "Clinic photos";
};

export default function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/gallery");

      const formattedGallery = Array.isArray(data?.data)
        ? data.data.map((item) => ({
            ...item,
            category: normalizeCategory(item.category),
          }))
        : [];

      setGallery(formattedGallery);
    } catch (error) {
      console.log("GALLERY FETCH ERROR:", error);
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const displayGallery = gallery.length > 0 ? gallery : fallbackGallery;

  const filteredGallery = useMemo(() => {
    return displayGallery.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const text = `${item.title || ""} ${item.category || ""} ${
        item.description || ""
      }`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [displayGallery, activeCategory, search]);

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-4 py-18 sm:px-5 sm:py-22 md:py-24">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl md:h-96 md:w-96" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
            <Sparkles size={16} className="text-[#2CB1A6]" />
            Gallery
          </div>

          <h1 className="max-w-5xl text-4xl font-black leading-tight text-[#102A43] sm:text-5xl md:text-7xl">
            A glimpse into our clinic, events, workshops and milestones.
          </h1>

          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            Explore photos from Urjasvini Child Development Centre, therapy
            spaces, workshops, training programs, TEDx, awards, media and team
            moments.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories
              .filter((item) => item !== "All")
              .slice(0, 4)
              .map((category) => {
                const Icon = categoryDetails[category]?.icon || ImageIcon;

                return (
                  <div
                    key={category}
                    className="rounded-3xl border border-white bg-white/80 p-4 shadow-sm backdrop-blur"
                  >
                    <Icon size={24} className="text-[#2CB1A6]" />
                    <p className="mt-3 text-sm font-black text-[#102A43]">
                      {category}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section className="-mt-8 px-4 pb-20 sm:px-5 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-4xl bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-5 md:rounded-[2.5rem]">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search gallery..."
                  className="w-full rounded-full border border-slate-200 bg-[#F7FBFC] py-4 pl-12 pr-5 text-sm font-semibold outline-none focus:border-[#2CB1A6]"
                />
              </div>

              <div className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:max-w-180 lg:flex-wrap lg:overflow-visible">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 rounded-full px-4 py-3 text-xs font-black transition ${
                      activeCategory === category
                        ? "bg-[#0F3D5E] text-white"
                        : "bg-[#F7FBFC] text-slate-600 hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="rounded-4xl bg-white p-12 text-center shadow-xl sm:p-16">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-500">Loading gallery...</p>
            </div>
          ) : filteredGallery.length === 0 ? (
            <div className="rounded-4xl bg-white p-12 text-center shadow-xl sm:p-16">
              <ImageIcon className="mx-auto mb-4 text-[#0F3D5E]" size={46} />
              <h3 className="text-2xl font-black text-[#102A43]">
                No gallery images found
              </h3>
              <p className="mt-2 font-semibold text-slate-500">
                Try another category or search term.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredGallery.map((item, index) => {
                const hasImage = Boolean(item?.image?.url);
                const details = categoryDetails[item.category] || {};
                const Icon = details.icon || ImageIcon;

                return (
                  <button
                    key={item._id || item.title}
                    type="button"
                    onClick={() => hasImage && setSelectedImage(item)}
                    className={`group relative min-h-70 overflow-hidden rounded-4xl bg-white text-left shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl ${
                      index === 0 ? "xl:col-span-2 xl:min-h-107.5" : ""
                    }`}
                  >
                    {hasImage ? (
                      <img
                        src={item.image.url}
                        alt={
                          item.alt ||
                          `${item.title}, ${item.category}, Urjasvini Child Development Centre`
                        }
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 flex items-center justify-center bg-linear-to-br ${
                          details.gradient || "from-[#0F3D5E] to-[#2CB1A6]"
                        }`}
                      >
                        <Icon size={54} className="text-white/90" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-[#102A43]/90 via-[#102A43]/25 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <span className="mb-3 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#0F3D5E]">
                        {item.category}
                      </span>

                      <h2 className="text-2xl font-black leading-tight text-white">
                        {item.title}
                      </h2>

                      {item.description && (
                        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-white/75">
                          {item.description}
                        </p>
                      )}

                      {!hasImage && (
                        <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-white/55">
                          Add image from admin dashboard
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-[#102A43]/90 px-4 py-6 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
            className="absolute right-5 top-5 rounded-full bg-white p-3 text-[#102A43]"
          >
            <X size={22} />
          </button>

          <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-4xl bg-white shadow-2xl md:rounded-[2.5rem]">
            <img
              src={selectedImage.image?.url}
              alt={
                selectedImage.alt ||
                `${selectedImage.title}, Urjasvini Child Development Centre gallery`
              }
              className="max-h-[70vh] w-full bg-black object-contain"
            />

            <div className="p-5 sm:p-6">
              <span className="mb-3 inline-flex rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                {selectedImage.category}
              </span>

              <h2 className="text-2xl font-black text-[#102A43]">
                {selectedImage.title}
              </h2>

              {selectedImage.description && (
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl bg-[#E9F8F6] p-6 text-center shadow-xl shadow-slate-900/5 sm:p-10 md:rounded-[3rem] md:p-16">
          <Camera className="mx-auto mb-6 text-[#0F766E]" size={42} />

          <h2 className="text-3xl font-black text-[#102A43] sm:text-4xl md:text-6xl">
            Want to visit the clinic?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            Consultations are appointment-based. Reach out to schedule an
            in-clinic or online consultation.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white transition hover:-translate-y-1"
            >
              <CalendarCheck size={17} />
              Book Consultation
            </a>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white transition hover:-translate-y-1"
            >
              <MessageCircle size={17} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
