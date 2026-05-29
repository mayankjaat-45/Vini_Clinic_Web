
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  FileText,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { API } from "@/lib/api";

async function getResource(slug) {
  try {
    const { data } = await API.get(`/api/resources/${slug}`);
    return data?.data || null;
  } catch (error) {
    console.log(
      "RESOURCE DETAIL FETCH ERROR:",
      error.response?.data || error.message,
    );
    return null;
  }
}

const formatBytes = (bytes) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  const mb = kb / 1024;

  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${kb.toFixed(0)} KB`;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const resource = await getResource(slug);

  if (!resource) {
    return {
      title: "Resource Not Found",
      description: "The requested resource could not be found.",
    };
  }

  const title = resource.pageTitle || resource.title;

  const description =
    resource.metaDescription ||
    resource.description ||
    "Download free child psychology resources, guides and worksheets.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: resource.coverImage?.url ? [resource.coverImage.url] : [],
      type: "article",
    },
  };
}

export default async function ResourceDetailPage({ params }) {
  const { slug } = await params;

  const resource = await getResource(slug);

  if (!resource) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7FBFC] px-5">
        <div className="max-w-xl rounded-4xl bg-white p-10 text-center shadow-xl">
          <FileText className="mx-auto mb-4 text-[#0F3D5E]" size={46} />

          <h1 className="text-3xl font-black text-[#102A43]">
            Resource not found
          </h1>

          <p className="mt-3 text-slate-600">
            This resource may have been removed or hidden.
          </p>

          <Link
            href="/free-resources"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0F3D5E] px-6 py-3 text-sm font-black text-white"
          >
            <ArrowLeft size={16} />
            Back to Resources
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-[#F7FBFC]">
      <section className="relative px-5 py-20">
        <div className="absolute -left-28 -top-28 h-96 w-96 rounded-full bg-[#2CB1A6]/20 blur-3xl" />
        <div className="absolute -right-28 top-20 h-96 w-96 rounded-full bg-[#0F3D5E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/free-resources"
            className="mb-8 inline-flex items-center gap-2 text-sm font-black text-[#0F3D5E]"
          >
            <ArrowLeft size={16} />
            Back to Resources
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1fr_430px] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E] shadow-sm">
                <Sparkles size={16} className="text-[#2CB1A6]" />
                {resource.category}
              </div>

              <h1 className="text-4xl font-black leading-tight text-[#102A43] md:text-6xl">
                {resource.title}
              </h1>

              <p className="mt-6 text-xl font-semibold leading-9 text-slate-600">
                {resource.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {resource.file?.format && (
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E]">
                    {resource.file.format.toUpperCase()}
                  </span>
                )}

                {resource.file?.bytes && (
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#0F3D5E]">
                    {formatBytes(resource.file.bytes)}
                  </span>
                )}

                {resource.isFeatured && (
                  <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-black text-yellow-700">
                    Featured
                  </span>
                )}
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href={resource.file?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-950/15 transition hover:-translate-y-1"
                >
                  <Download size={18} />
                  Download Resource
                </a>

                <a
                  href={`https://wa.me/917999215093?text=${encodeURIComponent(
                    `Hello, I downloaded the resource: ${resource.title}. I want guidance.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-sm font-black text-white shadow-xl shadow-green-900/15 transition hover:-translate-y-1"
                >
                  <MessageCircle size={18} />
                  Ask on WhatsApp
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-[3rem] bg-white p-4 shadow-2xl shadow-slate-900/10">
              {resource.coverImage?.url ? (
                <img
                  src={resource.coverImage.url}
                  alt={resource.title}
                  className="h-90 w-full rounded-[2.4rem] object-cover"
                />
              ) : (
                <div className="flex h-90 items-center justify-center rounded-[2.4rem] bg-[#102A43] text-white/30">
                  <FileText size={80} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <article className="rounded-[3rem] bg-white p-7 shadow-xl shadow-slate-900/5 md:p-12">
            <h2 className="text-3xl font-black text-[#102A43]">
              About this resource
            </h2>

            <p className="mt-5 text-lg font-semibold leading-9 text-slate-600">
              {resource.description}
            </p>

            <div className="mt-8 rounded-4xl bg-[#F7FBFC] p-6">
              <h3 className="text-xl font-black text-[#102A43]">
                Important Note
              </h3>

              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                This resource is for educational support only. It is not a
                replacement for professional assessment, diagnosis or therapy.
                For personalised guidance, please book a consultation.
              </p>
            </div>
          </article>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-4xl bg-[#0F3D5E] p-7 text-white shadow-xl shadow-blue-950/15">
              <FileText className="mb-5 text-[#F4B183]" size={34} />

              <h3 className="text-2xl font-black">Download Resource</h3>

              <p className="mt-3 text-sm font-semibold leading-6 text-white/75">
                Get this free guide or worksheet and use it for learning and
                awareness.
              </p>

              <a
                href={resource.file?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#0F3D5E]"
              >
                <Download size={17} />
                Download Now
              </a>
            </div>

            <div className="rounded-4xl bg-white p-7 shadow-xl shadow-slate-900/5">
              <h3 className="text-xl font-black text-[#102A43]">
                Need personalised help?
              </h3>

              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                Book a consultation for proper assessment and guidance.
              </p>

              <Link
                href="/contact-us"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0F3D5E] px-5 py-3 text-sm font-black text-white"
              >
                Book Consultation
                <ArrowRight size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
