"use client";

import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7FBFC] px-5 py-20">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-200/30 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <section className="relative mx-auto max-w-2xl rounded-[3rem] bg-white p-8 text-center shadow-2xl shadow-slate-900/10 md:p-14">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-4xl bg-red-50 text-red-600">
          <AlertTriangle size={42} />
        </div>

        <p className="text-sm font-black uppercase tracking-[0.3em] text-red-500">
          Something went wrong
        </p>

        <h1 className="mt-4 text-4xl font-black leading-tight text-[#102A43] md:text-5xl">
          Unable to load this page
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-8 text-slate-600">
          There was a temporary issue while loading this page. Please try again.
        </p>

        {error?.message && (
          <p className="mt-5 rounded-2xl bg-[#F7FBFC] px-5 py-4 text-xs font-semibold text-slate-500">
            {error.message}
          </p>
        )}

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
          >
            <RefreshCcw size={17} />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E9F8F6] px-7 py-4 text-sm font-black text-[#0F766E] transition hover:-translate-y-1"
          >
            <Home size={17} />
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}
