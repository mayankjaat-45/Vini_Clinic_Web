const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function fetchData(endpoint) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data?.data || [];
  } catch (error) {
    console.log(`SITEMAP FETCH ERROR ${endpoint}:`, error.message);
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about-dr-vini`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/courses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/internship`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/free-resources`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const [services, blogs, courses, resources] = await Promise.all([
    fetchData("/api/services"),
    fetchData("/api/blogs"),
    fetchData("/api/courses"),
    fetchData("/api/resources"),
  ]);

  const servicePages = services
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${SITE_URL}/services/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.85,
    }));

  const blogPages = blogs
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${SITE_URL}/blog/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  const coursePages = courses
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${SITE_URL}/courses/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  const resourcePages = resources
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${SITE_URL}/free-resources/${item.slug}`,
      lastModified: item.updatedAt ? new Date(item.updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...servicePages,
    ...blogPages,
    ...coursePages,
    ...resourcePages,
  ];
}
