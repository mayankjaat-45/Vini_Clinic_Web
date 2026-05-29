"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/api";
import {
  ArrowLeft,
  BookOpen,
  Edit,
  GraduationCap,
  ImagePlus,
  Loader2,
  Plus,
  RefreshCcw,
  Save,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

const initialForm = {
  title: "",
  category: "Other",
  shortDescription: "",
  description: "",
  duration: "",
  mode: "Online",
  eligibility: "",
  fees: "",
  startDate: "",
  modules: "",
  pageTitle: "",
  metaDescription: "",
  isFeatured: false,
  isActive: true,
  displayOrder: 0,
};

const categories = [
  "Psychology",
  "Internship",
  "Parent Training",
  "Teacher Training",
  "Workshop",
  "Other",
];

const modes = ["Online", "Offline", "Hybrid"];

export default function AdminCoursesPage() {
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("adminToken");
  };

  const fetchCourses = async () => {
    const token = getToken();

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.get("/api/courses/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCourses(data?.data || []);
    } catch (error) {
      console.log("COURSES FETCH ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
      } else {
        toast.error("Unable to fetch courses");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const text =
        `${course.title} ${course.category} ${course.mode} ${course.shortDescription}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [courses, search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setImage(null);
    setEditingCourse(null);
    setShowForm(false);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);

    setFormData({
      title: course.title || "",
      category: course.category || "Other",
      shortDescription: course.shortDescription || "",
      description: course.description || "",
      duration: course.duration || "",
      mode: course.mode || "Online",
      eligibility: course.eligibility || "",
      fees: course.fees || "",
      startDate: course.startDate
        ? new Date(course.startDate).toISOString().slice(0, 10)
        : "",
      modules: Array.isArray(course.modules)
        ? course.modules.map((item) => item.title).join("\n")
        : "",
      pageTitle: course.pageTitle || "",
      metaDescription: course.metaDescription || "",
      isFeatured: Boolean(course.isFeatured),
      isActive: Boolean(course.isActive),
      displayOrder: course.displayOrder || 0,
    });

    setImage(null);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Course title is required";
    if (!formData.shortDescription.trim())
      return "Short description is required";
    if (!formData.description.trim()) return "Course description is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    const token = getToken();

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setSaving(true);

      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (image) {
        payload.append("image", image);
      }

      if (editingCourse) {
        await API.put(`/api/courses/${editingCourse._id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Course updated successfully");
      } else {
        await API.post("/api/courses", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Course created successfully");
      }

      resetForm();
      fetchCourses();
    } catch (error) {
      console.log("SAVE COURSE ERROR:", error);
      toast.error(error.response?.data?.message || "Unable to save course");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmDelete) return;

    const token = getToken();

    try {
      await API.delete(`/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      console.log("DELETE COURSE ERROR:", error);
      toast.error(error.response?.data?.message || "Unable to delete course");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FBFC] px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <button
              onClick={() => router.push("/admin")}
              className="mb-5 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]"
            >
              <ArrowLeft size={16} />
              Back to Dashboard
            </button>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
              <GraduationCap size={16} className="text-[#2CB1A6]" />
              Courses Manager
            </div>

            <h1 className="text-4xl font-black text-[#102A43] md:text-5xl">
              Manage Courses
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Add and manage courses, workshops, parent training and internship
              programs.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchCourses}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#0F3D5E] shadow-sm disabled:opacity-70"
            >
              <RefreshCcw size={17} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15"
            >
              <Plus size={18} />
              Add Course
            </button>
          </div>
        </div>

        {showForm && (
          <section className="mb-10 rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black text-[#102A43]">
                {editingCourse ? "Edit Course" : "Add Course"}
              </h2>

              <button
                onClick={resetForm}
                className="rounded-full bg-slate-100 p-3 text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Course Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Example: Child Psychology Internship Program"
                />

                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={categories}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <Select
                  label="Mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  options={modes}
                />

                <Input
                  label="Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Example: 4 Weeks"
                />

                <Input
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Eligibility"
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleChange}
                  placeholder="Example: Psychology students / graduates"
                />

                <Input
                  label="Fees"
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  placeholder="Example: Contact for details"
                />
              </div>

              <Textarea
                label="Short Description *"
                name="shortDescription"
                rows={3}
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Short summary for course cards..."
              />

              <Textarea
                label="Full Description *"
                name="description"
                rows={8}
                value={formData.description}
                onChange={handleChange}
                placeholder="Full course details..."
              />

              <Textarea
                label="Modules"
                name="modules"
                rows={6}
                value={formData.modules}
                onChange={handleChange}
                placeholder={
                  "Enter one module per line\nExample:\nIntroduction to Child Psychology\nAssessment Basics\nCase Discussion"
                }
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="SEO Title"
                  name="pageTitle"
                  value={formData.pageTitle}
                  onChange={handleChange}
                  placeholder="SEO title"
                />

                <Input
                  label="Meta Description"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="SEO meta description"
                />
              </div>

              <Input
                label="Display Order"
                name="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={handleChange}
              />

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Course Image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-[#F7FBFC] px-5 py-8 text-center transition hover:border-[#2CB1A6]">
                  <ImagePlus className="mb-3 text-[#0F3D5E]" />
                  <span className="text-sm font-black text-[#102A43]">
                    {image ? image.name : "Click to upload image"}
                  </span>
                  <span className="mt-1 text-xs font-semibold text-slate-500">
                    JPG, PNG, WEBP up to 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>

                {editingCourse?.image?.url && !image && (
                  <img
                    src={editingCourse.image.url}
                    alt={editingCourse.title}
                    className="mt-4 h-40 w-64 rounded-2xl object-cover"
                  />
                )}
              </div>

              <div className="flex flex-wrap gap-5">
                <label className="flex items-center gap-3 rounded-2xl bg-[#F7FBFC] px-5 py-4 text-sm font-black text-slate-700">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  Featured Course
                </label>

                <label className="flex items-center gap-3 rounded-2xl bg-[#F7FBFC] px-5 py-4 text-sm font-black text-slate-700">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  Active
                </label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {editingCourse ? "Update Course" : "Create Course"}
                  </>
                )}
              </button>
            </form>
          </section>
        )}

        <section className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-black text-[#102A43]">
              Courses ({filteredCourses.length})
            </h2>

            <div className="relative max-w-md flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full rounded-full border border-slate-200 bg-[#F7FBFC] py-3 pl-11 pr-5 text-sm outline-none focus:border-[#2CB1A6]"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-500">Loading courses...</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="rounded-2xl bg-[#F7FBFC] p-10 text-center">
              <BookOpen className="mx-auto mb-4 text-[#0F3D5E]" size={40} />
              <h3 className="text-xl font-black text-[#102A43]">
                No courses found
              </h3>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Create your first course from the button above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredCourses.map((course) => (
                <article
                  key={course._id}
                  className="grid gap-5 rounded-3xl border border-slate-100 bg-[#F7FBFC] p-5 md:grid-cols-[180px_1fr_auto]"
                >
                  <div className="h-36 overflow-hidden rounded-2xl bg-[#102A43]">
                    {course.image?.url ? (
                      <img
                        src={course.image.url}
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/30">
                        <BookOpen size={42} />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                        {course.category}
                      </span>

                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0F3D5E]">
                        {course.mode}
                      </span>

                      {course.isFeatured && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-700">
                          Featured
                        </span>
                      )}

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          course.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {course.isActive ? "Active" : "Hidden"}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[#102A43]">
                      {course.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">
                      {course.shortDescription}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold text-slate-400">
                      {course.duration && <span>{course.duration}</span>}
                      {course.fees && <span>{course.fees}</span>}
                      <span>Order: {course.displayOrder || 0}</span>
                    </div>

                    <p className="mt-2 text-xs font-bold text-slate-400">
                      /courses/{course.slug}
                    </p>
                  </div>

                  <div className="flex items-start gap-2 md:flex-col">
                    <button
                      onClick={() => handleEdit(course)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-4 py-3 text-xs font-black text-white"
                    >
                      <Edit size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(course._id)}
                      className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-3 text-xs font-black text-red-600"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

const Input = ({ label, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      <input
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
      />
    </div>
  );
};

const Select = ({ label, options = [], ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      <select
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

const Textarea = ({ label, ...props }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      <textarea
        {...props}
        className="w-full resize-y rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
      />
    </div>
  );
};
