"use client";

import { API } from "@/lib/api";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AdminLoginPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/api/auth/login", formData);

      if (data.success) {
        localStorage.setItem("adminToken", data.data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.data));

        toast.success("Login Success");

        router.push("/admin");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7FBFC] px-5 py-12">
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
      <div className="absolute -right-24 top-40 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-[80vh] max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F3D5E] shadow-sm">
            <Sparkles size={16} className="text-[#2CB1A6]" />
            Admin Access
          </div>

          <h1 className="text-5xl font-black leading-tight text-[#102A43] md:text-7xl">
            Manage the website with a secure dashboard.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Login to manage contact enquiries, services, blogs, gallery,
            courses, internship applications and website content.
          </p>

          <div className="mt-8 rounded-4xl bg-[#0F3D5E] p-6 text-white shadow-2xl shadow-blue-950/20">
            <ShieldCheck className="mb-4 text-[#F4B183]" size={30} />
            <h2 className="text-2xl font-black">Protected admin area</h2>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Only authorized admin users can access dashboard data.
            </p>
          </div>
        </div>

        <div className="rounded-[3rem] border border-white bg-white p-7 shadow-2xl shadow-slate-900/10 md:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#0F3D5E] to-[#2CB1A6] text-white shadow-xl shadow-teal-900/20">
              <LockKeyhole size={28} />
            </div>

            <h2 className="text-4xl font-black text-[#102A43]">Admin Login</h2>

            <p className="mt-3 text-sm font-semibold text-slate-500">
              Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleLogin} className="grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@vini.com"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] py-4 pl-13 pr-5 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] py-4 pl-13 pr-5 text-sm outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:bg-[#102A43] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLoginPage;
