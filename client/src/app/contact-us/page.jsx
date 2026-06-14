"use client";

import { useMemo, useState } from "react";
import { API } from "@/lib/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  HelpCircle,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  enquiryFor: "",
  childAge: "",
  concern: "",
  preferredMode: "",
  preferredTime: "",
  heardFrom: "",
};

const enquiryForOptions = [
  "My child",
  "My teenager",
  "Parent guidance",
  "Psychological assessment",
  "Autism / ADHD / Dyslexia support",
  "Early intervention",
  "Online consultation",
  "Not sure yet",
];

const preferredModes = [
  "In-clinic at Urjasvini CDC, Indore",
  "Online Consultation",
  "Not Sure",
];

const preferredTimes = ["Morning", "Afternoon", "Evening"];

const heardFromOptions = [
  "Google search",
  "Instagram",
  "Facebook",
  "YouTube",
  "Friend or family referral",
  "Doctor referral",
  "School referral",
  "Other",
];

const faqs = [
  {
    q: "How quickly will you respond to my enquiry?",
    a: "We respond to all enquiries within 24 hours — usually sooner. If your concern is urgent, WhatsApp us directly at +91 7999215093 for the fastest response.",
  },
  {
    q: "I am not sure which service I need. Can I still reach out?",
    a: "Absolutely. You do not need to know which service you need before you contact us. Simply tell us what you are noticing or what concerns you — and we will guide you to the right next step.",
  },
  {
    q: "Is my enquiry confidential?",
    a: "Yes — completely. Every enquiry received is handled with full confidentiality. Your details and concern are never shared with anyone.",
  },
  {
    q: "Do you offer online consultations?",
    a: "Yes. Dr. Vini Jhariya offers comprehensive online consultations for families across India and worldwide.",
  },
  {
    q: "I am from another city. How do I book?",
    a: "The same way — WhatsApp, call, or fill the form. We will discuss whether an in-clinic visit or online consultation works best for your situation.",
  },
  {
    q: "Can I come to the clinic without an appointment?",
    a: "We work on an appointment basis to ensure every family gets the full time and attention they deserve. Please reach out in advance to schedule your visit.",
  },
];

const socialStyles = {
  instagram: {
    card: "hover:shadow-pink-200/70",
    iconWrap:
      "bg-linear-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-lg shadow-pink-500/25",
    button:
      "bg-linear-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white",
    glow: "bg-pink-200/50",
  },
  linkedin: {
    card: "hover:shadow-blue-200/70",
    iconWrap: "bg-[#0A66C2] text-white shadow-lg shadow-blue-500/25",
    button: "bg-[#0A66C2] text-white",
    glow: "bg-blue-200/50",
  },
  youtube: {
    card: "hover:shadow-red-200/70",
    iconWrap: "bg-[#FF0000] text-white shadow-lg shadow-red-500/25",
    button: "bg-[#FF0000] text-white",
    glow: "bg-red-200/50",
  },
  facebook: {
    card: "hover:shadow-blue-200/70",
    iconWrap: "bg-[#1877F2] text-white shadow-lg shadow-blue-500/25",
    button: "bg-[#1877F2] text-white",
    glow: "bg-blue-200/50",
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -35,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 35,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function ContactUsPage() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const showChildAge = useMemo(() => {
    return [
      "My child",
      "My teenager",
      "Psychological assessment",
      "Autism / ADHD / Dyslexia support",
      "Early intervention",
    ].includes(formData.enquiryFor);
  }, [formData.enquiryFor]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Please enter your name.";

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      return "Please enter a valid 10-digit phone number.";
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    if (!formData.enquiryFor) return "Please select who this enquiry is for.";

    if (showChildAge && !formData.childAge.trim()) {
      return "Please enter child / teenager age.";
    }

    if (!formData.preferredMode) {
      return "Please select how you would prefer to consult.";
    }

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

      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        enquiryFor: formData.enquiryFor,
        childAge: showChildAge ? formData.childAge.trim() : "",
        message: formData.concern.trim(),
        concern: formData.concern.trim(),
        consultationType: formData.enquiryFor,
        preferredMode: formData.preferredMode,
        preferredTime: formData.preferredTime,
        preferredDate: formData.preferredTime,
        heardFrom: formData.heardFrom,
      };

      const { data } = await API.post("/api/contact-enquiries", payload);

      if (data?.success) {
        toast.success(
          "Thank you. Your enquiry has been received. We will contact you soon.",
        );
        setFormData(initialForm);
      } else {
        toast.success(
          "Thank you. Your enquiry has been received. We will contact you soon.",
        );
        setFormData(initialForm);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to send enquiry. Please try WhatsApp or call.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-4 py-12 sm:px-5 md:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#2CB1A6]/20 blur-3xl md:h-96 md:w-96"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
          className="absolute -right-28 top-20 h-80 w-80 rounded-full bg-[#0F3D5E]/10 blur-3xl md:h-96 md:w-96"
        />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#0F3D5E] shadow-sm sm:text-sm"
            >
              <Sparkles size={16} className="text-[#2CB1A6]" />
              Contact Dr. Vini Jhariya
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-black leading-tight text-[#102A43] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              You do not need to have it all figured out.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg lg:mx-0"
            >
              Every family starts with a question, a worry, or a feeling that
              something needs attention. That is enough to begin.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <motion.a
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="tel:+917999215093"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:bg-[#102A43]"
              >
                <Phone size={18} />
                Call Now
              </motion.a>

              <motion.a
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="https://wa.me/917999215093"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-black text-white shadow-xl shadow-green-900/15 transition hover:bg-[#1fb85a]"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            className="rounded-4xl bg-white p-6 shadow-2xl shadow-slate-900/10 sm:p-8 md:rounded-[3rem]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]"
            >
              <Send size={26} />
            </motion.div>

            <h2 className="text-2xl font-black leading-tight text-[#102A43] sm:text-3xl">
              Book a Consultation with Dr. Vini Jhariya
            </h2>

            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">
              We read every message personally. Your enquiry is completely
              confidential.
            </p>

            <div className="mt-6 rounded-3xl bg-[#F7FBFC] p-5">
              <p className="text-sm font-black text-[#0F3D5E]">
                Clinic & online consultations available
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                Reach out for child counselling, adolescent support, autism,
                ADHD, dyslexia, developmental concerns, psychological
                assessments, early intervention, parent guidance and online
                consultations.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        id="contact-form"
        className="relative z-10 -mt-8 px-4 pb-20 sm:px-5 md:pb-24"
      >
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-5xl rounded-4xl border border-white bg-white p-5 shadow-2xl shadow-slate-900/10 sm:p-6 md:rounded-[3rem] md:p-10"
        >
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <FormInput
                label="Your Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

              <FormInput
                label="Phone / WhatsApp Number *"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="7999215093"
                inputMode="numeric"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormInput
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                type="email"
              />

              <FormSelect
                label="Who is this enquiry for? *"
                name="enquiryFor"
                value={formData.enquiryFor}
                onChange={handleChange}
                options={enquiryForOptions}
                placeholder="Select one"
              />
            </div>

            {showChildAge && (
              <FormInput
                label="Child / Teenager Age *"
                name="childAge"
                value={formData.childAge}
                onChange={handleChange}
                placeholder="Example: 4 years / 8 months"
              />
            )}

            <div>
              <label className="mb-2 block text-sm font-black text-slate-700">
                What is your primary concern?
              </label>
              <textarea
                rows="5"
                name="concern"
                value={formData.concern}
                onChange={handleChange}
                placeholder="Tell us briefly what is on your mind. No need to have everything figured out — that is what the first conversation is for."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#2CB1A6] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-black text-slate-700">
                How would you prefer to consult? *
              </label>

              <div className="grid gap-3 md:grid-cols-3">
                {preferredModes.map((mode) => (
                  <label
                    key={mode}
                    className={`cursor-pointer rounded-2xl border px-5 py-4 text-sm font-bold transition ${
                      formData.preferredMode === mode
                        ? "border-[#2CB1A6] bg-[#E9F8F6] text-[#0F766E]"
                        : "border-slate-200 bg-[#F7FBFC] text-slate-600 hover:border-[#2CB1A6]/50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="preferredMode"
                      value={mode}
                      checked={formData.preferredMode === mode}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {mode}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <FormSelect
                  label="Preferred time for us to call you back"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  options={preferredTimes}
                  placeholder="Select time"
                />
                <p className="mt-2 text-xs font-semibold text-slate-400">
                  This helps us reach you at the right time.
                </p>
              </div>

              <FormSelect
                label="How did you hear about us?"
                name="heardFrom"
                value={formData.heardFrom}
                onChange={handleChange}
                options={heardFromOptions}
                placeholder="Select one"
              />
            </div>

            <motion.button
              whileHover={!loading ? { y: -5, scale: 1.01 } : undefined}
              whileTap={!loading ? { scale: 0.97 } : undefined}
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:bg-[#102A43] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send My Enquiry
                  <ArrowRight size={17} />
                </>
              )}
            </motion.button>

            <div className="rounded-2xl bg-[#E9F8F6] px-5 py-4 text-sm font-bold leading-6 text-[#0F766E]">
              Online appointment booking is coming soon. Until then — WhatsApp
              or call us to schedule your consultation.
            </div>
          </form>
        </motion.div>
      </section>

      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Other ways to reach us."
            text="Choose the option that feels easiest for you."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <ContactCard
              icon={<Phone />}
              title="Call or WhatsApp"
              text="+91 7999215093"
              desc="WhatsApp is the fastest way to reach us. We schedule appointments based on availability."
              link="https://wa.me/917999215093"
              button="WhatsApp Now"
            />

            <ContactCard
              icon={<Mail />}
              title="Email"
              text="dr.vinijhariya@gmail.com"
              desc="We respond to all emails within 24 hours."
              link="mailto:dr.vinijhariya@gmail.com"
              button="Send Email"
            />

            <ContactCard
              icon={<MapPin />}
              title="Visit Us"
              text="Urjasvini Child Development Centre"
              desc="100-A, Baikunth Dham Colony, Old Palasia, Saket, Indore, Madhya Pradesh — 452018"
              link="https://maps.google.com/?q=100-A,+Baikunth+Dham+Colony,+Old+Palasia,+Saket,+Indore,+Madhya+Pradesh+452018"
              button="Get Directions"
            />
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-7xl overflow-hidden rounded-4xl bg-white p-4 shadow-xl shadow-slate-900/5 sm:p-5 md:rounded-[3rem]"
        >
          <iframe
            title="Urjasvini Child Development Centre Map"
            src="https://www.google.com/maps?q=100-A,%20Baikunth%20Dham%20Colony,%20Old%20Palasia,%20Saket,%20Indore,%20Madhya%20Pradesh%20452018&output=embed"
            className="h-75 w-full rounded-3xl border-0 sm:h-90 md:h-105 md:rounded-[2.3rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <div className="p-5 text-center">
            <a
              href="https://maps.google.com/?q=100-A,+Baikunth+Dham+Colony,+Old+Palasia,+Saket,+Indore,+Madhya+Pradesh+452018"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#102A43]"
            >
              <MapPin size={16} />
              Get Directions
            </a>
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl bg-[#E9F8F6] p-7 sm:p-8 md:rounded-[3rem] md:p-10"
          >
            <CalendarCheck className="mb-5 text-[#0F766E]" size={36} />
            <h2 className="text-3xl font-black text-[#102A43]">
              Scheduling an appointment.
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
              Appointments are scheduled based on availability — for both
              in-clinic and online consultations. WhatsApp, call, fill the form,
              or email us and we will find a time that works for you.
            </p>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-4xl bg-[#0F3D5E] p-7 text-white sm:p-8 md:rounded-[3rem] md:p-10"
          >
            <Clock className="mb-5 text-[#F4B183]" size={36} />
            <h2 className="text-3xl font-black">Not in Indore?</h2>
            <p className="mt-4 text-base font-semibold leading-7 text-white/75">
              Dr. Vini Jhariya offers online consultations for families across
              India and worldwide — via Zoom, Google Meet, or WhatsApp Video, in
              Hindi and English.
            </p>
            <a
              href="/online-consultation"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1"
            >
              Learn More About Online Consultations
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Stay connected with Dr. Vini Jhariya."
            text="Follow for parenting insights, child psychology tips, success stories, and updates."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            <SocialCard
              icon={<FaInstagram />}
              title="Instagram"
              handle="@vini_thechildpsychologist"
              link="https://www.instagram.com/vini_thechildpsychologist/"
              button="Follow"
              variant="instagram"
            />

            <SocialCard
              icon={<FaLinkedinIn />}
              title="LinkedIn"
              handle="Dr. Vini Jhariya"
              link="https://www.linkedin.com/in/vini-jhariya/"
              button="Connect"
              variant="linkedin"
            />

            <SocialCard
              icon={<FaYoutube />}
              title="YouTube"
              handle="Vini The Child Psychologist"
              link="https://www.youtube.com/@ViniTheChildPsychologist"
              button="Subscribe"
              variant="youtube"
            />

            <SocialCard
              icon={<FaFacebook />}
              title="Facebook"
              handle="Urjasvini Child Development Centre"
              link="https://www.facebook.com/profile.php?id=61565145723116"
              button="Follow"
              variant="facebook"
            />
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-5xl rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 md:rounded-[3rem] md:p-10"
        >
          <h2 className="mb-8 text-3xl font-black text-[#102A43] sm:text-4xl">
            Questions people ask most before reaching out.
          </h2>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl bg-[#F7FBFC] p-5"
              >
                <summary className="flex cursor-pointer list-none gap-3 font-black leading-6 text-[#102A43]">
                  <HelpCircle size={22} className="shrink-0 text-[#2CB1A6]" />
                  {faq.q}
                </summary>
                <p className="mt-4 pl-9 text-sm font-semibold leading-7 text-slate-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-20 sm:px-5 md:pb-24">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-7xl rounded-4xl bg-[#E9F8F6] p-7 text-center sm:p-10 md:rounded-[3rem] md:p-16"
        >
          <h2 className="text-3xl font-black leading-tight text-[#102A43] sm:text-4xl md:text-6xl">
            You do not need to have it all figured out.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
            Start with a question. Start with a worry. Start with the feeling
            that something needs attention. That is enough to begin. Reach out.
            We will take it from there.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#contact-form"
              className="rounded-full bg-[#0F3D5E] px-8 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#102A43]"
            >
              Book a Consultation
            </a>

            <a
              href="https://wa.me/917999215093"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#25D366] px-8 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#1fb85a]"
            >
              WhatsApp Us
            </a>
          </div>

          <p className="mt-7 text-sm font-bold leading-6 text-slate-500">
            +91 7999215093 | dr.vinijhariya@gmail.com | Urjasvini CDC, Indore
          </p>
        </motion.div>
      </section>
    </main>
  );
}

const FormInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  inputMode,
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
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full rounded-2xl border border-slate-200 bg-[#F7FBFC] px-5 py-4 text-sm font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#2CB1A6] focus:bg-white"
      />
    </div>
  );
};

const FormSelect = ({ label, name, value, onChange, options, placeholder }) => {
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
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

const SectionHeading = ({ title, text }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mb-10 text-center"
    >
      <h2 className="text-3xl font-black text-[#102A43] sm:text-4xl">
        {title}
      </h2>
      {text && (
        <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">
          {text}
        </p>
      )}
    </motion.div>
  );
};

const ContactCard = ({ icon, title, text, desc, link, button }) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      className="rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-7 md:rounded-[2.5rem]"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9F8F6] text-[#0F766E]">
        {icon}
      </div>

      <h3 className="text-2xl font-black text-[#102A43]">{title}</h3>
      <p className="mt-3 wrap-break-word font-black text-[#0F3D5E]">{text}</p>
      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
        {desc}
      </p>

      <a
        href={link}
        target={link?.startsWith("http") ? "_blank" : undefined}
        rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-[#102A43]"
      >
        {button}
        <ArrowRight size={15} />
      </a>
    </motion.div>
  );
};

const SocialCard = ({
  icon,
  title,
  handle,
  link,
  button,
  variant = "instagram",
}) => {
  const styles = socialStyles[variant] || socialStyles.instagram;
  const isDisabled = link === "#";

  return (
    <motion.a
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.02 }}
      href={link}
      target={!isDisabled ? "_blank" : undefined}
      rel={!isDisabled ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (isDisabled) e.preventDefault();
      }}
      className={`group relative overflow-hidden rounded-4xl bg-white p-6 shadow-xl shadow-slate-900/5 transition md:rounded-[2.5rem] ${styles.card}`}
    >
      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-70 transition duration-500 group-hover:scale-125 ${styles.glow}`}
      />

      <div
        className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition duration-300 group-hover:-rotate-6 group-hover:scale-110 ${styles.iconWrap}`}
      >
        {icon}
      </div>

      <h3 className="relative text-xl font-black text-[#102A43]">{title}</h3>

      <p className="relative mt-2 line-clamp-1 text-sm font-bold text-slate-500">
        {handle}
      </p>

      <div
        className={`relative mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black transition duration-300 group-hover:translate-x-1 ${styles.button}`}
      >
        {button}
        <ArrowRight size={15} />
      </div>
    </motion.a>
  );
};
