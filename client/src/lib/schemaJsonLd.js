const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://thechildpsychologist.in";

const schemaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": `${siteUrl}/#clinic`,
      name: "Urjasvini Child Development Centre",
      url: siteUrl,
      image: `${siteUrl}/images/vini-pic.jpeg`,
      logo: `${siteUrl}/images/logo.png`,

      founder: {
        "@id": `${siteUrl}/#doctor`,
      },
    },

    {
      "@type": "Physician",
      "@id": `${siteUrl}/#doctor`,
      name: "Dr. Vini Jhariya",
      url: siteUrl,
      image: `${siteUrl}/images/vini-pic.jpeg`,

      worksFor: {
        "@id": `${siteUrl}/#clinic`,
      },
    },
  ],
};

export default schemaJsonLd;
