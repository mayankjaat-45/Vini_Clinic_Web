"use client";

import { useState } from "react";
import { API } from "@/lib/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  HelpCircle,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  qualification: "",
  college: "",
  programInterested: "Not Sure",
  preferredMode: "Not Sure",
  duration: "",
  message: "",
};

const programs = [
  "Class 11 & 12 Students",
  "Undergraduate Students",
  "Postgraduate Students",
  "M.Phil Clinical Psychology Students",
  "BEd Special Education Students",
  "NRI & International Psychology Students",
  "Not Sure",
];

const modes = ["Online", "Offline / In-clinic", "Hybrid", "Not Sure"];

const highlights = [
  {
    icon: GraduationCap,
    title: "Direct Supervision",
    text: "Supervised by Dr. Vini Jhariya herself — RCI Registered Clinical Psychologist, TEDx Speaker, published researcher, and founder of Urjasvini CDC.",
  },
  {
    icon: Users,
    title: "Real Clinical Exposure",
    text: "Real children. Real adults. Real assessments. Real therapy. Real clinical decisions — explained, discussed, and supervised.",
  },
  {
    icon: BookOpen,
    title: "Syllabus-Based Learning",
    text: "Theory is taught from your actual university syllabus and connected to real clinical cases, not generic lectures.",
  },
  {
    icon: ClipboardCheck,
    title: "Structured & Purposeful",
    text: "Every internship is structured around your level, syllabus, university requirements, and learning goals.",
  },
  {
    icon: Award,
    title: "Future Opportunity",
    text: "Exceptional interns may be considered for continued clinical training and paid roles at Urjasvini CDC.",
  },
];

const categories = [
  {
    title: "Class 11 & 12 Students",
    tag: "Psychology as a subject | Observation-based | Career clarity",
    forText:
      "For students studying psychology at senior secondary level who want to see what the field actually looks like before choosing their degree path.",
    taught:
      "What psychology is, what psychologists do, child development, milestones, behaviour, neurodevelopmental conditions, mental health awareness, ethics and confidentiality.",
    experience:
      "Observation of a real clinical setting, understanding how a multidisciplinary child development centre functions, and the beginning of clinical thinking.",
    level: "Level 1 — Observation only",
    format: "Offline Indore or Online",
    certificate: "Certificate of Observation — signed by Dr. Vini Jhariya",
    lor: "Not provided at this level",
  },
  {
    title: "Undergraduate Students",
    tag: "BA / BSc Psychology | Foundation clinical exposure",
    forText:
      "For BA or BSc Psychology students who want to connect their university syllabus to real clinical practice.",
    taught:
      "Developmental psychology, abnormal psychology, DSM-5 and ICD-11, learning theories, assessment tools, counselling skills, play therapy, creative modalities, research methods, emotion and regulation.",
    experience:
      "Clinical observation, introductory case discussions, multidisciplinary team exposure, and early clinical thinking.",
    level: "Level 1 and Level 2",
    format: "Offline Indore or Online theory and case discussions only",
    certificate: "Certificate of Internship — signed by Dr. Vini Jhariya",
    lor: "Performance based — minimum 2 months",
  },
  {
    title: "Postgraduate Students",
    tag: "MA / MSc Psychology | Deeper clinical engagement",
    forText:
      "For MA or MSc Psychology students preparing for M.Phil or clinical practice who need structured clinical exposure.",
    taught:
      "Psychopathology, psychological assessment, case conceptualisation, counselling theories, differential diagnosis, developmental psychopathology, parent counselling, report writing, ethics, and therapeutic relationship.",
    experience:
      "Active observation, case discussion participation, partial assessment exposure, therapy observation, parent interaction observation, and report writing exposure.",
    level: "Level 1, Level 2, and partial Level 3",
    format: "Offline Indore or Online theory and case discussions only",
    certificate: "Certificate of Internship + supervised hours documentation",
    lor: "Performance based — minimum 2 months",
  },
  {
    title: "M.Phil Clinical Psychology Students",
    tag: "RCI Approved Programme — In-clinic ONLY",
    forText:
      "For students enrolled in an RCI approved M.Phil Clinical Psychology programme.",
    taught:
      "Advanced psychopathology, psychological assessment, DSM-5 and ICD-11 application, neuropsychology, psychotherapy modalities, full case formulation, report writing, supervision, evidence-based practice, and ethics.",
    experience:
      "Full supervised clinical exposure, assessment administration under supervision, therapy co-facilitation where appropriate, complete case involvement, report writing, and documented supervised hours.",
    level: "Level 1, Level 2, and full Level 3",
    format: "In-clinic at Urjasvini CDC, Indore ONLY",
    certificate:
      "Certificate of Internship + full supervised clinical hours in RCI-compatible format",
    lor: "Personal letter from Dr. Vini Jhariya on completion",
  },
  {
    title: "BEd Special Education Students",
    tag: "Special Education Students | Multidisciplinary exposure",
    forText:
      "For BEd Special Education students who want to understand how clinical psychology and special education work together.",
    taught:
      "Neurodevelopmental conditions, behaviour in learning environments, typical and atypical development, inclusive education, parent communication, psychoeducation, and role of psychology in special education.",
    experience:
      "Observation of a real multidisciplinary team — psychology, special education, and therapy working together.",
    level: "Level 1 — Observation only",
    format: "Offline Indore or Online theory and discussion only",
    certificate: "Certificate of Internship — signed by Dr. Vini Jhariya",
    lor: "Performance based — minimum 2 months",
  },
  {
    title: "NRI & International Psychology Students",
    tag: "Studying abroad | Offline full exposure | Online theory only",
    forText:
      "For psychology students studying in the UK, USA, Canada, Australia, or elsewhere who want structured clinical exposure in India.",
    taught:
      "Clinical psychology in the Indian context, child development, neurodevelopmental conditions in Indian families, assessment tools used in India, cultural context of mental health, and Indian clinical practice.",
    experience:
      "Offline students receive full exposure at equivalent qualification level. Online students receive theory teaching, case discussions, and psychoeducation exposure only.",
    level: "As per qualification — Level 1, 2, or 3 offline only for Level 3",
    format: "Offline at Urjasvini CDC Indore or Online theory only",
    certificate:
      "Certificate of Internship — signed by Dr. Vini Jhariya, RCI Registered",
    lor: "Performance based",
  },
];

const levels = [
  {
    title: "LEVEL 1 — Observation",
    text: "You watch. You listen. You begin to understand what clinical practice actually looks like. Post-observation discussions connect what you saw to what you know.",
    available: "Available to: All categories",
  },
  {
    title: "LEVEL 2 — Participation",
    text: "You engage. Case discussions become active. You contribute your thinking, questions, and observations. You begin to see cases as a clinician sees them.",
    available: "Available to: Categories 2, 3, 5, 6",
  },
  {
    title: "LEVEL 3 — Application",
    text: "You do — under direct supervision. Assessment exposure, report writing, therapy observation with active engagement and co-facilitation where appropriate.",
    available: "Available to: Category 3 partial and Category 4 full",
  },
];

const applySteps = [
  {
    title: "Apply",
    text: "Fill the internship enquiry form or WhatsApp us with your name, education level, university, city, category, preferred format, duration, and why you want to intern at Urjasvini CDC.",
  },
  {
    title: "Office Call Within 48 Hours",
    text: "Our team calls you within 48 hours. Internship structure, fee details, and documentation requirements are discussed and confirmed on this call.",
  },
  {
    title: "Pay & Confirm",
    text: "Once fees are paid, your internship slot is confirmed. No slot is reserved until payment is received.",
  },
  {
    title: "Start Date & Your Plan",
    text: "Your start date is finalised. A structured internship plan is built for your category, level, learning goals, and university requirements.",
  },
];

const faqs = [
  {
    q: "Do I have to pay a fee for this internship?",
    a: "Yes. Internships at Urjasvini CDC involve a fee payable by the student. This is a structured, supervised, professional learning experience. Fee details are shared during the office call after you apply.",
  },
  {
    q: "Will my university accept this certificate?",
    a: "The certificate is issued by Urjasvini Child Development Centre and signed by Dr. Vini Jhariya — RCI Registered Clinical Psychologist. If your university has specific documentation requirements, let us know before you begin.",
  },
  {
    q: "Is this valid for RCI supervised clinical hours?",
    a: "For M.Phil Clinical Psychology students enrolled in RCI approved programmes — yes. In-clinic only. Online participation does not qualify for RCI supervised hours.",
  },
  {
    q: "How is this different from online internship platforms?",
    a: "Online platforms give you theory, assignments, and certificates. Urjasvini CDC gives you real clinical exposure — real children, real adults, real cases, real supervision.",
  },
  {
    q: "I am not from Indore. Can I still apply?",
    a: "Yes. Students from across India and the world apply for internships at Urjasvini CDC — both in-clinic and online. For in-clinic internships, you will need to arrange your stay in Indore.",
  },
  {
    q: "My university has specific hour requirements and format letters. Can you accommodate that?",
    a: "Yes. We accommodate specific hour requirements, structured timelines, and university-specific documentation formats. Share your university requirements when you reach out.",
  },
  {
    q: "What are my chances of getting a position at Urjasvini CDC after the internship?",
    a: "It is not guaranteed. Every opportunity at Urjasvini CDC goes to someone who has earned it through clinical thinking, professional conduct, and commitment.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

export default function InternshipClient() {
  const [formData, setFormData] = useState(initialForm);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      return "Please enter a valid email.";
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      return "Please enter a valid 10-digit phone number.";
    }
    if (!formData.qualification.trim()) return "Qualification is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (resume) {
        payload.append("resume", resume);
      }

      const { data } = await API.post("/api/internship/apply", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        toast.success("Internship application submitted successfully.");
        setFormData(initialForm);
        setResume(null);
      } else {
        toast.success("Internship application submitted successfully.");
        setFormData(initialForm);
        setResume(null);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to submit application. Please WhatsApp us instead.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      {/* Hero */}
      <section className="relative px-4 py-10 sm:px-5 md:py-14">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm"
            >
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Psychology Internship Indore
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mx-auto max-w-4xl text-3xl font-black leading-[1.12] text-[#102A43] sm:text-4xl md:text-5xl lg:mx-0 lg:text-6xl"
            >
              Real Clinical Internship for Psychology Students
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-3xl text-base font-bold leading-7 text-[#0F3D5E] sm:text-lg lg:mx-0"
            >
              Not just a certificate programme — get supervised exposure to real
              cases, clinical discussions, assessments, and structured learning
              under Dr. Vini Jhariya.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-5 grid gap-3 sm:grid-cols-2 lg:max-w-2xl"
            >
              {[
                "RCI Registered Clinical Psychologist",
                "Real clinical case exposure",
                "Syllabus-based learning",
                "Online & in-clinic options",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-left text-sm font-black text-slate-700 shadow-sm"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-[#2CB1A6]" />
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <a
                href="#apply"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1 hover:bg-[#102A43]"
              >
                Apply for Internship
                <ArrowRight size={18} />
              </a>

              <a
                href="https://wa.me/917999215093?text=Hello,%20I%20want%20to%20know%20more%20about%20internship%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-black text-white shadow-xl shadow-green-900/15 transition hover:-translate-y-1 hover:bg-[#1fb85a]"
              >
                <MessageCircle size={18} />
                WhatsApp Details
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="rounded-4xl bg-white p-4 shadow-2xl shadow-slate-900/10"
          >
            <div className="rounded-3xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-6 text-white sm:p-7">
              <GraduationCap className="mb-4 text-[#F4B183]" size={42} />

              <h2 className="text-2xl font-black leading-tight sm:text-3xl">
                Real children. Real cases. Real learning.
              </h2>

              <p className="mt-3 text-sm font-semibold leading-7 text-white/75">
                Built around your qualification, university syllabus, learning
                goals, and required internship format.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Observation",
                  "Case Discussion",
                  "Assessment Exposure",
                  "Supervision",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-black text-white"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Different */}
      <SectionWrapper>
        <SectionHeading
          badge="Why This Internship is Different"
          title="What makes an internship at Urjasvini CDC unlike anything else available."
          text="Most psychology internships are either online theory programmes or placements where you observe from a distance. Neither prepares you for real clinical practice. This internship is built differently."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
        >
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -7, scale: 1.02 }}
                className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-black text-[#102A43]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </SectionWrapper>

      {/* Who Can Apply */}
      <SectionWrapper>
        <SectionHeading
          badge="Who Can Apply"
          title="Who this internship is designed for."
          text="The internship is structured across 6 categories — each with its own learning framework, clinical exposure level, and theory teaching tailored to the student's background."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid gap-5 lg:grid-cols-2"
        >
          {categories.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-7"
            >
              <div className="mb-4 inline-flex rounded-full bg-[#E9F8F6] px-4 py-2 text-xs font-black text-[#0F766E]">
                {item.tag}
              </div>

              <h3 className="text-2xl font-black text-[#102A43]">
                {item.title}
              </h3>

              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                {item.forText}
              </p>

              <div className="mt-5 space-y-3 text-sm font-semibold leading-7 text-slate-600">
                <InfoLine title="What you will be taught" text={item.taught} />
                <InfoLine
                  title="What you will experience"
                  text={item.experience}
                />
                <InfoLine title="Level" text={item.level} />
                <InfoLine title="Format" text={item.format} />
                <InfoLine title="Certificate" text={item.certificate} />
                <InfoLine title="Letter of Recommendation" text={item.lor} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Levels */}
      <SectionWrapper>
        <SectionHeading
          badge="Levels of Engagement"
          title="Three levels of clinical engagement — your level depends on your qualification."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 lg:grid-cols-3"
        >
          {levels.map((level, index) => (
            <motion.div
              key={level.title}
              variants={fadeUp}
              whileHover={{ y: -7 }}
              className="rounded-4xl bg-[#102A43] p-7 text-white shadow-2xl shadow-slate-900/10"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B183] text-[#102A43]">
                <span className="text-xl font-black">{index + 1}</span>
              </div>
              <h3 className="text-2xl font-black">{level.title}</h3>
              <p className="mt-4 text-sm font-semibold leading-7 text-white/75">
                {level.text}
              </p>
              <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm font-black text-[#F4B183]">
                {level.available}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* Takeaway */}
      <SectionWrapper>
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl bg-white p-7 shadow-xl shadow-slate-900/5 md:rounded-[3rem] md:p-10"
          >
            <Award className="mb-5 text-[#0F766E]" size={42} />
            <h2 className="text-3xl font-black text-[#102A43] sm:text-4xl">
              What you take away from an internship at Urjasvini CDC.
            </h2>

            <div className="mt-6 space-y-4 text-base font-semibold leading-8 text-slate-600">
              <p>
                Every intern receives a Certificate of Internship signed
                personally by Dr. Vini Jhariya, Clinical & Child Psychologist,
                RCI Registered.
              </p>
              <p>
                M.Phil students additionally receive supervised clinical hours
                documentation in RCI-compatible format, university format
                letters on request, and a personal letter of recommendation.
              </p>
              <p>
                What no certificate can give you — but this internship does — is
                the ability to think clinically.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl bg-linear-to-br from-[#0F3D5E] to-[#168A83] p-7 text-white shadow-2xl shadow-blue-950/20 md:rounded-[3rem] md:p-10"
          >
            <Star className="mb-5 fill-[#F4B183] text-[#F4B183]" size={42} />
            <h2 className="text-3xl font-black sm:text-4xl">
              For the exceptional intern.
            </h2>

            <div className="mt-6 space-y-4 text-base font-semibold leading-8 text-white/78">
              <p>
                Exceptional interns are offered continued clinical training at
                Urjasvini CDC — going deeper, building more, becoming more.
              </p>
              <p>
                Those who prove, over time, that they are truly ready may be
                brought onto the team with a defined role, fair remuneration,
                and a real future in the work they chose.
              </p>
              <p>
                This is not promised at the start. It is built through
                consistency, sincerity, and the quality of everything you bring
                to this space.
              </p>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* How to Apply + Form */}
      <section id="apply" className="px-4 pb-14 sm:px-5 md:pb-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <SectionHeading
              align="left"
              badge="How to Apply"
              title="From application to first day — here is how it works."
            />

            <div className="space-y-4">
              {applySteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-4xl bg-white p-5 shadow-xl shadow-slate-900/5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F3D5E] text-white">
                    <span className="font-black">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-black text-[#102A43]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8 md:rounded-[3rem]"
          >
            <Send className="mb-6 text-[#0F766E]" size={38} />
            <h2 className="text-3xl font-black text-[#102A43]">
              Submit your internship application.
            </h2>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                  label="Full Name *"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <FormInput
                  label="Phone *"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  inputMode="numeric"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                  label="Email *"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                />
                <FormInput
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                  label="Current level of education / qualification *"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                />
                <FormInput
                  label="College / University"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FormSelect
                  label="Internship Category"
                  name="programInterested"
                  value={formData.programInterested}
                  onChange={handleChange}
                  options={programs}
                />
                <FormSelect
                  label="Preferred Format"
                  name="preferredMode"
                  value={formData.preferredMode}
                  onChange={handleChange}
                  options={modes}
                />
              </div>

              <FormInput
                label="Preferred Duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Example: 1 month / 2 months / university requirement"
              />

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Why do you want to intern at Urjasvini CDC?
                </label>
                <textarea
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm font-semibold outline-none transition focus:border-[#2CB1A6] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-slate-700">
                  Resume / CV optional
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                  className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:bg-[#102A43] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="text-sm font-semibold leading-6 text-slate-500">
                WhatsApp: +91 7999215093 | Email: dr.vinijhariya@gmail.com
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <SectionWrapper>
        <SectionHeading badge="FAQs" title="Questions students ask most." />

        <div className="mx-auto max-w-5xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <motion.div
                key={faq.q}
                initial={false}
                className={`overflow-hidden rounded-3xl border bg-white shadow-lg shadow-slate-900/5 transition ${
                  isOpen ? "border-[#2CB1A6]" : "border-slate-100"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="flex items-start gap-3 text-base font-black leading-6 text-[#102A43]">
                    <HelpCircle
                      size={22}
                      className="mt-0.5 shrink-0 text-[#2CB1A6]"
                    />
                    {faq.q}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9F8F6] text-[#0F766E] transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown size={20} />
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 pl-14 text-sm font-semibold leading-7 text-slate-600">
                    {faq.a}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Final CTA */}
      <section className="px-4 pb-14 sm:px-5 md:pb-16">
        <div className="mx-auto max-w-7xl rounded-4xl bg-[#102A43] p-7 text-center text-white shadow-2xl shadow-slate-900/20 sm:p-10 md:rounded-[3rem] md:p-16">
          <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl">
            The certificate is the smallest thing you will take away.
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-base font-semibold leading-8 text-white/75 sm:text-lg">
            What you will actually leave with is something no online platform
            can give you — the confidence of having been inside a real clinical
            setting, under real supervision, with real cases, making real
            progress.
          </p>

          <p className="mx-auto mt-4 max-w-4xl text-base font-semibold leading-8 text-white/75 sm:text-lg">
            Applications are open year-round. In-clinic at Urjasvini CDC, Indore
            — and online for students who cannot travel.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#apply"
              className="rounded-full bg-[#F4B183] px-8 py-4 text-sm font-black text-[#102A43] transition hover:-translate-y-1"
            >
              Apply Now
            </a>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-8 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1"
            >
              WhatsApp Us
            </a>
          </div>

          <p className="mt-7 text-sm font-bold leading-6 text-white/60">
            +91 7999215093 | thechildpsychologistvini@gmail.com | Urjasvini
            Child Development Centre, Indore
          </p>
        </div>
      </section>
    </main>
  );
}

const SectionWrapper = ({ children }) => {
  return (
    <section className="px-4 pb-14 sm:px-5 md:pb-16">
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
};

const SectionHeading = ({ badge, title, text, align = "center" }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={`mb-10 ${align === "center" ? "text-center" : ""}`}
    >
      {badge && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm">
          <Sparkles size={16} className="text-[#2CB1A6]" />
          {badge}
        </div>
      )}

      <h2 className="text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-5xl">
        {title}
      </h2>

      {text && (
        <p
          className={`mt-5 max-w-4xl text-base font-semibold leading-8 text-slate-600 sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {text}
        </p>
      )}
    </motion.div>
  );
};

const InfoLine = ({ title, text }) => {
  return (
    <p>
      <span className="font-black text-[#0F3D5E]">{title}: </span>
      {text}
    </p>
  );
};

const FormInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  inputMode,
  placeholder,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        inputMode={inputMode}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#2CB1A6] focus:bg-white"
      />
    </div>
  );
};

const FormSelect = ({ label, name, value, onChange, options }) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#2CB1A6] focus:bg-white"
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
