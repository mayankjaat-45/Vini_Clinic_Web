"use client";

import { useCallback, useEffect, useState } from "react";
import { API } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  CheckCircle2,
  Edit,
  Eye,
  EyeOff,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
  X,
} from "lucide-react";

const emptyForm = {
  title: "",
  category: "Children",
  shortDescription: "",
  description: "",
  pointsText: "",
  processText: "",
  faqQuestion: "",
  faqAnswer: "",

  pageTitle: "",
  metaDescription: "",

  isActive: true,
  displayOrder: 0,
};

const AdminServicesPage = () => {
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("adminToken");
  };

  const authHeaders = () => {
    const token = getToken();

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchServices = useCallback(async () => {
    const token = getToken();

    if (!token) {
      toast.error("Please login first.");
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.get("/api/services/admin/all", {
        headers: authHeaders(),
      });

      setServices(data?.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to fetch services.");

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingService(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openCreateForm = () => {
    setEditingService(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (service) => {
    setEditingService(service);

    setFormData({
      title: service.title || "",
      category: service.category || "Children",
      shortDescription: service.shortDescription || "",
      description: service.description || "",
      pointsText: Array.isArray(service.points)
        ? service.points.join("\n")
        : "",
      processText: Array.isArray(service.process)
        ? service.process.join("\n")
        : "",
      faqQuestion: service.faqs?.[0]?.question || "",
      faqAnswer: service.faqs?.[0]?.answer || "",

      pageTitle: service.pageTitle || "",
      metaDescription: service.metaDescription || "",

      isActive: service.isActive ?? true,
      displayOrder: service.displayOrder || 0,
    });

    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buildPayload = () => {
    const points = formData.pointsText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const process = formData.processText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const faqs =
      formData.faqQuestion.trim() && formData.faqAnswer.trim()
        ? [
            {
              question: formData.faqQuestion.trim(),
              answer: formData.faqAnswer.trim(),
            },
          ]
        : [];

    return {
      title: formData.title.trim(),
      category: formData.category,
      shortDescription: formData.shortDescription.trim(),
      description: formData.description.trim(),
      points,
      process,
      faqs,

      pageTitle: formData.pageTitle.trim(),
      metaDescription: formData.metaDescription.trim(),

      isActive: formData.isActive,
      displayOrder: Number(formData.displayOrder) || 0,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.shortDescription.trim() ||
      !formData.description.trim()
    ) {
      toast.error("Title, short description and description are required.");
      return;
    }

    try {
      setSaving(true);

      const payload = buildPayload();

      if (editingService) {
        const { data } = await API.put(
          `/api/services/${editingService._id}`,
          payload,
          {
            headers: authHeaders(),
          },
        );

        if (data.success) {
          toast.success("Service updated successfully.");
          resetForm();
          fetchServices();
        }
      } else {
        const { data } = await API.post("/api/services", payload, {
          headers: authHeaders(),
        });

        if (data.success) {
          toast.success("Service created successfully.");
          resetForm();
          fetchServices();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to save service.");
    } finally {
      setSaving(false);
    }
  };

  const toggleServiceStatus = async (service) => {
    try {
      const { data } = await API.put(
        `/api/services/${service._id}`,
        {
          isActive: !service.isActive,
        },
        {
          headers: authHeaders(),
        },
      );

      if (data.success) {
        toast.success(
          service.isActive
            ? "Service hidden successfully."
            : "Service activated successfully.",
        );

        setServices((prev) =>
          prev.map((item) =>
            item._id === service._id
              ? { ...item, isActive: data.data.isActive }
              : item,
          ),
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update status.");
    }
  };

  const deleteService = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmed) return;

    try {
      const { data } = await API.delete(`/api/services/${id}`, {
        headers: authHeaders(),
      });

      if (data.success) {
        toast.success("Service deleted successfully.");
        setServices((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete service.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FBFC] px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D5E] shadow-sm"
            >
              <ArrowLeft size={16} />
              Back to Admin
            </Link>

            <h1 className="text-4xl font-black text-[#102A43] md:text-5xl">
              Services Management
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Add, update, hide or delete therapy and counselling services shown
              on the website.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchServices}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:bg-[#E9F8F6] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
            >
              <Plus size={17} />
              Add Service
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-10 rounded-4xl border border-white bg-white p-6 shadow-2xl shadow-slate-900/5 md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-[#102A43]">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h2>

                <p className="mt-2 text-sm font-semibold text-slate-500">
                  Add service content that will appear on frontend service
                  pages.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Autism Therapy"
                    className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                  >
                    <option value="Children">Children</option>
                    <option value="Adults">Adults</option>
                    <option value="Online Consultation">
                      Online Consultation
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Short Description *
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Structured support for social, emotional and behavioural growth."
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Full Description *
                </label>
                <textarea
                  rows="5"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write complete service description..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Points / Benefits
                  </label>
                  <textarea
                    rows="6"
                    name="pointsText"
                    value={formData.pointsText}
                    onChange={handleChange}
                    placeholder={`Social communication support\nBehaviour guidance\nParent counselling`}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                  />
                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    Add one point per line.
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Process Steps
                  </label>
                  <textarea
                    rows="6"
                    name="processText"
                    value={formData.processText}
                    onChange={handleChange}
                    placeholder={`Initial consultation\nObservation and history\nPersonalised plan`}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                  />
                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    Add one process step per line.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    FAQ Question
                  </label>
                  <input
                    type="text"
                    name="faqQuestion"
                    value={formData.faqQuestion}
                    onChange={handleChange}
                    placeholder="Is this service available online?"
                    className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    FAQ Answer
                  </label>
                  <input
                    type="text"
                    name="faqAnswer"
                    value={formData.faqAnswer}
                    onChange={handleChange}
                    placeholder="Yes, online sessions are available..."
                    className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                  />
                </div>

                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-5 w-5 accent-[#0F3D5E]"
                  />
                  <span className="text-sm font-bold text-slate-700">
                    Show this service on website
                  </span>
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    SEO Page Title
                  </label>
                  <input
                    type="text"
                    name="pageTitle"
                    value={formData.pageTitle}
                    onChange={handleChange}
                    placeholder="Autism Therapy in Indore | Dr. Vini Jhariya"
                    className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows="3"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    placeholder="Short SEO description for Google search results..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Save size={18} />
                  {saving
                    ? "Saving..."
                    : editingService
                      ? "Update Service"
                      : "Create Service"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-7 py-4 text-sm font-black text-slate-600 transition hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="rounded-4xl bg-white p-10 text-center font-bold text-slate-600 shadow-xl">
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-4xl bg-white p-10 text-center font-bold text-slate-600 shadow-xl">
            No services found. Click “Add Service” to create first service.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service._id}
                className="group relative overflow-hidden rounded-4xl border border-white bg-white p-6 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#2CB1A6]/10" />

                <div className="relative">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black text-[#0F766E]">
                      {service.category}
                    </span>

                    <span
                      className={`rounded-full px-4 py-2 text-xs font-black ${
                        service.isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {service.isActive ? "Active" : "Hidden"}
                    </span>
                  </div>

                  <h2 className="line-clamp-2 text-2xl font-black text-[#102A43]">
                    {service.title}
                  </h2>

                  <p className="mt-3 line-clamp-3 min-h-18 text-sm leading-6 text-slate-600">
                    {service.shortDescription}
                  </p>

                  <div className="mt-5 rounded-2xl bg-[#F7FBFC] px-4 py-3 text-xs font-bold text-[#0F3D5E]">
                    Slug: /services/{service.slug}
                  </div>

                  {service.points?.length > 0 && (
                    <div className="mt-5 space-y-2">
                      {service.points.slice(0, 3).map((point) => (
                        <div
                          key={point}
                          className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                        >
                          <CheckCircle2 size={16} className="text-[#0F766E]" />
                          <span className="line-clamp-1">{point}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openEditForm(service)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white"
                    >
                      <Edit size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleServiceStatus(service)}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black ${
                        service.isActive
                          ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                    >
                      {service.isActive ? (
                        <>
                          <EyeOff size={16} />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye size={16} />
                          Show
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteService(service._id)}
                      className="inline-flex items-center gap-2 rounded-full bg-red-50 px-5 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminServicesPage;
