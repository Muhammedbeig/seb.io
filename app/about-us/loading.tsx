"use client";

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[#1E1E30] ${className}`} />;
}

export default function AboutUsLoading() {
  return (
    <main data-route-loading="true" className="min-h-screen bg-[#07070F] text-[#E8E8F0] pt-32 pb-24">
      {/* Header Skeleton */}
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
          <SkeletonBar className="h-6 w-36 rounded-sm" />
          <SkeletonBar className="mt-6 h-16 w-3/4 max-w-lg" />
          <SkeletonBar className="mt-3 h-16 w-1/2 max-w-md" />
        </div>
      </section>

      {/* Content Columns Skeleton */}
      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Left Content Area */}
            <div className="lg:col-span-3 space-y-8">
              <SkeletonBar className="h-6 w-full max-w-md" />
              <div className="space-y-3">
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-5/6" />
              </div>
              
              <SkeletonBar className="h-6 w-48 mt-8" />
              <div className="space-y-3">
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-4/5" />
              </div>

              <SkeletonBar className="h-6 w-56 mt-8" />
              <div className="space-y-3">
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-11/12" />
              </div>
            </div>

            {/* Right Sidebar Stats Box */}
            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl border border-[#1E1E30] p-7 bg-[#0F0F1A]/60">
                <SkeletonBar className="h-4 w-28 uppercase tracking-widest" />
                
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-[#1E1E30] last:border-0">
                    <SkeletonBar className="h-4 w-24" />
                    <SkeletonBar className="h-4 w-8" />
                  </div>
                ))}
              </div>
              <SkeletonBar className="h-12 w-full rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
