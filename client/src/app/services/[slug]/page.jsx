import JsonLd from "@/components/seo/JsonLd";
import ServiceDetailClient from "./ServiceDetailClient";
import { API } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const defaultOgImage = `${siteUrl}/images/dr-vini-og.jpg`;

async function getService(slug) {
  try {
    if (!slug) return null;

    const { data } = await API.get(`/api/services/${slug}`);

    return data?.data || data?.service || data || null;
  } catch (error) {
    console.log(
      "SERVICE FETCH ERROR:",
      error.response?.data?.message || error.message,
    );
    return null;
  }
}

const getPlainText = (value = "") => {
  if (!value) return "";

  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const getServiceDescription = (service) => {
  return getPlainText(
    service?.metaDescription ||
      service?.shortDescription ||
      service?.description ||
      "Therapy, counselling, psychological assessment and child development support by Dr. Vini Jhariya at Urjasvini Child Development Centre, Indore.",
  );
};

const getServiceTitle = (service) => {
  return (
    service?.pageTitle ||
    `${service?.title} | Dr. Vini Jhariya | Clinical & Child Psychologist in Indore`
  );
};

const getServiceUrl = (service, fallbackSlug = "") => {
  const slug = service?.slug || fallbackSlug;
  return `${siteUrl}/services/${slug}`;
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);

  if (!service) {
    return {
      title: "Service Not Found | Dr. Vini Jhariya",
      description:
        "The requested service could not be found. Explore child psychology, counselling, assessments and therapy services by Dr. Vini Jhariya.",
      alternates: {
        canonical: `${siteUrl}/services/${resolvedParams.slug}`,
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const title = getServiceTitle(service);
  const description = getServiceDescription(service);
  const canonicalUrl = getServiceUrl(service, resolvedParams.slug);
  const ogImage =
    service?.image?.url || service?.ogImage?.url || defaultOgImage;

  const keywords = [
    ...(Array.isArray(service.primaryKeywords) ? service.primaryKeywords : []),
    ...(Array.isArray(service.secondaryKeywords)
      ? service.secondaryKeywords
      : []),
    service.title,
    "Dr. Vini Jhariya",
    "Clinical & Child Psychologist in Indore",
    "Urjasvini Child Development Centre",
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Dr. Vini Jhariya | Urjasvini Child Development Centre",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${service.title} by Dr. Vini Jhariya, Clinical & Child Psychologist in Indore`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);

  const canonicalUrl = service
    ? getServiceUrl(service, resolvedParams.slug)
    : `${siteUrl}/services/${resolvedParams.slug}`;

  const description = service ? getServiceDescription(service) : "";

  const serviceJsonLd = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: service.title,
        description,
        url: canonicalUrl,
        image: service?.image?.url || defaultOgImage,
        serviceType: service.category || service.title,
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
        provider: {
          "@type": "MedicalBusiness",
          "@id": `${siteUrl}#medicalbusiness`,
          name: "Urjasvini Child Development Centre",
          url: siteUrl,
          telephone: "+917999215093",
          email: "dr.vinijhariya@gmail.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "100-A, Baikunth Dham Colony, Old Palasia, Saket",
            addressLocality: "Indore",
            addressRegion: "Madhya Pradesh",
            postalCode: "452018",
            addressCountry: "IN",
          },
          founder: {
            "@type": "Person",
            name: "Dr. Vini Jhariya",
            jobTitle: "Clinical & Child Psychologist",
          },
        },
      }
    : null;

  const breadcrumbJsonLd = service
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${siteUrl}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: canonicalUrl,
          },
        ],
      }
    : null;

  const faqJsonLd =
    service?.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs
            .filter((faq) => faq?.question && faq?.answer)
            .map((faq) => ({
              "@type": "Question",
              name: getPlainText(faq.question),
              acceptedAnswer: {
                "@type": "Answer",
                text: getPlainText(faq.answer),
              },
            })),
        }
      : null;

  return (
    <>
      {serviceJsonLd && <JsonLd data={serviceJsonLd} />}
      {breadcrumbJsonLd && <JsonLd data={breadcrumbJsonLd} />}
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <ServiceDetailClient service={service} />
    </>
  );
}
