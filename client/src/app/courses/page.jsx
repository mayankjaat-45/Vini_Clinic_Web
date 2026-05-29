"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/api";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Loader2,
  Search,
  Sparkles,
} from "lucide-react";

const categories = [
  "All",
  "Psychology",
  "Internship",
  "Parent Training",
  "Teacher Training",
  "Workshop",
  "Other",
];

const modes = ["All", "Online", "Offline", "Hybrid"];

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMode, setActiveMode] = useState("All");

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/api/courses");

      setCourses(data?.data || []);
    } catch (error) {
      console.log("COURSES FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === "All" || course.category === activeCategory;

      const matchesMode = activeMode === "All" || course.mode === activeMode;

      const text =
        `${course.title} ${course.shortDescription} ${course.category} ${course.mode}`.toLowerCase();

      return (
        matchesCategory && matchesMode && text.includes(search.toLowerCase())
      );
    });
  }, [courses, activeCategory, activeMode, search]);

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-5 py-24">
        <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
            <Sparkles size={16} className="text-[#2CB1A6]" />
            Courses & Training
          </div>

          <h1 className="max-w-5xl text-5xl font-black leading-tight text-[#102A43] md:text-7xl">
            Learn child psychology, counselling and intervention skills.
          </h1>

          <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
            Explore courses, workshops, parent training, teacher training and
            internship programs by Dr. Vini Jhariya and Urjasvini CDC.
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
                  placeholder="Search courses..."
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

            <div className="mt-4 flex flex-wrap gap-2">
              {modes.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setActiveMode(mode)}
                  className={`rounded-full px-4 py-3 text-xs font-black transition ${
                    activeMode === mode
                      ? "bg-[#2CB1A6] text-white"
                      : "bg-[#F7FBFC] text-slate-600 hover:bg-[#E9F8F6] hover:text-[#0F766E]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="rounded-4xl bg-white p-16 text-center shadow-xl">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-500">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="rounded-4xl bg-white p-16 text-center shadow-xl">
              <GraduationCap
                className="mx-auto mb-4 text-[#0F3D5E]"
                size={46}
              />
              <h3 className="text-2xl font-black text-[#102A43]">
                No courses found
              </h3>
              <p className="mt-2 font-semibold text-slate-500">
                Try another category or search term.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <Link
                  key={course._id}
                  href={`/courses/${course.slug}`}
                  className="group overflow-hidden rounded-4xl bg-white shadow-xl shadow-slate-900/5 transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="h-56 bg-[#102A43]">
                    {course.image?.url ? (
                      <img
                        src={course.image.url}
                        alt={course.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/30">
                        <BookOpen size={58} />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                        {course.category}
                      </span>

                      <span className="rounded-full bg-[#F7FBFC] px-3 py-1 text-xs font-black text-[#0F3D5E]">
                        {course.mode}
                      </span>

                      {course.isFeatured && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-700">
                          Featured
                        </span>
                      )}
                    </div>

                    <h2 className="line-clamp-2 text-2xl font-black leading-tight text-[#102A43]">
                      {course.title}
                    </h2>

                    <p className="mt-4 line-clamp-3 min-h-18 text-sm font-semibold leading-6 text-slate-600">
                      {course.shortDescription}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-400">
                      {course.duration && <span>{course.duration}</span>}
                      {course.startDate && (
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={14} />
                          {new Date(course.startDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      )}
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]">
                      View Details
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
