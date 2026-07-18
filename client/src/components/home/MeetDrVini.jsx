import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpenCheck,
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const credentials = [
  {
    icon: ShieldCheck,
    title: "RCI Registered",
    description: "Clinical and child psychology support",
  },
  {
    icon: Award,
    title: "Trusted Since 2013",
    description: "More than a decade of professional experience",
  },
  {
    icon: Users,
    title: "5,000+ Families",
    description: "Children, adolescents and parents supported",
  },
  {
    icon: BookOpenCheck,
    title: "Assessment-Led Care",
    description: "Clear understanding before intervention",
  },
];

const approachPoints = [
  "Understand the concern before suggesting therapy",
  "Consider the child’s emotional and developmental needs",
  "Involve parents throughout the support process",
  "Provide practical strategies for home and school",
];

export default function MeetDrVini() {
  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#F4B183]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Image area */}
          <div className="relative mx-auto w-full max-w-130">
            <div className="absolute -left-5 top-14 h-[85%] w-[90%] rounded-[3rem] bg-[#DDF4F2] sm:-left-8" />

            <div className="relative ml-auto w-[92%]">
              <div className="relative overflow-hidden rounded-[2.5rem_2.5rem_6rem_2.5rem] border-8 border-white bg-white shadow-[0_30px_80px_rgba(15,61,94,0.16)]">
                <div className="relative aspect-4/5">
                  <Image
                    src="/images/vini-pic.jpeg"
                    alt="Dr. Vini Jhariya, Clinical and Child Psychologist"
                    fill
                    sizes="(max-width: 1024px) 90vw, 500px"
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#071F33]/75 via-[#071F33]/20 to-transparent" />

                  <div className="absolute bottom-7 left-7 right-7 text-white">
                    <p className="text-xl font-black sm:text-2xl">
                      Dr. Vini Jhariya
                    </p>

                    <p className="mt-1 text-sm font-semibold text-white/80">
                      Clinical & Child Psychologist
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating registration card */}
              <div className="absolute -left-6 top-10 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur sm:-left-14 sm:top-16 sm:rounded-3xl sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87]">
                    <BadgeCheck size={22} />
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#102A43]">
                      RCI Registered
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-slate-500">
                      Professional care
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote card */}
              <div className="relative z-10 -mt-12 mr-auto w-[94%] rounded-[1.75rem] border border-[#2CB1A6]/15 bg-white p-5 shadow-[0_20px_50px_rgba(15,61,94,0.14)] sm:-ml-6 sm:w-[90%] sm:p-6">
                <Quote size={23} className="text-[#2CB1A6]" />

                <p className="mt-3 text-sm font-black leading-7 text-[#0F3D5E] sm:text-base">
                  Every child deserves to be understood before being corrected.
                </p>

                <p className="mt-2 text-xs font-bold text-[#168F87]">
                  — Dr. Vini Jhariya
                </p>
              </div>
            </div>
          </div>

          {/* Content area */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2CB1A6]/15 bg-white px-4 py-2 text-xs font-bold text-[#168F87] shadow-sm sm:text-sm">
              <Sparkles size={16} />
              Meet Dr. Vini
            </div>

            <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.03em] text-[#102A43] sm:text-4xl lg:text-5xl">
              Helping families understand the child behind the{" "}
              <span className="text-[#168F87]">concern.</span>
            </h2>

            <p className="mt-6 text-base font-semibold leading-8 text-[#38566D]">
              Dr. Vini Jhariya works with children, adolescents and parents
              facing emotional, behavioural, learning and developmental
              concerns.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Her approach focuses on understanding why a difficulty is
              happening before recommending assessment, counselling, therapy or
              parent guidance. Every support plan is designed around the child’s
              individual needs rather than using the same approach for every
              family.
            </p>

            {/* Approach points */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {approachPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-[#0F3D5E]/8 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0 text-[#2CB1A6]"
                  />

                  <p className="text-sm font-bold leading-6 text-slate-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about-dr-vini"
                className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-[#0F3D5E]/15 transition duration-300 hover:-translate-y-1 hover:bg-[#102A43]"
              >
                Know More About Dr. Vini
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contact-us"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-7 py-3.5 text-sm font-black text-[#0F3D5E] transition duration-300 hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
              >
                <CalendarCheck size={17} />
                Book Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Credential strip */}
        <div className="mt-14 grid overflow-hidden rounded-4xl border border-[#0F3D5E]/10 bg-white shadow-[0_20px_60px_rgba(15,61,94,0.07)] sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-start gap-4 p-5 sm:p-6 ${
                  index !== credentials.length - 1
                    ? "border-b border-[#0F3D5E]/10 sm:border-r lg:border-b-0"
                    : ""
                } ${index === 1 ? "sm:border-r-0 lg:border-r" : ""} ${
                  index === 2 ? "sm:border-b-0" : ""
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87]">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="text-sm font-black text-[#102A43]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Philosophy statement */}
        <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-4xl bg-[#0F3D5E] p-6 text-center text-white sm:p-8 lg:flex-row lg:text-left">
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#7DE0D6]">
              <HeartHandshake size={25} />
            </div>

            <div>
              <h3 className="text-xl font-black">
                Support should bring clarity, not more confusion.
              </h3>

              <p className="mt-2 max-w-3xl text-sm font-semibold leading-7 text-white/70">
                Parents receive an understandable explanation of the concern,
                practical next steps and guidance they can use beyond the
                consultation room.
              </p>
            </div>
          </div>

          <Link
            href="/contact-us"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
          >
            Start a Conversation
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
