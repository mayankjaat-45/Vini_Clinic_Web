import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "RCI Registered",
    description: "Clinical & Child Psychologist",
  },
  {
    icon: Award,
    title: "Trusted since 2013",
    description: "Over a decade of experience",
  },
  {
    icon: Users,
    title: "5,000+ Families",
    description: "Supported with care",
  },
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F7FBFC]">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#2CB1A6]/12 blur-3xl" />

        <div className="absolute -right-40 top-20 h-128 w-lg rounded-full bg-[#0F3D5E]/8 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#F4B183]/12 blur-3xl" />

        <svg
          className="absolute bottom-0 left-0 h-32 w-full text-white/70"
          viewBox="0 0 1440 180"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 125C194 181 394 181 598 126C824 65 1019 59 1210 103C1302 124 1377 132 1440 126V180H0V125Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          {/* Left content */}
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2CB1A6]/20 bg-white/90 px-4 py-2 text-xs font-bold text-[#167F78] shadow-sm backdrop-blur sm:text-sm">
              <HeartHandshake size={17} />
              Child Psychology, Assessment & Parent Guidance
            </div>

            <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-[-0.04em] text-[#102A43] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              Helping children feel{" "}
              <span className="relative inline-block text-[#168F87]">
                understood
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-3 w-full text-[#F4B183]/70"
                  viewBox="0 0 220 16"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 12C55 4 154 3 217 8"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              , supported and confident.
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-base font-semibold leading-8 text-[#38566D] sm:text-lg lg:mx-0">
              Evidence-based psychological assessment, counselling and
              developmental support for children, adolescents and families.
            </p>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base lg:mx-0">
              When behaviour, emotions, attention, learning, speech or
              development become a concern, Dr. Vini helps you understand what
              your child needs and what to do next.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/contact-us"
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-[#0F3D5E]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#102A43]"
              >
                <CalendarCheck size={19} />
                Book a Consultation
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="https://wa.me/917999215093"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Talk to the clinic on WhatsApp"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-7 py-4 text-sm font-bold text-[#0F3D5E] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2CB1A6]/50 hover:bg-[#E9F8F6]"
              >
                <MessageCircle size={19} />
                Talk on WhatsApp
              </a>
            </div>

            {/* Compact assurance points */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-600 lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="shrink-0 text-[#2CB1A6]" />
                Online and offline support
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="shrink-0 text-[#2CB1A6]" />
                Individualised care plans
              </span>
            </div>
          </div>

          {/* Right image */}
          <div className="relative mx-auto w-full max-w-140">
            {/* Organic background shape */}
            <div className="absolute -inset-x-3 bottom-3 top-14 -z-10 rounded-[4rem_2rem_4rem_2rem] bg-[#DDF4F2] sm:-inset-x-7 sm:top-16" />

            <div className="relative ml-auto w-[92%] sm:w-[88%]">
              <div className="relative overflow-hidden rounded-[2.25rem_2.25rem_6rem_2.25rem] border-8 border-white bg-white shadow-[0_30px_80px_rgba(15,61,94,0.18)] sm:rounded-[3rem_3rem_7rem_3rem]">
                <div className="relative aspect-4/5">
                  <Image
                    src="/images/vini-pic.jpeg"
                    alt="Dr. Vini Jhariya, Clinical and Child Psychologist in Indore"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 520px"
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#071F33]/70 via-[#071F33]/20 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 text-left text-white sm:bottom-8 sm:left-8 sm:right-8">
                    <p className="text-lg font-black sm:text-xl">
                      Dr. Vini Jhariya
                    </p>
                    <p className="mt-1 text-xs font-semibold text-white/80 sm:text-sm">
                      Clinical & Child Psychologist
                    </p>
                  </div>
                </div>
              </div>

              {/* RCI card */}
              <div className="absolute -left-6 top-10 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur sm:-left-16 sm:top-16 sm:rounded-3xl sm:p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87] sm:h-11 sm:w-11">
                    <ShieldCheck size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-black text-[#102A43] sm:text-sm">
                      RCI Registered
                    </p>
                    <p className="mt-0.5 hidden text-xs font-semibold text-slate-500 sm:block">
                      Professional care
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating card */}
              <div className="absolute -right-3 bottom-28 rounded-2xl bg-[#0F3D5E] px-4 py-3 text-white shadow-2xl sm:-right-10 sm:bottom-32 sm:rounded-3xl sm:px-5 sm:py-4">
                <div className="flex items-center gap-1 text-[#F4B183]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} className="fill-[#F4B183]" />
                  ))}
                </div>

                <div className="mt-2 flex items-end gap-2">
                  <p className="text-xl font-black sm:text-2xl">4.9</p>
                  <p className="pb-1 text-[10px] font-semibold text-white/70 sm:text-xs">
                    Google rating
                  </p>
                </div>
              </div>

              {/* Quote card */}
              <div className="relative z-10 -mt-12 mr-auto w-[92%] rounded-[1.75rem] border border-[#2CB1A6]/15 bg-white p-5 shadow-[0_20px_50px_rgba(15,61,94,0.14)] sm:-ml-8 sm:w-[88%] sm:p-6">
                <p className="text-sm font-black leading-6 text-[#0F3D5E] sm:text-base sm:leading-7">
                  “Every child deserves to be understood before being
                  corrected.”
                </p>

                <p className="mt-2 text-xs font-bold text-[#168F87]">
                  — Dr. Vini Jhariya
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="relative z-10 mt-14 grid overflow-hidden rounded-4xl border border-[#0F3D5E]/10 bg-white shadow-[0_20px_60px_rgba(15,61,94,0.08)] sm:grid-cols-3 lg:mt-16">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center justify-center gap-4 px-5 py-5 text-left sm:justify-start sm:px-6 ${
                  index !== trustItems.length - 1
                    ? "border-b border-[#0F3D5E]/10 sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87]">
                  <Icon size={22} />
                </div>

                <div>
                  <p className="text-sm font-black text-[#102A43]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
