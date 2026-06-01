import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  MessageCircle,
  MonitorSmartphone,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Online Consultation | Dr. Vini Jhariya",
  description:
    "Book an online consultation with Dr. Vini Jhariya for child psychology, parenting guidance, counselling and developmental concerns.",
  alternates: {
    canonical: "https://thechildpsychologist.in/online-consultation",
  },
};

const points = [
  "Parent guidance for child behaviour and emotional concerns",
  "Initial discussion for autism, ADHD, dyslexia and developmental concerns",
  "Counselling support for children, adolescents and families",
  "Convenient consultation from home with professional guidance",
];

export default function OnlineConsultationPage() {
  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-5 py-24">
        <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
              <MonitorSmartphone size={17} className="text-[#2CB1A6]" />
              Online Consultation
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-tight text-[#102A43] md:text-7xl">
              Consult Dr. Vini Jhariya from anywhere.
            </h1>

            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
              Online consultation is helpful for parents and families who need
              professional guidance for child behaviour, emotional concerns,
              developmental concerns, counselling support or next-step planning.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/10"
              >
                <CalendarCheck size={18} />
                Book Online Session
              </Link>

              <a
                href="https://wa.me/917999215093"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white shadow-xl shadow-slate-900/10"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="rounded-[3rem] bg-white p-7 shadow-2xl shadow-slate-900/10">
            <div className="rounded-[2.2rem] bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-8 text-white">
              <ShieldCheck className="mb-5 text-[#F4B183]" size={42} />
              <h2 className="text-3xl font-black">
                Professional guidance, wherever you are.
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-white/75">
                Share your concern, understand possible next steps and get
                clarity on whether assessment, therapy or counselling may be
                needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-white p-8 shadow-xl shadow-slate-900/5 md:p-12">
          <h2 className="text-4xl font-black text-[#102A43]">
            Online consultation can help with
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {points.map((point) => (
              <div
                key={point}
                className="flex gap-3 rounded-3xl bg-[#F7FBFC] p-5"
              >
                <CheckCircle2 className="mt-1 shrink-0 text-[#2CB1A6]" />
                <p className="font-bold leading-7 text-slate-600">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
