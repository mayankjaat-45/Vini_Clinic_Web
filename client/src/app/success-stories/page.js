import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  CalendarCheck,
  ChevronDown,
  CircleAlert,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

export const metadata = {
  title: "Success Stories | Dr. Vini Jhariya",
  description:
    "Read parent experiences and success stories from Urjasvini Child Development Centre, Indore.",
  alternates: {
    canonical: "https://thechildpsychologist.in/success-stories",
  },
};

const categories = [
  {
    id: "learning-school",
    label: "Learning & School",
    icon: GraduationCap,
    desc: "Reading, writing, attention, SLD, IQ and classroom concerns.",
  },
  {
    id: "behaviour-emotions",
    label: "Behaviour & Emotions",
    icon: Brain,
    desc: "Anger, anxiety, fears, confidence, grief and self-control.",
  },
  {
    id: "social-peer",
    label: "Social & Peer",
    icon: Users,
    desc: "Friendships, social anxiety, peer pressure and sibling concerns.",
  },
  {
    id: "developmental-clinical",
    label: "Developmental & Clinical",
    icon: ShieldCheck,
    desc: "ADHD, ASD, developmental delay and early intervention stories.",
  },
  {
    id: "adolescent-teen",
    label: "Adolescent & Teen",
    icon: Sparkles,
    desc: "Career confusion, board pressure, teen mood and self-esteem.",
  },
  {
    id: "family-situations",
    label: "Family Situations",
    icon: HeartHandshake,
    desc: "Working parent concerns and family connection support.",
  },
];

const stories = [
  {
    id: 1,
    category: "learning-school",
    title: "Slow Learner",
    language: "English",
    concern: "Child taking too long to understand",
    intro:
      "Every teacher said Aryan was slow, and over time his parents began believing the same label.",
    help: "A detailed cognitive assessment showed that Aryan was not slow. He was a visual learner in an auditory-heavy classroom system.",
    result:
      "With a customised learning plan and parent training, Aryan started catching up within one term and is now in the top half of his class.",
    quote:
      "The word slow should never have been used for our son. He just needed a different approach — and Dr. Vini found it.",
  },
  {
    id: 2,
    category: "learning-school",
    title: "Writing Difficulty",
    language: "English",
    concern: "Child avoids writing",
    intro:
      "Priya avoided pencils, complained of hand pain, tore notebooks and had meltdowns before homework.",
    help: "Assessment identified genuine writing difficulties, not drama or laziness.",
    result:
      "With targeted intervention, occupational therapy guidance and school modifications, writing became less stressful.",
    quote:
      "She used to cry every night before homework. Now she sits down and does it. That alone has changed our entire home.",
  },
  {
    id: 3,
    category: "learning-school",
    title: "Reading Difficulty",
    language: "English",
    concern: "Child reads slowly and skips words",
    intro:
      "Naina loved stories but could not read independently. She skipped words, mixed letters and gave up quickly.",
    help: "A reading and learning assessment revealed a specific reading difficulty that had been present for years.",
    result:
      "Structured literacy intervention helped her make measurable progress within six weeks.",
    quote:
      "She asked me to buy her a book last month. I cried in the bookshop. You have no idea what that meant to us.",
  },
  {
    id: 4,
    category: "learning-school",
    title: "Cannot Concentrate",
    language: "English",
    concern: "Poor concentration while studying",
    intro:
      "Rohan’s study time was exhausting. Two hours of effort covered what should have taken twenty minutes.",
    help: "Assessment showed attention challenges along with performance anxiety.",
    result:
      "Behavioural strategies, parent coaching and school guidance reduced study time to focused forty-minute sessions.",
    quote:
      "We used to dread sitting down to study with him. Now he actually comes and asks us to help him.",
  },
  {
    id: 5,
    category: "learning-school",
    title: "SLD Assessment",
    language: "English",
    concern: "Specific learning disability assessment",
    intro:
      "Vikram’s parents were told by schools that he needed an SLD certificate, but nobody explained the process clearly.",
    help: "A comprehensive SLD assessment covered reading, writing, mathematics, cognitive processing and attention.",
    result:
      "The report helped the school provide accommodations and gave the family a clear intervention plan.",
    quote:
      "We finally had answers. Not just a label — actual answers, and a plan.",
  },
  {
    id: 6,
    category: "learning-school",
    title: "IQ Assessment",
    language: "English",
    concern: "Gifted child mistaken for behaviour problem",
    intro:
      "Dhruv finished work quickly, asked advanced questions and disrupted class because he was bored.",
    help: "Cognitive assessment showed that his IQ was significantly above his peer group.",
    result:
      "With differentiated learning guidance, his classroom behaviour transformed.",
    quote:
      "Nobody had ever told us our child might be gifted. Dr. Vini saw something completely different.",
  },
  {
    id: 7,
    category: "learning-school",
    title: "Gifted Child Assessment",
    language: "English",
    concern: "Highly sensitive advanced learner",
    intro:
      "Ananya felt everything deeply and struggled with emotional intensity and high internal standards.",
    help: "Assessment showed giftedness with heightened emotional sensitivity.",
    result:
      "Parent guidance and emotional strategies helped the family support her nature instead of fighting it.",
    quote:
      "We stopped trying to calm her down and started learning how to channel her.",
  },
  {
    id: 8,
    category: "learning-school",
    title: "Class Repetition",
    language: "English",
    concern: "Child held back in school",
    intro:
      "Pooja had repeated the same class twice and believed she was not capable.",
    help: "Assessment uncovered a specific learning disability along with significant test anxiety.",
    result:
      "With diagnosis, intervention and school accommodations, she moved to the next class and regained self-belief.",
    quote:
      "She used to say ‘I am dumb’ every day. She does not say that anymore.",
  },
  {
    id: 9,
    category: "behaviour-emotions",
    title: "Arrogant, Does Not Listen",
    language: "Hinglish",
    concern: "Defiant behaviour",
    intro:
      "Sameer refused to follow rules at home and school and responded with ‘Main nahi karunga.’",
    help: "Counselling showed that his defiance was linked to a need for control and emotional self-protection.",
    result:
      "Structured parent training changed communication patterns, and Sameer slowly began listening.",
    quote:
      "Hum use badalna chahte the. Dr. Vini ne humein pehle khud ko badalne ke liye kaha.",
  },
  {
    id: 10,
    category: "behaviour-emotions",
    title: "Very Loud, No Self Control",
    language: "English",
    concern: "Impulse control difficulty",
    intro:
      "Karan was always loud, fast, impulsive and difficult for teachers and family to manage.",
    help: "Assessment showed impulse control difficulties rather than bad parenting or bad character.",
    result:
      "Behavioural therapy and home-school strategies helped him slowly learn to pause.",
    quote:
      "He is still energetic — but now there is a brake in there somewhere.",
  },
  {
    id: 11,
    category: "behaviour-emotions",
    title: "Restless Child",
    language: "English",
    concern: "Cannot sit still",
    intro:
      "Aditya could not sit for meals, stories or classroom activities and was constantly moving.",
    help: "Assessment revealed a sensory component behind his restlessness.",
    result:
      "Sensory-based activities, behavioural strategies and parent training helped channel his energy.",
    quote: "We stopped fighting his energy and started channelling it.",
  },
  {
    id: 12,
    category: "behaviour-emotions",
    title: "Angry Outbursts",
    language: "English",
    concern: "Emotional dysregulation",
    intro:
      "Riya went from calm to screaming within seconds, and small triggers caused intense meltdowns.",
    help: "Assessment showed underdeveloped emotional regulation and deep sensitivity beneath the anger.",
    result:
      "Play-based therapy and regulation tools reduced the frequency, duration and intensity of meltdowns.",
    quote:
      "She came home one day and told me she felt angry but decided not to shout.",
  },
  {
    id: 13,
    category: "behaviour-emotions",
    title: "Fears and Phobias",
    language: "English",
    concern: "Childhood fears",
    intro:
      "Meera refused to sleep alone, use the bathroom alone or stay in any room by herself.",
    help: "Assessment showed anxiety with specific phobias that had grown over years.",
    result:
      "Gradual exposure therapy and anxiety tools helped her sleep in her own room with the lights off.",
    quote:
      "We had accepted this as just ‘how she is.’ Dr. Vini showed us it did not have to be.",
  },
  {
    id: 14,
    category: "behaviour-emotions",
    title: "Low Confidence",
    language: "English",
    concern: "Low self-esteem",
    intro:
      "Rahul avoided trying because he had started believing he was stupid and incapable.",
    help: "Sessions revealed that subtle academic struggles had damaged his confidence over time.",
    result:
      "Counselling, strengths identification and learning-gap support helped him rebuild belief in himself.",
    quote: "Dr. Vini gave our son his confidence back.",
  },
  {
    id: 15,
    category: "behaviour-emotions",
    title: "General Anxiety",
    language: "English",
    concern: "Child worries too much",
    intro:
      "Ananya worried about school, friendships, future events and things that had not happened yet.",
    help: "Assessment confirmed generalised anxiety affecting her sleep, stomach aches and daily routine.",
    result:
      "CBT-based tools helped her separate real worries from imagined ones and manage both.",
    quote: "Mummy, I had a worried thought but I didn’t let it win.",
  },
  {
    id: 16,
    category: "behaviour-emotions",
    title: "Grief",
    language: "English",
    concern: "Child dealing with loss",
    intro:
      "After losing his grandfather, Siddharth stopped laughing, playing and expressing himself.",
    help: "Age-appropriate grief counselling helped him understand loss and express what he was carrying.",
    result:
      "Slowly, his laughter returned and he began remembering his grandfather with love instead of only pain.",
    quote: "He drew a picture of his dadu and smiled while he drew it.",
  },
  {
    id: 17,
    category: "social-peer",
    title: "Child Has No Friends",
    language: "English",
    concern: "Difficulty making friends",
    intro:
      "Nikhil came home lonely every day and said nobody wanted to play with him.",
    help: "Assessment showed social cognition difficulties and trouble understanding unspoken friendship rules.",
    result:
      "Social skills training, role play and guided practice helped him build friendships.",
    quote: "Today at lunch someone sat next to me and we talked.",
  },
  {
    id: 18,
    category: "social-peer",
    title: "Not Social, Stays Alone",
    language: "English",
    concern: "Introversion and mild social anxiety",
    intro:
      "Dia preferred books, art and solitude, while her parents worried something was wrong.",
    help: "Assessment showed healthy introversion with mild social anxiety patterns worth addressing gently.",
    result:
      "Parent guidance helped the family nurture her without forcing her to become someone else.",
    quote: "Dr. Vini helped us understand that she was already enough.",
  },
  {
    id: 19,
    category: "social-peer",
    title: "Social Anxiety",
    language: "Hinglish",
    concern: "Fear of speaking up",
    intro:
      "Kavya knew the answers but froze whenever the teacher asked questions in class.",
    help: "Counselling worked slowly and gently on social anxiety without forcing confidence.",
    result: "She began participating in class, imperfectly but steadily.",
    quote: "Mummy, aaj maine haath uthaya.",
  },
  {
    id: 20,
    category: "social-peer",
    title: "Peer Pressure",
    language: "English",
    concern: "Teen influenced by friends",
    intro:
      "Arjun began lying, hiding his phone and coming home late after joining a new peer group.",
    help: "Counselling focused on his need to belong, insecurity and decision-making.",
    result:
      "He rebuilt self-worth and began making choices based on his values instead of fear of rejection.",
    quote: "He told Dr. Vini things he would never tell us.",
  },
  {
    id: 21,
    category: "social-peer",
    title: "Sibling Rivalry",
    language: "Hinglish",
    concern: "Children fighting at home",
    intro:
      "Rohan and Simran fought constantly, and the home had become exhausting for everyone.",
    help: "Individual sessions showed insecurity, attention needs and unexpressed emotions behind the fights.",
    result:
      "Parent coaching and child sessions brought more peace and manageable sibling interaction.",
    quote: "Pehli baar dono saath baithe aur ek dusre se baat ki bina ladte.",
  },
  {
    id: 22,
    category: "social-peer",
    title: "New Sibling Adjustment",
    language: "English",
    concern: "Behaviour change after new baby",
    intro:
      "Kabir changed completely after his baby sister arrived and began bed-wetting again.",
    help: "Guidance helped parents understand that he was communicating fear of being replaced.",
    result:
      "With secure connection and inclusion, his regression reversed within six weeks.",
    quote: "He kissed her on the head and said, ‘she’s actually cute.’",
  },
  {
    id: 23,
    category: "developmental-clinical",
    title: "ADHD",
    language: "English",
    concern: "Bright but distracted child",
    intro:
      "Vivan had heard for years that he was intelligent but would not apply himself.",
    help: "A comprehensive ADHD assessment explained years of confusion and showed his brain needed different tools.",
    result:
      "With intervention, classroom accommodations and parent training, his performance improved within one term.",
    quote:
      "He had been trying harder than any of us realised — just without the right tools.",
  },
  {
    id: 24,
    category: "developmental-clinical",
    title: "Developmental Delay",
    language: "English",
    concern: "Missing milestones",
    intro:
      "Aarav was 2.5 years old and behind on walking, speaking and pointing milestones.",
    help: "A developmental assessment mapped his exact support needs across communication, motor and social areas.",
    result:
      "Early intervention helped him close many gaps and later start mainstream school with support.",
    quote:
      "Our instinct told us not to wait. Dr. Vini validated that instinct.",
  },
  {
    id: 25,
    category: "developmental-clinical",
    title: "Early Intervention Toddler",
    language: "English",
    concern: "Child not talking at 2",
    intro:
      "Aisha was 2 years old with no words, limited eye contact and reduced engagement.",
    help: "Assessment identified early signs needing immediate structured, play-based intervention.",
    result:
      "By age 3 she had words, by age 4 sentences, and by age 5 she started school with peers.",
    quote:
      "People told us we were overreacting. Dr. Vini told us we were right to come.",
  },
  {
    id: 26,
    category: "developmental-clinical",
    title: "ASD Assessment",
    language: "English",
    concern: "Autism assessment clarity",
    intro:
      "Ishaan’s parents had received confusing opinions across doctors and cities for two years.",
    help: "A comprehensive ASD assessment used standardised tools across communication, behaviour, sensory and cognitive profile.",
    result:
      "The family received a clear documented answer and an intervention plan.",
    quote: "We did not want a label. We wanted answers. Dr. Vini gave us both.",
  },
  {
    id: 27,
    category: "adolescent-teen",
    title: "Career Confusion",
    language: "Hinglish",
    concern: "Class 10 stream selection",
    intro:
      "Aryan was confused between science and commerce while the whole family had different opinions.",
    help: "Psychometric assessment clarified his strengths, interests and learning style.",
    result:
      "He chose his stream confidently and independently without family pressure.",
    quote: "Pehli baar Aryan ne khud decision liya. Woh confident tha.",
  },
  {
    id: 28,
    category: "adolescent-teen",
    title: "Academic Pressure Class 10/12",
    language: "English",
    concern: "Board exam stress",
    intro:
      "Priya studied 12 hours a day and still felt it was not enough, until she stopped studying altogether.",
    help: "Counselling addressed the belief system under the pressure: fear of failure and perfectionism.",
    result:
      "She built a sustainable rhythm, appeared for boards and learned that her worth was not her marks.",
    quote:
      "She used to say, ‘If I don’t get 95%, my life is over.’ She does not say that anymore.",
  },
  {
    id: 29,
    category: "adolescent-teen",
    title: "Teen Mood Swings",
    language: "English",
    concern: "Withdrawn teenager",
    intro:
      "Rohan became withdrawn, irritable and uninterested in things he once loved.",
    help: "Counselling showed he was carrying more than typical teenage moodiness.",
    result:
      "In a non-judgmental space, he opened up and communication with his parents returned.",
    quote: "He told us he felt heard for the first time in a long time.",
  },
  {
    id: 30,
    category: "adolescent-teen",
    title: "Self Esteem in Teenagers",
    language: "English",
    concern: "Comparison and low self-worth",
    intro:
      "Neha compared herself to friends, Instagram and even her sister, always placing herself last.",
    help: "Counselling focused on her relationship with herself and her inner voice.",
    result:
      "Over six months, comparison lost its power and quiet self-acceptance grew.",
    quote: "She looked in the mirror and said, ‘I look nice.’",
  },
  {
    id: 31,
    category: "family-situations",
    title: "Child of Working Parents",
    language: "English",
    concern: "Child feels neglected",
    intro:
      "Aryan’s parents worked long hours and gave him everything except the time he was asking for through behaviour.",
    help: "Parent coaching focused on connection, communication and small routine changes without judgment.",
    result:
      "With quality connection time and sessions for Aryan, behaviour settled and the family reconnected.",
    quote:
      "Dr. Vini told us he needed more of us — even just twenty minutes of real us, every day.",
  },
];

const groupedStories = categories.map((category) => ({
  ...category,
  stories: stories.filter((story) => story.category === category.id),
}));

const stats = [
  { value: "31", label: "Real-life stories" },
  { value: "6", label: "Concern areas" },
  { value: "4.9★", label: "Google rating" },
  { value: "2013", label: "Trusted since" },
];

const storyJourney = [
  {
    icon: CircleAlert,
    title: "Concern",
    text: "Parents notice behaviour, learning, emotion or development difficulty.",
  },
  {
    icon: Search,
    title: "Understanding",
    text: "Assessment or counselling helps identify what is really happening.",
  },
  {
    icon: ClipboardCheck,
    title: "Support Plan",
    text: "A practical direction is created for child, parents and school.",
  },
  {
    icon: TrendingUp,
    title: "Progress",
    text: "Small changes are reviewed step by step with guidance.",
  },
];

function StoryCard({ story }) {
  return (
    <details className="group overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-lg shadow-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0F3D5E]/10">
      <summary className="cursor-pointer list-none p-5 [&::-webkit-details-marker]:hidden sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#E8F7F5] px-3 py-1 text-xs font-black text-[#168C83]">
                Story {story.id}
              </span>

              <span className="rounded-full bg-[#FFF4E1] px-3 py-1 text-xs font-black text-[#B56B00]">
                {story.concern}
              </span>
            </div>

            <h3 className="text-xl font-black leading-tight text-[#102A43] sm:text-2xl">
              {story.title}
            </h3>

            <div className="mt-5 grid gap-3">
              <div className="rounded-3xl bg-[#FFF8EC] p-4">
                <div className="mb-2 flex items-center gap-2">
                  <CircleAlert size={16} className="text-[#B56B00]" />
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#B56B00]">
                    Concern
                  </p>
                </div>

                <p className="line-clamp-2 text-sm font-semibold leading-6 text-[#7A4A13]">
                  {story.intro}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-[#F7FBFC] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Lightbulb size={16} className="text-[#2CB1A6]" />
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2CB1A6]">
                      Helped
                    </p>
                  </div>

                  <p className="line-clamp-2 text-sm font-semibold leading-6 text-slate-600">
                    {story.help}
                  </p>
                </div>

                <div className="rounded-3xl bg-[#E8F7F5] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp size={16} className="text-[#168C83]" />
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#168C83]">
                      Progress
                    </p>
                  </div>

                  <p className="line-clamp-2 text-sm font-semibold leading-6 text-[#0F766E]">
                    {story.result}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F7FBFC] text-[#0F3D5E] transition group-open:rotate-180 group-open:bg-[#E8F7F5] group-open:text-[#2CB1A6]">
            <ChevronDown size={20} />
          </div>
        </div>
      </summary>

      <div className="border-t border-slate-100 px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="mt-6 grid gap-4">
          <div className="rounded-3xl bg-[#F7FBFC] p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2CB1A6]">
              What Dr. Vini Identified
            </p>
            <p className="mt-2 text-[15px] font-semibold leading-7 text-slate-700">
              {story.help}
            </p>
          </div>

          <div className="rounded-3xl bg-[#FFF8EC] p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#B56B00]">
              Progress
            </p>
            <p className="mt-2 text-[15px] font-semibold leading-7 text-slate-700">
              {story.result}
            </p>
          </div>

          <div className="rounded-3xl bg-[#0F3D5E] p-5 text-white">
            <Quote size={24} className="mb-3 text-[#7DE0D6]" />
            <p className="text-[15px] font-bold leading-7 text-white/90">
              “{story.quote}”
            </p>
          </div>
        </div>
      </div>
    </details>
  );
}

export default function SuccessStoriesPage() {
  return (
    <main className="overflow-hidden bg-[#F7FBFC] text-[#102A43]">
      <section className="relative px-5 pb-16 pt-24 md:pb-24">
        <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F4B183]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm backdrop-blur">
                <HeartHandshake size={17} className="text-[#2CB1A6]" />
                Success Stories
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[1.04] tracking-tight text-[#102A43] md:text-7xl">
                Real stories of care, clarity and progress.
              </h1>

              <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
                Read parent experiences from Urjasvini Child Development Centre
                — covering learning concerns, behaviour, emotions, development,
                teen mental health and family support.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white shadow-xl shadow-[#0F3D5E]/20 transition hover:-translate-y-1"
                >
                  <CalendarCheck size={18} />
                  Book Consultation
                </Link>

                <a
                  href="https://wa.me/917999215093?text=Hello%20Dr.%20Vini%2C%20I%20want%20guidance%20after%20reading%20a%20success%20story."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white shadow-xl shadow-[#25D366]/20 transition hover:-translate-y-1"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/80 bg-white/75 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur">
              <div className="rounded-4xl bg-[#0F3D5E] p-7 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7DE0D6]">
                      Parent Trust
                    </p>
                    <h2 className="mt-3 text-4xl font-black">
                      4.9★ Google Rating
                    </h2>
                  </div>
                  <Star size={46} className="fill-[#F4B183] text-[#F4B183]" />
                </div>

                <p className="mt-5 text-base font-semibold leading-7 text-white/75">
                  Families come with confusion, worry and questions. The goal is
                  to leave with clarity, support and a practical path forward.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl bg-white p-5 shadow-sm"
                  >
                    <p className="text-3xl font-black text-[#0F3D5E]">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-500">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Story Journey */}
      <section className="px-5 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#0F3D5E] p-5 text-white shadow-2xl shadow-[#0F3D5E]/15 sm:p-7 md:p-9">
            <div className="mb-7 flex flex-col gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-black text-[#F4B183]">
                  <Sparkles size={14} />
                  Visual story journey
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
                  Every story follows a path from concern to clarity.
                </h2>
              </div>

              <p className="mx-auto max-w-xl text-sm font-semibold leading-7 text-white/70 lg:mx-0">
                Parents can understand the support process quickly before
                reading each full story.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {storyJourney.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="relative">
                    {index !== storyJourney.length - 1 && (
                      <ArrowRight
                        size={18}
                        className="absolute -right-3 top-10 z-10 hidden text-white/45 lg:block"
                      />
                    )}

                    <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/10 p-4 text-center backdrop-blur">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0F3D5E]">
                        <Icon size={24} />
                      </div>

                      <p className="mt-3 text-sm font-black">
                        {String(index + 1).padStart(2, "0")}. {item.title}
                      </p>

                      <p className="mt-1 text-xs font-semibold leading-5 text-white/65">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-4xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
            <div className="mb-4 flex items-center gap-3 px-3 pt-2">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E8F7F5] text-[#2CB1A6]">
                <Search size={18} />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#102A43]">
                  Browse by concern
                </h2>
                <p className="text-sm font-semibold text-slate-500">
                  Tap any category to jump directly to those stories.
                </p>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const count = stories.filter(
                  (story) => story.category === category.id,
                ).length;

                return (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="group min-w-55 rounded-3xl border border-slate-200 bg-[#F7FBFC] p-4 transition hover:-translate-y-1 hover:border-[#2CB1A6]/40 hover:bg-[#E8F7F5]"
                  >
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#0F3D5E] shadow-sm">
                        <Icon size={20} />
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#2CB1A6]">
                        {count} stories
                      </span>
                    </div>
                    <p className="font-black text-[#102A43]">
                      {category.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
                      {category.desc}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-[2.5rem] bg-white p-6 shadow-xl shadow-slate-900/5 md:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E8F7F5] px-4 py-2 text-sm font-black text-[#168C83]">
                  <BadgeCheck size={17} />
                  Featured Story
                </div>
                <h2 className="text-3xl font-black md:text-5xl">
                  “He was not slow. He just needed a different approach.”
                </h2>
                <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-slate-600">
                  A cognitive assessment helped the family understand their
                  child’s learning style and replace labels with the right
                  support plan.
                </p>
              </div>

              <a
                href="#learning-school"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-4 text-sm font-black text-white"
              >
                Read Stories
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="space-y-14">
            {groupedStories.map((category) => {
              const Icon = category.icon;

              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-24"
                >
                  <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
                        <Icon size={17} className="text-[#2CB1A6]" />
                        {category.label}
                      </div>
                      <h2 className="text-3xl font-black md:text-5xl">
                        {category.label} Stories
                      </h2>
                      <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-slate-600">
                        {category.desc}
                      </p>
                    </div>

                    <p className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#2CB1A6] shadow-sm">
                      {category.stories.length} stories
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {category.stories.map((story) => (
                      <StoryCard key={story.id} story={story} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-[#0F3D5E] p-8 text-white shadow-2xl shadow-[#0F3D5E]/20 md:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-[#7DE0D6]">
                Need similar guidance?
              </p>

              <h2 className="text-4xl font-black leading-tight md:text-6xl">
                Every child’s story is different. The right support can change
                the direction.
              </h2>

              <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-white/75">
                Book a consultation with Dr. Vini Jhariya to understand your
                child’s concern, assessment needs and the next support steps.
              </p>
            </div>

            <div className="rounded-4xl bg-white p-6 text-[#102A43]">
              <h3 className="text-2xl font-black">
                Start with a simple conversation
              </h3>

              <div className="mt-5 grid gap-3">
                {[
                  "Understand your child’s concern",
                  "Know whether assessment is needed",
                  "Get parent guidance and next steps",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#E8F7F5] text-[#2CB1A6]">
                      <BadgeCheck size={16} />
                    </span>
                    <p className="text-sm font-black text-slate-700">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white"
                >
                  <CalendarCheck size={18} />
                  Book Consultation
                </Link>

                <a
                  href="https://wa.me/917999215093?text=Hello%20Dr.%20Vini%2C%20I%20want%20guidance%20for%20my%20child."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
