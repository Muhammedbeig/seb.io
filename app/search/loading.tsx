"use client";

function SkeletonBar({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`animate-pulse rounded bg-[#1E1E30] ${className}`} />
  );
}

function SkeletonResultCard() {
  return (
    <div className="rounded-2xl border border-[#1E1E30] bg-[#0C0C16] p-6 flex flex-col gap-4">
      {/* Tag chip + read time */}
      <div className="flex items-center justify-between">
        <SkeletonBar className="h-6 w-20 rounded-full" />
        <SkeletonBar className="h-4 w-16" />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <SkeletonBar className="h-5 w-full" />
        <SkeletonBar className="h-5 w-3/4" />
      </div>

      {/* Excerpt lines */}
      <div className="space-y-2 flex-1">
        <SkeletonBar className="h-3.5 w-full" />
        <SkeletonBar className="h-3.5 w-full" />
        <SkeletonBar className="h-3.5 w-5/6" />
      </div>

      {/* Date */}
      <div className="pt-2 border-t border-[#1E1E30]">
        <SkeletonBar className="h-3.5 w-28" />
      </div>
    </div>
  );
}

export default function SearchLoading() {
  return (
    <div className="grid-bg min-h-screen bg-[#07070F]">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-6">
          {/* Tag chip */}
          <SkeletonBar className="h-7 w-24 rounded-full" />

          {/* Large title */}
          <SkeletonBar className="h-10 w-72 md:w-96" />

          {/* Search input bar */}
          <div className="w-full max-w-2xl mt-2">
            <div className="animate-pulse rounded-xl border border-[#1E1E30] bg-[#0C0C16] h-14 flex items-center px-5 gap-3">
              {/* Search icon placeholder */}
              <div className="rounded bg-[#1E1E30] h-5 w-5 shrink-0" />
              {/* Input placeholder text */}
              <div className="rounded bg-[#1E1E30] h-4 w-48" />
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          {/* Results count skeleton */}
          <div className="mb-8">
            <SkeletonBar className="h-4 w-36" />
          </div>

          {/* Grid of result cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonResultCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
