"use client";

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[#1E1E30] ${className}`} />;
}

export default function AuthorsLoading() {
  return (
    <main className="min-h-screen bg-[#07070F] text-[#E8E8F0] pt-32 pb-24">
      {/* Header Skeleton */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <SkeletonBar className="h-6 w-24 rounded-sm" />
          <SkeletonBar className="mt-6 h-14 w-full max-w-xl" />
          <SkeletonBar className="mt-3 h-14 w-3/4 max-w-lg" />
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg border border-[#1E1E30] p-5 bg-[#0C0C16]"
              >
                <div className="flex gap-4">
                  {/* Left Circle Avatar Skeleton */}
                  <div className="h-20 w-20 flex-shrink-0 rounded-full border border-[#B8FF35]/10 bg-[#1E1E30] animate-pulse" />
                  
                  {/* Right Side Content Skeleton */}
                  <div className="flex-1 min-w-0">
                    <SkeletonBar className="h-5 w-2/5" />
                    <SkeletonBar className="mt-2 h-3.5 w-1/4" />
                    <SkeletonBar className="mt-4 h-3 w-full" />
                    <SkeletonBar className="mt-2 h-3 w-5/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
