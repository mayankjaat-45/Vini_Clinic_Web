import Image from "next/image";
import React from "react";
import { ArrowRight, CalendarCheck, HeartHandshake, Star } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7FBFC]">
      {/* Background Effects */}
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
      <div className="absolute -right-24 top-32 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F4B183]/20 blur-3xl" />

      <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-12 sm:px-6 md:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#2CB1A6]/20 bg-white px-4 py-2 text-xs font-bold text-[#2CB1A6] shadow-sm sm:text-sm">
            <HeartHandshake size={16} />
            Clinical & Child Psychologist in Indore
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-[#102A43] sm:text-5xl md:text-6xl lg:mx-0 lg:text-7xl">
            Every child is trying to tell you something.{" "}
            <span className="bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
              Let us help you understand what.
            </span>
          </h1>

          <h2 className="mx-auto mt-5 max-w-2xl text-lg font-bold leading-8 text-[#0F3D5E] sm:text-xl lg:mx-0">
            Every child labelled &apos;difficult&apos; is simply waiting to be
            truly understood.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0">
            Dr. Vini Jhariya is a Clinical and Child Psychologist based in
            Indore. When a child comes to us — whether for behaviour, learning,
            emotions, or development — we do not start with assumptions. We
            listen carefully, we assess clinically, and we find the real reason
            behind what you are seeing.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-950/20 transition hover:-translate-y-1 hover:bg-[#102A43]"
            >
              <CalendarCheck size={18} />
              Book Consultation
              <ArrowRight size={17} />
            </a>

            <a
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/20 bg-white px-7 py-4 text-sm font-bold text-[#0F3D5E] shadow-sm transition hover:-translate-y-1 hover:border-[#2CB1A6] hover:bg-[#E9F8F6]"
            >
              Explore Services
            </a>
          </div>

          <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm lg:mx-0 lg:justify-start">
            <span className="flex items-center gap-1 text-[#0F3D5E]">
              <Star size={15} className="fill-[#F4B183] text-[#F4B183]" />
              4.9 stars
            </span>
            <span className="hidden text-slate-300 sm:inline">|</span>
            <span>237 Google reviews</span>
            <span className="hidden text-slate-300 sm:inline">|</span>
            <span>Trusted since 2013</span>
          </div>

          {/* Small Trust Cards */}
          {/* <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4 lg:mx-0">
            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <h3 className="text-lg font-black text-[#0F3D5E] sm:text-2xl">
                2013
              </h3>
              <p className="mt-1 text-[11px] font-semibold text-slate-500 sm:text-xs">
                Trusted since
              </p>
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <h3 className="text-lg font-black text-[#0F3D5E] sm:text-2xl">
                5000+
              </h3>
              <p className="mt-1 text-[11px] font-semibold text-slate-500 sm:text-xs">
                Children supported
              </p>
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-sm">
              <h3 className="flex items-center justify-center gap-1 text-lg font-black text-[#0F3D5E] sm:justify-start sm:text-2xl">
                4.9
                <Star size={17} className="fill-[#F4B183] text-[#F4B183]" />
              </h3>
              <p className="mt-1 text-[11px] font-semibold text-slate-500 sm:text-xs">
                Google rating
              </p>
            </div>
          </div> */}
        </div>

        {/* Right Photo */}
        <div className="relative mx-auto w-full max-w-105 lg:max-w-125">
          <div className="absolute -right-5 top-12 z-10 hidden rounded-3xl bg-white p-5 shadow-2xl shadow-slate-900/10 sm:block">
            <p className="text-sm font-black text-[#102A43]">
              Listen • Assess • Plan
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              No labels. Just clarity.
            </p>
          </div>

          <div className="absolute -right-4 bottom-14 z-10 hidden rounded-3xl bg-[#0F3D5E] p-5 text-white shadow-2xl shadow-blue-950/20 sm:block">
            <p className="text-2xl font-black">4.9★</p>
            <p className="mt-1 text-xs text-white/70">237 Google reviews</p>
          </div>

          <div className="relative overflow-hidden rounded-[2.2rem] border-8 border-white bg-white shadow-2xl shadow-slate-900/15 sm:rounded-[3rem] sm:border-10">
            <div className="relative aspect-4/5 w-full">
              <Image
                src="/images/vini-pic.jpeg"
                alt="Dr. Vini Jhariya, Clinical and Child Psychologist in Indore"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 500px"
                className="object-cover object-center"
              />
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-white/90 p-4 backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-5">
              <p className="text-sm font-black leading-6 text-[#0F3D5E] sm:text-base">
                “Every child deserves to be understood before being corrected.”
              </p>
              <p className="mt-2 text-xs font-semibold text-slate-500">
                — Dr. Vini Jhariya
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
