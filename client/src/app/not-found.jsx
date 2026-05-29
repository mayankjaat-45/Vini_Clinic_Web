import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7FBFC] px-5 py-20">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

      <section className="relative mx-auto max-w-2xl rounded-[3rem] bg-white p-8 text-center shadow-2xl shadow-slate-900/10 md:p-14">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-4xl bg-[#E9F8F6] text-[#0F766E]">
          <SearchX size={42} />
        </div>

        <p className="text-sm font-black uppercase tracking-[0.3em] text-[#2CB1A6]">
          404 Error
        </p>

        <h1 className="mt-4 text-4xl font-black leading-tight text-[#102A43] md:text-6xl">
          Page not found
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-base font-semibold leading-8 text-slate-600">
          The page you are trying to open may have been moved, deleted or the
          link may be incorrect.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
          >
            <Home size={17} />
            Go Home
          </Link>

          <Link
            href="/contact-us"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E9F8F6] px-7 py-4 text-sm font-black text-[#0F766E] transition hover:-translate-y-1"
          >
            Contact Us
            <ArrowLeft size={17} className="rotate-180" />
          </Link>
        </div>
      </section>
    </main>
  );
}
