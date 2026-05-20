"use client";

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[#1E1E30] ${className}`} />;
}

function SkeletonPill({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-full bg-[#1E1E30] ${className}`}
    />
  );
}

function SkeletonCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#1E1E30] flex flex-col justify-between"
      style={{ background: "#0C0C16", minHeight: "280px" }}
    >
      {/* Image area */}
      <div className="aspect-[16/8] border-b border-[#1E1E30] bg-[#0F0F1A]">
        <div className="h-full w-full animate-pulse bg-[#1E1E30]/40" />
      </div>

      {/* Content */}
      <div className="p-6 flex-1">
        {/* Tag + read time row */}
        <div className="flex items-center justify-between mb-4">
          <SkeletonBar className="h-[18px] w-16 rounded-[3px]" />
          <SkeletonBar className="h-3 w-14" />
        </div>

        {/* Title */}
        <SkeletonBar className="h-4 w-[85%] mb-2" />
        <SkeletonBar className="h-4 w-[55%] mb-4" />

        {/* Excerpt lines */}
        <SkeletonBar className="h-3 w-full mb-1.5" />
        <SkeletonBar className="h-3 w-[90%] mb-1.5" />
        <SkeletonBar className="h-3 w-[60%]" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-6 pt-4 border-t border-[#1E1E30]">
        <SkeletonBar className="h-3 w-20" />
        <SkeletonBar className="h-3 w-14" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main data-route-loading="true">
      {/* ── Hero header ── */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0,
            left: "40%",
            width: "500px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(184,255,53,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Tag chip */}
          <SkeletonPill className="h-6 w-24" />

          {/* Large multi-line title */}
          <div className="mt-5 space-y-2">
            <SkeletonBar className="h-12 w-32 rounded-md sm:h-16 sm:w-44" />
            <SkeletonBar className="h-12 w-72 rounded-md sm:h-16 sm:w-[26rem]" />
            <SkeletonBar className="h-12 w-28 rounded-md sm:h-16 sm:w-36" />
          </div>

          {/* Subtitle paragraph */}
          <div className="mt-5 max-w-md space-y-2">
            <SkeletonBar className="h-3.5 w-full" />
            <SkeletonBar className="h-3.5 w-[90%]" />
            <SkeletonBar className="h-3.5 w-[65%]" />
          </div>
        </div>
      </section>

      {/* ── Sticky category filter bar ── */}
      <div
        className="border-y border-[#1E1E30] sticky top-16 z-40"
        style={{
          background: "rgba(7,7,15,0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {/* Active pill (accent color shimmer) */}
          <SkeletonPill className="h-7 w-12 shrink-0 !bg-[#B8FF35]/15" />
          <SkeletonPill className="h-7 w-[96px] shrink-0 border border-[#1E1E30]" />
          <SkeletonPill className="h-7 w-[80px] shrink-0 border border-[#1E1E30]" />
          <SkeletonPill className="h-7 w-[72px] shrink-0 border border-[#1E1E30]" />
          <SkeletonPill className="h-7 w-[88px] shrink-0 border border-[#1E1E30]" />
          <SkeletonPill className="h-7 w-[64px] shrink-0 border border-[#1E1E30]" />
          <SkeletonPill className="h-7 w-[56px] shrink-0 border border-[#1E1E30]" />
        </div>
      </div>

      {/* ── Article cards grid ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
