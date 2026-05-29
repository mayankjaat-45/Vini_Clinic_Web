import JsonLd from "@/components/seo/JsonLd";
import ServiceDetailClient from "./ServiceDetailClient";
import { API } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function getService(slug) {
  try {
    if (!slug) return null;

    const { data } = await API.get(`/api/services/${slug}`);

    console.log("SERVICE DETAIL RESPONSE:", data);

    return data?.data || data?.service || null;
  } catch (error) {
    console.log(
      "SERVICE FETCH ERROR:",
      error.response?.data?.message || error.message,
    );
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);

  if (!service) {
    return {
      title: "Service Not Found | Dr. Vini Jhariya",
      description: "The requested service could not be found.",
    };
  }

  return {
    title:
      service.pageTitle ||
      `${service.title} | Dr. Vini Jhariya | Child Psychologist in Indore`,
    description:
      service.metaDescription ||
      service.shortDescription ||
      service.description ||
      "Therapy, counselling and child development services by Dr. Vini Jhariya.",
    alternates: {
      canonical: `${siteUrl}/services/${service.slug}`,
    },
    openGraph: {
      title: service.pageTitle || `${service.title} | Dr. Vini Jhariya`,
      description:
        service.metaDescription ||
        service.shortDescription ||
        service.description,
      url: `${siteUrl}/services/${service.slug}`,
      siteName: "Dr. Vini Jhariya",
      images: service.image?.url
        ? [
            {
              url: service.image.url,
              width: 1200,
              height: 630,
              alt: service.title,
            },
          ]
        : [],
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);

  const serviceJsonLd = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description:
          service.metaDescription ||
          service.shortDescription ||
          service.description,
        provider: {
          "@type": "LocalBusiness",
          name: "Urjasvini Child Development Centre",
          telephone: "+91-7999215093",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Indore",
            addressRegion: "Madhya Pradesh",
            addressCountry: "IN",
          },
        },
        areaServed: {
          "@type": "City",
          name: "Indore",
        },
        url: `${siteUrl}/services/${service.slug}`,
      }
    : null;

  return (
    <>
      {serviceJsonLd && <JsonLd data={serviceJsonLd} />}
      <ServiceDetailClient service={service} />
    </>
  );
}
