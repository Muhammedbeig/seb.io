import Link from "next/link";
import HeroSearchDemo from "@/components/HeroSearchDemo";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

      {[
        { top: "20%", left: "8%", delay: "0s" },
        { top: "70%", left: "5%", delay: "1.2s" },
        { top: "15%", right: "12%", delay: "0.6s" },
        { top: "80%", right: "8%", delay: "2s" },
      ].map((pos, i) => (
        <div
          key={i}
          className="spider-node hidden lg:block"
          style={{ ...pos, animationDelay: pos.delay }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div>
            <div className="animate-fade-up animate-delay-1">
              <span className="tag">Free SEO Reading Series - 2026</span>
            </div>

            <div
              role="heading"
              aria-level={2}
              className="mt-6 leading-[0.95] tracking-tight"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
              }}
            >
              <span className="hero-word animate-fade-up animate-delay-2 block text-[#E8E8F0]">
                READ HOW
              </span>
              <span className="hero-word animate-fade-up animate-delay-3 block text-stroke">
                SEARCH
              </span>
              <span className="hero-word animate-fade-up animate-delay-3 block text-stroke">
                ENGINES
              </span>
              <span className="hero-word animate-fade-up animate-delay-4 block text-[#E8E8F0]">
                ACTUALLY
              </span>
              <span className="hero-word animate-fade-up animate-delay-4 block gradient-text">
                WORK.
              </span>
            </div>

            <p
              className="animate-fade-up animate-delay-5 mt-7 text-[#6B6B80] leading-relaxed max-w-md"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.05rem" }}
            >
              From crawling and indexing to ranking algorithms, structured
              series let you move topic by topic, completely free.
            </p>

            <div className="animate-fade-up animate-delay-5 mt-8 flex flex-wrap gap-3">
              <Link
                href="#main-guide"
                className="btn-lime px-7 py-3.5 rounded-full text-sm"
              >
                Search Engine Basics -&gt;
              </Link>
              <Link href="/series" className="btn-ghost px-7 py-3.5 rounded-full text-sm">
                Browse Series
              </Link>
            </div>

            <div className="animate-fade-up animate-delay-5 mt-10 flex flex-wrap gap-2">
              {["Series-first library", "No account needed", "Updated guides"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#1E1E30] px-3 py-1.5 text-xs text-[#8F8FA3]"
                  style={{ fontFamily: "var(--font-dm-mono)" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <HeroSearchDemo />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-[#6B6B80] tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>
          SCROLL
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#6B6B80] to-transparent" />
      </div>
    </section>
  );
}
