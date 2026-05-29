import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { ToastContainer } from "react-toastify";
import schemaJsonLd from "@/lib/schemaJsonLd";

export const metadata = {
  title: {
    default: "Dr. Vini Jhariya | Child Psychologist in Indore",
    template: "%s | Dr. Vini Jhariya",
  },
  description:
    "Consult Dr. Vini Jhariya, child psychologist in Indore, for autism therapy, ADHD assessment, dyslexia support, child counselling, adolescent counselling and psychological assessments.",
  keywords: [
    "Child Psychologist Indore",
    "Autism Therapy Indore",
    "ADHD Assessment Indore",
    "Dyslexia Specialist Indore",
    "Child Counselling Indore",
    "Psychologist Indore",
    "Urjasvini Child Development Centre",
  ],
  openGraph: {
    title: "Dr. Vini Jhariya | Child Psychologist in Indore",
    description:
      "Child psychology, counselling, assessments and therapy services in Indore.",
    type: "website",
    locale: "en_IN",
    siteName: "Dr. Vini Jhariya",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaJsonLd),
          }}
        />

        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </body>
    </html>
  );
}
