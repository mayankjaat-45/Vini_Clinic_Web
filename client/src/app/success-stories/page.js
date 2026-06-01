import Link from "next/link";
import {
  CalendarCheck,
  HeartHandshake,
  MessageCircle,
  Quote,
  Star,
} from "lucide-react";

export const metadata = {
  title: "Success Stories | Dr. Vini Jhariya",
  description:
    "Read parent experiences and success stories from Urjasvini Child Development Centre, Indore.",
  alternates: {
    canonical: "https://thechildpsychologist.in/success-stories",
  },
};

const stories = [
  {
    title: "Parent guidance that brought clarity",
    text: "The consultation helped us understand our child’s behaviour better and guided us towards the right support.",
  },
  {
    title: "Supportive and child-friendly approach",
    text: "The process felt warm, professional and very reassuring for our family.",
  },
  {
    title: "Better understanding of developmental needs",
    text: "We received clear guidance about our child’s learning and developmental concerns.",
  },
];

export default function SuccessStoriesPage() {
  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-5 py-24">
        <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
            <HeartHandshake size={17} className="text-[#2CB1A6]" />
            Success Stories
          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-black leading-tight text-[#102A43] md:text-7xl">
            Stories of care, progress and parent trust.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
            Real families, real concerns and supportive guidance at Urjasvini
            Child Development Centre.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F3D5E] shadow-sm">
            <Star size={17} className="fill-[#F4B183] text-[#F4B183]" />
            4.9★ Google Rating
          </div>
        </div>
      </section>

      <section className="-mt-8 px-5 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.title}
              className="rounded-4xl bg-white p-7 shadow-xl shadow-slate-900/5"
            >
              <Quote className="mb-5 text-[#2CB1A6]" size={34} />
              <h2 className="text-2xl font-black text-[#102A43]">
                {story.title}
              </h2>
              <p className="mt-4 font-semibold leading-7 text-slate-600">
                {story.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-[#0F3D5E] p-10 text-center text-white md:p-16">
          <h2 className="text-4xl font-black md:text-6xl">
            Want guidance for your child or family?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-white/75">
            Book a consultation with Dr. Vini Jhariya and understand the right
            support path.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-black text-[#0F3D5E]"
            >
              <CalendarCheck size={18} />
              Book Consultation
            </Link>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
