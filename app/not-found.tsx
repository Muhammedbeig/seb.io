import Link from "next/link";
import PageShell from "@/components/PageShell";

export default function NotFound() {
  return (
    <main>
      <PageShell>
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 grid-bg pointer-events-none" />

          <div
            className="absolute select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(200px, 35vw, 400px)",
              fontWeight: 800,
              color: "rgba(184,255,53,0.04)",
              lineHeight: 1,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            404
          </div>

          <div className="relative z-10 text-center px-6 max-w-lg">
            <span className="tag">Error 404</span>
            <h1
              className="mt-6 text-[#E8E8F0]"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              This page wasn&apos;t <span className="text-stroke">indexed.</span>
            </h1>
            <p className="mt-4 text-[#6B6B80] text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Looks like Googlebot couldn&apos;t find this one either. It might have been moved, deleted, or never existed.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link href="/" className="btn-lime px-7 py-3.5 rounded-full text-sm">
                Back to Home -&gt;
              </Link>
              <Link href="/series" className="btn-ghost px-7 py-3.5 rounded-full text-sm">
                Browse Series
              </Link>
            </div>

            <div className="mt-10 rounded-lg border border-[#1E1E30] p-4 text-left inline-flex items-center gap-3" style={{ background: "var(--card)" }}>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-[#6B6B80]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                HTTP 404 - Page not found in index
              </span>
            </div>
          </div>
        </section>
      </PageShell>
    </main>
  );
}
