"use client";

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[#1E1E30] ${className}`} />;
}

export default function TermsAndConditionsLoading() {
  return (
    <main className="min-h-screen bg-[#07070F] text-[#E8E8F0] pt-32 pb-24">
      <section className="relative overflow-hidden pt-12 pb-16">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 space-y-6">
          <SkeletonBar className="h-6 w-24 rounded-sm" />
          
          <SkeletonBar className="h-16 w-3/4 max-w-lg mt-5" />
          
          <div className="space-y-3 mt-4">
            <SkeletonBar className="h-4 w-full" />
            <SkeletonBar className="h-4 w-11/12" />
          </div>

          <div className="mt-12 space-y-8 pt-6 border-t border-[#1E1E30]/50">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <SkeletonBar className="h-6 w-48 mb-3" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
