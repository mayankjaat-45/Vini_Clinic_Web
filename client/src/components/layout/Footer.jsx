import {
  ArrowRight,
  Award,
  CalendarCheck,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";

const footerLinks = [
  {
    title: "Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "About Dr. Vini", href: "/about-dr-vini" },
      { name: "Online Consultation", href: "/online-consultation" },
      { name: "Success Stories", href: "/success-stories" },
      { name: "Gallery", href: "/gallery" },
      { name: "Blog", href: "/blog" },
      { name: "Free Resources", href: "/free-resources" },
      { name: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Services",
    links: [
      {
        name: "Autism Therapy",
        href: "/services/autism-therapy-indore",
      },
      {
        name: "ADHD Assessment & Therapy",
        href: "/services/adhd-assessment-therapy-indore",
      },
      {
        name: "Dyslexia Support",
        href: "/services/dyslexia-specialist-indore",
      },
      {
        name: "Psychological Assessments",
        href: "/services/psychological-assessments-indore",
      },
      {
        name: "Child Counselling",
        href: "/services/child-counselling-indore",
      },
      {
        name: "Adolescent Counselling",
        href: "/services/adolescent-counselling-indore",
      },
      {
        name: "Early Intervention",
        href: "/services/early-intervention",
      },
      {
        name: "Online Consultation",
        href: "/online-consultation",
      },
      {
        name: "Psychology Internship",
        href: "/psychology-internship-indore",
      },
      {
        name: "Workshops & Courses",
        href: "/workshops-and-courses",
      },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Book Consultation", href: "/contact-us" },
      { name: "WhatsApp Us", href: "https://wa.me/917999215093" },
      { name: "Call Clinic", href: "tel:+917999215093" },
      { name: "Email Dr. Vini", href: "mailto:dr.vinijhariya@gmail.com" },
      { name: "Free Resources", href: "/free-resources" },
      { name: "Workshops & Courses", href: "/workshops-and-courses" },
    ],
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "RCI Registered",
    text: "Clinical & Child Psychologist",
  },
  {
  icon: Award,
  title: "Trusted Since 2013",
  text: "10+ years of clinical care",
},
  {
    icon: Star,
    title: "4.9★ Rating",
    text: "Trusted by families",
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#071F33] text-white">
      <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#2CB1A6]/15 blur-3xl sm:h-96 sm:w-96" />
      <div className="absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-[#F4B183]/10 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Top CTA */}
        <div className="mb-12 overflow-hidden rounded-4xl border border-white/10 bg-white/6 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:rounded-[2.5rem] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-[#A8F0E9] sm:text-sm">
                <HeartHandshake size={16} />
                Support for children, parents and families
              </p>

              <h2 className="mt-5 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
                Need clarity about your child’s behaviour, learning or
                development?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                Book a consultation with Dr. Vini Jhariya at Urjasvini Child
                Development Centre, Indore. Online and offline consultation
                support is available.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="/contact-us"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1 hover:bg-[#E9F8F6]"
              >
                <CalendarCheck size={18} />
                Book Consultation
                <ArrowRight size={16} />
              </a>

              <a
                href="https://wa.me/917999215093"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:-translate-y-1 hover:bg-white/15"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.55fr] lg:gap-14">
          {/* Brand + Contact */}
          <div>
            <a href="/" className="inline-block">
              <h2 className="text-2xl font-black sm:text-3xl">
                Dr. Vini Jhariya
              </h2>
              <p className="mt-2 text-sm font-semibold text-white/60">
                Clinical & Child Psychologist • TEDx Speaker
              </p>
            </a>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/65 sm:text-base">
              Urjasvini Child Development Centre supports children, adolescents,
              parents and families through child counselling, developmental
              assessments, therapy planning, early intervention and parent
              guidance.
            </p>

            <div className="mt-7 grid gap-3">
              <a
                href="tel:+917999215093"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 p-3 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Phone size={17} />
                </span>
                +91 7999215093
              </a>

              <a
                href="mailto:dr.vinijhariya@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/4 p-3 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Mail size={17} />
                </span>
                <span className="break-all">dr.vinijhariya@gmail.com</span>
              </a>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/4 p-3 text-sm font-semibold leading-6 text-white/75">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <MapPin size={17} />
                </span>
                <span>
                  100-A, Baikunth Dham Colony, Old Palasia, Saket, Indore,
                  Madhya Pradesh — 452018
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {trustItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/4 p-4"
                  >
                    <Icon
                      size={20}
                      className={
                        item.title.includes("4.9")
                          ? "fill-[#F4B183] text-[#F4B183]"
                          : "text-[#A8F0E9]"
                      }
                    />
                    <h3 className="mt-3 text-sm font-black text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-white/55">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-black">{group.title}</h3>

                <div className="mt-5 space-y-2.5">
                  {group.links.map((link) => {
                    const isExternal =
                      link.href.startsWith("http") ||
                      link.href.startsWith("tel:") ||
                      link.href.startsWith("mailto:");

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group flex items-center gap-2 rounded-xl py-1.5 text-sm font-semibold text-white/60 transition hover:text-white"
                      >
                        <ArrowRight
                          size={14}
                          className="shrink-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                        />
                        <span>{link.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hindi + NAP strip */}
        <div className="mt-12 rounded-4xl border border-white/10 bg-white/4 p-5 sm:p-6">
          <div className="grid gap-5 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <h3 className="text-lg font-black">
                Urjasvini Child Development Centre
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Child psychology, counselling, therapy and developmental support
                in Indore.
              </p>
            </div>

            <p className="text-sm font-semibold leading-7 text-white/65 md:text-right">
              बच्चों के व्यवहार, पढ़ाई, भावनाओं और विकास से जुड़ी सहायता के लिए
              डॉ. विनी झारिया से संपर्क करें।
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-center text-xs font-semibold text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p>© 2026 Dr. Vini Jhariya. All rights reserved.</p>
            <p>
              Urjasvini Child Development Centre | Clinical & Child Psychologist
              in Indore
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
