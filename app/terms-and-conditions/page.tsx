import PageShell from "@/components/PageShell";
import { getCompanyPage } from "@/lib/cms";

export default async function TermsPage() {
  const page = await getCompanyPage("terms-and-conditions");

  return (
    <main>
      <PageShell>
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
          <span className="tag">Company</span>
          <h1 className="mt-5 text-[#E8E8F0]" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800 }}>
            {page?.title || "Terms and Conditions"}
          </h1>
          {page?.excerpt && (
            <p className="mt-4 text-[#6B6B80] text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {page.excerpt}
            </p>
          )}
          <article className="prose-custom mt-10" dangerouslySetInnerHTML={{ __html: page?.content || "<p>Terms content is managed in the admin panel.</p>" }} />
        </div>
      </section>
      </PageShell>
    </main>
  );
}
