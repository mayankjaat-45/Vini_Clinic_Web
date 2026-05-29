"use client";

import { useEffect, useMemo, useState } from "react";
import { API } from "@/lib/api";
import { Camera, ImageIcon, Loader2, Search, Sparkles, X } from "lucide-react";

const categories = [
  "All",
  "Clinic",
  "Therapy Room",
  "Events",
  "Workshops",
  "TEDx & Awards",
  "Training",
  "Team",
  "Other",
];

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

      setGallery(data?.data || []);
    } catch (error) {
      console.log("GALLERY FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const text =
        `${item.title} ${item.category} ${item.description || ""}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [gallery, activeCategory, search]);

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-5 py-24">
        <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
            <Sparkles size={16} className="text-[#2CB1A6]" />
            Gallery
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-tight text-[#102A43] md:text-7xl">
            A glimpse into our clinic, events, workshops and milestones.
          </h1>

          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
            Explore photos from Urjasvini Child Development Centre, therapy
            spaces, workshops, training programs, TEDx, awards and team moments.
          </p>
        </div>
      </section>

      <section className="-mt-8 px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-4xl bg-white p-5 shadow-xl shadow-slate-900/5">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
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

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-3 text-xs font-black transition ${
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
            <div className="rounded-4xl bg-white p-16 text-center shadow-xl">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-500">Loading gallery...</p>
            </div>
          ) : filteredGallery.length === 0 ? (
            <div className="rounded-4xl bg-white p-16 text-center shadow-xl">
              <ImageIcon className="mx-auto mb-4 text-[#0F3D5E]" size={46} />
              <h3 className="text-2xl font-black text-[#102A43]">
                No gallery images found
              </h3>
              <p className="mt-2 font-semibold text-slate-500">
                Try another category or search term.
              </p>
            </div>
          ) : (
            <div className="columns-1 gap-6 space-y-6 md:columns-2 xl:columns-3">
              {filteredGallery.map((item, index) => (
                <button
                  key={item._id}
                  type="button"
                  onClick={() => setSelectedImage(item)}
                  className="group relative mb-6 block w-full overflow-hidden rounded-4xl bg-white text-left shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <img
                    src={item.image?.url}
                    alt={item.title}
                    className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                      index % 3 === 0
                        ? "h-80"
                        : index % 3 === 1
                          ? "h-64"
                          : "h-96"
                    }`}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#102A43]/85 via-[#102A43]/20 to-transparent opacity-90" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
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
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-[#102A43]/90 px-4 py-6 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 rounded-full bg-white p-3 text-[#102A43]"
          >
            <X size={22} />
          </button>

          <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-4xl bg-white shadow-2xl">
            <img
              src={selectedImage.image?.url}
              alt={selectedImage.title}
              className="max-h-[70vh] w-full object-contain bg-black"
            />

            <div className="p-6">
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

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-[#E9F8F6] p-10 text-center md:p-16">
          <Camera className="mx-auto mb-6 text-[#0F766E]" size={42} />

          <h2 className="text-4xl font-black text-[#102A43] md:text-6xl">
            Want to visit the clinic?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
            Consultations are appointment-based. Reach out to schedule an
            in-clinic or online consultation.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/contact-us"
              className="rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white"
            >
              Book Consultation
            </a>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
