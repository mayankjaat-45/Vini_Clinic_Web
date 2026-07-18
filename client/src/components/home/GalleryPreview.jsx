"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  Camera,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  ImageIcon,
  MapPin,
  Maximize2,
  MessageCircle,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const fallbackGallery = [
  {
    _id: "clinic-photos",
    title: "Clinic Photos",
    category: "Clinic photos",
    description:
      "A calm, welcoming and supportive consultation environment for children and families.",
    gradient: "from-[#0F3D5E] to-[#2CB1A6]",
  },
  {
    _id: "team-photos",
    title: "Meet the Team",
    category: "Team photos",
    description:
      "Meet the professionals supporting children, adolescents and parents.",
    gradient: "from-[#168A83] to-[#2CB1A6]",
  },
  {
    _id: "events-workshops",
    title: "Events & Workshops",
    category: "Events & workshops",
    description:
      "Parent guidance sessions, psychology workshops and awareness events.",
    gradient: "from-[#0F3D5E] to-[#F4B183]",
  },
  {
    _id: "awards",
    title: "Awards & Recognition",
    category: "Awards",
    description: "Professional achievements, milestones and recognitions.",
    gradient: "from-[#102A43] to-[#F4B183]",
  },
  {
    _id: "tedx-stage",
    title: "TEDx Stage",
    category: "TEDx stage",
    description:
      "Public talks, mental-health awareness and professional contributions.",
    gradient: "from-[#0F3D5E] to-[#168A83]",
  },
  {
    _id: "internship-training",
    title: "Internship & Training",
    category: "Internship & training",
    description:
      "Clinical learning, student supervision and psychology training moments.",
    gradient: "from-[#2CB1A6] to-[#0F3D5E]",
  },
];

const categoryIconMap = [
  {
    keywords: ["clinic", "centre", "center", "space"],
    icon: Camera,
  },
  {
    keywords: ["team", "staff"],
    icon: Users,
  },
  {
    keywords: ["event", "workshop", "awareness"],
    icon: Sparkles,
  },
  {
    keywords: ["award", "recognition", "honour"],
    icon: Award,
  },
  {
    keywords: ["tedx", "media", "stage"],
    icon: Sparkles,
  },
  {
    keywords: ["internship", "training", "student"],
    icon: GraduationCap,
  },
];

const optimizeCloudinaryImage = (url, width = 1200) => {
  if (!url || !url.includes("res.cloudinary.com")) {
    return url;
  }

  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);
};

const getGalleryImage = (item = {}) => {
  if (typeof item.image === "string") {
    return item.image;
  }

  return (
    item.image?.url ||
    item.image?.secure_url ||
    item.imageUrl ||
    item.thumbnail?.url ||
    item.thumbnail ||
    ""
  );
};

const getGalleryCategory = (item = {}) => {
  return item.category || item.type || "Gallery";
};

const getGalleryDescription = (item = {}) => {
  return (
    item.description ||
    item.shortDescription ||
    item.caption ||
    "A moment from Urjasvini Child Development Centre."
  );
};

const getGalleryIcon = (item = {}) => {
  if (item.icon) {
    return item.icon;
  }

  const searchableText = [item.title, item.category, item.description]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const matchedItem = categoryIconMap.find((option) =>
    option.keywords.some((keyword) => searchableText.includes(keyword)),
  );

  return matchedItem?.icon || ImageIcon;
};

const prepareGallery = (gallery = []) => {
  const activeItems = Array.isArray(gallery)
    ? gallery.filter((item) => item?.isActive !== false)
    : [];

  const source = activeItems.length ? activeItems : fallbackGallery;

  return source
    .sort((first, second) => {
      if (first?.isFeatured && !second?.isFeatured) return -1;
      if (!first?.isFeatured && second?.isFeatured) return 1;

      return (
        Number(first?.displayOrder ?? 999) - Number(second?.displayOrder ?? 999)
      );
    })
    .slice(0, 12);
};

export default function GalleryPreview({ initialGallery = [] }) {
  const galleryItems = useMemo(
    () => prepareGallery(initialGallery),
    [initialGallery],
  );

  const categories = useMemo(() => {
    const values = galleryItems
      .map((item) => getGalleryCategory(item))
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [galleryItems]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return galleryItems;
    }

    return galleryItems.filter(
      (item) => getGalleryCategory(item) === activeCategory,
    );
  }, [activeCategory, galleryItems]);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (activeIndex >= filteredItems.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, filteredItems.length]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === filteredItems.length - 1 ? 0 : current + 1,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === 0 ? filteredItems.length - 1 : current - 1,
        );
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filteredItems.length, lightboxOpen]);

  if (!filteredItems.length) {
    return null;
  }

  const activeItem = filteredItems[activeIndex];
  const activeImage = optimizeCloudinaryImage(
    getGalleryImage(activeItem),
    1400,
  );
  const ActiveIcon = getGalleryIcon(activeItem);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? filteredItems.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === filteredItems.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <>
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#2CB1A6]/8 blur-3xl" />

          <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F4B183]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-bold text-[#168F87] sm:text-sm">
                <Sparkles size={16} />
                Clinic moments
              </div>

              <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em] text-[#102A43] sm:text-4xl lg:text-5xl">
                Explore our clinic, programs and{" "}
                <span className="text-[#168F87]">professional milestones.</span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Take a closer look at Urjasvini Child Development Centre,
                workshops, training programs, awareness events, awards and Dr.
                Vini’s professional journey.
              </p>
            </div>

            <Link
              href="/gallery"
              className="group inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition duration-300 hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
            >
              View Full Gallery
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Category filters */}
          <div className="mt-10 flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full px-5 py-3 text-sm font-black transition duration-300 ${
                    isActive
                      ? "bg-[#0F3D5E] text-white shadow-lg shadow-[#0F3D5E]/15"
                      : "border border-[#0F3D5E]/10 bg-[#F7FBFC] text-[#0F3D5E] hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Interactive gallery */}
          <div className="mt-7 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Featured image */}
            <div className="relative min-h-[540px] overflow-hidden rounded-[2.5rem] bg-[#0F3D5E] shadow-[0_30px_80px_rgba(15,61,94,0.2)] sm:min-h-[620px]">
              <AnimatePresence mode="wait">
                <motion.article
                  key={
                    activeItem._id ||
                    activeItem.slug ||
                    `${activeCategory}-${activeIndex}`
                  }
                  initial={{
                    opacity: 0,
                    scale: 1.02,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.98,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="absolute inset-0"
                >
                  {activeImage ? (
                    <>
                      <Image
                        src={activeImage}
                        alt={
                          activeItem.alt ||
                          `${activeItem.title}, Urjasvini Child Development Centre`
                        }
                        fill
                        priority={activeIndex === 0}
                        sizes="(max-width: 1024px) 100vw, 760px"
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#071F33] via-[#071F33]/25 to-transparent" />
                    </>
                  ) : (
                    <div
                      className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${
                        activeItem.gradient || "from-[#0F3D5E] to-[#2CB1A6]"
                      }`}
                    >
                      <motion.div
                        initial={{
                          rotate: -8,
                          scale: 0.9,
                        }}
                        animate={{
                          rotate: 0,
                          scale: 1,
                        }}
                        className="text-center text-white"
                      >
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white/12 backdrop-blur">
                          <ActiveIcon size={42} />
                        </div>

                        <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-white/65">
                          Urjasvini Gallery
                        </p>
                      </motion.div>
                    </div>
                  )}

                  {/* Featured content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-10">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                      <div className="max-w-2xl">
                        <span className="inline-flex rounded-full border border-white/15 bg-white/12 px-4 py-2 text-xs font-black text-[#7DE0D6] backdrop-blur">
                          {getGalleryCategory(activeItem)}
                        </span>

                        <h3 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                          {activeItem.title}
                        </h3>

                        <p className="mt-3 max-w-xl text-sm font-semibold leading-7 text-white/72 sm:text-base">
                          {getGalleryDescription(activeItem)}
                        </p>
                      </div>

                      {activeImage && (
                        <button
                          type="button"
                          onClick={() => setLightboxOpen(true)}
                          className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#0F3D5E] shadow-xl transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                          aria-label="Open image fullscreen"
                        >
                          <Maximize2 size={21} />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>

              {/* Navigation buttons */}
              {filteredItems.length > 1 && (
                <div className="absolute left-5 top-5 z-20 flex gap-2">
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Show previous gallery image"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#071F33]/45 text-white backdrop-blur transition hover:bg-white hover:text-[#0F3D5E]"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Show next gallery image"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#071F33]/45 text-white backdrop-blur transition hover:bg-white hover:text-[#0F3D5E]"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}

              <div className="absolute right-5 top-5 z-20 rounded-full border border-white/15 bg-[#071F33]/45 px-4 py-2 text-xs font-black text-white backdrop-blur">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(filteredItems.length).padStart(2, "0")}
              </div>
            </div>

            {/* Gallery navigator */}
            <div className="rounded-[2rem] border border-[#0F3D5E]/10 bg-[#F7FBFC] p-3 sm:p-4">
              <div className="flex items-center justify-between gap-4 px-3 py-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#168F87]">
                    Gallery collection
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Select any moment to explore
                  </p>
                </div>

                <Camera size={22} className="text-[#168F87]" />
              </div>

              <div className="max-h-[530px] space-y-2 overflow-y-auto pr-1">
                {filteredItems.map((item, index) => {
                  const isActive = activeIndex === index;
                  const imageUrl = optimizeCloudinaryImage(
                    getGalleryImage(item),
                    250,
                  );
                  const Icon = getGalleryIcon(item);

                  return (
                    <motion.button
                      key={item._id || item.slug || item.title}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      aria-pressed={isActive}
                      className={`relative flex w-full items-center gap-4 overflow-hidden rounded-[1.4rem] p-3 text-left transition duration-300 ${
                        isActive
                          ? "bg-[#0F3D5E] text-white shadow-lg shadow-[#0F3D5E]/15"
                          : "bg-white text-[#102A43] hover:shadow-md"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="gallery-active-line"
                          className="absolute inset-y-0 left-0 w-1.5 bg-[#2CB1A6]"
                        />
                      )}

                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={item.alt || item.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div
                            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
                              item.gradient || "from-[#0F3D5E] to-[#2CB1A6]"
                            } text-white`}
                          >
                            <Icon size={22} />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`line-clamp-1 text-sm font-black ${
                            isActive ? "text-white" : "text-[#102A43]"
                          }`}
                        >
                          {item.title}
                        </p>

                        <p
                          className={`mt-1 truncate text-xs font-semibold ${
                            isActive ? "text-white/60" : "text-slate-500"
                          }`}
                        >
                          {getGalleryCategory(item)}
                        </p>
                      </div>

                      <ChevronRight
                        size={18}
                        className={`shrink-0 transition ${
                          isActive
                            ? "translate-x-1 text-[#7DE0D6]"
                            : "text-slate-400"
                        }`}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Visit clinic CTA */}
          <div className="mt-10 grid items-center gap-6 rounded-[2rem] border border-[#2CB1A6]/15 bg-[#E9F8F6]/65 p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#168F87] shadow-sm">
                <HeartHandshake size={25} />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#102A43]">
                  Visit a calm and child-friendly consultation space
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                  Consultations are appointment-based and available both
                  in-clinic and online.
                </p>

                <p className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-slate-500">
                  <MapPin size={16} className="text-[#F4B183]" />
                  Old Palasia, Indore
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#0F3D5E]/15 transition hover:-translate-y-1 hover:bg-[#102A43]"
              >
                <CalendarCheck size={18} />
                Book Consultation
              </Link>

              <a
                href="https://wa.me/917999215093"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:border-[#2CB1A6]/40"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightboxOpen && activeImage && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#071F33]/95 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close fullscreen image"
              className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0F3D5E] shadow-xl"
            >
              <X size={21} />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showPrevious();
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0F3D5E] shadow-xl sm:left-7"
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#0F3D5E] shadow-xl sm:right-7"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <motion.div
              key={`lightbox-${activeItem._id || activeIndex}`}
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative h-[82vh] w-full max-w-6xl overflow-hidden rounded-[2rem] bg-[#102A43]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={optimizeCloudinaryImage(getGalleryImage(activeItem), 1800)}
                alt={activeItem.alt || activeItem.title}
                fill
                sizes="100vw"
                className="object-contain"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071F33] to-transparent p-6 text-white sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#7DE0D6]">
                  {getGalleryCategory(activeItem)}
                </p>

                <h3 className="mt-2 text-xl font-black sm:text-2xl">
                  {activeItem.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
