"use client";

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[#1E1E30] ${className}`} />;
}

export default function ArticleLoading() {
  return (
    <main className="min-h-screen bg-[#07070F] text-[#E8E8F0]">
      {/* Article Header Skeleton */}
      <header className="pt-36 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <SkeletonBar className="h-4 w-12" />
            <span className="text-[#1E1E30]">.</span>
            <SkeletonBar className="h-5 w-20 rounded-sm" />
          </div>

          <SkeletonBar className="h-10 w-full max-w-2xl" />
          <SkeletonBar className="mt-3 h-10 w-4/5 max-w-xl" />

          <SkeletonBar className="mt-4 h-4 w-full" />
          <SkeletonBar className="mt-2 h-4 w-5/6" />

          {/* Chips Section */}
          <div className="mt-6 flex flex-wrap gap-2">
            <SkeletonBar className="h-8 w-28 rounded-full" />
            <SkeletonBar className="h-8 w-24 rounded-full" />
            <SkeletonBar className="h-8 w-32 rounded-full" />
          </div>

          <div className="flex items-center gap-5 mt-6">
            <SkeletonBar className="h-4 w-24" />
            <span className="text-[#1E1E30]">.</span>
            <SkeletonBar className="h-4 w-16" />
          </div>

          <div className="mt-8 h-px w-full bg-gradient-to-r from-[#1E1E30] to-transparent" />

          {/* Hero Image Skeleton */}
          <div className="mt-8 overflow-hidden rounded-lg border border-[#1E1E30] bg-[#1E1E30] aspect-[16/9] max-h-[460px] w-full animate-pulse" />
        </div>
      </header>

      {/* Main Content & Sidebar Grid Skeleton */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left 2 Columns: Article Content */}
            <div className="min-w-0 lg:col-span-2 space-y-8">
              {/* Simulating Article Content Blocks */}
              <div className="space-y-4">
                <SkeletonBar className="h-7 w-2/5 mb-6 mt-4" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-11/12" />
                <SkeletonBar className="h-4 w-5/6" />
              </div>

              <div className="space-y-4">
                <SkeletonBar className="h-7 w-1/3 mb-6 mt-8" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-4/5" />
              </div>

              <div className="space-y-4">
                <SkeletonBar className="h-7 w-1/2 mb-6 mt-8" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-5/6" />
              </div>

              {/* Share Buttons Skeleton */}
              <div className="flex gap-3 pt-6 border-t border-[#1E1E30]">
                <SkeletonBar className="h-10 w-24 rounded-md" />
                <SkeletonBar className="h-10 w-24 rounded-md" />
                <SkeletonBar className="h-10 w-24 rounded-md" />
              </div>

              {/* Pager Buttons Skeleton */}
              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-[#1E1E30] p-5 bg-[#0C0C16]">
                  <SkeletonBar className="h-3 w-16" />
                  <SkeletonBar className="mt-2 h-4 w-3/4" />
                </div>
                <div className="rounded-lg border border-[#1E1E30] p-5 bg-[#0C0C16]">
                  <SkeletonBar className="h-3 w-16" />
                  <SkeletonBar className="mt-2 h-4 w-3/4" />
                </div>
              </div>

              {/* Contributors Skeleton */}
              <div className="mt-12 rounded-lg border border-[#1E1E30] p-6 space-y-6 bg-[#0C0C16]">
                <SkeletonBar className="h-4 w-44" />
                
                <div className="section-line" />
                
                <div className="space-y-4">
                  <SkeletonBar className="h-3 w-20" />
                  <div className="flex gap-3">
                    <div className="h-11 w-11 rounded-full bg-[#1E1E30] animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <SkeletonBar className="h-4 w-32" />
                      <SkeletonBar className="h-3 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="rounded-lg border border-[#1E1E30] p-5 bg-[#0C0C16] space-y-5">
                <SkeletonBar className="h-4 w-28" />

                {/* Simulated TOC items */}
                <div className="space-y-3 pl-2">
                  <SkeletonBar className="h-3 w-11/12" />
                  <SkeletonBar className="h-3 w-5/6" />
                  <SkeletonBar className="h-3 w-10/12" />
                  <SkeletonBar className="h-3 w-3/4" />
                </div>

                <div className="section-line" />

                {/* Simulated Series articles */}
                <SkeletonBar className="h-5 w-36" />
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex gap-3 items-center py-2">
                      <div className="h-7 w-7 rounded bg-[#1E1E30] animate-pulse flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <SkeletonBar className="h-4 w-11/12" />
                        <SkeletonBar className="h-3 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
