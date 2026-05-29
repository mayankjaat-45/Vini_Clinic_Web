import CoursesPreview from "@/components/home/CoursesPreview";
import CTASection from "@/components/home/CTASection";
import GalleryPreview from "@/components/home/GalleryPreview";
import Hero from "@/components/home/Hero";
import HowWeWork from "@/components/home/HowWeWork";
import LatestBlogs from "@/components/home/LatestBlogs";
import ResourcesPreview from "@/components/home/ResourcesPreview";
import ServicesOverview from "@/components/home/ServicesOverview";
import StatsStrip from "@/components/home/StatsStrip";
import Testimonials from "@/components/home/Testimonials";
import JsonLd from "@/components/seo/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const doctorJsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Vini Jhariya",
  description:
    "Child psychologist in Indore providing counselling, autism therapy, ADHD assessment, dyslexia support, psychological assessments and child development guidance.",
  url: siteUrl,
  image: `${siteUrl}/images/vini-pic.jpeg`,
  telephone: "+91-7999215093",
  medicalSpecialty: [
    "Child Psychology",
    "Counselling",
    "Autism Therapy",
    "ADHD Assessment",
    "Dyslexia Support",
    "Psychological Assessment",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Urjasvini Child Development Centre",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "City",
    name: "Indore",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Urjasvini Child Development Centre",
  description:
    "Child development centre in Indore for child counselling, autism therapy, ADHD assessment, dyslexia support, early intervention and parent guidance.",
  url: siteUrl,
  telephone: "+91-7999215093",
  image: `${siteUrl}/images/vini-pic.jpeg`,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Urjasvini Child Development Centre",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/",
    "https://www.instagram.com/",
    "https://www.linkedin.com/",
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={doctorJsonLd} />
      <JsonLd data={localBusinessJsonLd} />
      <Hero />
      <StatsStrip />
      <ServicesOverview />
      <HowWeWork />
      <Testimonials />
      <CoursesPreview />
      <ResourcesPreview />
      <GalleryPreview />
      <LatestBlogs />
      <CTASection />
    </>
  );
}
