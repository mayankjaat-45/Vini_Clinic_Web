"use client";

import { API } from "@/lib/api";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  RefreshCcw,
  Trash2,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

const AdminEnquiriesPage = () => {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("adminToken");
  };

  const fetchEnquiries = useCallback(async () => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      toast.error("Please login first.");
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.get("/api/contact-enquiries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEnquiries(data?.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to fetch enquiries. Please login again.",
      );

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
    fetchEnquiries();
  }, [fetchEnquiries]);

  const updateStatus = async (id, status) => {
    const token = getToken();

    if (!token) {
      toast.error("Please login first.");
      router.push("/admin/login");
      return;
    }

    try {
      const { data } = await API.patch(
        `/api/contact-enquiries/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success("Status updated successfully.");

        setEnquiries((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status: data.data.status } : item,
          ),
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update status.");
    }
  };

  const deleteEnquire = async (id) => {
    const token = getToken();

    if (!token) {
      toast.error("Please login first.");
      router.push("/admin/login");
      return;
    }

    const confirmedDelete = window.confirm(
      "Are you sure you want to delete this enquiry?",
    );

    if (!confirmedDelete) return;

    try {
      const { data } = await API.delete(`/api/contact-enquiries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success("Enquiry deleted successfully.");
        setEnquiries((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete enquiry.");
    }
  };

  return (
    <main className="min-h-screen bg-[#F7FBFC] px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/admin"
              className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D5E] shadow-sm"
            >
              <ArrowLeft size={16} />
              Back to Admin
            </Link>

            <h1 className="text-4xl font-black text-[#102A43] md:text-5xl">
              Contact Enquiries
            </h1>

            <p className="mt-3 text-slate-600">
              All website consultation enquiries will appear here.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchEnquiries}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="rounded-4xl bg-white p-10 text-center font-bold text-slate-600 shadow-xl">
            Loading enquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="rounded-4xl bg-white p-10 text-center font-bold text-slate-600 shadow-xl">
            No enquiries found.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {enquiries.map((item) => {
              const cleanPhone = item.phone
                ? item.phone.replace(/\D/g, "").slice(-10)
                : "";

              return (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-4xl border border-white bg-white p-6 shadow-xl shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10"
                >
                  <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#2CB1A6]/10" />

                  <div className="relative">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex rounded-full px-4 py-2 text-xs font-black ${
                          item.status === "New"
                            ? "bg-blue-50 text-blue-700"
                            : item.status === "Contacted"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {item.status || "New"}
                      </span>

                      <span className="rounded-full bg-[#F7FBFC] px-3 py-2 text-xs font-bold text-[#0F3D5E]">
                        {item.consultationType || "General"}
                      </span>
                    </div>

                    <h2 className="line-clamp-1 text-2xl font-black text-[#102A43]">
                      {item.name || "No name"}
                    </h2>

                    <p className="mt-3 line-clamp-3 min-h-13.5 text-sm leading-6 text-slate-600">
                      {item.message || "No message"}
                    </p>

                    <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5">
                      <div className="flex items-center gap-3 rounded-2xl bg-[#F7FBFC] px-4 py-3 text-sm font-semibold text-slate-600">
                        <Phone size={17} className="shrink-0 text-[#0F766E]" />
                        <span className="truncate">
                          {item.phone || "No phone"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 rounded-2xl bg-[#F7FBFC] px-4 py-3 text-sm font-semibold text-slate-600">
                        <Mail size={17} className="shrink-0 text-[#0F766E]" />
                        <span className="truncate">
                          {item.email || "No email"}
                        </span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-2xl bg-[#F7FBFC] px-4 py-3 text-sm font-semibold text-slate-600">
                          <UserRound
                            size={17}
                            className="shrink-0 text-[#0F766E]"
                          />
                          <span className="truncate">
                            {item.preferredMode || "Not sure"}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 rounded-2xl bg-[#F7FBFC] px-4 py-3 text-sm font-semibold text-slate-600">
                          <CalendarDays
                            size={17}
                            className="shrink-0 text-[#0F766E]"
                          />
                          <span className="truncate">
                            {item.preferredDate || "No date"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white"
                      >
                        Call
                      </a>

                      <a
                        href={`https://wa.me/91${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white"
                      >
                        WhatsApp
                      </a>

                      <button
                        type="button"
                        onClick={() => updateStatus(item._id, "Contacted")}
                        disabled={item.status === "Contacted"}
                        className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-5 py-3 text-sm font-black text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <CheckCircle2 size={16} />
                        Mark Contacted
                      </button>

                      <button
                        type="button"
                        onClick={() => updateStatus(item._id, "Closed")}
                        disabled={item.status === "Closed"}
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-5 py-3 text-sm font-black text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <CheckCircle2 size={16} />
                        Mark Closed
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteEnquire(item._id)}
                        className="inline-flex items-center gap-2 rounded-full bg-red-50 px-5 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminEnquiriesPage;
