import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  CalendarCheck,
  GraduationCap,
  HeartHandshake,
  Quote,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const featuredStories = [
  {
    id: 1,
    icon: GraduationCap,
    category: "Learning & School",
    title: "He was not slow. He needed a different approach.",
    concern:
      "Aryan was taking longer to understand lessons, and teachers had started describing him as a slow learner.",
    support:
      "A detailed cognitive assessment showed that he was a visual learner studying in an auditory-heavy classroom.",
    progress:
      "A customised learning plan and parent guidance helped him improve within one school term.",
    quote:
      "The word slow should never have been used for our son. He just needed a different approach.",
  },
  {
    id: 2,
    icon: Brain,
    category: "Behaviour & Emotions",
    title: "Understanding the emotion behind angry outbursts.",
    concern:
      "Small situations caused intense screaming, crying and meltdowns that were difficult for the family to manage.",
    support:
      "Assessment showed emotional sensitivity and underdeveloped regulation skills beneath the anger.",
    progress:
      "Play-based therapy and regulation tools reduced the frequency and intensity of the meltdowns.",
    quote:
      "She told me she felt angry but decided not to shout. That was a very big moment for us.",
  },
  {
    id: 3,
    icon: ShieldCheck,
    category: "Developmental Support",
    title: "Early intervention gave the family a clear direction.",
    concern:
      "At two years old, Aisha had no words, limited eye contact and reduced engagement with people.",
    support:
      "An early developmental assessment identified the areas that required structured, play-based support.",
    progress:
      "She gradually developed words, sentences and the skills needed to begin school alongside her peers.",
    quote:
      "People told us we were overreacting. Dr. Vini told us we were right to seek help.",
  },
];

const journeyItems = [
  {
    icon: HeartHandshake,
    title: "Parents share",
    description: "The family explains what they have been noticing.",
  },
  {
    icon: Brain,
    title: "We understand",
    description: "Assessment or counselling identifies the underlying need.",
  },
  {
    icon: BadgeCheck,
    title: "A plan is created",
    description: "Parents receive practical support and clear next steps.",
  },
  {
    icon: TrendingUp,
    title: "Progress is reviewed",
    description: "Small improvements are supported and monitored over time.",
  },
];

export default function SuccessStoriesPreview() {
  return (
    <section className="relative overflow-hidden bg-[#F7FBFC] py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#2CB1A6]/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#F4B183]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2CB1A6]/15 bg-white px-4 py-2 text-xs font-bold text-[#168F87] shadow-sm sm:text-sm">
            <Sparkles size={16} />
            Parent experiences
          </div>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-[#102A43] sm:text-4xl lg:text-5xl">
            Real stories of understanding, support and{" "}
            <span className="text-[#168F87]">progress.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            Every family arrives with different questions. These stories show
            how assessment, counselling and parent guidance can provide a
            clearer direction.
          </p>
        </div>

        {/* Journey strip */}
        <div className="mt-12 overflow-hidden rounded-4xl bg-[#0F3D5E] p-5 text-white shadow-xl shadow-[#0F3D5E]/15 sm:p-7">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {journeyItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative rounded-3xl border border-white/10 bg-white/8 p-4 text-center backdrop-blur"
                >
                  {index !== journeyItems.length - 1 && (
                    <ArrowRight
                      size={17}
                      className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-white/40 lg:block"
                    />
                  )}

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0F3D5E]">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-3 text-sm font-black">{item.title}</h3>

                  <p className="mt-1 text-xs font-semibold leading-5 text-white/65">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured stories */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featuredStories.map((story) => {
            const Icon = story.icon;

            return (
              <article
                key={story.id}
                className="group flex h-full flex-col overflow-hidden rounded-4xl border border-[#0F3D5E]/10 bg-white shadow-[0_18px_50px_rgba(15,61,94,0.07)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(15,61,94,0.13)]"
              >
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#168F87]">
                      <Icon size={23} />
                    </div>

                    <span className="rounded-full bg-[#F7FBFC] px-3 py-1.5 text-xs font-black text-[#0F3D5E]">
                      Story {String(story.id).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#168F87]">
                    {story.category}
                  </p>

                  <h3 className="mt-3 text-xl font-black leading-snug text-[#102A43] sm:text-2xl">
                    {story.title}
                  </h3>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-[#FFF8EC] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#B56B00]">
                        What parents noticed
                      </p>

                      <p className="mt-2 text-sm font-semibold leading-6 text-[#725020]">
                        {story.concern}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#F7FBFC] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#168F87]">
                        How support began
                      </p>

                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                        {story.support}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#E9F8F6] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0F766E]">
                        Progress
                      </p>

                      <p className="mt-2 text-sm font-semibold leading-6 text-[#236B67]">
                        {story.progress}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-slate-100 bg-[#0F3D5E] p-6 text-white">
                  <Quote size={22} className="text-[#7DE0D6]" />

                  <p className="mt-3 text-sm font-bold leading-6 text-white/90">
                    “{story.quote}”
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom action */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-4xl border border-[#2CB1A6]/15 bg-white p-6 text-center shadow-sm sm:p-8 lg:flex-row lg:text-left">
          <div>
            <h3 className="text-xl font-black text-[#102A43] sm:text-2xl">
              Explore more parent experiences
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
              Read stories covering learning, behaviour, emotional wellbeing,
              autism, ADHD, developmental concerns and adolescent support.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/success-stories"
              className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-[#0F3D5E]/15 bg-white px-6 py-3.5 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E9F8F6]"
            >
              View All Stories
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/contact-us"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#0F3D5E]/15 transition hover:-translate-y-1 hover:bg-[#102A43]"
            >
              <CalendarCheck size={17} />
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
