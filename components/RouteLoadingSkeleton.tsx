"use client";

type RouteLoadingSkeletonProps = {
  dense?: boolean;
  chrome?: boolean;
};

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-[#1E1E30] ${className}`} />;
}

function SkeletonArticleRow({ index }: { index: number }) {
  return (
    <div className="grid grid-cols-[52px_minmax(0,1fr)] border-b border-[#1E1E30] last:border-b-0">
      <div className="flex justify-center border-r border-[#1E1E30] pt-4 text-[11px] text-[#33334A]" style={{ fontFamily: "var(--font-dm-mono)" }}>
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="px-4 py-4 sm:px-5">
        <SkeletonBar className="h-4 w-3/4" />
        <SkeletonBar className="mt-3 h-3 w-full" />
        <SkeletonBar className="mt-2 h-3 w-2/3" />
        <div className="mt-3 flex gap-2">
          <SkeletonBar className="h-5 w-20 rounded-sm" />
          <SkeletonBar className="h-5 w-24 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

export default function RouteLoadingSkeleton({ dense = false, chrome = true }: RouteLoadingSkeletonProps) {
  const content = (
    <>
      {chrome && (
        <div className="fixed left-0 right-0 top-0 z-50 border-b border-[#1E1E30] bg-[#07070F]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <SkeletonBar className="h-7 w-7 rounded-sm" />
            <SkeletonBar className="h-4 w-20" />
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <SkeletonBar className="h-4 w-20" />
            <SkeletonBar className="h-4 w-24" />
            <SkeletonBar className="h-9 w-32 rounded-full" />
          </div>
        </div>
      </div>
      )}

      <section className="relative overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
          <SkeletonBar className="h-6 w-28 rounded-sm" />
          <SkeletonBar className="mt-6 h-12 w-full max-w-2xl" />
          <SkeletonBar className="mt-3 h-12 w-full max-w-xl" />
          <SkeletonBar className="mt-6 h-4 w-full max-w-lg" />
          <SkeletonBar className="mt-3 h-4 w-full max-w-md" />
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className={dense ? "grid gap-5 md:grid-cols-2 lg:grid-cols-3" : "overflow-hidden rounded-lg border border-[#1E1E30]"}>
            {dense
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="rounded-lg border border-[#1E1E30] p-5" style={{ background: "var(--card)" }}>
                    <SkeletonBar className="h-5 w-24 rounded-sm" />
                    <SkeletonBar className="mt-5 h-5 w-5/6" />
                    <SkeletonBar className="mt-3 h-3 w-full" />
                    <SkeletonBar className="mt-2 h-3 w-3/4" />
                    <SkeletonBar className="mt-8 h-3 w-28" />
                  </div>
                ))
              : Array.from({ length: 6 }).map((_, index) => <SkeletonArticleRow key={index} index={index} />)}
          </div>
        </div>
      </section>
    </>
  );

  if (!chrome) {
    return content;
  }

  return (
    <main className="min-h-screen bg-[#07070F] text-[#E8E8F0]">
      {content}
    </main>
  );
}
