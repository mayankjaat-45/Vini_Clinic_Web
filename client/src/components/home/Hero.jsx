import Image from "next/image";
import React from "react";
import {
  ArrowRight,
  Award,
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const trustItems = [
  {
    icon: Star,
    text: "4.9★ Google Rating",
  },
  {
    icon: Users,
    text: "5,000+ Children & Families",
  },
  {
    icon: Award,
    text: "Trusted since 2013",
  },
];

const concernItems = [
  "My child is not listening",
  "My child is very hyperactive",
  "My child avoids studies",
  "My child has speech delay",
  "My teenager feels low",
  "I need parenting guidance",
];

const supportItems = [
  "Autism, ADHD & dyslexia support",
  "Child & adolescent counselling",
  "Psychological assessments",
  "Parent guidance & therapy planning",
];

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7FBFC]">
      {/* Background Effects */}
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
      <div className="absolute -right-24 top-32 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F4B183]/20 blur-3xl" />

      <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-6 sm:pt-22 md:py-13 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-24">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#2CB1A6]/20 bg-white px-4 py-2 text-xs font-bold text-[#2CB1A6] shadow-sm sm:text-sm">
            <HeartHandshake size={16} />
            Child Psychology, Therapy & Parent Guidance
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-[#102A43] sm:text-5xl md:text-6xl lg:mx-0 lg:text-7xl">
            Helping children feel{" "}
            <span className="bg-linear-to-r from-[#0F3D5E] to-[#2CB1A6] bg-clip-text text-transparent">
              understood
            </span>
            , not judged.
          </h1>

          <h2 className="mx-auto mt-5 max-w-2xl text-base font-bold leading-7 text-[#0F3D5E] sm:text-xl sm:leading-8 lg:mx-0">
            When your child is struggling with behaviour, emotions, learning,
            attention, speech, or confidence, you do not have to figure it out
            alone.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:mx-0">
            At Urjasvini Child Development Centre, Dr. Vini Jhariya helps
            parents understand the reason behind their child’s challenges
            through counselling, assessment, therapy planning, and practical
            parent guidance in Indore and online.
          </p>

          {/* Parent Concern Creative Block */}
          <div className="mx-auto mt-7 max-w-2xl rounded-4xl border border-white bg-white/80 p-4 shadow-xl shadow-slate-900/5 backdrop-blur lg:mx-0">
            <div className="mb-3 flex items-center justify-center gap-2 lg:justify-start">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9F8F6] text-[#2CB1A6]">
                <Sparkles size={16} />
              </span>
              <p className="text-sm font-black text-[#102A43]">
                Many parents come to us saying...
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {concernItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#0F3D5E]/10 bg-[#F7FBFC] px-3 py-2 text-xs font-bold text-slate-600"
                >
                  “{item}”
                </span>
              ))}
            </div>
          </div>

          {/* Trust Line */}
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3 lg:mx-0 lg:justify-start">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0F3D5E]/10 bg-white px-4 py-2 text-xs font-bold text-[#0F3D5E] shadow-sm sm:text-sm"
                >
                  <Icon
                    size={16}
                    className={
                      item.text.includes("4.9")
                        ? "fill-[#F4B183] text-[#F4B183]"
                        : "text-[#2CB1A6]"
                    }
                  />
                  {item.text}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-bold text-white shadow-xl shadow-blue-950/20 transition hover:-translate-y-1 hover:bg-[#102A43]"
            >
              <CalendarCheck size={18} />
              Book Consultation
              <ArrowRight size={17} />
            </a>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/20 bg-white px-7 py-4 text-sm font-bold text-[#0F3D5E] shadow-sm transition hover:-translate-y-1 hover:border-[#2CB1A6] hover:bg-[#E9F8F6]"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>

          {/* Support Points */}
          <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2 lg:mx-0">
            {supportItems.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-2 rounded-2xl border border-[#0F3D5E]/10 bg-white/85 px-4 py-3 text-sm font-bold text-slate-600 shadow-sm backdrop-blur lg:justify-start"
              >
                <CheckCircle2 size={17} className="shrink-0 text-[#2CB1A6]" />
                {item}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-6 flex max-w-2xl items-start justify-center gap-2 text-sm font-semibold leading-6 text-slate-500 lg:mx-0 lg:justify-start">
            <MapPin size={17} className="mt-0.5 shrink-0 text-[#F4B183]" />
            <span>
              100-A, Baikunth Dham Colony, Old Palasia, Saket, Indore, Madhya
              Pradesh — 452018
            </span>
          </div>
        </div>

        {/* Right Photo */}
        <div className="relative mx-auto w-full max-w-107.5 sm:max-w-120 lg:max-w-130">
          <div className="absolute -left-3 top-8 z-10 hidden rounded-3xl bg-white p-4 shadow-2xl shadow-slate-900/10 sm:block lg:-left-8">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#2CB1A6]">
                <ShieldCheck size={21} />
              </div>
              <div>
                <p className="text-sm font-black text-[#102A43]">
                  RCI Registered
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Clinical & Child Psychologist
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 bottom-24 z-10 hidden rounded-3xl bg-[#0F3D5E] p-5 text-white shadow-2xl shadow-blue-950/20 sm:block lg:-right-8">
            <div className="flex items-center gap-1 text-[#F4B183]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={15} className="fill-[#F4B183]" />
              ))}
            </div>
            <p className="mt-3 text-2xl font-black">4.9★</p>
            <p className="mt-1 text-xs text-white/70">Google rating</p>
          </div>

          <div className="relative rounded-[2.5rem] bg-white p-3 shadow-2xl shadow-slate-900/15 sm:rounded-[3rem] sm:p-4">
            <div className="relative overflow-hidden rounded-4xl sm:rounded-[2.5rem]">
              <div className="relative aspect-4/5 w-full">
                <Image
                  src="/images/vini-pic.jpeg"
                  alt="Dr. Vini Jhariya, Clinical and Child Psychologist in Indore"
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 520px"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="absolute inset-x-6 bottom-6 rounded-[1.75rem] bg-white/92 p-4 shadow-lg backdrop-blur-xl sm:inset-x-8 sm:bottom-8 sm:p-5">
              <p className="text-sm font-black leading-6 text-[#0F3D5E] sm:text-base">
                “Every child deserves to be understood before being corrected.”
              </p>
              <p className="mt-2 text-xs font-semibold text-slate-500">
                — Dr. Vini Jhariya
              </p>
            </div>
          </div>

          {/* Creative Bottom Note */}
          <div className="mx-auto mt-5 max-w-[92%] rounded-4xl border border-[#2CB1A6]/15 bg-white px-5 py-4 text-center shadow-sm">
            <p className="text-sm font-black text-[#102A43]">
              Not sure which service your child needs?
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
              Share what you are noticing. We will guide you toward the right
              next step.
            </p>
          </div>

          {/* Mobile cards */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
            <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
              <p className="text-xl font-black text-[#0F3D5E]">2013</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Trusted since
              </p>
            </div>

            <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
              <p className="text-xl font-black text-[#0F3D5E]">5000+</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Families supported
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
