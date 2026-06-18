"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/api";
import {
  ArrowLeft,
  Download,
  GraduationCap,
  Loader2,
  RefreshCcw,
  Search,
  Trash2,
  UserCheck,
} from "lucide-react";
import { toast } from "react-toastify";

const statuses = ["New", "Reviewed", "Shortlisted", "Rejected"];

export default function AdminInternshipsPage() {
  const router = useRouter();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState("");

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("adminToken");
  };

  const fetchApplications = async () => {
    const token = getToken();

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.get("/api/internship/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(data?.data || []);
    } catch (error) {
      console.log("INTERNSHIP FETCH ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        router.push("/admin/login");
      } else {
        toast.error("Unable to fetch internship applications");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    return applications.filter((item) => {
      const text =
        `${item.fullName} ${item.email} ${item.phone} ${item.city} ${item.qualification} ${item.programInterested} ${item.status}`.toLowerCase();

      return text.includes(search.toLowerCase());
    });
  }, [applications, search]);

  const updateApplication = async (id, payload) => {
    const token = getToken();

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setUpdatingId(id);

      await API.patch(`/api/internship/admin/${id}/status`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Application updated successfully");
      fetchApplications();
    } catch (error) {
      console.log("UPDATE APPLICATION ERROR:", error);
      toast.error(error.response?.data?.message || "Unable to update");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmDelete) return;

    const token = getToken();

    try {
      await API.delete(`/api/internship/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Application deleted successfully");
      fetchApplications();
    } catch (error) {
      console.log("DELETE APPLICATION ERROR:", error);
      toast.error(error.response?.data?.message || "Unable to delete");
    }
  };

  const statusClass = (status) => {
    if (status === "New") return "bg-blue-100 text-blue-700";
    if (status === "Reviewed") return "bg-amber-100 text-amber-700";
    if (status === "Shortlisted") return "bg-emerald-100 text-emerald-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-slate-100 text-slate-700";
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
              Internship Applications
            </div>

            <h1 className="text-4xl font-black text-[#102A43] md:text-5xl">
              Manage Internship Applications
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Review applications, update status, add notes and download
              resumes.
            </p>
          </div>

          <button
            onClick={fetchApplications}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#0F3D5E] shadow-sm disabled:opacity-70"
          >
            <RefreshCcw size={17} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <section className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-black text-[#102A43]">
              Applications ({filteredApplications.length})
            </h2>

            <div className="relative max-w-md flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search applications..."
                className="w-full rounded-full border border-slate-200 bg-[#F7FBFC] py-3 pl-11 pr-5 text-sm outline-none focus:border-[#2CB1A6]"
              />
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />
              <p className="font-bold text-slate-500">
                Loading applications...
              </p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="rounded-2xl bg-[#F7FBFC] p-10 text-center">
              <UserCheck className="mx-auto mb-4 text-[#0F3D5E]" size={40} />
              <h3 className="text-xl font-black text-[#102A43]">
                No applications found
              </h3>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                New internship applications will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredApplications.map((item) => (
                <article
                  key={item._id}
                  className="rounded-3xl border border-slate-100 bg-[#F7FBFC] p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${statusClass(
                            item.status,
                          )}`}
                        >
                          {item.status}
                        </span>

                        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0F3D5E]">
                          {item.programInterested}
                        </span>

                        <span className="rounded-full bg-[#E9F8F6] px-3 py-1 text-xs font-black text-[#0F766E]">
                          {item.preferredMode}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-[#102A43]">
                        {item.fullName}
                      </h3>

                      <div className="mt-3 grid gap-2 text-sm font-semibold text-slate-600 md:grid-cols-2">
                        <p>Email: {item.email}</p>
                        <p>Phone: {item.phone}</p>
                        {item.city && <p>City: {item.city}</p>}
                        <p>Qualification: {item.qualification}</p>
                        {item.college && <p>College: {item.college}</p>}
                        {item.duration && <p>Duration: {item.duration}</p>}
                      </div>

                      {item.message && (
                        <div className="mt-4 rounded-2xl bg-white p-4">
                          <p className="text-xs font-black uppercase tracking-wide text-slate-400">
                            Message
                          </p>
                          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                            {item.message}
                          </p>
                        </div>
                      )}

                      <div className="mt-4">
                        <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-400">
                          Admin Note
                        </label>
                        <textarea
                          defaultValue={item.adminNote || ""}
                          rows={3}
                          onBlur={(e) => {
                            if (e.target.value !== (item.adminNote || "")) {
                              updateApplication(item._id, {
                                adminNote: e.target.value,
                              });
                            }
                          }}
                          placeholder="Add internal note..."
                          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#2CB1A6]"
                        />
                      </div>

                      <p className="mt-3 text-xs font-bold text-slate-400">
                        Applied on:{" "}
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex w-full flex-col gap-3 lg:w-56">
                      <select
                        value={item.status}
                        disabled={updatingId === item._id}
                        onChange={(e) =>
                          updateApplication(item._id, {
                            status: e.target.value,
                          })
                        }
                        className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#102A43] outline-none"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      {item.resume?.url && (
                        <a
                          href={item.resume.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-4 py-3 text-xs font-black text-white"
                        >
                          <Download size={14} />
                          View Resume
                        </a>
                      )}

                      <a
                        href={`https://wa.me/91${item.phone}?text=${encodeURIComponent(
                          `Hello ${item.fullName}, regarding your internship application at Urjasvini CDC.`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-xs font-black text-white"
                      >
                        WhatsApp
                      </a>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-red-50 px-4 py-3 text-xs font-black text-red-600"
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
