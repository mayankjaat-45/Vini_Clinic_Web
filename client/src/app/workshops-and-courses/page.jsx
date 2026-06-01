import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CalendarCheck,
  GraduationCap,
  HeartHandshake,
  Mail,
  MessageCircle,
  School,
  Sparkles,
  Users,
} from "lucide-react";

export const metadata = {
  title:
    "Workshops & Courses | Dr. Vini Jhariya | Urjasvini Child Development Centre",
  description:
    "Join the waitlist for upcoming psychology workshops, parent training, teacher training and child development courses by Dr. Vini Jhariya in Indore.",
  alternates: {
    canonical: "/workshops-and-courses",
  },
  openGraph: {
    title: "Workshops & Courses | Dr. Vini Jhariya",
    description:
      "Upcoming workshops, parent training, teacher training and psychology learning programs by Urjasvini Child Development Centre.",
    type: "website",
  },
};

const teaserCards = [
  {
    icon: Users,
    title: "Parent Training",
    text: "Practical sessions for parents to understand behaviour, emotions, routines and communication.",
  },
  {
    icon: School,
    title: "Teacher Training",
    text: "Programs for educators to support children with learning, attention and emotional needs.",
  },
  {
    icon: Brain,
    title: "Child Psychology Workshops",
    text: "Awareness sessions on child development, early intervention and mental health support.",
  },
  {
    icon: GraduationCap,
    title: "Internship Learning Sessions",
    text: "Skill-based learning opportunities for psychology students and young professionals.",
  },
];

export default function WorkshopsAndCoursesPage() {
  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-4 py-18 sm:px-5 sm:py-22 md:py-24">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl md:h-96 md:w-96" />
        <div className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl md:h-96 md:w-96" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
                <Sparkles size={16} className="text-[#2CB1A6]" />
                Workshops & Courses
              </div>

              <h1 className="max-w-5xl text-4xl font-black leading-tight text-[#102A43] sm:text-5xl md:text-7xl">
                Upcoming learning programs for parents, teachers and psychology
                students.
              </h1>

              <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
                Urjasvini Child Development Centre will soon open workshops and
                training programs focused on child psychology, counselling,
                intervention, parent guidance and classroom support.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:dr.vinijhariya@gmail.com?subject=Workshops%20and%20Courses%20Waitlist"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
                >
                  <Mail size={18} />
                  Join Waitlist
                  <ArrowRight size={17} />
                </a>

                <a
                  href="https://wa.me/917999215093?text=Hello%2C%20I%20want%20to%20join%20the%20waitlist%20for%20workshops%20and%20courses."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-7 py-4 text-sm font-black text-[#0F3D5E] shadow-sm transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="rounded-4xl bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-6 md:rounded-[3rem]">
              <div className="rounded-[1.7rem] bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-7 text-white md:rounded-[2.4rem] md:p-9">
                <BookOpen size={48} className="text-[#F4B183]" />

                <h2 className="mt-6 text-3xl font-black leading-tight">
                  Batches opening soon
                </h2>

                <p className="mt-4 text-sm font-semibold leading-7 text-white/75 sm:text-base">
                  Leave your interest through email or WhatsApp. The team will
                  share batch dates, fees and registration details once programs
                  are announced.
                </p>

                <div className="mt-7 rounded-3xl bg-white/10 p-5">
                  <p className="text-sm font-black text-[#F4B183]">
                    For parents, teachers and psychology learners
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Online, offline and hybrid formats may be available based on
                    program type.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaser Cards */}
      <section className="px-4 pb-16 sm:px-5 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {teaserCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-xl font-black text-[#102A43]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 md:rounded-[3rem] md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F7FBFC] px-4 py-2 text-xs font-black text-[#0F3D5E]">
                <HeartHandshake size={16} className="text-[#2CB1A6]" />
                Stay updated
              </div>

              <h2 className="text-3xl font-black leading-tight text-[#102A43] sm:text-4xl">
                Want to be notified when registrations open?
              </h2>

              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                Send your interest through WhatsApp or email. You can mention
                whether you are a parent, teacher, student or professional.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/917999215093?text=Hello%2C%20I%20want%20to%20join%20the%20waitlist%20for%20workshops%20and%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-1"
              >
                <MessageCircle size={18} />
                Join via WhatsApp
              </a>

              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-[#F7FBFC] px-7 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
              >
                <CalendarCheck size={18} />
                Contact Clinic
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
