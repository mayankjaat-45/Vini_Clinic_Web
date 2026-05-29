"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/api";
import {
  ArrowLeft,
  Download,
  Edit,
  FileText,
  ImagePlus,
  Loader2,
  Plus,
  RefreshCcw,
  Save,
  Search,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

const initialForm = {
  title: "",
  category: "Other",
  description: "",

  pageTitle: "",
  metaDescription: "",

  isFeatured: false,
  isActive: true,
  displayOrder: 0,
};

const categories = [
  "Autism",
  "ADHD",
  "Dyslexia",
  "Parenting",
  "Child Development",
  "Mental Health",
  "Worksheet",
  "Guide",
  "Other",
];

export default function AdminResourcesPage() {
  const router = useRouter();

  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [editingResource, setEditingResource] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("adminToken");
  };

  const fetchResources = async () => {
    const token = getToken();

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.get("/api/resources/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResources(data?.data || []);
    } catch (error) {
      console.log("RESOURCES FETCH ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
      } else {
        toast.error("Unable to fetch resources");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const text =
        `${item.title} ${item.category} ${item.description}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [resources, search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setFile(null);
    setCoverImage(null);
    setEditingResource(null);
    setShowForm(false);
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);

    setFormData({
      title: resource.title || "",
      category: resource.category || "Other",
      description: resource.description || "",

      pageTitle: resource.pageTitle || "",
      metaDescription: resource.metaDescription || "",

      isFeatured: Boolean(resource.isFeatured),
      isActive: Boolean(resource.isActive),
      displayOrder: resource.displayOrder || 0,
    });

    setFile(null);
    setCoverImage(null);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.description.trim()) return "Description is required";

    if (!editingResource && !file) {
      return "PDF/resource file is required";
    }

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

      if (file) {
        payload.append("file", file);
      }

      if (coverImage) {
        payload.append("coverImage", coverImage);
      }

      if (editingResource) {
        await API.put(`/api/resources/${editingResource._id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Resource updated successfully");
      } else {
        await API.post("/api/resources", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Resource uploaded successfully");
      }

      resetForm();
      fetchResources();
    } catch (error) {
      console.log("SAVE RESOURCE ERROR:", error);
      toast.error(error.response?.data?.message || "Unable to save resource");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resource?",
    );

    if (!confirmDelete) return;

    const token = getToken();

    try {
      await API.delete(`/api/resources/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Resource deleted successfully");
      fetchResources();
    } catch (error) {
      console.log("DELETE RESOURCE ERROR:", error);
      toast.error(error.response?.data?.message || "Unable to delete resource");
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
              <FileText size={16} className="text-[#2CB1A6]" />
              Resources Manager
            </div>

            <h1 className="text-4xl font-black text-[#102A43] md:text-5xl">
              Manage Free Resources
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Upload PDFs, worksheets, guides and parent resources.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchResources}
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
              Add Resource
            </button>
          </div>
        </div>

        {showForm && (
          <section className="mb-10 rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black text-[#102A43]">
                {editingResource ? "Edit Resource" : "Upload Resource"}
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
                  label="Resource Title *"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Example: Autism Parent Checklist"
                />

                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={categories}
                />
              </div>

              <Textarea
                label="Description *"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Short description for this resource..."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="SEO Page Title"
                  name="pageTitle"
                  value={formData.pageTitle}
                  onChange={handleChange}
                  placeholder="Free Autism Checklist for Parents | Dr. Vini Jhariya"
                />

                <Textarea
                  label="SEO Meta Description"
                  name="metaDescription"
                  rows={3}
                  value={formData.metaDescription}
                  onChange={handleChange}
                  placeholder="Download this free parent guide for autism signs, support tips and early intervention awareness."
                />
              </div>

              <Input
                label="Display Order"
                name="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={handleChange}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-black text-slate-700">
                    PDF / Resource File {!editingResource && "*"}
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-[#F7FBFC] px-5 py-8 text-center transition hover:border-[#2CB1A6]">
                    <UploadCloud className="mb-3 text-[#0F3D5E]" />
                    <span className="text-sm font-black text-[#102A43]">
                      {file ? file.name : "Click to upload PDF / DOC"}
                    </span>
                    <span className="mt-1 text-xs font-semibold text-slate-500">
                      PDF, DOC, DOCX up to 5MB
                    </span>

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>

                  {editingResource?.file?.url && !file && (
                    <a
                      href={editingResource.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-xs font-black text-white"
                    >
                      <Download size={14} />
                      Current File
                    </a>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-black text-slate-700">
                    Cover Image
                  </label>

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-[#F7FBFC] px-5 py-8 text-center transition hover:border-[#2CB1A6]">
                    <ImagePlus className="mb-3 text-[#0F3D5E]" />
                    <span className="text-sm font-black text-[#102A43]">
                      {coverImage
                        ? coverImage.name
                        : "Click to upload cover image"}
                    </span>
                    <span className="mt-1 text-xs font-semibold text-slate-500">
                      JPG, PNG, WEBP up to 5MB
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setCoverImage(e.target.files?.[0] || null)
                      }
                      className="hidden"
                    />
                  </label>

                  {editingResource?.coverImage?.url && !coverImage && (
                    <img
                      src={editingResource.coverImage.url}
                      alt={editingResource.title}
                      className="mt-4 h-32 w-56 rounded-2xl object-cover"
                    />
                  )}
                </div>
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
                  Featured Resource
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
                    {editingResource ? "Update Resource" : "Upload Resource"}
                  </>
                )}
              </button>
            </form>
          </section>
        )}

        <section className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-black text-[#102A43]">
              Resources ({filteredResources.length})
            </h2>

            <div className="relative max-w-md flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search resources..."
                className="w-full rounded-full border border-slate-200 bg-[#F7FBFC] py-3 pl-11 pr-5 text-sm outline-none focus:border-[#2CB1A6]"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-500">Loading resources...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="rounded-2xl bg-[#F7FBFC] p-10 text-center">
              <FileText className="mx-auto mb-4 text-[#0F3D5E]" size={40} />
              <h3 className="text-xl font-black text-[#102A43]">
                No resources found
              </h3>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Upload your first resource from the button above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredResources.map((item) => (
                <article
                  key={item._id}
                  className="overflow-hidden rounded-3xl border border-slate-100 bg-[#F7FBFC] shadow-sm"
                >
                  <div className="h-44 bg-[#102A43]">
                    {item.coverImage?.url ? (
                      <img
                        src={item.coverImage.url}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/30">
                        <FileText size={50} />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                        {item.category}
                      </span>

                      {item.isFeatured && (
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-700">
                          Featured
                        </span>
                      )}

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          item.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.isActive ? "Active" : "Hidden"}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[#102A43]">
                      {item.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">
                      {item.description}
                    </p>

                    <p className="mt-3 text-xs font-bold text-slate-400">
                      Order: {item.displayOrder || 0}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <a
                        href={item.file?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-4 py-3 text-xs font-black text-white"
                      >
                        <Download size={14} />
                        Open
                      </a>

                      <button
                        onClick={() => handleEdit(item)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-black text-[#0F3D5E]"
                      >
                        <Edit size={14} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-red-50 px-4 py-3 text-xs font-black text-red-600"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
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
