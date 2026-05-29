import { Loader2, LayoutDashboard } from "lucide-react";

export default function AdminLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FBFC] px-5">
      <div className="rounded-[3rem] bg-white p-10 text-center shadow-2xl shadow-slate-900/10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-4xl bg-[#E9F8F6] text-[#0F766E]">
          <LayoutDashboard size={40} />
        </div>

        <Loader2 className="mx-auto mb-4 animate-spin text-[#0F3D5E]" />

        <h1 className="text-3xl font-black text-[#102A43]">
          Loading admin panel...
        </h1>

        <p className="mt-3 text-sm font-semibold text-slate-500">
          Please wait while we prepare dashboard data.
        </p>
      </div>
    </main>
  );
}
