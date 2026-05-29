"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API } from "@/lib/api";
import {
  ArrowRight,
  Inbox,
  LayoutDashboard,
  LogOut,
  RefreshCcw,
  CheckCircle2,
  Clock,
  MessageCircle,
  FileText,
  Images,
  GraduationCap,
  UserCheck,
  Settings,
} from "lucide-react";
import { toast } from "react-toastify";

export default function AdminPage() {
  const router = useRouter();

  const [stats, setStats] = useState({
    total: 0,
    newCount: 0,
    contactedCount: 0,
    closedCount: 0,

    blogs: 0,
    gallery: 0,
    courses: 0,
    internships: 0,
  });

  const [loading, setLoading] = useState(true);

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("adminToken");
  };

  const fetchDashboardStats = useCallback(async () => {
    const token = getToken();

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [enquiriesRes, blogsRes, galleryRes, coursesRes, internshipsRes] =
        await Promise.allSettled([
          API.get("/api/contact-enquiries", { headers }),
          API.get("/api/blogs/admin/all", { headers }),
          API.get("/api/gallery/admin/all", { headers }),
          API.get("/api/courses/admin/all", { headers }),
          API.get("/api/internships/admin/all", { headers }),
        ]);

      const enquiries =
        enquiriesRes.status === "fulfilled"
          ? enquiriesRes.value.data?.data || []
          : [];

      const blogs =
        blogsRes.status === "fulfilled" ? blogsRes.value.data?.data || [] : [];

      const gallery =
        galleryRes.status === "fulfilled"
          ? galleryRes.value.data?.data || []
          : [];

      const courses =
        coursesRes.status === "fulfilled"
          ? coursesRes.value.data?.data || []
          : [];

      const internships =
        internshipsRes.status === "fulfilled"
          ? internshipsRes.value.data?.data || []
          : [];

      setStats({
        total: enquiries.length,
        newCount: enquiries.filter((item) => item.status === "New").length,
        contactedCount: enquiries.filter((item) => item.status === "Contacted")
          .length,
        closedCount: enquiries.filter((item) => item.status === "Closed")
          .length,

        blogs: blogs.length,
        gallery: gallery.length,
        courses: courses.length,
        internships: internships.length,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load dashboard data.",
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
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    toast.success("Logged out successfully.");
    router.push("/admin/login");
  };

  const adminCards = [
    {
      title: "Contact Enquiries",
      description:
        "View, call, WhatsApp, update status and delete consultation enquiries.",
      href: "/admin/enquiries",
      icon: Inbox,
      label: "Open Enquiries",
    },
    {
      title: "Services",
      description: "Add, edit, hide and delete therapy/counselling services.",
      href: "/admin/services",
      icon: LayoutDashboard,
      label: "Manage Services",
    },
    {
      title: "Blogs",
      description: "Add, edit, publish, unpublish and delete blog articles.",
      href: "/admin/blogs",
      icon: FileText,
      label: "Manage Blogs",
    },
    {
      title: "Gallery",
      description: "Upload and manage clinic, event, award and team photos.",
      href: "/admin/gallery",
      icon: Images,
      label: "Manage Gallery",
    },
    {
      title: "Courses",
      description: "Add and manage courses, workshops and training programs.",
      href: "/admin/courses",
      icon: GraduationCap,
      label: "Manage Courses",
    },
    {
      title: "Internship Applications",
      description: "Review applications, update status and view resumes.",
      href: "/admin/internships",
      icon: UserCheck,
      label: "Manage Applications",
    },
    {
      title: "Free Resources",
      description: "Upload and manage PDFs, worksheets and parent guides.",
      href: "/admin/resources",
      icon: FileText,
      label: "Manage Resources",
    },
  ];
  return (
    <main className="min-h-screen bg-[#F7FBFC] px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D5E] shadow-sm">
              <LayoutDashboard size={16} />
              Admin Dashboard
            </div>

            <h1 className="text-4xl font-black text-[#102A43] md:text-6xl">
              Website Admin
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600">
              Manage website enquiries, services, blogs, gallery, courses and
              internship applications from here.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchDashboardStats}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:bg-[#E9F8F6] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-50 px-6 py-3 text-sm font-black text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white">
              <Inbox size={24} />
            </div>
            <p className="text-sm font-bold text-slate-500">Total Enquiries</p>
            <h2 className="mt-2 text-4xl font-black text-[#102A43]">
              {loading ? "..." : stats.total}
            </h2>
          </div>

          <div className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <MessageCircle size={24} />
            </div>
            <p className="text-sm font-bold text-slate-500">New</p>
            <h2 className="mt-2 text-4xl font-black text-blue-700">
              {loading ? "..." : stats.newCount}
            </h2>
          </div>

          <div className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
              <Clock size={24} />
            </div>
            <p className="text-sm font-bold text-slate-500">Contacted</p>
            <h2 className="mt-2 text-4xl font-black text-amber-700">
              {loading ? "..." : stats.contactedCount}
            </h2>
          </div>

          <div className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-sm font-bold text-slate-500">Closed</p>
            <h2 className="mt-2 text-4xl font-black text-emerald-700">
              {loading ? "..." : stats.closedCount}
            </h2>
          </div>

          <div className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
              <FileText size={24} />
            </div>
            <p className="text-sm font-bold text-slate-500">Blogs</p>
            <h2 className="mt-2 text-4xl font-black text-[#102A43]">
              {loading ? "..." : stats.blogs}
            </h2>
          </div>

          <div className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
              <Images size={24} />
            </div>
            <p className="text-sm font-bold text-slate-500">Gallery Images</p>
            <h2 className="mt-2 text-4xl font-black text-[#102A43]">
              {loading ? "..." : stats.gallery}
            </h2>
          </div>

          <div className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
              <GraduationCap size={24} />
            </div>
            <p className="text-sm font-bold text-slate-500">Courses</p>
            <h2 className="mt-2 text-4xl font-black text-[#102A43]">
              {loading ? "..." : stats.courses}
            </h2>
          </div>

          <div className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-purple-50 text-purple-700">
              <UserCheck size={24} />
            </div>
            <p className="text-sm font-bold text-slate-500">
              Internship Applications
            </p>
            <h2 className="mt-2 text-4xl font-black text-purple-700">
              {loading ? "..." : stats.internships}
            </h2>
          </div>
        </div>
        {/* Quick Actions */}
        <section className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
          <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#E9F8F6] px-4 py-2 text-sm font-black text-[#0F766E]">
                <Settings size={16} />
                Quick Actions
              </div>

              <h2 className="text-3xl font-black text-[#102A43]">
                Manage Website Content
              </h2>

              <p className="mt-2 text-sm font-semibold text-slate-500">
                Open any module and manage content directly from admin panel.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {adminCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group rounded-4xl border border-slate-100 bg-[#F7FBFC] p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-slate-900/10"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3D5E] text-white transition group-hover:bg-[#2CB1A6]">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-2xl font-black text-[#102A43]">
                    {card.title}
                  </h3>

                  <p className="mt-3 min-h-12 text-sm font-semibold leading-6 text-slate-600">
                    {card.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]">
                    {card.label}
                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
