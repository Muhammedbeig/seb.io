"use client";

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[#1E1E30] ${className}`} />;
}

export default function AuthorLoading() {
  return (
    <main data-route-loading="true" className="min-h-screen bg-[#07070F] text-[#E8E8F0]">
      {/* Header Skeleton */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <SkeletonBar className="h-4 w-20" />
          
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Avatar Circle */}
            <div className="h-28 w-28 flex-shrink-0 rounded-full border border-[#B8FF35]/10 bg-[#1E1E30] animate-pulse" />
            
            <div className="flex-1 space-y-3">
              <SkeletonBar className="h-5 w-24 rounded-sm" />
              <SkeletonBar className="h-10 w-2/3 sm:w-1/2 max-w-md mt-2" />
              <SkeletonBar className="h-4 w-40 mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Bio & Articles Skeleton */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Bio Box */}
          <div className="rounded-lg border border-[#1E1E30] p-6 bg-[#0C0C16] space-y-3">
            <SkeletonBar className="h-4 w-full" />
            <SkeletonBar className="h-4 w-5/6" />
            <SkeletonBar className="h-4 w-4/5" />
          </div>

          {/* Articles Section */}
          <div className="mt-12">
            <SkeletonBar className="h-7 w-32" />
            
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-[#1E1E30] p-5 bg-[#0C0C16]"
                >
                  {/* Article Image Skeleton */}
                  <div className="mb-4 aspect-[16/8] rounded-md border border-[#1E1E30] bg-[#1E1E30] animate-pulse" />
                  
                  {/* Article Title & Excerpt */}
                  <SkeletonBar className="h-5 w-3/4" />
                  <SkeletonBar className="mt-3 h-3 w-full" />
                  <SkeletonBar className="mt-2 h-3 w-5/6" />
                  
                  <div className="mt-4 flex gap-2">
                    <SkeletonBar className="h-5 w-16 rounded-sm" />
                    <SkeletonBar className="h-5 w-20 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
