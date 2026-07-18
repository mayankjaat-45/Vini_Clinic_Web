import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Baby,
  Brain,
  Eye,
  HelpCircle,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";

const concerns = [
  {
    icon: Volume2,
    title: "Speech Delay",
    description:
      "Your child speaks fewer words than expected or finds it difficult to express needs clearly.",
    href: "/services/early-intervention-indore",
    number: "01",
  },
  {
    icon: Zap,
    title: "Attention & Hyperactivity",
    description:
      "Your child appears constantly restless, impulsive or unable to focus on everyday activities.",
    href: "/services/adhd-assessment-therapy-indore",
    number: "02",
  },
  {
    icon: Brain,
    title: "Learning Difficulties",
    description:
      "Reading, writing, spelling, memory or schoolwork feels unusually difficult for your child.",
    href: "/services/dyslexia-specialist-indore",
    number: "03",
  },
  {
    icon: Eye,
    title: "Autism Signs",
    description:
      "You notice limited eye contact, repetitive behaviour or difficulty with social interaction.",
    href: "/services/autism-therapy-indore",
    number: "04",
  },
  {
    icon: Activity,
    title: "Behaviour Concerns",
    description:
      "Frequent anger, stubbornness, aggression, meltdowns or difficulty following instructions.",
    href: "/services/child-counselling-indore",
    number: "05",
  },
  {
    icon: Baby,
    title: "Developmental Delays",
    description:
      "Speech, play, movement, learning or social milestones are developing slower than expected.",
    href: "/services/early-intervention-indore",
    number: "06",
  },
];

export default function ConcernsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-32 h-72 w-72 rounded-full bg-[#2CB1A6]/8 blur-3xl" />
        <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-[#F4B183]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-bold text-[#168F87] sm:text-sm">
            <Sparkles size={16} />
            Start with what you are noticing
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-[#102A43] sm:text-4xl lg:text-5xl">
            Is your child facing any of these{" "}
            <span className="text-[#168F87]">concerns?</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Every child develops differently, but ongoing difficulties may
            indicate that professional guidance could help you understand their
            needs more clearly.
          </p>
        </div>

        {/* Concern cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {concerns.map((concern) => {
            const Icon = concern.icon;

            return (
              <Link
                key={`${concern.title}-${concern.number}`}
                href={concern.href}
                className="group relative overflow-hidden rounded-4xl border border-[#0F3D5E]/10 bg-[#F7FBFC] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#2CB1A6]/35 hover:bg-white hover:shadow-[0_24px_60px_rgba(15,61,94,0.12)] sm:p-7"
              >
                {/* Card background number */}
                <span className="absolute right-5 top-4 text-5xl font-black text-[#0F3D5E]/5 transition group-hover:text-[#2CB1A6]/10">
                  {concern.number}
                </span>

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-white text-[#168F87] shadow-sm ring-1 ring-[#0F3D5E]/5 transition duration-300 group-hover:scale-105 group-hover:bg-[#E9F8F6]">
                    <Icon size={25} strokeWidth={2} />
                  </div>

                  <h3 className="mt-6 text-xl font-black text-[#102A43]">
                    {concern.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {concern.description}
                  </p>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]">
                    Understand this concern
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#2CB1A6] transition-all duration-500 group-hover:w-full" />
              </Link>
            );
          })}
        </div>

        {/* Unsure CTA */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-4xl border border-[#2CB1A6]/15 bg-[#E9F8F6]/65 p-6 text-center sm:p-8 md:flex-row md:text-left">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-white text-[#168F87] shadow-sm">
              <HelpCircle size={24} />
            </div>

            <div>
              <h3 className="text-lg font-black text-[#102A43]">
                Not sure which concern matches?
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Share what you are observing and our team will help you choose
                the right first step.
              </p>
            </div>
          </div>

          <Link
            href="/contact-us"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0F3D5E]/15 transition duration-300 hover:-translate-y-1 hover:bg-[#102A43]"
          >
            Get Guidance
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
