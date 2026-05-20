"use client";

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[#1E1E30] ${className}`} />;
}

function ArticleRowSkeleton({ wide = false }: { wide?: boolean }) {
  return (
    <div className="grid grid-cols-[46px_minmax(0,1fr)] border-b border-[#1E1E30] last:border-b-0">
      {/* Number column */}
      <div className="flex justify-center border-r border-[#1E1E30] pt-4">
        <SkeletonBar className="h-3 w-6" />
      </div>

      {/* Content area */}
      <div className="px-4 py-4 sm:px-5 space-y-2.5">
        <SkeletonBar className={`h-4 ${wide ? "w-3/4 max-w-sm" : "w-3/5 max-w-xs"}`} />
        <SkeletonBar className="h-3 w-full max-w-lg" />
        <SkeletonBar className="h-3 w-4/5 max-w-md" />
        <div className="flex items-center gap-3 pt-1">
          <SkeletonBar className="h-2.5 w-14" />
          <SkeletonBar className="h-2.5 w-20" />
        </div>
      </div>
    </div>
  );
}

function SeriesBlockSkeleton({
  titleWidth,
  descWidth,
}: {
  titleWidth: string;
  descWidth: string;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#1E1E30]">
      {/* Series header */}
      <div className="border-b border-[#1E1E30] bg-[#0C0C16] p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 min-w-0">
            {/* Dot + number + title row */}
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-[#1E1E30] animate-pulse" />
              <SkeletonBar className="h-3 w-6" />
              <SkeletonBar className={`h-6 ${titleWidth}`} />
            </div>
            {/* Description */}
            <div className="mt-3 space-y-2">
              <SkeletonBar className={`h-3 ${descWidth}`} />
              <SkeletonBar className="h-3 w-3/5 max-w-sm" />
            </div>
          </div>
          {/* CTA button placeholder */}
          <SkeletonBar className="h-8 w-28 rounded-full flex-shrink-0" />
        </div>
      </div>

      {/* Article rows */}
      <ArticleRowSkeleton wide />
      <ArticleRowSkeleton />
      <ArticleRowSkeleton wide />
    </section>
  );
}

export default function SeriesLoading() {
  return (
    <main data-route-loading="true" className="min-h-screen bg-[#07070F] text-[#E8E8F0]">
      {/* ── Hero header ── */}
      <section className="pt-32 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          {/* Tag chip */}
          <SkeletonBar className="h-6 w-24 rounded-sm" />

          {/* Title lines */}
          <SkeletonBar className="mt-6 h-12 w-full max-w-md sm:h-14" />
          <SkeletonBar className="mt-3 h-12 w-3/4 max-w-sm sm:h-14" />

          {/* Subtitle paragraph */}
          <SkeletonBar className="mt-6 h-3.5 w-full max-w-xl" />
          <SkeletonBar className="mt-2 h-3.5 w-4/5 max-w-lg" />

          {/* Article count line */}
          <SkeletonBar className="mt-5 h-3 w-48" />
        </div>
      </section>

      {/* ── Series blocks ── */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-10">
          <SeriesBlockSkeleton
            titleWidth="w-52 max-w-[14rem]"
            descWidth="w-full max-w-lg"
          />
          <SeriesBlockSkeleton
            titleWidth="w-44 max-w-[12rem]"
            descWidth="w-5/6 max-w-md"
          />
          <SeriesBlockSkeleton
            titleWidth="w-60 max-w-[16rem]"
            descWidth="w-full max-w-xl"
          />
        </div>
      </section>
    </main>
  );
}
