"use client";

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[#1E1E30] ${className}`} />;
}

export default function ContactLoading() {
  return (
    <main data-route-loading="true" className="min-h-screen bg-[#07070F] text-[#E8E8F0] pt-32 pb-24">
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-2 space-y-6">
              <SkeletonBar className="h-6 w-24 rounded-sm" />
              <div className="space-y-3">
                <SkeletonBar className="h-12 w-full max-w-sm" />
                <SkeletonBar className="h-12 w-2/3 max-w-xs" />
              </div>
              <div className="space-y-2 mt-4">
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-5/6" />
              </div>

              {/* Bullet info items */}
              <div className="mt-10 space-y-6 pt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-5 w-5 rounded bg-[#1E1E30] animate-pulse flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <SkeletonBar className="h-3 w-20" />
                      <SkeletonBar className="h-4 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-[#1E1E30] p-8 bg-[#0C0C16] space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <SkeletonBar className="h-3 w-12" />
                    <SkeletonBar className="h-11 w-full rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <SkeletonBar className="h-3 w-12" />
                    <SkeletonBar className="h-11 w-full rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <SkeletonBar className="h-3 w-16" />
                  <SkeletonBar className="h-11 w-full rounded-xl" />
                </div>

                <div className="space-y-2">
                  <SkeletonBar className="h-3 w-16" />
                  <SkeletonBar className="h-32 w-full rounded-xl" />
                </div>

                <SkeletonBar className="h-12 w-full rounded-xl mt-4" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
