import { Loader2, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FBFC] px-5">
      <div className="rounded-[3rem] bg-white p-10 text-center shadow-2xl shadow-slate-900/10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-4xl bg-[#E9F8F6] text-[#0F766E]">
          <Loader2 size={42} className="animate-spin" />
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2 text-sm font-black text-[#0F3D5E]">
          <Sparkles size={15} className="text-[#2CB1A6]" />
          Loading
        </div>

        <h1 className="text-3xl font-black text-[#102A43]">Please wait...</h1>

        <p className="mt-3 text-sm font-semibold text-slate-500">
          We are preparing the page for you.
        </p>
      </div>
    </main>
  );
}
