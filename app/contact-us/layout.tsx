import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Search Engine Basics",
  description:
    "Contact Search Engine Basics with article suggestions, corrections, collaboration requests, or questions about our SEO education library.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Search Engine Basics",
    description:
      "Send questions, corrections, article ideas, and feedback to the Search Engine Basics team.",
    url: "/contact-us",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
