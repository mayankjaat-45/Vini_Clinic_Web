import dotenv from "dotenv";
import mongoose from "mongoose";
import Service from "../models/Service.js";
import { connectDb } from "../config/db.js";

dotenv.config({ override: true });

console.log(
  "Seed using DB:",
  process.env.MONGO_URL?.replace(/\/\/.*@/, "//****:****@"),
);

const autismService = {
  title: "Autism Therapy",
  slug: "autism-therapy-indore",
  category: "Children",

  pageTitle:
    "Autism Therapy in Indore | ASD Assessment & Intervention | Urjasvini CDC",

  metaDescription:
    "Looking for autism therapy in Indore? Urjasvini CDC offers comprehensive ASD assessment and integrated autism intervention. One plan. One team. Built for your child.",

  primaryKeywords: [
    "autism therapy Indore",
    "ASD assessment Indore",
    "autism specialist Indore",
    "autism intervention Indore",
    "autism centre Indore",
  ],

  secondaryKeywords: [
    "autism treatment Madhya Pradesh",
    "autism diagnosis child Indore",
    "early autism intervention Indore",
    "child psychologist autism Indore",
    "autism help Indore",
    "best autism therapist Indore",
    "autism assessment tools India",
    "autism specialist near me",
  ],

  shortDescription:
    "Comprehensive ASD assessment and integrated autism intervention built around your child’s complete developmental profile.",

  description:
    "At Urjasvini Child Development Centre in Indore, autism therapy begins with a thorough ASD assessment. The goal is to understand the child as a whole and create one integrated intervention plan under one roof.",

  hero: {
    headline: "You have been given therapies.\nWe give you a plan.",
    subHeadline:
      "Every autistic child is different. Their intervention should be too.",
    paragraph:
      "If you are the parent of a child with autism — or a child you suspect may be on the spectrum — you have probably already been through a lot. Multiple doctors. Conflicting opinions. Therapy after therapy. And through all of it, a quiet feeling that nobody is looking at your child as a whole.\n\nAt Urjasvini Child Development Centre in Indore, we do something different. We begin with a thorough ASD assessment. We build your child’s complete developmental profile. And then we create one integrated intervention plan — combining every approach your child needs, under one roof, with one team, moving in one direction.\n\nNo sending you from clinic to clinic across Indore. No selling separate therapy packages. Just a clear plan, built specifically for your child.",
    trustLine:
      "4.9 stars | 237 Google reviews | Serving families across Indore & Madhya Pradesh",
    buttons: [
      {
        text: "Book an ASD Assessment",
        link: "/contact",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
  },

  sections: [
    {
      title: "Understanding autism — without the jargon.",
      type: "text",
      order: 1,
      content:
        "Autism Spectrum Disorder (ASD) is a neurodevelopmental condition that affects how a child communicates, processes information, relates to others, and experiences the world around them.\n\nThe word spectrum matters. No two autistic children are the same. Some children have no spoken language. Others speak fluently but struggle with social connection. Some are deeply sensitive to sound, light, or touch. Others seek intense sensory input. Some have exceptional abilities in specific areas. Others need support across every area of daily life.\n\nThis is why a copy-paste therapy plan never works for autism. The intervention must begin with understanding — deeply, specifically, individually — who your child is.\n\nThe earlier that understanding begins, the better. At Urjasvini CDC, we have worked with children as young as 12 months. In our clinical experience, every month of early intervention in autism makes a measurable difference to long-term outcomes.",
    },
    {
      title: "Signs that may indicate autism in your child.",
      subtitle:
        "This is not a diagnostic checklist — it is a starting point. If several of these resonate, a proper ASD assessment at Urjasvini CDC in Indore is the right next step.",
      type: "cards",
      order: 2,
      items: [
        {
          title: "In toddlers and young children",
          subtitle: "Age 1–4",
          items: [
            "Not responding to their name by 12 months",
            "Limited or no eye contact",
            "No pointing, waving, or gesturing by 12 months",
            "No single words by 16 months or two-word phrases by 24 months",
            "Loss of language or social skills they previously had",
            "Lack of interest in other children",
            "Repetitive movements — rocking, hand flapping, spinning",
            "Intense focus on specific objects or routines",
            "Unusual reactions to sounds, textures, lights, or tastes",
            "Difficulty with changes in routine",
          ],
        },
        {
          title: "In older children",
          subtitle: "Age 5 and above",
          items: [
            "Difficulty understanding social rules and cues",
            "Trouble making or keeping friends",
            "Very literal understanding of language",
            "Intense, narrow interests",
            "Difficulty with transitions or unexpected changes",
            "Sensory sensitivities that affect daily functioning",
            "Meltdowns that seem disproportionate to the situation",
            "Difficulty expressing emotions or understanding others’ feelings",
          ],
        },
        {
          title: "Important note",
          description:
            "If you are seeing several of these signs in your child — do not wait. Early assessment and early intervention make a measurable difference. Book a consultation with Urjasvini CDC today.",
        },
      ],
    },
    {
      title: "The Urjasvini Integrated Autism Intervention Model.",
      subtitle:
        "Built at Urjasvini Child Development Centre. Refined over a decade of clinical practice. Designed around one belief — your child should not have to travel between five different therapists to get the help they need.",
      type: "steps",
      order: 3,
      items: [
        {
          title: "Comprehensive ASD Assessment",
          description:
            "We begin with a thorough, multi-tool assessment to understand your child’s complete developmental profile. Using internationally validated assessment tools, we build a precise, holistic picture of where your child is — and what they specifically need.",
        },
        {
          title: "Individual Child Profile",
          description:
            "No two autism profiles are the same. Based on the assessment findings, we map your child’s specific strengths, challenges, sensory profile, communication level, and learning style. This profile becomes the foundation of everything that follows — not a textbook template.",
        },
        {
          title: "Integrated Intervention Plan",
          description:
            "Using national and international evidence-based approaches, we build one unified plan that addresses communication, behaviour, social skills, sensory needs, and daily living — all working together, under one roof. Parents are trained as active partners in the plan at every step.",
        },
        {
          title: "Ongoing Review & Progress Tracking",
          description:
            "Autism intervention evolves as your child grows. We review progress regularly, adjust goals, coordinate with schools where needed, and keep parents in Indore and across Madhya Pradesh informed and empowered throughout the journey.",
        },
      ],
    },
    {
      title:
        "Why families across Indore and Madhya Pradesh choose Urjasvini CDC.",
      type: "cards",
      order: 4,
      items: [
        {
          title: "We assess first — always.",
          description:
            "We never begin therapy without a proper assessment. Knowing exactly what your child needs is the only way to help them effectively. Assessment is not optional — it is the foundation.",
        },
        {
          title: "One integrated plan — not a menu of therapies.",
          description:
            "We do not sell separate sessions for separate problems. Everything your child needs is woven into one cohesive, goal-based plan. One team. One direction.",
        },
        {
          title: "You are part of the team.",
          description:
            "Parents are trained and involved at every step. Because 45 minutes in a therapy room means nothing if the other 23 hours are not aligned. We build parent capacity — not parent dependency.",
        },
        {
          title: "We have seen what early intervention can do.",
          description:
            "Children who came to Urjasvini CDC with no words at age 2 are now in mainstream schools. Children told they would never catch up — caught up. We do not promise outcomes. But we have over a decade of evidence of what is possible when you start early and stay consistent.",
        },
        {
          title: "Indore-based. India-wide online.",
          description:
            "In-clinic consultations at Urjasvini CDC, Indore. Online autism consultations for families anywhere across Madhya Pradesh and India.",
        },
      ],
    },
    {
      title: "Assessment tools we use.",
      subtitle:
        "Internationally validated. Clinically precise. Giving you answers — not guesses.",
      type: "tools",
      order: 5,
      items: [
        {
          title:
            "M-CHAT-R/F — Modified Checklist for Autism in Toddlers (Revised with Follow-Up)",
        },
        {
          title: "CARS-2 — Childhood Autism Rating Scale, Second Edition",
        },
        {
          title: "GARS-3 — Gilliam Autism Rating Scale, Third Edition",
        },
        {
          title:
            "ADOS-2 — Autism Diagnostic Observation Schedule, Second Edition",
        },
        {
          title: "ADI-R — Autism Diagnostic Interview, Revised",
        },
        {
          title: "ISAA — Indian Scale for Assessment of Autism",
        },
        {
          title: "SCQ — Social Communication Questionnaire",
        },
        {
          title: "SRS-2 — Social Responsiveness Scale, Second Edition",
        },
        {
          title: "Vineland Adaptive Behaviour Scales, Third Edition",
        },
        {
          title:
            "BSID-III — Bayley Scales of Infant and Toddler Development, Third Edition",
        },
        {
          title:
            "DAYC-2 — Developmental Assessment of Young Children, Second Edition",
        },
        {
          title: "Sensory Profile — Second Edition",
        },
        {
          title: "Cognitive & Communication Profile Assessment",
        },
      ],
    },
    {
      title: "A journey that began with no words.",
      type: "story",
      order: 6,
      content:
        "“Our son was 3 years old and still had no words. Our doctor told us to wait.”\n\nAyaan’s parents came to Urjasvini CDC after months of being told he would catch up on his own. He had no spoken words, avoided eye contact, did not respond to his name, and would have intense meltdowns that left the entire family exhausted and scared.\n\nA comprehensive ASD assessment confirmed what his parents had sensed for months. But instead of stopping at the diagnosis, Dr. Vini immediately began structured early intervention — play-based, goal-oriented, and involving the parents at every single step.\n\nWithin six months, Ayaan was making eye contact, pointing to things he wanted, and saying his first words. Within a year, he was attending a structured programme and progressing in ways his parents had not dared to imagine.\n\n“The diagnosis was not the end. Dr. Vini made sure it was just the beginning. She told us it is never too late — and she was right.”",
      items: [
        {
          buttonText: "Read More Family Stories",
          buttonLink: "/success-stories",
        },
      ],
    },
    {
      title:
        "Your child does not need more therapies.\nThey need the right plan.",
      type: "cta",
      order: 7,
      content:
        "The first step is an assessment. Not a sales pitch. Not a package. Just a thorough, honest evaluation of where your child is — and what they need to move forward.\n\nWhether you are in Indore, anywhere across Madhya Pradesh, or consulting online from anywhere in India — Urjasvini CDC is here.",
      items: [
        {
          buttonText: "Book an ASD Assessment",
          buttonLink: "/contact",
        },
        {
          buttonText: "WhatsApp Us",
          buttonLink: "https://wa.me/917999215093",
        },
      ],
    },
  ],

  faqs: [
    {
      question:
        "My child is 18 months old and I am worried. Is it too early to come for an assessment?",
      answer:
        "No — it is never too early. At Urjasvini CDC, we have assessed children as young as 12 months. Early signs can be identified well before a formal diagnosis is possible, and early intervention always gives better outcomes. If something feels different, trust your instinct and come in.",
    },
    {
      question:
        "Does my child need a formal diagnosis before starting therapy?",
      answer:
        "Not always. If there are clear developmental concerns, we can begin intervention while the assessment process is ongoing. We do not make families wait unnecessarily when a child clearly needs support.",
    },
    {
      question:
        "What is the difference between autism assessment and autism therapy?",
      answer:
        "Assessment tells us exactly who your child is — their specific profile, strengths, and areas of need. Therapy is what we do with that information. Both are essential, and at Urjasvini CDC in Indore, we provide both under one roof.",
    },
    {
      question: "How long does autism therapy take?",
      answer:
        "There is no single honest answer — it depends entirely on your child’s profile, age, and the intensity of support needed. What we can tell you is that we review progress regularly and adjust the plan as your child grows. We do not keep children in therapy longer than they need to be.",
    },
    {
      question:
        "We are not in Indore. Can we still consult with Dr. Vini at Urjasvini CDC?",
      answer:
        "Yes. We offer online autism consultations for families across Madhya Pradesh and anywhere in India. Assessments, therapy guidance, and parent training can all be conducted online.",
    },
    {
      question:
        "My child has already been to other therapists. Is it too late to start fresh?",
      answer:
        "It is never too late. We will review what has been done, understand what has worked and what has not, and build from there. Every child can make progress — at any age, at any stage.",
    },
    {
      question:
        "Do you work with schools in Indore to support autistic children?",
      answer:
        "Yes. Where needed, we coordinate with your child’s school — providing guidance to teachers, recommending classroom accommodations, and ensuring the school environment supports your child’s progress.",
    },
  ],

  isFeatured: true,
  isActive: true,
  displayOrder: 1,
};

const adhdService = {
  title: "ADHD Assessment & Therapy",
  slug: "adhd-assessment-therapy-indore",
  category: "Children",

  pageTitle:
    "ADHD Assessment & Therapy in Indore | Behavioural Intervention | Urjasvini CDC",

  metaDescription:
    "Urjasvini CDC offers comprehensive ADHD assessment and evidence-based behavioural therapy for children in Indore & across India. A personalised plan built for your child.",

  primaryKeywords: [
    "ADHD assessment Indore",
    "ADHD therapy Indore",
    "ADHD specialist Indore",
    "ADHD child Indore",
    "hyperactive child Indore",
    "ADHD centre Indore",
  ],

  secondaryKeywords: [
    "ADHD treatment Madhya Pradesh",
    "ADHD behavioural therapy Indore",
    "attention deficit child Indore",
    "ADHD child psychologist Indore",
    "ADHD help Indore",
    "ADHD diagnosis child India",
    "ADHD without medication",
    "Dr. Vini Jhariya ADHD",
  ],

  shortDescription:
    "Comprehensive ADHD assessment and evidence-based behavioural intervention for children and adolescents.",

  description:
    "At Urjasvini Child Development Centre, ADHD support begins with a comprehensive assessment. Dr. Vini Jhariya understands each child’s attention, impulse control, executive functioning and emotional regulation profile before creating a personalised intervention plan.",

  hero: {
    headline: "Your child is not naughty.\nTheir brain just works differently.",
    subHeadline:
      "ADHD is not a behaviour problem. It is a brain wiring difference. And it responds beautifully to the right intervention.",
    paragraph:
      "For years, children with ADHD have been told to sit still, pay attention, try harder, and behave. Most of them are trying harder than anyone around them realises — just without the right tools.\n\nAt Urjasvini Child Development Centre in Indore, Dr. Vini Jhariya and her team do not begin with assumptions or labels. Every child goes through a comprehensive ADHD assessment first — understanding exactly how their brain works, what they need, and what a personalised intervention plan looks like for them specifically.",
    trustLine:
      "4.9 stars | 237 Google reviews | Serving families across Indore & Madhya Pradesh",
    buttons: [
      {
        text: "Book an ADHD Assessment",
        link: "/contact",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
  },

  sections: [
    {
      title: "What ADHD actually is — and what it is not.",
      type: "text",
      order: 1,
      content:
        "Attention Deficit Hyperactivity Disorder (ADHD) is one of the most common — and most misunderstood — neurodevelopmental conditions in children.\n\nADHD is not laziness. It is not bad parenting. It is not a child choosing not to pay attention. It is a difference in how the brain regulates attention, impulse control, and activity levels — and it is nobody's fault.\n\nADHD can appear as inattention, hyperactivity, impulsivity, emotional dysregulation, poor organisation, difficulty following instructions, academic struggles, social problems, and constant conflict at home or school.\n\nUnderstanding which type your child has — and what their specific profile looks like — is the essential first step. That is what a proper ADHD assessment at Urjasvini CDC gives you.",
    },

    {
      title: "ADHD presents in three ways.",
      type: "cards",
      order: 2,
      items: [
        {
          title: "Predominantly Inattentive",
          description:
            "The child who seems to daydream, loses things constantly, forgets instructions, and struggles to finish tasks. Often missed — because they are not disruptive.",
        },
        {
          title: "Predominantly Hyperactive-Impulsive",
          description:
            "The child who cannot sit still, acts before thinking, interrupts constantly, and seems to run on a motor that never switches off.",
        },
        {
          title: "Combined Type",
          description:
            "The most common presentation — where both inattention and hyperactivity-impulsivity are present together.",
        },
      ],
    },

    {
      title: "Signs that may indicate ADHD in your child.",
      subtitle:
        "These signs are a starting point — not a diagnosis. If several of these resonate, a comprehensive ADHD assessment with Dr. Vini Jhariya at Urjasvini CDC in Indore is the right next step.",
      type: "cards",
      order: 3,
      items: [
        {
          title: "In younger children",
          subtitle: "Age 3–7",
          items: [
            "Cannot sit still even for short periods",
            "Runs, climbs, or moves constantly and inappropriately",
            "Acts without thinking — grabs, hits, or speaks impulsively",
            "Extremely difficult to manage in structured settings like school",
            "Cannot wait for their turn",
            "Shifts from one activity to another without completing anything",
            "Very easily distracted by sounds or movement around them",
            "Loses or forgets things constantly",
            "Does not seem to listen even when spoken to directly",
            "Emotional outbursts that are intense and quickly forgotten",
          ],
        },
        {
          title: "In older children and adolescents",
          subtitle: "Age 8–18",
          items: [
            "Consistently fails to finish schoolwork or homework despite trying",
            "Forgets daily tasks, assignments, and responsibilities",
            "Extremely disorganised — bag, desk, room, thoughts",
            "Avoids tasks that require sustained mental effort",
            "Makes careless mistakes despite knowing the correct answer",
            "Struggles to follow multi-step instructions",
            "Frequently loses stationery, books, or belongings",
            "Easily distracted — cannot block out background noise or activity",
            "Poor time management — always late, rushing, or behind",
            "Emotional sensitivity, frustration, or low self-esteem",
          ],
        },
      ],
    },

    {
      title: "How Dr. Vini Jhariya assesses ADHD at Urjasvini CDC.",
      subtitle:
        "A comprehensive ADHD assessment uses multiple internationally validated tools — not a single checklist.",
      type: "tools",
      order: 4,
      items: [
        {
          title: "Conners' Rating Scales — Third Edition",
        },
        {
          title: "Conners' Continuous Performance Test",
        },
        {
          title: "Vanderbilt ADHD Diagnostic Rating Scale",
        },
        {
          title: "Brown ADD Rating Scales",
        },
        {
          title: "ADHD Rating Scale — Fifth Edition",
        },
        {
          title:
            "SWAN — Strengths and Weaknesses of ADHD Symptoms and Normal Behaviour Scale",
        },
        {
          title:
            "BASC-3 — Behaviour Assessment System for Children, Third Edition",
        },
        {
          title: "CBCL — Child Behaviour Checklist",
        },
        {
          title: "Teacher Report Form",
        },
        {
          title: "TOVA — Test of Variables of Attention",
        },
        {
          title:
            "IVA-2 — Integrated Visual and Auditory Continuous Performance Test",
        },
        {
          title: "CAS-2 — Cognitive Assessment System, Second Edition",
        },
        {
          title: "Working Memory Assessments",
        },
        {
          title: "Executive Functioning Rating Scales",
        },
        {
          title:
            "AIIMS ADHD Toolkit — Indian standardised behavioural assessment protocol",
        },
        {
          title: "Childhood Psychopathology Measurement Schedule — CPMS",
        },
        {
          title: "Indian ADHD Rating Scale",
        },
        {
          title: "Developmental History and School Functioning Interview",
        },
        {
          title:
            "Multi-informant Assessment — parent, teacher, and child perspectives combined",
        },
      ],
    },

    {
      title: "The Urjasvini ADHD Intervention Model.",
      subtitle:
        "Purely behavioural and psychological. Evidence-based. Built around your child's specific profile — not a packaged programme. Led by Dr. Vini Jhariya at Urjasvini Child Development Centre, Indore.",
      type: "steps",
      order: 5,
      items: [
        {
          title: "Comprehensive ADHD Assessment",
          description:
            "Dr. Vini Jhariya assesses across multiple settings — home, school, and clinic — using both national and international tools. We look at attention, impulse control, working memory, executive functioning, emotional regulation, and academic performance. The assessment gives us the full picture — not just a diagnosis.",
        },
        {
          title: "Understanding Your Child's Specific Profile",
          description:
            "ADHD looks different in every child. Before planning anything, Dr. Vini Jhariya takes time to understand your child's specific subtype, cognitive strengths, areas of difficulty, and how ADHD is showing up in their specific life — at their school, in their home, with their family.",
        },
        {
          title: "Integrated Behavioural & Psychological Intervention",
          description:
            "Using a powerful combination of evidence-based approaches — including the AIIMS ADHD Toolkit, Feuerstein Instrumental Enrichment (FIE), Cognitive Behavioural Therapy (CBT), behaviour modification, executive functioning training, emotional regulation strategies, social skills training, arts-based therapy, play therapy, and more — Dr. Vini Jhariya builds one unified intervention plan. A thoughtfully mixed model, built specifically for your child.",
        },
        {
          title: "School & Parent Partnership",
          description:
            "ADHD intervention that happens only inside a therapy room is incomplete. Dr. Vini Jhariya trains parents in evidence-based management strategies, provides school accommodation guidance, and works with teachers where needed. Because for a child with ADHD — consistency across every environment is everything.",
        },
      ],
    },

    {
      title: "Approaches Dr. Vini Jhariya draws from.",
      subtitle:
        "No single approach works for every child with ADHD. At Urjasvini CDC, Dr. Vini Jhariya draws from a wide range of nationally and internationally recognised modalities — combining them based on what your child's specific profile calls for.",
      type: "badges",
      order: 6,
      items: [
        {
          title:
            "AIIMS ADHD Toolkit — Indian standardised behavioural intervention protocol",
        },
        {
          title:
            "Feuerstein Instrumental Enrichment — cognitive modifiability and mediated learning",
        },
        {
          title: "Cognitive Behavioural Therapy — REBT and Beck approaches",
        },
        {
          title:
            "Behaviour Modification Techniques — positive reinforcement, token economy, contingency management",
        },
        {
          title:
            "Executive Functioning Training — planning, organisation, time management, working memory",
        },
        {
          title:
            "Emotional Regulation Strategies — managing frustration, impulsivity, and dysregulation",
        },
        {
          title:
            "Social Skills Training — peer interaction, turn-taking, reading social cues",
        },
        {
          title:
            "Mindfulness-Based Interventions — attention training and self-regulation",
        },
        {
          title: "Play Therapy — for younger children with ADHD",
        },
        {
          title: "Arts-Based Therapy — channelling ADHD energy creatively",
        },
        {
          title: "Sand Therapy — for emotional expression and self-regulation",
        },
        {
          title: "Parent Training & Behaviour Management Coaching",
        },
        {
          title: "School Consultation & Classroom Accommodation Planning",
        },
        {
          title: "And much more.",
        },
      ],
    },

    {
      title: "Is this the right support for your child?",
      subtitle:
        "Families come to Dr. Vini Jhariya at Urjasvini CDC for ADHD support when their child is:",
      type: "cards",
      order: 7,
      items: [
        {
          title: "School struggles despite intelligence",
          description:
            "Struggling to keep up in school despite being clearly intelligent.",
        },
        {
          title: "Teacher complaints",
          description:
            "Getting consistent complaints from teachers about attention or behaviour.",
        },
        {
          title: "Homework battles",
          description:
            "Unable to complete homework without hours of battles every evening.",
        },
        {
          title: "Impulsive behaviour",
          description:
            "Losing friends or struggling with peer relationships due to impulsive behaviour.",
        },
        {
          title: "Low self-esteem",
          description:
            "Experiencing low self-esteem because of repeated academic failure.",
        },
        {
          title: "Emotional outbursts",
          description:
            "Having emotional outbursts that are disproportionate and difficult to manage.",
        },
        {
          title: "Diagnosed but unsupported",
          description:
            "Diagnosed with ADHD but not yet receiving structured psychological support.",
        },
        {
          title: "Not yet assessed",
          description: "Showing signs of ADHD but not yet formally assessed.",
        },
        {
          title: "Missed adolescent ADHD",
          description:
            "An adolescent whose ADHD was missed in childhood and is now affecting exams and future plans.",
        },
        {
          title: "Quiet inattentive presentation",
          description:
            "A girl whose quiet inattentive presentation has been overlooked for years.",
        },
      ],
    },

    {
      title: "Five years of being told to try harder.",
      type: "story",
      order: 8,
      content:
        "“Every teacher said the same thing — he is intelligent but would not apply himself. We heard that for five years.”\n\nVivan was 11 and had been hearing the same feedback since Class 1 — bright, but distracted. Could do better, if only he tried. His parents had believed it too — and had tried everything from stricter rules to reward charts to extra classes. Nothing changed.\n\nA comprehensive ADHD assessment with Dr. Vini Jhariya at Urjasvini CDC finally explained five years of confusion. Vivan had ADHD — his brain was wired differently, and no amount of trying harder was going to change that without the right support.\n\nWith a structured intervention plan using the AIIMS ADHD Toolkit and Feuerstein Instrumental Enrichment, combined with classroom accommodations and parent training, Vivan's academic performance improved significantly within one term. But more importantly — he stopped feeling like a failure.\n\n“For five years we told him to try harder. Dr. Vini told us he had been trying harder than any of us realised — just without the right tools.”",
      items: [
        {
          buttonText: "Read More Family Stories",
          buttonLink: "/success-stories",
        },
      ],
    },

    {
      title:
        "Your child has been trying.\nNow let us give them the right tools.",
      type: "cta",
      order: 9,
      content:
        "A proper ADHD assessment is the starting point. Not a label. Not a life sentence. A clear picture of how your child's brain works — and a plan that works with it.\n\nDr. Vini Jhariya and the Urjasvini CDC team are here for families in Indore, across Madhya Pradesh, and online across India.",
      items: [
        {
          buttonText: "Book an ADHD Assessment",
          buttonLink: "/contact",
        },
        {
          buttonText: "WhatsApp Us",
          buttonLink: "https://wa.me/917999215093",
        },
      ],
    },
  ],

  faqs: [
    {
      question:
        "My child has been labelled hyperactive by teachers. Does that mean they have ADHD?",
      answer:
        "Not necessarily. Hyperactivity can have several causes — anxiety, sensory processing difficulties, sleep issues, or simply a high-energy temperament. A proper ADHD assessment with Dr. Vini Jhariya at Urjasvini CDC will tell you exactly what is happening — so you are working with the truth, not a label.",
    },
    {
      question:
        "My daughter is very quiet but cannot focus at all. Can girls have ADHD?",
      answer:
        "Absolutely — and girls with ADHD are significantly underdiagnosed. The inattentive presentation of ADHD is far more common in girls and is frequently missed because it does not involve disruptive behaviour. If your daughter struggles with focus, organisation, and completing tasks — an assessment is the right step.",
    },
    {
      question:
        "My child has ADHD and is also struggling academically. Can you help with both?",
      answer:
        "Yes. ADHD and learning difficulties frequently co-occur. Dr. Vini Jhariya assesses and addresses both — building an intervention plan that covers attention, behaviour, and academic skill development together at Urjasvini CDC.",
    },
    {
      question: "How long does ADHD intervention take?",
      answer:
        "It varies based on the child's profile, age, and the consistency of the plan across home and school. Most families begin to see meaningful changes within 2 to 3 months of consistent intervention. Dr. Vini Jhariya reviews progress regularly and adjusts the plan as needed.",
    },
    {
      question:
        "We are not in Indore. Can we access Urjasvini CDC's ADHD services online?",
      answer:
        "Yes. Dr. Vini Jhariya offers online ADHD consultations for families across Madhya Pradesh and India. Assessments, parent training, and intervention guidance can all be conducted online.",
    },
    {
      question:
        "My child has already been to other therapists. Is it too late to start fresh?",
      answer:
        "It is never too late. Dr. Vini Jhariya will review what has been done, understand what has worked and what has not, and build from there. Every child can make progress — at any age, at any stage.",
    },
  ],

  isFeatured: true,
  isActive: true,
  displayOrder: 2,
};

const dyslexiaService = {
  title: "Dyslexia & Remedial Education",
  slug: "dyslexia-specialist-indore",
  category: "Children",

  pageTitle:
    "Dyslexia Specialist in Indore | SLD Assessment & Remedial Education | Urjasvini CDC",

  metaDescription:
    "Is your child struggling to read or write? Dr. Vini Jhariya at Urjasvini CDC, Indore offers expert dyslexia assessment, SLD diagnosis, remedial education & board exam support.",

  primaryKeywords: [
    "dyslexia specialist Indore",
    "SLD assessment Indore",
    "learning disability specialist Indore",
    "remedial education Indore",
    "dyslexia assessment Indore",
    "reading difficulty child Indore",
  ],

  secondaryKeywords: [
    "dyslexia treatment Indore",
    "specific learning disability Indore",
    "SLD certificate Indore",
    "dyslexia school accommodation Indore",
    "board exam exemption dyslexia",
    "learning difficulty child Madhya Pradesh",
    "Dr. Vini Jhariya dyslexia",
    "dyslexia centre Indore",
  ],

  shortDescription:
    "Specialist dyslexia assessment, SLD diagnosis, remedial education and school/board exam support for children.",

  description:
    "At Urjasvini CDC, dyslexia support begins with accurate assessment, clear diagnosis and a personalised remedial education plan that teaches the child the way their brain actually learns.",

  hero: {
    headline: "Your child is not slow.\nThey read the world differently.",
    subHeadline:
      "Dyslexia is not a measure of intelligence. It is a different way of processing language. And with the right specialist — it is absolutely manageable.",
    paragraph:
      '"If I cannot learn the way you teach — will you teach me the way I learn?"\n\nYears of failing tests. Teachers calling them careless. Parents wondering why their clearly bright child cannot read a simple sentence. By the time most families reach Urjasvini Child Development Centre, their child has already spent years being misunderstood — and has started to believe the labels.\n\nDr. Vini Jhariya is a dyslexia specialist based in Indore, working with children and families across Madhya Pradesh and India. At Urjasvini CDC, we assess accurately, diagnose clearly, and build a remedial education plan that teaches your child the way their brain actually learns.\n\nWe also provide school accommodation letters and board examination exemption certificates — so your child gets every support they are legally entitled to.',
    trustLine:
      "4.9 stars | 237 Google reviews | Serving families across Indore & Madhya Pradesh",
    buttons: [
      {
        text: "Book a Dyslexia Assessment",
        link: "/contact",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
  },

  sections: [
    {
      title: "What dyslexia actually is — and what it has nothing to do with.",
      type: "text",
      order: 1,
      content:
        "Dyslexia is a Specific Learning Disability (SLD) that primarily affects reading, writing, and spelling. It is neurological in origin — meaning it is related to how the brain processes written language, not how intelligent a child is.\n\nSome of the world's most brilliant minds — scientists, artists, entrepreneurs, designers — have dyslexia. It has nothing to do with vision. Nothing to do with effort. And absolutely nothing to do with intelligence.\n\nWhat dyslexia does affect is the speed and accuracy with which a child can decode written words — recognising letters, connecting them to sounds, and making sense of text. Without the right support, this gap widens every year — affecting confidence, academic performance, and a child's belief in themselves.\n\nWith the right support — identified early, addressed properly — children with dyslexia learn to read, write, and perform academically. They do not grow out of dyslexia. But they absolutely learn to work with it.\n\nThe earlier Dr. Vini Jhariya and the Urjasvini CDC team identify and address dyslexia, the better the outcome. Every year without the right support is a year of unnecessary struggle.",
    },

    {
      title: "Signs and symptoms of dyslexia — by age.",
      subtitle:
        "Every age group shows dyslexia differently. Find your child's age group below. If several signs resonate — a comprehensive SLD assessment with Dr. Vini Jhariya at Urjasvini CDC in Indore is the right next step.",
      type: "cards",
      order: 2,
      items: [
        {
          title: "Age 4–7 — Early Childhood Signs",
          subtitle: "Are you worried about your young child?",
          items: [
            "Delayed speech development or difficulty learning nursery rhymes",
            "Difficulty learning the alphabet, days of the week, colours, or numbers in sequence",
            "Struggles to connect letters to their sounds",
            "Cannot rhyme words that other children of the same age can",
            "Difficulty remembering simple sequences of instructions",
            "Avoids drawing, colouring, or any pre-writing activities",
            "Difficulty learning to write their own name",
            "Confuses words that sound similar — cat and cap",
            "Family history of reading or spelling difficulties",
            "Slow to pick up on early literacy skills despite good general intelligence",
          ],
        },
        {
          title: "Age 7–12 — School-Age Signs",
          subtitle: "Is your school-age child struggling?",
          items: [
            "Reads very slowly — word by word, often losing the place on the page",
            "Confuses visually similar letters — b/d, p/q, m/w",
            "Skips words, lines, or guesses words from context rather than reading them",
            "Spells the same word differently within the same piece of writing",
            "Handwriting is inconsistent, difficult to read, or extremely effortful",
            "Reads aloud significantly below the level of their verbal ability",
            "Understands material when it is read to them — but not when they read it themselves",
            "Avoids reading, writing, or any activity involving text",
            "Takes significantly longer to complete written work than peers",
            "Fails in written exams despite knowing the subject well orally",
            "Has difficulty copying from the board accurately",
            "Struggles with sequencing — days of week, months, multiplication tables",
            "Appears bright and capable in conversation but struggles significantly in written work",
          ],
        },
        {
          title: "Age 13+ — Adolescent Signs",
          subtitle: "Is your teenager affected?",
          items: [
            "Still reads slowly and with significant effort despite years of schooling",
            "Avoids reading for pleasure entirely",
            "Struggles significantly with note-taking during lectures",
            "Written exam performance does not reflect actual knowledge or verbal ability",
            "Performs significantly better in oral assessments or vivas",
            "Poor spelling despite years of trying to improve",
            "Difficulty organising written work — ideas are strong, written expression is weak",
            "Takes much longer to complete assignments than peers",
            "Board exam performance consistently below actual understanding of the subject",
            "Low self-esteem related specifically to reading and writing — not other areas",
            "Avoids any situation where they may be asked to read aloud",
          ],
        },
        {
          title: "Important note",
          description:
            "Many children with dyslexia are described as bright, verbal, and creative — but struggling inexplicably with reading and writing. If this sounds familiar, do not wait. A proper SLD assessment with Dr. Vini Jhariya at Urjasvini CDC gives you answers — and a plan.",
        },
      ],
    },

    {
      title:
        "How Dr. Vini Jhariya assesses dyslexia and learning disabilities at Urjasvini CDC.",
      subtitle:
        "A comprehensive SLD assessment uses multiple nationally and internationally validated tools — giving you a clear, documented diagnosis that is recognised by schools and examination boards across India.",
      type: "tools",
      order: 3,
      items: [
        { title: "DAST — Dyslexia Assessment Screening Tool" },
        { title: "WRAT-5 — Wide Range Achievement Test, Fifth Edition" },
        { title: "Woodcock Reading Mastery Tests — Third Edition" },
        { title: "GORT-5 — Gray Oral Reading Tests, Fifth Edition" },
        { title: "TOWL-4 — Test of Written Language, Fourth Edition" },
        { title: "TERA-4 — Test of Early Reading Ability, Fourth Edition" },
        {
          title:
            "CTOPP-2 — Comprehensive Test of Phonological Processing, Second Edition",
        },
        { title: "WDRB — Woodcock Diagnostic Reading Battery" },
        {
          title:
            "KTEA-3 — Kaufman Test of Educational Achievement, Third Edition",
        },
        { title: "Feuerstein Learning Propensity Assessment Device (LPAD)" },
        {
          title:
            "WISC-V — Wechsler Intelligence Scale for Children, Fifth Edition",
        },
        {
          title:
            "WIAT-III — Wechsler Individual Achievement Test, Third Edition",
        },
        { title: "Nelson-Denny Reading Test" },
        { title: "Phonological Awareness Assessment Battery" },
        { title: "NIMHANS SLD Battery" },
        { title: "DALI — Dyslexia Assessment for Languages of India" },
        { title: "RCI-recognised SLD Assessment Protocol" },
        { title: "Indian Standardised Reading and Writing Assessments" },
        {
          title: "Developmental History and Academic Functioning Interview",
        },
        { title: "School Report and Teacher Input Assessment" },
        {
          title:
            "Multi-informant Evaluation — parent, teacher, and child combined",
        },
      ],
    },

    {
      title: "The Urjasvini Remedial Education Approach.",
      subtitle:
        "Assessed precisely. Taught differently. Supported completely. Led by Dr. Vini Jhariya at Urjasvini Child Development Centre, Indore.",
      type: "steps",
      order: 4,
      items: [
        {
          title: "Comprehensive SLD Assessment",
          description:
            "Dr. Vini Jhariya conducts a thorough assessment covering reading accuracy, reading fluency, reading comprehension, written expression, spelling, phonological processing, working memory, and cognitive profile. The assessment produces a detailed report — clinically precise, clearly written, and legally recognised for school and board exam accommodations across India.",
        },
        {
          title: "Understanding Your Child's Learning Profile",
          description:
            "Dyslexia is not one thing. Some children struggle primarily with phonological processing. Others with reading fluency. Others with written expression. Some have co-occurring difficulties with mathematics or attention. Dr. Vini Jhariya identifies the specific pattern unique to your child — and builds the plan around it.",
        },
        {
          title: "Personalised Remedial Education Plan",
          description:
            "Using internationally certified dyslexia specialist methods and a range of evidence-based remedial approaches, Dr. Vini Jhariya builds a structured, personalised remedial education plan. This is not extra tuition. This is targeted teaching — using the specific techniques that work with your child's learning style and profile.",
        },
        {
          title: "School Support & Legal Documentation",
          description:
            "Urjasvini CDC provides accommodation letters for schools covering extra time, reader-writer support, exemption from second language, and other required adjustments. We also provide board examination exemption certificates recognised by CBSE, ICSE, MP Board, and other state boards — ensuring your child is never penalised for a neurological difference.",
        },
      ],
    },

    {
      title: "Your child is entitled to support. We make sure they get it.",
      subtitle:
        "At Urjasvini CDC, Dr. Vini Jhariya provides all the documentation your child's school and examination board require — so you never have to navigate the system alone.",
      type: "cards",
      order: 5,
      items: [
        {
          title: "SLD Assessment Report",
          description:
            "Detailed, clinically precise, legally recognised. Accepted by schools and examination boards across India.",
        },
        {
          title: "School Accommodation Letter",
          description:
            "Covering extra time, reader-writer support, seating adjustments, and modified evaluation methods.",
        },
        {
          title: "Second Language Exemption Certificate",
          description:
            "For children whose dyslexia significantly impacts language learning.",
        },
        {
          title: "Board Examination Exemption Certificate",
          description:
            "Recognised by CBSE, ICSE, MP Board, and other state boards. Ensuring your child is not penalised in high-stakes examinations.",
        },
        {
          title: "IEP Guidance",
          description:
            "Individualised Education Plan recommendations for schools — outlining the specific support your child needs in the classroom.",
        },
        {
          title: "Teacher Sensitisation",
          description:
            "Guidance for schools on how to support children with dyslexia day to day — not just during examinations.",
        },
        {
          title: "Important note",
          description:
            "Many families do not know their child is legally entitled to these accommodations. Dr. Vini Jhariya ensures every family leaves Urjasvini CDC with full clarity on what support is available — and all the documentation to access it.",
        },
      ],
    },

    {
      title:
        "Why families across Indore and Madhya Pradesh choose Urjasvini CDC for dyslexia support.",
      type: "cards",
      order: 6,
      items: [
        {
          title: "Specialist assessment — not a general screening.",
          description:
            "Dr. Vini Jhariya uses comprehensive national and international tools — not a quick checklist. The assessment gives you a complete picture and a legally recognised diagnosis.",
        },
        {
          title: "Remedial education that actually teaches differently.",
          description:
            "Children with dyslexia do not need to try harder — they need to be taught differently. Dr. Vini Jhariya's remedial approach is built around how your child's brain learns — not how a standard curriculum expects them to learn.",
        },
        {
          title: "Full school and board exam support.",
          description:
            "From accommodation letters to board exam exemption certificates — Urjasvini CDC handles all documentation so families do not have to navigate the system alone.",
        },
        {
          title: "Early identification changes everything.",
          description:
            "The earlier dyslexia is identified, the smaller the gap. Dr. Vini Jhariya has worked with children from age 4 — and seen early intervention transform outcomes that would have been very different without it.",
        },
        {
          title: "Indore-based. India-wide online.",
          description:
            "In-clinic assessments and remedial sessions at Urjasvini CDC, Indore. Online consultations and parent guidance for families across Madhya Pradesh and India.",
        },
      ],
    },

    {
      title: "She had been held back twice. Nobody knew why.",
      type: "story",
      order: 7,
      content:
        '"Four years of being told our daughter was slow. One assessment with Dr. Vini and we finally had the truth."\n\nSneha was 9 years old and had been detained in the same class twice. Her parents had tried every tutor, every coaching class, every method of studying. Nothing worked. Teachers called her slow. Her parents were beginning to believe it.\n\nA detailed SLD assessment with Dr. Vini Jhariya at Urjasvini CDC revealed that Sneha had a Specific Learning Disability in reading and writing — something that had gone completely undetected for four years. She was not slow. She was learning in a way that no one had been trained to teach.\n\nWith a structured remedial education plan built specifically for her learning profile, Sneha began making real progress within two months. By the end of the academic year — she had not only passed, she had passed with confidence.\n\n"Four years we thought something was wrong with our daughter. There was nothing wrong with her — there was just no one who knew how to reach her. Dr. Vini did."',
      items: [
        {
          buttonText: "Read More Family Stories",
          buttonLink: "/success-stories",
        },
      ],
    },

    {
      title:
        "Your child does not need to try harder.\nThey need someone who teaches differently.",
      type: "cta",
      order: 8,
      content:
        "The first step is always an assessment. Not a label. A clear, honest picture of how your child learns — and a plan that works with that.\n\nDr. Vini Jhariya and the Urjasvini CDC team are here for families in Indore, across Madhya Pradesh, and online across India.",
      items: [
        {
          buttonText: "Book a Dyslexia Assessment",
          buttonLink: "/contact",
        },
        {
          buttonText: "WhatsApp Us",
          buttonLink: "https://wa.me/917999215093",
        },
      ],
    },
  ],

  faqs: [
    {
      question:
        "My child's school says they are just slow. How do I know if it is dyslexia?",
      answer:
        "The only way to know is a proper SLD assessment. Dyslexia is frequently missed because children learn to compensate — and are labelled as slow, lazy, or inattentive instead. A comprehensive assessment at Urjasvini CDC will give you a clear, accurate answer.",
    },
    {
      question: "At what age can dyslexia be identified?",
      answer:
        "Early signs can be identified from age 4 — before formal reading instruction even begins. A formal SLD diagnosis is typically made from age 6-7 onwards. Dr. Vini Jhariya works with children across all ages — the earlier, the better.",
    },
    {
      question:
        "Does my child need a dyslexia diagnosis for school accommodations?",
      answer:
        "Yes — schools and examination boards require a formal SLD assessment report from a qualified RCI-registered clinical psychologist. Dr. Vini Jhariya provides all documentation required for school accommodations and board exam exemptions.",
    },
    {
      question:
        "What is the difference between dyslexia and being a slow learner?",
      answer:
        "Dyslexia is a specific pattern of difficulty with reading, writing, and spelling — in a child whose general intelligence is average or above. A slow learner has broader cognitive delays affecting multiple areas. The SLD assessment at Urjasvini CDC distinguishes between the two clearly — so the right support is put in place.",
    },
    {
      question: "Can dyslexia be cured?",
      answer:
        "Dyslexia is not cured — it is managed. With the right remedial education approach, children with dyslexia learn to read, write, and perform academically. Many go on to thrive in mainstream education and successful careers. The goal is not to eliminate dyslexia — it is to give your child the tools to work with it.",
    },
    {
      question:
        "My child has already been struggling for years. Is it too late?",
      answer:
        "It is never too late. Dr. Vini Jhariya has worked with adolescents whose dyslexia was identified late — and seen significant progress at every age. The starting point is always an honest assessment of where your child is right now.",
    },
    {
      question:
        "We are not in Indore. Can we still access Urjasvini CDC's dyslexia services?",
      answer:
        "Yes. Dr. Vini Jhariya offers online consultations for families across Madhya Pradesh and India. Assessment guidance, remedial education planning, and parent training can all be conducted online.",
    },
  ],

  isFeatured: true,
  isActive: true,
  displayOrder: 3,
};

const earlyInterventionService = {
  title: "Early Intervention",
  slug: "early-intervention",
  category: "Children",

  pageTitle:
    "Early Intervention for Children | Developmental Support | Urjasvini CDC — Dr. Vini Jhariya",

  metaDescription:
    "Is your child missing milestones? Dr. Vini Jhariya at Urjasvini CDC offers comprehensive early intervention — assessment, therapy & parent guidance for families across India.",

  primaryKeywords: [
    "early intervention child India",
    "child developmental delay",
    "toddler development concerns",
    "early childhood intervention",
    "developmental assessment child",
    "child not talking",
    "child missing milestones",
  ],

  secondaryKeywords: [
    "early intervention Indore",
    "autism early intervention India",
    "speech delay child India",
    "sensory processing child",
    "early intervention Madhya Pradesh",
    "Dr. Vini Jhariya early intervention",
    "Urjasvini CDC early intervention",
    "online early intervention India",
    "child development specialist India",
  ],

  shortDescription:
    "Comprehensive early intervention for children from birth to 6 years — assessment, therapy and parent guidance.",

  description:
    "At Urjasvini Child Development Centre, Dr. Vini Jhariya offers early intervention for children from birth to 6 years — built around assessment, therapy, parent guidance and one truth: the earlier we begin, the further we go.",

  hero: {
    headline: "You noticed something.\nTrust that.",
    subHeadline:
      "When a parent's instinct says something is not right — it is almost always worth listening to. Early intervention exists because the earliest years matter most.",
    paragraph:
      'You have probably been told to wait. By a paediatrician, a relative, a well-meaning friend — "every child develops differently," they said. "He will catch up." "She is just a late bloomer."\n\nAnd yet something in you kept watching. Kept wondering. Kept searching.\n\nThat instinct brought you here. And it was right to.\n\nAt Urjasvini Child Development Centre, Dr. Vini Jhariya offers comprehensive early intervention for children from birth to 6 years — assessment, therapy, and parent guidance — built around one truth: the earlier we begin, the further we go. Every month in the early years is a window. And every window that is used well changes what becomes possible.\n\nFor families in Indore, across Madhya Pradesh, and online across India — Urjasvini CDC is here.',
    trustLine:
      "4.9 stars | 237 Google reviews | Serving families across India & worldwide",
    buttons: [
      {
        text: "Book a Developmental Assessment",
        link: "/contact",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
  },

  sections: [
    {
      title: "Why the early years are unlike any other.",
      type: "text",
      order: 1,
      content:
        "The first six years of a child's life are a period of extraordinary brain development. More neural connections are formed in these years than at any other point in a human life. The brain is, quite literally, at its most plastic — most open to learning, most responsive to input, most capable of change.\n\nThis is why early intervention works. Not because we are fixing something broken — but because we are meeting the brain at its most teachable moment. Giving it the right input, at the right time, in the right way.\n\nWhen a child with autism, developmental delay, speech difficulties, or sensory processing concerns receives structured, evidence-based intervention in the early years — the outcomes are measurably and significantly better than intervention that begins later.\n\nThis is not opinion. This is decades of research, replicated across the world.\n\nWaiting is a choice. But it is never the best one.",
    },

    {
      title: "Signs that may indicate your child needs early intervention.",
      subtitle:
        "Every child develops at their own pace — but there are milestones that matter. If several of these resonate, a comprehensive developmental assessment at Urjasvini CDC is the right next step.",
      type: "cards",
      order: 2,
      items: [
        {
          title: "My child is not meeting milestones",
          items: [
            "Not holding their head up by 3 months",
            "Not sitting without support by 9 months",
            "Not standing with support by 12 months",
            "Not walking independently by 18 months",
            "Not using hands to explore objects by 6 months",
            "Significant delay in fine motor skills — grasping, stacking, drawing",
            "Loss of skills they had previously acquired — regression at any age",
          ],
        },
        {
          title: "My child is not talking",
          items: [
            "No cooing or babbling by 6 months",
            "Not responding to their name by 12 months",
            "No single words by 18 months",
            "No two-word phrases by 24 months",
            "Not pointing to things they want by 12 months",
            "Limited or no gestures — waving, clapping, pointing",
            "Losing words or language they previously had",
            "Speaks but is very difficult to understand beyond age 3",
          ],
        },
        {
          title: "My child shows signs of autism",
          items: [
            "Limited or no eye contact",
            "Does not respond to their name",
            "Not interested in other children",
            "Repetitive movements — rocking, hand flapping, spinning",
            "Intense attachment to specific objects or routines",
            "Significant distress at changes in routine",
            "Does not point to share interest with others",
            "Unusual reactions to sound, light, touch, or taste",
          ],
        },
        {
          title: "My child has sensory concerns",
          items: [
            "Extremely sensitive to sound, light, touch, or texture",
            "Seeks intense sensory input — crashing, spinning, mouthing everything",
            "Significant feeding difficulties — refuses most textures or food groups",
            "Sleep difficulties linked to sensory oversensitivity",
            "Extreme distress in busy or noisy environments",
            "Avoids being touched or held",
          ],
        },
        {
          title: "My child has behavioural concerns beyond their age",
          items: [
            "Extreme tantrums significantly beyond what is expected for their age",
            "Severe separation anxiety in very young children",
            "Aggressive behaviour — hitting, biting, scratching — intense and frequent",
            "Self-injurious behaviour — head banging, hand biting",
            "Hyperactivity significantly beyond typical toddler energy",
            "Inability to transition between activities without extreme distress",
          ],
        },
        {
          title: "Important note",
          description:
            "You do not need to see every sign on this list. If something feels different — if your child's development does not feel on track — trust that feeling and come in. A proper developmental assessment will give you clarity that no amount of waiting ever can.",
        },
      ],
    },

    {
      title:
        "Conditions Dr. Vini Jhariya works with through early intervention.",
      subtitle:
        "Always beginning with a thorough assessment before any intervention begins.",
      type: "cards",
      order: 3,
      items: [
        {
          title: "Autism Spectrum — Early Signs & Intervention",
          description:
            "The earlier autism is identified and addressed, the better the outcome. Urjasvini CDC works with children from birth showing early signs — assessment, profile building, and structured early intervention using national and international approaches.",
        },
        {
          title: "Speech & Language Delay",
          description:
            "Children who are late to talk, difficult to understand, or have limited communication — where the delay is affecting development and daily functioning.",
        },
        {
          title: "Global Developmental Delay",
          description:
            "Children who are significantly behind across multiple developmental domains — motor, language, cognitive, and social — where a comprehensive assessment and coordinated intervention plan is essential.",
        },
        {
          title: "Sensory Processing Difficulties",
          description:
            "Children whose sensory sensitivities — to sound, touch, texture, movement, or light — are significantly affecting their daily functioning, feeding, sleep, or learning.",
        },
        {
          title: "Developmental Delay — Cognitive & Learning",
          description:
            "Children whose cognitive development is progressing more slowly than expected — where early structured support can significantly change long-term outcomes.",
        },
        {
          title: "Motor Delays — Gross & Fine Motor",
          description:
            "Children who are delayed in sitting, standing, walking, or in the development of fine motor skills — where early intervention supports the physical foundation for all future learning.",
        },
        {
          title: "Feeding Difficulties",
          description:
            "Young children with significant feeding difficulties — related to sensory processing, oral motor development, or behavioural patterns around food — where early intervention prevents long-term nutritional and developmental impact.",
        },
        {
          title: "Attachment & Parent-Child Bonding Concerns",
          description:
            "Very young children where the parent-child relationship needs support — building secure attachment as the foundation of all emotional and social development.",
        },
        {
          title: "Premature Birth & NICU-Related Developmental Concerns",
          description:
            "Premature babies and NICU graduates whose developmental trajectory needs careful monitoring and early structured support.",
        },
        {
          title: "Genetic Conditions Affecting Development",
          description:
            "Children with Down Syndrome or other genetic conditions — where early intervention maximises developmental potential and builds the strongest possible foundation for the years ahead.",
        },
        {
          title: "Regression — Loss of Previously Acquired Skills",
          description:
            "Children who had skills — words, motor abilities, social engagement — and have lost them. Regression at any age is a clinical signal that requires immediate assessment.",
        },
      ],
    },

    {
      title: "How early intervention works at Urjasvini CDC.",
      subtitle:
        "Assessment first. Always. Because the right intervention can only be built on the right understanding.",
      type: "steps",
      order: 4,
      content:
        "No two children present the same way. No two families have the same circumstances. This is why early intervention at Urjasvini CDC is never a fixed programme — it is a personalised plan, built around your child's specific profile and your family's specific situation.",
      items: [
        {
          title: "Comprehensive Developmental Assessment",
          description:
            "Dr. Vini Jhariya conducts a thorough developmental assessment — covering motor development, language and communication, cognitive development, social-emotional functioning, sensory processing, and adaptive behaviour. The assessment builds your child's complete developmental profile — a clear, honest picture of where they are and what they need.",
        },
        {
          title: "Report Discussion & Goal Setting",
          description:
            "The assessment findings are explained to parents in full — in plain language, with complete clarity. Goals are set together. A personalised early intervention plan is built around those goals — specific to your child, not borrowed from a template.",
        },
        {
          title: "Intervention Begins",
          description:
            "Based on your family's situation — the intervention is structured in the way that works best for you. See the Two Ways We Work section for how we work with both local and outstation families.",
        },
      ],
    },

    {
      title: "Built around your child. And your family's life.",
      type: "two-column",
      order: 5,
      items: [
        {
          title: "Track A — Families in Indore & Nearby",
          description:
            "Your child attends Urjasvini CDC regularly for structured in-clinic early intervention sessions — overseen and supervised by Dr. Vini Jhariya.\n\nA detailed home programme is provided — specific activities and strategies for parents to carry out between sessions.\n\nBecause what happens in the clinic is only part of the story. What happens at home, every day, with the people your child loves most — is where the real change builds.\n\nFor parents who want structured training — our parent training courses are available separately. See the Courses page for details.",
        },
        {
          title: "Track B — Families from Other Cities & States",
          description:
            "Distance is not a barrier to early intervention. Urjasvini CDC works with families from across India — and the world — with a customised hybrid model built around your situation.\n\nWhen you visit — intensive assessment and in-clinic therapy sessions are scheduled. Parents are trained directly and thoroughly during the visit.\n\nA detailed home programme is designed — specific, practical, and tailored to your child's goals and your home environment.\n\nBetween visits — Dr. Vini Jhariya and the Urjasvini CDC team conduct regular online sessions to monitor your child's progress, guide you through the home programme, troubleshoot challenges, and adjust the plan as your child grows.\n\nWhen the time is right — your child returns to Urjasvini CDC for the next phase of in-clinic therapy.\n\nYou are never alone in this. Even from a distance.",
        },
      ],
    },

    {
      title: "Every month matters. Here is why.",
      type: "text",
      order: 6,
      content:
        "Parents often ask — is my child too young for intervention? Is it too early to worry?\n\nThe honest answer is this: in early childhood, there is no such thing as too early. There is only too late.\n\nThe brain's plasticity — its ability to form new connections, adapt, and learn — is at its peak in the first six years of life. Intervention that begins at 18 months achieves outcomes that are measurably different from intervention that begins at 3 years. Intervention at 3 years achieves outcomes that are measurably different from intervention at 5.\n\nThis does not mean that intervention later is useless. It never is. Children make progress at every age — and we have seen it.\n\nBut early is better. Earlier is better still.\n\nIf something in you is saying — something is not right — do not wait for someone to tell you it is time. Come in. Let us look together.",
    },

    {
      title: "She had no words at 2. She started school at 5.",
      type: "story",
      order: 7,
      content:
        '"Our daughter was 2 years old and had no words. Our doctor told us to wait and watch."\n\nAisha\'s parents came to Urjasvini CDC after months of being told she would talk when she was ready. She had no words, limited eye contact, and was in her own world much of the time. Their family had told them to relax. But something in them said — we cannot wait.\n\nAssessment at Urjasvini CDC identified early signs that needed immediate attention. An early intervention programme was begun the same week — structured, play-based, and involving her parents at every step. A detailed home programme was designed. Regular sessions were held. Progress was tracked.\n\nAt age 3, Aisha had words. At age 4, she had sentences. At age 5, she started school alongside her peers.\n\n"People told us we were overreacting. Dr. Vini told us we were right to come. That validation — and then the action — changed our daughter\'s life."',
      items: [
        {
          buttonText: "Read More Family Stories",
          buttonLink: "/success-stories",
        },
      ],
    },

    {
      title:
        "Your instinct brought you here.\nLet us take it from here together.",
      type: "cta",
      order: 8,
      content:
        "Every child who walks into Urjasvini CDC comes with a family that is worried, exhausted, and hoping. Our job — from the very first assessment — is to turn that worry into clarity, that exhaustion into direction, and that hope into a plan.\n\nThe earlier we begin, the further we go.\n\nDr. Vini Jhariya and the Urjasvini CDC team are here for families in Indore, across Madhya Pradesh, and online across India and the world.",
      items: [
        {
          buttonText: "Book a Developmental Assessment",
          buttonLink: "/contact",
        },
        {
          buttonText: "WhatsApp Us",
          buttonLink: "https://wa.me/917999215093",
        },
      ],
    },
  ],

  faqs: [
    {
      question:
        "My child is only a few months old. Is it too early to come for an assessment?",
      answer:
        "No. Early intervention at Urjasvini CDC begins from birth. Developmental concerns can be identified and addressed from the very earliest months of a child's life. If something feels different — come in. The earlier we begin, the better the outcome.",
    },
    {
      question: "My paediatrician said to wait and watch. Should I?",
      answer:
        "We respect every medical professional's judgement. But if something does not feel right to you — as the parent who watches your child every single day — a second opinion from a developmental specialist is always appropriate. A proper developmental assessment will either reassure you completely or give you the answers and the plan you need. Neither outcome is a bad one.",
    },
    {
      question: "Does my child need a diagnosis before starting intervention?",
      answer:
        "No. If there are clear developmental concerns, we can begin intervention while the assessment process is ongoing. We do not make families wait when a child clearly needs support.",
    },
    {
      question:
        "We are not near Urjasvini CDC. Can we still access early intervention?",
      answer:
        "Yes. We work with families from across India through our customised hybrid model — combining in-clinic visits with a detailed home programme and regular online sessions to monitor progress and guide parents between visits.",
    },
    {
      question: "How long does early intervention take?",
      answer:
        "There is no single honest answer — it depends entirely on your child's profile, their age, and the intensity of the plan. We review progress regularly, adjust the plan as your child grows, and work towards goals that are always specific, always measurable, and always meaningful.",
    },
    {
      question: "Will I be involved in my child's intervention?",
      answer:
        "Always. Parents are central to early intervention at Urjasvini CDC — not bystanders. A detailed home programme is provided for every family. For parents who want structured training — our parent training courses are available separately. See the Courses page.",
    },
    {
      question:
        "My child has already been assessed elsewhere. Can we still come to Urjasvini CDC?",
      answer:
        "Yes. We will review existing assessments, build on what has already been done, and move forward from where your child is right now. It is never too late to begin — and it is never too late to begin better.",
    },
  ],

  isFeatured: true,
  isActive: true,
  displayOrder: 4,
};

const childCounsellingService = {
  title: "Child Counselling",
  slug: "child-counselling-indore",
  category: "Children",

  pageTitle: "Child Counselling in Indore | Child Therapist | Urjasvini CDC",

  metaDescription:
    "Is your child struggling emotionally or behaviourally? Dr. Vini Jhariya at Urjasvini CDC, Indore offers warm, evidence-based child counselling for children aged 4-12.",

  primaryKeywords: [
    "child counselling Indore",
    "child therapist Indore",
    "child psychologist counselling Indore",
    "emotional support child Indore",
    "child therapy Indore",
  ],

  secondaryKeywords: [
    "child anxiety counselling Indore",
    "anger issues child Indore",
    "school refusal child Indore",
    "child behaviour therapy Indore",
    "child grief counselling Indore",
    "child fear phobia Indore",
    "bullying counselling child Indore",
    "child counsellor Madhya Pradesh",
    "Dr. Vini Jhariya child counselling",
  ],

  shortDescription:
    "Warm, evidence-based counselling for children aged 4 to 12 who are struggling emotionally, behaviourally, socially, or at school.",

  description:
    "At Urjasvini Child Development Centre in Indore, Dr. Vini Jhariya offers warm, evidence-based counselling for children aged 4 to 12. Every session is built around the child — their pace, their language, their world.",

  hero: {
    headline:
      "Something is hurting your child.\nLet us find out what — and help them through it.",
    subHeadline:
      "Children do not always have the words for what they are feeling. That is what counselling is for.",
    paragraph:
      "When a child is angry, withdrawn, fearful, defiant, or simply not themselves — it is rarely without reason. Something is happening inside them that they do not yet have the language or the tools to express.\n\nAt Urjasvini Child Development Centre in Indore, Dr. Vini Jhariya offers warm, evidence-based counselling for children aged 4 to 12. Every session is built around the child — their pace, their language, their world. Parents are involved thoughtfully throughout — because a child's healing does not happen in isolation.\n\nYou do not need to have all the answers before you come. You just need to take the first step.",
    trustLine:
      "4.9 stars | 237 Google reviews | Serving families across Indore & Madhya Pradesh",
    buttons: [
      {
        text: "Book a Consultation",
        link: "/contact-us",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
  },

  sections: [
    {
      title: "Signs your child may benefit from counselling.",
      subtitle:
        "Children communicate through behaviour. When something shifts — at home, at school, or inside themselves — it shows. Here are some signs that counselling may help.",
      type: "cards",
      order: 1,
      items: [
        {
          title: "Emotional signs",
          items: [
            "Persistent sadness, tearfulness, or low mood that does not lift",
            "Excessive worry or fear about everyday situations",
            "Intense fears or phobias that are affecting daily life",
            'Low self-esteem — saying things like "I am stupid", "nobody likes me", "I am bad"',
            "Difficulty managing emotions — crying intensely, shutting down, or exploding over small things",
            "Grief after a loss that is not easing with time",
            "Feeling deeply different from everyone around them",
          ],
        },
        {
          title: "Behavioural signs",
          items: [
            "Sudden or significant change in behaviour — becoming withdrawn, aggressive, or clingy",
            "Defiance, anger outbursts, or hitting that has intensified",
            "Refusing to go to school or crying intensely at drop-off",
            "Difficulty separating from parents — beyond what is expected for their age",
            "Being bullied — or bullying others",
            "Regression — bedwetting, thumb-sucking, or baby talk after having moved past these stages",
            "Persistent lying or stealing rooted in emotional need",
            "Anxiety-related habits — nail biting, hair pulling, skin picking",
          ],
        },
        {
          title: "Social signs",
          items: [
            "Withdrawing from friends or activities they previously enjoyed",
            "Difficulty making or keeping friends",
            "Feeling left out, rejected, or different from peers",
            "Speaks at home but becomes completely silent at school or in social settings",
          ],
        },
        {
          title: "Situational signs",
          items: [
            "Going through a significant life change — parental separation, new sibling, school change, bereavement",
            "Affected by conflict or difficulty at home",
            "Carrying something that the family is not sure how to address",
          ],
        },
        {
          title: "Important note",
          description:
            "You do not need to wait until things are serious. If something feels off — trust that feeling. Early support is always easier than waiting.",
        },
      ],
    },

    {
      title: "What child counselling at Urjasvini CDC addresses.",
      subtitle:
        "Dr. Vini Jhariya works with children across a wide range of emotional, behavioural, and social concerns — always beginning with understanding the child as a whole, not just the presenting concern.",
      type: "cards",
      order: 2,
      items: [
        {
          title: "Emotional Concerns",
          items: [
            "Anxiety & Worry — Children who worry excessively, feel scared about everyday situations, or carry anxiety that is affecting their sleep, school, or relationships.",
            "Separation Anxiety — Children who struggle intensely with being away from parents — at school drop-off, bedtime, or any situation involving separation from their caregiver.",
            "Fears & Phobias — Children with intense, specific fears that are limiting daily life — fear of the dark, animals, water, social situations, or anything that has become overwhelming.",
            "Emotional Sensitivity — Children who feel everything deeply and intensely — overwhelmed by emotions that others around them seem to manage more easily.",
            "Excessive Crying — Children who cry frequently, intensely, or over situations that seem small — where the emotional response is significantly bigger than the trigger.",
            "Guilt & Shame — Children who constantly apologise, blame themselves for everything, or carry a deep sense of not being good enough.",
            "Loneliness — Children who feel deeply misunderstood — by peers, by family, or by the world around them.",
            "Nightmares & Sleep Difficulties — Children with persistent nightmares, fear of sleeping alone, or sleep difficulties rooted in emotional distress.",
            "Low Self-Esteem & Confidence — Children who consistently put themselves down, give up easily, avoid challenges, or believe they are not good enough.",
            "Grief & Loss — Children struggling to process the loss of a loved one, a grandparent, a pet, or any significant loss — where grief is affecting daily functioning.",
          ],
        },
        {
          title: "Behavioural Concerns",
          items: [
            "Anger & Aggression — Children whose anger is intense, frequent, or expressed in ways affecting relationships and daily functioning — at home or at school.",
            "Defiant Behaviour — Children who are consistently oppositional, refuse to follow instructions, and are in constant conflict with parents and teachers.",
            "Tantrums Beyond Expected Age — Children whose tantrums are significantly beyond what is developmentally expected — in frequency, intensity, or duration.",
            "Lying — Children who lie persistently and habitually — where the behaviour is affecting trust and relationships at home and school.",
            "Stealing — Children who steal repeatedly — where the behaviour is rooted in an emotional need that has not yet been identified.",
            "Nail Biting, Hair Pulling & Skin Picking — Anxiety-related habits that have become persistent and are causing distress or physical impact.",
            "Bedwetting Related to Emotional Stress — Children who have returned to bedwetting after a period of being dry — where the cause is emotional rather than physical.",
            "Screen Addiction — Children whose screen use has become compulsive — where removing the screen triggers intense distress and the screen is being used as an emotional escape.",
            "Food Refusal or Emotional Eating — Children whose relationship with food is significantly affected by their emotional state.",
          ],
        },
        {
          title: "Social Concerns",
          items: [
            "Bullying — Children who are being bullied and need support processing the emotional impact — building resilience, confidence, and strategies for difficult peer situations.",
            "Socialisation Difficulties — Children who struggle to make friends, feel left out, or find social situations overwhelming or confusing.",
            "Selective Mutism — Children who speak comfortably at home but become unable to speak in social settings — particularly at school. A specific anxiety condition that responds well to the right therapeutic approach.",
            "Feeling Different — Children who feel fundamentally different from their peers — and carry that difference as a burden rather than something to understand and embrace.",
            "Jealousy — Children with extreme jealousy — of a sibling, a peer, or anyone in their world — where the emotion is significantly affecting relationships and wellbeing.",
          ],
        },
        {
          title: "School-Related Concerns",
          items: [
            "School Refusal — Children who refuse to attend school, develop physical complaints on school days, or whose anxiety around school is affecting the entire family.",
            "Exam Anxiety — Children in primary school who experience significant anxiety around tests and evaluations — developing a fear of failure that is affecting their relationship with learning.",
            "Fear of Failure — Children who avoid any situation where they might not succeed — where the fear of getting something wrong has become a barrier to trying at all.",
            "Performance Anxiety — Children who freeze in performance situations — class presentations, sports, music, dance — despite being capable and having prepared.",
          ],
        },
        {
          title: "Family & Life Situation Concerns",
          items: [
            "Parental Separation — Children affected by their parents separating or divorcing — processing the changes, the emotions, and finding a sense of stability and safety.",
            "New Sibling Adjustment — Children whose behaviour has significantly changed after the arrival of a new baby — processing feelings of displacement or loss of parental attention.",
            "Moving to a New City or School — Children struggling to adjust to significant change — a new home, a new city, a new school — and the loss of familiarity and friendships.",
            "Domestic Conflict — Children affected by conflict at home — between parents or family members — and carrying the emotional weight of what they witness.",
            "Single Parenting Impact — Children navigating the emotional landscape of living with one parent — missing the absent parent and adjusting to changed family dynamics.",
            "Blended Family Adjustment — Children adjusting to a new family structure — a step-parent, step-siblings, or a restructured home — and the emotional complexity that comes with it.",
          ],
        },
        {
          title: "Identity & Development Concerns",
          items: [
            "Highly Sensitive Child (HSP) — Children who are wired to feel and process everything more deeply than most — where understanding and supporting that sensitivity is essential for their wellbeing.",
            "Gender Identity Questions — Children exploring questions about gender identity — where a safe, warm, and accepting space to explore is what they need most.",
          ],
        },
      ],
    },

    {
      title: "How child counselling works at Urjasvini CDC.",
      subtitle:
        "Every child is different. Every concern is different. Dr. Vini Jhariya's approach is built around the child — their age, their personality, their world.",
      type: "text",
      order: 3,
      content:
        "Child counselling at Urjasvini CDC is not one thing. It is a carefully chosen combination of approaches — selected based on what each individual child needs.\n\nFor younger children, Dr. Vini Jhariya works primarily through play, art, music, and sand — because children do not process their inner world through words alone. They process through movement, creativity, and imagination. The therapy room becomes a space where a child can express, explore, and heal — in the way that comes most naturally to them.\n\nFor older children, Dr. Vini Jhariya uses approaches including Cognitive Behavioural Therapy (CBT), Dialectical Behaviour Therapy (DBT), Acceptance and Commitment Therapy (ACT), mindfulness, and more — always adapted to the child's developmental level and presenting concern.\n\nParents are central to the process — always.\n\nChild counselling at Urjasvini CDC is not something that happens behind closed doors while parents wait outside. Parents are involved throughout — with dedicated parent sessions built into the counselling plan. The frequency and structure of parent involvement is decided based on what the child needs — but the involvement is never optional. Because a child heals in the context of their family.",
    },

    {
      title: "Approaches Dr. Vini Jhariya draws from.",
      subtitle:
        "No single approach works for every child. Dr. Vini Jhariya uses a range of evidence-based modalities — chosen and combined based on what each child's specific situation calls for.",
      type: "badges",
      order: 4,
      items: [
        {
          title:
            "Play Therapy — the primary language of children, used to help them express and process what words cannot",
        },
        {
          title:
            "Arts-Based Therapy — creative expression as a pathway to emotional healing",
        },
        {
          title:
            "Sand Therapy — helping children externalise and work through their inner world",
        },
        {
          title:
            "Music Therapy — using rhythm, sound, and music as a therapeutic medium",
        },
        {
          title:
            "Cognitive Behavioural Therapy (CBT) — identifying and changing unhelpful thought and behaviour patterns",
        },
        {
          title:
            "Dialectical Behaviour Therapy (DBT) — building emotional regulation, distress tolerance, and interpersonal skills",
        },
        {
          title:
            "Acceptance and Commitment Therapy (ACT) — helping children relate to difficult thoughts and feelings differently",
        },
        {
          title:
            "Mindfulness-Based Interventions — building present-moment awareness and self-regulation",
        },
        {
          title:
            "Trauma-Informed Therapy — for children who have experienced difficult or overwhelming events",
        },
        {
          title:
            "Narrative Therapy — helping children rewrite the stories they tell about themselves",
        },
        {
          title:
            "Parent-Child Interaction Guidance — supporting the parent-child relationship as a therapeutic tool",
        },
        {
          title:
            "And much more — always selected based on what your child needs.",
        },
      ],
    },

    {
      title: "What to expect from child counselling sessions at Urjasvini CDC.",
      type: "steps",
      order: 5,
      items: [
        {
          title: "Initial Consultation",
          description:
            "Dr. Vini Jhariya meets with the parents first — understanding the child's history, the concerns, the family context, and what you are hoping counselling will achieve. This conversation shapes everything that follows.",
        },
        {
          title: "Sessions with the Child",
          description:
            "The counselling sessions are planned based on the child's age, presenting concern, and individual needs. Dr. Vini Jhariya works with the child over a planned set of sessions — then meets with parents to share progress and plan the next phase. This cycle of child sessions and parent sessions continues based on what the child needs — always flexible, always purposeful.",
        },
        {
          title: "Progress & Closure",
          description:
            "As the child makes progress, session frequency reduces naturally. Dr. Vini Jhariya works towards a clear, planned closure — building the child's independence and the parent's confidence to support their child going forward. The goal is always for the child to not need us anymore.",
        },
      ],
    },

    {
      title: "He was not angry. He was struggling.",
      type: "story",
      order: 6,
      content:
        '"Hamaara beta haath uthaane laga tha — humein samajh nahi aa raha tha kya karein."\n\nRavi ki mummy pehli baar clinic mein aayi thi toh unki aankhen bhari hui thi. Unka 8 saal ka beta ghar mein sabpe chilaata tha, toys phenk deta tha, aur kabhi kabhi unhe bhi maar deta tha. School se complaints aa rahi thi. Relatives keh rahe the — "Zyada mat uthao, spoilt ho gaya hai."\n\nJab Dr. Vini ne Ravi ko dekha — unhone kuch alag hi paya. Ravi frustrated tha kyunki woh padhne mein peeche tha aur usse express karna nahi aata tha. Woh "spoilt" nahi tha — woh struggle kar raha tha aur koi samajh nahi raha tha.\n\nTargeted behavioural therapy aur parent coaching ke baad, 3 mahine mein Ravi ka behaviour completely badal gaya. Aaj woh apni feelings words mein express karta hai.\n\n"Dr. Vini ne pehli baar humein feel karaaya ki yeh humaari galti nahi hai. Aur Ravi ki bhi nahi."',
      items: [
        {
          buttonText: "Read More Family Stories",
          buttonLink: "/success-stories",
        },
      ],
    },

    {
      title: "Your child does not have to carry this alone.\nNeither do you.",
      type: "cta",
      order: 7,
      content:
        "Whatever your child is going through — there is support available. And the earlier that support begins, the easier the journey.\n\nDr. Vini Jhariya and the Urjasvini CDC team are here for families in Indore, across Madhya Pradesh, and online across India.",
      contactLine:
        "+91 7999215093 | Mon-Fri: 11 AM - 7 PM | Saturday: By appointment | thechildpsychologistvini@gmail.com",
      items: [
        {
          buttonText: "Book a Consultation",
          buttonLink: "/contact-us",
        },
        {
          buttonText: "WhatsApp Us",
          buttonLink: "https://wa.me/917999215093",
        },
      ],
    },
  ],

  faqs: [
    {
      question:
        "My child refuses to talk about their feelings. Will counselling even work?",
      answer:
        "This is the most common concern parents have — and it is completely understandable. Dr. Vini Jhariya does not expect children to sit and talk about their feelings. With younger children especially, counselling happens through play, art, sand, and creativity — not conversation. Children do not need to talk to heal. They need the right space and the right person.",
    },
    {
      question: "How many sessions will my child need?",
      answer:
        "It varies — based on the child's age, the concern, and how the child responds. Dr. Vini Jhariya does not give a fixed number upfront because every child is different. Progress is reviewed regularly and you are always kept informed. Sessions continue only as long as they are needed.",
    },
    {
      question: "Will you tell me what my child says in sessions?",
      answer:
        "Confidentiality is important — even with children. Dr. Vini Jhariya will share with parents what is clinically important for them to know, and will always discuss this with the child first where appropriate. The goal is to build trust with the child while keeping parents meaningfully involved.",
    },
    {
      question: "My child is only 4. Is that too young for counselling?",
      answer:
        "No. Dr. Vini Jhariya works with children from age 4 — using play-based approaches that are entirely appropriate for young children. In fact, the younger the child, the more naturally they respond to therapeutic play.",
    },
    {
      question: "Do I need to be present during my child's sessions?",
      answer:
        "Parent involvement is structured thoughtfully — with dedicated parent sessions built into the counselling plan. You will not sit in every session, but you will never be left out. The frequency and format of parent sessions is decided based on what your child needs.",
    },
    {
      question: "We are not in Indore. Can we access child counselling online?",
      answer:
        "Yes. Dr. Vini Jhariya offers online child counselling for families across Madhya Pradesh and India. Some approaches work particularly well online — and Dr. Vini Jhariya will advise on the best format for your child's age and concern.",
    },
  ],

  isFeatured: true,
  isActive: true,
  displayOrder: 5,
};

const adolescentCounsellingService = {
  title: "Adolescent Counselling",
  slug: "adolescent-counselling-indore",
  category: "Children",

  pageTitle:
    "Adolescent Counselling in Indore | Teen Therapist | Urjasvini CDC",

  metaDescription:
    "Is your teenager struggling — or are you the teenager looking for someone who gets it? Dr. Vini Jhariya at Urjasvini CDC, Indore. Honest, judgement-free adolescent counselling.",

  primaryKeywords: [
    "adolescent counselling Indore",
    "teen counselling Indore",
    "teenager therapist Indore",
    "teen mental health Indore",
    "adolescent therapy Indore",
  ],

  secondaryKeywords: [
    "teen anxiety Indore",
    "teenage depression Indore",
    "teenager behaviour Indore",
    "teen counsellor Madhya Pradesh",
    "gaming addiction teenager Indore",
    "screen addiction teenager Indore",
    "Korean drama addiction teenager",
    "anger management teenager Indore",
    "self harm teenager counselling",
    "teen panic attacks Indore",
    "cyberbullying teenager counselling",
    "Dr. Vini Jhariya adolescent counselling",
  ],

  shortDescription:
    "Honest, judgement-free counselling for teenagers aged 13 to 18 — and the families trying to reach them.",

  description:
    "At Urjasvini CDC, adolescent counselling is built around the teenager’s real world — screens, identity, pressure, relationships, family conflict, anxiety, academics and emotional overwhelm.",

  hero: {
    headline:
      "Something has changed in your teenager.\nOr maybe — your teenager is the one reading this.",
    subHeadline: "Either way — you have come to the right place.",
    paragraph:
      "Teenagers do not come with instructions. And the teenager of today is navigating a world that is more complex, more connected, and more overwhelming than any previous generation has faced. When your teenager withdraws, rages, shuts down, or makes choices that frighten you — it is not always defiance. Sometimes it is a cry for something they do not know how to ask for.\n\nAt Urjasvini Child Development Centre in Indore, Dr. Vini Jhariya works with adolescents aged 13 to 18 — and with the families who love them and do not know how to reach them anymore.\n\nAnd if you are the one reading this — hello.\n\nYou do not have to be in crisis to come here. You do not have to explain everything. You do not have to have your parents' permission to want someone to talk to.\n\nDr. Vini Jhariya is not here to judge you, report you, or take sides. She is here to listen — to the version of you that nobody else is hearing right now.",
    trustLine:
      "4.9 stars | 237 Google reviews | Serving families and teenagers across Indore & Madhya Pradesh",
    buttons: [
      {
        text: "Book a Consultation",
        link: "/contact",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
  },

  sections: [
    {
      title: "The world your teenager is navigating right now.",
      type: "text",
      order: 1,
      content:
        "The teenager of 2025 is not the teenager of ten years ago.\n\nThey are comparing their lives to curated highlight reels on screens their parents cannot see. They are forming relationships — real and virtual — that nobody knows exist. They are being exposed to things at 13 that no previous generation encountered so young, so unguided, and so alone.\n\nAnd they are doing all of this while simultaneously being expected to perform academically, make life-defining career choices, and navigate the most turbulent emotional years of their lives.\n\nIt is a lot.\n\nAt Urjasvini CDC, Dr. Vini Jhariya understands the world your teenager is actually living in — not the world we wish they were living in. That honesty is the foundation of everything that happens in a counselling session.",
    },

    {
      title: "What brings teenagers and their families to Dr. Vini Jhariya.",
      subtitle:
        "Every situation is different. Every teenager is different. Here are the concerns Dr. Vini Jhariya works with most — named honestly, without judgment.",
      type: "cards",
      order: 2,
      items: [
        {
          title: "Digital & Screen Concerns",
          items: [
            "Social Media Addiction — Teenagers for whom social media has become compulsive — constantly checking, comparing, and performing for an online audience at the cost of real relationships, sleep, and self-worth.",
            "Gaming Addiction — Teenagers for whom gaming has stopped being recreation and become an all-consuming escape — where hours, sleep, meals, and relationships disappear into the game.",
            "AI Relationships & Virtual Dependency — Teenagers who have formed deep emotional attachments to AI companions and prefer virtual connection to real human relationships.",
            "Korean Drama & K-Pop Obsession — Teenagers deeply consumed by Korean dramas and K-pop culture — wanting to look, dress, eat, and live like Korean celebrities.",
            "Influencer Culture & Fame Obsession — Teenagers who want to be influencers, who measure their worth in followers and likes, and who feel fundamentally worthless if they are not famous.",
            "Cyberbullying & Online Trolling — Teenagers being bullied, trolled, or targeted online through social media, group chats, or gaming platforms.",
            "Sexting & Online Exploitation — Teenagers who have been pressured into sharing images, received unsolicited content, or are being exploited online.",
            "Dangerous Online Trends & Challenges — Teenagers drawn into physically or emotionally dangerous online trends.",
            "Dark Web Curiosity — Teenagers exploring harmful or disturbing content online out of curiosity or peer influence.",
            "FOMO & Social Media Comparison — Teenagers who constantly compare their lives to what they see online — and always come up short.",
            "Sleep Reversal — Teenagers who are awake all night on screens, gaming, or simply unable to sleep — and sleeping through the day.",
          ],
        },
        {
          title: "Mental Health Concerns",
          items: [
            "Anxiety That Will Not Switch Off — Constant worry, overthinking, physical anxiety signs — a mind that will not rest and a body that is always on edge.",
            "Depression & Low Mood — Persistent sadness, loss of interest, feeling empty or hopeless — where getting through the day takes everything they have.",
            "Panic Attacks — Sudden, overwhelming episodes of physical anxiety — racing heart, difficulty breathing, dizziness, and fear that something terrible is about to happen.",
            "OCD in Teenagers — Intrusive thoughts, compulsive rituals, excessive checking, and the exhausting cycle of obsession and compulsion.",
            "Self-Harm — Teenagers who hurt themselves as a way of managing emotional pain they cannot express any other way.",
            "Suicidal Thoughts — Teenagers experiencing thoughts of not wanting to be here. This is always taken seriously at Urjasvini CDC.",
            "Eating Concerns — Teenagers restricting food, crash dieting, calorie obsessing, or using food as emotional regulation.",
            "Identity Confusion — Questions about who they are — their values, their place in the world, their gender identity, their sexuality.",
            "LGBTQ+ Identity & Acceptance — Teenagers navigating sexuality or gender identity in a space of complete safety, warmth, and non-judgment.",
          ],
        },
        {
          title: "Behavioural Concerns",
          items: [
            "Verbal Aggression Towards Parents — Teenagers who curse at parents, say things that cannot be unsaid, and whose relationship with the family has become a daily conflict zone.",
            "Wanting Everything Without Effort — Teenagers who want the lifestyle, the status, the success — but are not willing to engage with the process.",
            "Stealing & Impulsive Risk-Taking — Teenagers who steal, where the behaviour is rarely about the object and almost always about something emotional underneath.",
            "Vaping & E-Cigarette Use — Teenagers who have started vaping or using e-cigarettes, often as a response to anxiety or peer pressure.",
            "Peer Pressure & Substance Exposure — Teenagers being pressured by peers into behaviour, substances, or situations that conflict with their values.",
            "Truancy & School Bunking — Teenagers who regularly bunk school, lie about attendance, or have stopped engaging with education entirely.",
            "Running Away or Threatening To — When a teenager reaches this point, it is not defiance — it is desperation.",
            "Money & Financial Dishonesty — Teenagers who demand excessive money, spend compulsively, or are financially dishonest.",
          ],
        },
        {
          title: "Relationship & Social Concerns",
          items: [
            "Social Withdrawal & Isolation — The teenager who has retreated into their room, stopped socialising, and whose world has shrunk.",
            "Toxic Friendships — Friendships that drain, manipulate, exploit, or harm.",
            "Concerning Relationships — Relationships that seem unhealthy, controlling, or pulling the teenager away from family and future.",
            "Breakup & Heartbreak — First heartbreak that feels like the end of the world — because for a teenager, it often does.",
            "Online & Long-Distance Relationships — Relationships formed entirely online and the safety concerns that come with them.",
            "Pressure to Be in a Relationship — Teenagers who feel abnormal or lesser because they are not in a romantic relationship.",
            "Sexual Anxiety & Intimacy Concerns — Teenagers carrying anxiety, guilt, or confusion around physical intimacy.",
            "Early Exposure to Sexual Content — Teenagers exposed to sexual content before they had the emotional framework to process it.",
          ],
        },
        {
          title: "Academic & Career Concerns",
          items: [
            "Academic Pressure & Board Exam Stress — The weight of Class 10 and 12 boards, parental expectations, and peer comparison.",
            "Exam Anxiety — Teenagers who freeze before exams, go blank in the examination hall, or whose anxiety affects results and mental health.",
            "Fear of Failure — Teenagers who avoid any situation where they might not succeed.",
            "Career Confusion — Teenagers at the crossroads of stream selection, pulled in too many directions at once.",
            "Truancy & Disengagement from Education — Teenagers who have completely disengaged from learning — not out of laziness, but out of something deeper.",
          ],
        },
        {
          title: "Family & Life Situation Concerns",
          items: [
            "Parental Separation & Divorce — Teenagers affected by their parents separating — processing grief, loyalty conflicts, anger, and restructuring of home.",
            "Pressure from High-Achieving Families — Teenagers carrying the weight of family legacy, parental ambition, and impossible expectations.",
            "Favouritism — Teenagers who feel consistently less loved, less valued, or less seen than a sibling.",
            "Parental Conflict — Teenagers caught in the middle of parental fights, asked to take sides, or living with chronic conflict at home.",
            "NRI & Returned-from-Abroad Adjustment — Teenagers struggling to readjust to India after living abroad.",
            "Grief & Loss — Teenagers carrying the loss of someone important in a world that expects them to bounce back quickly.",
          ],
        },
        {
          title: "Identity & Self Concerns",
          items: [
            "Self-Esteem & Body Image — Teenagers who compare themselves constantly and always come up short.",
            "Nobody Understands Me — The teenager who feels fundamentally alone — misunderstood by parents, disconnected from peers, and carrying something they cannot name.",
            "Confusion About the Future — What stream to choose, what career to pursue, who to be — questions that feel impossibly large at 16.",
            "Wanting to Be Someone Else — Teenagers consumed by an identity — a K-pop idol, influencer, or fictional character — because their own identity feels insufficient.",
          ],
        },
      ],
    },

    {
      title: "If you are the one reading this.",
      type: "quote",
      order: 3,
      content:
        'You do not have to be falling apart to deserve support.\n\nYou do not have to explain yourself perfectly. You do not have to have a diagnosis. You do not have to convince anyone that what you are feeling is real or serious enough.\n\nIf something is heavy — it is heavy. That is enough.\n\nDr. Vini Jhariya has sat with teenagers who were angry, teenagers who were silent, teenagers who said "I don\'t know" to every question, and teenagers who had been carrying something for years and had never told anyone.\n\nThis is a space where you will not be lectured. You will not be told how you should be feeling or who you should be.\n\nWhat you share stays between us — with one exception. If Dr. Vini Jhariya believes you or someone else may be at risk of harm, she will always tell you first before involving anyone else. That is a promise.\n\nYou will just be heard.\n\nThat is where everything begins.\n\nYou can come alone. You can come with your parents. You can WhatsApp first if walking in feels like too much.\n\nBut come.',
    },

    {
      title: "How adolescent counselling works at Urjasvini CDC.",
      type: "text",
      order: 4,
      content:
        "Adolescent counselling is not the same as child counselling — and it is not the same as adult therapy. It sits in a unique space that requires a specific understanding of the adolescent mind, the adolescent world, and the adolescent-family dynamic.\n\nDr. Vini Jhariya works with teenagers using a range of evidence-based approaches — always chosen based on what the individual teenager needs, not what is easiest or most convenient.\n\nFor some teenagers, the work is primarily individual — building their own tools, their own clarity, their own voice.\n\nFor others, family sessions are woven in — because the teenager cannot heal in isolation from the family system they live in.\n\nFor all teenagers, the relationship with Dr. Vini Jhariya is built on one foundation — trust. Without trust, nothing else works.",
    },

    {
      title: "Therapy approaches used.",
      type: "badges",
      order: 5,
      items: [
        {
          title:
            "Cognitive Behavioural Therapy — identifying and shifting unhelpful thought patterns",
        },
        {
          title:
            "Dialectical Behaviour Therapy — emotional regulation, distress tolerance, interpersonal effectiveness",
        },
        {
          title:
            "Acceptance and Commitment Therapy — relating to difficult thoughts and feelings differently",
        },
        {
          title:
            "Mindfulness-Based Interventions — building present-moment awareness and self-regulation",
        },
        {
          title:
            "Motivational Interviewing — for teenagers who are ambivalent about change",
        },
        {
          title:
            "Narrative Therapy — helping teenagers rewrite the story they tell about themselves",
        },
        {
          title:
            "Arts-Based & Expressive Therapy — for teenagers who find words insufficient",
        },
        {
          title:
            "Sand Therapy — externalising and working through the inner world",
        },
        {
          title:
            "Trauma-Informed Therapy — for teenagers carrying difficult experiences",
        },
        {
          title:
            "Family Therapy — where the family system needs to be part of the healing",
        },
        {
          title:
            "Career Aptitude Assessment & Guidance — for teenagers at crossroads",
        },
        {
          title:
            "And much more — always selected based on what this teenager, in this situation, needs.",
        },
      ],
    },

    {
      title: "What to expect from adolescent counselling at Urjasvini CDC.",
      type: "steps",
      order: 6,
      items: [
        {
          title: "First Conversation",
          description:
            "Whether it is a parent calling first or a teenager reaching out directly — the first step is always a conversation. Dr. Vini Jhariya will understand the situation, explain how sessions work, and answer every question before anything begins.",
        },
        {
          title: "Individual & Family Sessions",
          description:
            "Counselling sessions are planned around the teenager's specific needs. Some sessions are with the teenager alone. Some involve parents — because the family is always part of the picture. The balance is decided carefully — with the teenager's trust and the family's wellbeing both protected.",
        },
        {
          title: "Progress & Independence",
          description:
            "The goal of adolescent counselling is never dependency — it is independence. As the teenager builds their own tools, their own clarity, and their own capacity to manage their inner world, sessions reduce naturally. The end goal is a teenager who does not need us — because they have everything they need within themselves.",
        },
      ],
    },

    {
      title: "She stopped talking to everyone. Then she found her voice again.",
      type: "story",
      order: 7,
      content:
        '"14 saal ki Aanya ke parents pareshan the. Woh school se aakar seedha room mein jaati thi, door band karti thi, aur phone pe ghanton tak rehti thi. Khaana bhi akele khaati thi. Friends nahi the. Conversation nahi tha. Sirf screen."\n\nWhen they came to Dr. Vini Jhariya at Urjasvini CDC, what looked like a phone problem turned out to be something much deeper — Aanya was deeply lonely and anxious, and the screen was the only place she felt safe.\n\nThrough counselling that addressed the loneliness underneath the screen dependency, Aanya slowly began to re-engage with her world. Within four months, she had joined a hobby group, made two friends, and set her own screen time limits.\n\n"Hum phone ki problem fix karna chahte the. Dr. Vini ne humein samjhaya ki phone problem nahi thi — woh symptom tha."',
      items: [
        {
          buttonText: "Read More Family Stories",
          buttonLink: "/success-stories",
        },
      ],
    },

    {
      title: "You have not lost your teenager.",
      type: "cta",
      order: 8,
      content:
        "It just feels that way right now.\n\nWhatever is happening — there is a way through. Dr. Vini Jhariya has sat with families in situations far more difficult than yours and found a path forward. You do not have to figure this out alone.\n\nAnd if you are the teenager reading this:\n\nYou deserve support. You deserve to be heard. And you do not have to wait until things get worse before you reach out.",
      items: [
        {
          buttonText: "Book a Consultation",
          buttonLink: "/contact",
        },
        {
          buttonText: "WhatsApp Us",
          buttonLink: "https://wa.me/917999215093",
        },
      ],
    },
  ],

  faqs: [
    {
      question: "My teenager refuses to come for counselling. What do I do?",
      answer:
        "This is the most common situation parents face. Dr. Vini Jhariya recommends starting with a parent consultation first — understanding the situation and building a plan. Sometimes the teenager changes their mind when they hear that counselling is not about being fixed or reported. A WhatsApp message from the teenager themselves is sometimes the first step. We will work with whatever opening is available.",
    },
    {
      question: "Will my teenager's sessions be confidential?",
      answer:
        "Yes — within appropriate limits. Dr. Vini Jhariya will not share session content with parents without the teenager's knowledge, except in situations where safety is a concern. This boundary is essential for building the trust that makes counselling effective — and it will be explained clearly to both the teenager and the parents from the beginning.",
    },
    {
      question: "Can my teenager come alone — without me?",
      answer:
        "Yes. Teenagers can approach Dr. Vini Jhariya directly. An initial parent conversation is helpful but not always required. Dr. Vini Jhariya will guide what works best based on the situation and the teenager's age.",
    },
    {
      question: "My teenager says nothing is wrong. But I know something is.",
      answer:
        "Trust your instinct. Teenagers rarely say “I need help” — but that does not mean the help is not needed. A parent consultation with Dr. Vini Jhariya is a good starting point — she will help you understand what you are seeing and what the right next step is.",
    },
    {
      question: "Is adolescent counselling available online?",
      answer:
        "Yes. Dr. Vini Jhariya offers online adolescent counselling for teenagers across Madhya Pradesh and India. Many teenagers find it easier to open up online — and Dr. Vini Jhariya adapts her approach accordingly.",
    },
    {
      question:
        "We are worried our teenager is in a dangerous situation. What do we do?",
      answer:
        "Contact Urjasvini CDC immediately. Do not wait. Dr. Vini Jhariya will guide you on the right steps — calmly, carefully, and without making the situation worse. The teenager's safety and the family's wellbeing are always the priority.",
    },
    {
      question:
        "I am a teenager and I want to talk to someone but I am scared. What do I do?",
      answer:
        'WhatsApp first. You do not have to say everything — just say "I want to talk to someone." Dr. Vini Jhariya will take it from there. You are not alone in this.',
    },
  ],

  isFeatured: true,
  isActive: true,
  displayOrder: 6,
};

const psychologicalAssessmentsService = {
  title: "Psychological Assessments",
  slug: "psychological-assessments-indore",
  category: "Children",

  pageTitle:
    "Psychological Assessments in Indore | Child, Adolescent & Adult | Urjasvini CDC",

  metaDescription:
    "Dr. Vini Jhariya at Urjasvini CDC, Indore offers comprehensive psychological assessments for children, adolescents & adults — IQ, ASD, ADHD, SLD, neuropsychological, personality & more.",

  primaryKeywords: [
    "psychological assessment Indore",
    "child assessment Indore",
    "IQ test child Indore",
    "psychoeducational assessment Indore",
    "neuropsychological assessment Indore",
  ],

  secondaryKeywords: [
    "ASD assessment Indore",
    "SLD assessment Indore",
    "ADHD assessment Indore",
    "personality assessment Indore",
    "adult psychological assessment Indore",
    "cognitive assessment Indore",
    "developmental assessment child Indore",
    "Dr. Vini Jhariya assessment",
    "Urjasvini CDC assessment",
  ],

  shortDescription:
    "Comprehensive psychological assessments for children, adolescents and adults — giving answers, clarity and a plan.",

  description:
    "At Urjasvini CDC, Dr. Vini Jhariya conducts detailed, multi-tool psychological assessments for children, adolescents, and adults — covering cognitive ability, neuropsychological functioning, developmental milestones, learning disabilities, autism spectrum, ADHD, behaviour, emotional functioning, personality, and more.",

  hero: {
    headline: "You do not need more opinions.\nYou need answers.",
    subHeadline:
      "A comprehensive psychological assessment tells you exactly what is happening, exactly why — and exactly what to do next.",
    paragraph:
      "Every year, thousands of children and adults across India go without the right support — not because it does not exist, but because nobody has taken the time to assess them properly. They are labelled, dismissed, or left to struggle — when what they needed was an accurate, comprehensive evaluation that told the whole story.\n\nAt Urjasvini Child Development Centre in Indore, Dr. Vini Jhariya conducts detailed, multi-tool psychological assessments for children, adolescents, and adults — covering cognitive ability, neuropsychological functioning, developmental milestones, learning disabilities, autism spectrum, ADHD, behaviour, emotional functioning, personality, and more.\n\nAssessment is not the end. It is the most important beginning.",
    trustLine:
      "4.9 stars | 237 Google reviews | Serving families across Indore & Madhya Pradesh",
    buttons: [
      {
        text: "Book a Psychological Assessment",
        link: "/contact-us",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
  },

  sections: [
    {
      title: "Why a proper assessment changes everything.",
      type: "text",
      order: 1,
      content:
        "Most parents come to Urjasvini CDC after months — sometimes years — of being told to wait. Wait and see. He will catch up. She is just going through a phase.\n\nMost adults come after years of feeling something is not right — and being told it is stress, or personality, or just the way they are.\n\nMeanwhile, the real reason goes unidentified. The gap widens. The frustration builds. And the person begins to believe something is fundamentally wrong with them — when actually, the only thing missing was the right assessment.\n\nA proper psychological assessment by Dr. Vini Jhariya does three things that no amount of waiting ever can:\n\n1. It tells you exactly what is happening — not what might be happening.\n2. It tells you why — the specific cognitive, developmental, emotional, or neurological pattern at work.\n3. It gives you a plan — specific, evidence-based, and built around the individual.\n\nAssessment is not labelling. Assessment is understanding. And understanding is where everything begins.",
    },

    {
      title: "We assess children, adolescents, and adults.",
      type: "cards",
      order: 2,
      items: [
        {
          title: "Children",
          subtitle: "Age 0–12",
          description:
            "From developmental concerns in toddlers to learning difficulties in school-age children — Dr. Vini Jhariya assesses across every domain of child development. The earlier an assessment is conducted, the earlier the right support can begin.",
        },
        {
          title: "Adolescents",
          subtitle: "Age 13–18",
          description:
            "Teenagers whose ADHD was missed in childhood. Adolescents navigating anxiety, identity, or academic pressure. Students needing career aptitude assessments before stream selection. Dr. Vini Jhariya works with adolescents across every presenting concern.",
        },
        {
          title: "Adults",
          description:
            "Personality assessment, neuropsychological evaluation, emotional and mental health assessment, relationship and premarital assessment, trauma evaluation, disability certification, and more. Assessment is not only for children — adults deserve answers too.",
        },
      ],
    },

    {
      title: "Assessments conducted by Dr. Vini Jhariya at Urjasvini CDC.",
      subtitle:
        "Each assessment is comprehensive, multi-tool, and produces a detailed written report — clinically precise, clearly explained, and legally recognised across India.",
      type: "cards",
      order: 3,
      items: [
        {
          title: "Cognitive & IQ Assessment",
          description:
            "What it is: A thorough evaluation of a child's intellectual ability — how they think, reason, process information, and learn.\n\nWhat it covers: Verbal intelligence, non-verbal intelligence, processing speed, working memory, fluid reasoning, and overall cognitive profile.\n\nWho it is for: Children whose academic performance does not match their apparent ability. Children being considered for gifted programmes. Children with suspected intellectual disability. Any child where understanding cognitive potential is essential.\n\nKey tools: WISC-V, WPPSI-IV, Stanford-Binet-5, Raven's Progressive Matrices, Cattell Culture Fair Intelligence Test, CAS-2, KABC-II, and more.\n\nWhat the report gives you: A complete cognitive profile — strengths, areas of need, and specific recommendations for home, school, and intervention.",
        },
        {
          title: "Neuropsychological Assessment",
          description:
            "What it is: A detailed evaluation of how the brain is functioning — covering attention, memory, executive functioning, language processing, visuospatial skills, and processing speed.\n\nWhat it covers: Attention and concentration, short and long-term memory, executive functioning, language processing, visuospatial processing, processing speed, and academic achievement.\n\nWho it is for: Children with complex presentations requiring a detailed understanding of brain-behaviour relationships. Children where cognitive assessment alone is insufficient. Adolescents with attention, memory, or executive functioning difficulties.\n\nKey tools: NEPSY-II, D-KEFS, CANTAB, CVLT-C, Rey Complex Figure Test, Trail Making Test, Wisconsin Card Sorting Test, Stroop Test, Digit Span, and more.\n\nWhat the report gives you: A comprehensive neuropsychological profile — identifying specific areas of strength and difficulty at the brain-function level, with targeted recommendations.",
        },
        {
          title: "Developmental Assessment",
          subtitle: "Age 0–6",
          description:
            "What it is: A comprehensive evaluation of a young child's development across all key domains — motor, language, cognitive, social-emotional, and adaptive behaviour.\n\nWhat it covers: Gross and fine motor development, receptive and expressive language, cognitive development, social-emotional functioning, adaptive behaviour, sensory processing, and developmental milestones.\n\nWho it is for: Toddlers and young children with concerns about developmental milestones. Children not meeting expected developmental markers. Early identification of autism, developmental delay, or sensory processing difficulties.\n\nKey tools: Bayley-III, DAYC-2, Griffiths Mental Development Scales, Denver Developmental Screening Test-II, Vineland-3, Sensory Profile-2, and more.\n\nWhat the report gives you: A clear developmental profile — where your child is, what they need, and an early intervention plan tailored to their specific profile.",
        },
        {
          title: "Psychoeducational & SLD Assessment",
          description:
            "What it is: A comprehensive evaluation of a child's academic skills and learning processes — identifying specific learning difficulties including dyslexia, dyscalculia, and disorders of written expression.\n\nWhat it covers: Reading accuracy, reading fluency, reading comprehension, written expression, spelling, mathematics, phonological processing, and working memory.\n\nWho it is for: Children struggling academically despite effort. Children with suspected learning difficulties. Children needing documentation for school accommodations or board examination exemptions.\n\nKey tools: WIAT-III, KTEA-3, WRAT-5, GORT-5, CTOPP-2, TOWL-4, Woodcock Reading Mastery Tests, NIMHANS SLD Battery, DALI, and more.\n\nWhat the report gives you: A precise SLD diagnosis, legally recognised documentation for school accommodations and board exam exemptions, and a targeted remedial education plan.",
        },
        {
          title: "ASD — Autism Spectrum Assessment",
          description:
            "What it is: A comprehensive multi-tool evaluation for autism spectrum — covering social communication, repetitive behaviours, sensory profile, adaptive functioning, and cognitive ability.\n\nWho it is for: Children showing signs of autism at any age. Children already assessed elsewhere who need a more detailed profile. Toddlers with early developmental concerns.\n\nKey tools: ADOS-2, ADI-R, CARS-2, GARS-3, M-CHAT-R/F, ISAA, SCQ, SRS-2, Vineland-3, Sensory Profile-2, and more.\n\nWhat the report gives you: A clear diagnostic picture, a detailed developmental and sensory profile, and a specific intervention plan.",
        },
        {
          title: "ADHD Assessment",
          description:
            "What it is: A comprehensive evaluation of attention, impulse control, hyperactivity, and executive functioning — across home and school settings.\n\nWho it is for: Children with attention difficulties, hyperactivity, or impulsivity. Adolescents whose ADHD was missed in childhood. Girls with inattentive ADHD that has been overlooked.\n\nKey tools: Conners-3, BASC-3, CBCL, Vanderbilt, Brown ADD Scales, ADHD-RS-5, TOVA, IVA-2, AIIMS ADHD Toolkit, and more.\n\nWhat the report gives you: A clear ADHD profile and a specific behavioural intervention plan.",
        },
        {
          title: "Behavioural & Emotional Assessment",
          description:
            "What it is: A comprehensive evaluation of a child's behavioural patterns, emotional functioning, and mental health.\n\nWhat it covers: Behavioural patterns, emotional regulation, anxiety, depression, trauma responses, social functioning, and self-concept.\n\nWho it is for: Children with significant behavioural difficulties, emotional dysregulation, anxiety, depression, school refusal, or trauma history.\n\nKey tools: BASC-3, CBCL, CDI-2, MASC-2, SCARED, RCMAS-2, Beck Youth Inventories, TSCC, and more.\n\nWhat the report gives you: A clear emotional and behavioural profile, clinical diagnosis where applicable, and specific therapeutic recommendations.",
        },
        {
          title: "Personality Assessment",
          subtitle: "Adolescents",
          description:
            "What it is: An evaluation of personality traits, patterns of thinking, emotional style, and interpersonal functioning in adolescents.\n\nWho it is for: Adolescents with identity concerns, persistent behavioural patterns, emotional difficulties, or where understanding personality structure is clinically important.\n\nKey tools: MACI, Adolescent Psychopathology Scale (APS), TAT, HTP, and more.\n\nWhat the report gives you: A detailed personality profile — helping parents, therapists, and schools understand the adolescent's inner world and respond appropriately.",
        },
        {
          title: "Career Aptitude & Multiple Intelligence Assessment",
          description:
            "What it is: A structured evaluation of a student's cognitive strengths, aptitudes, interests, and learning style — to guide stream and career selection.\n\nWho it is for: Students in Class 8-10 facing stream selection decisions. Adolescents confused about career direction. Students whose strengths do not match the stream they are being guided towards.\n\nKey tools: DMIT, Multiple Intelligence Assessment, Differential Aptitude Tests, Career Interest Inventories, and more.\n\nWhat the report gives you: A clear, data-driven career guidance report — aligning stream and career choices with actual strengths, not just marks or family expectations.",
        },
        {
          title: "School Readiness Assessment",
          description:
            "What it is: An evaluation of a young child's readiness for formal schooling — across cognitive, language, motor, social, and emotional domains.\n\nWho it is for: Children approaching school entry age where parents or nursery teachers have concerns. Children who have been asked to repeat a year. Parents who want an objective picture before making school placement decisions.\n\nWhat the report gives you: A clear readiness profile and specific recommendations for school placement and support.",
        },
      ],
    },

    {
      title: "Assessments for adults.",
      subtitle:
        "Assessment is not only for children. Adults deserve answers too — about how they think, who they are, and what they are carrying.",
      type: "cards",
      order: 4,
      items: [
        {
          title: "Cognitive & Neuropsychological Assessment",
          description:
            "For adults experiencing memory difficulties, concentration challenges, or cognitive changes. Also used for medico-legal purposes where cognitive functioning needs to be documented.\n\nCovers: Memory, attention, executive functioning, processing speed, language, and visuospatial functioning.\n\nTools: WAIS-IV, MoCA, MMSE, RBANS, D-KEFS, Rey Complex Figure Test, Trail Making Test, and more.",
        },
        {
          title: "Personality Assessment",
          description:
            "A thorough evaluation of personality structure, coping styles, and interpersonal patterns — used clinically, for self-understanding, and for medico-legal purposes.\n\nCovers: Personality traits, emotional patterns, defence mechanisms, interpersonal style, and psychopathology.\n\nTools: MMPI-2, MCMI-IV, NEO-PI-R, Big Five Inventory, Rorschach Inkblot Test, Thematic Apperception Test (TAT), House-Tree-Person (HTP), and more.",
        },
        {
          title: "Emotional & Mental Health Assessment",
          description:
            "For adults experiencing anxiety, depression, stress, burnout, grief, or trauma — where a structured clinical assessment is needed before treatment planning.\n\nCovers: Anxiety, depression, stress, burnout, PTSD, grief, and overall mental health functioning.\n\nTools: BDI-II, BAI, PHQ-9, GAD-7, PSS, PCL-5, GHQ-28, Hamilton Rating Scales, and more.",
        },
        {
          title: "Trauma Assessment",
          description:
            "For adults who have experienced significant trauma and where a structured evaluation of trauma impact is clinically necessary.\n\nCovers: Trauma history, PTSD signs, dissociation, emotional impact, and overall functioning.\n\nTools: PCL-5, CAPS-5, Trauma Symptom Inventory-2 (TSI-2), DES-II, and more.",
        },
        {
          title: "Relationship & Premarital Assessment",
          description:
            "A structured evaluation of compatibility, communication patterns, conflict resolution styles, and readiness for marriage — for couples considering marriage or experiencing relationship difficulties.\n\nCovers: Personality compatibility, communication style, conflict patterns, values alignment, and relationship strengths.\n\nTools: Standardised relationship inventories, couple compatibility assessments, and structured clinical interview.",
        },
        {
          title: "Parenting Style Assessment",
          description:
            "For parents who want to understand their parenting approach, identify patterns that may be affecting their child, and build a more conscious and effective parenting style.\n\nCovers: Parenting style, emotional availability, discipline approach, and parent-child relationship quality.",
        },
        {
          title: "Disability Assessment & Certification",
          description:
            "For individuals requiring formal psychological evaluation for disability certification — school, college, employment, or legal purposes.\n\nDr. Vini Jhariya is an RCI Registered Clinical Psychologist — legally qualified to conduct disability assessments and provide certification documentation recognised across India.",
        },
      ],
    },

    {
      title: "Assessment tools used at Urjasvini CDC.",
      subtitle:
        "Dr. Vini Jhariya uses nationally and internationally validated assessment tools across all domains. Every tool is selected based on the specific assessment need — never a one-size-fits-all approach.",
      type: "tools",
      order: 5,

      categories: [
        {
          title: "Cognitive & IQ",
          tools: [
            "WISC-V",
            "WPPSI-IV",
            "WAIS-IV",
            "Stanford-Binet-5",
            "Raven's Progressive Matrices",
            "Cattell Culture Fair Intelligence Test",
            "CAS-2",
            "KABC-II",
          ],
        },
        {
          title: "Neuropsychological",
          tools: [
            "NEPSY-II",
            "D-KEFS",
            "CANTAB",
            "CVLT-C",
            "Rey Complex Figure Test",
            "Trail Making Test",
            "Wisconsin Card Sorting Test",
            "Stroop Test",
            "Digit Span",
            "RBANS",
          ],
        },
        {
          title: "Developmental",
          tools: [
            "Bayley-III",
            "DAYC-2",
            "Griffiths Mental Development Scales",
            "Denver Developmental Screening Test-II",
            "Vineland Adaptive Behaviour Scales-3",
            "Sensory Profile-2",
          ],
        },
        {
          title: "ASD",
          tools: [
            "ADOS-2",
            "ADI-R",
            "CARS-2",
            "GARS-3",
            "M-CHAT-R/F",
            "ISAA",
            "SCQ",
            "SRS-2",
          ],
        },
        {
          title: "ADHD",
          tools: [
            "Conners-3",
            "BASC-3",
            "CBCL",
            "Vanderbilt",
            "Brown ADD Scales",
            "ADHD-RS-5",
            "TOVA",
            "IVA-2",
            "AIIMS ADHD Toolkit",
          ],
        },
        {
          title: "Psychoeducational & SLD",
          tools: [
            "WIAT-III",
            "KTEA-3",
            "WRAT-5",
            "GORT-5",
            "CTOPP-2",
            "TOWL-4",
            "Woodcock Reading Mastery Tests",
            "NIMHANS SLD Battery",
            "DALI",
          ],
        },
        {
          title: "Behavioural & Emotional",
          tools: [
            "BASC-3",
            "CBCL",
            "CDI-2",
            "MASC-2",
            "SCARED",
            "RCMAS-2",
            "Beck Youth Inventories",
            "TSCC",
            "PCL-5",
          ],
        },
        {
          title: "Personality",
          tools: [
            "MMPI-2",
            "MCMI-IV",
            "MACI",
            "NEO-PI-R",
            "Big Five Inventory",
            "Rorschach Inkblot Test",
            "TAT",
            "HTP",
            "APS",
          ],
        },
        {
          title: "Adult Mental Health",
          tools: [
            "BDI-II",
            "BAI",
            "PHQ-9",
            "GAD-7",
            "PSS",
            "CAPS-5",
            "TSI-2",
            "DES-II",
            "GHQ-28",
            "Hamilton Rating Scales",
            "MoCA",
            "MMSE",
          ],
        },
        {
          title: "Career & Aptitude",
          tools: [
            "DMIT",
            "Multiple Intelligence Assessment",
            "Differential Aptitude Tests",
            "Career Interest Inventories",
          ],
        },
      ],

      items: [
        { title: "WISC-V", category: "Cognitive & IQ" },
        { title: "WPPSI-IV", category: "Cognitive & IQ" },
        { title: "WAIS-IV", category: "Cognitive & IQ" },
        { title: "Stanford-Binet-5", category: "Cognitive & IQ" },
        { title: "Raven's Progressive Matrices", category: "Cognitive & IQ" },
        {
          title: "Cattell Culture Fair Intelligence Test",
          category: "Cognitive & IQ",
        },
        { title: "CAS-2", category: "Cognitive & IQ" },
        { title: "KABC-II", category: "Cognitive & IQ" },

        { title: "NEPSY-II", category: "Neuropsychological" },
        { title: "D-KEFS", category: "Neuropsychological" },
        { title: "CANTAB", category: "Neuropsychological" },
        { title: "CVLT-C", category: "Neuropsychological" },
        { title: "Rey Complex Figure Test", category: "Neuropsychological" },
        { title: "Trail Making Test", category: "Neuropsychological" },
        {
          title: "Wisconsin Card Sorting Test",
          category: "Neuropsychological",
        },
        { title: "Stroop Test", category: "Neuropsychological" },
        { title: "Digit Span", category: "Neuropsychological" },
        { title: "RBANS", category: "Neuropsychological" },

        { title: "Bayley-III", category: "Developmental" },
        { title: "DAYC-2", category: "Developmental" },
        {
          title: "Griffiths Mental Development Scales",
          category: "Developmental",
        },
        {
          title: "Denver Developmental Screening Test-II",
          category: "Developmental",
        },
        {
          title: "Vineland Adaptive Behaviour Scales-3",
          category: "Developmental",
        },
        { title: "Sensory Profile-2", category: "Developmental" },

        { title: "ADOS-2", category: "ASD" },
        { title: "ADI-R", category: "ASD" },
        { title: "CARS-2", category: "ASD" },
        { title: "GARS-3", category: "ASD" },
        { title: "M-CHAT-R/F", category: "ASD" },
        { title: "ISAA", category: "ASD" },
        { title: "SCQ", category: "ASD" },
        { title: "SRS-2", category: "ASD" },

        { title: "Conners-3", category: "ADHD" },
        { title: "BASC-3", category: "ADHD" },
        { title: "CBCL", category: "ADHD" },
        { title: "Vanderbilt", category: "ADHD" },
        { title: "Brown ADD Scales", category: "ADHD" },
        { title: "ADHD-RS-5", category: "ADHD" },
        { title: "TOVA", category: "ADHD" },
        { title: "IVA-2", category: "ADHD" },
        { title: "AIIMS ADHD Toolkit", category: "ADHD" },

        { title: "WIAT-III", category: "Psychoeducational & SLD" },
        { title: "KTEA-3", category: "Psychoeducational & SLD" },
        { title: "WRAT-5", category: "Psychoeducational & SLD" },
        { title: "GORT-5", category: "Psychoeducational & SLD" },
        { title: "CTOPP-2", category: "Psychoeducational & SLD" },
        { title: "TOWL-4", category: "Psychoeducational & SLD" },
        {
          title: "Woodcock Reading Mastery Tests",
          category: "Psychoeducational & SLD",
        },
        { title: "NIMHANS SLD Battery", category: "Psychoeducational & SLD" },
        { title: "DALI", category: "Psychoeducational & SLD" },

        { title: "CDI-2", category: "Behavioural & Emotional" },
        { title: "MASC-2", category: "Behavioural & Emotional" },
        { title: "SCARED", category: "Behavioural & Emotional" },
        { title: "RCMAS-2", category: "Behavioural & Emotional" },
        {
          title: "Beck Youth Inventories",
          category: "Behavioural & Emotional",
        },
        { title: "TSCC", category: "Behavioural & Emotional" },
        { title: "PCL-5", category: "Behavioural & Emotional" },

        { title: "MMPI-2", category: "Personality" },
        { title: "MCMI-IV", category: "Personality" },
        { title: "MACI", category: "Personality" },
        { title: "NEO-PI-R", category: "Personality" },
        { title: "Big Five Inventory", category: "Personality" },
        { title: "Rorschach Inkblot Test", category: "Personality" },
        { title: "TAT", category: "Personality" },
        { title: "HTP", category: "Personality" },
        { title: "APS", category: "Personality" },

        { title: "BDI-II", category: "Adult Mental Health" },
        { title: "BAI", category: "Adult Mental Health" },
        { title: "PHQ-9", category: "Adult Mental Health" },
        { title: "GAD-7", category: "Adult Mental Health" },
        { title: "PSS", category: "Adult Mental Health" },
        { title: "CAPS-5", category: "Adult Mental Health" },
        { title: "TSI-2", category: "Adult Mental Health" },
        { title: "DES-II", category: "Adult Mental Health" },
        { title: "GHQ-28", category: "Adult Mental Health" },
        { title: "Hamilton Rating Scales", category: "Adult Mental Health" },
        { title: "MoCA", category: "Adult Mental Health" },
        { title: "MMSE", category: "Adult Mental Health" },

        { title: "DMIT", category: "Career & Aptitude" },
        {
          title: "Multiple Intelligence Assessment",
          category: "Career & Aptitude",
        },
        { title: "Differential Aptitude Tests", category: "Career & Aptitude" },
        { title: "Career Interest Inventories", category: "Career & Aptitude" },
      ],
    },

    {
      title: "What happens during a psychological assessment at Urjasvini CDC.",
      subtitle:
        "Many parents and adults feel uncertain about the assessment process. Here is exactly what to expect — step by step.",
      type: "steps",
      order: 6,
      items: [
        {
          title: "Initial Consultation",
          description:
            "Dr. Vini Jhariya meets with you first — understanding the history, the concerns, what has been tried before, and what you need from the assessment. No assessment begins without this conversation. This is where Dr. Vini Jhariya decides which assessment tools are most appropriate for your specific situation.",
        },
        {
          title: "Assessment Sessions",
          description:
            "The assessment takes place over one or more sessions — depending on the type and scope. Sessions are designed to be warm, comfortable, and paced to your child's needs. For children, sessions are engaging and child-friendly — never rushed. For adults, sessions are private, professional, and respectful. Parent and teacher input is gathered through standardised rating scales where applicable.",
        },
        {
          title: "Report Discussion",
          description:
            "Dr. Vini Jhariya prepares a comprehensive written report covering all findings, clinical diagnosis where applicable, and specific recommendations. A detailed feedback session is then held — explaining every finding in plain language and answering every question. You leave with complete clarity — not just a document.",
        },
      ],
    },

    {
      title: "A report that gives you everything you need.",
      type: "text",
      order: 7,
      content:
        "Every psychological assessment at Urjasvini CDC produces a comprehensive written report that includes:\n\n- Background and developmental or personal history\n- Assessment tools used and clinical rationale\n- Detailed findings across all assessed domains\n- Clinical diagnosis where applicable\n- Specific, actionable recommendations for home, school, therapy, or workplace\n- School accommodation recommendations where relevant\n- Board exam exemption documentation where applicable\n- Disability certification documentation where required\n\nThe report is prepared by Dr. Vini Jhariya — RCI Registered Clinical Psychologist — and is recognised and accepted by:\n\n- Schools across India — government and private\n- CBSE, ICSE, MP Board, and other state examination boards\n- Hospitals and specialist clinics\n- Courts and legal proceedings\n- Disability certification authorities across India",
    },

    {
      title: "Stop guessing. Start knowing.",
      type: "cta",
      order: 8,
      content:
        "A proper psychological assessment gives you something no amount of waiting, worrying, or well-meaning advice ever can — the truth. What is happening. Why it is happening. And exactly what to do next.\n\nDr. Vini Jhariya and the Urjasvini CDC team are here for families and individuals in Indore, across Madhya Pradesh, and online across India.",
      contactLine:
        "+91 7999215093 | Mon-Fri: 11 AM - 7 PM | Saturday: By appointment | thechildpsychologistvini@gmail.com",
      buttons: [
        {
          text: "Book a Psychological Assessment",
          link: "/contact-us",
          type: "primary",
        },
        {
          text: "WhatsApp Us",
          link: "https://wa.me/917999215093",
          type: "secondary",
        },
      ],
    },
  ],

  faqs: [
    {
      question:
        "Do I need a referral from a doctor to get a psychological assessment?",
      answer:
        "No. You can contact Urjasvini CDC directly. A referral from a paediatrician or school is welcome but not required.",
    },
    {
      question: "How many sessions does an assessment take?",
      answer:
        "It depends on the type and scope. A focused assessment typically takes 2 sessions. A comprehensive multi-domain assessment may require 3-4 sessions. Dr. Vini Jhariya will give you a clear timeframe at the initial consultation.",
    },
    {
      question: "At what age can a child be assessed?",
      answer:
        "Developmental assessments can be conducted from as early as 12 months. Cognitive and educational assessments are typically from age 4-5 onwards. There is no upper age limit.",
    },
    {
      question: "Will the assessment label my child?",
      answer:
        "A diagnosis is not a label — it is an explanation. Understanding what is happening is what allows us to help effectively. Dr. Vini Jhariya always explains findings in context — what they mean for your child specifically, and equally importantly, what they do not mean.",
    },
    {
      question:
        "Is the assessment report valid for school and board examinations?",
      answer:
        "Yes. Reports prepared by Dr. Vini Jhariya are recognised by schools, CBSE, ICSE, MP Board, and other state examination boards across India.",
    },
    {
      question: "Can adults get assessed at Urjasvini CDC?",
      answer:
        "Yes. Dr. Vini Jhariya conducts a full range of adult assessments — personality, neuropsychological, emotional, trauma, relationship, and disability certification.",
    },
    {
      question: "We are not in Indore. Can we still get assessed?",
      answer:
        "Families and individuals from across Madhya Pradesh and India come to Urjasvini CDC in Indore for assessments. For those who cannot travel, Dr. Vini Jhariya offers online consultation and where possible, remote assessment support.",
    },
  ],

  finalCta: {
    heading: "Stop guessing. Start knowing.",
    body: "A proper psychological assessment gives you something no amount of waiting, worrying, or well-meaning advice ever can — the truth. What is happening. Why it is happening. And exactly what to do next.\n\nDr. Vini Jhariya and the Urjasvini CDC team are here for families and individuals in Indore, across Madhya Pradesh, and online across India.",
    buttons: [
      {
        text: "Book a Psychological Assessment",
        link: "/contact-us",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
    contactLine:
      "+91 7999215093 | Mon-Fri: 11 AM - 7 PM | Saturday: By appointment | thechildpsychologistvini@gmail.com",
  },

  isFeatured: true,
  isActive: true,
  displayOrder: 7,
};

const adultCounsellingService = {
  title: "Adult Counselling & Therapy",
  slug: "adult-counselling",
  category: "Adults",

  pageTitle:
    "Adult Counselling & Therapy | Clinical Psychologist & Psychotherapist | Dr. Vini Jhariya",

  metaDescription:
    "Struggling with anxiety, depression, stress, grief or relationship concerns? Dr. Vini Jhariya — RCI Registered Clinical Psychologist & Psychotherapist. Online & in-clinic.",

  primaryKeywords: [
    "adult counselling Indore",
    "clinical psychologist adult Indore",
    "adult therapy Indore",
    "anxiety counselling Indore",
    "depression counselling Indore",
    "psychotherapist Indore",
  ],

  secondaryKeywords: [
    "adult psychologist India",
    "stress counselling India",
    "grief counselling India",
    "burnout counselling India",
    "online adult counselling India",
    "trauma counselling India",
    "CBT therapist Indore",
    "REBT therapist India",
    "Dr. Vini Jhariya adult counselling",
  ],

  shortDescription:
    "Evidence-based, clinically grounded, confidential adult counselling and psychotherapy with Dr. Vini Jhariya.",

  description:
    "Dr. Vini Jhariya offers comprehensive adult counselling and psychotherapy for anxiety, depression, grief, trauma, relationship concerns, burnout, life transitions, identity concerns and more — online and in-clinic.",

  hero: {
    headline: "You have been carrying this\nlong enough.",
    subHeadline:
      "Adult counselling and psychotherapy — evidence-based, clinically grounded, completely confidential — with Dr. Vini Jhariya, Clinical Psychologist & Psychotherapist, RCI Registered.",
    paragraph:
      "Dr. Vini Jhariya | Clinical Psychologist & Psychotherapist\nInternationally Trained in CBT — Beck Institute, USA | REBT — Albert Ellis Institute, USA\nRCI Registered | TEDx Speaker | Published Researcher\n\nMost adults who reach out for counselling have waited. Months, sometimes years — managing, coping, pushing through. Telling themselves it is not serious enough. That others have it worse. That they should be able to handle this on their own. But carrying something alone does not make it lighter. It just makes it lonelier.\n\nDr. Vini Jhariya offers comprehensive adult counselling and psychotherapy — using evidence-based approaches that are internationally validated and clinically proven. Whether you are navigating anxiety, depression, grief, trauma, relationship difficulties, burnout, or simply a life that no longer feels like yours — this is a space where you will be heard, understood, and supported with clinical precision and genuine care.",
    trustLine:
      "4.9 stars | 237 Google reviews | RCI Registered Clinical Psychologist | Serving adults across India & worldwide",
    buttons: [
      {
        text: "Book a Consultation",
        link: "/contact",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
  },

  sections: [
    {
      title: "If you are here — you are in the right place.",
      type: "text",
      order: 1,
      content:
        "There is no minimum threshold of suffering required to seek support. You do not need to be in crisis. You do not need a diagnosis. You do not need to justify why you need help.\n\nIf something is affecting your quality of life — your sleep, your relationships, your work, your sense of self — that is enough.\n\nDr. Vini Jhariya is an RCI Registered Clinical Psychologist & Psychotherapist with over a decade of clinical practice. Internationally trained in Cognitive Behavioural Therapy at the Beck Institute, USA and in Rational Emotive Behaviour Therapy at the Albert Ellis Institute, USA. A published researcher in international peer-reviewed journals and a TEDx speaker.\n\nEvery approach used in your sessions is clinically grounded — not intuition-driven, not generic. Evidence-based, internationally validated, and applied with precision to your specific situation.\n\nYou are in the right place. And you are with the right person.",
    },

    {
      title: "What adult counselling and psychotherapy addresses.",
      subtitle:
        "Every concern is different. Every person is different. Dr. Vini Jhariya works with what is real — not what fits neatly into a category.",
      type: "cards",
      order: 2,
      items: [
        {
          title: "Emotional & Mental Health Concerns",
          items: [
            "Anxiety & Worry — Generalised anxiety, social anxiety, health anxiety — the kind that does not switch off. Overthinking, physical tension, racing heart, constant low-level dread. Addressed with CBT, ACT, and REBT — internationally validated approaches.",
            "Depression & Low Mood — Persistent sadness, loss of interest, emotional flatness, difficulty functioning. Depression is not weakness — it is a clinical condition that responds well to structured psychological intervention. Where severity warrants, coordinated care with a psychiatrist is recommended.",
            "Panic Attacks — Sudden, overwhelming episodes of physical anxiety — racing heart, difficulty breathing, dizziness. Frightening, disruptive, and highly responsive to evidence-based psychological treatment.",
            "OCD — Obsessive Compulsive Concerns — Intrusive thoughts, compulsive rituals, checking, reassurance-seeking — the exhausting cycle that consumes mental and emotional space. Addressed using evidence-based approaches within a CBT framework. Coordinated care with psychiatry recommended where severity warrants.",
            "PTSD & Trauma — The weight of experiences the mind has not fully processed — flashbacks, hypervigilance, emotional numbness, patterns that feel impossible to change. Trauma-informed therapy conducted with clinical precision and evidence-based protocol.",
            "Stress & Burnout — Professional burnout, chronic stress, the depletion that comes from giving too much for too long — when exhaustion goes beyond tiredness and begins affecting the body, relationships, and sense of self.",
            "Anger & Emotional Dysregulation — Anger that feels disproportionate or difficult to control — damaging relationships and daily functioning. Building the clinical capacity to respond rather than react.",
            "Grief & Loss — The loss of a loved one, a relationship, a role, a version of yourself, a future you had planned. Grief is not linear, not predictable, and does not follow a timeline. A clinically supported space to process it — never rushed.",
            "Low Self-Esteem & Self-Worth — The persistent inner voice that says you are not enough. Clinically addressed through evidence-based approaches — not simply reassured.",
            "Insomnia & Sleep Difficulties — Chronic sleep difficulties rooted in psychological factors. Where medical causes are suspected, appropriate referral is recommended alongside psychological intervention.",
            "Loneliness & Isolation — Feeling fundamentally disconnected — from people, from your own life, from meaning. More common, more clinically significant, and more treatable than most people recognise.",
            "Bipolar Mood Concerns — Where a psychiatrist manages the medical dimensions, Dr. Vini Jhariya provides the therapeutic support that medication alone cannot give — psychoeducation, emotional regulation, lifestyle structure, and relationship repair.",
            "Addiction — Psychological Support — The psychological dimensions of addiction — patterns, triggers, the emotional needs it serves, the identity work of recovery. Provided alongside medical and rehabilitation support where required.",
            "Psycho-Sexual Concerns — Sexual concerns rooted in psychological factors — anxiety, trauma history, relationship dynamics, cultural conditioning. Addressed in a completely confidential, clinically safe space. Where physical or medical factors are involved, appropriate referral is provided.",
            "Suicidal Thoughts & Crisis Support — If you are experiencing thoughts of not wanting to be here — this is always taken seriously. Dr. Vini Jhariya provides immediate, compassionate, clinical support and appropriate crisis referral where indicated. Please reach out.",
          ],
        },
        {
          title: "Relationship & Life Concerns",
          items: [
            "Relationship Difficulties — Communication breakdown, persistent conflict, emotional disconnection, trust concerns — in any significant relationship. Individual sessions focused on understanding your own role, patterns, and needs.",
            "Toxic Relationship Recovery — Processing and recovering from relationships that were controlling, manipulative, or emotionally harmful — including recovery from narcissistic abuse.",
            "Breakup & Divorce Adjustment — The emotional complexity of a relationship ending — grief, anger, identity disruption, and rebuilding a sense of self and future.",
            "Infidelity & Trust Betrayal — Processing the impact of betrayal — whether you are the person who was hurt or the person who caused the hurt. Both carry psychological weight that deserves clinical attention.",
            "Intimacy Concerns — Emotional or physical intimacy difficulties rooted in psychological factors — addressed clinically, sensitively, and without judgment.",
          ],
        },
        {
          title: "Life Transitions & Situational Concerns",
          items: [
            "Major Life Transitions — Job loss or change, relocation, retirement, children leaving home — transitions that are outwardly positive but inwardly destabilising.",
            "Career Stress & Work-Life Balance — The psychological toll of professional pressure, toxic workplaces, career confusion, and the inability to switch off from work.",
            "Midlife Recalibration — Questions of meaning, direction, identity, and purpose that surface in the middle years — clinically significant, frequently dismissed, and entirely worth exploring.",
            "Immigration & Cultural Adjustment — The psychological complexity of living between two cultures — identity confusion, belonging concerns, isolation, and the specific pressures of NRI and Gulf family life.",
            "Caregiver Burnout — The depletion that comes from caring for a child with special needs, an aging parent, or any person requiring significant ongoing support. Real, clinical, and deserving of professional attention.",
            "Fertility & Pregnancy-Related Emotional Concerns — The emotional weight of fertility challenges, pregnancy loss, and the journey to parenthood — addressed alongside appropriate medical care.",
            "Postpartum Depression & Anxiety — New mothers and fathers experiencing depression, anxiety, or emotional overwhelm in the postpartum period. Where severity warrants, coordinated care with a psychiatrist is recommended.",
          ],
        },
        {
          title: "Uniquely Indian Adult Concerns",
          items: [
            "Joint Family Stress & Dynamics — The psychological weight of navigating joint family systems — boundaries, unspoken expectations, conflicts, and the exhaustion of living at the intersection of multiple family members' needs.",
            "Sandwich Generation Burnout — Simultaneously caring for children and aging parents — financially, emotionally, practically — while maintaining your own life, marriage, and sense of self.",
            "Arranged Marriage Adjustment — Navigating the emotional complexity of building a life with someone you are still getting to know — the pressures, expectations, and the work of creating genuine intimacy within a structured context.",
            "In-Law Relationship Stress — The specific psychological burden of in-law dynamics — boundary concerns, loyalty conflicts, and sustained impact on marital wellbeing.",
            "Izzat, Shame & Family Honour — The invisible psychological burden of carrying the weight of family reputation — decisions made out of shame rather than choice, parts of yourself suppressed to protect the family name. Rarely named in clinical settings. Named here because it is real.",
            "Identity & Role Conflict — The conflict between who you are and who your family, community, or culture expects you to be — navigated with clinical precision in a completely confidential space.",
          ],
        },
        {
          title: "Identity & Personal Growth",
          items: [
            "LGBTQ+ Identity & Affirmation — A completely safe, affirming, non-judgmental space for adults navigating sexuality, gender identity, coming out, and the intersection of identity with Indian family and cultural expectations.",
            "Faith, Spirituality & Existential Concerns — Questions of meaning, purpose, faith, and what it all adds up to — approached with clinical depth and complete respect for each person's framework.",
            "Self-Understanding & Personal Development — Not every person who seeks counselling is in distress. Some come because they want to understand their patterns better, make more conscious choices, and develop greater emotional awareness. This is legitimate clinical work — and it is welcome here.",
          ],
        },
      ],
    },

    {
      title: "Clinical expertise. Human warmth. Evidence-based — always.",
      type: "cards",
      order: 3,
      content:
        "Adult counselling is only as effective as the clinician delivering it. Which is why credentials matter — not as decoration, but as the foundation of clinical practice.\n\nDr. Vini Jhariya is an RCI Registered Clinical Psychologist & Psychotherapist. Internationally trained in Cognitive Behavioural Therapy at the Beck Institute, USA and in Rational Emotive Behaviour Therapy at the Albert Ellis Institute, USA — two of the most respected psychotherapy training institutions in the world. A published researcher in international peer-reviewed journals and a TEDx speaker.\n\nEvery approach used in your sessions is evidence-based, internationally validated, and applied with precision to your specific situation.\n\nWhere a formal psychological assessment is clinically indicated — personality, neuropsychological, emotional, or trauma assessment — comprehensive adult evaluations are available. See the Psychological Assessments page for full details.",
      items: [
        {
          title: "RCI Registered — the qualification that matters.",
          description:
            "RCI registration is the mandatory clinical qualification for psychological practice in India. Not all therapists and counsellors you find online hold it. Dr. Vini Jhariya does — every session conducted within a legally and clinically regulated framework.",
        },
        {
          title: "Internationally trained — evidence-based always.",
          description:
            "CBT from the Beck Institute USA. REBT from the Albert Ellis Institute USA. Trauma-informed practice, DBT, ACT — every approach internationally validated, clinically proven, and applied with precision.",
        },
        {
          title: "Culturally fluent.",
          description:
            "Dr. Vini Jhariya understands the specific psychological landscape of Indian adult life — joint families, arranged marriages, cultural expectations, NRI adjustment, the weight of izzat — in a way most clinical frameworks do not account for.",
        },
        {
          title: "Complete confidentiality — always.",
          description:
            "Every session, every disclosure, every conversation — completely confidential. The only exception is a risk of serious harm — always handled transparently and with clinical care.",
        },
        {
          title: "Online & in-clinic.",
          description:
            "In-clinic in Indore. Online for adults across India and worldwide — in Hindi and English, scheduled flexibly across time zones.",
        },
      ],
    },

    {
      title: "Evidence-based approaches Dr. Vini Jhariya draws from.",
      subtitle:
        "No single approach works for every adult or every concern. Dr. Vini Jhariya selects and combines internationally validated modalities based on what each person's specific clinical situation calls for.",
      type: "badges",
      order: 4,
      items: [
        {
          title:
            "Cognitive Behavioural Therapy (CBT) — Beck Institute, USA certified",
        },
        {
          title:
            "Rational Emotive Behaviour Therapy (REBT) — Albert Ellis Institute, USA certified",
        },
        { title: "Dialectical Behaviour Therapy (DBT)" },
        { title: "Acceptance and Commitment Therapy (ACT)" },
        { title: "Trauma-Informed Therapy" },
        { title: "Mindfulness-Based Interventions" },
        { title: "Grief Therapy" },
        { title: "Narrative Therapy" },
        { title: "Solution-Focused Brief Therapy (SFBT)" },
        { title: "Psychodynamic Approaches" },
        {
          title:
            "And much more — always selected based on what this person, in this situation, needs most.",
        },
      ],
    },

    {
      title: "How sessions work.",
      type: "steps",
      order: 5,
      items: [
        {
          title: "First Consultation",
          description:
            "The first session is a conversation — not an interrogation. Dr. Vini Jhariya listens to what you are carrying, understands your history and your goals, and begins building the clinical picture. You are not expected to have everything figured out. That is what this session is for.",
        },
        {
          title: "Your Counselling Plan",
          description:
            "Based on the first consultation, Dr. Vini Jhariya outlines a clinical approach — which modality or combination of approaches fits your situation, what the goals are, and what the journey looks like. This is not a rigid plan — it evolves as you do.",
        },
        {
          title: "The Work",
          description:
            "Sessions are scheduled based on your needs and availability — weekly, fortnightly, or as clinically indicated. Every session builds on the last. Progress is reviewed regularly. The goal is always movement — towards greater understanding, greater functioning, and greater freedom from what brought you here.",
        },
      ],
    },

    {
      title: "Available wherever you are.",
      type: "cta",
      order: 6,
      content:
        "Adult counselling and psychotherapy is available both in-clinic and online — via Zoom, Google Meet, or WhatsApp Video, in Hindi and English.\n\nFor adults in Indore and nearby — in-clinic sessions offer the full in-person therapeutic experience.\n\nFor adults across India, the Gulf, the UK, USA, Canada, Australia, or anywhere in the world — online sessions with Dr. Vini Jhariya are equally effective, completely confidential, and scheduled flexibly across time zones.",
      items: [
        {
          buttonText: "Learn More About Online Consultations",
          buttonLink: "/services/online-consultation",
        },
      ],
    },

    {
      title: "Looking for couple, premarital, or family counselling?",
      subtitle:
        "Dr. Vini Jhariya also offers dedicated counselling for couples, families, and those preparing for marriage.",
      type: "cards",
      order: 7,
      items: [
        {
          title: "Couple Counselling",
          description:
            "For couples navigating communication breakdown, conflict, trust issues, or emotional disconnection.",
          buttonText: "View Couple Counselling",
          buttonLink: "/services/couple-counselling",
        },
        {
          title: "Premarital Counselling",
          description:
            "For couples preparing for marriage — building the foundation before the journey begins.",
          buttonText: "View Premarital Counselling",
          buttonLink: "/services/premarital-counselling",
        },
        {
          title: "Family Therapy",
          description:
            "For families navigating conflict, communication breakdown, or significant life transitions together.",
          buttonText: "View Family Therapy",
          buttonLink: "/services/family-therapy",
        },
      ],
    },

    {
      title: "You have waited long enough.\nThis is the right place.",
      type: "cta",
      order: 8,
      content:
        "Whatever you are carrying — anxiety, grief, burnout, relationship pain, identity confusion, or simply the quiet feeling that something is not right — clinical support is available. Evidence-based. Confidential. Delivered with the expertise and care you deserve.\n\nDr. Vini Jhariya is here for adults in Indore, across India, and online worldwide.\n\n+91 7999215093 | dr.vinijhariya@gmail.com | Online & In-clinic",
      items: [
        {
          buttonText: "Book a Consultation",
          buttonLink: "/contact",
        },
        {
          buttonText: "WhatsApp Us",
          buttonLink: "https://wa.me/917999215093",
        },
      ],
    },
  ],

  faqs: [
    {
      question: "Is what I am going through serious enough for counselling?",
      answer:
        "Yes. If something is affecting your quality of life — your sleep, your relationships, your work, your sense of self — that is enough. Counselling is not reserved for crisis. It is for anyone who wants to understand themselves better and function more fully.",
    },
    {
      question: "Will everything I say be kept confidential?",
      answer:
        "Yes — completely. Everything discussed in sessions is confidential. The only exception is if there is a risk of serious harm to yourself or others — which is always handled transparently and with clinical care.",
    },
    {
      question: "How many sessions will I need?",
      answer:
        "It depends on your concern, your goals, and how you respond to the therapeutic process. Dr. Vini Jhariya reviews progress regularly and is always honest about what the clinical picture suggests.",
    },
    {
      question:
        "I have tried counselling before and it did not help. Should I try again?",
      answer:
        "Yes — if you are open to it. Not all approaches work for all people. Dr. Vini Jhariya's approach is evidence-based, internationally trained, and tailored to the individual. A first session will give you a clear sense of fit.",
    },
    {
      question: "Can I do online sessions if I am not in Indore?",
      answer:
        "Yes. Online adult counselling is available for individuals across India and worldwide — in Hindi and English, scheduled flexibly across time zones.",
    },
    {
      question: "Are sessions available in Hindi?",
      answer:
        "Yes. Sessions are available in Hindi and English — whichever feels most comfortable for you.",
    },
    {
      question:
        "Do you work alongside psychiatrists or other medical professionals?",
      answer:
        "Yes — where clinically indicated. For presentations such as severe depression, bipolar, OCD requiring medication, or postpartum concerns, Dr. Vini Jhariya works in coordination with psychiatrists and other medical professionals to ensure complete, integrated care.",
    },
  ],

  isFeatured: true,
  isActive: true,
  displayOrder: 7,
};

const onlineConsultationService = {
  title: "Online Consultation",
  slug: "online-consultation",
  category: "Online Consultation",

  pageTitle:
    "Online Child & Clinical Psychologist for Indian Families | Gulf, India & Worldwide | Dr. Vini Jhariya",

  metaDescription:
    "Indian families in UAE, Saudi, Qatar, Kuwait & beyond — Dr. Vini Jhariya offers expert child & clinical psychology online in Hindi & English. Book your consultation today.",

  primaryKeywords: [
    "child psychologist UAE",
    "Indian child psychologist Dubai",
    "online child psychologist Gulf",
    "Indian psychologist Abu Dhabi",
    "child counselling UAE online",
    "online child psychologist Qatar",
  ],

  secondaryKeywords: [
    "Indian child psychologist online UK",
    "online child psychologist USA",
    "online clinical psychologist India",
    "child psychologist online Hindi speaking",
    "child psychologist Kuwait",
    "child psychologist Saudi Arabia",
    "child psychologist Bahrain",
    "child psychologist Oman",
    "Dr. Vini Jhariya online consultation",
  ],

  shortDescription:
    "Expert child and clinical psychology consultations online for Indian families across the Gulf, India and worldwide.",

  description:
    "Dr. Vini Jhariya offers comprehensive online consultations in Hindi and English for children, adolescents and adults — via Zoom, Google Meet or WhatsApp Video.",

  hero: {
    headline:
      "Expert Child & Clinical Psychologist.\nIn your language. Wherever you are.",
    subHeadline:
      "Now serving Indian families across the Gulf, India, and the world — online.",
    paragraph:
      "If you are an Indian family living in Dubai, Abu Dhabi, Doha, Riyadh, Kuwait, Muscat — or anywhere across India or the world — and you have been searching for a child or clinical psychologist who truly understands your culture, your language, and your family — you have found her.\n\nDr. Vini Jhariya offers comprehensive online consultations in Hindi and English — for children, adolescents, and adults. The same clinical depth. The same warmth. The same understanding of Indian family dynamics — now accessible from wherever you call home.",
    trustLine:
      "4.9 stars | 237 Google reviews | Trusted by Indian families across the Gulf, India & worldwide",
    buttons: [
      {
        text: "Book an Online Consultation",
        link: "/contact",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
  },

  sections: [
    {
      title: "Wherever you are — this is for you.",
      type: "cards",
      order: 1,
      items: [
        {
          title: "Indian Families in the Gulf",
          subtitle: "UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman",
          description:
            "UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman — home to millions of Indian families. Quality Hindi-speaking child psychology is rare in the Gulf. Dr. Vini Jhariya fills that gap — with the cultural understanding, the language, and the clinical expertise your family truly deserves. And because the time zone difference between India and the Gulf is just 1.5 hours — scheduling has never been easier.",
        },
        {
          title: "Indian Families Across the World",
          subtitle: "UK, USA, Canada, Australia and beyond",
          description:
            "UK, USA, Canada, Australia, and beyond — Indian families who want a psychologist who understands their world. Not just clinically — culturally. Someone who speaks their language, understands their family system, and does not need three sessions just to understand the context.",
        },
        {
          title: "Families Across India",
          description:
            "Living in a city or town where quality child psychology is hard to find? Families from every corner of India access Dr. Vini Jhariya's expertise online — without the travel, without the waiting, without compromise.",
        },
        {
          title: "Anyone Who Prefers Online",
          description:
            "Sometimes the best session is the one you do not have to travel for. Online consultations with Dr. Vini Jhariya are just as thorough, just as personal, and just as effective as in-clinic sessions.",
        },
      ],
    },

    {
      title: "What Dr. Vini Jhariya offers online.",
      subtitle:
        "A comprehensive range of child and clinical psychology services — available via Zoom, Google Meet, or WhatsApp Video, in Hindi and English.",
      type: "cards",
      order: 2,
      items: [
        {
          title: "Child & Adolescent Counselling",
          description:
            "For children and teenagers dealing with anxiety, depression, behavioural challenges, school refusal, exam stress, social difficulties, self-esteem, grief, parental separation, and more. Warm, evidence-based, and completely confidential.",
        },
        {
          title: "Adult Counselling",
          description:
            "Individual counselling for anxiety, depression, stress, grief, life transitions, and emotional wellbeing. Couple counselling, premarital counselling, and family therapy sessions also available online.",
        },
        {
          title: "Parent Training & Guidance",
          description:
            "Structured parent coaching — helping parents understand their child's behaviour, manage challenging situations, build emotional connection, and support their child's development at home. Especially valuable for parents raising children in a culture different from their own.",
        },
        {
          title: "Behaviour Management Coaching",
          description:
            "Practical, personalised guidance for parents dealing with defiance, aggression, tantrums, or behavioural challenges — with strategies that work within an Indian family context.",
        },
        {
          title: "Dyslexia & Remedial Education",
          description:
            "Structured remedial education sessions for children with dyslexia and specific learning disabilities — conducted online with the same evidence-based approach as in-clinic sessions.",
        },
        {
          title: "Assessment Consultation & Guidance",
          description:
            "Already have an assessment report from another professional? Dr. Vini Jhariya reviews existing reports, explains findings in plain language, and guides families on the right next steps.",
        },
        {
          title: "CBT, DBT & ACT — Talk-Based Therapies",
          description:
            "Cognitive Behavioural Therapy, Dialectical Behaviour Therapy, and Acceptance and Commitment Therapy — all fully available online for children, adolescents, and adults.",
        },
        {
          title: "Career Counselling for Adolescents",
          description:
            "Stream selection, aptitude guidance, and career clarity — especially valuable for NRI and Gulf families navigating Indian education systems and future planning from abroad.",
        },
        {
          title: "School Refusal & Exam Anxiety",
          description:
            "Structured counselling for children and adolescents struggling with school avoidance, performance anxiety, and exam-related stress.",
        },
        {
          title: "Psychoeducation Sessions",
          description:
            "Understanding your child's diagnosis, learning how to support them at home, and building confidence as a parent — in clear, accessible language.",
        },
        {
          title: "Autism & ADHD — Parent Guidance & Intervention Support",
          description:
            "Structured online parent guidance, behaviour management strategies, and intervention support that families can implement at home.",
        },
        {
          title: "Grief & Loss Counselling",
          description:
            "For children, adolescents, and adults processing loss — a safe, compassionate online space to be heard and supported.",
        },
      ],
    },

    {
      title:
        "What Indian families in the Gulf have been searching for — and rarely finding.",
      type: "cards",
      order: 3,
      content:
        "Millions of Indian families live across the Gulf. Most are raising children between two worlds — Indian values at home, international school systems outside. Managing joint family expectations from India while navigating a completely different cultural environment every day.\n\nWhen a child struggles — with behaviour, learning, emotions, or development — finding the right psychologist in the Gulf is hard. Finding one who speaks Hindi, understands Indian family dynamics, and brings genuine clinical depth is even harder.\n\nMost psychologists in the Gulf are excellent clinicians. But they have never sat with a joint family navigating three generations of expectations. They have not understood why an Indian parent's anxiety about their child's future is not just anxiety — it is love with nowhere to go.\n\nDr. Vini Jhariya has.\n\nFor over a decade, she has worked with Indian families — understanding not just the child in front of her, but the entire family system around that child. The grandparents' opinions. The school's pressure. The community's expectations. The parent's guilt.\n\nAnd now she brings all of that — to your screen. In your language. At Indian pricing.",
      items: [
        {
          title: "She understands your culture — completely.",
          description:
            "Indian family dynamics, the pressure of raising children between two cultures, the weight of extended family expectations — these are not things she has read about. They are things she works with every single day.",
        },
        {
          title: "Your language. Your comfort.",
          description:
            "Sessions in Hindi or English — whichever feels most natural. No explaining cultural context. No translating emotions. Just a real conversation in the language that feels like home.",
        },
        {
          title: "The time zone works perfectly.",
          description:
            "India and the Gulf are only 1.5 to 2.5 hours apart. What is an afternoon slot in India is a convenient late morning or early afternoon for Gulf families. No early mornings. No midnight calls. Scheduling that actually works.",
        },
        {
          title: "Clinical depth — not a quick fix.",
          description:
            "Dr. Vini Jhariya brings the same clinical rigour to every online session — thorough, evidence-based, and never rushed. A TEDx speaker, published researcher, and RCI Registered Clinical Psychologist — available to your family online.",
        },
        {
          title: "World-class expertise at Indian pricing.",
          description:
            "Psychology in the Gulf is expensive. What costs significantly more locally — Dr. Vini Jhariya offers at Indian pricing, without any compromise in clinical quality.",
        },
      ],
    },

    {
      title:
        "From your first message to your first session — here is how it works.",
      type: "steps",
      order: 4,
      items: [
        {
          title: "Tell Us About Your Family",
          description:
            "Start with a simple WhatsApp message or email. Tell us who you are reaching out for — your child, yourself, or your family. Share what is on your mind, what you have been noticing, and what kind of support you are looking for. You do not need to have everything figured out before you reach out. That is what we are here for.",
        },
        {
          title: "We Find the Right Slot for You",
          description:
            "Our team responds within 24 hours. We understand your time zone, your schedule, and your preference — and we find a consultation slot that genuinely works for you. No complicated systems. No long waiting lists. Just a time that fits your life.",
        },
        {
          title: "Secure Your Appointment",
          description:
            "Once your slot is confirmed — a simple payment secures your appointment. We share our bank details for direct transfer — straightforward for families in India, the Gulf, and anywhere across the world. The moment payment is received, your session is confirmed. You will receive all the details you need — platform, timing, and what to expect.",
        },
        {
          title: "Your Session with Dr. Vini Jhariya",
          description:
            "Join from wherever you are — via Zoom, Google Meet, or WhatsApp Video. Dr. Vini Jhariya joins on time, every time. The session is private, confidential, and completely focused on you and your family. You will not leave with more confusion — you will leave with clarity, direction, and a plan.",
        },
      ],
    },

    {
      title: "We work around your schedule — not the other way around.",
      type: "cta",
      order: 5,
      content:
        "Online consultations with Dr. Vini Jhariya are scheduled flexibly — to accommodate families across every time zone.\n\nFor Gulf families — the time zone overlap between India and the Gulf makes scheduling effortless. Morning and afternoon slots in the Gulf align perfectly with Dr. Vini Jhariya's consultation hours.\n\nFor families in the UK, USA, Canada, Australia, or anywhere else in the world — we find a time that works. Share your preferred time zone and availability when you reach out — and we will make it happen.",
      items: [
        {
          buttonText: "Check Availability",
          buttonLink: "https://wa.me/917999215093",
        },
      ],
    },

    {
      title: "From Indian families across the world.",
      type: "cards",
      order: 6,
      items: [
        {
          title: "Parent of a child with ADHD, Dubai",
          description:
            '"We had been searching for a child psychologist who understood our Indian family for over a year. Dr. Vini was everything we had been looking for — and more. Our son has been seeing her online for four months and the progress has been remarkable. The fact that she speaks Hindi and truly understands our family context made all the difference."',
        },
        {
          title: "Parent of a child with autism, London",
          description:
            '"The cost of child psychology in the UK is extraordinary — and the cultural gap is even more so. Dr. Vini Jhariya gave us something we could not find here — genuine expertise, genuine cultural understanding, and sessions that actually felt like someone truly knew our world."',
        },
        {
          title: "Parent of a child with dyslexia, Sagar, MP",
          description:
            '"We are from a small town in MP and accessing quality child psychology was impossible for us. Online sessions with Dr. Vini changed everything. She is as thorough and as warm online as any in-person session could be."',
        },
      ],
    },

    {
      title: "Wherever you are —\nthe right support is now one message away.",
      type: "cta",
      order: 7,
      content:
        "Great psychology should not depend on where you live. Whether you are in Dubai or Dehradun, Doha or Delhi, London or Lucknow — Dr. Vini Jhariya is here for your family.\n\nIn your language. At your convenience. With the cultural understanding that makes all the difference.\n\n+91 7999215093 | thechildpsychologistvini@gmail.com | Available online — worldwide",
      items: [
        {
          buttonText: "Book an Online Consultation",
          buttonLink: "/contact",
        },
        {
          buttonText: "WhatsApp Us",
          buttonLink: "https://wa.me/917999215093",
        },
      ],
    },
  ],

  faqs: [
    {
      question: "Is online consultation as effective as in-person?",
      answer:
        "For counselling, therapy, parent guidance, and psychoeducation — yes, absolutely. Many families find online sessions more comfortable and consistent. Dr. Vini Jhariya brings the same clinical depth and personal warmth to every online session.",
    },
    {
      question: "Which platform do you use?",
      answer:
        "Sessions are conducted via Zoom, Google Meet, or WhatsApp Video — whichever works best for you. You just need a stable internet connection and a quiet space.",
    },
    {
      question: "How do I pay from the Gulf or abroad?",
      answer:
        "We share our bank account details for direct international transfer. Payment details are shared when your appointment slot is confirmed. The process is simple and straightforward.",
    },
    {
      question: "Are sessions confidential?",
      answer:
        "Yes — completely. All online sessions with Dr. Vini Jhariya are private and confidential. Sessions are never recorded without explicit consent.",
    },
    {
      question: "Can you work with my child's school in the Gulf or abroad?",
      answer:
        "Yes. Where needed, Dr. Vini Jhariya provides written guidance, assessment consultation reports, and psychoeducation documents that families can share with their child's school.",
    },
    {
      question:
        "What if my child is very young — can online sessions still work?",
      answer:
        "For very young children, online sessions focus on parent guidance and coaching — which is often the most effective approach. Dr. Vini Jhariya works with parents as the primary agent of change for young children.",
    },
    {
      question: "What languages are sessions available in?",
      answer:
        "Hindi and English — whichever feels most comfortable and natural for you and your family.",
    },
    {
      question:
        "I am in India but far from a good psychologist. Can I access online sessions?",
      answer:
        "Absolutely. Families from across India — from every state, every city, every town — access Dr. Vini Jhariya's expertise online. Distance is no longer a barrier to quality psychological support.",
    },
    {
      question: "I am in the Gulf — what time slots are available for me?",
      answer:
        "The time zone difference between India and the Gulf is just 1.5 to 2.5 hours — making scheduling very convenient. Share your preferred timing when you reach out and we will find a slot that works perfectly for you.",
    },
  ],

  isFeatured: true,
  isActive: true,
  displayOrder: 8,
};

const coupleCounsellingService = {
  title: "Couple Counselling",
  slug: "couple-counselling",
  category: "Adults",

  pageTitle: "Couple Counselling | Relationship Therapy | Dr. Vini Jhariya",

  metaDescription:
    "Struggling in your relationship? Dr. Vini Jhariya offers evidence-based couple counselling — communication, trust, conflict, intimacy & more. Online & in-clinic.",

  primaryKeywords: [
    "couple counselling Indore",
    "relationship counselling Indore",
    "marriage counselling Indore",
    "couples therapy Indore",
  ],

  secondaryKeywords: [
    "couple counselling India online",
    "relationship therapy India",
    "marriage counselling India",
    "couples psychologist India",
    "infidelity counselling India",
    "communication counselling couple",
    "Dr. Vini Jhariya couple counselling",
    "Gottman couples therapy India",
  ],

  shortDescription:
    "Evidence-based, confidential couple counselling and relationship therapy for communication, trust, conflict, intimacy and connection.",

  description:
    "Dr. Vini Jhariya offers evidence-based couple counselling and relationship therapy — drawing from the Gottman Method, Emotionally Focused Therapy, CBT, REBT and other approaches based on what each relationship needs.",

  hero: {
    headline: "It is not too late.",
    subHeadline:
      "Couple counselling and relationship therapy — evidence-based, confidential, and built around what your relationship actually needs.",
    paragraph:
      "Most couples who reach out for counselling have been struggling for longer than they would like to admit. The same arguments, cycling endlessly. The silence that says more than the fights. The growing distance that neither person knows how to cross.\n\nComing here — together or alone — is not an admission of failure. It is the most honest thing a couple can do.\n\nDr. Vini Jhariya offers evidence-based couple counselling and relationship therapy — drawing from internationally validated frameworks including the Gottman Method, Emotionally Focused Therapy, CBT, REBT, and other approaches — always chosen based on what this specific couple needs. Online and in-clinic. In Hindi and English.",
    trustLine:
      "4.9 stars | 237 Google reviews | RCI Registered Clinical Psychologist & Psychotherapist | Serving couples across India & worldwide",
    buttons: [
      {
        text: "Book a Consultation",
        link: "/contact",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
  },

  sections: [
    {
      title: "What brings couples to counselling — named honestly.",
      subtitle:
        "Every relationship is different. Every couple's struggle is different. Here are the most common reasons couples reach out — named without judgment.",
      type: "cards",
      order: 1,
      items: [
        {
          title: "Communication Breakdown",
          description:
            "The conversations that go nowhere. The things left unsaid. The feeling of talking at each other rather than to each other — and the exhaustion of trying to be heard.",
        },
        {
          title: "Persistent Conflict & Recurring Arguments",
          description:
            "The same fight, over and over. Different triggers, same outcome. When conflict has become a pattern rather than a problem to solve — something deeper needs to be understood.",
        },
        {
          title: "Emotional Disconnection",
          description:
            "The relationship is intact — technically. But the closeness, the warmth, the sense of being truly known by your partner — has quietly faded. Two people sharing a life but not really sharing it.",
        },
        {
          title: "Trust Concerns & Betrayal",
          description:
            "Trust that has been damaged — through dishonesty, broken promises, or actions that have created a fracture in the relationship. Rebuilding trust is possible. It is also careful, specific clinical work.",
        },
        {
          title: "Infidelity & Affair Recovery",
          description:
            "One of the most painful experiences a relationship can go through. Both partners carry wounds that need to be processed. Addressed with clinical precision and complete sensitivity.",
        },
        {
          title: "Intimacy Concerns",
          description:
            "Emotional or physical intimacy that has diminished — where the distance has grown and neither person knows how to close it.",
        },
        {
          title: "Parenting Disagreements",
          description:
            "Differences in parenting approach that have become a source of ongoing conflict — affecting both the relationship and the family.",
        },
        {
          title: "Life Transitions & Their Impact",
          description:
            "A new baby, a job loss, a relocation, a bereavement — transitions that test even strong relationships and can pull two people in different directions.",
        },
        {
          title: "Premarital Concerns",
          description:
            "Couples approaching marriage who want to address concerns, build a strong foundation, or understand each other more deeply before taking that step.",
        },
        {
          title: "Growing Apart",
          description:
            "No specific crisis — just the quiet, accumulated drift of two people moving in different directions. Where the relationship still exists but feels like it belongs to a different version of both of you.",
        },
        {
          title: "Considering Separation",
          description:
            "Couples who are not sure whether to stay or go — who want the space to make that decision thoughtfully, with clinical support, rather than in the heat of pain or confusion.",
        },
      ],
    },

    {
      title: "How Dr. Vini Jhariya works with couples.",
      subtitle:
        "Assessment first. Always. Because understanding what is actually happening in a relationship is the only foundation for helping it.",
      type: "steps",
      order: 2,
      content:
        "No two couples present the same way. What looks like a communication problem on the surface may be rooted in attachment wounds from long before this relationship began. What presents as conflict may actually be two people with deeply different — but equally valid — ways of experiencing the world, with no shared language to bridge them yet.\n\nThis is why couple counselling begins with understanding — before any intervention begins.",
      items: [
        {
          title: "Joint Assessment Session",
          description:
            "The first session is with both partners together. Dr. Vini Jhariya observes the dynamic, the communication patterns, and the relational landscape between the two people in the room. This session gives a real-time picture of how the couple functions — and what needs to be understood more deeply.",
        },
        {
          title: "Individual Sessions",
          description:
            "Each partner then meets with Dr. Vini Jhariya individually. This gives each person a confidential space to speak honestly — without the other present. The individual sessions often reveal what the joint session cannot. Both partners' perspectives are heard fully before the therapeutic plan is built.",
        },
        {
          title: "Feedback & Therapeutic Plan",
          description:
            "Based on the joint and individual sessions, Dr. Vini Jhariya shares her clinical understanding of the relationship — its strengths, its patterns, and what the therapeutic work needs to address. A plan is built together. The couple counselling sessions then begin — structured around what this specific relationship needs.",
        },
      ],
    },

    {
      title: "Evidence-based. Integrative. Built around your relationship.",
      type: "text",
      order: 3,
      content:
        "Couple counselling is not one thing. Different relationships need different approaches — and the research is clear that no single method works for every couple.\n\nDr. Vini Jhariya draws from a range of internationally validated frameworks — including the Gottman Method, Emotionally Focused Therapy (EFT), Cognitive Behavioural Therapy (CBT), REBT, narrative therapy, and more — selecting and combining approaches based on what this couple's specific situation calls for.\n\nThe goal of couple counselling is not to keep every relationship together at all costs. It is to help two people understand what is happening between them — and make the most conscious, informed decisions possible about their relationship and their lives.\n\nDr. Vini Jhariya will always be honest about what couple counselling can and cannot achieve in your specific situation.",
      items: [
        {
          title: "What couple counselling works towards",
          items: [
            "Building genuine understanding between partners — not just surface-level peace",
            "Replacing destructive communication patterns with ones that actually work",
            "Rebuilding trust where it has been damaged",
            "Restoring emotional and physical closeness",
            "Developing the tools to navigate conflict — both solvable problems and those that require ongoing management",
            "Helping couples make conscious, informed decisions about their future together",
          ],
        },
      ],
    },

    {
      title: "A question most couples ask before they reach out.",
      type: "two-column",
      order: 4,
      items: [
        {
          title: "Do we both need to come to the first session?",
          description:
            "Not necessarily. Every couple's situation is different — and the path into counselling is different too.\n\nSome couples come together from the very first session — ready to sit in the same room and begin. Others are not there yet. One partner may want to understand what couple counselling involves before bringing the other. One may need a safe space to speak first — before the conversation becomes shared.\n\nThere is no fixed rule. Whether you come together, or one of you comes first — the door is open. What matters is that someone takes the first step.",
        },
        {
          title: "My partner does not want to come. Can I still come alone?",
          description:
            "Yes — and more often than not, this is exactly how couple counselling begins.\n\nIt is rarely the case that both partners are equally ready at the same time. One person usually carries the weight of knowing something needs to change — while the other is still resistant, in denial, or simply not sure counselling is for them.\n\nComing alone is not a compromise. It is a beginning. Understanding your own patterns, your own responses, and your own role in the relationship — is some of the most powerful work that happens in couple counselling.\n\nAnd very often — when one partner begins to shift, the other follows.\n\nIf your partner is resistant — come anyway. We will figure out the rest together.",
        },
      ],
    },

    {
      title: "Available wherever you are.",
      type: "cta",
      order: 5,
      content:
        "Couple counselling is available both in-clinic and online — via Zoom, Google Meet, or WhatsApp Video, in Hindi and English.\n\nOnline sessions are conducted with both partners present on screen together — from the same location or different locations. Dr. Vini Jhariya adapts the approach to ensure online sessions are as effective and contained as in-clinic work.\n\nFor couples across India, the Gulf, the UK, USA, or anywhere in the world — distance is not a barrier to the work.",
      items: [
        {
          buttonText: "Learn More About Online Consultations",
          buttonLink: "/services/online-consultation",
        },
      ],
    },

    {
      title:
        "The relationship you have right now\nis not necessarily the relationship you will always have.",
      type: "cta",
      order: 6,
      content:
        "What feels stuck can move. What feels broken can be understood. What feels lost can — with the right support — be found again.\n\nOr sometimes — two people can reach a place of clarity and respect about what comes next. That too is a worthwhile outcome.\n\nDr. Vini Jhariya is here for couples in Indore, across India, and online worldwide. In Hindi and English.\n\n+91 7999215093 | dr.vinijhariya@gmail.com | Online & In-clinic",
      items: [
        {
          buttonText: "Book a Consultation",
          buttonLink: "/contact",
        },
        {
          buttonText: "WhatsApp Us",
          buttonLink: "https://wa.me/917999215093",
        },
      ],
    },
  ],

  faqs: [
    {
      question: "In couple counselling — whose side does the therapist take?",
      answer:
        "Neither. In couple counselling, the relationship itself is the client — not either individual. Dr. Vini Jhariya's role is not to judge, take sides, or assign blame. It is to help both partners understand what is happening between them — and find a way forward that is honest and informed.",
    },
    {
      question: "How many sessions will we need?",
      answer:
        "It depends on the complexity of the concerns, the motivation of both partners, and how the therapeutic process unfolds. Dr. Vini Jhariya reviews progress regularly and is always honest about what the clinical picture suggests.",
    },
    {
      question:
        "What if we are considering separation — is counselling still useful?",
      answer:
        "Yes. Couple counselling is valuable even when — especially when — a couple is uncertain about their future. It creates the space to make that decision consciously and with clarity, rather than in pain or confusion.",
    },
    {
      question: "Is couple counselling available in Hindi?",
      answer:
        "Yes. Sessions are available in Hindi and English — whichever feels most natural for both partners.",
    },
    {
      question: "Is everything discussed in sessions confidential?",
      answer:
        "Yes — with one important note in couple counselling. What is shared in individual sessions is not automatically disclosed to the partner in joint sessions. Dr. Vini Jhariya will discuss at the outset how information shared individually will be handled — so both partners know what to expect.",
    },
  ],

  isFeatured: true,
  isActive: true,
  displayOrder: 9,
};

const familyTherapyService = {
  title: "Family Therapy",
  slug: "family-therapy",
  category: "Adults",

  pageTitle: "Family Therapy | Family Counselling | Dr. Vini Jhariya",

  metaDescription:
    "Family conflict, communication breakdown, or patterns that keep repeating? Dr. Vini Jhariya offers evidence-based family therapy for Indian families. Online & in-clinic.",

  primaryKeywords: [
    "family therapy Indore",
    "family counselling Indore",
    "family therapy India",
    "systemic family therapy India",
  ],

  secondaryKeywords: [
    "family conflict counselling India",
    "intergenerational therapy India",
    "family communication counselling",
    "blended family therapy India",
    "Dr. Vini Jhariya family therapy",
    "online family therapy India",
    "family counselling Hindi",
  ],

  shortDescription:
    "Evidence-based family therapy and family counselling focused on the family system as a whole — not just one individual.",

  description:
    "Dr. Vini Jhariya offers evidence-based family therapy for Indian families dealing with conflict, communication breakdown, intergenerational patterns, blended family adjustment, academic pressure, special needs family concerns and more.",

  hero: {
    headline:
      "The problem is rarely one person.\nIt is the system around them.",
    subHeadline:
      "Family therapy — evidence-based, systemic, and built around the family as a whole — not just the individual who has been identified as the concern.",
    paragraph:
      'In most families that come for help — one person has been brought as "the problem." The difficult child. The rebellious teenager. The distant parent. The daughter-in-law who cannot adjust.\n\nBut in family therapy, the first thing Dr. Vini Jhariya looks at is not the individual — it is the system. Because in almost every case, what looks like one person\'s problem is actually a pattern that belongs to the whole family. A way of communicating, a way of managing conflict, a way of distributing roles and expectations — that has been building, often across generations, long before this moment of crisis.\n\nFamily therapy addresses the system. And when the system changes — individuals within it change too.',
    trustLine:
      "4.9 stars | 237 Google reviews | RCI Registered Clinical Psychologist & Psychotherapist | Serving families across India & worldwide",
    buttons: [
      {
        text: "Book a Family Therapy Session",
        link: "/contact",
        type: "primary",
      },
      {
        text: "WhatsApp Us",
        link: "https://wa.me/917999215093",
        type: "secondary",
      },
    ],
  },

  sections: [
    {
      title:
        "What family therapy actually is — and how it is different from individual counselling.",
      type: "text",
      order: 1,
      content:
        'In individual counselling — one person works with a therapist on their own concerns, patterns, and goals.\n\nIn family therapy — the family itself is the client. The sessions involve multiple family members together — and the work is focused on what happens between them, not just within any one of them.\n\nFamily therapy is based on a clinically well-established principle: that individuals cannot be fully understood in isolation from the families they are part of. Each family functions as an interconnected emotional system — where changes in one member affect every other member, where patterns of behaviour and communication repeat across generations, and where the "problem" presented by one individual is almost always a reflection of something happening in the system as a whole.\n\nUnderstanding that system — and helping the family change the patterns within it — is what family therapy does.\n\nDr. Vini Jhariya draws from internationally validated frameworks including Structural Family Therapy, Systemic Family Therapy, Bowenian Family Systems Therapy, Narrative Family Therapy, and CBT-based approaches for families — always selected based on what this specific family needs.',
    },

    {
      title: "What brings families to therapy — named honestly.",
      subtitle:
        "Family therapy is not only for families in crisis. It is for any family that recognises a pattern they want to understand and change.",
      type: "cards",
      order: 2,
      items: [
        {
          title: "Chronic Family Conflict",
          description:
            "Conflict that has become the family's default mode — where members are in constant disagreement, where arguments escalate without resolution, and where the tension has become the atmosphere of the home.",
        },
        {
          title: "Communication Breakdown Across the Family",
          description:
            "When family members have stopped truly hearing each other — where conversations become battles, where silence has replaced connection, and where no one feels understood by the people they live with.",
        },
        {
          title: "The Identified Patient — One Member Seen as the Problem",
          description:
            'One of the most common presentations in Indian families. A child, a teenager, or a member is brought as "the problem" — when the real issue is in the patterns of the system around them. Family therapy reframes this — and addresses what actually needs attention.',
        },
        {
          title: "Intergenerational Patterns",
          description:
            "Ways of communicating, managing conflict, distributing love and authority — that have been repeating across generations and are now showing up in the current family. Understanding where these patterns come from is the first step to changing them.",
        },
        {
          title: "Parent-Child Communication Breakdown",
          description:
            "Where the relationship between parent and child has become primarily conflict — where connection has been replaced by control, and where neither side feels heard or understood by the other.",
        },
        {
          title: "Sibling Conflict Affecting the Family",
          description:
            "Sibling rivalry, resentment, or conflict that has grown beyond normal disagreement — and is affecting the functioning and emotional climate of the whole family.",
        },
        {
          title: "Grandparent-Parent-Child Triangle",
          description:
            "Three generations of competing authority, competing values, and competing parenting styles. Navigating this with clarity and respect requires specific therapeutic work.",
        },
        {
          title: "Family Reorganisation After a Significant Event",
          description:
            "Divorce, bereavement, a new family member, a significant diagnosis — events that restructure the family system and require all members to find a new way of functioning together.",
        },
        {
          title: "Blended Family Adjustment",
          description:
            "Step-parents, step-siblings, restructured households — the complexity of building a new family system while honouring what came before.",
        },
        {
          title: "A Family Member's Mental Health Condition",
          description:
            "When one member is living with a mental health condition — anxiety, depression, autism, ADHD, or another concern — the impact on the whole family system is significant. Family therapy helps the family understand, respond, and function well together.",
        },
        {
          title: "Academic Pressure & Family Anxiety",
          description:
            "When a child's academic performance has become the source of family conflict, anxiety, and pressure — where the stress has spread through the entire family and is affecting everyone around the child.",
        },
        {
          title: "Family Adjusting to a Member with Special Needs",
          description:
            "Families navigating the emotional, relational, and practical reality of raising or living with a family member with special needs — addressed with clinical depth and complete sensitivity.",
        },
      ],
    },

    {
      title: "How family therapy sessions work.",
      type: "steps",
      order: 3,
      content:
        "Who comes to sessions:\nThe sessions involve the family members who are most central to the concern being addressed. This does not always mean every member of the family — Dr. Vini Jhariya will advise on who should be present based on the specific situation. In some cases, sessions begin with a subset of the family and expand as the work progresses.\n\nHow sessions are structured:\nSessions are held with family members together — not individually. The work happens in the room, between the people present. Dr. Vini Jhariya facilitates the conversations, interrupts the patterns, and guides the family towards new ways of understanding and responding to each other.\n\nIndividual sessions may be recommended alongside family sessions where clinically indicated — for specific family members who need individual support in addition to the family work.",
      items: [
        {
          title: "Understanding the System",
          description:
            "The first session is focused on understanding the family — its structure, its history, its current patterns, and what has brought it to this point. Every member present is heard. Dr. Vini Jhariya builds a picture of the system before any intervention begins.",
        },
        {
          title: "Working with the Patterns",
          description:
            "The therapeutic work begins — addressing the specific patterns, communication styles, roles, and dynamics that are maintaining the concern. Evidence-based approaches are tailored to this family's specific presentation.",
        },
        {
          title: "Building New Ways of Being Together",
          description:
            "The goal of family therapy is not just to reduce conflict — it is to build new patterns. New ways of communicating, new ways of managing disagreement, new ways of relating to each other that serve the family rather than damage it.",
        },
      ],
    },

    {
      title: "A note on confidentiality in family therapy.",
      type: "text",
      order: 4,
      content:
        "Confidentiality in family therapy is more complex than in individual therapy — and it is important that every family member understands how it works from the outset.\n\nDr. Vini Jhariya will discuss confidentiality clearly at the beginning of the work — what is shared in sessions, how information is handled, and what each family member can expect. This clarity is the foundation of the trust that makes family therapy effective.",
    },

    {
      title: "Available wherever your family is.",
      type: "cta",
      order: 5,
      content:
        "Family therapy is available both in-clinic and online — via Zoom, Google Meet, or WhatsApp Video, in Hindi and English.\n\nOnline family therapy sessions are conducted with all participating family members present on screen — from the same location or different locations. For families where members are in different cities or countries — online sessions make family therapy possible across distance.",
      items: [
        {
          buttonText: "Learn More About Online Consultations",
          buttonLink: "/services/online-consultation",
        },
      ],
    },

    {
      title: "When one person carries the weight —\nthe whole family feels it.",
      type: "cta",
      order: 6,
      content:
        "Whatever is happening in your family — the conflict, the distance, the patterns that keep repeating — there is a way to understand it. And understanding it is where change begins.\n\nDr. Vini Jhariya is here for families in Indore, across India, and online worldwide. In Hindi and English.\n\n+91 7999215093 | dr.vinijhariya@gmail.com | Online & In-clinic",
      items: [
        {
          buttonText: "Book a Family Therapy Session",
          buttonLink: "/contact",
        },
        {
          buttonText: "WhatsApp Us",
          buttonLink: "https://wa.me/917999215093",
        },
      ],
    },
  ],

  faqs: [
    {
      question: "Do all family members need to come to every session?",
      answer:
        "Not necessarily. Dr. Vini Jhariya will advise on who should be present based on the specific concern and how the work is progressing. Some sessions involve all members. Others may involve a subset. This is always discussed and agreed upon before sessions begin.",
    },
    {
      question: "What if one family member refuses to come?",
      answer:
        "Family therapy can still begin with the members who are willing. Often, when one part of the family system begins to shift — other members become more open to participating. Dr. Vini Jhariya will guide you on the best way forward given your specific situation.",
    },
    {
      question:
        "Is family therapy the same as counselling for one person in the family?",
      answer:
        "No. In family therapy, the family is the client — not any one individual. The work is focused on what happens between family members, not just within any one of them. Individual counselling and family therapy can run alongside each other where clinically indicated.",
    },
    {
      question: "Is family therapy available in Hindi?",
      answer:
        "Yes. Sessions are available in Hindi and English — whichever feels most natural for all family members present.",
    },
    {
      question: "Is online family therapy effective?",
      answer:
        "Yes. Family therapy can be conducted effectively online — with all participating members present on screen. For families where members are in different locations, online sessions make the work possible across distance.",
    },
  ],

  isFeatured: true,
  isActive: true,
  displayOrder: 10,
};

export const services = [
  // autismService,
  // adhdService,
  // dyslexiaService,
  // earlyInterventionService,
   //childCounsellingService,
  // adolescentCounsellingService,
  //psychologicalAssessmentsService,
  // adultCounsellingService,
  // onlineConsultationService,
  // coupleCounsellingService,
  // familyTherapyService,
];

const seedServices = async () => {
  try {
    await connectDb();

    for (const service of services) {
      await Service.findOneAndUpdate(
        { slug: service.slug },
        { $set: service },
        {
          upsert: true,
          new: true,
          runValidators: true,
        },
      );

      console.log(`${service.title} seeded successfully`);
    }

    console.log("All services seeded successfully");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedServices();
// seedServices();

// seedServices();
