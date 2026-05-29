import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = [
  {
    title: "Pages",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about-dr-vini" },
      { name: "Services", href: "/services" },
      { name: "Courses", href: "/courses" },
      { name: "Internship", href: "/internship" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Autism Therapy", href: "/services/autism-therapy" },
      {
        name: "ADHD Assessment",
        href: "/services/adhd-assessment-and-therapy",
      },
      { name: "Child Counselling", href: "/services/child-counselling" },
      {
        name: "Teen Counselling",
        href: "/services/adolescent-and-teen-counselling",
      },
      { name: "NRI Consultation", href: "/services/nri-consultation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Free Resources", href: "/resources" },
      { name: "Gallery", href: "/gallery" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#071F33] text-white">
      <div className="absolute -left-30 -top-30 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="absolute -right-30 -bottom-30 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1.4fr]">
          <div>
            <a href="/" className="inline-block">
              <h2 className="text-3xl font-black">Dr. Vini Jhariya</h2>
              <p className="mt-2 text-sm font-semibold text-white/60">
                Child Psychologist • Counsellor • TEDx Speaker
              </p>
            </a>

            <p className="mt-6 max-w-md text-base leading-7 text-white/65">
              Helping children, parents, teens and families feel understood,
              supported and guided through professional therapy, counselling and
              psychological care.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="tel:+917999215093"
                className="flex items-center gap-3 text-sm font-semibold text-white/75 transition hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Phone size={17} />
                </span>
                +91 7999215093
              </a>

              <a
                href="mailto:hello@thechildpsychologist.in"
                className="flex items-center gap-3 text-sm font-semibold text-white/75 transition hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <Mail size={17} />
                </span>
                hello@thechildpsychologist.in
              </a>

              <div className="flex items-center gap-3 text-sm font-semibold text-white/75">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <MapPin size={17} />
                </span>
                Clinic address will be added here
              </div>
            </div>

            {/* <div className="mt-8 flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-white hover:text-[#0F3D5E]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div> */}
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-black">{group.title}</h3>

                <div className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="group flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
                    >
                      <ArrowRight
                        size={14}
                        className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                      />
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-4xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-black">
                Ready to book a consultation?
              </h3>
              <p className="mt-1 text-sm text-white/60">
                Online and offline consultation support available.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-[#0F3D5E] transition hover:-translate-y-1"
            >
              Book Consultation
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm font-semibold text-white/45">
          © 2026 Dr. Vini Jhariya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
