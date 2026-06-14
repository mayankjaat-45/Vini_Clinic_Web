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

export const revalidate = 60;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://thechildpsychologist.in";

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://vini-clinic-web-server.onrender.com";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}#person`,
  name: "Dr. Vini Jhariya",
  jobTitle: "Clinical & Child Psychologist",
  description:
    "Dr. Vini Jhariya is a clinical and child psychologist in Indore, supporting children, adolescents, parents and families through assessment, counselling, therapy planning and parent guidance.",
  url: siteUrl,
  image: `${siteUrl}/images/vini-pic.jpeg`,
  telephone: "+91-7999215093",
  email: "dr.vinijhariya@gmail.com",
  worksFor: {
    "@type": "MedicalBusiness",
    "@id": `${siteUrl}#medicalbusiness`,
    name: "Urjasvini Child Development Centre",
  },
};

const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${siteUrl}#medicalbusiness`,
  name: "Urjasvini Child Development Centre",
  alternateName: "Dr. Vini Jhariya Clinic",
  url: siteUrl,
  image: `${siteUrl}/images/dr-vini-og.jpg`,
  telephone: "+91-7999215093",
  email: "dr.vinijhariya@gmail.com",
  priceRange: "₹₹",
  founder: {
    "@type": "Person",
    "@id": `${siteUrl}#person`,
    name: "Dr. Vini Jhariya",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "100-A, Baikunth Dham Colony, Old Palasia, Saket",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "452018",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    address:
      "100-A, Baikunth Dham Colony, Old Palasia, Saket, Indore, Madhya Pradesh 452018",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "237",
    bestRating: "5",
    worstRating: "1",
  },
  medicalSpecialty: [
    "Child Psychology",
    "Clinical Psychology",
    "Autism Therapy",
    "ADHD Assessment",
    "Dyslexia Support",
    "Psychological Assessment",
    "Child Counselling",
    "Early Intervention",
  ],
  areaServed: [
    {
      "@type": "City",
      name: "Indore",
    },
    {
      "@type": "Country",
      name: "India",
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}#localbusiness`,
  name: "Urjasvini Child Development Centre",
  url: siteUrl,
  image: `${siteUrl}/images/dr-vini-og.jpg`,
  telephone: "+91-7999215093",
  email: "dr.vinijhariya@gmail.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "100-A, Baikunth Dham Colony, Old Palasia, Saket",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "452018",
    addressCountry: "IN",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "237",
    bestRating: "5",
    worstRating: "1",
  },
};

const normalizeApiData = (json) => {
  if (Array.isArray(json)) return json;

  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.items)) return json.items;
  if (Array.isArray(json?.services)) return json.services;
  if (Array.isArray(json?.courses)) return json.courses;
  if (Array.isArray(json?.resources)) return json.resources;
  if (Array.isArray(json?.gallery)) return json.gallery;
  if (Array.isArray(json?.blogs)) return json.blogs;

  return [];
};

const fetchCollection = async (endpoint) => {
  try {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return normalizeApiData(json);
  } catch (error) {
    return [];
  }
};

const getHomeData = async () => {
  const [services, courses, resources, gallery, blogs] = await Promise.all([
    fetchCollection("/api/services"),
    fetchCollection("/api/courses"),
    fetchCollection("/api/resources"),
    fetchCollection("/api/gallery"),
    fetchCollection("/api/blogs"),
  ]);

  return {
    services: services.slice(0, 6),
    courses: courses.slice(0, 3),
    resources: resources.slice(0, 3),
    gallery: gallery.slice(0, 6),
    blogs: blogs.slice(0, 3),
  };
};

export default async function Home() {
  const { services, courses, resources, gallery, blogs } = await getHomeData();

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={medicalBusinessSchema} />
      <JsonLd data={localBusinessSchema} />

      <Hero />
      <StatsStrip />

      <ServicesOverview initialServices={services} />

      <HowWeWork />
      <Testimonials />

      <CoursesPreview initialCourses={courses} />
      <ResourcesPreview initialResources={resources} />
      <GalleryPreview initialGallery={gallery} />
      <LatestBlogs initialBlogs={blogs} />

      <CTASection />
    </>
  );
}
